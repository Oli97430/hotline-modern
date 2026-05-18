package main

import (
	"archive/zip"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/hotline-modern/server/internal/auth"
	"github.com/hotline-modern/server/internal/chat"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/files"
	"github.com/hotline-modern/server/internal/hub"
	"github.com/hotline-modern/server/internal/permissions"
	"github.com/hotline-modern/server/internal/tracker"
)

const serverVersion = "1.0.0"

var startTime = time.Now()

func main() {
	addr := flag.String("addr", ":9998", "Listen address (WebSocket + HTTP on same port)")
	dataDir := flag.String("data", "./data", "Data directory (database + files)")
	serverName := flag.String("name", "Hotline Server", "Server name")
	motd := flag.String("motd", "Welcome to Hotline Modern!", "Message of the day")
	tlsCert := flag.String("tls-cert", "", "TLS certificate file (enables HTTPS/WSS)")
	tlsKey := flag.String("tls-key", "", "TLS private key file")
	agreementFile := flag.String("agreement", "", "Path to a text file containing a server agreement shown to users on connect")
	trackerURLs := flag.String("tracker", "", "Comma-separated external tracker URLs to also register with")
	publicAddr := flag.String("public-addr", "", "Public address for tracker registration (e.g. myserver.com)")
	publicPort := flag.Int("public-port", 0, "Public port for tracker registration (0 = use listen port, 443 for tunnels)")
	serverDesc := flag.String("desc", "", "Server description for tracker listing")
	trackerTTL := flag.Int("tracker-ttl", 120, "Tracker entry TTL in seconds")
	allowedOrigins := flag.String("origins", "", "Comma-separated allowed WebSocket origins (empty = allow all)")
	// Deprecated flags — kept for backward compatibility
	_ = flag.String("http", "", "Deprecated: file server now runs on the main port")
	flag.Parse()

	// Load agreement text if a file was specified
	agreementText := ""
	if *agreementFile != "" {
		data, err := os.ReadFile(*agreementFile)
		if err != nil {
			log.Fatalf("Failed to read agreement file: %v", err)
		}
		agreementText = string(data)
	}

	if err := os.MkdirAll(*dataDir, 0755); err != nil {
		log.Fatalf("Failed to create data directory: %v", err)
	}
	filesDir := filepath.Join(*dataDir, "files")
	if err := os.MkdirAll(filesDir, 0755); err != nil {
		log.Fatalf("Failed to create files directory: %v", err)
	}

	dbPath := filepath.Join(*dataDir, "hotline.db")
	database, err := db.Open(dbPath)
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	defer database.Close()

	permManager := permissions.New(database)
	authManager := auth.New(database, permManager)
	chatManager := chat.New(database)
	fileServer := files.New(filesDir, authManager, permManager)

	// Load persisted settings (override CLI defaults)
	if saved, err := chatManager.GetSetting("server_name"); err == nil && saved != "" {
		*serverName = saved
	}
	if saved, err := chatManager.GetSetting("motd"); err == nil && saved != "" {
		*motd = saved
	}

	h := hub.New(authManager, chatManager, permManager, *serverName, *motd, agreementText, *allowedOrigins)
	go h.Run()

	// --- Embedded tracker ---
	trackerStore := tracker.NewStore()

	// Periodic cleanup of expired tracker entries
	go func() {
		tick := time.NewTicker(30 * time.Second)
		defer tick.Stop()
		for range tick.C {
			if n := trackerStore.Cleanup(time.Duration(*trackerTTL) * time.Second); n > 0 {
				log.Printf("Tracker: cleaned up %d expired server(s), %d remaining", n, trackerStore.Count())
			}
		}
	}()

	// getAdminKey extracts the admin public key from Authorization header (preferred)
	// or falls back to ?key= query param for backward compatibility.
	getAdminKey := func(r *http.Request) string {
		// Prefer Authorization: Bearer <publicKey>
		if auth := r.Header.Get("Authorization"); auth != "" {
			if strings.HasPrefix(auth, "Bearer ") {
				return strings.TrimPrefix(auth, "Bearer ")
			}
			return auth
		}
		return r.URL.Query().Get("key")
	}

	// --- Single HTTP mux: WebSocket + Files + Tracker ---
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", h.HandleWebSocket)
	fileServer.RegisterRoutes(mux)

	// Health endpoint (no auth required)
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}
		var mem runtime.MemStats
		runtime.ReadMemStats(&mem)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":     "ok",
			"uptime":     int64(time.Since(startTime).Seconds()),
			"users":      h.ClientCount(),
			"channels":   h.ChannelCount(),
			"goroutines": runtime.NumGoroutine(),
			"memoryMB":   float64(mem.Alloc) / 1024 / 1024,
			"version":    serverVersion,
		})
	})

	// Invite validation endpoint
	mux.HandleFunc("/invite/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}
		code := strings.TrimPrefix(r.URL.Path, "/invite/")
		if code == "" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"valid": false})
			return
		}
		valid, err := chatManager.ValidateInvite(code)
		if err != nil || !valid {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"valid": false})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"valid": true, "serverName": *serverName})
	})

	// Export endpoint: GET /export/{channel} with Authorization header or ?key=publicKey
	mux.HandleFunc("/export/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}
		key := getAdminKey(r)
		if key == "" {
			http.Error(w, "missing authorization", http.StatusUnauthorized)
			return
		}
		role := permManager.GetRole(key)
		if role != "admin" {
			http.Error(w, "admin access required", http.StatusForbidden)
			return
		}
		channel := strings.TrimPrefix(r.URL.Path, "/export/")
		msgs, err := chatManager.ExportMessages(channel, 10000)
		if err != nil {
			http.Error(w, "export failed", http.StatusInternalServerError)
			return
		}
		filename := "channel-export.txt"
		if channel != "" {
			filename = channel + "-export.txt"
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.Header().Set("Content-Disposition", "attachment; filename=\""+filename+"\"")
		for _, m := range msgs {
			// Parse timestamp and format it
			ts := m.Timestamp
			if t, parseErr := time.Parse("2006-01-02 15:04:05-07:00", ts); parseErr == nil {
				ts = t.Format("2006-01-02 15:04")
			} else if t, parseErr := time.Parse("2006-01-02T15:04:05Z", ts); parseErr == nil {
				ts = t.Format("2006-01-02 15:04")
			} else if t, parseErr := time.Parse(time.RFC3339, ts); parseErr == nil {
				ts = t.Format("2006-01-02 15:04")
			}
			line := fmt.Sprintf("[%s] <%s> %s\n", ts, m.Nickname, m.Content)
			w.Write([]byte(line))
		}
	})

	// Backup: GET /backup with Authorization header or ?key=adminPublicKey
	mux.HandleFunc("/backup", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}
		key := getAdminKey(r)
		if key == "" {
			http.Error(w, "missing authorization", http.StatusUnauthorized)
			return
		}
		role := permManager.GetRole(key)
		if role != "admin" {
			http.Error(w, "admin access required", http.StatusForbidden)
			return
		}

		// Create temp dir for the backup
		tmpDir, err := os.MkdirTemp("", "hotline-backup-")
		if err != nil {
			http.Error(w, "failed to create temp directory", http.StatusInternalServerError)
			return
		}
		defer os.RemoveAll(tmpDir)

		// Backup the database
		dbBackupPath := filepath.Join(tmpDir, "hotline.db")
		if err := database.BackupTo(dbBackupPath); err != nil {
			log.Printf("Backup: DB backup failed: %v", err)
			http.Error(w, "database backup failed", http.StatusInternalServerError)
			return
		}

		// Create zip file
		zipPath := filepath.Join(tmpDir, "backup.zip")
		zipFile, err := os.Create(zipPath)
		if err != nil {
			http.Error(w, "failed to create zip", http.StatusInternalServerError)
			return
		}
		zw := zip.NewWriter(zipFile)

		// Add database to zip
		dbData, err := os.ReadFile(dbBackupPath)
		if err != nil {
			zipFile.Close()
			http.Error(w, "failed to read db backup", http.StatusInternalServerError)
			return
		}
		fw, err := zw.Create("hotline.db")
		if err != nil {
			zipFile.Close()
			http.Error(w, "zip write error", http.StatusInternalServerError)
			return
		}
		fw.Write(dbData)

		// Add files directory to zip (stream files to avoid loading all into memory)
		filepath.Walk(filesDir, func(path string, info os.FileInfo, err error) error {
			if err != nil || info.IsDir() {
				return nil
			}
			relPath, err := filepath.Rel(filesDir, path)
			if err != nil {
				return nil
			}
			fw, err := zw.Create("files/" + filepath.ToSlash(relPath))
			if err != nil {
				return nil
			}
			f, err := os.Open(path)
			if err != nil {
				return nil
			}
			io.Copy(fw, f)
			f.Close()
			return nil
		})

		zw.Close()
		zipFile.Close()

		// Stream the zip to the response
		dateName := time.Now().Format("2006-01-02")
		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="hotline-backup-%s.zip"`, dateName))
		http.ServeFile(w, r, zipPath)
	})

	// Restore: POST /restore with Authorization header or ?key=adminPublicKey
	// WARNING: Restoring while the server is running replaces the database file.
	// A server restart is required after restore for changes to take effect.
	mux.HandleFunc("/restore", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "POST only", http.StatusMethodNotAllowed)
			return
		}
		key := getAdminKey(r)
		if key == "" {
			http.Error(w, "missing authorization", http.StatusUnauthorized)
			return
		}
		role := permManager.GetRole(key)
		if role != "admin" {
			http.Error(w, "admin access required", http.StatusForbidden)
			return
		}

		// Limit upload to 100MB
		r.Body = http.MaxBytesReader(w, r.Body, 100<<20)
		if err := r.ParseMultipartForm(100 << 20); err != nil {
			http.Error(w, "file too large or invalid form", http.StatusBadRequest)
			return
		}

		file, _, err := r.FormFile("backup")
		if err != nil {
			http.Error(w, "missing backup file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		// Save uploaded file to temp location
		tmpFile, err := os.CreateTemp("", "hotline-restore-*.zip")
		if err != nil {
			http.Error(w, "failed to create temp file", http.StatusInternalServerError)
			return
		}
		tmpPath := tmpFile.Name()
		defer os.Remove(tmpPath)

		written, err := io.Copy(tmpFile, file)
		tmpFile.Close()
		if err != nil {
			http.Error(w, "failed to save upload", http.StatusInternalServerError)
			return
		}

		// Open the zip
		zr, err := zip.OpenReader(tmpPath)
		if err != nil {
			http.Error(w, "invalid zip file", http.StatusBadRequest)
			return
		}
		defer zr.Close()

		// Extract files
		for _, f := range zr.File {
			if f.FileInfo().IsDir() {
				continue
			}

			// Security: prevent path traversal
			cleanName := filepath.Clean(f.Name)
			if strings.Contains(cleanName, "..") {
				continue
			}

			if cleanName == "hotline.db" {
				// Restore database
				rc, err := f.Open()
				if err != nil {
					continue
				}
				dbData, err := io.ReadAll(rc)
				rc.Close()
				if err != nil {
					continue
				}
				if err := os.WriteFile(dbPath, dbData, 0644); err != nil {
					log.Printf("Restore: failed to write database: %v", err)
				} else {
					log.Printf("Restore: database restored (%d bytes)", len(dbData))
				}
			} else if strings.HasPrefix(filepath.ToSlash(cleanName), "files/") {
				// Restore uploaded files
				relPath := strings.TrimPrefix(filepath.ToSlash(cleanName), "files/")
				destPath := filepath.Join(filesDir, filepath.FromSlash(relPath))
				destDir := filepath.Dir(destPath)
				os.MkdirAll(destDir, 0755)

				rc, err := f.Open()
				if err != nil {
					continue
				}
				fData, err := io.ReadAll(rc)
				rc.Close()
				if err != nil {
					continue
				}
				if err := os.WriteFile(destPath, fData, 0644); err != nil {
					log.Printf("Restore: failed to write file %s: %v", relPath, err)
				}
			}
		}

		log.Printf("Restore: backup restored from %d byte zip", written)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"ok":      true,
			"message": "Restored successfully. Please restart the server.",
		})
	})

	// Tracker: POST /register
	mux.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "POST only", http.StatusMethodNotAllowed)
			return
		}
		r.Body = http.MaxBytesReader(w, r.Body, 64*1024)
		var entry tracker.ServerEntry
		if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}
		if entry.Address == "" || entry.Port == 0 {
			http.Error(w, "address and port required", http.StatusBadRequest)
			return
		}
		if entry.Name == "" {
			entry.Name = "Unnamed Server"
		}
		if len(entry.Name) > 100 {
			entry.Name = entry.Name[:100]
		}
		if len(entry.Description) > 500 {
			entry.Description = entry.Description[:500]
		}
		if len(entry.Address) > 253 {
			entry.Address = entry.Address[:253]
		}
		trackerStore.Register(entry)
		log.Printf("Tracker: registered %s (%s:%d) — %d user(s)", entry.Name, entry.Address, entry.Port, entry.Users)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	})

	// Tracker: GET /servers
	mux.HandleFunc("/servers", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}
		servers := trackerStore.List()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"servers": servers,
			"count":   len(servers),
		})
	})

	useTLS := *tlsCert != "" && *tlsKey != ""

	server := &http.Server{Addr: *addr, Handler: mux}

	go func() {
		var err error
		if useTLS {
			err = server.ListenAndServeTLS(*tlsCert, *tlsKey)
		} else {
			err = server.ListenAndServe()
		}
		if err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait briefly then confirm startup
	time.Sleep(300 * time.Millisecond)
	proto := "http"
	wsProto := "ws"
	if useTLS {
		proto = "https"
		wsProto = "wss"
	}
	log.Println("============================================")
	log.Printf("  HOTLINE MODERN SERVER")
	log.Println("============================================")
	log.Printf("  [OK] Serveur lance !")
	log.Printf("  [OK] Tracker operationnel !")
	log.Printf("  [OK] Fichiers disponibles sur /files/")
	log.Println("--------------------------------------------")
	log.Printf("  WebSocket : %s://localhost%s/ws", wsProto, *addr)
	log.Printf("  Tracker   : %s://localhost%s/servers", proto, *addr)
	log.Printf("  Fichiers  : %s://localhost%s/files/", proto, *addr)
	log.Println("--------------------------------------------")
	log.Printf("  Nom: %s", *serverName)
	log.Println("  Ctrl+C pour arreter.")

	// --- Self-registration with the embedded tracker ---
	regAddr := *publicAddr
	if regAddr == "" {
		regAddr = "localhost"
	}
	regPort := *publicPort
	if regPort == 0 {
		regPort = 9998
		if a := *addr; len(a) > 1 && a[0] == ':' {
			if p, err := strconv.Atoi(a[1:]); err == nil && p > 0 {
				regPort = p
			}
		}
	}

	// Register self directly in the embedded tracker (no network call)
	go func() {
		// Wait for the server to be ready
		time.Sleep(500 * time.Millisecond)
		for {
			trackerStore.Register(tracker.ServerEntry{
				Name:        *serverName,
				Description: *serverDesc,
				Address:     regAddr,
				Port:        regPort,
				Users:       h.ClientCount(),
			})
			time.Sleep(60 * time.Second)
		}
	}()

	// Also register with external trackers if configured
	ctx, cancelTracker := context.WithCancel(context.Background())
	if *trackerURLs != "" {
		urls := strings.Split(*trackerURLs, ",")
		for i := range urls {
			urls[i] = strings.TrimSpace(urls[i])
		}
		reg := tracker.NewRegistrar(urls, *serverName, *serverDesc, regAddr, regPort, h)
		go reg.Run(ctx)
		log.Printf("Also registering with external tracker(s): %s", *trackerURLs)
	}

	// Graceful shutdown on SIGINT/SIGTERM
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	cancelTracker()
	log.Println("Shutting down server...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	server.Shutdown(shutdownCtx)
	log.Println("Server stopped.")
}
