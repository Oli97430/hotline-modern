package auth

import (
	"crypto/ed25519"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"strconv"
	"sync"
	"time"

	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/permissions"
)

type Manager struct {
	db          *db.DB
	permissions *permissions.Manager
	nonces      map[string]string // connectionID -> nonce
	mu          sync.RWMutex
}

func New(database *db.DB, perm *permissions.Manager) *Manager {
	return &Manager{
		db:          database,
		permissions: perm,
		nonces:      make(map[string]string),
	}
}

func (m *Manager) GenerateNonce(connID string) (string, error) {
	nonce := make([]byte, 32)
	if _, err := rand.Read(nonce); err != nil {
		return "", err
	}
	nonceHex := hex.EncodeToString(nonce)

	m.mu.Lock()
	m.nonces[connID] = nonceHex
	m.mu.Unlock()

	return nonceHex, nil
}

func (m *Manager) Verify(connID, publicKeyHex, signatureHex, nonce, nickname string) (string, error) {
	m.mu.RLock()
	expectedNonce, exists := m.nonces[connID]
	m.mu.RUnlock()

	if !exists {
		return "", fmt.Errorf("no nonce for connection")
	}
	if nonce != expectedNonce {
		return "", fmt.Errorf("nonce mismatch")
	}

	// Validate nickname at auth time (same rules as nick change: 1-32 chars)
	if len(nickname) < 1 || len(nickname) > 32 {
		return "", fmt.Errorf("nickname must be 1-32 characters")
	}

	pubKeyBytes, err := hex.DecodeString(publicKeyHex)
	if err != nil {
		return "", fmt.Errorf("invalid public key hex: %w", err)
	}
	if len(pubKeyBytes) != ed25519.PublicKeySize {
		return "", fmt.Errorf("invalid public key length")
	}

	sigBytes, err := hex.DecodeString(signatureHex)
	if err != nil {
		return "", fmt.Errorf("invalid signature hex: %w", err)
	}

	if !ed25519.Verify(ed25519.PublicKey(pubKeyBytes), []byte(nonce), sigBytes) {
		return "", fmt.Errorf("signature verification failed")
	}

	m.mu.Lock()
	delete(m.nonces, connID)
	m.mu.Unlock()

	// Check if user is banned BEFORE granting access
	banned, err := m.db.IsBanned(publicKeyHex)
	if err != nil {
		return "", fmt.Errorf("database error: %w", err)
	}
	if banned {
		return "", fmt.Errorf("you are banned from this server")
	}

	hasUsers, err := m.db.HasAnyUser()
	if err != nil {
		return "", fmt.Errorf("database error: %w", err)
	}

	role := permissions.RoleMember
	if !hasUsers {
		role = permissions.RoleAdmin
	} else {
		existingUser, err := m.db.GetUser(publicKeyHex)
		if err == nil {
			role = existingUser.Role
		}
	}

	if err := m.db.UpsertUser(publicKeyHex, nickname, role); err != nil {
		return "", fmt.Errorf("failed to save user: %w", err)
	}

	return role, nil
}

// VerifyHTTPRequest verifies file server requests using timestamp-based signatures.
// The signature must be over "publicKey:timestamp" and the timestamp must be within 60 seconds.
func (m *Manager) VerifyHTTPRequest(publicKeyHex, signatureHex, timestamp string) error {
	pubKeyBytes, err := hex.DecodeString(publicKeyHex)
	if err != nil {
		return fmt.Errorf("invalid public key")
	}
	if len(pubKeyBytes) != ed25519.PublicKeySize {
		return fmt.Errorf("invalid public key length")
	}

	sigBytes, err := hex.DecodeString(signatureHex)
	if err != nil {
		return fmt.Errorf("invalid signature")
	}

	// Validate timestamp freshness (reject if older than 60 seconds)
	if timestamp == "" {
		// Fallback: accept legacy static signature for backwards compat (sign pubkey only)
		if !ed25519.Verify(ed25519.PublicKey(pubKeyBytes), []byte(publicKeyHex), sigBytes) {
			return fmt.Errorf("signature verification failed")
		}
		return nil
	}

	ts, err := strconv.ParseInt(timestamp, 10, 64)
	if err != nil {
		return fmt.Errorf("invalid timestamp")
	}
	now := time.Now().UnixMilli()
	if abs(now-ts) > 60000 { // 60 second window
		return fmt.Errorf("request expired")
	}

	// Verify signature over "publicKey:timestamp"
	message := publicKeyHex + ":" + timestamp
	if !ed25519.Verify(ed25519.PublicKey(pubKeyBytes), []byte(message), sigBytes) {
		return fmt.Errorf("signature verification failed")
	}

	return nil
}

func (m *Manager) CleanupNonce(connID string) {
	m.mu.Lock()
	delete(m.nonces, connID)
	m.mu.Unlock()
}

func abs(x int64) int64 {
	if x < 0 {
		return -x
	}
	return x
}
