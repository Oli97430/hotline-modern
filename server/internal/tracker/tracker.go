package tracker

import (
	"fmt"
	"sync"
	"time"
)

// ServerEntry represents a server registered with the tracker.
type ServerEntry struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Address     string   `json:"address"`
	Port        int      `json:"port"`
	Users       int      `json:"users"`
	MaxUsers    int      `json:"maxUsers,omitempty"`
	Tags        []string `json:"tags,omitempty"`
	LastSeen    time.Time `json:"-"`
}

// Store holds registered servers in memory.
type Store struct {
	mu      sync.RWMutex
	servers map[string]*ServerEntry
}

// NewStore creates a new in-memory server store.
func NewStore() *Store {
	return &Store{
		servers: make(map[string]*ServerEntry),
	}
}

// Register adds or updates a server entry.
func (s *Store) Register(entry ServerEntry) {
	s.mu.Lock()
	defer s.mu.Unlock()
	entry.LastSeen = time.Now()
	k := fmt.Sprintf("%s:%d", entry.Address, entry.Port)
	s.servers[k] = &entry
}

// List returns all registered servers.
func (s *Store) List() []ServerEntry {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := make([]ServerEntry, 0, len(s.servers))
	for _, e := range s.servers {
		result = append(result, *e)
	}
	return result
}

// Cleanup removes servers that haven't sent a heartbeat within the TTL.
func (s *Store) Cleanup(ttl time.Duration) int {
	s.mu.Lock()
	defer s.mu.Unlock()
	cutoff := time.Now().Add(-ttl)
	removed := 0
	for k, e := range s.servers {
		if e.LastSeen.Before(cutoff) {
			delete(s.servers, k)
			removed++
		}
	}
	return removed
}

// Count returns the number of registered servers.
func (s *Store) Count() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return len(s.servers)
}

