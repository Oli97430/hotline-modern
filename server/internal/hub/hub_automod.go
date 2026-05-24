package hub

import (
	"encoding/json"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/google/uuid"
	"github.com/hotline-modern/server/internal/db"
	"github.com/hotline-modern/server/internal/permissions"
)

type spamEntry struct {
	Content string
	Time    int64
}

var linkPattern = regexp.MustCompile(`(?i)(https?://|www\.)`)

func (h *Hub) handleAutomodRuleAdd(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		RuleType string `json:"ruleType"`
		Pattern  string `json:"pattern"`
		Action   string `json:"action"`
		Reason   string `json:"reason"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	switch payload.RuleType {
	case "word", "regex", "spam", "caps", "links":
	default:
		h.sendError(client, "invalid rule type")
		return
	}

	switch payload.Action {
	case "warn", "block", "mute":
	default:
		h.sendError(client, "invalid action")
		return
	}

	if payload.Pattern == "" && payload.RuleType != "spam" && payload.RuleType != "caps" && payload.RuleType != "links" {
		h.sendError(client, "pattern required")
		return
	}

	if payload.RuleType == "regex" {
		if _, err := regexp.Compile(payload.Pattern); err != nil {
			h.sendError(client, "invalid regex: "+err.Error())
			return
		}
	}

	rule := db.AutomodRule{
		RuleType:  payload.RuleType,
		Pattern:   payload.Pattern,
		Action:    payload.Action,
		Reason:    payload.Reason,
		CreatedBy: client.PublicKey,
		Enabled:   true,
	}

	if err := h.chat.AddAutomodRule(rule); err != nil {
		h.sendError(client, "failed to add rule")
		return
	}

	h.mu.Lock()
	h.refreshAutomodRules()
	h.mu.Unlock()

	h.sendAutomodRuleList(client)
}

func (h *Hub) handleAutomodRuleList(client *Client) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}
	h.sendAutomodRuleList(client)
}

func (h *Hub) handleAutomodRuleDelete(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		ID int `json:"id"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.DeleteAutomodRule(payload.ID); err != nil {
		h.sendError(client, "failed to delete rule")
		return
	}

	h.mu.Lock()
	h.refreshAutomodRules()
	h.mu.Unlock()

	h.sendAutomodRuleList(client)
}

func (h *Hub) handleAutomodRuleToggle(client *Client, msg Message) {
	if client.Role != permissions.RoleAdmin && client.Role != permissions.RoleOperator {
		h.sendError(client, "permission denied")
		return
	}

	var payload struct {
		ID      int  `json:"id"`
		Enabled bool `json:"enabled"`
	}
	if err := json.Unmarshal(msg.Payload, &payload); err != nil {
		return
	}

	if err := h.chat.UpdateAutomodRule(payload.ID, payload.Enabled); err != nil {
		h.sendError(client, "failed to toggle rule")
		return
	}

	h.mu.Lock()
	h.refreshAutomodRules()
	h.mu.Unlock()

	h.sendAutomodRuleList(client)
}

func (h *Hub) sendAutomodRuleList(client *Client) {
	h.mu.RLock()
	rules := h.automodRules
	h.mu.RUnlock()

	var list []map[string]interface{}
	for _, r := range rules {
		list = append(list, map[string]interface{}{
			"id":        r.ID,
			"ruleType":  r.RuleType,
			"pattern":   r.Pattern,
			"action":    r.Action,
			"reason":    r.Reason,
			"enabled":   r.Enabled,
			"createdBy": r.CreatedBy,
			"createdAt": r.CreatedAt,
		})
	}

	h.sendToClient(client, Message{
		Type:      MsgAutomodRuleList,
		ID:        uuid.New().String(),
		Timestamp: time.Now().UnixMilli(),
		Payload:   mustMarshal(map[string]interface{}{"rules": list}),
	})
}

