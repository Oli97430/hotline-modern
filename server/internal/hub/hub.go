package hub

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"regexp"
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
	MsgRetentionPurge        = "retention.purge"
	MsgRetentionStats        = "retention.stats"
	MsgRetentionExport       = "retention.export"
	MsgChannelPerms          = "channel.permissions"
	MsgChannelPermsSet       = "channel.permissions.set"
	MsgChannelSlowmode       = "channel.slowmode"
	MsgChannelDescription    = "channel.description"
	MsgUserNoteAdd           = "user_note.add"
	MsgUserNoteList          = "user_note.list"
	MsgUserNoteDelete        = "user_note.delete"
	MsgAutomodRuleAdd        = "automod.rule.add"
	MsgAutomodRuleList       = "automod.rule.list"
	MsgAutomodRuleDelete     = "automod.rule.delete"
	MsgAutomodRuleToggle     = "automod.rule.toggle"
	MsgAutomodWarning        = "automod.warning"
	MsgPing                  = "ping"
	MsgPong                  = "pong"
	MsgWelcomeSet            = "welcome.set"
	MsgWelcomeList           = "welcome.list"
	MsgWelcomeMsg            = "welcome.message"
	MsgCategoryCreate        = "category.create"
	MsgCategoryList          = "category.list"
	MsgCategoryDelete        = "category.delete"
	MsgCategoryReorder       = "category.reorder"
	MsgCategoryRename        = "category.rename"
	MsgChannelSetCategory    = "channel.set_category"
	MsgScheduleSend          = "schedule.send"
	MsgScheduleList          = "schedule.list"
	MsgScheduleDelete        = "schedule.delete"
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

type Hub struct {
	clients         map[string]*Client
	pubKeyIndex     map[string]*Client                            // publicKey -> client (fast lookup)
	channels        map[string]map[string]*Client                 // channel -> clientID -> client
	voiceChannels   map[string]map[string]*VoiceParticipant       // channel -> publicKey -> participant
	slowmodeTracker map[string]map[string]int64                   // channel -> publicKey -> lastMessageUnixMilli
	automodRules    []db.AutomodRule                              // cached rules, refreshed on change
	spamTracker     map[string][]spamEntry                        // publicKey -> recent messages for spam detection
	regexCache      map[string]*regexp.Regexp                     // pattern -> compiled regex
	register        chan *Client
	unregister      chan *Client
	auth            *auth.Manager
	chat            *chat.Manager
	permissions     *permissions.Manager
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
		clients:         make(map[string]*Client),
		pubKeyIndex:     make(map[string]*Client),
		channels:        make(map[string]map[string]*Client),
		voiceChannels:   make(map[string]map[string]*VoiceParticipant),
		slowmodeTracker: make(map[string]map[string]int64),
		spamTracker:     make(map[string][]spamEntry),
		regexCache:      make(map[string]*regexp.Regexp),
		register:        make(chan *Client),
		unregister:      make(chan *Client),
		auth:           authMgr,
		chat:           chatMgr,
		permissions:    permMgr,
		serverName:     serverName,
		motd:           motd,
		agreement:      agreement,
		allowedOrigins: originList,
	}

	// Load automod rules from DB into cache
	if rules, err := chatMgr.GetAutomodRules(); err == nil {
		h.automodRules = rules
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

// ChannelCount returns the number of active channels.
func (h *Hub) ChannelCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.channels)
}

