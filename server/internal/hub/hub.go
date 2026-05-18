package hub

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/hotline-modern/server/internal/auth"
	"github.com/hotline-modern/server/internal/chat"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/permissions"
)

type Message struct {
	Type      string          `json:"type"`
	ID        string          `json:"id"`
	Timestamp int64           `json:"timestamp"`
	Payload   json.RawMessage `json:"payload"`
}

type Client struct {
	ID           string
	PublicKey    string
	BoxPublicKey string // Curve25519 encryption key for E2E DMs
	Nickname     string
	Role         string
	Status       string // "available", "away", "busy"
	ConnectedAt  time.Time
	Channels     map[string]bool
	Conn         *websocket.Conn
	Send         chan []byte
	Hub          *Hub
	mu           sync.Mutex
	// Rate limiting
	tokens     float64
	lastRefill time.Time
}

const (
	rateLimitTokens = 10.0 // max tokens (burst)
	rateLimitRefill = 2.0  // tokens per second
	rateLimitCost   = 1.0  // cost per message
)

// WebSocket message type constants
const (
	MsgAuth                 = "auth"
	MsgAuthNonce            = "auth.nonce"
	MsgAuthOK               = "auth.ok"
	MsgAuthError            = "auth.error"
	MsgChatSend             = "chat.send"
	MsgChatMessage          = "chat.message"
	MsgChatEdit             = "chat.edit"
	MsgChatEdited           = "chat.edited"
	MsgChatDelete           = "chat.delete"
	MsgChatDeleted          = "chat.deleted"
	MsgChatHistory          = "chat.history"
	MsgChatRead             = "chat.read"
	MsgChatReadReceipt      = "chat.read_receipt"
	MsgChatSearch           = "chat.search"
	MsgChatSearchResults    = "chat.search_results"
	MsgChannelCreate        = "channel.create"
	MsgChannelJoin          = "channel.join"
	MsgChannelLeave         = "channel.leave"
	MsgChannelList          = "channel.list"
	MsgChannelMembers       = "channel.members"
	MsgUserList             = "user.list"
	MsgUserJoined           = "user.joined"
	MsgUserLeft             = "user.left"
	MsgUserNick             = "user.nick"
	MsgUserNickChanged      = "user.nick_changed"
	MsgUserStatus           = "user.status"
	MsgUserStatusChanged    = "user.status_changed"
	MsgUserRoleChanged      = "user.role_changed"
	MsgDMSend               = "dm.send"
	MsgDMMessage            = "dm.message"
	MsgTyping               = "typing"
	MsgReactionAdd          = "reaction.add"
	MsgReactionRemove       = "reaction.remove"
	MsgReactionUpdated      = "reaction.updated"
	MsgPinAdd               = "pin.add"
	MsgPinRemove            = "pin.remove"
	MsgPinAdded             = "pin.added"
	MsgPinRemoved           = "pin.removed"
	MsgPinList              = "pin.list"
	MsgAdminKick            = "admin.kick"
	MsgAdminBan             = "admin.ban"
	MsgAdminUnban           = "admin.unban"
	MsgAdminBanlist         = "admin.banlist"
	MsgAdminSetRole         = "admin.set_role"
	MsgAdminOp              = "admin.op"
	MsgAdminTopic           = "admin.topic"
	MsgAdminDeleteChannel   = "admin.delete_channel"
	MsgAdminSettings        = "admin.settings"
	MsgAdminUnbanned        = "admin.unbanned"
	MsgAdminMute            = "admin.mute"
	MsgAdminUnmute          = "admin.unmute"
	MsgAdminMutelist        = "admin.mutelist"
	MsgAdminUserList        = "admin.userlist"
	MsgAdminRenameChannel   = "admin.rename_channel"
	MsgChannelDelete         = "channel.delete"
	MsgServerSettingsUpdated = "server.settings_updated"
	MsgCustomEmojiList       = "custom_emoji.list"
	MsgCustomEmojiAdd        = "custom_emoji.add"
	MsgCustomEmojiRemove     = "custom_emoji.remove"
	MsgVoiceJoin             = "voice.join"
	MsgVoiceLeave            = "voice.leave"
	MsgVoiceOffer            = "voice.offer"
	MsgVoiceAnswer           = "voice.answer"
	MsgVoiceICE              = "voice.ice"
	MsgVoiceState            = "voice.state"
	MsgVoiceMute             = "voice.mute"
	MsgInviteCreate          = "invite.create"
	MsgInviteList            = "invite.list"
	MsgInviteDelete          = "invite.delete"
	MsgProfileGet            = "profile.get"
	MsgProfileUpdate         = "profile.update"
	MsgProfileData           = "profile.data"
	MsgProfileUpdated        = "profile.updated"
	MsgAuditLog              = "audit.log"
	MsgError                 = "error"
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

type VoiceParticipant struct {
	PublicKey string `json:"userId"`
	Nickname  string `json:"nickname"`
	Muted     bool   `json:"muted"`
	Deafened  bool   `json:"deafened"`
}

type Hub struct {
	clients       map[string]*Client
	pubKeyIndex   map[string]*Client                            // publicKey -> client (fast lookup)
	channels      map[string]map[string]*Client                 // channel -> clientID -> client
	voiceChannels map[string]map[string]*VoiceParticipant       // channel -> publicKey -> participant
	register      chan *Client
	unregister   chan *Client
	auth         *auth.Manager
	chat         *chat.Manager
	permissions  *permissions.Manager
	serverName      string
	motd            string
	agreement       string
	allowedOrigins  []string
	upgrader        websocket.Upgrader
	mu              sync.RWMutex
}

const maxMessageLength = 4000 // Max chat message content length in bytes

func New(authMgr *auth.Manager, chatMgr *chat.Manager, permMgr *permissions.Manager, serverName, motd, agreement, origins string) *Hub {
	var originList []string
	if origins != "" {
		for _, o := range strings.Split(origins, ",") {
			originList = append(originList, strings.TrimSpace(o))
		}
	}

	h := &Hub{
		clients:        make(map[string]*Client),
		pubKeyIndex:    make(map[string]*Client),
		channels:       make(map[string]map[string]*Client),
		voiceChannels:  make(map[string]map[string]*VoiceParticipant),
		register:       make(chan *Client),
		unregister:     make(chan *Client),
		auth:           authMgr,
		chat:           chatMgr,
		permissions:    permMgr,
		serverName:     serverName,
		motd:           motd,
		agreement:      agreement,
		allowedOrigins: originList,
	}
	h.upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			if len(h.allowedOrigins) == 0 {
				return true
			}
			origin := r.Header.Get("Origin")
			for _, allowed := range h.allowedOrigins {
				if origin == allowed {
					return true
				}
			}
			return false
		},
	}
	return h
}