func (h *Hub) refreshAutomodRules() {
	if rules, err := h.chat.GetAutomodRules(); err == nil {
		h.automodRules = rules
		// Rebuild regex cache: keep only patterns still referenced by active rules
		activePatterns := make(map[string]bool)
		for _, r := range rules {
			if r.RuleType == "regex" {
				activePatterns[r.Pattern] = true
			}
		}
		for pattern := range h.regexCache {
			if !activePatterns[pattern] {
				delete(h.regexCache, pattern)
			}
		}
	}
}

func (h *Hub) runAutomodChecks(client *Client, content string) bool {
	h.mu.RLock()
	rules := h.automodRules
	h.mu.RUnlock()

	contentLower := strings.ToLower(content)

	for _, rule := range rules {
		if !rule.Enabled {
			continue
		}

		matched := false
		switch rule.RuleType {
		case "word":
			matched = strings.Contains(contentLower, strings.ToLower(rule.Pattern))
		case "regex":
			re := h.getCompiledRegex(rule.Pattern)
			if re != nil {
				matched = re.MatchString(content)
			}
		case "spam":
			matched = h.checkSpam(client.PublicKey, content)
		case "caps":
			matched = h.checkCaps(content)
		case "links":
			matched = h.checkLinks(contentLower)
		}

		if !matched {
			continue
		}

		reason := rule.Reason
		if reason == "" {
			reason = "Message blocked by auto-moderation (" + rule.RuleType + ")"
		}

		switch rule.Action {
		case "warn":
			h.sendToClient(client, Message{
				Type:      MsgAutomodWarning,
				ID:        uuid.New().String(),
				Timestamp: time.Now().UnixMilli(),
				Payload:   mustMarshal(map[string]interface{}{"reason": reason}),
			})
			return false
		case "block":
			h.sendToClient(client, Message{
				Type:      MsgAutomodWarning,
				ID:        uuid.New().String(),
				Timestamp: time.Now().UnixMilli(),
				Payload:   mustMarshal(map[string]interface{}{"reason": reason}),
			})
			return true
		case "mute":
			expires := time.Now().Add(5 * time.Minute)
			h.chat.AddMute(client.PublicKey, "automod", reason, &expires)
			h.sendToClient(client, Message{
				Type:      MsgAutomodWarning,
				ID:        uuid.New().String(),
				Timestamp: time.Now().UnixMilli(),
				Payload:   mustMarshal(map[string]interface{}{"reason": reason + " (muted for 5 minutes)"}),
			})
			return true
		}
	}

	h.mu.Lock()
	now := time.Now().Unix()
	h.spamTracker[client.PublicKey] = append(h.spamTracker[client.PublicKey], spamEntry{
		Content: content,
		Time:    now,
	})
	cutoff := now - 30
	entries := h.spamTracker[client.PublicKey]
	start := 0
	for start < len(entries) && entries[start].Time < cutoff {
		start++
	}
	h.spamTracker[client.PublicKey] = entries[start:]
	h.mu.Unlock()

	return false
}

func (h *Hub) getCompiledRegex(pattern string) *regexp.Regexp {
	h.mu.RLock()
	re, ok := h.regexCache[pattern]
	h.mu.RUnlock()
	if ok {
		return re
	}
	compiled, err := regexp.Compile(pattern)
	if err != nil {
		return nil
	}
	h.mu.Lock()
	h.regexCache[pattern] = compiled
	h.mu.Unlock()
	return compiled
}

func (h *Hub) checkSpam(publicKey, content string) bool {
	h.mu.RLock()
	entries := h.spamTracker[publicKey]
	h.mu.RUnlock()

	now := time.Now().Unix()
	cutoff := now - 30
	count := 0
	for _, e := range entries {
		if e.Time >= cutoff && e.Content == content {
			count++
		}
	}
	return count >= 3
}

func (h *Hub) checkCaps(content string) bool {
	if len(content) <= 10 {
		return false
	}
	upper := 0
	total := 0
	for _, r := range content {
		if unicode.IsLetter(r) {
			total++
			if unicode.IsUpper(r) {
				upper++
			}
		}
	}
	if total == 0 {
		return false
	}
	return float64(upper)/float64(total) > 0.7
}

func (h *Hub) checkLinks(contentLower string) bool {
	return linkPattern.MatchString(contentLower)
}
