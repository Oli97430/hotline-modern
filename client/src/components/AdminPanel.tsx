import { Check, Hash, Pencil, Save, Settings, Shield, Trash2, Users, UserX, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AdminBan, AdminMute, AdminUser } from "../hooks/useWebSocket";

type Tab = "settings" | "users" | "channels" | "bans";

interface AdminPanelProps {
  serverName: string;
  motd: string;
  onUpdateSettings: (serverName: string, motd: string) => void;
  onRequestBanList: () => void;
  onUnban: (publicKey: string) => void;
  onClose: () => void;
  // New props
  adminBans: AdminBan[];
  adminMutes: AdminMute[];
  adminUsers: AdminUser[];
  channels: { name: string; topic: string; userCount: number; hasPassword: boolean }[];
  onMuteUser: (publicKey: string, reason: string, duration: number) => void;
  onUnmuteUser: (publicKey: string) => void;
  onRequestMuteList: () => void;
  onRequestAdminUserList: () => void;
  onRenameChannel: (oldName: string, newName: string) => void;
  onDeleteChannel: (name: string) => void;
  onCreateChannel: (name: string, topic: string) => void;
  onKickUser: (userId: string) => void;
  onBanUser: (userId: string) => void;
  onSetUserRole: (userId: string, role: string) => void;
}

