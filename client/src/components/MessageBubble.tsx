import { Bookmark, Pencil, Pin, Reply, Smile, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { MessageReaction } from "../hooks/useWebSocket";
import { CodeBlock } from "./CodeBlock";
import { LinkPreview } from "./LinkPreview";
import { MessageContextMenu } from "./MessageContextMenu";
import { isEmbeddableUrl, RichEmbed } from "./RichEmbed";
import { UserAvatar } from "./UserAvatar";
import { AudioMessage } from "./VoiceRecorder";

const IMAGE_REGEX = /\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi;
const LINK_IN_BRACKETS = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const CODE_BLOCK_REGEX = /```(\w*)\n([\s\S]*?)```/g;
const BARE_URL_REGEX = /\bhttps?:\/\/[^\s]+/g;

function formatMessage(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let key = 0;
  const regex =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(~~[^~]+~~)|(@\w+)|(\b(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      // [text](url) markdown link
      parts.push(
        <a key={key++} className="msg-link" href={match[3]} target="_blank" rel="noopener noreferrer">
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      parts.push(
        <code key={key++} className="msg-code">
          {match[4].slice(1, -1)}
        </code>,
      );
    } else if (match[5]) {
      parts.push(<strong key={key++}>{match[5].slice(2, -2)}</strong>);
    } else if (match[6]) {
      parts.push(<em key={key++}>{match[6].slice(1, -1)}</em>);
    } else if (match[7]) {
      // ~~strikethrough~~
      parts.push(<del key={key++}>{match[7].slice(2, -2)}</del>);
    } else if (match[8]) {
      // @mention
      parts.push(
        <span key={key++} className="msg-mention">
          {match[8]}
        </span>,
      );
    } else if (match[10]) {
      parts.push(
        <a key={key++} className="msg-link" href={match[10]} target="_blank" rel="noopener noreferrer">
          {match[10]}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function hasCodeBlock(text: string): boolean {
  return /```[\s\S]*?```/.test(text);
}

function extractCodeBlocks(text: string): { language: string; code: string }[] {
  const blocks: { language: string; code: string }[] = [];
  let match;
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ language: match[1] || "", code: match[2].trimEnd() });
  }
  return blocks;
}

function getTextWithoutCodeBlocks(text: string): string {
  return text.replace(CODE_BLOCK_REGEX, "").trim();
}

function extractImages(text: string): string[] {
  // Don't extract images from markdown links [name](url)
  const cleaned = text.replace(LINK_IN_BRACKETS, "").replace(CODE_BLOCK_REGEX, "");
  const matches = cleaned.match(IMAGE_REGEX);
  return matches ? [...new Set(matches)] : [];
}

function extractPreviewUrls(text: string): string[] {
  // Extract URLs that aren't images, aren't embeddable, and aren't in markdown links
  const cleaned = text.replace(LINK_IN_BRACKETS, "").replace(CODE_BLOCK_REGEX, "");
  const allUrls = cleaned.match(BARE_URL_REGEX) || [];
  const imageUrls = extractImages(text);
  return allUrls.filter((u) => !imageUrls.includes(u) && !isEmbeddableUrl(u)).slice(0, 3);
}

function extractEmbedUrls(text: string): string[] {
  const cleaned = text.replace(LINK_IN_BRACKETS, "").replace(CODE_BLOCK_REGEX, "");
  const allUrls = cleaned.match(BARE_URL_REGEX) || [];
  return allUrls.filter((u) => isEmbeddableUrl(u)).slice(0, 2);
}

/** Extract the URL from a markdown link like [filename](url) */
function extractUrlFromMarkdownLink(text: string): string | null {
  const match = text.trim().match(/^\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)$/);
  return match ? match[2] : null;
}

interface MessageBubbleProps {
  id: string;
  userId: string;
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
  isOwn: boolean;
  edited?: boolean;
  reactions?: MessageReaction[];
  currentUserId: string;
  canModerate?: boolean;
  system?: boolean;
  msgType?: string;
  onReact?: (messageId: string, emoji: string) => void;
  onRemoveReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
  onBookmark?: (messageId: string) => void;
  isBookmarked?: boolean;
  isPinned?: boolean;
  replyContext?: { nickname: string; content: string };
  isGrouped?: boolean;
  onImageClick?: (src: string) => void;
  onQuote?: (text: string, nickname: string) => void;
  onThreadOpen?: (messageId: string) => void;
  onForward?: (messageId: string) => void;
}

function formatRelativeTime(ts: number, t: (key: string, opts?: Record<string, unknown>) => string): string {
  const diff = Math.max(0, Date.now() - ts);
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return t("chat.justNow");
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return t("chat.minutesAgo", { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("chat.hoursAgo", { count: hours });
  // Beyond 24h, fall back to the locale date
  return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const QUICK_REACTIONS = ["\u{1F44D}", "\u{2764}\u{FE0F}", "\u{1F602}", "\u{1F44F}", "\u{1F525}", "\u{1F914}"];

export function MessageBubble({
  id,
  userId,
  nickname,
  content,
  role,
  timestamp,
  isOwn,
  edited,
  reactions,
  currentUserId,
  canModerate,
  system,
  msgType,
  onReact,
  onRemoveReact,
  onEdit,
  onDelete,
  onPin,
  onReply,
  onBookmark,
  isBookmarked,
  isPinned,
  replyContext,
  isGrouped,
  onImageClick,
  onQuote,
  onThreadOpen,
  onForward,
}: MessageBubbleProps) {
  const { t, i18n } = useTranslation();

  if (system) {
    const systemText =
      content === "joined" ? t("system.userJoined", { name: nickname }) : t("system.userLeft", { name: nickname });
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4px 16px" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", opacity: 0.7 }}>
          {systemText}
        </span>
      </div>
    );
  }
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showReactPicker, setShowReactPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [, setTick] = useState(0);

  // Re-render every 30s so relative timestamps stay fresh
  useEffect(() => {
    const age = Date.now() - timestamp;
    if (age > 86400000) return; // older than 1 day, no need to tick
    const id = window.setInterval(() => setTick((n) => n + 1), 30000);
    return () => window.clearInterval(id);
  }, [timestamp]);

  const msgDate = new Date(timestamp);
  const relTime = formatRelativeTime(timestamp, t);

  const fullTime = new Intl.DateTimeFormat(i18n.language, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(msgDate);

  const roleColor = `var(--role-${role})`;
  const codeBlocks = useMemo(() => extractCodeBlocks(content), [content]);
  const textContent = useMemo(() => (hasCodeBlock(content) ? getTextWithoutCodeBlocks(content) : content), [content]);
  const images = useMemo(() => extractImages(content), [content]);
  const previewUrls = useMemo(() => extractPreviewUrls(content), [content]);
  const embedUrls = useMemo(() => extractEmbedUrls(content), [content]);

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={`message ${isOwn ? "own" : ""} ${isGrouped ? "grouped" : ""}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactPicker(false);
      }}
      onContextMenu={handleContextMenu}
    >
      {replyContext && (
        <div
          className="message-reply-context"
          onClick={() => onThreadOpen?.(id)}
          style={onThreadOpen ? { cursor: "pointer" } : undefined}
        >
          <Reply size={10} className="reply-icon" />
          <span className="reply-context-nick">{replyContext.nickname}</span>
          <span className="reply-context-text">{replyContext.content.slice(0, 60)}</span>
        </div>
      )}

      {!isGrouped && (
        <div className="message-header">
          <UserAvatar userId={userId} nickname={nickname} size={28} />
          <span className="message-nick" style={{ color: roleColor }}>
            {nickname}
          </span>
          <span className="message-time" title={fullTime}>
            {relTime}
          </span>
          {edited && <span className="message-edited">{t("chat.edited")}</span>}
          {isPinned && <Pin size={11} className="message-pin-badge" />}
        </div>
      )}

      {isGrouped && showActions && (
        <span className="message-time-inline" title={fullTime}>
          {relTime}
        </span>
      )}

      {editing ? (
        <div className="message-edit-area">
          <input
            className="message-edit-input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
              if (e.key === "Escape") setEditing(false);
            }}
            autoFocus
          />
          <button className="message-edit-save" onClick={handleEditSubmit}>
            OK
          </button>
          <button className="message-edit-cancel" onClick={() => setEditing(false)}>
            ESC
          </button>
        </div>
      ) : msgType === "voice" ? (
        <>
          {(() => {
            const voiceUrl = extractUrlFromMarkdownLink(content);
            return voiceUrl ? (
              <AudioMessage src={voiceUrl} />
            ) : (
              <div className="message-content">{formatMessage(content)}</div>
            );
          })()}
        </>
      ) : (
        <>
          {textContent && (
            <div className="message-content">
              {textContent.split("\n").map((line, i) => {
                if (line.startsWith("> ")) {
                  return (
                    <div key={i} className="msg-blockquote">
                      {formatMessage(line.slice(2))}
                    </div>
                  );
                }
                return (
                  <span key={i}>
                    {i > 0 && "\n"}
                    {formatMessage(line)}
                  </span>
                );
              })}
            </div>
          )}
          {codeBlocks.map((block, i) => (
            <CodeBlock key={`cb-${i}`} code={block.code} language={block.language} />
          ))}
          {images.length > 0 && (
            <div className="message-images">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="message-img-preview"
                  loading="lazy"
                  onClick={() => (onImageClick ? onImageClick(url) : window.open(url, "_blank"))}
                />
              ))}
            </div>
          )}
          {embedUrls.length > 0 && (
            <div className="message-embeds">
              {embedUrls.map((url, i) => (
                <RichEmbed key={`embed-${i}`} url={url} />
              ))}
            </div>
          )}
          {previewUrls.length > 0 && (
            <div className="message-link-previews">
              {previewUrls.map((url, i) => (
                <LinkPreview key={`lp-${i}`} url={url} />
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
          <button onClick={() => onReply?.(id)} title="Reply">
            <Reply size={13} />
          </button>
          <button onClick={() => setShowReactPicker((v) => !v)} title="React">
            <Smile size={13} />
          </button>
          {onBookmark && (
            <button className={isBookmarked ? "action-bookmarked" : ""} onClick={() => onBookmark(id)} title="Bookmark">
              <Bookmark size={13} />
            </button>
          )}
          {isOwn && (
            <button
              onClick={() => {
                setEditing(true);
                setEditContent(content);
              }}
              title="Edit"
            >
              <Pencil size={13} />
            </button>
          )}
          {(isOwn || canModerate) && (
            <button className="action-danger" onClick={() => onDelete?.(id)} title="Delete">
              <Trash2 size={13} />
            </button>
          )}
          {canModerate && (
            <button onClick={() => onPin?.(id)} title="Pin">
              <Pin size={13} />
            </button>
          )}
        </div>
      )}

      {showReactPicker && (
        <div className="message-react-picker">
          {QUICK_REACTIONS.map((e) => (
            <button key={e} onClick={() => handleReactionClick(e)}>
              {e}
            </button>
          ))}
        </div>
      )}

      {contextMenu && (
        <MessageContextMenu
          position={contextMenu}
          messageId={id}
          content={content}
          isOwn={isOwn}
          canModerate={canModerate || false}
          isBookmarked={isBookmarked}
          onClose={() => setContextMenu(null)}
          onReply={onReply}
          onReact={() => {
            setShowReactPicker(true);
            setContextMenu(null);
          }}
          onEdit={
            isOwn
              ? () => {
                  setEditing(true);
                  setEditContent(content);
                  setContextMenu(null);
                }
              : undefined
          }
          onDelete={onDelete}
          onPin={onPin}
          onBookmark={onBookmark}
          onCopyText={() => {
            navigator.clipboard.writeText(content);
            setContextMenu(null);
          }}
          onQuote={() => {
            onQuote?.(content, nickname);
            setContextMenu(null);
          }}
          onForward={onForward}
        />
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
        .message-pin-badge {
          color: var(--accent);
          opacity: 0.6;
          flex-shrink: 0;
        }
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .msg-blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 10px;
          margin: 4px 0;
          color: var(--text-secondary);
          font-style: italic;
          font-size: 13px;
        }
        .message-embeds {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rich-embed {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--danger);
          border-radius: var(--radius);
          text-decoration: none;
          max-width: 360px;
          transition: background var(--transition-fast), transform var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .rich-embed:hover {
          background: var(--bg-hover);
          transform: translateX(2px);
        }
        .rich-embed-youtube { border-left-color: #ff0000; }
        .rich-embed-twitter { border-left-color: #1d9bf0; }
        .rich-embed-thumb {
          position: relative;
          width: 80px;
          height: 45px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
        }
        .rich-embed-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rich-embed-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: background var(--transition-fast);
        }
        .rich-embed:hover .rich-embed-play {
          background: rgba(0,0,0,0.5);
        }
        .rich-embed-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rich-embed-source {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .rich-embed-id {
          font-size: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .rich-embed-twitter-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-primary);
        }
        .rich-embed-ext {
          flex-shrink: 0;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .rich-embed:hover .rich-embed-ext {
          opacity: 1;
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
        .msg-mention {
          color: var(--accent);
          background: var(--accent-dim);
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 500;
          cursor: pointer;
        }
        .msg-mention:hover {
          background: rgba(var(--accent-rgb), 0.15);
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
        .message-actions button.action-bookmarked {
          color: var(--accent);
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
