package tracker

import (
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

// key returns a unique identifier for a server.
func key(address string, port int) string {
	return address + ":" + string(rune(port))
}

// Register adds or updates a server entry.
func (s *Store) Register(entry ServerEntry) {
	s.mu.Lock()
	defer s.mu.Unlock()
	entry.LastSeen = time.Now()
	k := entry.Address + ":" + itoa(entry.Port)
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

func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	buf := make([]byte, 0, 6)
	for n > 0 {
		buf = append(buf, byte('0'+n%10))
		n /= 10
	}
	// reverse
	for i, j := 0, len(buf)-1; i < j; i, j = i+1, j-1 {
		buf[i], buf[j] = buf[j], buf[i]
	}
	return string(buf)
}
