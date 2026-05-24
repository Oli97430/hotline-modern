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

func clampLimit(limit, min, max int) int {
	if limit < min {
		return min
	}
	if limit > max {
		return max
	}
	return limit
}

func (m *Manager) SaveMessage(id, channel, userKey, nickname, content, replyTo, msgType string) error {
	msg := db.Message{
		ID:        id,
		Channel:   channel,
		UserKey:   userKey,
		Nickname:  nickname,
		Content:   content,
		ReplyTo:   replyTo,
		MsgType:   msgType,
		Timestamp: time.Now(),
	}
	return m.db.SaveMessage(msg)
}

func (m *Manager) GetHistory(channel string, limit int) ([]db.Message, error) {
	if limit <= 0 {
		limit = 50
	}
	limit = clampLimit(limit, 1, 200)
	return m.db.GetMessages(channel, limit)
}

func (m *Manager) GetChannels() ([]db.Channel, error) {
	return m.db.GetChannels()
}

func (m *Manager) CreateChannel(name, topic, createdBy, password string) error {
	return m.db.CreateChannel(name, topic, createdBy, password)
}

func (m *Manager) CheckChannelPassword(name, password string) (bool, error) {
	return m.db.CheckChannelPassword(name, password)
}

func (m *Manager) ChannelExists(name string) (bool, error) {
	return m.db.ChannelExists(name)
}

func (m *Manager) SetTopic(channel, topic string) error {
	return m.db.SetChannelTopic(channel, topic)
}

func (m *Manager) SetChannelSlowmode(channel string, seconds int) error {
	return m.db.SetChannelSlowmode(channel, seconds)
}

func (m *Manager) GetChannelSlowmode(channel string) (int, error) {
	return m.db.GetChannelSlowmode(channel)
}

func (m *Manager) SetChannelDescription(channel, description string) error {
	return m.db.SetChannelDescription(channel, description)
}

func (m *Manager) GetChannelDescription(channel string) (string, error) {
	return m.db.GetChannelDescription(channel)
}

func (m *Manager) DeleteChannel(name string) error {
	return m.db.DeleteChannel(name)
}

