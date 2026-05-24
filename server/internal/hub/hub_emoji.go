package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) sendCustomEmojiList(client *Client) {
	emojis, err := h.chat.GetCustomEmojis()
	if err != nil {
		return
	}
	var list []map[string]string
	for _, e := range emojis {
		list = append(list, map[string]string{
			"name": e.Name,
			"url":  "/files/emojis/" + e.Filename,
		})
	}
	h.sendToClient(client, Message{
		Type:      MsgCustomEmojiList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"emojis": list}),
	})
}

func (h *Hub) handleCustomEmojiList(client *Client) {
	if client.PublicKey == "" {
		return
	}
	h.sendCustomEmojiList(client)
}

func (h *Hub) handleCustomEmojiAdd(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		Name     string `json:"name"`
		Filename string `json:"filename"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Name == "" || payload.Filename == "" {
		h.sendError(client, "name and filename required")
		return
	}
	// Sanitize: only allow alphanumeric, underscore, dash in name
	for _, r := range payload.Name {
		if !((r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '_' || r == '-') {
			h.sendError(client, "invalid emoji name (lowercase alphanumeric, _, - only)")
			return
		}
	}
	if len(payload.Name) > 32 {
		h.sendError(client, "emoji name too long (max 32)")
		return
	}
	if err := h.chat.AddCustomEmoji(payload.Name, client.PublicKey, payload.Filename); err != nil {
		h.sendError(client, "failed to add custom emoji")
		return
	}
	// Broadcast updated list to all clients
	h.broadcastCustomEmojiList()
}

func (h *Hub) handleCustomEmojiRemove(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		Name string `json:"name"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Name == "" {
		return
	}
	if err := h.chat.RemoveCustomEmoji(payload.Name); err != nil {
		h.sendError(client, "failed to remove custom emoji")
		return
	}
	h.broadcastCustomEmojiList()
}

func (h *Hub) broadcastCustomEmojiList() {
	emojis, err := h.chat.GetCustomEmojis()
	if err != nil {
		return
	}
	var list []map[string]string
	for _, e := range emojis {
		list = append(list, map[string]string{
			"name": e.Name,
			"url":  "/files/emojis/" + e.Filename,
		})
	}
	h.broadcastAll(Message{
		Type:      MsgCustomEmojiList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"emojis": list}),
	})
}