// ClientCount returns the number of authenticated clients.
func (h *Hub) ClientCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	count := 0
	for _, c := range h.clients {
		if c.PublicKey != "" {
			count++
		}
	}
	return count
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
			var voiceLeftChannel string
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				// Remove from voice channels before cleaning up
				if client.PublicKey != "" {
					for ch, participants := range h.voiceChannels {
						if _, inVoice := participants[client.PublicKey]; inVoice {
							delete(participants, client.PublicKey)
							if len(participants) == 0 {
								delete(h.voiceChannels, ch)
							}
							voiceLeftChannel = ch
							break // client can only be in one voice channel
						}
					}
				}

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
			if voiceLeftChannel != "" {
				h.broadcastVoiceState(voiceLeftChannel)
			}
			if shouldBroadcast {
				h.broadcastUserLeft(client)
			}
		}
	}
}

func (h *Hub) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := h.upgrader.Upgrade(w, r, nil)
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
		Type:      MsgAuthNonce,
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
	if msg.Type != MsgAuth && client.PublicKey != "" {
		if !client.consumeToken() {
			h.sendError(client, "rate limited: slow down")
			return
		}
	}

	switch msg.Type {
	case MsgAuth:
		h.handleAuth(client, msg)
	case MsgChatSend:
		h.handleChatSend(client, msg)
	case MsgChannelJoin:
		h.handleChannelJoin(client, msg)
	case MsgChannelLeave:
		h.handleChannelLeave(client, msg)
	case MsgChannelCreate:
		h.handleChannelCreate(client, msg)
	case MsgUserList:
		h.handleUserList(client)
	case MsgChannelList:
		h.handleChannelList(client)
	case MsgAdminKick:
		h.handleKick(client, msg)
	case MsgAdminBan:
		h.handleBan(client, msg)
	case MsgAdminOp:
		h.handleOp(client, msg)
	case MsgAdminTopic:
		h.handleTopic(client, msg)
	case MsgDMSend:
		h.handleDMSend(client, msg)
	case MsgTyping:
		h.handleTyping(client, msg)
	case MsgChannelDelete:
		h.handleChannelDelete(client, msg)
	case MsgChatSearch:
		h.handleSearch(client, msg)
	case MsgChatEdit:
		h.handleChatEdit(client, msg)
	case MsgChatDelete:
		h.handleChatDelete(client, msg)
	case MsgReactionAdd:
		h.handleReactionAdd(client, msg)
	case MsgReactionRemove:
		h.handleReactionRemove(client, msg)
	case MsgPinAdd:
		h.handlePinAdd(client, msg)
	case MsgPinRemove:
		h.handlePinRemove(client, msg)
	case MsgPinList:
		h.handlePinList(client, msg)
	case MsgUserNick:
		h.handleNickChange(client, msg)
	case MsgAdminSettings:
		h.handleAdminSettings(client, msg)
	case MsgAdminBanlist:
		h.handleBanList(client)
	case MsgAdminUnban:
		h.handleUnban(client, msg)
	case MsgUserStatus:
		h.handleUserStatus(client, msg)
	case MsgChannelMembers:
		h.handleChannelMembers(client, msg)
	case MsgChatHistory:
		h.handleChatHistory(client, msg)
	case MsgChatRead:
		h.handleChatRead(client, msg)
	case MsgAdminMute:
		h.handleMute(client, msg)
	case MsgAdminUnmute:
		h.handleUnmute(client, msg)
	case MsgAdminMutelist:
		h.handleMuteList(client)
	case MsgAdminUserList:
		h.handleAdminUserList(client)
	case MsgAdminRenameChannel:
		h.handleRenameChannel(client, msg)
	case MsgCustomEmojiList:
		h.handleCustomEmojiList(client)
	case MsgCustomEmojiAdd:
		h.handleCustomEmojiAdd(client, msg)
	case MsgCustomEmojiRemove:
		h.handleCustomEmojiRemove(client, msg)
	case MsgVoiceJoin:
		h.handleVoiceJoin(client, msg)
	case MsgVoiceLeave:
		h.handleVoiceLeave(client, msg)
	case MsgVoiceOffer:
		h.handleVoiceRelay(client, msg, MsgVoiceOffer)
	case MsgVoiceAnswer:
		h.handleVoiceRelay(client, msg, MsgVoiceAnswer)
	case MsgVoiceICE:
		h.handleVoiceRelay(client, msg, MsgVoiceICE)
	case MsgVoiceMute:
		h.handleVoiceMute(client, msg)
	case MsgInviteCreate:
		h.handleInviteCreate(client, msg)
	case MsgInviteList:
		h.handleInviteList(client)
	case MsgInviteDelete:
		h.handleInviteDelete(client, msg)
	}
}

