package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/hotline-modern/server/internal/tracker"
)

func main() {
	addr := flag.String("addr", ":9997", "Tracker listen address")
	ttl := flag.Int("ttl", 120, "Server entry TTL in seconds (removed if no heartbeat)")
	flag.Parse()

	store := tracker.NewStore()

	// Cleanup expired servers periodically
	go func() {
		tick := time.NewTicker(30 * time.Second)
		defer tick.Stop()
		for range tick.C {
			if n := store.Cleanup(time.Duration(*ttl) * time.Second); n > 0 {
				log.Printf("Cleaned up %d expired server(s), %d remaining", n, store.Count())
			}
		}
	}()

	mux := http.NewServeMux()

	// POST /register — servers announce themselves
	mux.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "POST only", http.StatusMethodNotAllowed)
			return
		}

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

		store.Register(entry)
		log.Printf("Registered: %s (%s:%d) — %d user(s)", entry.Name, entry.Address, entry.Port, entry.Users)

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	})

	// GET /servers — clients fetch the list
	mux.HandleFunc("/servers", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "GET only", http.StatusMethodNotAllowed)
			return
		}

		// CORS for browser clients
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		servers := store.List()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"servers": servers,
			"count":   len(servers),
		})
	})

	// Handle CORS preflight for /servers
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.WriteHeader(http.StatusOK)
			return
		}

		// Health check on root
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "ok",
			"servers": store.Count(),
		})
	})

	server := &http.Server{Addr: *addr, Handler: mux}

	log.Printf("Hotline Tracker starting on %s (TTL: %ds)", *addr, *ttl)

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Tracker error: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Tracker shutting down...")
	server.Close()
}
