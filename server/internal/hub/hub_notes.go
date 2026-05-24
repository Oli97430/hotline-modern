package hub

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/permissions"
)

func (h *Hub) handleUserNoteAdd(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		TargetUserId string `json:"targetUserId"`
		Content      string `json:"content"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.TargetUserId == "" || payload.Content == "" {
		h.sendError(client, "targetUserId and content required")
		return
	}
	if len(payload.Content) > 500 {
		h.sendError(client, "note too long (max 500 characters)")
		return
	}

	if err := h.chat.AddUserNote(payload.TargetUserId, client.PublicKey, client.Nickname, payload.Content); err != nil {
		h.sendError(client, "failed to add note")
		return
	}

	h.sendUserNoteList(client, payload.TargetUserId)
}

func (h *Hub) handleUserNoteList(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		TargetUserId string `json:"targetUserId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.TargetUserId == "" {
		h.sendError(client, "targetUserId required")
		return
	}

	h.sendUserNoteList(client, payload.TargetUserId)
}

func (h *Hub) handleUserNoteDelete(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		NoteId       int    `json:"noteId"`
		TargetUserId string `json:"targetUserId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.DeleteUserNote(payload.NoteId); err != nil {
		h.sendError(client, "failed to delete note")
		return
	}

	if payload.TargetUserId != "" {
		h.sendUserNoteList(client, payload.TargetUserId)
	}
}

func (h *Hub) sendUserNoteList(client *Client, targetUserId string) {
	notes, err := h.chat.GetUserNotes(targetUserId)
	if err != nil {
		h.sendError(client, "failed to get notes")
		return
	}

	var list []map[string]interface{}
	for _, n := range notes {
		list = append(list, map[string]interface{}{
			"id":         n.ID,
			"targetKey":  n.TargetKey,
			"authorKey":  n.AuthorKey,
			"authorName": n.AuthorName,
			"content":    n.Content,
			"createdAt":  n.CreatedAt,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgUserNoteList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"targetUserId": targetUserId, "notes": list}),
	})
}

