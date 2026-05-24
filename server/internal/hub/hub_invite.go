package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleInviteCreate(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		MaxUses     int `json:"maxUses"`
		ExpireHours int `json:"expireHours"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	code, err := db.GenerateInviteCode()
	if err != nil {
		h.sendError(client, "failed to generate invite code")
		return
	}

	var expiresAt *time.Time
	if payload.ExpireHours > 0 {
		t := time.Now().Add(time.Duration(payload.ExpireHours) * time.Hour)
		expiresAt = &t
	}

	if err := h.chat.CreateInvite(code, client.PublicKey, payload.MaxUses, expiresAt); err != nil {
		h.sendError(client, "failed to create invite")
		return
	}

	h.sendInviteList(client)
}

func (h *Hub) handleInviteList(client *Client) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	h.sendInviteList(client)
}

func (h *Hub) handleInviteDelete(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Code string `json:"code"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.DeleteInvite(payload.Code); err != nil {
		h.sendError(client, "failed to delete invite")
		return
	}

	h.sendInviteList(client)
}

func (h *Hub) sendInviteList(client *Client) {
	invites, err := h.chat.GetInvites()
	if err != nil {
		h.sendError(client, "failed to get invites")
		return
	}

	var list []map[string]interface{}
	for _, inv := range invites {
		entry := map[string]interface{}{
			"code":      inv.Code,
			"createdBy": inv.CreatedBy,
			"maxUses":   inv.MaxUses,
			"uses":      inv.Uses,
			"createdAt": inv.CreatedAt.UnixMilli(),
		}
		if inv.ExpiresAt != nil {
			entry["expiresAt"] = inv.ExpiresAt.UnixMilli()
		}
		list = append(list, entry)
	}

	h.sendToClient(client, Message{
		Type:      MsgInviteList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"invites": list}),
	})
}

