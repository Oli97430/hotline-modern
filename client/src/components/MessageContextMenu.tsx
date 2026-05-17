import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Reply, Smile, Pin, Pencil, Trash2, Bookmark, Quote } from "lucide-react";

interface MessageContextMenuProps {
  position: { x: number; y: number };
  messageId: string;
  content: string;
  isOwn: boolean;
  canModerate: boolean;
  isBookmarked?: boolean;
  onClose: () => void;
  onReply?: (messageId: string) => void;
  onReact?: () => void;
  onEdit?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onBookmark?: (messageId: string) => void;
  onCopyText?: () => void;
  onQuote?: () => void;
}

export function MessageContextMenu({
  position,
  messageId,
  content,
  isOwn,
  canModerate,
  isBookmarked,
  onClose,
  onReply,
  onReact,
  onEdit,
  onDelete,
  onPin,
  onBookmark,
  onCopyText,
  onQuote,
}: MessageContextMenuProps) {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [onClose]);

  // Adjust position so menu stays within viewport
  const style: React.CSSProperties = {
    position: "fixed",
    left: position.x,
    top: position.y,
    zIndex: 300,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    onClose();
  };

  const handleQuote = () => {
    onQuote?.();
    onClose();
  };

  return (
    <div className="ctx-menu" ref={menuRef} style={style}>
      <button className="ctx-item" onClick={() => { onReply?.(messageId); onClose(); }}>
        <Reply size={14} />
        <span>{t("ctx.reply")}</span>
      </button>
      <button className="ctx-item" onClick={() => { onReact?.(); onClose(); }}>
        <Smile size={14} />
        <span>{t("ctx.react")}</span>
      </button>
      <button className="ctx-item" onClick={handleCopy}>
        <Copy size={14} />
        <span>{t("ctx.copy")}</span>
      </button>
      <button className="ctx-item" onClick={handleQuote}>
        <Quote size={14} />
        <span>{t("ctx.quote")}</span>
      </button>
      {onBookmark && (
        <button className={`ctx-item ${isBookmarked ? "active" : ""}`} onClick={() => { onBookmark(messageId); onClose(); }}>
          <Bookmark size={14} />
          <span>{isBookmarked ? t("bookmarks.remove") : t("ctx.bookmark")}</span>
        </button>
      )}
      {isOwn && onEdit && (
        <>
          <div className="ctx-sep" />
          <button className="ctx-item" onClick={() => { onEdit(messageId); onClose(); }}>
            <Pencil size={14} />
            <span>{t("ctx.edit")}</span>
          </button>
        </>
      )}
      {canModerate && onPin && (
        <button className="ctx-item" onClick={() => { onPin(messageId); onClose(); }}>
          <Pin size={14} />
          <span>{t("ctx.pin")}</span>
        </button>
      )}
      {(isOwn || canModerate) && onDelete && (
        <button className="ctx-item danger" onClick={() => { onDelete(messageId); onClose(); }}>
          <Trash2 size={14} />
          <span>{t("ctx.delete")}</span>
        </button>
      )}

      <style>{`
        .ctx-menu {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 4px;
          min-width: 180px;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
        }
        .ctx-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          width: 100%;
          text-align: left;
          font-size: 13px;
          font-weight: 450;
          color: var(--text-primary);
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast), padding-left var(--transition-fast);
        }
        .ctx-item:hover {
          background: var(--bg-tertiary);
          padding-left: 14px;
        }
        .ctx-item.active {
          color: var(--accent);
        }
        .ctx-item.danger {
          color: var(--danger);
        }
        .ctx-item.danger:hover {
          background: var(--danger-dim);
        }
        .ctx-sep {
          height: 1px;
          background: var(--border);
          margin: 4px 8px;
        }
      `}</style>
    </div>
  );
}
