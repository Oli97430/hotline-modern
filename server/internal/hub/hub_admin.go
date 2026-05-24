package hub

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleKick(client *Client, msg Message) {
	if !h.permissions.CanKick(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		UserId string `json:"userId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.mu.RLock()
	target := h.pubKeyIndex[payload.UserId]
	h.mu.RUnlock()

	var targetNick string
	if target != nil {
		targetNick = target.Nickname
		h.sendToClient(target, Message{
			Type:      MsgError,
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]interface{}{"code": "kicked", "message": "You have been kicked"}),
		})
		target.Conn.Close()
	}

	h.chat.AddAuditLog("kick", client.PublicKey, client.Nickname, payload.UserId, targetNick, "")
}

func (h *Hub) handleBan(client *Client, msg Message) {
	if !h.permissions.CanBan(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		UserId string `json:"userId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.permissions.SetRole(payload.UserId, permissions.RoleGuest)

	// Find nickname via index and persist ban
	h.mu.RLock()
	target := h.pubKeyIndex[payload.UserId]
	var targetNick string
	if target != nil {
		targetNick = target.Nickname
	}
	h.mu.RUnlock()

	h.chat.AddBan(payload.UserId, targetNick, client.PublicKey, "")

	if target != nil {
		h.sendToClient(target, Message{
			Type:      MsgError,
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]interface{}{"code": "banned", "message": "You have been banned"}),
		})
		target.Conn.Close()
	}

	h.chat.AddAuditLog("ban", client.PublicKey, client.Nickname, payload.UserId, targetNick, "")
}

func (h *Hub) handleUnban(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		PublicKey string `json:"publicKey"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.RemoveBan(payload.PublicKey); err != nil {
		h.sendError(client, "failed to unban")
		return
	}

	h.permissions.SetRole(payload.PublicKey, permissions.RoleMember)

	h.sendToClient(client, Message{
		Type:      MsgAdminUnbanned,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"publicKey": payload.PublicKey}),
	})

	h.chat.AddAuditLog("unban", client.PublicKey, client.Nickname, payload.PublicKey, "", "")
}

func (h *Hub) handleBanList(client *Client) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	bans, err := h.chat.GetBans()
	if err != nil {
		h.sendError(client, "failed to get ban list")
		return
	}

	var list []map[string]interface{}
	for _, b := range bans {
		list = append(list, map[string]interface{}{
			"publicKey": b.PublicKey,
			"nickname":  b.Nickname,
			"bannedBy":  b.BannedBy,
			"reason":    b.Reason,
			"bannedAt":  b.BannedAt.UnixMilli(),
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgAdminBanlist,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"bans": list}),
	})
}

func (h *Hub) handleOp(client *Client, msg Message) {
	var payload struct {
		UserId string `json:"userId"`
		Role   string `json:"role"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if !h.permissions.CanSetRole(client.Role, payload.Role) {
		h.sendError(client, "permission denied")
		return
	}

	if err := h.permissions.SetRole(payload.UserId, payload.Role); err != nil {
		h.sendError(client, "failed to set role")
		return
	}

	// Use write lock since we're mutating c.Role
	var targetNick string
	h.mu.Lock()
	if target := h.pubKeyIndex[payload.UserId]; target != nil {
		target.Role = payload.Role
		targetNick = target.Nickname
	}
	h.mu.Unlock()

	h.broadcastAll(Message{
		Type:      MsgUserRoleChanged,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId": payload.UserId,
			"role":   payload.Role,
		}),
	})

	h.chat.AddAuditLog("set_role", client.PublicKey, client.Nickname, payload.UserId, targetNick, payload.Role)
}

func (h *Hub) handleTopic(client *Client, msg Message) {
	if !h.permissions.CanCreateChannel(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Topic   string `json:"topic"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.SetTopic(payload.Channel, payload.Topic); err != nil {
		h.sendError(client, "failed to set topic")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleAdminSettings(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		ServerName string `json:"serverName"`
		Motd       string `json:"motd"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.mu.Lock()
	if payload.ServerName != "" {
		h.serverName = payload.ServerName
	}
	h.motd = payload.Motd
	serverName := h.serverName
	motd := h.motd
	h.mu.Unlock()

	h.chat.SetSetting("server_name", serverName)
	h.chat.SetSetting("motd", motd)

	// Broadcast updated info to all clients
	h.broadcastAll(Message{
		Type:      MsgServerSettingsUpdated,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"serverName": serverName,
			"motd":       motd,
		}),
	})

	h.chat.AddAuditLog("settings_update", client.PublicKey, client.Nickname, "", "", "serverName="+serverName)
}

