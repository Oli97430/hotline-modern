import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Smile, Pencil, Trash2, Pin } from "lucide-react";
import { MessageReaction } from "../hooks/useWebSocket";

const IMAGE_REGEX = /\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi;

function formatMessage(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let key = 0;
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\b(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(<code key={key++} className="msg-code">{match[1].slice(1, -1)}</code>);
    } else if (match[2]) {
      parts.push(<strong key={key++}>{match[2].slice(2, -2)}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3].slice(1, -1)}</em>);
    } else if (match[5]) {
      parts.push(<a key={key++} className="msg-link" href={match[5]} target="_blank" rel="noopener noreferrer">{match[5]}</a>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function extractImages(text: string): string[] {
  const matches = text.match(IMAGE_REGEX);
  return matches ? [...new Set(matches)] : [];
}

interface MessageBubbleProps {
  id: string;
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
  isOwn: boolean;
  edited?: boolean;
  reactions?: MessageReaction[];
  currentUserId: string;
  canModerate?: boolean;
  onReact?: (messageId: string, emoji: string) => void;
  onRemoveReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
}

const QUICK_REACTIONS = ["\u{1F44D}", "\u{2764}\u{FE0F}", "\u{1F602}", "\u{1F44F}", "\u{1F525}", "\u{1F914}"];

export function MessageBubble({ id, nickname, content, role, timestamp, isOwn, edited, reactions, currentUserId, canModerate, onReact, onRemoveReact, onEdit, onDelete, onPin }: MessageBubbleProps) {
  const { t, i18n } = useTranslation();
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showReactPicker, setShowReactPicker] = useState(false);

  const time = new Intl.DateTimeFormat(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));

  const roleColor = `var(--role-${role})`;
  const formatted = useMemo(() => formatMessage(content), [content]);
  const images = useMemo(() => extractImages(content), [content]);

  const handleEditSubmit = () => {
    if (editContent.trim() && editContent !== content) {
      onEdit?.(id, editContent.trim());
    }
    setEditing(false);
  };

  const handleReactionClick = (emoji: string) => {
    const existing = reactions?.find((r) => r.emoji === emoji);
    if (existing?.users.includes(currentUserId)) {
      onRemoveReact?.(id, emoji);
    } else {
      onReact?.(id, emoji);
    }
    setShowReactPicker(false);
  };

  return (
    <div
      className={`message ${isOwn ? "own" : ""}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => { setShowActions(false); setShowReactPicker(false); }}
    >
      <div className="message-header">
        <span className="message-nick" style={{ color: roleColor }}>
          {nickname}
        </span>
        <span className="message-time">{time}</span>
        {edited && <span className="message-edited">{t("chat.edited")}</span>}
      </div>

      {editing ? (
        <div className="message-edit-area">
          <input
            className="message-edit-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleEditSubmit(); if (e.key === "Escape") setEditing(false); }}
            autoFocus
          />
          <button className="message-edit-save" onClick={handleEditSubmit}>OK</button>
          <button className="message-edit-cancel" onClick={() => setEditing(false)}>ESC</button>
        </div>
      ) : (
        <>
          <div className="message-content">{formatted}</div>
          {images.length > 0 && (
            <div className="message-images">
              {images.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt="" className="message-img-preview" loading="lazy" />
                </a>
              ))}
            </div>
          )}
        </>
      )}

      {reactions && reactions.length > 0 && (
        <div className="message-reactions">
          {reactions.map((r) => (
            <button
              key={r.emoji}
              className={`reaction-chip ${r.users.includes(currentUserId) ? "own" : ""}`}
              onClick={() => handleReactionClick(r.emoji)}
              title={r.users.length.toString()}
            >
              <span>{r.emoji}</span>
              <span className="reaction-count">{r.users.length}</span>
            </button>
          ))}
        </div>
      )}

      {showActions && !editing && (
        <div className="message-actions">
          <button onClick={() => setShowReactPicker((v) => !v)} title="React"><Smile size={14} /></button>
          {isOwn && <button onClick={() => { setEditing(true); setEditContent(content); }} title="Edit"><Pencil size={14} /></button>}
          {(isOwn || canModerate) && <button onClick={() => onDelete?.(id)} title="Delete"><Trash2 size={14} /></button>}
          {canModerate && <button onClick={() => onPin?.(id)} title="Pin"><Pin size={14} /></button>}
        </div>
      )}

      {showReactPicker && (
        <div className="message-react-picker">
          {QUICK_REACTIONS.map((e) => (
            <button key={e} onClick={() => handleReactionClick(e)}>{e}</button>
          ))}
        </div>
      )}

      <style>{`
        .message {
          padding: 4px 16px;
          transition: background 0.1s;
          animation: fadeIn 0.15s ease;
          position: relative;
        }
        .message:hover {
          background: var(--bg-secondary);
        }
        .message.own .message-nick {
          font-weight: 600;
        }
        .message-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }
        .message-nick {
          font-size: 13px;
          font-weight: 500;
        }
        .message-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .message-edited {
          font-size: 10px;
          color: var(--text-muted);
          font-style: italic;
        }
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.4;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .msg-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--bg-tertiary);
          padding: 1px 5px;
          border-radius: 4px;
          color: var(--accent);
        }
        .msg-link {
          color: var(--accent);
          text-decoration: none;
        }
        .msg-link:hover {
          text-decoration: underline;
        }
        .message-images {
          margin-top: 6px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .message-img-preview {
          max-width: 300px;
          max-height: 200px;
          border-radius: 8px;
          border: 1px solid var(--border);
          object-fit: cover;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .message-img-preview:hover {
          opacity: 0.9;
        }
        .message-reactions {
          display: flex;
          gap: 4px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .reaction-chip {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 13px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          transition: background 0.1s, border-color 0.1s;
          cursor: pointer;
        }
        .reaction-chip:hover {
          background: var(--bg-hover);
        }
        .reaction-chip.own {
          border-color: var(--accent);
          background: var(--accent-dim);
        }
        .reaction-count {
          font-size: 11px;
          color: var(--text-muted);
        }
        .message-actions {
          position: absolute;
          top: 0;
          right: 16px;
          display: flex;
          gap: 2px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          animation: fadeIn 0.1s ease;
        }
        .message-actions button {
          padding: 4px 6px;
          border-radius: 4px;
          color: var(--text-muted);
          transition: color 0.15s, background 0.15s;
        }
        .message-actions button:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .message-react-picker {
          position: absolute;
          top: -32px;
          right: 16px;
          display: flex;
          gap: 2px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          animation: fadeInScale 0.1s ease;
          z-index: 10;
        }
        .message-react-picker button {
          font-size: 18px;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.1s;
        }
        .message-react-picker button:hover {
          background: var(--bg-tertiary);
        }
        .message-edit-area {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-top: 2px;
        }
        .message-edit-input {
          flex: 1;
          padding: 6px 10px;
          font-size: 13px;
        }
        .message-edit-save, .message-edit-cancel {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }
        .message-edit-save:hover {
          background: var(--accent);
          color: var(--bg-primary);
        }
      `}</style>
    </div>
  );
}
