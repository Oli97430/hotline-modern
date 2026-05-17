package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
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

func main() {
	addr := flag.String("addr", ":9998", "WebSocket listen address")
	httpAddr := flag.String("http", ":9999", "HTTP file server address")
	dataDir := flag.String("data", "./data", "Data directory (database + files)")
	serverName := flag.String("name", "Hotline Server", "Server name")
	motd := flag.String("motd", "Welcome to Hotline Modern!", "Message of the day")
	tlsCert := flag.String("tls-cert", "", "TLS certificate file (enables HTTPS/WSS)")
	tlsKey := flag.String("tls-key", "", "TLS private key file")
	agreementFile := flag.String("agreement", "", "Path to a text file containing a server agreement shown to users on connect")
	trackerURLs := flag.String("tracker", "", "Comma-separated tracker URLs (e.g. http://tracker.example.com:9997)")
	publicAddr := flag.String("public-addr", "", "Public address for tracker registration (e.g. myserver.com)")
	serverDesc := flag.String("desc", "", "Server description for tracker listing")
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

	h := hub.New(authManager, chatManager, permManager, *serverName, *motd, agreementText)
	go h.Run()

	// WebSocket server
	wsMux := http.NewServeMux()
	wsMux.HandleFunc("/ws", h.HandleWebSocket)

	// File server
	fileMux := http.NewServeMux()
	fileServer.RegisterRoutes(fileMux)

	useTLS := *tlsCert != "" && *tlsKey != ""

	log.Printf("Hotline Modern server '%s' starting", *serverName)
	if useTLS {
		log.Printf("TLS enabled — WSS: %s | HTTPS files: %s", *addr, *httpAddr)
	} else {
		log.Printf("WebSocket: %s | HTTP files: %s", *addr, *httpAddr)
	}

	wsServer := &http.Server{Addr: *addr, Handler: wsMux}
	fileHTTPServer := &http.Server{Addr: *httpAddr, Handler: fileMux}

	startServer := func(srv *http.Server, label string) {
		var err error
		if useTLS {
			err = srv.ListenAndServeTLS(*tlsCert, *tlsKey)
		} else {
			err = srv.ListenAndServe()
		}
		if err != nil && err != http.ErrServerClosed {
			log.Fatalf("%s error: %v", label, err)
		}
	}

	go startServer(fileHTTPServer, "file server")
	go startServer(wsServer, "WebSocket server")

	// Register with tracker(s) if configured
	ctx, cancelTracker := context.WithCancel(context.Background())
	if *trackerURLs != "" {
		urls := strings.Split(*trackerURLs, ",")
		for i := range urls {
			urls[i] = strings.TrimSpace(urls[i])
		}
		regAddr := *publicAddr
		if regAddr == "" {
			regAddr = "localhost"
		}
		// Parse port from addr flag (e.g. ":9998" -> 9998)
		port := 9998
		if a := *addr; len(a) > 1 && a[0] == ':' {
			p := 0
			for _, c := range a[1:] {
				p = p*10 + int(c-'0')
			}
			if p > 0 {
				port = p
			}
		}
		reg := tracker.NewRegistrar(urls, *serverName, *serverDesc, regAddr, port, h)
		go reg.Run(ctx)
		log.Printf("Registering with tracker(s): %s", *trackerURLs)
	}

	// Graceful shutdown on SIGINT/SIGTERM
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	cancelTracker()
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	wsServer.Shutdown(ctx)
	fileHTTPServer.Shutdown(ctx)
	log.Println("Server stopped.")
}
