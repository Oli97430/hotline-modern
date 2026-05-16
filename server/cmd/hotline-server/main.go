package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"

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

	http.HandleFunc("/ws", h.HandleWebSocket)
	fileServer.RegisterRoutes(http.DefaultServeMux)

	log.Printf("Hotline Modern server '%s' starting", *serverName)
	log.Printf("WebSocket: %s | HTTP files: %s", *addr, *httpAddr)

	go func() {
		fileMux := http.NewServeMux()
		fileServer.RegisterRoutes(fileMux)
		if err := http.ListenAndServe(*httpAddr, fileMux); err != nil {
			log.Fatalf("HTTP file server error: %v", err)
		}
	}()

	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatalf("WebSocket server error: %v", err)
	}
}
