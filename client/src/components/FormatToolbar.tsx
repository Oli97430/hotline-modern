import { Bold, Code, Italic, Link, Strikethrough } from "lucide-react";

interface FormatToolbarProps {
  onFormat: (wrapper: string, prefix?: string, suffix?: string) => void;
}

export function FormatToolbar({ onFormat }: FormatToolbarProps) {
  return (
    <div className="format-toolbar">
      <div className="format-group">
        <button className="format-btn" onClick={() => onFormat("**")} title="Bold (Ctrl+B)">
          <Bold size={14} />
        </button>
        <button className="format-btn" onClick={() => onFormat("*")} title="Italic (Ctrl+I)">
          <Italic size={14} />
        </button>
        <button className="format-btn" onClick={() => onFormat("~~")} title="Strikethrough">
          <Strikethrough size={14} />
        </button>
      </div>
      <div className="format-sep" />
      <div className="format-group">
        <button className="format-btn" onClick={() => onFormat("`")} title="Code">
          <Code size={14} />
        </button>
        <button className="format-btn" onClick={() => onFormat("[", "[", "](url)")} title="Link">
          <Link size={14} />
        </button>
      </div>

      <style>{`
        .format-toolbar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 3px 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .format-group {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .format-sep {
          width: 1px;
          height: 14px;
          background: var(--border);
          margin: 0 4px;
          opacity: 0.6;
        }
        .format-btn {
          color: var(--text-muted);
          padding: 5px 7px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .format-btn:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .format-btn:active {
          color: var(--accent);
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
}
