import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Send, Smile, Search } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { EmojiPicker } from "./EmojiPicker";
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
}

export function ChatPanel({ messages, activeChannel, channelTopic, currentUserId, currentRole, typingUsers, dmMode, onSendMessage, onSlashCommand, onTyping, onSearchOpen, onReact, onRemoveReact, onEdit, onDelete, onPin, onReply, replyTo, onCancelReply }: ChatPanelProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingThrottleRef = useRef(0);

  const channelMessages = messages.filter((m) => m.channel === activeChannel);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages.length]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        <span className="chat-channel-name">
          {dmMode ? `@ ${dmMode.peerNick}` : `# ${activeChannel}`}
        </span>
        {!dmMode && channelTopic && <span className="chat-topic">{channelTopic}</span>}
        {onSearchOpen && (
          <button className="chat-search-btn" onClick={onSearchOpen} title={t("search.title")}>
            <Search size={16} />
          </button>
        )}
      </div>

      <div className="chat-messages">
        {channelMessages.length === 0 && (
          <div className="chat-empty">{t("chat.noMessages")}</div>
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
              replyContext={replyMsg ? { nickname: replyMsg.nickname, content: replyMsg.content } : undefined}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {typingText && <div className="chat-typing">{typingText}</div>}

      {replyTo && (
        <div className="chat-reply-preview">
          <span className="reply-label">{t("chat.replyingTo")} <strong>{replyTo.nickname}</strong></span>
          <span className="reply-content">{replyTo.content.slice(0, 80)}</span>
          <button className="reply-cancel" onClick={onCancelReply}>&times;</button>
        </div>
      )}

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
        }
        .chat-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-search-btn {
          margin-left: auto;
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .chat-search-btn:hover {
          color: var(--accent);
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
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          font-size: 14px;
        }
        .chat-typing {
          padding: 2px 16px 0;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
          animation: fadeIn 0.15s ease;
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
          font-size: 18px;
          padding: 0 4px;
          line-height: 1;
        }
        .reply-cancel:hover {
          color: var(--danger);
        }
        .chat-input-area {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
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
          transition: background 0.2s;
        }
        .chat-send-btn:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-date-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          margin: 4px 0;
        }
        .chat-date-separator span {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-secondary);
          padding: 2px 10px;
          border-radius: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
      `}</style>
    </div>
  );
}
