import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatMessage } from "../hooks/useWebSocket";

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
  onSendMessage: (channel: string, content: string) => void;
  onSlashCommand?: (command: string, args: string[]) => void;
}

export function ChatPanel({ messages, activeChannel, channelTopic, currentUserId, onSendMessage, onSlashCommand }: ChatPanelProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span className="chat-channel-name"># {activeChannel}</span>
        {channelTopic && <span className="chat-topic">{channelTopic}</span>}
      </div>

      <div className="chat-messages">
        {channelMessages.length === 0 && (
          <div className="chat-empty">{t("chat.noMessages")}</div>
        )}
        {messagesWithDates.map((item) =>
          "type" in item && item.type === "separator" ? (
            <div key={item.key} className="chat-date-separator">
              <span>{item.date}</span>
            </div>
          ) : (
            <MessageBubble
              key={(item as ChatMessage).id}
              nickname={(item as ChatMessage).nickname}
              content={(item as ChatMessage).content}
              role={(item as ChatMessage).role}
              timestamp={(item as ChatMessage).timestamp}
              isOwn={(item as ChatMessage).userId === currentUserId}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("chat.placeholder")}
        />
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
        .chat-input-area {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 8px;
        }
        .chat-input {
          flex: 1;
          padding: 10px 14px;
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
