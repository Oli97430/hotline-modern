package db

import (
	"database/sql"
	"time"

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
	return err
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
	_, err := d.conn.Exec(
		"INSERT INTO channels (name, topic, created_by, password) VALUES (?, ?, ?, ?)",
		name, topic, createdBy, password,
	)
	return err
}

func (d *DB) GetChannelPassword(name string) (string, error) {
	var pw string
	err := d.conn.QueryRow("SELECT password FROM channels WHERE name = ?", name).Scan(&pw)
	return pw, err
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
		"INSERT INTO messages (id, channel, user_key, nickname, content, reply_to, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
		msg.ID, msg.Channel, msg.UserKey, msg.Nickname, msg.Content, msg.ReplyTo, msg.Timestamp,
	)
	return err
}

func (d *DB) GetMessages(channel string, limit int) ([]Message, error) {
	rows, err := d.conn.Query(
		"SELECT id, channel, user_key, nickname, content, reply_to, timestamp FROM messages WHERE channel = ? ORDER BY timestamp DESC LIMIT ?",
		channel, limit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}

	for i, j := 0, len(messages)-1; i < j; i, j = i+1, j-1 {
		messages[i], messages[j] = messages[j], messages[i]
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
		`SELECT m.id, m.channel, m.user_key, m.nickname, m.content, m.reply_to, m.timestamp
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
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.Timestamp); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, nil
}

func (d *DB) GetMessageById(id string) (*Message, error) {
	var m Message
	err := d.conn.QueryRow(
		"SELECT id, channel, user_key, nickname, content, reply_to, timestamp FROM messages WHERE id = ?", id,
	).Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.Timestamp)
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
			"SELECT id, channel, user_key, nickname, content, reply_to, timestamp FROM messages WHERE channel = ? AND content LIKE ? ORDER BY timestamp DESC LIMIT ?",
			channel, "%"+query+"%", limit,
		)
	} else {
		rows, err = d.conn.Query(
			"SELECT id, channel, user_key, nickname, content, reply_to, timestamp FROM messages WHERE content LIKE ? ORDER BY timestamp DESC LIMIT ?",
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
		if err := rows.Scan(&m.ID, &m.Channel, &m.UserKey, &m.Nickname, &m.Content, &m.ReplyTo, &m.Timestamp); err != nil {
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