func (h *Hub) handleMute(client *Client, msg Message) {
	if !h.permissions.CanMute(client.Role) {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		PublicKey string `json:"publicKey"`
		Reason   string `json:"reason"`
		Duration int    `json:"duration"` // minutes, 0 = permanent
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	var expiresAt *time.Time
	if payload.Duration > 0 {
		t := time.Now().Add(time.Duration(payload.Duration) * time.Minute)
		expiresAt = &t
	}
	if err := h.chat.AddMute(payload.PublicKey, client.PublicKey, payload.Reason, expiresAt); err != nil {
		h.sendError(client, "failed to mute user")
		return
	}
	// Notify the muted user if online
	var targetNick string
	h.mu.RLock()
	if target := h.pubKeyIndex[payload.PublicKey]; target != nil {
		targetNick = target.Nickname
		reason := "You have been muted"
		if payload.Reason != "" {
			reason += ": " + payload.Reason
		}
		h.sendError(target, reason)
	}
	h.mu.RUnlock()
	// Send updated mute list back
	h.handleMuteList(client)

	muteDetails := payload.Reason
	if payload.Duration > 0 {
		muteDetails += fmt.Sprintf(" (%dmin)", payload.Duration)
	}
	h.chat.AddAuditLog("mute", client.PublicKey, client.Nickname, payload.PublicKey, targetNick, muteDetails)
}

func (h *Hub) handleUnmute(client *Client, msg Message) {
	if !h.permissions.CanMute(client.Role) {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		PublicKey string `json:"publicKey"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	h.chat.RemoveMute(payload.PublicKey)
	h.handleMuteList(client)

	h.chat.AddAuditLog("unmute", client.PublicKey, client.Nickname, payload.PublicKey, "", "")
}

func (h *Hub) handleMuteList(client *Client) {
	if !h.permissions.CanMute(client.Role) {
		h.sendError(client, "permission denied")
		return
	}
	mutes, err := h.chat.GetMutes()
	if err != nil {
		h.sendError(client, "failed to get mute list")
		return
	}
	var list []map[string]interface{}
	for _, m := range mutes {
		entry := map[string]interface{}{
			"publicKey": m.PublicKey,
			"mutedBy":   m.MutedBy,
			"reason":    m.Reason,
			"mutedAt":   m.MutedAt.UnixMilli(),
		}
		if m.ExpiresAt != nil {
			entry["expiresAt"] = m.ExpiresAt.UnixMilli()
		}
		list = append(list, entry)
	}
	h.sendToClient(client, Message{
		Type:      MsgAdminMutelist,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"mutes": list}),
	})
}

func (h *Hub) handleAdminUserList(client *Client) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	users, err := h.chat.GetAllUsers()
	if err != nil {
		h.sendError(client, "failed to get user list")
		return
	}
	h.mu.RLock()
	var list []map[string]interface{}
	for _, u := range users {
		online := h.pubKeyIndex[u.PublicKey] != nil
		list = append(list, map[string]interface{}{
			"publicKey": u.PublicKey,
			"nickname":  u.Nickname,
			"role":      u.Role,
			"online":    online,
			"lastSeen":  u.LastSeen.UnixMilli(),
		})
	}
	h.mu.RUnlock()
	h.sendToClient(client, Message{
		Type:      MsgAdminUserList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"users": list}),
	})
}

func (h *Hub) handleRenameChannel(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		OldName string `json:"oldName"`
		NewName string `json:"newName"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.OldName == "lobby" {
		h.sendError(client, "cannot rename lobby")
		return
	}
	if payload.NewName == "" || len(payload.NewName) > 30 {
		h.sendError(client, "invalid channel name")
		return
	}
	if err := h.chat.RenameChannel(payload.OldName, payload.NewName); err != nil {
		h.sendError(client, "rename failed")
		return
	}
	// Update in-memory channels
	h.mu.Lock()
	if members, ok := h.channels[payload.OldName]; ok {
		h.channels[payload.NewName] = members
		delete(h.channels, payload.OldName)
		for _, c := range members {
			delete(c.Channels, payload.OldName)
			c.Channels[payload.NewName] = true
		}
	}
	h.mu.Unlock()
	h.broadcastChannelList()

	h.chat.AddAuditLog("channel_rename", client.PublicKey, client.Nickname, "", "", payload.OldName+" → "+payload.NewName)
}

func (h *Hub) handleChannelDelete(client *Client, msg Message) {
	if !h.permissions.CanCreateChannel(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Name string `json:"name"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Name == "lobby" {
		h.sendError(client, "cannot delete lobby")
		return
	}

	h.mu.Lock()
	if members := h.channels[payload.Name]; members != nil {
		for _, c := range members {
			delete(c.Channels, payload.Name)
		}
		delete(h.channels, payload.Name)
	}
	h.mu.Unlock()

	h.chat.DeleteChannel(payload.Name)
	h.broadcastChannelList()

	h.chat.AddAuditLog("channel_delete", client.PublicKey, client.Nickname, "", "", payload.Name)
}
