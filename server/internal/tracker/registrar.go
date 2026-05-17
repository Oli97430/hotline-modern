package tracker

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

// ClientCounter provides the current user count.
type ClientCounter interface {
	ClientCount() int
}

// Registrar periodically announces a server to one or more trackers.
type Registrar struct {
	trackerURLs []string
	name        string
	description string
	address     string
	port        int
	counter     ClientCounter
	interval    time.Duration
	client      *http.Client
}

// NewRegistrar creates a registrar that will announce to the given tracker URLs.
func NewRegistrar(trackerURLs []string, name, description, address string, port int, counter ClientCounter) *Registrar {
	return &Registrar{
		trackerURLs: trackerURLs,
		name:        name,
		description: description,
		address:     address,
		port:        port,
		counter:     counter,
		interval:    60 * time.Second,
		client:      &http.Client{Timeout: 10 * time.Second},
	}
}

// Run starts the periodic registration loop. Blocks until ctx is canceled.
func (r *Registrar) Run(ctx context.Context) {
	// Register immediately on start
	r.announce()

	ticker := time.NewTicker(r.interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			r.announce()
		}
	}
}

func (r *Registrar) announce() {
	entry := ServerEntry{
		Name:        r.name,
		Description: r.description,
		Address:     r.address,
		Port:        r.port,
		Users:       r.counter.ClientCount(),
	}

	body, err := json.Marshal(entry)
	if err != nil {
		log.Printf("tracker: failed to marshal entry: %v", err)
		return
	}

	// Announce to all trackers in parallel to avoid sequential timeout delays
	var wg sync.WaitGroup
	for _, rawURL := range r.trackerURLs {
		wg.Add(1)
		go func(rawURL string) {
			defer wg.Done()
			url := strings.TrimRight(rawURL, "/") + "/register"
			resp, err := r.client.Post(url, "application/json", bytes.NewReader(body))
			if err != nil {
				log.Printf("tracker: failed to register with %s: %v", rawURL, err)
				return
			}
			resp.Body.Close()
			if resp.StatusCode != http.StatusOK {
				log.Printf("tracker: %s returned status %d", rawURL, resp.StatusCode)
			}
		}(rawURL)
	}
	wg.Wait()
}
