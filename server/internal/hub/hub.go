package hub

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/hotline-modern/server/internal/auth"
	"github.com/hotline-modern/server/internal/chat"
	"github.com/hotline-modern/server/internal/permissions"
)

var upgrader = websocket.Upgrader{
	// TODO: restrict to known origins in production deployments
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Message struct {
	Type      string          `json:"type"`
	ID        string          `json:"id"`
	Timestamp int64           `json:"timestamp"`
	Payload   json.RawMessage `json:"payload"`
}

type Client struct {
	ID        string
	PublicKey string
	Nickname  string
	Role      string
	Status    string // "available", "away", "busy"
	Channels  map[string]bool
	Conn      *websocket.Conn
	Send      chan []byte
	Hub       *Hub
	mu        sync.Mutex
	// Rate limiting
	tokens     float64
	lastRefill time.Time
}

const (
	rateLimitTokens   = 10.0 // max tokens (burst)
	rateLimitRefill   = 2.0  // tokens per second
	rateLimitCost     = 1.0  // cost per message
)

func (c *Client) consumeToken() bool {
	now := time.Now()
	elapsed := now.Sub(c.lastRefill).Seconds()
	c.tokens += elapsed * rateLimitRefill
	if c.tokens > rateLimitTokens {
		c.tokens = rateLimitTokens
	}
	c.lastRefill = now
	if c.tokens < rateLimitCost {
		return false
	}
	c.tokens -= rateLimitCost
	return true
}

type Hub struct {
	clients      map[string]*Client
	pubKeyIndex  map[string]*Client                // publicKey -> client (fast lookup)
	channels     map[string]map[string]*Client     // channel -> clientID -> client
	register     chan *Client
	unregister   chan *Client
	auth         *auth.Manager
	chat         *chat.Manager
	permissions  *permissions.Manager
	serverName   string
	motd         string
	mu           sync.RWMutex
}

const maxMessageLength = 4000 // Max chat message content length in bytes

func New(authMgr *auth.Manager, chatMgr *chat.Manager, permMgr *permissions.Manager, serverName, motd string) *Hub {
	return &Hub{
		clients:     make(map[string]*Client),
		pubKeyIndex: make(map[string]*Client),
		channels:    make(map[string]map[string]*Client),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		auth:        authMgr,
		chat:        chatMgr,
		permissions: permMgr,
		serverName:  serverName,
		motd:        motd,
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client.ID] = client
			h.mu.Unlock()

		case client := <-h.unregister:
			shouldBroadcast := false
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				delete(h.clients, client.ID)
				close(client.Send)
				for ch := range client.Channels {
					if h.channels[ch] != nil {
						delete(h.channels[ch], client.ID)
					}
				}
				// Remove from pubkey index if this client owns it
				if client.PublicKey != "" {
					if indexed := h.pubKeyIndex[client.PublicKey]; indexed != nil && indexed.ID == client.ID {
						delete(h.pubKeyIndex, client.PublicKey)
					}
				}
				shouldBroadcast = client.PublicKey != ""
			}
			h.mu.Unlock()
			if shouldBroadcast {
				h.broadcastUserLeft(client)
			}
		}
	}
}

func (h *Hub) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}

	client := &Client{
		ID:         uuid.New().String(),
		Status:     "available",
		Channels:   make(map[string]bool),
		Conn:       conn,
		Send:       make(chan []byte, 256),
		Hub:        h,
		tokens:     rateLimitTokens,
		lastRefill: time.Now(),
	}

	nonce, err := h.auth.GenerateNonce(client.ID)
	if err != nil {
		conn.Close()
		return
	}

	nonceMsg := Message{
		Type:      "auth.nonce",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]string{"nonce": nonce}),
	}
	if err := conn.WriteJSON(nonceMsg); err != nil {
		conn.Close()
		return
	}

	h.register <- client
	go client.writePump()
	go client.readPump()
}

func (c *Client) readPump() {
	defer func() {
		c.Hub.unregister <- c
		c.Hub.auth.CleanupNonce(c.ID)
		c.Conn.Close()
	}()

	c.Conn.SetReadLimit(65536)
	c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		_, data, err := c.Conn.ReadMessage()
		if err != nil {
			break
		}

		var msg Message
		if err := json.Unmarshal(data, &msg); err != nil {
			continue
		}

		c.Hub.handleMessage(c, msg)
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(30 * time.Second)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			c.mu.Lock()
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			c.Conn.WriteMessage(websocket.TextMessage, message)
			c.mu.Unlock()

		case <-ticker.C:
			c.mu.Lock()
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			c.Conn.WriteMessage(websocket.PingMessage, nil)
			c.mu.Unlock()
		}
	}
}

