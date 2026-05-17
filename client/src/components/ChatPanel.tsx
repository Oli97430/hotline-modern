import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Send, Smile, Search, Upload, Loader, Pin, Bookmark, ArrowDown } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { EmojiPicker } from "./EmojiPicker";
import { MentionSuggestions } from "./MentionSuggestions";
import { FormatToolbar } from "./FormatToolbar";
import { ChatMessage, TypingUser } from "../hooks/useWebSocket";

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
  currentUserId: string;
  currentRole?: string;
  typingUsers: TypingUser[];
  dmMode?: { peerId: string; peerNick: string };
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
  onFileUpload?: (file: File) => void;
  canUpload?: boolean;
  users?: { userId: string; nickname: string; role: string; status: string }[];
  onPinsOpen?: () => void;
  onBookmarksOpen?: () => void;
  onBookmark?: (messageId: string) => void;
  isBookmarked?: (messageId: string) => boolean;
  onChannelSettings?: () => void;
  onImageClick?: (src: string) => void;
}

export function ChatPanel({ messages, activeChannel, channelTopic, currentUserId, currentRole, typingUsers, dmMode, onSendMessage, onSlashCommand, onTyping, onSearchOpen, onReact, onRemoveReact, onEdit, onDelete, onPin, onReply, replyTo, onCancelReply, onLoadHistory, historyLoading, hasMoreHistory, onFileUpload, canUpload, users, onPinsOpen, onBookmarksOpen, onBookmark, isBookmarked, onChannelSettings, onImageClick }: ChatPanelProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [mentionFilter, setMentionFilter] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingThrottleRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevScrollHeightRef = useRef(0);
  const isLoadingHistoryRef = useRef(false);
  const prevMsgCountRef = useRef(0);

  const channelMessages = messages.filter((m) => m.channel === activeChannel);

  // Scroll to top = load more history; track scroll position
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Check if user has scrolled up
    const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsScrolledUp(distFromBottom > 80);
    if (distFromBottom <= 80) setNewMsgCount(0);

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

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
    e.target.value = "";
  }, [onFileUpload]);

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

    if (text.startsWith("/") && onSlashCommand) {
      const parts = text.slice(1).split(/\s+/);
      onSlashCommand(parts[0], parts.slice(1));
    } else {
      onSendMessage(activeChannel, text);
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
      if (e.key === "ArrowDown") { e.preventDefault(); setMentionIndex((i) => i + 1); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); setMentionIndex((i) => Math.max(0, i - 1)); return; }
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const filtered = (users || []).filter((u) => u.nickname.toLowerCase().startsWith((mentionFilter || "").toLowerCase())).slice(0, 6);
        const idx = mentionIndex % Math.max(filtered.length, 1);
        if (filtered[idx]) handleMentionSelect(filtered[idx].nickname);
        return;
      }
      if (e.key === "Escape") { setMentionFilter(null); return; }
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

  const typingText = activeTyping.length > 0
    ? activeTyping.length === 1
      ? t("chat.typing", { name: activeTyping[0].nickname })
      : t("chat.typingMultiple", { count: activeTyping.length })
    : null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-channel-name" onClick={!dmMode ? onChannelSettings : undefined} style={!dmMode ? { cursor: "pointer" } : undefined}>
          {dmMode ? `@ ${dmMode.peerNick}` : `# ${activeChannel}`}
        </span>
        {!dmMode && channelTopic && <span className="chat-topic" onClick={onChannelSettings} style={{ cursor: "pointer" }}>{channelTopic}</span>}
        <div className="chat-header-actions">
          {onPinsOpen && (
            <button className="chat-header-btn" onClick={onPinsOpen} title={t("pins.title")}>
              <Pin size={15} />
            </button>
          )}
          {onBookmarksOpen && (
            <button className="chat-header-btn" onClick={onBookmarksOpen} title={t("bookmarks.title")}>
              <Bookmark size={15} />
            </button>
          )}
          {onSearchOpen && (
            <button className="chat-header-btn" onClick={onSearchOpen} title={t("search.title")}>
              <Search size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
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
            <div className="chat-empty-icon">💬</div>
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
          const isGrouped = prev !== undefined
            && prev.userId === msg.userId
            && (msg.timestamp - prev.timestamp) < 120000
            && !msg.replyTo;
          return (
            <MessageBubble
              key={msg.id}
              id={msg.id}
              nickname={msg.nickname}
              content={msg.content}
              role={msg.role}
              timestamp={msg.timestamp}
              isOwn={msg.userId === currentUserId}
              edited={msg.edited}
              reactions={msg.reactions}
              currentUserId={currentUserId}
              canModerate={canMod}
              onReact={onReact}
              onRemoveReact={onRemoveReact}
              onEdit={onEdit}
              onDelete={onDelete}
              onPin={onPin}
              onReply={onReply}
              onBookmark={onBookmark}
              isBookmarked={isBookmarked?.(msg.id)}
              replyContext={replyMsg ? { nickname: replyMsg.nickname, content: replyMsg.content } : undefined}
              isGrouped={isGrouped}
              onImageClick={onImageClick}
            />
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
        >
          <ArrowDown size={14} />
          {newMsgCount > 0 && <span className="scroll-badge">{newMsgCount}</span>}
        </button>
      )}

      {typingText && (
        <div className="chat-typing">
          <span className="typing-dots"><span /><span /><span /></span>
          {typingText}
        </div>
      )}

      {replyTo && (
        <div className="chat-reply-preview">
          <span className="reply-label">{t("chat.replyingTo")} <strong>{replyTo.nickname}</strong></span>
          <span className="reply-content">{replyTo.content.slice(0, 80)}</span>
          <button className="reply-cancel" onClick={onCancelReply} title="Cancel">
            <span>×</span>
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
          />
          <button className="emoji-btn" onClick={() => setShowEmoji((v) => !v)} title="Emoji">
            <Smile size={18} />
          </button>
          {showEmoji && (
            <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmoji(false)} />
          )}
        </div>
        <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()}>
          <Send size={18} />
        </button>
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
      `}</style>
    </div>
  );
}
