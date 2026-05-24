package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

// VoiceParticipant represents a user in a voice channel.
type VoiceParticipant struct {
	PublicKey string `json:"userId"`
	Nickname  string `json:"nickname"`
	Muted     bool   `json:"muted"`
	Deafened  bool   `json:"deafened"`
}

func (h *Hub) handleVoiceJoin(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if !client.Channels[payload.Channel] {
		h.sendError(client, "not in channel")
		return
	}

	h.mu.Lock()
	// Remove from any existing voice channel (one voice channel at a time)
	for ch, participants := range h.voiceChannels {
		if _, inVoice := participants[client.PublicKey]; inVoice {
			delete(participants, client.PublicKey)
			if len(participants) == 0 {
				delete(h.voiceChannels, ch)
			}
			break
		}
	}
	// Join the requested voice channel
	if h.voiceChannels[payload.Channel] == nil {
		h.voiceChannels[payload.Channel] = make(map[string]*VoiceParticipant)
	}
	h.voiceChannels[payload.Channel][client.PublicKey] = &VoiceParticipant{
		PublicKey: client.PublicKey,
		Nickname:  client.Nickname,
		Muted:     false,
		Deafened:  false,
	}
	h.mu.Unlock()

	h.broadcastVoiceState(payload.Channel)
}

func (h *Hub) handleVoiceLeave(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.mu.Lock()
	if participants := h.voiceChannels[payload.Channel]; participants != nil {
		delete(participants, client.PublicKey)
		if len(participants) == 0 {
			delete(h.voiceChannels, payload.Channel)
		}
	}
	h.mu.Unlock()

	h.broadcastVoiceState(payload.Channel)
}

func (h *Hub) handleVoiceRelay(client *Client, msg Message, relayType string) {
	if client.PublicKey == "" {
		return
	}

	// Parse the full payload as a map so we can forward all fields (sdp/candidate)
	var raw map[string]interface{}
	if err := json.Unmarshal(msg.Payload, &raw); err != nil {
		return
	}
	targetId, _ := raw["targetUserId"].(string)
	if targetId == "" {
		return
	}

	// Build relay payload: copy original fields and add fromUserId
	raw["fromUserId"] = client.PublicKey
	delete(raw, "targetUserId")

	h.mu.RLock()
	target := h.pubKeyIndex[targetId]
	h.mu.RUnlock()

	if target == nil {
		return
	}

	h.sendToClient(target, Message{
		Type:      relayType,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(raw),
	})
}

func (h *Hub) handleVoiceMute(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Muted    bool `json:"muted"`
		Deafened bool `json:"deafened"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	var foundChannel string
	h.mu.Lock()
	for ch, participants := range h.voiceChannels {
		if p, ok := participants[client.PublicKey]; ok {
			p.Muted = payload.Muted
			p.Deafened = payload.Deafened
			foundChannel = ch
			break
		}
	}
	h.mu.Unlock()

	if foundChannel != "" {
		h.broadcastVoiceState(foundChannel)
	}
}

func (h *Hub) broadcastVoiceState(channel string) {
	h.mu.RLock()
	var participants []*VoiceParticipant
	for _, p := range h.voiceChannels[channel] {
		participants = append(participants, p)
	}
	clients := h.channels[channel]
	data, _ := json.Marshal(Message{
		Type:      MsgVoiceState,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":      channel,
			"participants": participants,
		}),
	})
	for _, c := range clients {
		select {
		case c.Send <- data:
		default:
		}
	}
	h.mu.RUnlock()
}