func (h *Hub) handleAuth(client *Client, msg Message) {
	var payload struct {
		PublicKey    string `json:"publicKey"`
		BoxPublicKey string `json:"boxPublicKey"`
		Signature   string `json:"signature"`
		Nonce       string `json:"nonce"`
		Nickname    string `json:"nickname"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid auth payload")
		return
	}

	role, err := h.auth.Verify(client.ID, payload.PublicKey, payload.Signature, payload.Nonce, payload.Nickname)
	if err != nil {
		h.sendToClient(client, Message{
			Type:      MsgAuthError,
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
	client.BoxPublicKey = payload.BoxPublicKey
	client.Nickname = payload.Nickname
	client.Role = role
	client.ConnectedAt = time.Now()
	h.pubKeyIndex[payload.PublicKey] = client
	h.mu.Unlock()
	for _, c := range stale {
		c.Conn.Close()
	}

	h.sendToClient(client, Message{
		Type:      MsgAuthOK,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":     client.PublicKey,
			"role":       role,
			"serverName": h.serverName,
			"motd":       h.motd,
			"agreement":  h.agreement,
		}),
	})

	h.joinChannel(client, "lobby")
	h.sendHistory(client, "lobby")
	h.broadcastUserJoined(client)
	h.sendCustomEmojiList(client)
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
		MsgType string `json:"msgType"`
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

	// Check mute status
	if muted, _ := h.chat.IsMuted(client.PublicKey); muted {
		h.sendError(client, "you are muted")
		return
	}

	if !client.Channels[payload.Channel] {
		h.sendError(client, "not in channel")
		return
	}

	msgID := uuid.New().String()
	h.chat.SaveMessage(msgID, payload.Channel, client.PublicKey, client.Nickname, payload.Content, payload.ReplyTo, payload.MsgType)

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
	if payload.MsgType != "" {
		chatPayload["msgType"] = payload.MsgType
	}

	chatMsg := Message{
		Type:      MsgChatMessage,
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
	var users []map[string]interface{}
	for _, c := range h.clients {
		if c.PublicKey == "" {
			continue
		}
		users = append(users, map[string]interface{}{
			"userId":       c.PublicKey,
			"nickname":     c.Nickname,
			"role":         c.Role,
			"status":       c.Status,
			"boxPublicKey": c.BoxPublicKey,
			"connectedAt":  c.ConnectedAt.UnixMilli(),
		})
	}
	h.mu.RUnlock()

	h.sendToClient(client, Message{
		Type:      MsgUserList,
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
		Type:      MsgChannelList,
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
		Type:      MsgUserJoined,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"userId":       client.PublicKey,
			"nickname":     client.Nickname,
			"role":         client.Role,
			"boxPublicKey": client.BoxPublicKey,
			"connectedAt":  client.ConnectedAt.UnixMilli(),
		}),
	}
	h.broadcastAll(msg)
}

func (h *Hub) broadcastUserLeft(client *Client) {
	if client.PublicKey == "" {
		return
	}
	msg := Message{
		Type:      MsgUserLeft,
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
		Type:      MsgChannelList,
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
		if m.MsgType != "" {
			payload["msgType"] = m.MsgType
		}
		h.sendToClient(client, Message{
			Type:      MsgChatMessage,
			ID:        m.ID,
			Timestamp: m.Timestamp.UnixMilli(),
			Payload:   mustMarshal(payload),
		})
	}
}

func (h *Hub) sendError(client *Client, message string) {
	h.sendToClient(client, Message{
		Type:      MsgError,
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
		TargetId        string `json:"targetId"`
		Content         string `json:"content"`
		Encrypted       bool   `json:"encrypted"`
		Ciphertext      string `json:"ciphertext"`
		Nonce           string `json:"nonce"`
		SenderBoxPubKey string `json:"senderBoxPublicKey"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.TargetId == client.PublicKey {
		return
	}

	// For storage: save ciphertext if encrypted, otherwise plaintext
	storageContent := payload.Content
	if payload.Encrypted {
		storageContent = "[encrypted]"
	}
	dmCh := dmChannelKey(client.PublicKey, payload.TargetId)
	msgID := uuid.New().String()
	h.chat.SaveMessage(msgID, dmCh, client.PublicKey, client.Nickname, storageContent, "", "")

	// Build the outgoing payload, passing through encryption fields
	outPayload := map[string]interface{}{
		"from":     client.PublicKey,
		"to":       payload.TargetId,
		"nickname": client.Nickname,
		"content":  payload.Content,
		"role":     client.Role,
	}
	if payload.Encrypted {
		outPayload["encrypted"] = true
		outPayload["ciphertext"] = payload.Ciphertext
		outPayload["nonce"] = payload.Nonce
		outPayload["senderBoxPublicKey"] = payload.SenderBoxPubKey
	}

	dmMsg := Message{
		Type:      MsgDMMessage,
		ID:        msgID,
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(outPayload),
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
		Type:      MsgTyping,
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

	h.chat.AddAuditLog("channel_delete", client.PublicKey, client.Nickname, "", "", payload.Name)
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

	h.chat.SetSetting("server_name", h.serverName)
	h.chat.SetSetting("motd", h.motd)

	// Broadcast updated info to all clients
	h.broadcastAll(Message{
		Type:      MsgServerSettingsUpdated,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"serverName": h.serverName,
			"motd":       h.motd,
		}),
	})

	h.chat.AddAuditLog("settings_update", client.PublicKey, client.Nickname, "", "", "serverName="+h.serverName)
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
		Type:      MsgChatEdited,
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
		Type:      MsgChatDeleted,
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
		Type:      MsgReactionUpdated,
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
		Type:      MsgReactionUpdated,
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
		Type:      MsgPinAdded,
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
		Type:      MsgPinRemoved,
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
		Type:      MsgPinList,
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
		Type:      MsgUserNickChanged,
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
		Type:      MsgChatSearchResults,
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
		Type:      MsgUserStatusChanged,
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
		Type:      MsgChannelMembers,
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
		if m.MsgType != "" {
			p["msgType"] = m.MsgType
		}
		msgs = append(msgs, map[string]interface{}{
			"id":        m.ID,
			"timestamp": m.Timestamp.UnixMilli(),
			"payload":   p,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgChatHistory,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":  payload.Channel,
			"messages": msgs,
			"hasMore":  len(messages) >= payload.Limit,
		}),
	})
}

