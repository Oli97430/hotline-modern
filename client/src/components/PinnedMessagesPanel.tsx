import { Pin, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { PinnedMessage } from "../hooks/useWebSocket";

interface PinnedMessagesPanelProps {
  messages: PinnedMessage[];
  onRequestPins: (channel: string) => void;
  onUnpin?: (messageId: string, channel: string) => void;
  onClose: () => void;
  activeChannel: string;
  canModerate: boolean;
}

export function PinnedMessagesPanel({
  messages,
  onRequestPins,
  onUnpin,
  onClose,
  activeChannel,
  canModerate,
}: PinnedMessagesPanelProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    onRequestPins(activeChannel);
  }, [activeChannel, onRequestPins]);

  const formatTime = (ts: number) =>
    new Intl.DateTimeFormat(i18n.language, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));

  return (
    <div className="pinned-panel">
      <div className="pinned-header">
        <Pin size={14} />
        <span>{t("pins.title")}</span>
        <span className="pinned-count">{messages.length}</span>
        <button type="button" className="pinned-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="pinned-list">
        {messages.length === 0 && (
          <div className="pinned-empty">
            <Pin size={20} className="pinned-empty-icon" />
            <span>{t("pins.empty")}</span>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="pinned-item">
            <div className="pinned-item-header">
              <span className="pinned-nick">{msg.nickname}</span>
              <span className="pinned-time">{formatTime(msg.timestamp)}</span>
              {canModerate && onUnpin && (
                <button type="button" className="pinned-unpin" onClick={() => onUnpin(msg.id, activeChannel)} title={t("pins.unpin")}>
                  <Trash2 size={12} />
                </button>
              )}
            </div>
            <div className="pinned-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <style>{`
        .pinned-panel {
          position: absolute;
          top: 48px;
          right: 16px;
          width: 320px;
          max-height: 400px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 60;
          display: flex;
          flex-direction: column;
          animation: fadeInScale 0.15s ease;
          overflow: hidden;
        }
        .pinned-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pinned-count {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 2px 7px;
          border-radius: 10px;
        }
        .pinned-close {
          margin-left: auto;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .pinned-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .pinned-list {
          overflow-y: auto;
          flex: 1;
          padding: 6px;
        }
        .pinned-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .pinned-empty-icon {
          opacity: 0.3;
        }
        .pinned-item {
          padding: 10px 12px;
          border-radius: var(--radius);
          transition: background var(--transition-fast);
          margin-bottom: 2px;
        }
        .pinned-item:hover {
          background: var(--bg-tertiary);
        }
        .pinned-item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .pinned-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pinned-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .pinned-unpin {
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .pinned-item:hover .pinned-unpin {
          opacity: 1;
        }
        .pinned-unpin:hover {
          color: var(--danger);
        }
        .pinned-content {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}