export function AdminPanel({
  serverName,
  motd,
  onUpdateSettings,
  onRequestBanList,
  onUnban,
  onClose,
  adminBans,
  adminMutes,
  adminUsers,
  channels,
  onMuteUser,
  onUnmuteUser,
  onRequestMuteList,
  onRequestAdminUserList,
  onRenameChannel,
  onDeleteChannel,
  onCreateChannel,
  onKickUser,
  onBanUser,
  onSetUserRole,
}: AdminPanelProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("settings");
  const [name, setName] = useState(serverName);
  const [motdValue, setMotdValue] = useState(motd);
  const [saved, setSaved] = useState(false);

  // Mute form
  const [muteTarget, setMuteTarget] = useState("");
  const [muteReason, setMuteReason] = useState("");
  const [muteDuration, setMuteDuration] = useState(0);

  // Channel form
  const [newChannelName, setNewChannelName] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    onRequestBanList();
    onRequestMuteList();
    onRequestAdminUserList();
  }, []);

  const handleSave = () => {
    onUpdateSettings(name.trim(), motdValue.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleMute = () => {
    if (!muteTarget) return;
    onMuteUser(muteTarget, muteReason, muteDuration);
    setMuteTarget("");
    setMuteReason("");
    setMuteDuration(0);
  };

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    onCreateChannel(newChannelName.trim(), "");
    setNewChannelName("");
  };

  const handleRename = (oldName: string) => {
    if (!renameValue.trim() || renameValue.trim() === oldName) {
      setRenaming(null);
      return;
    }
    onRenameChannel(oldName, renameValue.trim());
    setRenaming(null);
    setRenameValue("");
  };

  const formatDate = (ms: number) =>
    new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

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
          <button className={`admin-tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>
            <Settings size={14} />
            {t("admin.settings")}
          </button>
          <button
            className={`admin-tab ${tab === "users" ? "active" : ""}`}
            onClick={() => {
              setTab("users");
              onRequestAdminUserList();
            }}
          >
            <Users size={14} />
            {t("admin.users")}
          </button>
          <button className={`admin-tab ${tab === "channels" ? "active" : ""}`} onClick={() => setTab("channels")}>
            <Hash size={14} />
            {t("admin.channels")}
          </button>
          <button
            className={`admin-tab ${tab === "bans" ? "active" : ""}`}
            onClick={() => {
              setTab("bans");
              onRequestBanList();
              onRequestMuteList();
            }}
          >
            <UserX size={14} />
            {t("admin.bans")}
          </button>
        </div>

        <div className="admin-content">
          {/* === SETTINGS TAB === */}
          {tab === "settings" && (
            <>
              <div className="admin-field">
                <label>{t("admin.serverName")}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={64} />
              </div>
              <div className="admin-field">
                <label>{t("admin.motd")}</label>
                <textarea value={motdValue} onChange={(e) => setMotdValue(e.target.value)} rows={4} maxLength={512} />
              </div>
              <button className={`admin-save ${saved ? "saved" : ""}`} onClick={handleSave}>
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? t("admin.saved") : t("admin.save")}
              </button>
            </>
          )}

          {/* === USERS TAB === */}
          {tab === "users" && (
            <>
              {adminUsers.length === 0 ? (
                <div className="admin-empty">{t("sidebar.noChannels")}</div>
              ) : (
                <ul className="admin-list">
                  {adminUsers.map((u) => (
                    <li key={u.publicKey} className="admin-list-item">
                      <div className="admin-list-main">
                        <span className="admin-user-nick">{u.nickname || u.publicKey.slice(0, 12)}</span>
                        <span className={`admin-badge ${u.online ? "online" : "offline"}`}>
                          {u.online ? t("admin.online") : t("admin.offline")}
                        </span>
                        <select
                          className="admin-role-select"
                          value={u.role}
                          onChange={(e) => onSetUserRole(u.publicKey, e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="operator">Operator</option>
                          <option value="member">Member</option>
                          <option value="guest">Guest</option>
                        </select>
                      </div>
                      <div className="admin-list-meta">
                        <span className="admin-pubkey">{u.publicKey.slice(0, 16)}...</span>
                        {!u.online && (
                          <span>
                            {t("admin.lastSeen")}: {formatDate(u.lastSeen)}
                          </span>
                        )}
                      </div>
                      <div className="admin-list-actions">
                        {u.online && (
                          <button className="admin-btn-sm" onClick={() => onKickUser(u.publicKey)}>
                            {t("admin.kick")}
                          </button>
                        )}
                        <button className="admin-btn-sm danger" onClick={() => onBanUser(u.publicKey)}>
                          {t("profile.ban")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* === CHANNELS TAB === */}
          {tab === "channels" && (
            <>
              <div className="admin-inline-form">
                <input
                  type="text"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder={t("channel.name")}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateChannel()}
                />
                <button className="admin-btn-sm accent" onClick={handleCreateChannel}>
                  {t("admin.createChannel")}
                </button>
              </div>
              <ul className="admin-list">
                {channels.map((ch) => (
                  <li key={ch.name} className="admin-list-item">
                    <div className="admin-list-main">
                      {renaming === ch.name ? (
                        <input
                          className="admin-rename-input"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => handleRename(ch.name)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(ch.name);
                            if (e.key === "Escape") setRenaming(null);
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className="admin-channel-name">#{ch.name}</span>
                      )}
                      <span className="admin-channel-count">
                        {ch.userCount} {t("channelSettings.members")}
                      </span>
                      {ch.hasPassword && (
                        <span className="admin-badge password">{t("channelSettings.passwordProtected")}</span>
                      )}
                    </div>
                    <div className="admin-list-actions">
                      {ch.name !== "lobby" && (
                        <>
                          <button
                            className="admin-btn-sm"
                            onClick={() => {
                              setRenaming(ch.name);
                              setRenameValue(ch.name);
                            }}
                            title={t("admin.rename")}
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            className="admin-btn-sm danger"
                            onClick={() => onDeleteChannel(ch.name)}
                            title={t("admin.deleteChannel")}
                          >
                            <Trash2 size={12} />
                          </button>
                        </>
                      )}
                      {ch.name === "lobby" && <span className="admin-text-muted">{t("admin.cannotDeleteLobby")}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* === BANS & MUTES TAB === */}
          {tab === "bans" && (
            <>
              {/* Mute form */}
              <div className="admin-section-label">
                <VolumeX size={13} /> {t("admin.mutes")}
              </div>
              <div className="admin-mute-form">
                <select
                  className="admin-mute-select"
                  value={muteTarget}
                  onChange={(e) => setMuteTarget(e.target.value)}
                >
                  <option value="">{t("admin.muteUser")}</option>
                  {adminUsers
                    .filter((u) => u.online)
                    .map((u) => (
                      <option key={u.publicKey} value={u.publicKey}>
                        {u.nickname}
                      </option>
                    ))}
                </select>
                <input
                  type="text"
                  placeholder={t("admin.muteReason")}
                  value={muteReason}
                  onChange={(e) => setMuteReason(e.target.value)}
                />
                <input
                  type="number"
                  min={0}
                  placeholder={t("admin.muteDuration")}
                  value={muteDuration}
                  onChange={(e) => setMuteDuration(Number(e.target.value))}
                  style={{ width: 80 }}
                />
                <button className="admin-btn-sm accent" onClick={handleMute}>
                  {t("admin.mute")}
                </button>
              </div>

              {adminMutes.length > 0 ? (
                <ul className="admin-list">
                  {adminMutes.map((m) => (
                    <li key={m.publicKey} className="admin-list-item">
                      <div className="admin-list-main">
                        <span className="admin-user-nick">{m.publicKey.slice(0, 16)}...</span>
                        {m.reason && <span className="admin-text-muted">{m.reason}</span>}
                        {m.expiresAt ? (
                          <span className="admin-badge">
                            {t("admin.expiresAt")}: {formatDate(m.expiresAt)}
                          </span>
                        ) : (
                          <span className="admin-badge">{t("admin.permanent")}</span>
                        )}
                      </div>
                      <div className="admin-list-actions">
                        <button className="admin-btn-sm" onClick={() => onUnmuteUser(m.publicKey)}>
                          {t("admin.unmute")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="admin-empty">{t("admin.noMutes")}</div>
              )}

              <div className="admin-section-label" style={{ marginTop: 16 }}>
                <UserX size={13} /> {t("admin.bans")}
              </div>
              <p className="admin-ban-info">{t("admin.banInfo")}</p>
              {adminBans.length > 0 ? (
                <ul className="admin-list">
                  {adminBans.map((b) => (
                    <li key={b.publicKey} className="admin-list-item">
                      <div className="admin-list-main">
                        <span className="admin-user-nick">{b.nickname || b.publicKey.slice(0, 16)}</span>
                        <span className="admin-text-muted">{formatDate(b.bannedAt)}</span>
                      </div>
                      <div className="admin-list-actions">
                        <button className="admin-btn-sm" onClick={() => onUnban(b.publicKey)}>
                          {t("admin.unmute")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="admin-empty">{t("admin.noBans")}</div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .admin-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 520px;
          max-height: 80vh;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
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
        .admin-close:hover { color: var(--text-primary); }
        .admin-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .admin-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 9px 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .admin-tab:hover { color: var(--text-primary); background: var(--bg-tertiary); }
        .admin-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .admin-content {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          flex: 1;
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
        .admin-field input { padding: 10px 12px; font-size: 14px; }
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
        .admin-save.saved { background: #10b981; pointer-events: none; }

        /* List style shared across tabs */
        .admin-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
        .admin-list-item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          font-size: 13px;
        }
        .admin-list-main {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        .admin-list-meta {
          width: 100%;
          display: flex;
          gap: 12px;
          font-size: 11px;
          color: var(--text-muted);
          padding-top: 2px;
        }
        .admin-list-actions {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .admin-user-nick { font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
        .admin-pubkey { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); }
        .admin-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 8px;
          background: var(--bg-secondary);
          color: var(--text-muted);
          white-space: nowrap;
        }
        .admin-badge.online { background: rgba(16,185,129,0.15); color: #10b981; }
        .admin-badge.offline { background: var(--bg-secondary); color: var(--text-muted); }
        .admin-badge.password { background: rgba(var(--accent-rgb),0.1); color: var(--accent); }
        .admin-role-select {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          cursor: pointer;
        }
        .admin-btn-sm {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: background var(--transition-fast), color var(--transition-fast);
          cursor: pointer;
          white-space: nowrap;
        }
        .admin-btn-sm:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .admin-btn-sm.danger { color: var(--danger); }
        .admin-btn-sm.danger:hover { background: var(--danger-dim); }
        .admin-btn-sm.accent { background: var(--accent); color: #fff; border-color: transparent; }
        .admin-btn-sm.accent:hover { background: var(--accent-hover); }
        .admin-empty { text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px; }
        .admin-ban-info { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin: 0; }
        .admin-text-muted { font-size: 11px; color: var(--text-muted); }
        .admin-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .admin-inline-form {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .admin-inline-form input {
          flex: 1;
          padding: 8px 12px;
          font-size: 13px;
        }
        .admin-rename-input {
          padding: 4px 8px;
          font-size: 13px;
          width: 120px;
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .admin-channel-name { font-weight: 600; color: var(--text-primary); }
        .admin-channel-count { font-size: 11px; color: var(--text-muted); }
        .admin-mute-form {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }
        .admin-mute-form input, .admin-mute-select {
          padding: 6px 10px;
          font-size: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .admin-mute-select { flex: 1; min-width: 120px; }
        .admin-mute-form input { flex: 1; min-width: 80px; }
      `}</style>
    </div>
  );
}
