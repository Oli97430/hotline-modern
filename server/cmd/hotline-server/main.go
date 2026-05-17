package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/hotline-modern/server/internal/auth"
	"github.com/hotline-modern/server/internal/chat"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/files"
	"github.com/hotline-modern/server/internal/hub"
	"github.com/hotline-modern/server/internal/permissions"
)

func main() {
	addr := flag.String("addr", ":9998", "WebSocket listen address")
	httpAddr := flag.String("http", ":9999", "HTTP file server address")
	dataDir := flag.String("data", "./data", "Data directory (database + files)")
	serverName := flag.String("name", "Hotline Server", "Server name")
	motd := flag.String("motd", "Welcome to Hotline Modern!", "Message of the day")
	tlsCert := flag.String("tls-cert", "", "TLS certificate file (enables HTTPS/WSS)")
	tlsKey := flag.String("tls-key", "", "TLS private key file")
	flag.Parse()

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

	h := hub.New(authManager, chatManager, permManager, *serverName, *motd)
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

	// Graceful shutdown on SIGINT/SIGTERM
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	wsServer.Shutdown(ctx)
	fileHTTPServer.Shutdown(ctx)
	log.Println("Server stopped.")
}