func (h *Hub) handleMessage(client *Client, msg Message) {
	// Rate limit all messages except auth
	if msg.Type != "auth" && client.PublicKey != "" {
		if !client.consumeToken() {
			h.sendError(client, "rate limited: slow down")
			return
		}
	}

	switch msg.Type {
	case "auth":
		h.handleAuth(client, msg)
	case "chat.send":
		h.handleChatSend(client, msg)
	case "channel.join":
		h.handleChannelJoin(client, msg)
	case "channel.leave":
		h.handleChannelLeave(client, msg)
	case "channel.create":
		h.handleChannelCreate(client, msg)
	case "user.list":
		h.handleUserList(client)
	case "channel.list":
		h.handleChannelList(client)
	case "admin.kick":
		h.handleKick(client, msg)
	case "admin.ban":
		h.handleBan(client, msg)
	case "admin.op":
		h.handleOp(client, msg)
	case "admin.topic":
		h.handleTopic(client, msg)
	case "dm.send":
		h.handleDMSend(client, msg)
	case "typing":
		h.handleTyping(client, msg)
	case "channel.delete":
		h.handleChannelDelete(client, msg)
	case "chat.search":
		h.handleSearch(client, msg)
	case "chat.edit":
		h.handleChatEdit(client, msg)
	case "chat.delete":
		h.handleChatDelete(client, msg)
	case "reaction.add":
		h.handleReactionAdd(client, msg)
	case "reaction.remove":
		h.handleReactionRemove(client, msg)
	case "pin.add":
		h.handlePinAdd(client, msg)
	case "pin.remove":
		h.handlePinRemove(client, msg)
	case "pin.list":
		h.handlePinList(client, msg)
	case "user.nick":
		h.handleNickChange(client, msg)
	case "admin.settings":
		h.handleAdminSettings(client, msg)
	case "admin.banlist":
		h.handleBanList(client)
	case "admin.unban":
		h.handleUnban(client, msg)
	case "user.status":
		h.handleUserStatus(client, msg)
	case "channel.members":
		h.handleChannelMembers(client, msg)
	case "chat.history":
		h.handleChatHistory(client, msg)
	}
}