func (h *Hub) Run() {
	// Background goroutine: check for pending scheduled messages every 30 seconds
	go func() {
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
		for range ticker.C {
			h.processScheduledMessages()
		}
	}()

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
					// Clean up per-user trackers to prevent memory leaks
					delete(h.spamTracker, client.PublicKey)
					for ch := range h.slowmodeTracker {
						delete(h.slowmodeTracker[ch], client.PublicKey)
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
	case MsgRetentionPurge:
		h.handleRetentionPurge(client, msg)
	case MsgRetentionStats:
		h.handleRetentionStats(client)
	case MsgRetentionExport:
		h.handleRetentionExport(client, msg)
	case MsgChannelPerms:
		h.handleChannelPerms(client, msg)
	case MsgChannelPermsSet:
		h.handleChannelPermsSet(client, msg)
	case MsgChannelSlowmode:
		h.handleChannelSlowmode(client, msg)
	case MsgChannelDescription:
		h.handleChannelDescription(client, msg)
	case MsgUserNoteAdd:
		h.handleUserNoteAdd(client, msg)
	case MsgUserNoteList:
		h.handleUserNoteList(client, msg)
	case MsgUserNoteDelete:
		h.handleUserNoteDelete(client, msg)
	case MsgPing:
		h.handlePing(client, msg)
	case MsgWelcomeSet:
		h.handleWelcomeSet(client, msg)
	case MsgWelcomeList:
		h.handleWelcomeList(client, msg)
	case MsgAutomodRuleAdd:
		h.handleAutomodRuleAdd(client, msg)
	case MsgAutomodRuleList:
		h.handleAutomodRuleList(client)
	case MsgAutomodRuleDelete:
		h.handleAutomodRuleDelete(client, msg)
	case MsgAutomodRuleToggle:
		h.handleAutomodRuleToggle(client, msg)
	case MsgProfileGet:
		h.handleProfileGet(client, msg)
	case MsgProfileUpdate:
		h.handleProfileUpdate(client, msg)
	case MsgAuditLog:
		h.handleAuditLog(client, msg)
	case MsgCategoryCreate:
		h.handleCategoryCreate(client, msg)
	case MsgCategoryList:
		h.handleCategoryList(client)
	case MsgCategoryDelete:
		h.handleCategoryDelete(client, msg)
	case MsgCategoryReorder:
		h.handleCategoryReorder(client, msg)
	case MsgCategoryRename:
		h.handleCategoryRename(client, msg)
	case MsgChannelSetCategory:
		h.handleChannelSetCategory(client, msg)
	case MsgScheduleSend:
		h.handleScheduleSend(client, msg)
	case MsgScheduleList:
		h.handleScheduleList(client)
	case MsgScheduleDelete:
		h.handleScheduleDelete(client, msg)
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

	// Check slowmode (admins/operators bypass)
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		if slowSecs, err := h.chat.GetChannelSlowmode(payload.Channel); err == nil && slowSecs > 0 {
			now := time.Now().UnixMilli()
			h.mu.RLock()
			lastMsg := int64(0)
			if tracker := h.slowmodeTracker[payload.Channel]; tracker != nil {
				lastMsg = tracker[client.PublicKey]
			}
			h.mu.RUnlock()
			waitMs := int64(slowSecs) * 1000
			if lastMsg > 0 && now-lastMsg < waitMs {
				remaining := (waitMs - (now - lastMsg) + 999) / 1000 // ceil to seconds
				h.sendError(client, fmt.Sprintf("Slowmode: wait %d seconds", remaining))
				return
			}
		}
	}

	if !client.Channels[payload.Channel] {
		h.sendError(client, "not in channel")
		return
	}

	// Automod checks — admin/operator messages bypass
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		if blocked := h.runAutomodChecks(client, payload.Content); blocked {
			return
		}
	}

	msgID := uuid.New().String()
	h.chat.SaveMessage(msgID, payload.Channel, client.PublicKey, client.Nickname, payload.Content, payload.ReplyTo, payload.MsgType)

	// Update slowmode tracker
	h.mu.Lock()
	if h.slowmodeTracker[payload.Channel] == nil {
		h.slowmodeTracker[payload.Channel] = make(map[string]int64)
	}
	h.slowmodeTracker[payload.Channel][client.PublicKey] = time.Now().UnixMilli()
	h.mu.Unlock()

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
	categories, _ := h.chat.GetCategories()
	var list []map[string]interface{}
	for _, ch := range channels {
		h.mu.RLock()
		count := 0
		if h.channels[ch.Name] != nil {
			count = len(h.channels[ch.Name])
		}
		h.mu.RUnlock()
		list = append(list, map[string]interface{}{
			"name":            ch.Name,
			"topic":           ch.Topic,
			"userCount":       count,
			"hasPassword":     ch.Password != "",
			"slowmode":        ch.SlowmodeSeconds,
			"description":     ch.Description,
			"categoryId":      ch.CategoryID,
		})
	}

	var catList []map[string]interface{}
	for _, cat := range categories {
		catList = append(catList, map[string]interface{}{
			"id":       cat.ID,
			"name":     cat.Name,
			"position": cat.Position,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgChannelList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channels": list, "categories": catList}),
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

	// Send welcome message if configured for this channel
	if wm, err := h.chat.GetWelcomeMessage(channel); err == nil && wm != nil && wm.Enabled && wm.Message != "" {
		h.sendToClient(client, Message{
			Type:      MsgWelcomeMsg,
			ID:        uuid.New().String(),
			Timestamp: time.Now().UnixMilli(),
			Payload:   mustMarshal(map[string]string{"channel": channel, "content": wm.Message}),
		})
	}
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
	categories, _ := h.chat.GetCategories()
	var list []map[string]interface{}
	for _, ch := range channels {
		h.mu.RLock()
		count := 0
		if h.channels[ch.Name] != nil {
			count = len(h.channels[ch.Name])
		}
		h.mu.RUnlock()
		list = append(list, map[string]interface{}{
			"name":            ch.Name,
			"topic":           ch.Topic,
			"userCount":       count,
			"hasPassword":     ch.Password != "",
			"slowmode":        ch.SlowmodeSeconds,
			"description":     ch.Description,
			"categoryId":      ch.CategoryID,
		})
	}

	var catList []map[string]interface{}
	for _, cat := range categories {
		catList = append(catList, map[string]interface{}{
			"id":       cat.ID,
			"name":     cat.Name,
			"position": cat.Position,
		})
	}

	msg := Message{
		Type:      MsgChannelList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"channels": list, "categories": catList}),
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

	h.mu.Lock()
	oldNick := client.Nickname
	client.Nickname = payload.Nickname
	h.mu.Unlock()

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

	h.mu.Lock()
	client.Status = payload.Status
	h.mu.Unlock()

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











func (h *Hub) handlePing(client *Client, msg Message) {
	var payload struct {
		Timestamp float64 `json:"timestamp"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}
	h.sendToClient(client, Message{
		Type:      MsgPong,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload: mustMarshal(map[string]interface{}{
			"timestamp":  payload.Timestamp,
			"serverTime": time.Now().UnixMilli(),
		}),
	})
}





// ── Channel category handlers ───────────────────────────────────────

func (h *Hub) handleCategoryCreate(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Name string `json:"name"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Name == "" || len(payload.Name) > 50 {
		h.sendError(client, "category name must be 1-50 characters")
		return
	}

	// Get current max position
	categories, _ := h.chat.GetCategories()
	pos := len(categories)

	_, err := h.chat.CreateCategory(payload.Name, pos)
	if err != nil {
		h.sendError(client, "failed to create category")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleCategoryList(client *Client) {
	if client.PublicKey == "" {
		return
	}
	categories, err := h.chat.GetCategories()
	if err != nil {
		h.sendError(client, "failed to get categories")
		return
	}

	var list []map[string]interface{}
	for _, cat := range categories {
		list = append(list, map[string]interface{}{
			"id":       cat.ID,
			"name":     cat.Name,
			"position": cat.Position,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgCategoryList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"categories": list}),
	})
}

func (h *Hub) handleCategoryDelete(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		ID int `json:"id"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.DeleteCategory(payload.ID); err != nil {
		h.sendError(client, "failed to delete category")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleCategoryReorder(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		IDs []int `json:"ids"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.ReorderCategories(payload.IDs); err != nil {
		h.sendError(client, "failed to reorder categories")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleCategoryRename(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if payload.Name == "" || len(payload.Name) > 50 {
		h.sendError(client, "category name must be 1-50 characters")
		return
	}

	if err := h.chat.RenameCategory(payload.ID, payload.Name); err != nil {
		h.sendError(client, "failed to rename category")
		return
	}

	h.broadcastChannelList()
}

func (h *Hub) handleChannelSetCategory(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		Channel    string `json:"channel"`
		CategoryID int    `json:"categoryId"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.SetChannelCategory(payload.Channel, payload.CategoryID); err != nil {
		h.sendError(client, "failed to set channel category")
		return
	}

	h.broadcastChannelList()
}

// ── Scheduled message handlers ──────────────────────────────────────

func (h *Hub) handleScheduleSend(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		Channel string `json:"channel"`
		Content string `json:"content"`
		SendAt  int64  `json:"sendAt"` // unix ms
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	if payload.Content == "" || len(payload.Content) > maxMessageLength {
		h.sendError(client, "invalid message content")
		return
	}

	sendAt := time.UnixMilli(payload.SendAt)
	if sendAt.Before(time.Now()) {
		h.sendError(client, "scheduled time must be in the future")
		return
	}

	exists, _ := h.chat.ChannelExists(payload.Channel)
	if !exists {
		h.sendError(client, "channel does not exist")
		return
	}

	id, err := h.chat.AddScheduledMessage(payload.Channel, client.PublicKey, client.Nickname, payload.Content, sendAt)
	if err != nil {
		h.sendError(client, "failed to schedule message")
		return
	}

	// Return updated list
	h.sendScheduleList(client)

	_ = id // id used implicitly via the list refresh
}

func (h *Hub) handleScheduleList(client *Client) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}
	h.sendScheduleList(client)
}

func (h *Hub) handleScheduleDelete(client *Client, msg Message) {
	if client.PublicKey == "" {
		h.sendError(client, "not authenticated")
		return
	}

	var payload struct {
		ID int `json:"id"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		h.sendError(client, "invalid payload")
		return
	}

	// Verify ownership
	scheduled, err := h.chat.GetScheduledMessageById(payload.ID)
	if err != nil {
		h.sendError(client, "scheduled message not found")
		return
	}
	if scheduled.UserKey != client.PublicKey {
		h.sendError(client, "permission denied: not your scheduled message")
		return
	}

	if err := h.chat.DeleteScheduledMessage(payload.ID); err != nil {
		h.sendError(client, "failed to delete scheduled message")
		return
	}

	h.sendScheduleList(client)
}

func (h *Hub) sendScheduleList(client *Client) {
	msgs, err := h.chat.GetUserScheduledMessages(client.PublicKey)
	if err != nil {
		h.sendError(client, "failed to get scheduled messages")
		return
	}

	var list []map[string]interface{}
	for _, m := range msgs {
		list = append(list, map[string]interface{}{
			"id":            m.ID,
			"channel":       m.Channel,
			"content":       m.Content,
			"scheduledTime": m.SendAt.UnixMilli(),
			"createdAt":     m.CreatedAt.UnixMilli(),
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgScheduleList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"scheduledMessages": list}),
	})
}

func (h *Hub) processScheduledMessages() {
	pending, err := h.chat.GetPendingScheduledMessages()
	if err != nil || len(pending) == 0 {
		return
	}

	for _, sm := range pending {
		// Delete from DB first
		if err := h.chat.DeleteScheduledMessage(sm.ID); err != nil {
			log.Printf("Failed to delete scheduled message %d: %v", sm.ID, err)
			continue
		}

		// Save as a real message
		msgID := uuid.New().String()
		h.chat.SaveMessage(msgID, sm.Channel, sm.UserKey, sm.Nickname, sm.Content, "", "")

		// Look up role for the user
		role := h.permissions.GetRole(sm.UserKey)

		// Broadcast to channel
		chatMsg := Message{
			Type:      MsgChatMessage,
			ID:        msgID,
			Timestamp: time.Now().UnixMilli(),
			Payload: mustMarshal(map[string]interface{}{
				"channel":  sm.Channel,
				"userId":   sm.UserKey,
				"nickname": sm.Nickname,
				"content":  sm.Content,
				"role":     role,
			}),
		}
		h.broadcastToChannel(sm.Channel, chatMsg)
	}
}

