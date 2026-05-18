import { ArrowDown, Bookmark, Loader, Megaphone, Mic, Pin, Search, Send, Smile, Upload, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChatMessage, ServerCustomEmoji, TypingUser } from "../hooks/useWebSocket";
import { E2EIndicator } from "./E2EIndicator";
import { EmojiPicker } from "./EmojiPicker";
import { FormatToolbar } from "./FormatToolbar";
import { MentionSuggestions } from "./MentionSuggestions";
import { MessageBubble } from "./MessageBubble";
import { VoiceRecorder } from "./VoiceRecorder";

function formatDateSeparator(ts: number, t: (key: string) => string): string {
  const date = new Date(ts);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (today.getTime() - msgDay.getTime()) / 86400000;

  if (diff === 0) return t("chat.today");
  if (diff === 1) return t("chat.yesterday");
  return date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

interface ChatPanelProps {
  messages: ChatMessage[];
  activeChannel: string;
  channelTopic?: string;
  channelSlowmode?: number;
  currentUserId: string;
  currentRole?: string;
  typingUsers: TypingUser[];
  dmMode?: { peerId: string; peerNick: string; e2eEnabled: boolean; ownFingerprint?: string; peerFingerprint?: string };
  onSendMessage: (channel: string, content: string) => void;
  onSlashCommand?: (command: string, args: string[]) => void;
  onTyping?: () => void;
  onSearchOpen?: () => void;
  onReact?: (messageId: string, emoji: string) => void;
  onRemoveReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
  replyTo?: { id: string; nickname: string; content: string } | null;
  onCancelReply?: () => void;
  onLoadHistory?: (channel: string, beforeTimestamp: number) => void;
  historyLoading?: boolean;
  hasMoreHistory?: boolean;
  onFileUpload?: (file: File, msgType?: string) => void;
  canUpload?: boolean;
  users?: { userId: string; nickname: string; role: string; status: string }[];
  onPinsOpen?: () => void;
  onBookmarksOpen?: () => void;
  onBookmark?: (messageId: string) => void;
  isBookmarked?: (messageId: string) => boolean;
  onChannelSettings?: () => void;
  onImageClick?: (src: string) => void;
  lastReadMessageId?: string;
  pinnedMessageIds?: string[];
  onQuote?: (text: string, nickname: string) => void;
  quotedText?: string;
  onQuoteClear?: () => void;
  onThreadOpen?: (messageId: string) => void;
  onForward?: (messageId: string) => void;
  readReceipts?: Record<string, string[]>;
  onSendReadReceipt?: (channel: string, messageId: string) => void;
  customEmojis?: ServerCustomEmoji[];
  serverBaseUrl?: string;
  motd?: string;
  automodWarning?: string | null;
  onDismissAutomodWarning?: () => void;
}

export function ChatPanel({
  messages,
  activeChannel,
  channelTopic,
  channelSlowmode,
  currentUserId,
  currentRole,
  typingUsers,
  dmMode,
  onSendMessage,
  onSlashCommand,
  onTyping,
  onSearchOpen,
  onReact,
  onRemoveReact,
  onEdit,
  onDelete,
  onPin,
  onReply,
  replyTo,
  onCancelReply,
  onLoadHistory,
  historyLoading,
  hasMoreHistory,
  onFileUpload,
  canUpload,
  users,
  onPinsOpen,
  onBookmarksOpen,
  onBookmark,
  isBookmarked,
  onChannelSettings,
  onImageClick,
  lastReadMessageId,
  pinnedMessageIds,
  onQuote,
  quotedText,
  onQuoteClear,
  onThreadOpen,
  onForward,
  readReceipts,
  onSendReadReceipt,
  customEmojis,
  serverBaseUrl,
  motd,
  automodWarning,
  onDismissAutomodWarning,
}: ChatPanelProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [mentionFilter, setMentionFilter] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const [stickyDate, setStickyDate] = useState<string | null>(null);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingThrottleRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevScrollHeightRef = useRef(0);
  const isLoadingHistoryRef = useRef(false);
  const prevMsgCountRef = useRef(0);
  const lastSentReceiptRef = useRef<string>("");

  // --- MOTD dismiss tracking ---
  const motdHash = motd ? btoa(unescape(encodeURIComponent(motd))).slice(0, 16) : "";
  const [motdDismissed, setMotdDismissed] = useState<boolean>(() => {
    if (!motdHash) return true;
    try {
      return localStorage.getItem("hotline-motd-dismissed") === motdHash;
    } catch {
      return false;
    }
  });
  // Re-check when motd changes
  useEffect(() => {
    if (!motdHash) {
      setMotdDismissed(true);
      return;
    }
    try {
      setMotdDismissed(localStorage.getItem("hotline-motd-dismissed") === motdHash);
    } catch {
      setMotdDismissed(false);
    }
  }, [motdHash]);

  const handleDismissMotd = () => {
    setMotdDismissed(true);
    try {
      localStorage.setItem("hotline-motd-dismissed", motdHash);
    } catch { /* ignore */ }
  };

  // --- localStorage last-read tracking ---
  const lastReadStorageKey = `hotline-last-read-${activeChannel}`;
  const [localLastReadId, setLocalLastReadId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(lastReadStorageKey);
    } catch {
      return null;
    }
  });

  // Update local last-read when channel changes
  useEffect(() => {
    try {
      setLocalLastReadId(localStorage.getItem(lastReadStorageKey));
    } catch {
      setLocalLastReadId(null);
    }
  }, [lastReadStorageKey]);

  // Use prop-provided lastReadMessageId if available, otherwise fall back to localStorage
  const effectiveLastReadId = lastReadMessageId || localLastReadId;

  // Send read receipt when at bottom and new messages arrive or user scrolls down
  useEffect(() => {
    if (!onSendReadReceipt || dmMode || isScrolledUp) return;
    const chMsgs = messages.filter((m) => m.channel === activeChannel && !m.system && m.userId !== currentUserId);
    if (chMsgs.length === 0) return;
    const lastMsg = chMsgs[chMsgs.length - 1];
    if (lastMsg && lastMsg.id !== lastSentReceiptRef.current) {
      lastSentReceiptRef.current = lastMsg.id;
      onSendReadReceipt(activeChannel, lastMsg.id);
    }
  }, [messages, activeChannel, isScrolledUp, dmMode, currentUserId, onSendReadReceipt]);

  // Handle quoted text injection
  useEffect(() => {
    if (quotedText) {
      setInput(quotedText);
      onQuoteClear?.();
    }
  }, [quotedText, onQuoteClear]);

  const channelMessages = messages.filter((m) => m.channel === activeChannel || m.system);

  // Mark messages as read when panel is visible and scrolled to bottom
  useEffect(() => {
    if (isScrolledUp) return;
    const chMsgs = channelMessages.filter((m) => !m.system);
    if (chMsgs.length === 0) return;
    const lastMsg = chMsgs[chMsgs.length - 1];
    if (lastMsg && lastMsg.id !== localLastReadId) {
      setLocalLastReadId(lastMsg.id);
      try {
        localStorage.setItem(lastReadStorageKey, lastMsg.id);
      } catch { /* quota exceeded, ignore */ }
    }
  }, [channelMessages, isScrolledUp, lastReadStorageKey, localLastReadId]);

  // Also update last-read on window focus
  useEffect(() => {
    const handleFocus = () => {
      if (isScrolledUp) return;
      const chMsgs = channelMessages.filter((m) => !m.system);
      if (chMsgs.length === 0) return;
      const lastMsg = chMsgs[chMsgs.length - 1];
      if (lastMsg) {
        setLocalLastReadId(lastMsg.id);
        try {
          localStorage.setItem(lastReadStorageKey, lastMsg.id);
        } catch { /* quota exceeded, ignore */ }
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [channelMessages, isScrolledUp, lastReadStorageKey]);

  // Slowmode cooldown timer
  useEffect(() => {
    if (cooldownEnd <= Date.now()) {
      setCooldownLeft(0);
      return;
    }
    setCooldownLeft(Math.ceil((cooldownEnd - Date.now()) / 1000));
    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownLeft(0);
        clearInterval(interval);
      } else {
        setCooldownLeft(remaining);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  // Reset cooldown when channel changes
  useEffect(() => {
    setCooldownEnd(0);
    setCooldownLeft(0);
  }, [activeChannel]);

  // Scroll to top = load more history; track scroll position + sticky date
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Check if user has scrolled up
    const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsScrolledUp(distFromBottom > 80);
    if (distFromBottom <= 80) setNewMsgCount(0);

    // Sticky date header: find the topmost visible date separator
    const separators = container.querySelectorAll(".chat-date-separator");
    let activeDateStr: string | null = null;
    for (let i = separators.length - 1; i >= 0; i--) {
      const rect = separators[i].getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (rect.top <= containerRect.top + 10) {
        activeDateStr = separators[i].textContent || null;
        break;
      }
    }
    setStickyDate(distFromBottom > 80 ? activeDateStr : null);

    if (historyLoading || !hasMoreHistory || !onLoadHistory || isLoadingHistoryRef.current) return;
    if (container.scrollTop < 100 && channelMessages.length > 0) {
      isLoadingHistoryRef.current = true;
      prevScrollHeightRef.current = container.scrollHeight;
      onLoadHistory(activeChannel, channelMessages[0].timestamp);
    }
  }, [activeChannel, channelMessages, historyLoading, hasMoreHistory, onLoadHistory]);

  // Preserve scroll position after prepending history
  useEffect(() => {
    if (isLoadingHistoryRef.current && !historyLoading) {
      isLoadingHistoryRef.current = false;
      const container = messagesContainerRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeightRef.current;
      }
    }
  }, [historyLoading, channelMessages.length]);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileUpload) {
        onFileUpload(file);
      }
      e.target.value = "";
    },
    [onFileUpload],
  );

  const messagesWithDates = useMemo(() => {
    const result: (ChatMessage | { type: "separator"; date: string; key: string })[] = [];
    let lastDate = "";
    for (const msg of channelMessages) {
      const dayKey = new Date(msg.timestamp).toDateString();
      if (dayKey !== lastDate) {
        lastDate = dayKey;
        result.push({ type: "separator", date: formatDateSeparator(msg.timestamp, t), key: `sep-${dayKey}` });
      }
      result.push(msg);
    }
    return result;
  }, [channelMessages, t]);

  useEffect(() => {
    if (channelMessages.length > prevMsgCountRef.current) {
      if (!isScrolledUp) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setNewMsgCount((c) => c + (channelMessages.length - prevMsgCountRef.current));
      }
    }
    prevMsgCountRef.current = channelMessages.length;
  }, [channelMessages.length, isScrolledUp]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    if (cooldownLeft > 0) return;

    if (text.startsWith("/") && onSlashCommand) {
      const parts = text.slice(1).split(/\s+/);
      onSlashCommand(parts[0], parts.slice(1));
    } else {
      onSendMessage(activeChannel, text);
      // Start cooldown if slowmode is active
      if (channelSlowmode && channelSlowmode > 0) {
        setCooldownEnd(Date.now() + channelSlowmode * 1000);
      }
    }
    setInput("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Detect @mention
    const cursorPos = value.length; // simplified: use end of input
    const textBefore = value.slice(0, cursorPos);
    const atMatch = textBefore.match(/@(\w*)$/);
    if (atMatch && users && users.length > 0) {
      setMentionFilter(atMatch[1]);
      setMentionIndex(0);
    } else {
      setMentionFilter(null);
    }
  };

  const handleMentionSelect = (nickname: string) => {
    const regex = /@(\w*)$/;
    setInput((prev) => prev.replace(regex, `@${nickname} `));
    setMentionFilter(null);
  };

  const handleFormat = useCallback((wrapper: string, prefix?: string, suffix?: string) => {
    if (prefix && suffix) {
      setInput((prev) => prev + prefix + "text" + suffix);
    } else {
      setInput((prev) => prev + wrapper + "text" + wrapper);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle mention navigation
    if (mentionFilter !== null) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMentionIndex((i) => i + 1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMentionIndex((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const filtered = (users || [])
          .filter((u) => u.nickname.toLowerCase().startsWith((mentionFilter || "").toLowerCase()))
          .slice(0, 6);
        const idx = mentionIndex % Math.max(filtered.length, 1);
        if (filtered[idx]) handleMentionSelect(filtered[idx].nickname);
        return;
      }
      if (e.key === "Escape") {
        setMentionFilter(null);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      return;
    }
    if (onTyping && Date.now() - typingThrottleRef.current > 2000) {
      typingThrottleRef.current = Date.now();
      onTyping();
    }
  };

  const handleEmojiSelect = useCallback((emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
  }, []);

  const activeTyping = typingUsers.filter((t) => {
    if (dmMode) return t.targetId === currentUserId && t.userId === dmMode.peerId;
    return t.channel === activeChannel && t.userId !== currentUserId;
  });

  const typingText =
    activeTyping.length > 0
      ? activeTyping.length === 1
        ? t("chat.typing", { name: activeTyping[0].nickname })
        : t("chat.typingMultiple", { count: activeTyping.length })
      : null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span
          className="chat-channel-name"
          onClick={!dmMode ? onChannelSettings : undefined}
          style={!dmMode ? { cursor: "pointer" } : undefined}
        >
          {dmMode ? `@ ${dmMode.peerNick}` : `# ${activeChannel}`}
        </span>
        {!dmMode && channelTopic && (
          <span className="chat-topic" onClick={onChannelSettings} style={{ cursor: "pointer" }}>
            {channelTopic}
          </span>
        )}
        {!dmMode && channelSlowmode !== undefined && channelSlowmode > 0 && (
          <span className="chat-slowmode-badge">{t("slowmode.active", { seconds: channelSlowmode })}</span>
        )}
        {dmMode && (
          <div style={{ position: "relative", marginLeft: 8 }}>
            <E2EIndicator
              enabled={dmMode.e2eEnabled}
              ownFingerprint={dmMode.ownFingerprint}
              peerFingerprint={dmMode.peerFingerprint}
            />
          </div>
        )}
        <div className="chat-header-actions">
          {onPinsOpen && (
            <button
              className="chat-header-btn"
              onClick={onPinsOpen}
              title={t("pins.title")}
              aria-label={t("pins.title")}
            >
              <Pin size={15} />
            </button>
          )}
          {onBookmarksOpen && (
            <button
              className="chat-header-btn"
              onClick={onBookmarksOpen}
              title={t("bookmarks.title")}
              aria-label={t("bookmarks.title")}
            >
              <Bookmark size={15} />
            </button>
          )}
          {onSearchOpen && (
            <button
              className="chat-header-btn"
              onClick={onSearchOpen}
              title={t("search.title")}
              aria-label={t("search.title")}
            >
              <Search size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
        {motd && !motdDismissed && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", margin: "8px 12px", borderRadius: 8, background: "var(--accent, #7c5cbf)", color: "#fff", fontSize: 13 }}>
            <Megaphone size={16} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <strong style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.85 }}>{t("motd.announcement")}</strong>
              <span>{motd}</span>
            </div>
            <button type="button" onClick={handleDismissMotd} title={t("motd.dismiss")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4, borderRadius: 4, opacity: 0.7 }}>
              <X size={14} />
            </button>
          </div>
        )}
        {stickyDate && (
          <div className="chat-sticky-date">
            <span>{stickyDate}</span>
          </div>
        )}
        {historyLoading && (
          <div className="chat-history-loading">
            <Loader size={14} className="spinner" />
            <span>{t("chat.loadingHistory")}</span>
          </div>
        )}
        {!historyLoading && hasMoreHistory === false && channelMessages.length > 0 && (
          <div className="chat-history-end">{t("chat.historyStart")}</div>
        )}
        {channelMessages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">��</div>
            <span>{t("chat.noMessages")}</span>
          </div>
        )}
        {messagesWithDates.map((item) => {
          if ("type" in item && item.type === "separator") {
            return (
              <div key={item.key} className="chat-date-separator">
                <span>{item.date}</span>
              </div>
            );
          }
          const msg = item as ChatMessage;
          const canMod = currentRole === "admin" || currentRole === "operator";
          const replyMsg = msg.replyTo ? channelMessages.find((m) => m.id === msg.replyTo) : undefined;
          const msgIdx = channelMessages.indexOf(msg);
          const prev = msgIdx > 0 ? channelMessages[msgIdx - 1] : undefined;
          const isGrouped =
            prev !== undefined &&
            prev.userId === msg.userId &&
            msg.timestamp - prev.timestamp < 120000 &&
            !msg.replyTo &&
            !msg.system &&
            !prev.system;

          // Unread marker: show before first unread message
          const showUnreadMarker = effectiveLastReadId && prev?.id === effectiveLastReadId && msg.userId !== currentUserId;
          // Thread: check if message has replies
          const hasThread = msg.replyTo && onThreadOpen;

          return (
            <div key={msg.id}>
              {showUnreadMarker && (
                <div className="chat-unread-marker">
                  <span>{t("chat.newMessagesLabel")}</span>
                </div>
              )}
              <MessageBubble
                id={msg.id}
                userId={msg.userId}
                nickname={msg.nickname}
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
                isOwn={msg.userId === currentUserId}
                edited={msg.edited}
                reactions={msg.reactions}
                currentUserId={currentUserId}
                canModerate={canMod}
                system={msg.system}
                msgType={msg.msgType}
                onReact={onReact}
                onRemoveReact={onRemoveReact}
                onEdit={onEdit}
                onDelete={onDelete}
                onPin={onPin}
                onReply={onReply}
                onBookmark={onBookmark}
                isBookmarked={isBookmarked?.(msg.id)}
                isPinned={pinnedMessageIds?.includes(msg.id)}
                replyContext={replyMsg ? { nickname: replyMsg.nickname, content: replyMsg.content } : undefined}
                isGrouped={isGrouped}
                onImageClick={onImageClick}
                onQuote={onQuote}
                onThreadOpen={hasThread ? () => onThreadOpen!(msg.replyTo!) : undefined}
                onForward={onForward}
              />
              {msg.userId === currentUserId &&
                !msg.system &&
                readReceipts &&
                (() => {
                  const readers = (readReceipts[msg.id] || []).filter((uid) => uid !== currentUserId);
                  if (readers.length === 0) return null;
                  const names = readers
                    .map((uid) => users?.find((u) => u.userId === uid)?.nickname || uid.slice(0, 6))
                    .slice(0, 5);
                  const label =
                    readers.length <= 5
                      ? t("chat.seenBy", { names: names.join(", ") })
                      : t("chat.seenBy", { names: names.join(", ") + ` +${readers.length - 5}` });
                  return (
                    <div className="chat-read-receipt">
                      <span>{label}</span>
                    </div>
                  );
                })()}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {isScrolledUp && (
        <button
          className="scroll-to-bottom"
          onClick={() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            setIsScrolledUp(false);
            setNewMsgCount(0);
          }}
          title={t("chat.scrollToBottom")}
          aria-label={t("chat.scrollToBottom")}
        >
          <ArrowDown size={14} />
          {newMsgCount > 0 && <span className="scroll-badge">{newMsgCount}</span>}
        </button>
      )}

      {typingText && (
        <div className="chat-typing">
          <span className="typing-dots">
            <span />
            <span />
            <span />
          </span>
          {typingText}
        </div>
      )}

      {replyTo && (
        <div className="chat-reply-preview">
          <span className="reply-label">
            {t("chat.replyingTo")} <strong>{replyTo.nickname}</strong>
          </span>
          <span className="reply-content">{replyTo.content.slice(0, 80)}</span>
          <button className="reply-cancel" onClick={onCancelReply} title="Cancel">
            <span>×</span>
          </button>
        </div>
      )}

      {showVoiceRecorder && (
        <div className="chat-voice-area">
          <VoiceRecorder
            onSend={(blob, _duration) => {
              // Send as a voice message (msgType: "voice")
              const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
              onFileUpload?.(file, "voice");
              setShowVoiceRecorder(false);
            }}
            onCancel={() => setShowVoiceRecorder(false)}
          />
        </div>
      )}
      {automodWarning && (
        <div className="automod-warning-banner">
          <span>{t("automod.warningPrefix")}: {automodWarning}</span>
          <button className="automod-warning-dismiss" onClick={onDismissAutomodWarning}>
            <X size={14} />
          </button>
        </div>
      )}
      <FormatToolbar onFormat={handleFormat} />
      <div className="chat-input-area">
        {canUpload && onFileUpload && (
          <>
            <button className="chat-upload-btn" onClick={handleFileSelect} title={t("files.upload")}>
              <Upload size={18} />
            </button>
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileInputChange} />
          </>
        )}
        <div className="chat-input-wrapper">
          {mentionFilter !== null && users && (
            <MentionSuggestions
              users={users}
              filter={mentionFilter}
              onSelect={handleMentionSelect}
              selectedIndex={mentionIndex}
            />
          )}
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={dmMode ? t("chat.dmPlaceholder", { name: dmMode.peerNick }) : t("chat.placeholder")}
            rows={1}
            aria-label={dmMode ? t("chat.dmPlaceholder", { name: dmMode.peerNick }) : t("chat.placeholder")}
          />
          <button className="emoji-btn" onClick={() => setShowEmoji((v) => !v)} title="Emoji" aria-label="Emoji">
            <Smile size={18} />
          </button>
          {showEmoji && (
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmoji(false)}
              customEmojis={customEmojis}
              serverBaseUrl={serverBaseUrl}
            />
          )}
        </div>
        {cooldownLeft > 0 && (
          <span className="chat-cooldown-badge">{t("slowmode.wait", { seconds: cooldownLeft })}</span>
        )}
        {!input.trim() && canUpload ? (
          <button
            className="chat-mic-btn"
            onClick={() => setShowVoiceRecorder(true)}
            title={t("voice.record")}
            aria-label={t("voice.record")}
          >
            <Mic size={18} />
          </button>
        ) : (
          <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim() || cooldownLeft > 0} aria-label={t("chat.send")}>
            <Send size={18} />
          </button>
        )}
      </div>

      <style>{`
        .chat-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
          position: relative;
        }
        .chat-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .chat-header-btn {
          color: var(--text-muted);
          padding: 5px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .chat-header-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .chat-channel-name {
          font-size: 15px;
          font-weight: 600;
        }
        .chat-topic {
          font-size: 13px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
        }
        .chat-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          font-size: 14px;
          gap: 8px;
          animation: fadeIn 0.3s ease;
        }
        .chat-empty-icon {
          font-size: 40px;
          opacity: 0.4;
          margin-bottom: 4px;
        }
        .chat-typing {
          padding: 4px 16px;
          font-size: 12px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          animation: fadeIn 0.15s ease;
        }
        .typing-dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
        }
        .typing-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: typingBounce 1.4s ease-in-out infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-reply-preview {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--bg-tertiary);
          border-left: 3px solid var(--accent);
          font-size: 12px;
          color: var(--text-secondary);
          animation: fadeIn 0.1s ease;
        }
        .reply-label {
          white-space: nowrap;
        }
        .reply-content {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-muted);
        }
        .reply-cancel {
          color: var(--text-muted);
          font-size: 16px;
          padding: 2px 6px;
          line-height: 1;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .reply-cancel:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .chat-input-area {
          padding: 12px 16px;
          display: flex;
          gap: 8px;
        }
        .chat-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .chat-input {
          flex: 1;
          padding: 10px 38px 10px 14px;
          resize: none;
          min-height: 38px;
          max-height: 120px;
          overflow-y: auto;
          line-height: 1.4;
          font-family: inherit;
          font-size: inherit;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus {
          border-color: var(--accent);
        }
        .chat-input::placeholder {
          color: var(--text-muted);
        }
        .emoji-btn {
          position: absolute;
          right: 8px;
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .emoji-btn:hover {
          color: var(--accent);
        }
        .chat-send-btn {
          background: var(--accent);
          color: var(--bg-primary);
          padding: 8px 12px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .chat-send-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-date-separator {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin: 4px 0;
          gap: 12px;
        }
        .chat-date-separator::before,
        .chat-date-separator::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .chat-date-separator span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .chat-history-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .chat-history-loading .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .chat-history-end {
          text-align: center;
          padding: 16px 16px 8px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }
        .chat-history-end::before,
        .chat-history-end::after {
          content: "";
          width: 24px;
          height: 1px;
          background: var(--border);
        }
        .chat-voice-area {
          padding: 8px 16px 0;
        }
        .chat-mic-btn {
          padding: 8px 12px;
          color: var(--text-muted);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          transition: color var(--transition-normal), background var(--transition-fast), transform var(--transition-fast);
        }
        .chat-mic-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
          transform: translateY(-1px);
        }
        .chat-upload-btn {
          padding: 8px;
          color: var(--text-muted);
          border-radius: var(--radius);
          transition: color var(--transition-normal), transform var(--transition-fast);
        }
        .chat-upload-btn:hover {
          color: var(--accent);
          transform: translateY(-1px);
        }
        .chat-upload-btn:active {
          transform: translateY(0);
        }
        .scroll-to-bottom {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background var(--transition-fast), box-shadow var(--transition-fast);
          animation: fadeIn 0.15s ease;
          z-index: 10;
        }
        .scroll-to-bottom:hover {
          background: var(--bg-tertiary);
          box-shadow: var(--shadow-lg);
        }
        .scroll-badge {
          background: var(--accent);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }
        .chat-sticky-date {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          justify-content: center;
          padding: 6px 0;
          pointer-events: none;
        }
        .chat-sticky-date span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 3px 12px;
          box-shadow: var(--shadow-sm);
          animation: fadeIn 0.15s ease;
        }
        .chat-unread-marker {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          margin: 4px 0;
          gap: 12px;
        }
        .chat-unread-marker::before,
        .chat-unread-marker::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--danger);
          opacity: 0.5;
        }
        .chat-unread-marker span {
          font-size: 10px;
          font-weight: 700;
          color: var(--danger);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .chat-read-receipt {
          padding: 1px 16px 2px 56px;
          animation: fadeIn 0.15s ease;
        }
        .chat-read-receipt span {
          font-size: 11px;
          color: var(--text-muted);
          font-style: italic;
        }
        .chat-slowmode-badge {
          font-size: 11px;
          color: var(--warning, #e09f3e);
          background: rgba(224, 159, 62, 0.12);
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .chat-cooldown-badge {
          font-size: 11px;
          color: var(--warning, #e09f3e);
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          padding: 0 4px;
          animation: fadeIn 0.15s ease;
        }
        .automod-warning-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          margin: 0 16px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: #f59e0b;
          animation: fadeIn 0.15s ease;
        }
        .automod-warning-banner span { flex: 1; }
        .automod-warning-dismiss {
          color: #f59e0b;
          opacity: 0.7;
          padding: 2px;
          border-radius: var(--radius-sm);
          transition: opacity var(--transition-fast);
          cursor: pointer;
          background: none;
          border: none;
        }
        .automod-warning-dismiss:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
