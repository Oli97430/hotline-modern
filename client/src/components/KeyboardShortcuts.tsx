import { Keyboard, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface KeyboardShortcutsProps {
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: "Ctrl + K", action: "shortcuts.search" },
  { keys: "Ctrl + B", action: "shortcuts.bold" },
  { keys: "Ctrl + I", action: "shortcuts.italic" },
  { keys: "Escape", action: "shortcuts.close" },
  { keys: "Enter", action: "shortcuts.send" },
  { keys: "Shift + Enter", action: "shortcuts.newline" },
  { keys: "@ + name", action: "shortcuts.mention" },
  { keys: "?", action: "shortcuts.showHelp" },
];

export function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <Keyboard size={18} />
          <h3>{t("shortcuts.title")}</h3>
          <button className="shortcuts-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="shortcuts-list">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="shortcut-row">
              <span className="shortcut-action">{t(s.action)}</span>
              <span className="shortcut-key-group">
                {s.keys.split(" + ").map((k, i) => (
                  <span key={i}>
                    {i > 0 && <span className="shortcut-plus">+</span>}
                    <kbd className="shortcut-key">{k}</kbd>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .shortcuts-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 100%;
          max-width: 380px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .shortcuts-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--text-primary);
        }
        .shortcuts-header h3 {
          font-size: 16px;
          font-weight: 700;
          flex: 1;
        }
        .shortcuts-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }
        .shortcuts-close:hover {
          color: var(--text-primary);
        }
        .shortcuts-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .shortcut-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .shortcut-row:hover {
          background: var(--bg-tertiary);
        }
        .shortcut-action {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 450;
        }
        .shortcut-key-group {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }
        .shortcut-plus {
          font-size: 10px;
          color: var(--text-muted);
          padding: 0 2px;
        }
        .shortcut-key {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          padding: 3px 7px;
          border-radius: var(--radius-sm);
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}
