package files

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hotline-modern/server/internal/auth"
	"github.com/hotline-modern/server/internal/permissions"
)

type Server struct {
	rootDir     string
	auth        *auth.Manager
	permissions *permissions.Manager
}

type FileEntry struct {
	Name     string    `json:"name"`
	Size     int64     `json:"size"`
	IsDir    bool      `json:"isDir"`
	Modified time.Time `json:"modified"`
}

func New(rootDir string, authMgr *auth.Manager, permMgr *permissions.Manager) *Server {
	return &Server{
		rootDir:     rootDir,
		auth:        authMgr,
		permissions: permMgr,
	}
}

func (s *Server) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/files/", s.handleFiles)
}

func (s *Server) validatePath(reqPath string) (string, error) {
	fullPath := filepath.Join(s.rootDir, filepath.Clean("/"+reqPath))
	if !strings.HasPrefix(fullPath, s.rootDir) {
		return "", fmt.Errorf("path traversal attempt")
	}
	return fullPath, nil
}

func (s *Server) handleFiles(w http.ResponseWriter, r *http.Request) {
	// CORS headers — restrict to requesting origin (not wildcard)
	origin := r.Header.Get("Origin")
	if origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
	}
	w.Header().Set("Access-Control-Allow-Headers", "X-Hotline-PublicKey, X-Hotline-Signature, X-Hotline-Timestamp, Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	pubKey := r.Header.Get("X-Hotline-PublicKey")
	sig := r.Header.Get("X-Hotline-Signature")
	timestamp := r.Header.Get("X-Hotline-Timestamp")

	if pubKey == "" || sig == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	if err := s.auth.VerifyHTTPRequest(pubKey, sig, timestamp); err != nil {
		http.Error(w, "invalid credentials", http.StatusForbidden)
		return
	}

	role := s.permissions.GetRole(pubKey)

	switch r.Method {
	case http.MethodGet:
		s.handleGet(w, r, role)
	case http.MethodPost:
		s.handleUpload(w, r, role)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func (s *Server) handleGet(w http.ResponseWriter, r *http.Request, role string) {
	if !s.permissions.CanDownload(role) {
		http.Error(w, "permission denied", http.StatusForbidden)
		return
	}

	reqPath := strings.TrimPrefix(r.URL.Path, "/files/")
	if reqPath == "" || strings.HasSuffix(r.URL.Path, "/") {
		s.listDirectory(w, r, reqPath)
		return
	}

	fullPath, err := s.validatePath(reqPath)
	if err != nil {
		http.Error(w, "invalid path", http.StatusBadRequest)
		return
	}

	info, err := os.Stat(fullPath)
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	if info.IsDir() {
		s.listDirectory(w, r, reqPath)
		return
	}

	http.ServeFile(w, r, fullPath)
}

func (s *Server) listDirectory(w http.ResponseWriter, r *http.Request, dirPath string) {
	fullPath, err := s.validatePath(dirPath)
	if err != nil {
		http.Error(w, "invalid path", http.StatusBadRequest)
		return
	}

	entries, err := os.ReadDir(fullPath)
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	var fileEntries []FileEntry
	for _, entry := range entries {
		info, err := entry.Info()
		if err != nil {
			continue
		}
		fileEntries = append(fileEntries, FileEntry{
			Name:     entry.Name(),
			Size:     info.Size(),
			IsDir:    entry.IsDir(),
			Modified: info.ModTime(),
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"path":    dirPath,
		"entries": fileEntries,
	})
}

func (s *Server) handleUpload(w http.ResponseWriter, r *http.Request, role string) {
	if !s.permissions.CanUpload(role) {
		http.Error(w, "permission denied", http.StatusForbidden)
		return
	}

	reqPath := strings.TrimPrefix(r.URL.Path, "/files/")

	// Support multipart form with auto filename
	r.ParseMultipartForm(32 << 20) // 32MB max
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "no file in request", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// If reqPath is empty or ends in /, use original filename
	if reqPath == "" || strings.HasSuffix(reqPath, "/") {
		reqPath = reqPath + header.Filename
	}

	fullPath, err := s.validatePath(reqPath)
	if err != nil {
		http.Error(w, "invalid path", http.StatusBadRequest)
		return
	}

	if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	dst, err := os.Create(fullPath)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	written, err := io.Copy(dst, file)
	if err != nil {
		http.Error(w, "upload failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "ok",
		"path":     reqPath,
		"filename": header.Filename,
		"size":     written,
	})
}