func (h *Hub) handleAuth(client *Client, msg Message) {
	var payload struct {
		PublicKey string `json:"publicKey"`
		Signature string `json:"signature"`
		Nonce     string `json:"nonce"`
		Nickname  string `json:"nickname"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid auth payload")
		return
	}

	role, err := h.auth.Verify(client.ID, payload.PublicKey, payload.Signature, payload.Nonce, payload.Nickname)
	if err != nil {
		h.sendToClient(client, Message{
			Type:      "auth.error",
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]string{"reason": err.Error()}),
		})
		return
	}

	var stale []*Client
	h.mu.Lock()
	for id, c := range h.clients {
		if c.PublicKey == payload.PublicKey && c.ID != client.ID {
			delete(h.clients, id)
			for ch := range c.Channels {
				if h.channels[ch] != nil {
					delete(h.channels[ch], id)
				}
			}
			stale = append(stale, c)
		}
	}
	// Register in pubkey index for O(1) lookups
	client.PublicKey = payload.PublicKey
	client.Nickname = payload.Nickname
	client.Role = role
	h.pubKeyIndex[payload.PublicKey] = client
	h.mu.Unlock()
	for _, c := range stale {
		c.Conn.Close()
	}

	h.sendToClient(client, Message{
		Type:      "auth.ok",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":     client.PublicKey,
			"role":       role,
			"serverName": h.serverName,
			"motd":       h.motd,
		}),
	})

	h.joinChannel(client, "lobby")
	h.sendHistory(client, "lobby")
	h.broadcastUserJoined(client)
}

func (h *Hub) handleChatSend(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Content string `json:"content"`
		ReplyTo string `json:"replyTo"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	// Enforce message size limit
	if len(payload.Content) == 0 {
		h.sendError(client, "message cannot be empty")
		return
	}
	if len(payload.Content) > maxMessageLength {
		h.sendError(client, "message too long (max 4000 characters)")
		return
	}

	if !h.permissions.CanChat(client.Role, payload.Channel) {
		h.sendError(client, "permission denied")
		return
	}

	if !client.Channels[payload.Channel] {
		h.sendError(client, "not in channel")
		return
	}

	msgID := uuid.New().String()
	h.chat.SaveMessage(msgID, payload.Channel, client.PublicKey, client.Nickname, payload.Content, payload.ReplyTo)

	chatPayload := map[string]interface{}{
		"channel":  payload.Channel,
		"userId":   client.PublicKey,
		"nickname": client.Nickname,
		"content":  payload.Content,
		"role":     client.Role,
	}
	if payload.ReplyTo != "" {
		chatPayload["replyTo"] = payload.ReplyTo
	}

	chatMsg := Message{
		Type:      "chat.message",
		ID:        msgID,
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(chatPayload),
	}

	h.broadcastToChannel(payload.Channel, chatMsg)
}

func (h *Hub) handleChannelJoin(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel  string `json:"channel"`
		Password string `json:"password"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	// Verify channel exists in DB
	exists, _ := h.chat.ChannelExists(payload.Channel)
	if !exists {
		h.sendError(client, "channel does not exist")
		return
	}

	if !h.permissions.CanJoinChannel(client.Role, payload.Channel) {
		h.sendError(client, "permission denied")
		return
	}

	// Check password for private channels (admin/op bypass)
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		ok, _ := h.chat.CheckChannelPassword(payload.Channel, payload.Password)
		if !ok {
			h.sendError(client, "incorrect channel password")
			return
		}
	}

	h.joinChannel(client, payload.Channel)
	h.sendHistory(client, payload.Channel)
}

func (h *Hub) handleChannelLeave(client *Client, msg Message) {
	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.leaveChannel(client, payload.Channel)
}

func (h *Hub) handleChannelCreate(client *Client, msg Message) {
	if !h.permissions.CanCreateChannel(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Name     string `json:"name"`
		Topic    string `json:"topic"`
		Password string `json:"password"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	exists, _ := h.chat.ChannelExists(payload.Name)
	if exists {
		h.sendError(client, "channel already exists")
		return
	}

	if err := h.chat.CreateChannel(payload.Name, payload.Topic, client.PublicKey, payload.Password); err != nil {
		h.sendError(client, "failed to create channel")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleUserList(client *Client) {
	h.mu.RLock()
	var users []map[string]string
	for _, c := range h.clients {
		if c.PublicKey == "" {
			continue
		}
		users = append(users, map[string]string{
			"userId":   c.PublicKey,
			"nickname": c.Nickname,
			"role":     c.Role,
			"status":   c.Status,
		})
	}
	h.mu.RUnlock()

	h.sendToClient(client, Message{
		Type:      "user.list",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"users": users}),
	})
}

func (h *Hub) handleChannelList(client *Client) {
	channels, _ := h.chat.GetChannels()
	var list []map[string]interface{}
	for _, ch := range channels {
		h.mu.RLock()
		count := 0
		if h.channels[ch.Name] != nil {
			count = len(h.channels[ch.Name])
		}
		h.mu.RUnlock()
		list = append(list, map[string]interface{}{
			"name":        ch.Name,
			"topic":       ch.Topic,
			"userCount":   count,
			"hasPassword": ch.Password != "",
		})
	}

	h.sendToClient(client, Message{
		Type:      "channel.list",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channels": list}),
	})
}

func (h *Hub) joinChannel(client *Client, channel string) {
	h.mu.Lock()
	if h.channels[channel] == nil {
		h.channels[channel] = make(map[string]*Client)
	}
	h.channels[channel][client.ID] = client
	client.Channels[channel] = true
	h.mu.Unlock()
}

func (h *Hub) leaveChannel(client *Client, channel string) {
	h.mu.Lock()
	if h.channels[channel] != nil {
		delete(h.channels[channel], client.ID)
	}
	delete(client.Channels, channel)
	h.mu.Unlock()
}

func (h *Hub) broadcastToChannel(channel string, msg Message) {
	data, _ := json.Marshal(msg)
	h.mu.RLock()
	clients := h.channels[channel]
	for _, client := range clients {
		select {
		case client.Send <- data:
		default:
		}
	}
	h.mu.RUnlock()
}

func (h *Hub) broadcastUserJoined(client *Client) {
	msg := Message{
		Type:      "user.joined",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":   client.PublicKey,
			"nickname": client.Nickname,
			"role":     client.Role,
		}),
	}
	h.broadcastAll(msg)
}

