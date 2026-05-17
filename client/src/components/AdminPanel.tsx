import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Settings, Shield, X, UserX, Save, Check } from "lucide-react";

interface AdminPanelProps {
  serverName: string;
  motd: string;
  onUpdateSettings: (serverName: string, motd: string) => void;
  onRequestBanList: () => void;
  onUnban: (publicKey: string) => void;
  onClose: () => void;
}

export function AdminPanel({ serverName, motd, onUpdateSettings, onRequestBanList, onUnban: _onUnban, onClose }: AdminPanelProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"settings" | "bans">("settings");
  const [name, setName] = useState(serverName);
  const [motdValue, setMotdValue] = useState(motd);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    onRequestBanList();
  }, []);

  const handleSave = () => {
    onUpdateSettings(name.trim(), motdValue.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <Shield size={18} />
          <h3>{t("admin.title")}</h3>
          <button className="admin-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === "settings" ? "active" : ""}`}
            onClick={() => setTab("settings")}
          >
            <Settings size={14} />
            {t("admin.settings")}
          </button>
          <button
            className={`admin-tab ${tab === "bans" ? "active" : ""}`}
            onClick={() => setTab("bans")}
          >
            <UserX size={14} />
            {t("admin.bans")}
          </button>
        </div>

        {tab === "settings" && (
          <div className="admin-content">
            <div className="admin-field">
              <label>{t("admin.serverName")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={64}
              />
            </div>
            <div className="admin-field">
              <label>{t("admin.motd")}</label>
              <textarea
                value={motdValue}
                onChange={(e) => setMotdValue(e.target.value)}
                rows={4}
                maxLength={512}
              />
            </div>
            <button className={`admin-save ${saved ? "saved" : ""}`} onClick={handleSave}>
              {saved ? <Check size={14} /> : <Save size={14} />}
              {saved ? t("admin.saved") : t("admin.save")}
            </button>
          </div>
        )}

        {tab === "bans" && (
          <div className="admin-content">
            <p className="admin-ban-info">{t("admin.banInfo")}</p>
            {/* Ban list will be populated by server response */}
            <div className="admin-ban-empty">{t("admin.noBans")}</div>
          </div>
        )}
      </div>

      <style>{`
        .admin-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0;
          width: 100%;
          max-width: 440px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .admin-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
          color: var(--text-primary);
        }
        .admin-header h3 {
          font-size: 16px;
          font-weight: 700;
          flex: 1;
        }
        .admin-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }
        .admin-close:hover {
          color: var(--text-primary);
        }
        .admin-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
        }
        .admin-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .admin-tab:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .admin-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .admin-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .admin-field input {
          padding: 10px 12px;
          font-size: 14px;
        }
        .admin-field textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
        }
        .admin-save {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          background: var(--accent);
          color: #fff;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 13px;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
          align-self: flex-start;
        }
        .admin-save:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
        }
        .admin-save.saved {
          background: #10b981;
          pointer-events: none;
        }
        .admin-ban-info {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .admin-ban-empty {
          text-align: center;
          padding: 20px;
          color: var(--text-muted);
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
