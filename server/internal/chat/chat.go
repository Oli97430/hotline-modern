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
