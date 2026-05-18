import { Clock, Hash, Lock, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChannelPermissionData } from "../hooks/useWebSocket";

interface ChannelSettingsModalProps {
  channel: { name: string; topic: string; userCount: number; hasPassword?: boolean; slowmode?: number; description?: string };
  onSetTopic: (channel: string, topic: string) => void;
  onClose: () => void;
  canEdit: boolean;
  channelPermissions?: ChannelPermissionData[];
  onRequestChannelPermissions?: (channel: string) => void;
  onSetChannelPermission?: (channel: string, role: string, permission: string, allowed: boolean | null) => void;
  onSetSlowmode?: (channel: string, seconds: number) => void;
  onSetDescription?: (channel: string, description: string) => void;
  isAdmin?: boolean;
}

const ROLES = ["admin", "operator", "member", "guest"] as const;
const PERMISSIONS = ["chat", "upload", "react", "pin"] as const;

type PermState = "default" | "allow" | "deny";

function getPermState(perms: ChannelPermissionData[], role: string, permission: string): PermState {
  const entry = perms.find((p) => p.role === role && p.permission === permission);
  if (!entry) return "default";
  return entry.allowed ? "allow" : "deny";
}

function cycleState(current: PermState): PermState {
  if (current === "default") return "allow";
  if (current === "allow") return "deny";
  return "default";
}

const SLOWMODE_OPTIONS = [
  { value: 0, label: "slowmode.off" },
  { value: 5, label: "5s" },
  { value: 10, label: "10s" },
  { value: 30, label: "30s" },
  { value: 60, label: "1min" },
  { value: 300, label: "5min" },
  { value: 900, label: "15min" },
] as const;

