import { useTranslation } from "react-i18next";
import { X, MessageSquare } from "lucide-react";
import { ChatMessage } from "../hooks/useWebSocket";
import { MessageBubble } from "./MessageBubble";

interface ThreadPanelProps {
  rootMessage: ChatMessage;
  replies: ChatMessage[];
  currentUserId: string;
  currentRole?: string;
  onClose: () => void;
  onReact?: (messageId: string, emoji: string) => void;
  onRemoveReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onBookmark?: (messageId: string) => void;
  isBookmarked?: (messageId: string) => boolean;
  onImageClick?: (src: string) => void;
}

export function ThreadPanel({
  rootMessage,
  replies,
  currentUserId,
  currentRole,
  onClose,
  onReact,
  onRemoveReact,
  onEdit,
  onDelete,
  onBookmark,
  isBookmarked,
  onImageClick,
}: ThreadPanelProps) {
  const { t } = useTranslation();
  const canMod = currentRole === "admin" || currentRole === "operator";

  return (
    <div className="thread-panel">
      <div className="thread-panel-header">
        <MessageSquare size={15} />
        <span className="thread-panel-title">{t("thread.title")}</span>
        <span className="thread-panel-count">{replies.length} {replies.length === 1 ? t("thread.reply") : t("thread.replies")}</span>
        <button className="thread-panel-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="thread-panel-messages">
        {/* Root message */}
        <div className="thread-root">
          <MessageBubble
            id={rootMessage.id}
            userId={rootMessage.userId}
            nickname={rootMessage.nickname}
            content={rootMessage.content}
            role={rootMessage.role}
            timestamp={rootMessage.timestamp}
            isOwn={rootMessage.userId === currentUserId}
            edited={rootMessage.edited}
            reactions={rootMessage.reactions}
            currentUserId={currentUserId}
            canModerate={canMod}
            onReact={onReact}
            onRemoveReact={onRemoveReact}
            onEdit={onEdit}
            onDelete={onDelete}
            onBookmark={onBookmark}
            isBookmarked={isBookmarked?.(rootMessage.id)}
            onImageClick={onImageClick}
          />
        </div>

        {replies.length > 0 && (
          <div className="thread-separator">
            <span>{replies.length} {replies.length === 1 ? t("thread.reply") : t("thread.replies")}</span>
          </div>
        )}

        {/* Replies */}
        {replies.map((msg, i) => {
          const prev = i > 0 ? replies[i - 1] : undefined;
          const isGrouped = prev !== undefined
            && prev.userId === msg.userId
            && (msg.timestamp - prev.timestamp) < 120000;
          return (
            <MessageBubble
              key={msg.id}
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
              onReact={onReact}
              onRemoveReact={onRemoveReact}
              onEdit={onEdit}
              onDelete={onDelete}
              onBookmark={onBookmark}
              isBookmarked={isBookmarked?.(msg.id)}
              isGrouped={isGrouped}
              onImageClick={onImageClick}
            />
          );
        })}
      </div>

      <style>{`
        .thread-panel {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 360px;
          background: var(--bg-primary);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 40;
          animation: slideInRight 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .thread-panel-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          background: var(--bg-secondary);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .thread-panel-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .thread-panel-count {
          font-size: 11px;
          color: var(--text-muted);
          margin-left: auto;
          margin-right: 8px;
        }
        .thread-panel-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .thread-panel-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .thread-panel-messages {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }
        .thread-root {
          padding-bottom: 8px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
          margin: 4px 8px;
        }
        .thread-separator {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          gap: 12px;
        }
        .thread-separator::before,
        .thread-separator::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .thread-separator span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
