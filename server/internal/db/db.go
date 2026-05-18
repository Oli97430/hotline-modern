package db

import (
	"crypto/rand"
	"database/sql"
	"time"

	"golang.org/x/crypto/bcrypt"
	_ "modernc.org/sqlite"
)

type DB struct {
	conn *sql.DB
}

type User struct {
	PublicKey  string
	Nickname  string
	Role      string
	CreatedAt time.Time
	LastSeen  time.Time
}

type Channel struct {
	Name      string
	Topic     string
	CreatedBy string
	Password  string
	CreatedAt time.Time
}

type Message struct {
	ID        string
	Channel   string
	UserKey   string
	Nickname  string
	Content   string
	ReplyTo   string
	MsgType   string
	Timestamp time.Time
}

func Open(path string) (*DB, error) {
	conn, err := sql.Open("sqlite", path+"?_journal_mode=WAL&_busy_timeout=5000")
	if err != nil {
		return nil, err
	}

	if err := migrate(conn); err != nil {
		conn.Close()
		return nil, err
	}

	return &DB{conn: conn}, nil
}

func (d *DB) Close() error {
	return d.conn.Close()
}

func migrate(conn *sql.DB) error {
	schema := `
	CREATE TABLE IF NOT EXISTS users (
		public_key TEXT PRIMARY KEY,
		nickname TEXT NOT NULL DEFAULT '',
		role TEXT NOT NULL DEFAULT 'member',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS channels (
		name TEXT PRIMARY KEY,
		topic TEXT NOT NULL DEFAULT '',
		created_by TEXT NOT NULL DEFAULT '',
		password TEXT NOT NULL DEFAULT '',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS messages (
		id TEXT PRIMARY KEY,
		channel TEXT NOT NULL,
		user_key TEXT NOT NULL,
		nickname TEXT NOT NULL,
		content TEXT NOT NULL,
		reply_to TEXT NOT NULL DEFAULT '',
		msg_type TEXT NOT NULL DEFAULT '',
		timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (channel) REFERENCES channels(name),
		FOREIGN KEY (user_key) REFERENCES users(public_key)
	);

	CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel, timestamp);

	CREATE TABLE IF NOT EXISTS reactions (
		message_id TEXT NOT NULL,
		user_key TEXT NOT NULL,
		emoji TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (message_id, user_key, emoji)
	);

	CREATE TABLE IF NOT EXISTS bans (
		public_key TEXT PRIMARY KEY,
		nickname TEXT NOT NULL DEFAULT '',
		banned_by TEXT NOT NULL DEFAULT '',
		reason TEXT NOT NULL DEFAULT '',
		banned_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS pinned_messages (
		message_id TEXT NOT NULL,
		channel TEXT NOT NULL,
		pinned_by TEXT NOT NULL,
		pinned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (message_id)
	);

	INSERT OR IGNORE INTO channels (name, topic, created_by) VALUES ('lobby', 'Welcome to the server', 'system');
	`
	_, err := conn.Exec(schema)
	if err != nil {
		return err
	}

	// Migration: add msg_type column for existing databases that lack it
	conn.Exec("ALTER TABLE messages ADD COLUMN msg_type TEXT NOT NULL DEFAULT ''")

	// Migration: server_settings table for persisting admin settings
	conn.Exec(`CREATE TABLE IF NOT EXISTS server_settings (
		key TEXT PRIMARY KEY,
		value TEXT NOT NULL DEFAULT ''
	)`)

	// Migration: mutes table
	conn.Exec(`CREATE TABLE IF NOT EXISTS mutes (
		public_key TEXT PRIMARY KEY,
		muted_by TEXT NOT NULL DEFAULT '',
		reason TEXT NOT NULL DEFAULT '',
		expires_at DATETIME,
		muted_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)

	// Migration: custom_emojis table
	conn.Exec(`CREATE TABLE IF NOT EXISTS custom_emojis (
		name TEXT PRIMARY KEY,
		uploaded_by TEXT NOT NULL,
		filename TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)

	// Migration: invites table
	conn.Exec(`CREATE TABLE IF NOT EXISTS invites (
		code TEXT PRIMARY KEY,
		created_by TEXT NOT NULL,
		max_uses INTEGER DEFAULT 0,
		uses INTEGER DEFAULT 0,
		expires_at DATETIME,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)

	// Migration: user_profiles table
	conn.Exec(`CREATE TABLE IF NOT EXISTS user_profiles (
		public_key TEXT PRIMARY KEY,
		bio TEXT NOT NULL DEFAULT '',
		custom_status TEXT NOT NULL DEFAULT '',
		pronouns TEXT NOT NULL DEFAULT '',
		timezone TEXT NOT NULL DEFAULT '',
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)

	// Migration: channel_permissions table
	conn.Exec(`CREATE TABLE IF NOT EXISTS channel_permissions (
		channel TEXT NOT NULL,
		role TEXT NOT NULL,
		permission TEXT NOT NULL,
		allowed INTEGER NOT NULL DEFAULT 1,
		PRIMARY KEY (channel, role, permission)
	)`)

	// Migration: audit_log table
	conn.Exec(`CREATE TABLE IF NOT EXISTS audit_log (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		action TEXT NOT NULL,
		actor_key TEXT NOT NULL,
		actor_name TEXT NOT NULL DEFAULT '',
		target_key TEXT NOT NULL DEFAULT '',
		target_name TEXT NOT NULL DEFAULT '',
		details TEXT NOT NULL DEFAULT '',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)`)
	conn.Exec(`CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at DESC)`)

	return nil
}

func (d *DB) GetUser(publicKey string) (*User, error) {
	var u User
	err := d.conn.QueryRow(
		"SELECT public_key, nickname, role, created_at, last_seen FROM users WHERE public_key = ?",
		publicKey,
	).Scan(&u.PublicKey, &u.Nickname, &u.Role, &u.CreatedAt, &u.LastSeen)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (d *DB) UpsertUser(publicKey, nickname, role string) error {
	_, err := d.conn.Exec(`
		INSERT INTO users (public_key, nickname, role, last_seen) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
		ON CONFLICT(public_key) DO UPDATE SET nickname = ?, last_seen = CURRENT_TIMESTAMP
	`, publicKey, nickname, role, nickname)
	return err
}

func (d *DB) SetUserRole(publicKey, role string) error {
	_, err := d.conn.Exec("UPDATE users SET role = ? WHERE public_key = ?", role, publicKey)
	return err
}

func (d *DB) HasAnyUser() (bool, error) {
	var count int
	err := d.conn.QueryRow("SELECT COUNT(*) FROM users").Scan(&count)
	return count > 0, err
}

func (d *DB) GetChannels() ([]Channel, error) {
	rows, err := d.conn.Query("SELECT name, topic, created_by, password, created_at FROM channels")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var channels []Channel
	for rows.Next() {
		var c Channel
		if err := rows.Scan(&c.Name, &c.Topic, &c.CreatedBy, &c.Password, &c.CreatedAt); err != nil {
			return nil, err
		}
		channels = append(channels, c)
	}
	return channels, nil
}

func (d *DB) CreateChannel(name, topic, createdBy, password string) error {
	hashedPw := ""
	if password != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		hashedPw = string(hash)
	}
	_, err := d.conn.Exec(
		"INSERT INTO channels (name, topic, created_by, password) VALUES (?, ?, ?, ?)",
		name, topic, createdBy, hashedPw,
	)
	return err
}

func (d *DB) GetChannelPasswordHash(name string) (string, error) {
	var pw string
	err := d.conn.QueryRow("SELECT password FROM channels WHERE name = ?", name).Scan(&pw)
	return pw, err
}

// CheckChannelPassword verifies a password against the stored bcrypt hash.
// Also handles legacy plaintext passwords (auto-upgrades them to bcrypt on success).
func (d *DB) CheckChannelPassword(name, password string) (bool, error) {
	hash, err := d.GetChannelPasswordHash(name)
	if err != nil {
		return false, err
	}
	if hash == "" {
		return true, nil // No password set
	}
	if password == "" {
		return false, nil // Password required but not provided
	}
	// Detect bcrypt hash (starts with "$2a$" or "$2b$")
	if len(hash) >= 4 && (hash[:4] == "$2a$" || hash[:4] == "$2b$") {
		err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
		return err == nil, nil
	}
	// Legacy plaintext comparison — auto-upgrade to bcrypt on success
	if hash == password {
		newHash, hashErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if hashErr == nil {
			d.conn.Exec("UPDATE channels SET password = ? WHERE name = ?", string(newHash), name)
		}
		return true, nil
	}
	return false, nil
}

func (d *DB) SetChannelTopic(name, topic string) error {
	_, err := d.conn.Exec("UPDATE channels SET topic = ? WHERE name = ?", topic, name)
	return err
}

func (d *DB) DeleteChannel(name string) error {
	tx, err := d.conn.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()
	tx.Exec("DELETE FROM messages WHERE channel = ?", name)
	tx.Exec("DELETE FROM channels WHERE name = ?", name)
	return tx.Commit()
}

func (d *DB) ChannelExists(name string) (bool, error) {
	var count int
	err := d.conn.QueryRow("SELECT COUNT(*) FROM channels WHERE name = ?", name).Scan(&count)
	return count > 0, err
}

func (d *DB) SaveMessage(msg Message) error {
	_, err := d.conn.Exec(
		"INSERT INTO messages (id, channel, user_key, nickname, content, reply_to, msg_type, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		msg.ID, msg.Channel, msg.UserKey, msg.Nickname, msg.Content, msg.ReplyTo, msg.MsgType, msg.Timestamp,
	)
	return err
}

func (d *DB) GetMessages(channel string, limit int) ([]Message, error) {
	rows, err := d.conn.Query(
		"SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM (SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM messages WHERE channel = ? ORDER BY timestamp DESC LIMIT ?) ORDER BY timestamp ASC",
		channel, limit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.MsgType, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

func (d *DB) EditMessage(id, userKey, content string) error {
	res, err := d.conn.Exec(
		"UPDATE messages SET content = ? WHERE id = ? AND user_key = ?",
		content, id, userKey,
	)
	if err != nil {
		return err
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (d *DB) DeleteMessage(id, userKey string) error {
	_, err := d.conn.Exec("DELETE FROM messages WHERE id = ? AND user_key = ?", id, userKey)
	return err
}

func (d *DB) DeleteMessageAdmin(id string) error {
	_, err := d.conn.Exec("DELETE FROM messages WHERE id = ?", id)
	return err
}

func (d *DB) AddReaction(messageId, userKey, emoji string) error {
	_, err := d.conn.Exec(
		"INSERT OR IGNORE INTO reactions (message_id, user_key, emoji) VALUES (?, ?, ?)",
		messageId, userKey, emoji,
	)
	return err
}

func (d *DB) RemoveReaction(messageId, userKey, emoji string) error {
	_, err := d.conn.Exec(
		"DELETE FROM reactions WHERE message_id = ? AND user_key = ? AND emoji = ?",
		messageId, userKey, emoji,
	)
	return err
}

type Reaction struct {
	Emoji string
	Users []string
}

func (d *DB) GetReactions(messageId string) ([]Reaction, error) {
	rows, err := d.conn.Query(
		"SELECT emoji, user_key FROM reactions WHERE message_id = ? ORDER BY created_at",
		messageId,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	emojiMap := make(map[string][]string)
	var order []string
	for rows.Next() {
		var emoji, userKey string
		if err := rows.Scan(&emoji, &userKey); err != nil {
			return nil, err
		}
		if _, exists := emojiMap[emoji]; !exists {
			order = append(order, emoji)
		}
		emojiMap[emoji] = append(emojiMap[emoji], userKey)
	}

	var reactions []Reaction
	for _, e := range order {
		reactions = append(reactions, Reaction{Emoji: e, Users: emojiMap[e]})
	}
	return reactions, nil
}

func (d *DB) GetMessageReactions(messageIds []string) (map[string][]Reaction, error) {
	if len(messageIds) == 0 {
		return nil, nil
	}
	query := "SELECT message_id, emoji, user_key FROM reactions WHERE message_id IN ("
	args := make([]interface{}, len(messageIds))
	for i, id := range messageIds {
		if i > 0 {
			query += ","
		}
		query += "?"
		args[i] = id
	}
	query += ") ORDER BY created_at"

	rows, err := d.conn.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := make(map[string][]Reaction)
	emojiMap := make(map[string]map[string][]string) // msgId -> emoji -> users
	orderMap := make(map[string][]string)            // msgId -> emoji order

	for rows.Next() {
		var msgId, emoji, userKey string
		if err := rows.Scan(&msgId, &emoji, &userKey); err != nil {
			return nil, err
		}
		if emojiMap[msgId] == nil {
			emojiMap[msgId] = make(map[string][]string)
		}
		if _, exists := emojiMap[msgId][emoji]; !exists {
			orderMap[msgId] = append(orderMap[msgId], emoji)
		}
		emojiMap[msgId][emoji] = append(emojiMap[msgId][emoji], userKey)
	}

	for msgId, emojis := range emojiMap {
		for _, e := range orderMap[msgId] {
			result[msgId] = append(result[msgId], Reaction{Emoji: e, Users: emojis[e]})
		}
	}
	return result, nil
}

func (d *DB) PinMessage(messageId, channel, pinnedBy string) error {
	_, err := d.conn.Exec(
		"INSERT OR REPLACE INTO pinned_messages (message_id, channel, pinned_by, pinned_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
		messageId, channel, pinnedBy,
	)
	return err
}

func (d *DB) UnpinMessage(messageId string) error {
	_, err := d.conn.Exec("DELETE FROM pinned_messages WHERE message_id = ?", messageId)
	return err
}

func (d *DB) GetPinnedMessages(channel string) ([]Message, error) {
	rows, err := d.conn.Query(
		`SELECT m.id, m.channel, m.user_key, m.nickname, m.content, m.reply_to, m.msg_type, m.timestamp
		 FROM pinned_messages p JOIN messages m ON p.message_id = m.id
		 WHERE p.channel = ? ORDER BY p.pinned_at DESC`,
		channel,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.MsgType, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

func (d *DB) GetMessageById(id string) (*Message, error) {
	var m Message
	err := d.conn.QueryRow(
		"SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM messages WHERE id = ?", id,
	).Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.MsgType, &m.Timestamp)
	if err != nil {
		return nil, err
	}
	return &m, nil
}

func (d *DB) SearchMessages(query string, channel string, limit int) ([]Message, error) {
	var rows *sql.Rows
	var err error
	if channel != "" {
		rows, err = d.conn.Query(
			"SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM messages WHERE channel = ? AND content LIKE ? ORDER BY timestamp DESC LIMIT ?",
			channel, "%"+query+"%", limit,
		)
	} else {
		rows, err = d.conn.Query(
			"SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM messages WHERE content LIKE ? ORDER BY timestamp DESC LIMIT ?",
			"%"+query+"%", limit,
		)
	}
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.MsgType, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

// Ban management
type Ban struct {
	PublicKey string
	Nickname string
	BannedBy string
	Reason   string
	BannedAt time.Time
}

func (d *DB) AddBan(publicKey, nickname, bannedBy, reason string) error {
	_, err := d.conn.Exec(
		"INSERT OR REPLACE INTO bans (public_key, nickname, banned_by, reason) VALUES (?, ?, ?, ?)",
		publicKey, nickname, bannedBy, reason,
	)
	return err
}

func (d *DB) RemoveBan(publicKey string) error {
	_, err := d.conn.Exec("DELETE FROM bans WHERE public_key = ?", publicKey)
	return err
}

func (d *DB) GetBans() ([]Ban, error) {
	rows, err := d.conn.Query("SELECT public_key, nickname, banned_by, reason, banned_at FROM bans ORDER BY banned_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bans []Ban
	for rows.Next() {
		var b Ban
		if err := rows.Scan(&b.PublicKey, &b.Nickname, &b.BannedBy, &b.Reason, &b.BannedAt); err != nil {
			return nil, err
		}
		bans = append(bans, b)
	}
	return bans, nil
}

func (d *DB) IsBanned(publicKey string) (bool, error) {
	var count int
	err := d.conn.QueryRow("SELECT COUNT(*) FROM bans WHERE public_key = ?", publicKey).Scan(&count)
	return count > 0, err
}

// Settings persistence
func (d *DB) GetSetting(key string) (string, error) {
	var value string
	err := d.conn.QueryRow("SELECT value FROM server_settings WHERE key = ?", key).Scan(&value)
	if err == sql.ErrNoRows {
		return "", nil
	}
	return value, err
}

func (d *DB) SetSetting(key, value string) error {
	_, err := d.conn.Exec("INSERT OR REPLACE INTO server_settings (key, value) VALUES (?, ?)", key, value)
	return err
}

// Mute management
type Mute struct {
	PublicKey string
	MutedBy  string
	Reason   string
	ExpiresAt *time.Time
	MutedAt  time.Time
}

func (d *DB) AddMute(publicKey, mutedBy, reason string, expiresAt *time.Time) error {
	_, err := d.conn.Exec(
		"INSERT OR REPLACE INTO mutes (public_key, muted_by, reason, expires_at) VALUES (?, ?, ?, ?)",
		publicKey, mutedBy, reason, expiresAt,
	)
	return err
}

func (d *DB) RemoveMute(publicKey string) error {
	_, err := d.conn.Exec("DELETE FROM mutes WHERE public_key = ?", publicKey)
	return err
}

func (d *DB) IsMuted(publicKey string) (bool, error) {
	var count int
	err := d.conn.QueryRow(
		"SELECT COUNT(*) FROM mutes WHERE public_key = ? AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)",
		publicKey,
	).Scan(&count)
	return count > 0, err
}

func (d *DB) GetMutes() ([]Mute, error) {
	rows, err := d.conn.Query("SELECT public_key, muted_by, reason, expires_at, muted_at FROM mutes WHERE expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP ORDER BY muted_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var mutes []Mute
	for rows.Next() {
		var m Mute
		if err := rows.Scan(&m.PublicKey, &m.MutedBy, &m.Reason, &m.ExpiresAt, &m.MutedAt); err != nil {
			return nil, err
		}
		mutes = append(mutes, m)
	}
	return mutes, nil
}

func (d *DB) GetAllUsers() ([]User, error) {
	rows, err := d.conn.Query("SELECT public_key, nickname, role, created_at, last_seen FROM users ORDER BY role, nickname")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var users []User
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.PublicKey, &u.Nickname, &u.Role, &u.CreatedAt, &u.LastSeen); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

// Channel rename
func (d *DB) RenameChannel(oldName, newName string) error {
	tx, err := d.conn.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()
	tx.Exec("UPDATE channels SET name = ? WHERE name = ?", newName, oldName)
	tx.Exec("UPDATE messages SET channel = ? WHERE channel = ?", newName, oldName)
	tx.Exec("UPDATE pinned_messages SET channel = ? WHERE channel = ?", newName, oldName)
	return tx.Commit()
}

// Custom emoji management
type CustomEmoji struct {
	Name       string
	UploadedBy string
	Filename   string
	CreatedAt  time.Time
}

type Invite struct {
	Code      string
	CreatedBy string
	MaxUses   int
	Uses      int
	ExpiresAt *time.Time
	CreatedAt time.Time
}

func (d *DB) AddCustomEmoji(name, uploadedBy, filename string) error {
	_, err := d.conn.Exec(
		"INSERT OR REPLACE INTO custom_emojis (name, uploaded_by, filename) VALUES (?, ?, ?)",
		name, uploadedBy, filename,
	)
	return err
}

func (d *DB) RemoveCustomEmoji(name string) error {
	_, err := d.conn.Exec("DELETE FROM custom_emojis WHERE name = ?", name)
	return err
}

func (d *DB) GetCustomEmojis() ([]CustomEmoji, error) {
	rows, err := d.conn.Query("SELECT name, uploaded_by, filename, created_at FROM custom_emojis ORDER BY created_at ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var emojis []CustomEmoji
	for rows.Next() {
		var e CustomEmoji
		if err := rows.Scan(&e.Name, &e.UploadedBy, &e.Filename, &e.CreatedAt); err != nil {
			return nil, err
		}
		emojis = append(emojis, e)
	}
	return emojis, nil
}

func (d *DB) GetMessagesBefore(channel string, before time.Time, limit int) ([]Message, error) {
	rows, err := d.conn.Query(
		"SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM (SELECT id, channel, user_key, nickname, content, reply_to, msg_type, timestamp FROM messages WHERE channel = ? AND timestamp < ? ORDER BY timestamp DESC LIMIT ?) ORDER BY timestamp ASC",
		channel, before, limit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.MsgType, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

// Invite management

const inviteAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func GenerateInviteCode() (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	for i := range b {
		b[i] = inviteAlphabet[int(b[i])%len(inviteAlphabet)]
	}
	return string(b), nil
}

func (d *DB) CreateInvite(code, createdBy string, maxUses int, expiresAt *time.Time) error {
	_, err := d.conn.Exec(
		"INSERT INTO invites (code, created_by, max_uses, expires_at) VALUES (?, ?, ?, ?)",
		code, createdBy, maxUses, expiresAt,
	)
	return err
}

func (d *DB) UseInvite(code string) (bool, error) {
	tx, err := d.conn.Begin()
	if err != nil {
		return false, err
	}
	defer tx.Rollback()

	var uses, maxUses int
	var expiresAt *time.Time
	err = tx.QueryRow(
		"SELECT uses, max_uses, expires_at FROM invites WHERE code = ?", code,
	).Scan(&uses, &maxUses, &expiresAt)
	if err != nil {
		return false, nil // not found = invalid
	}

	// Check expiry
	if expiresAt != nil && time.Now().After(*expiresAt) {
		return false, nil
	}

	// Check uses (0 = unlimited)
	if maxUses > 0 && uses >= maxUses {
		return false, nil
	}

	_, err = tx.Exec("UPDATE invites SET uses = uses + 1 WHERE code = ?", code)
	if err != nil {
		return false, err
	}

	return true, tx.Commit()
}

func (d *DB) GetInvites() ([]Invite, error) {
	rows, err := d.conn.Query("SELECT code, created_by, max_uses, uses, expires_at, created_at FROM invites ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var invites []Invite
	for rows.Next() {
		var inv Invite
		if err := rows.Scan(&inv.Code, &inv.CreatedBy, &inv.MaxUses, &inv.Uses, &inv.ExpiresAt, &inv.CreatedAt); err != nil {
			return nil, err
		}
		invites = append(invites, inv)
	}
	return invites, nil
}

func (d *DB) DeleteInvite(code string) error {
	_, err := d.conn.Exec("DELETE FROM invites WHERE code = ?", code)
	return err
}

// User profile management

type UserProfile struct {
	PublicKey    string
	Bio          string
	CustomStatus string
	Pronouns     string
	Timezone     string
}

func (d *DB) GetUserProfile(publicKey string) (*UserProfile, error) {
	var p UserProfile
	err := d.conn.QueryRow(
		"SELECT public_key, bio, custom_status, pronouns, timezone FROM user_profiles WHERE public_key = ?",
		publicKey,
	).Scan(&p.PublicKey, &p.Bio, &p.CustomStatus, &p.Pronouns, &p.Timezone)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (d *DB) SetUserProfile(profile UserProfile) error {
	_, err := d.conn.Exec(
		`INSERT OR REPLACE INTO user_profiles (public_key, bio, custom_status, pronouns, timezone, updated_at)
		 VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
		profile.PublicKey, profile.Bio, profile.CustomStatus, profile.Pronouns, profile.Timezone,
	)
	return err
}

// Audit log management

type AuditEntry struct {
	ID         int
	Action     string
	ActorKey   string
	ActorName  string
	TargetKey  string
	TargetName string
	Details    string
	CreatedAt  string
}

func (d *DB) AddAuditLog(action, actorKey, actorName, targetKey, targetName, details string) error {
	_, err := d.conn.Exec(
		"INSERT INTO audit_log (action, actor_key, actor_name, target_key, target_name, details) VALUES (?, ?, ?, ?, ?, ?)",
		action, actorKey, actorName, targetKey, targetName, details,
	)
	return err
}

func (d *DB) GetAuditLog(limit, offset int) ([]AuditEntry, error) {
	rows, err := d.conn.Query(
		"SELECT id, action, actor_key, actor_name, target_key, target_name, details, created_at FROM audit_log ORDER BY created_at DESC LIMIT ? OFFSET ?",
		limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []AuditEntry
	for rows.Next() {
		var e AuditEntry
		if err := rows.Scan(&e.ID, &e.Action, &e.ActorKey, &e.ActorName, &e.TargetKey, &e.TargetName, &e.Details, &e.CreatedAt); err != nil {
			return nil, err
		}
		entries = append(entries, e)
	}
	return entries, nil
}

func (d *DB) GetAuditLogCount() (int, error) {
	var count int
	err := d.conn.QueryRow("SELECT COUNT(*) FROM audit_log").Scan(&count)
	return count, err
}

// Retention / export helpers

type ChannelMessageCount struct {
	Channel string
	Count   int
}

type ExportedMessage struct {
	ID        string
	Channel   string
	UserID    string
	Nickname  string
	Content   string
	Timestamp string
}

// DeleteMessagesBefore deletes messages older than beforeTimestamp (Unix ms).
// If channel is empty, it deletes across all channels.
func (d *DB) DeleteMessagesBefore(channel string, beforeTimestamp int64) (int64, error) {
	before := time.UnixMilli(beforeTimestamp)
	var res sql.Result
	var err error
	if channel == "" {
		res, err = d.conn.Exec("DELETE FROM messages WHERE timestamp < ?", before)
	} else {
		res, err = d.conn.Exec("DELETE FROM messages WHERE channel = ? AND timestamp < ?", channel, before)
	}
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}

// DeleteAllChannelMessages deletes every message in the given channel.
func (d *DB) DeleteAllChannelMessages(channel string) (int64, error) {
	res, err := d.conn.Exec("DELETE FROM messages WHERE channel = ?", channel)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}

// GetMessageCount returns the total number of messages.
func (d *DB) GetMessageCount() (int, error) {
	var count int
	err := d.conn.QueryRow("SELECT COUNT(*) FROM messages").Scan(&count)
	return count, err
}

// GetMessageCountByChannel returns per-channel message counts ordered by count DESC.
func (d *DB) GetMessageCountByChannel() ([]ChannelMessageCount, error) {
	rows, err := d.conn.Query("SELECT channel, COUNT(*) as cnt FROM messages GROUP BY channel ORDER BY cnt DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var counts []ChannelMessageCount
	for rows.Next() {
		var c ChannelMessageCount
		if err := rows.Scan(&c.Channel, &c.Count); err != nil {
			return nil, err
		}
		counts = append(counts, c)
	}
	return counts, nil
}

// ExportMessages returns messages for export. If channel is empty, exports across all channels.
func (d *DB) ExportMessages(channel string, limit int) ([]ExportedMessage, error) {
	var rows *sql.Rows
	var err error
	if channel == "" {
		rows, err = d.conn.Query(
			"SELECT id, channel, user_key, nickname, content, timestamp FROM messages ORDER BY timestamp ASC LIMIT ?",
			limit,
		)
	} else {
		rows, err = d.conn.Query(
			"SELECT id, channel, user_key, nickname, content, timestamp FROM messages WHERE channel = ? ORDER BY timestamp ASC LIMIT ?",
			channel, limit,
		)
	}
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var msgs []ExportedMessage
	for rows.Next() {
		var m ExportedMessage
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserID, &m.Nickname, &m.Content, &m.Timestamp); err != nil {
			return nil, err
		}
		msgs = append(msgs, m)
	}
	return msgs, nil
}

// Channel permission management

type ChannelPermission struct {
	Channel    string
	Role       string
	Permission string
	Allowed    bool
}

func (d *DB) SetChannelPermission(channel, role, permission string, allowed bool) error {
	val := 0
	if allowed {
		val = 1
	}
	_, err := d.conn.Exec(
		"INSERT OR REPLACE INTO channel_permissions (channel, role, permission, allowed) VALUES (?, ?, ?, ?)",
		channel, role, permission, val,
	)
	return err
}

func (d *DB) GetChannelPermissions(channel string) ([]ChannelPermission, error) {
	rows, err := d.conn.Query(
		"SELECT channel, role, permission, allowed FROM channel_permissions WHERE channel = ? ORDER BY role, permission",
		channel,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var perms []ChannelPermission
	for rows.Next() {
		var p ChannelPermission
		var allowed int
		if err := rows.Scan(&p.Channel, &p.Role, &p.Permission, &allowed); err != nil {
			return nil, err
		}
		p.Allowed = allowed == 1
		perms = append(perms, p)
	}
	return perms, nil
}

func (d *DB) DeleteChannelPermission(channel, role, permission string) error {
	_, err := d.conn.Exec(
		"DELETE FROM channel_permissions WHERE channel = ? AND role = ? AND permission = ?",
		channel, role, permission,
	)
	return err
}

func (d *DB) CheckChannelPermission(channel, role, permission string) *bool {
	var allowed int
	err := d.conn.QueryRow(
		"SELECT allowed FROM channel_permissions WHERE channel = ? AND role = ? AND permission = ?",
		channel, role, permission,
	).Scan(&allowed)
	if err != nil {
		return nil // no override
	}
	result := allowed == 1
	return &result
}