func (m *Manager) SearchMessages(query string, channel string, limit int) ([]db.Message, error) {
	if limit <= 0 {
		limit = 30
	}
	limit = clampLimit(limit, 1, 100)
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

func (m *Manager) AddBan(publicKey, nickname, bannedBy, reason string) error {
	return m.db.AddBan(publicKey, nickname, bannedBy, reason)
}

func (m *Manager) RemoveBan(publicKey string) error {
	return m.db.RemoveBan(publicKey)
}

func (m *Manager) GetBans() ([]db.Ban, error) {
	return m.db.GetBans()
}

func (m *Manager) IsBanned(publicKey string) (bool, error) {
	return m.db.IsBanned(publicKey)
}

// Settings persistence
func (m *Manager) GetSetting(key string) (string, error) { return m.db.GetSetting(key) }
func (m *Manager) SetSetting(key, value string) error     { return m.db.SetSetting(key, value) }

// Mute management
func (m *Manager) AddMute(publicKey, mutedBy, reason string, expiresAt *time.Time) error {
	return m.db.AddMute(publicKey, mutedBy, reason, expiresAt)
}
func (m *Manager) RemoveMute(publicKey string) error    { return m.db.RemoveMute(publicKey) }
func (m *Manager) IsMuted(publicKey string) (bool, error) { return m.db.IsMuted(publicKey) }
func (m *Manager) GetMutes() ([]db.Mute, error)         { return m.db.GetMutes() }
func (m *Manager) GetAllUsers() ([]db.User, error)      { return m.db.GetAllUsers() }

// Channel rename
func (m *Manager) RenameChannel(oldName, newName string) error { return m.db.RenameChannel(oldName, newName) }

// Custom emoji management
func (m *Manager) AddCustomEmoji(name, uploadedBy, filename string) error {
	return m.db.AddCustomEmoji(name, uploadedBy, filename)
}
func (m *Manager) RemoveCustomEmoji(name string) error { return m.db.RemoveCustomEmoji(name) }
func (m *Manager) GetCustomEmojis() ([]db.CustomEmoji, error) { return m.db.GetCustomEmojis() }

func (m *Manager) GetHistoryBefore(channel string, before time.Time, limit int) ([]db.Message, error) {
	if limit <= 0 {
		limit = 50
	}
	limit = clampLimit(limit, 1, 200)
	return m.db.GetMessagesBefore(channel, before, limit)
}

// Invite management
func (m *Manager) CreateInvite(code, createdBy string, maxUses int, expiresAt *time.Time) error {
	return m.db.CreateInvite(code, createdBy, maxUses, expiresAt)
}
func (m *Manager) ValidateInvite(code string) (bool, error) { return m.db.ValidateInvite(code) }
func (m *Manager) UseInvite(code string) (bool, error)     { return m.db.UseInvite(code) }
func (m *Manager) GetInvites() ([]db.Invite, error)    { return m.db.GetInvites() }
func (m *Manager) DeleteInvite(code string) error       { return m.db.DeleteInvite(code) }

// User profile management
func (m *Manager) GetUserProfile(publicKey string) (*db.UserProfile, error) {
	return m.db.GetUserProfile(publicKey)
}
func (m *Manager) SetUserProfile(profile db.UserProfile) error {
	return m.db.SetUserProfile(profile)
}

// Audit log management
func (m *Manager) AddAuditLog(action, actorKey, actorName, targetKey, targetName, details string) error {
	return m.db.AddAuditLog(action, actorKey, actorName, targetKey, targetName, details)
}
func (m *Manager) GetAuditLog(limit, offset int) ([]db.AuditEntry, error) {
	return m.db.GetAuditLog(limit, offset)
}
func (m *Manager) GetAuditLogCount() (int, error) {
	return m.db.GetAuditLogCount()
}

// Retention / export pass-through
func (m *Manager) DeleteMessagesBefore(channel string, beforeTimestamp int64) (int64, error) {
	return m.db.DeleteMessagesBefore(channel, beforeTimestamp)
}
func (m *Manager) DeleteAllChannelMessages(channel string) (int64, error) {
	return m.db.DeleteAllChannelMessages(channel)
}
func (m *Manager) GetMessageCount() (int, error) {
	return m.db.GetMessageCount()
}
func (m *Manager) GetMessageCountByChannel() ([]db.ChannelMessageCount, error) {
	return m.db.GetMessageCountByChannel()
}
func (m *Manager) ExportMessages(channel string, limit int) ([]db.ExportedMessage, error) {
	return m.db.ExportMessages(channel, limit)
}

// Channel permission pass-through
func (m *Manager) SetChannelPermission(channel, role, permission string, allowed bool) error {
	return m.db.SetChannelPermission(channel, role, permission, allowed)
}
func (m *Manager) GetChannelPermissions(channel string) ([]db.ChannelPermission, error) {
	return m.db.GetChannelPermissions(channel)
}
func (m *Manager) DeleteChannelPermission(channel, role, permission string) error {
	return m.db.DeleteChannelPermission(channel, role, permission)
}
func (m *Manager) CheckChannelPermission(channel, role, permission string) *bool {
	return m.db.CheckChannelPermission(channel, role, permission)
}

// User note pass-through
func (m *Manager) AddUserNote(targetKey, authorKey, authorName, content string) error {
	return m.db.AddUserNote(targetKey, authorKey, authorName, content)
}
func (m *Manager) GetUserNotes(targetKey string) ([]db.UserNote, error) {
	return m.db.GetUserNotes(targetKey)
}
func (m *Manager) DeleteUserNote(id int) error {
	return m.db.DeleteUserNote(id)
}

// Automod rule pass-through
func (m *Manager) AddAutomodRule(rule db.AutomodRule) error { return m.db.AddAutomodRule(rule) }
func (m *Manager) GetAutomodRules() ([]db.AutomodRule, error) { return m.db.GetAutomodRules() }
func (m *Manager) UpdateAutomodRule(id int, enabled bool) error {
	return m.db.UpdateAutomodRule(id, enabled)
}
func (m *Manager) DeleteAutomodRule(id int) error { return m.db.DeleteAutomodRule(id) }

// Welcome message pass-through
func (m *Manager) SetWelcomeMessage(channel, message string, enabled bool) error {
	return m.db.SetWelcomeMessage(channel, message, enabled)
}
func (m *Manager) GetWelcomeMessage(channel string) (*db.WelcomeMessage, error) {
	return m.db.GetWelcomeMessage(channel)
}
func (m *Manager) GetAllWelcomeMessages() ([]db.WelcomeMessage, error) {
	return m.db.GetAllWelcomeMessages()
}

// Channel category pass-through
func (m *Manager) CreateCategory(name string, position int) (int64, error) {
	return m.db.CreateCategory(name, position)
}
func (m *Manager) GetCategories() ([]db.ChannelCategory, error) {
	return m.db.GetCategories()
}
func (m *Manager) SetChannelCategory(channelName string, categoryID int) error {
	return m.db.SetChannelCategory(channelName, categoryID)
}
func (m *Manager) DeleteCategory(id int) error {
	return m.db.DeleteCategory(id)
}
func (m *Manager) ReorderCategories(ids []int) error {
	return m.db.ReorderCategories(ids)
}
func (m *Manager) RenameCategory(id int, name string) error {
	return m.db.RenameCategory(id, name)
}

// Scheduled message pass-through
func (m *Manager) AddScheduledMessage(channel, userKey, nickname, content string, sendAt time.Time) (int64, error) {
	return m.db.AddScheduledMessage(channel, userKey, nickname, content, sendAt)
}
func (m *Manager) GetPendingScheduledMessages() ([]db.ScheduledMessage, error) {
	return m.db.GetPendingScheduledMessages()
}
func (m *Manager) DeleteScheduledMessage(id int) error {
	return m.db.DeleteScheduledMessage(id)
}
func (m *Manager) GetUserScheduledMessages(userKey string) ([]db.ScheduledMessage, error) {
	return m.db.GetUserScheduledMessages(userKey)
}
func (m *Manager) GetScheduledMessageById(id int) (*db.ScheduledMessage, error) {
	return m.db.GetScheduledMessageById(id)
}