func (h *Hub) handleChatRead(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}
	var payload struct {
		Channel   string `json:"channel"`
		MessageId string `json:"messageId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Channel == "" || payload.MessageId == "" {
		return
	}
	// Broadcast read receipt to channel members
	h.broadcastToChannel(payload.Channel, Message{
		Type:      MsgChatReadReceipt,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":   payload.Channel,
			"messageId": payload.MessageId,
			"userId":    client.PublicKey,
			"nickname":  client.Nickname,
		}),
	})
}

func (h *Hub) handleMute(client *Client, msg Message) {
	if !permissions.CanMute(client.Role) {
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
	if !permissions.CanMute(client.Role) {
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
	if !permissions.CanMute(client.Role) {
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

func (h *Hub) sendCustomEmojiList(client *Client) {
	emojis, err := h.chat.GetCustomEmojis()
	if err != nil {
		return
	}
	var list []map[string]string
	for _, e := range emojis {
		list = append(list, map[string]string{
			"name": e.Name,
			"url":  "/files/emojis/" + e.Filename,
		})
	}
	h.sendToClient(client, Message{
		Type:      MsgCustomEmojiList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"emojis": list}),
	})
}

func (h *Hub) handleCustomEmojiList(client *Client) {
	if client.PublicKey == "" {
		return
	}
	h.sendCustomEmojiList(client)
}

func (h *Hub) handleCustomEmojiAdd(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		Name     string `json:"name"`
		Filename string `json:"filename"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Name == "" || payload.Filename == "" {
		h.sendError(client, "name and filename required")
		return
	}
	// Sanitize: only allow alphanumeric, underscore, dash in name
	for _, r := range payload.Name {
		if !((r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '_' || r == '-') {
			h.sendError(client, "invalid emoji name (lowercase alphanumeric, _, - only)")
			return
		}
	}
	if len(payload.Name) > 32 {
		h.sendError(client, "emoji name too long (max 32)")
		return
	}
	if err := h.chat.AddCustomEmoji(payload.Name, client.PublicKey, payload.Filename); err != nil {
		h.sendError(client, "failed to add custom emoji")
		return
	}
	// Broadcast updated list to all clients
	h.broadcastCustomEmojiList()
}

func (h *Hub) handleCustomEmojiRemove(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	var payload struct {
		Name string `json:"name"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	if payload.Name == "" {
		return
	}
	if err := h.chat.RemoveCustomEmoji(payload.Name); err != nil {
		h.sendError(client, "failed to remove custom emoji")
		return
	}
	h.broadcastCustomEmojiList()
}

func (h *Hub) broadcastCustomEmojiList() {
	emojis, err := h.chat.GetCustomEmojis()
	if err != nil {
		return
	}
	var list []map[string]string
	for _, e := range emojis {
		list = append(list, map[string]string{
			"name": e.Name,
			"url":  "/files/emojis/" + e.Filename,
		})
	}
	h.broadcastAll(Message{
		Type:      MsgCustomEmojiList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"emojis": list}),
	})
}

// ── Voice channel handlers ───────────────────────────────────────────

func (h *Hub) handleVoiceJoin(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if !client.Channels[payload.Channel] {
		h.sendError(client, "not in channel")
		return
	}

	h.mu.Lock()
	// Remove from any existing voice channel (one voice channel at a time)
	for ch, participants := range h.voiceChannels {
		if _, inVoice := participants[client.PublicKey]; inVoice {
			delete(participants, client.PublicKey)
			if len(participants) == 0 {
				delete(h.voiceChannels, ch)
			}
			break
		}
	}
	// Join the requested voice channel
	if h.voiceChannels[payload.Channel] == nil {
		h.voiceChannels[payload.Channel] = make(map[string]*VoiceParticipant)
	}
	h.voiceChannels[payload.Channel][client.PublicKey] = &VoiceParticipant{
		PublicKey: client.PublicKey,
		Nickname:  client.Nickname,
		Muted:     false,
		Deafened:  false,
	}
	h.mu.Unlock()

	h.broadcastVoiceState(payload.Channel)
}

func (h *Hub) handleVoiceLeave(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Channel string `json:"channel"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	h.mu.Lock()
	if participants := h.voiceChannels[payload.Channel]; participants != nil {
		delete(participants, client.PublicKey)
		if len(participants) == 0 {
			delete(h.voiceChannels, payload.Channel)
		}
	}
	h.mu.Unlock()

	h.broadcastVoiceState(payload.Channel)
}

func (h *Hub) handleVoiceRelay(client *Client, msg Message, relayType string) {
	if client.PublicKey == "" {
		return
	}

	// Parse the full payload as a map so we can forward all fields (sdp/candidate)
	var raw map[string]interface{}
	if err := json.Unmarshal(msg.Payload, &raw); err != nil {
		return
	}
	targetId, _ := raw["targetUserId"].(string)
	if targetId == "" {
		return
	}

	// Build relay payload: copy original fields and add fromUserId
	raw["fromUserId"] = client.PublicKey
	delete(raw, "targetUserId")

	h.mu.RLock()
	target := h.pubKeyIndex[targetId]
	h.mu.RUnlock()

	if target == nil {
		return
	}

	h.sendToClient(target, Message{
		Type:      relayType,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(raw),
	})
}

func (h *Hub) handleVoiceMute(client *Client, msg Message) {
	if client.PublicKey == "" {
		return
	}

	var payload struct {
		Muted    bool `json:"muted"`
		Deafened bool `json:"deafened"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	var foundChannel string
	h.mu.Lock()
	for ch, participants := range h.voiceChannels {
		if p, ok := participants[client.PublicKey]; ok {
			p.Muted = payload.Muted
			p.Deafened = payload.Deafened
			foundChannel = ch
			break
		}
	}
	h.mu.Unlock()

	if foundChannel != "" {
		h.broadcastVoiceState(foundChannel)
	}
}

func (h *Hub) broadcastVoiceState(channel string) {
	h.mu.RLock()
	var participants []*VoiceParticipant
	for _, p := range h.voiceChannels[channel] {
		participants = append(participants, p)
	}
	clients := h.channels[channel]
	data, _ := json.Marshal(Message{
		Type:      MsgVoiceState,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"channel":      channel,
			"participants": participants,
		}),
	})
	for _, c := range clients {
		select {
		case c.Send <- data:
		default:
		}
	}
	h.mu.RUnlock()
}

// ── Invite handlers ────────────────────────────────────────────────────

func (h *Hub) handleInviteCreate(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		MaxUses     int `json:"maxUses"`
		ExpireHours int `json:"expireHours"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	code, err := db.GenerateInviteCode()
	if err != nil {
		h.sendError(client, "failed to generate invite code")
		return
	}

	var expiresAt *time.Time
	if payload.ExpireHours > 0 {
		t := time.Now().Add(time.Duration(payload.ExpireHours) * time.Hour)
		expiresAt = &t
	}

	if err := h.chat.CreateInvite(code, client.PublicKey, payload.MaxUses, expiresAt); err != nil {
		h.sendError(client, "failed to create invite")
		return
	}

	h.sendInviteList(client)
}

func (h *Hub) handleInviteList(client *Client) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	h.sendInviteList(client)
}

func (h *Hub) handleInviteDelete(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Code string `json:"code"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.DeleteInvite(payload.Code); err != nil {
		h.sendError(client, "failed to delete invite")
		return
	}

	h.sendInviteList(client)
}

func (h *Hub) sendInviteList(client *Client) {
	invites, err := h.chat.GetInvites()
	if err != nil {
		h.sendError(client, "failed to get invites")
		return
	}

	var list []map[string]interface{}
	for _, inv := range invites {
		entry := map[string]interface{}{
			"code":      inv.Code,
			"createdBy": inv.CreatedBy,
			"maxUses":   inv.MaxUses,
			"uses":      inv.Uses,
			"createdAt": inv.CreatedAt.UnixMilli(),
		}
		if inv.ExpiresAt != nil {
			entry["expiresAt"] = inv.ExpiresAt.UnixMilli()
		}
		list = append(list, entry)
	}

	h.sendToClient(client, Message{
		Type:      MsgInviteList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"invites": list}),
	})
}

func mustMarshal(v interface{}) json.RawMessage {
	data, _ := json.Marshal(v)
	return data
}