func (h *Hub) broadcastUserLeft(client *Client) {
	if client.PublicKey == "" {
		return
	}
	msg := Message{
		Type:      "user.left",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":   client.PublicKey,
			"nickname": client.Nickname,
		}),
	}
	h.broadcastAll(msg)
}

func (h *Hub) broadcastChannelList() {
	channels, _ := h.chat.GetChannels()
	var list []map[string]interface{}
	for _, ch := range channels {
		h.mu.RLock()
		count := 0
		if h.channels[ch.Name] != nil {
			count = len(h.channels[ch.Name])
		}
		h.mu.RUnlock()
		list = append(list, map[string]interface{}{
			"name":        ch.Name,
			"topic":       ch.Topic,
			"userCount":   count,
			"hasPassword": ch.Password != "",
		})
	}

	msg := Message{
		Type:      "channel.list",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channels": list}),
	}
	h.broadcastAll(msg)
}

func (h *Hub) broadcastAll(msg Message) {
	data, _ := json.Marshal(msg)
	h.mu.RLock()
	for _, client := range h.clients {
		if client.PublicKey == "" {
			continue
		}
		select {
		case client.Send <- data:
		default:
		}
	}
	h.mu.RUnlock()
}

func (h *Hub) sendToClient(client *Client, msg Message) {
	data, _ := json.Marshal(msg)
	select {
	case client.Send <- data:
	default:
	}
}

func (h *Hub) sendHistory(client *Client, channel string) {
	messages, err := h.chat.GetHistory(channel, 50)
	if err != nil || len(messages) == 0 {
		return
	}
	for _, m := range messages {
		payload := map[string]interface{}{
			"channel":  m.Channel,
			"userId":   m.UserKey,
			"nickname": m.Nickname,
			"content":  m.Content,
			"role":     h.permissions.GetRole(m.UserKey),
		}
		if m.ReplyTo != "" {
			payload["replyTo"] = m.ReplyTo
		}
		h.sendToClient(client, Message{
			Type:      "chat.message",
			ID:        m.ID,
			Timestamp: m.Timestamp.UnixMilli(),
			Payload:   mustMarshal(payload),
		})
	}
}

func (h *Hub) sendError(client *Client, message string) {
	h.sendToClient(client, Message{
		Type:      "error",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"code": "error", "message": message}),
	})
}

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

	if target != nil {
		h.sendToClient(target, Message{
			Type:      "error",
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]interface{}{"code": "kicked", "message": "You have been kicked"}),
		})
		target.Conn.Close()
	}
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
			Type:      "error",
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]interface{}{"code": "banned", "message": "You have been banned"}),
		})
		target.Conn.Close()
	}
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
	h.mu.Lock()
	if target := h.pubKeyIndex[payload.UserId]; target != nil {
		target.Role = payload.Role
	}
	h.mu.Unlock()

	h.broadcastAll(Message{
		Type:      "user.role_changed",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId": payload.UserId,
			"role":   payload.Role,
		}),
	})
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

func dmChannelKey(a, b string) string {
	if a < b {
		return "dm:" + a + ":" + b
	}
	return "dm:" + b + ":" + a
}

func (h *Hub) handleDMSend(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		TargetId string `json:"targetId"`
		Content  string `json:"content"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.TargetId == client.PublicKey {
		return
	}

	dmCh := dmChannelKey(client.PublicKey, payload.TargetId)
	msgID := uuid.New().String()
	h.chat.SaveMessage(msgID, dmCh, client.PublicKey, client.Nickname, payload.Content, "")

	dmMsg := Message{
		Type:      "dm.message",
		ID:        msgID,
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"from":     client.PublicKey,
			"to":       payload.TargetId,
			"nickname": client.Nickname,
			"content":  payload.Content,
			"role":     client.Role,
		}),
	}

	data, _ := json.Marshal(dmMsg)
	h.mu.RLock()
	// Send to both sender and target using index
	if sender := h.pubKeyIndex[client.PublicKey]; sender != nil {
		select {
		case sender.Send <- data:
		default:
		}
	}
	if target := h.pubKeyIndex[payload.TargetId]; target != nil {
		select {
		case target.Send <- data:
		default:
		}
	}
	h.mu.RUnlock()
}

func (h *Hub) handleTyping(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel  string `json:"channel"`
		TargetId string `json:"targetId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	typingMsg := Message{
		Type:      "typing",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":   client.PublicKey,
			"nickname": client.Nickname,
			"channel":  payload.Channel,
			"targetId": payload.TargetId,
		}),
	}

	if payload.TargetId != "" {
		data, _ := json.Marshal(typingMsg)
		h.mu.RLock()
		if target := h.pubKeyIndex[payload.TargetId]; target != nil {
			select {
			case target.Send <- data:
			default:
			}
		}
		h.mu.RUnlock()
		return
	}

	if payload.Channel != "" {
		data, _ := json.Marshal(typingMsg)
		h.mu.RLock()
		clients := h.channels[payload.Channel]
		for _, c := range clients {
			if c.PublicKey != client.PublicKey {
				select {
				case c.Send <- data:
				default:
				}
			}
		}
		h.mu.RUnlock()
	}
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

	if payload.ServerName != "" {
		h.serverName = payload.ServerName
	}
	h.motd = payload.Motd

	// Broadcast updated info to all clients
	h.broadcastAll(Message{
		Type:      "server.settings_updated",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"serverName": h.serverName,
			"motd":       h.motd,
		}),
	})
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
		Type:      "admin.banlist",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"bans": list}),
	})
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
		Type:      "admin.unbanned",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"publicKey": payload.PublicKey}),
	})
}

