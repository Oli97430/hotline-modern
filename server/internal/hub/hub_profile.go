package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleProfileGet(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		UserId string `json:"userId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	targetKey := payload.UserId
	if targetKey == "" {
		targetKey = client.PublicKey
	}

	profile, err := h.chat.GetUserProfile(targetKey)
	if err != nil || profile == nil {
		// Return empty profile
		h.sendToClient(client, Message{
			Type:      MsgProfileData,
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload: mustMarshal(map[string]interface{}{
				"userId":       targetKey,
				"bio":          "",
				"customStatus": "",
				"pronouns":     "",
				"timezone":     "",
			}),
		})
		return
	}

	h.sendToClient(client, Message{
		Type:      MsgProfileData,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":       profile.PublicKey,
			"bio":          profile.Bio,
			"customStatus": profile.CustomStatus,
			"pronouns":     profile.Pronouns,
			"timezone":     profile.Timezone,
		}),
	})
}

func (h *Hub) handleProfileUpdate(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Bio          string `json:"bio"`
		CustomStatus string `json:"customStatus"`
		Pronouns     string `json:"pronouns"`
		Timezone     string `json:"timezone"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	// Validation
	if len(payload.Bio) > 500 {
		h.sendError(client, "bio too long (max 500 characters)")
		return
	}
	if len(payload.CustomStatus) > 100 {
		h.sendError(client, "custom status too long (max 100 characters)")
		return
	}
	if len(payload.Pronouns) > 50 {
		h.sendError(client, "pronouns too long (max 50 characters)")
		return
	}
	if len(payload.Timezone) > 50 {
		h.sendError(client, "timezone too long (max 50 characters)")
		return
	}

	profile := db.UserProfile{
		PublicKey:    client.PublicKey,
		Bio:          payload.Bio,
		CustomStatus: payload.CustomStatus,
		Pronouns:     payload.Pronouns,
		Timezone:     payload.Timezone,
	}

	if err := h.chat.SetUserProfile(profile); err != nil {
		h.sendError(client, "failed to update profile")
		return
	}

	// Notify all clients that profile was updated
	h.broadcastAll(Message{
		Type:      MsgProfileUpdated,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":       client.PublicKey,
			"bio":          payload.Bio,
			"customStatus": payload.CustomStatus,
			"pronouns":     payload.Pronouns,
			"timezone":     payload.Timezone,
		}),
	})
}

// ── Audit log handler ───────────────────────────────────────────────

func (h *Hub) handleAuditLog(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Limit  int `json:"limit"`
		Offset int `json:"offset"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	if payload.Limit <= 0 || payload.Limit > 100 {
		payload.Limit = 50
	}
	if payload.Offset < 0 {
		payload.Offset = 0
	}

	entries, err := h.chat.GetAuditLog(payload.Limit, payload.Offset)
	if err != nil {
		h.sendError(client, "failed to get audit log")
		return
	}

	total, _ := h.chat.GetAuditLogCount()

	var list []map[string]interface{}
	for _, e := range entries {
		list = append(list, map[string]interface{}{
			"id":         e.ID,
			"action":     e.Action,
			"actorKey":   e.ActorKey,
			"actorName":  e.ActorName,
			"targetKey":  e.TargetKey,
			"targetName": e.TargetName,
			"details":    e.Details,
			"createdAt":  e.CreatedAt,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgAuditLog,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"entries": list,
			"total":   total,
			"offset":  payload.Offset,
		}),
	})
}

