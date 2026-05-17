import { useTranslation } from "react-i18next";
import { Bookmark, X, Trash2 } from "lucide-react";

export interface BookmarkedMessage {
  id: string;
  channel: string;
  nickname: string;
  content: string;
  timestamp: number;
}

const STORAGE_KEY = "hotline_bookmarks";

export function loadBookmarks(): BookmarkedMessage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks: BookmarkedMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function addBookmark(msg: BookmarkedMessage): BookmarkedMessage[] {
  const bookmarks = loadBookmarks();
  if (bookmarks.some((b) => b.id === msg.id)) return bookmarks;
  const updated = [msg, ...bookmarks];
  saveBookmarks(updated);
  return updated;
}

export function removeBookmark(messageId: string): BookmarkedMessage[] {
  const bookmarks = loadBookmarks().filter((b) => b.id !== messageId);
  saveBookmarks(bookmarks);
  return bookmarks;
}

export function isBookmarked(messageId: string): boolean {
  return loadBookmarks().some((b) => b.id === messageId);
}

interface BookmarksPanelProps {
  bookmarks: BookmarkedMessage[];
  onRemove: (messageId: string) => void;
  onClose: () => void;
}

export function BookmarksPanel({ bookmarks, onRemove, onClose }: BookmarksPanelProps) {
  const { t, i18n } = useTranslation();

  const formatTime = (ts: number) =>
    new Intl.DateTimeFormat(i18n.language, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));

  return (
    <div className="bookmarks-panel">
      <div className="bookmarks-header">
        <Bookmark size={14} />
        <span>{t("bookmarks.title")}</span>
        <span className="bookmarks-count">{bookmarks.length}</span>
        <button className="bookmarks-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="bookmarks-list">
        {bookmarks.length === 0 && (
          <div className="bookmarks-empty">
            <Bookmark size={20} className="bookmarks-empty-icon" />
            <span>{t("bookmarks.empty")}</span>
          </div>
        )}
        {bookmarks.map((bm) => (
          <div key={bm.id} className="bookmark-item">
            <div className="bookmark-item-header">
              <span className="bookmark-nick">{bm.nickname}</span>
              <span className="bookmark-channel">#{bm.channel}</span>
              <span className="bookmark-time">{formatTime(bm.timestamp)}</span>
              <button
                className="bookmark-remove"
                onClick={() => onRemove(bm.id)}
                title={t("bookmarks.remove")}
              >
                <Trash2 size={12} />
              </button>
            </div>
            <div className="bookmark-content">{bm.content}</div>
          </div>
        ))}
      </div>

      <style>{`
        .bookmarks-panel {
          position: absolute;
          top: 48px;
          right: 16px;
          width: 340px;
          max-height: 420px;
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
        .bookmarks-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .bookmarks-count {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 2px 7px;
          border-radius: 10px;
        }
        .bookmarks-close {
          margin-left: auto;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .bookmarks-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .bookmarks-list {
          overflow-y: auto;
          flex: 1;
          padding: 6px;
        }
        .bookmarks-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .bookmarks-empty-icon {
          opacity: 0.3;
        }
        .bookmark-item {
          padding: 10px 12px;
          border-radius: var(--radius);
          transition: background var(--transition-fast);
          margin-bottom: 2px;
        }
        .bookmark-item:hover {
          background: var(--bg-tertiary);
        }
        .bookmark-item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .bookmark-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .bookmark-channel {
          font-size: 10px;
          color: var(--accent);
          font-weight: 500;
        }
        .bookmark-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .bookmark-remove {
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .bookmark-item:hover .bookmark-remove {
          opacity: 1;
        }
        .bookmark-remove:hover {
          color: var(--danger);
        }
        .bookmark-content {
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