func (h *Hub) handleChatEdit(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
		Content   string `json:"content"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.EditMessage(payload.MessageId, client.PublicKey, payload.Content); err != nil {
		h.sendError(client, "cannot edit message")
		return
	}

	// Get the message to know which channel to broadcast to
	m, err := h.chat.GetMessageById(payload.MessageId)
	if err != nil {
		return
	}

	editMsg := Message{
		Type:      "chat.edited",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   m.Channel,
			"content":   payload.Content,
			"userId":    client.PublicKey,
		}),
	}
	h.broadcastToChannel(m.Channel, editMsg)
}

func (h *Hub) handleChatDelete(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	m, err := h.chat.GetMessageById(payload.MessageId)
	if err != nil {
		h.sendError(client, "message not found")
		return
	}

	if m.UserKey != client.PublicKey && client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	if m.UserKey == client.PublicKey {
		h.chat.DeleteMessage(payload.MessageId, client.PublicKey)
	} else {
		h.chat.DeleteMessageAdmin(payload.MessageId)
	}

	deleteMsg := Message{
		Type:      "chat.deleted",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   m.Channel,
		}),
	}
	h.broadcastToChannel(m.Channel, deleteMsg)
}

func (h *Hub) handleReactionAdd(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
		Emoji     string `json:"emoji"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.AddReaction(payload.MessageId, client.PublicKey, payload.Emoji); err != nil {
		return
	}

	m, _ := h.chat.GetMessageById(payload.MessageId)
	channel := ""
	if m != nil {
		channel = m.Channel
	}

	reactMsg := Message{
		Type:      "reaction.updated",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   channel,
			"emoji":     payload.Emoji,
			"userId":    client.PublicKey,
			"action":    "add",
		}),
	}

	if channel != "" {
		h.broadcastToChannel(channel, reactMsg)
	}
}

func (h *Hub) handleReactionRemove(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
		Emoji     string `json:"emoji"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.RemoveReaction(payload.MessageId, client.PublicKey, payload.Emoji); err != nil {
		return
	}

	m, _ := h.chat.GetMessageById(payload.MessageId)
	channel := ""
	if m != nil {
		channel = m.Channel
	}

	reactMsg := Message{
		Type:      "reaction.updated",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   channel,
			"emoji":     payload.Emoji,
			"userId":    client.PublicKey,
			"action":    "remove",
		}),
	}

	if channel != "" {
		h.broadcastToChannel(channel, reactMsg)
	}
}

func (h *Hub) handlePinAdd(client *Client, msg Message) {
	if !h.permissions.CanCreateChannel(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
		Channel   string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.PinMessage(payload.MessageId, payload.Channel, client.PublicKey); err != nil {
		h.sendError(client, "failed to pin message")
		return
	}

	pinMsg := Message{
		Type:      "pin.added",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   payload.Channel,
			"pinnedBy":  client.PublicKey,
		}),
	}
	h.broadcastToChannel(payload.Channel, pinMsg)
}

func (h *Hub) handlePinRemove(client *Client, msg Message) {
	if !h.permissions.CanCreateChannel(client.Role) {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		MessageId string `json:"messageId"`
		Channel   string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.UnpinMessage(payload.MessageId); err != nil {
		h.sendError(client, "failed to unpin message")
		return
	}

	unpinMsg := Message{
		Type:      "pin.removed",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"messageId": payload.MessageId,
			"channel":   payload.Channel,
		}),
	}
	h.broadcastToChannel(payload.Channel, unpinMsg)
}

func (h *Hub) handlePinList(client *Client, msg Message) {
	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	pinned, err := h.chat.GetPinnedMessages(payload.Channel)
	if err != nil {
		return
	}

	var msgs []map[string]interface{}
	for _, m := range pinned {
		msgs = append(msgs, map[string]interface{}{
			"id":        m.ID,
			"channel":   m.Channel,
			"userId":    m.UserKey,
			"nickname":  m.Nickname,
			"content":   m.Content,
			"timestamp": m.Timestamp.UnixMilli(),
		})
	}

	h.sendToClient(client, Message{
		Type:      "pin.list",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channel": payload.Channel, "messages": msgs}),
	})
}

func (h *Hub) handleNickChange(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Nickname string `json:"nickname"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if len(payload.Nickname) < 1 || len(payload.Nickname) > 32 {
		h.sendError(client, "nickname must be 1-32 characters")
		return
	}

	oldNick := client.Nickname
	client.Nickname = payload.Nickname

	h.broadcastAll(Message{
		Type:      "user.nick_changed",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":  client.PublicKey,
			"oldNick": oldNick,
			"newNick": payload.Nickname,
		}),
	})
}

