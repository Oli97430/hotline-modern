package hub

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleRetentionPurge(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel      string `json:"channel"`
		OlderThanDays int   `json:"olderThanDays"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	if payload.OlderThanDays <= 0 {
		h.sendError(client, "olderThanDays must be positive")
		return
	}

	beforeTs := time.Now().UnixMilli() - int64(payload.OlderThanDays)*86400*1000
	count, err := h.chat.DeleteMessagesBefore(payload.Channel, beforeTs)
	if err != nil {
		h.sendError(client, "purge failed")
		return
	}

	// Audit log
	channelLabel := payload.Channel
	if channelLabel == "" {
		channelLabel = "all channels"
	}
	details := fmt.Sprintf("Purged %d messages from #%s older than %d days", count, channelLabel, payload.OlderThanDays)
	h.chat.AddAuditLog("message_purge", client.PublicKey, client.Nickname, "", "", details)

	// Return updated stats
	h.sendRetentionStats(client)
}

func (h *Hub) handleRetentionStats(client *Client) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}
	h.sendRetentionStats(client)
}

func (h *Hub) sendRetentionStats(client *Client) {
	total, _ := h.chat.GetMessageCount()
	byChannel, _ := h.chat.GetMessageCountByChannel()

	var chList []map[string]interface{}
	for _, c := range byChannel {
		chList = append(chList, map[string]interface{}{
			"channel": c.Channel,
			"count":   c.Count,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgRetentionStats,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"totalMessages": total,
			"byChannel":     chList,
		}),
	})
}

func (h *Hub) handleRetentionExport(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Limit   int    `json:"limit"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	if payload.Limit <= 0 || payload.Limit > 10000 {
		payload.Limit = 10000
	}

	msgs, err := h.chat.ExportMessages(payload.Channel, payload.Limit)
	if err != nil {
		h.sendError(client, "export failed")
		return
	}

	var list []map[string]string
	for _, m := range msgs {
		list = append(list, map[string]string{
			"id":        m.ID,
			"channel":   m.Channel,
			"userId":    m.UserID,
			"nickname":  m.Nickname,
			"content":   m.Content,
			"timestamp": m.Timestamp,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgRetentionExport,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"messages": list}),
	})
}