export function ChannelSettingsModal({
  channel,
  onSetTopic,
  onClose,
  canEdit,
  channelPermissions,
  onRequestChannelPermissions,
  onSetChannelPermission,
  onSetSlowmode,
  onSetDescription,
  isAdmin,
}: ChannelSettingsModalProps) {
  const { t } = useTranslation();
  const [topic, setTopic] = useState(channel.topic);
  const [description, setDescription] = useState(channel.description || "");
  const [slowmode, setSlowmode] = useState(channel.slowmode || 0);

  useEffect(() => {
    if (isAdmin && onRequestChannelPermissions) {
      onRequestChannelPermissions(channel.name);
    }
  }, [isAdmin, channel.name, onRequestChannelPermissions]);

  const handleSave = () => {
    if (topic !== channel.topic) {
      onSetTopic(channel.name, topic.trim());
    }
    if (description !== (channel.description || "") && onSetDescription) {
      onSetDescription(channel.name, description.trim());
    }
    if (slowmode !== (channel.slowmode || 0) && onSetSlowmode) {
      onSetSlowmode(channel.name, slowmode);
    }
    onClose();
  };

  const hasChanges = topic !== channel.topic
    || description !== (channel.description || "")
    || slowmode !== (channel.slowmode || 0);

  const handlePermClick = (role: string, permission: string) => {
    if (!onSetChannelPermission || !channelPermissions) return;
    const current = getPermState(channelPermissions, role, permission);
    const next = cycleState(current);
    if (next === "default") {
      onSetChannelPermission(channel.name, role, permission, null);
    } else {
      onSetChannelPermission(channel.name, role, permission, next === "allow");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chsettings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chsettings-header">
          <div className="chsettings-icon">{channel.hasPassword ? <Lock size={18} /> : <Hash size={18} />}</div>
          <div>
            <h3>{channel.name}</h3>
            <span className="chsettings-subtitle">{t("channelSettings.title")}</span>
          </div>
        </div>

        <div className="chsettings-info">
          <div className="chsettings-stat">
            <Users size={14} />
            <span>
              {channel.userCount} {t("channelSettings.members")}
            </span>
          </div>
          {channel.hasPassword && (
            <div className="chsettings-stat">
              <Lock size={14} />
              <span>{t("channelSettings.passwordProtected")}</span>
            </div>
          )}
        </div>

        <div className="chsettings-field">
          <label>{t("channel.topic")}</label>
          {canEdit ? (
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("channelSettings.topicPlaceholder")}
              maxLength={256}
              rows={3}
            />
          ) : (
            <div className="chsettings-topic-display">
              {channel.topic || <em className="text-muted">{t("channelSettings.noTopic")}</em>}
            </div>
          )}
        </div>

        <div className="chsettings-field">
          <label>{t("channel.description")}</label>
          {canEdit ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("channel.descPlaceholder")}
              maxLength={500}
              rows={3}
            />
          ) : (
            <div className="chsettings-topic-display">
              {channel.description || <em className="text-muted">{t("channel.descPlaceholder")}</em>}
            </div>
          )}
        </div>

        {canEdit && (
          <div className="chsettings-field">
            <label>
              <Clock size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
              {t("slowmode.label")}
            </label>
            <select
              className="chsettings-select"
              value={slowmode}
              onChange={(e) => setSlowmode(Number(e.target.value))}
            >
              {SLOWMODE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value === 0 ? t("slowmode.off") : opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {isAdmin && channelPermissions && (
          <div className="chsettings-field">
            <label>
              <Shield size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
              {t("channelPerms.title")}
            </label>
            <div className="chperms-grid">
              <div className="chperms-header-row">
                <div className="chperms-corner" />
                {PERMISSIONS.map((perm) => (
                  <div key={perm} className="chperms-col-header">
                    {t(`channelPerms.${perm}`)}
                  </div>
                ))}
              </div>
              {ROLES.map((role) => (
                <div key={role} className="chperms-row">
                  <div className="chperms-role-label">{t(`roles.${role}`)}</div>
                  {PERMISSIONS.map((perm) => {
                    const state = getPermState(channelPermissions, role, perm);
                    return (
                      <button
                        key={perm}
                        type="button"
                        className={`chperms-cell chperms-${state}`}
                        onClick={() => handlePermClick(role, perm)}
                        title={t(`channelPerms.${state}`)}
                      >
                        {state === "allow" ? "✓" : state === "deny" ? "✕" : "—"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chsettings-actions">
          <button className="modal-btn-cancel" onClick={onClose}>
            {canEdit ? t("channel.cancel") : t("channelSettings.close")}
          </button>
          {canEdit && (
            <button className="modal-btn-submit" onClick={handleSave} disabled={!hasChanges}>
              {t("channelSettings.save")}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .chsettings-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .chsettings-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .chsettings-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chsettings-header h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .chsettings-subtitle {
          font-size: 12px;
          color: var(--text-muted);
        }
        .chsettings-info {
          display: flex;
          gap: 16px;
          padding: 12px 14px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
        }
        .chsettings-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .chsettings-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .chsettings-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .chsettings-field textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
        }
        .chsettings-topic-display {
          padding: 10px 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .chsettings-select {
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .chsettings-select:focus {
          border-color: var(--accent);
        }
        .chsettings-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 4px;
        }
        .chsettings-actions .modal-btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .chperms-grid {
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .chperms-header-row,
        .chperms-row {
          display: grid;
          grid-template-columns: 90px repeat(4, 1fr);
          gap: 4px;
          align-items: center;
        }
        .chperms-corner {
          font-size: 11px;
        }
        .chperms-col-header {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--text-muted);
          text-align: center;
          padding: 4px 0;
        }
        .chperms-role-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 0 4px;
        }
        .chperms-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          border-radius: 4px;
          border: 1px solid var(--border);
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.15s ease;
          background: var(--bg-secondary);
          color: var(--text-muted);
        }
        .chperms-cell:hover {
          border-color: var(--accent);
        }
        .chperms-default {
          background: var(--bg-secondary);
          color: var(--text-muted);
        }
        .chperms-allow {
          background: rgba(46, 160, 67, 0.15);
          color: #2ea043;
          border-color: rgba(46, 160, 67, 0.4);
        }
        .chperms-deny {
          background: rgba(218, 54, 51, 0.15);
          color: #da3633;
          border-color: rgba(218, 54, 51, 0.4);
        }
      `}</style>
    </div>
  );
}
