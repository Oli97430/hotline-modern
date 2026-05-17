import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Smile, Pencil, Trash2, Pin, Reply } from "lucide-react";
import { MessageReaction } from "../hooks/useWebSocket";

const IMAGE_REGEX = /\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi;
const LINK_IN_BRACKETS = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function formatMessage(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let key = 0;
  const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\b(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      // [text](url) markdown link
      parts.push(<a key={key++} className="msg-link" href={match[3]} target="_blank" rel="noopener noreferrer">{match[2]}</a>);
    } else if (match[4]) {
      parts.push(<code key={key++} className="msg-code">{match[4].slice(1, -1)}</code>);
    } else if (match[5]) {
      parts.push(<strong key={key++}>{match[5].slice(2, -2)}</strong>);
    } else if (match[6]) {
      parts.push(<em key={key++}>{match[6].slice(1, -1)}</em>);
    } else if (match[8]) {
      parts.push(<a key={key++} className="msg-link" href={match[8]} target="_blank" rel="noopener noreferrer">{match[8]}</a>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function extractImages(text: string): string[] {
  // Don't extract images from markdown links [name](url)
  const cleaned = text.replace(LINK_IN_BRACKETS, "");
  const matches = cleaned.match(IMAGE_REGEX);
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
  onReply?: (messageId: string) => void;
  replyContext?: { nickname: string; content: string };
  isGrouped?: boolean;
}

const QUICK_REACTIONS = ["\u{1F44D}", "\u{2764}\u{FE0F}", "\u{1F602}", "\u{1F44F}", "\u{1F525}", "\u{1F914}"];

export function MessageBubble({ id, nickname, content, role, timestamp, isOwn, edited, reactions, currentUserId, canModerate, onReact, onRemoveReact, onEdit, onDelete, onPin, onReply, replyContext, isGrouped }: MessageBubbleProps) {
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
      className={`message ${isOwn ? "own" : ""} ${isGrouped ? "grouped" : ""}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => { setShowActions(false); setShowReactPicker(false); }}
    >
      {replyContext && (
        <div className="message-reply-context">
          <Reply size={10} className="reply-icon" />
          <span className="reply-context-nick">{replyContext.nickname}</span>
          <span className="reply-context-text">{replyContext.content.slice(0, 60)}</span>
        </div>
      )}

      {!isGrouped && (
        <div className="message-header">
          <span className="message-nick" style={{ color: roleColor }}>
            {nickname}
          </span>
          <span className="message-time">{time}</span>
          {edited && <span className="message-edited">{t("chat.edited")}</span>}
        </div>
      )}

      {isGrouped && showActions && (
        <span className="message-time-inline">{time}</span>
      )}

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
          <button onClick={() => onReply?.(id)} title="Reply"><Reply size={13} /></button>
          <button onClick={() => setShowReactPicker((v) => !v)} title="React"><Smile size={13} /></button>
          {isOwn && <button onClick={() => { setEditing(true); setEditContent(content); }} title="Edit"><Pencil size={13} /></button>}
          {(isOwn || canModerate) && <button className="action-danger" onClick={() => onDelete?.(id)} title="Delete"><Trash2 size={13} /></button>}
          {canModerate && <button onClick={() => onPin?.(id)} title="Pin"><Pin size={13} /></button>}
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
          padding: 6px 16px;
          transition: background var(--transition-fast);
          position: relative;
        }
        .message:not(.grouped) {
          padding-top: 10px;
        }
        .message.grouped {
          padding-top: 1px;
          padding-bottom: 1px;
        }
        .message:hover {
          background: var(--bg-secondary);
        }
        .message-reply-context {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 0 4px 12px;
          border-left: 2px solid var(--accent);
          margin-bottom: 3px;
          font-size: 12px;
        }
        .reply-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .reply-context-nick {
          font-weight: 600;
          color: var(--accent);
          flex-shrink: 0;
        }
        .reply-context-text {
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          font-weight: 600;
          letter-spacing: -0.1px;
        }
        .message-time {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 400;
          opacity: 0.8;
        }
        .message-time-inline {
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
          color: var(--text-muted);
          opacity: 0;
          pointer-events: none;
          font-variant-numeric: tabular-nums;
        }
        .message:hover .message-time-inline {
          opacity: 0.7;
        }
        .message-edited {
          font-size: 10px;
          color: var(--text-muted);
          font-style: italic;
        }
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .msg-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          color: var(--accent);
        }
        .msg-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 450;
        }
        .msg-link:hover {
          text-decoration: underline;
        }
        .message-images {
          margin-top: 8px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .message-img-preview {
          max-width: 320px;
          max-height: 220px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          object-fit: cover;
          cursor: pointer;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .message-img-preview:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow-md);
        }
        .message-reactions {
          display: flex;
          gap: 4px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .reaction-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 13px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .reaction-chip:hover {
          background: var(--bg-hover);
          transform: scale(1.05);
        }
        .reaction-chip.own {
          border-color: var(--accent);
          background: var(--accent-dim);
        }
        .reaction-count {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
        }
        .message-actions {
          position: absolute;
          top: -4px;
          right: 16px;
          display: flex;
          gap: 1px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 3px;
          box-shadow: var(--shadow-md);
          animation: fadeIn 0.08s ease;
          z-index: 5;
        }
        .message-actions button {
          padding: 5px 7px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .message-actions button:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .message-actions button.action-danger:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .message-react-picker {
          position: absolute;
          top: -36px;
          right: 16px;
          display: flex;
          gap: 2px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 4px 6px;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
          z-index: 10;
        }
        .message-react-picker button {
          font-size: 18px;
          padding: 4px 5px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .message-react-picker button:hover {
          background: var(--bg-tertiary);
          transform: scale(1.15);
        }
        .message-edit-area {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-top: 4px;
        }
        .message-edit-input {
          flex: 1;
          padding: 6px 10px;
          font-size: 13px;
        }
        .message-edit-save, .message-edit-cancel {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .message-edit-save:hover {
          background: var(--accent);
          color: #fff;
        }
        .message-edit-cancel:hover {
          background: var(--bg-hover);
        }
      `}</style>
    </div>
  );
}
