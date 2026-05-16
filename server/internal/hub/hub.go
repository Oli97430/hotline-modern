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
	Channels  map[string]bool
	Conn      *websocket.Conn
	Send      chan []byte
	Hub       *Hub
	mu        sync.Mutex
}

type Hub struct {
	clients     map[string]*Client
	channels    map[string]map[string]*Client // channel -> clientID -> client
	register    chan *Client
	unregister  chan *Client
	auth        *auth.Manager
	chat        *chat.Manager
	permissions *permissions.Manager
	serverName  string
	motd        string
	mu          sync.RWMutex
}

func New(authMgr *auth.Manager, chatMgr *chat.Manager, permMgr *permissions.Manager, serverName, motd string) *Hub {
	return &Hub{
		clients:     make(map[string]*Client),
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
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				delete(h.clients, client.ID)
				close(client.Send)
				for ch := range client.Channels {
					if h.channels[ch] != nil {
						delete(h.channels[ch], client.ID)
					}
				}
				h.broadcastUserLeft(client)
			}
			h.mu.Unlock()
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
		ID:       uuid.New().String(),
		Channels: make(map[string]bool),
		Conn:     conn,
		Send:     make(chan []byte, 256),
		Hub:      h,
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
	h.mu.Unlock()
	for _, c := range stale {
		c.Conn.Close()
	}

	client.PublicKey = payload.PublicKey
	client.Nickname = payload.Nickname
	client.Role = role

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
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
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
	h.chat.SaveMessage(msgID, payload.Channel, client.PublicKey, client.Nickname, payload.Content)

	chatMsg := Message{
		Type:      "chat.message",
		ID:        msgID,
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":  payload.Channel,
			"userId":   client.PublicKey,
			"nickname": client.Nickname,
			"content":  payload.Content,
			"role":     client.Role,
		}),
	}

	h.broadcastToChannel(payload.Channel, chatMsg)
}

func (h *Hub) handleChannelJoin(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if !h.permissions.CanJoinChannel(client.Role, payload.Channel) {
		h.sendError(client, "permission denied")
		return
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
		Name  string `json:"name"`
		Topic string `json:"topic"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	exists, _ := h.chat.ChannelExists(payload.Name)
	if exists {
		h.sendError(client, "channel already exists")
		return
	}

	if err := h.chat.CreateChannel(payload.Name, payload.Topic, client.PublicKey); err != nil {
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
			"status":   "online",
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
			"name":      ch.Name,
			"topic":     ch.Topic,
			"userCount": count,
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
			"name":      ch.Name,
			"topic":     ch.Topic,
			"userCount": count,
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
		h.sendToClient(client, Message{
			Type:      "chat.message",
			ID:        m.ID,
			Timestamp: m.Timestamp.UnixMilli(),
			Payload: mustMarshal(map[string]interface{}{
				"channel":  m.Channel,
				"userId":   m.UserKey,
				"nickname": m.Nickname,
				"content":  m.Content,
				"role":     h.permissions.GetRole(m.UserKey),
			}),
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
	for _, c := range h.clients {
		if c.PublicKey == payload.UserId {
			h.mu.RUnlock()
			h.sendToClient(c, Message{
				Type:      "error",
				ID:        uuid.New().String(),
				Timestamp: time.Now().UnixMilli(),
				Payload:   mustMarshal(map[string]interface{}{"code": "kicked", "message": "You have been kicked"}),
			})
			c.Conn.Close()
			return
		}
	}
	h.mu.RUnlock()
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

	h.permissions.SetRole(payload.UserId, "guest")

	h.mu.RLock()
	for _, c := range h.clients {
		if c.PublicKey == payload.UserId {
			h.mu.RUnlock()
			h.sendToClient(c, Message{
				Type:      "error",
				ID:        uuid.New().String(),
				Timestamp: time.Now().UnixMilli(),
				Payload:   mustMarshal(map[string]interface{}{"code": "banned", "message": "You have been banned"}),
			})
			c.Conn.Close()
			return
		}
	}
	h.mu.RUnlock()
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

	h.mu.RLock()
	for _, c := range h.clients {
		if c.PublicKey == payload.UserId {
			c.Role = payload.Role
			break
		}
	}
	h.mu.RUnlock()

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

func mustMarshal(v interface{}) json.RawMessage {
	data, _ := json.Marshal(v)
	return data
}
