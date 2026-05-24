package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleChannelSlowmode(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Seconds int    `json:"seconds"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Seconds < 0 || payload.Seconds > 3600 {
		h.sendError(client, "slowmode must be 0-3600 seconds")
		return
	}

	if err := h.chat.SetChannelSlowmode(payload.Channel, payload.Seconds); err != nil {
		h.sendError(client, "failed to set slowmode")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleChannelDescription(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel     string `json:"channel"`
		Description string `json:"description"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if len(payload.Description) > 500 {
		h.sendError(client, "description too long (max 500 characters)")
		return
	}

	if err := h.chat.SetChannelDescription(payload.Channel, payload.Description); err != nil {
		h.sendError(client, "failed to set description")
		return
	}

	h.broadcastChannelList()
}

// ── Channel permission handlers ─────────────────────────────────────

var validChannelPermissions = map[string]bool{
	"chat": true, "upload": true, "react": true, "pin": true,
}

func (h *Hub) handleChannelPerms(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Channel == "" {
		h.sendError(client, "channel required")
		return
	}

	perms, err := h.chat.GetChannelPermissions(payload.Channel)
	if err != nil {
		h.sendError(client, "failed to get channel permissions")
		return
	}

	var list []map[string]interface{}
	for _, p := range perms {
		list = append(list, map[string]interface{}{
			"channel":    p.Channel,
			"role":       p.Role,
			"permission": p.Permission,
			"allowed":    p.Allowed,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgChannelPerms,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channel": payload.Channel, "permissions": list}),
	})
}

func (h *Hub) handleChannelPermsSet(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel    string `json:"channel"`
		Role       string `json:"role"`
		Permission string `json:"permission"`
		Allowed    *bool  `json:"allowed"` // nil means delete (reset to default)
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Channel == "" || payload.Role == "" || payload.Permission == "" {
		h.sendError(client, "channel, role, and permission required")
		return
	}

	// Validate permission name
	if !validChannelPermissions[payload.Permission] {
		h.sendError(client, "invalid permission: "+payload.Permission)
		return
	}

	// Validate role name
	switch payload.Role {
	case permissions.RoleAdmin, permissions.RoleOperator, permissions.RoleMember, permissions.RoleGuest:
	default:
		h.sendError(client, "invalid role: "+payload.Role)
		return
	}

	if payload.Allowed == nil {
		// Delete the override (reset to default)
		if err := h.chat.DeleteChannelPermission(payload.Channel, payload.Role, payload.Permission); err != nil {
			h.sendError(client, "failed to delete channel permission")
			return
		}
	} else {
		if err := h.chat.SetChannelPermission(payload.Channel, payload.Role, payload.Permission, *payload.Allowed); err != nil {
			h.sendError(client, "failed to set channel permission")
			return
		}
	}

	// Return updated permissions to the admin
	perms, err := h.chat.GetChannelPermissions(payload.Channel)
	if err != nil {
		h.sendError(client, "failed to get channel permissions")
		return
	}

	var list []map[string]interface{}
	for _, p := range perms {
		list = append(list, map[string]interface{}{
			"channel":    p.Channel,
			"role":       p.Role,
			"permission": p.Permission,
			"allowed":    p.Allowed,
		})
	}

	// Broadcast to all authenticated clients so permissions take effect immediately
	h.broadcastAll(Message{
		Type:      MsgChannelPerms,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channel": payload.Channel, "permissions": list}),
	})
}

// ── Welcome message handlers ────────────────────────────────────────

func (h *Hub) handleWelcomeSet(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Message string `json:"message"`
		Enabled bool   `json:"enabled"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	if len(payload.Message) > 500 {
		h.sendError(client, "welcome message too long (max 500 characters)")
		return
	}

	if err := h.chat.SetWelcomeMessage(payload.Channel, payload.Message, payload.Enabled); err != nil {
		h.sendError(client, "failed to save welcome message")
		return
	}

	// Return the updated list
	h.handleWelcomeList(client, msg)
}

func (h *Hub) handleWelcomeList(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	messages, err := h.chat.GetAllWelcomeMessages()
	if err != nil {
		h.sendError(client, "failed to get welcome messages")
		return
	}

	var list []map[string]interface{}
	for _, wm := range messages {
		list = append(list, map[string]interface{}{
			"channel": wm.Channel,
			"message": wm.Message,
			"enabled": wm.Enabled,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgWelcomeList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"welcomeMessages": list}),
	})
}


