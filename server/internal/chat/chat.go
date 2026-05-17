package chat

import (
	"time"

	"github.com/hotline-modern/server/internal/db"
)

type Manager struct {
	db *db.DB
}

func New(database *db.DB) *Manager {
	return &Manager{db: database}
}

func (m *Manager) SaveMessage(id, channel, userKey, nickname, content string) error {
	msg := db.Message{
		ID:        id,
		Channel:   channel,
		UserKey:   userKey,
		Nickname:  nickname,
		Content:   content,
		Timestamp: time.Now(),
	}
	return m.db.SaveMessage(msg)
}

func (m *Manager) GetHistory(channel string, limit int) ([]db.Message, error) {
	if limit <= 0 {
		limit = 50
	}
	if limit > 200 {
		limit = 200
	}
	return m.db.GetMessages(channel, limit)
}

func (m *Manager) GetChannels() ([]db.Channel, error) {
	return m.db.GetChannels()
}

func (m *Manager) CreateChannel(name, topic, createdBy string) error {
	return m.db.CreateChannel(name, topic, createdBy)
}

func (m *Manager) ChannelExists(name string) (bool, error) {
	return m.db.ChannelExists(name)
}

func (m *Manager) SetTopic(channel, topic string) error {
	return m.db.SetChannelTopic(channel, topic)
}

func (m *Manager) DeleteChannel(name string) error {
	return m.db.DeleteChannel(name)
}

func (m *Manager) SearchMessages(query string, channel string, limit int) ([]db.Message, error) {
	if limit <= 0 {
		limit = 30
	}
	if limit > 100 {
		limit = 100
	}
	return m.db.SearchMessages(query, channel, limit)
}

func (m *Manager) EditMessage(id, userKey, content string) error {
	return m.db.EditMessage(id, userKey, content)
}

func (m *Manager) DeleteMessage(id, userKey string) error {
	return m.db.DeleteMessage(id, userKey)
}

func (m *Manager) DeleteMessageAdmin(id string) error {
	return m.db.DeleteMessageAdmin(id)
}

func (m *Manager) AddReaction(messageId, userKey, emoji string) error {
	return m.db.AddReaction(messageId, userKey, emoji)
}

func (m *Manager) RemoveReaction(messageId, userKey, emoji string) error {
	return m.db.RemoveReaction(messageId, userKey, emoji)
}

func (m *Manager) GetReactions(messageId string) ([]db.Reaction, error) {
	return m.db.GetReactions(messageId)
}

func (m *Manager) GetMessageReactions(messageIds []string) (map[string][]db.Reaction, error) {
	return m.db.GetMessageReactions(messageIds)
}

func (m *Manager) PinMessage(messageId, channel, pinnedBy string) error {
	return m.db.PinMessage(messageId, channel, pinnedBy)
}

func (m *Manager) UnpinMessage(messageId string) error {
	return m.db.UnpinMessage(messageId)
}

func (m *Manager) GetPinnedMessages(channel string) ([]db.Message, error) {
	return m.db.GetPinnedMessages(channel)
}

func (m *Manager) GetMessageById(id string) (*db.Message, error) {
	return m.db.GetMessageById(id)
}