func (h *Hub) handleSearch(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Query   string `json:"query"`
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if len(payload.Query) < 2 {
		h.sendError(client, "query too short")
		return
	}

	results, err := h.chat.SearchMessages(payload.Query, payload.Channel, 30)
	if err != nil {
		h.sendError(client, "search failed")
		return
	}

	var msgs []map[string]interface{}
	for _, m := range results {
		msgs = append(msgs, map[string]interface{}{
			"id":        m.ID,
			"channel":   m.Channel,
			"userId":    m.UserKey,
			"nickname":  m.Nickname,
			"content":   m.Content,
			"timestamp": m.Timestamp.UnixMilli(),
		})
	}

	h.sendToClient(client, Message{
		Type:      "chat.search_results",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"query": payload.Query, "results": msgs}),
	})
}

func (h *Hub) handleUserStatus(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Status string `json:"status"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	switch payload.Status {
	case "available", "away", "busy":
	default:
		return
	}

	client.Status = payload.Status

	h.broadcastAll(Message{
		Type:      "user.status_changed",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId": client.PublicKey,
			"status": payload.Status,
		}),
	})
}

func (h *Hub) handleChannelMembers(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.mu.RLock()
	members := h.channels[payload.Channel]
	var list []map[string]string
	for _, c := range members {
		if c.PublicKey == "" {
			continue
		}
		list = append(list, map[string]string{
			"userId":   c.PublicKey,
			"nickname": c.Nickname,
			"role":     c.Role,
			"status":   c.Status,
		})
	}
	h.mu.RUnlock()

	h.sendToClient(client, Message{
		Type:      "channel.members",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel": payload.Channel,
			"members": list,
		}),
	})
}

func (h *Hub) handleChatHistory(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Before  int64  `json:"before"` // timestamp in ms
		Limit   int    `json:"limit"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Limit <= 0 || payload.Limit > 50 {
		payload.Limit = 50
	}

	var beforeTime time.Time
	if payload.Before > 0 {
		beforeTime = time.UnixMilli(payload.Before)
	} else {
		beforeTime = time.Now()
	}

	messages, err := h.chat.GetHistoryBefore(payload.Channel, beforeTime, payload.Limit)
	if err != nil {
		return
	}

	var msgs []map[string]interface{}
	for _, m := range messages {
		p := map[string]interface{}{
			"channel":  m.Channel,
			"userId":   m.UserKey,
			"nickname": m.Nickname,
			"content":  m.Content,
			"role":     h.permissions.GetRole(m.UserKey),
		}
		if m.ReplyTo != "" {
			p["replyTo"] = m.ReplyTo
		}
		msgs = append(msgs, map[string]interface{}{
			"id":        m.ID,
			"timestamp": m.Timestamp.UnixMilli(),
			"payload":   p,
		})
	}

	h.sendToClient(client, Message{
		Type:      "chat.history",
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":  payload.Channel,
			"messages": msgs,
			"hasMore":  len(messages) >= payload.Limit,
		}),
	})
}

func mustMarshal(v interface{}) json.RawMessage {
	data, _ := json.Marshal(v)
	return data
}
