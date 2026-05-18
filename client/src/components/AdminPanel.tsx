import {
  AlertTriangle,
  Check,
  ClipboardList,
  Database,
  Download,
  Hash,
  Link2,
  Pencil,
  Plus,
  Save,
  Settings,
  Shield,
  ShieldAlert,
  Trash2,
  Type,
  Upload,
  Users,
  UserX,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AdminBan, AdminMute, AdminUser, AuditEntry, AutomodRule, RetentionStats, WelcomeMessageConfig } from "../hooks/useWebSocket";

type Tab = "settings" | "users" | "channels" | "bans" | "audit" | "retention" | "automod";

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
  auditLog: { entries: AuditEntry[]; total: number };
  onRequestAuditLog: (limit?: number, offset?: number) => void;
  retentionStats: RetentionStats | null;
  onRequestRetentionStats: () => void;
  onPurgeMessages: (channel: string, olderThanDays: number) => void;
  onExportMessages: (channel: string, limit: number) => void;
  serverBaseUrl: string;
  currentUserId: string;
  automodRules: AutomodRule[];
  onAddAutomodRule: (ruleType: string, pattern: string, action: string, reason: string) => void;
  onDeleteAutomodRule: (id: number) => void;
  onToggleAutomodRule: (id: number, enabled: boolean) => void;
  onRequestAutomodRules: () => void;
  welcomeMessages: WelcomeMessageConfig[];
  onSetWelcomeMessage: (channel: string, message: string, enabled: boolean) => void;
  onRequestWelcomeMessages: () => void;
}

function auditActionIcon(action: string) {
  switch (action) {
    case "kick":
      return UserX;
    case "ban":
    case "unban":
      return Shield;
    case "mute":
    case "unmute":
      return VolumeX;
    case "set_role":
      return Users;
    case "settings_update":
      return Settings;
    case "channel_delete":
      return Trash2;
    case "channel_rename":
      return Pencil;
    default:
      return ClipboardList;
  }
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
  auditLog,
  onRequestAuditLog,
  retentionStats,
  onRequestRetentionStats,
  onPurgeMessages,
  onExportMessages,
  serverBaseUrl,
  currentUserId,
  automodRules,
  onAddAutomodRule,
  onDeleteAutomodRule,
  onToggleAutomodRule,
  onRequestAutomodRules,
  welcomeMessages,
  onSetWelcomeMessage,
  onRequestWelcomeMessages,
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

  // Retention form
  const [purgeChannel, setPurgeChannel] = useState("");
  const [purgeOlderThan, setPurgeOlderThan] = useState(30);
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);
  const [exportChannel, setExportChannel] = useState("");

  // Backup/restore state
  const [backupLoading, setBackupLoading] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreResult, setRestoreResult] = useState<string | null>(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  // Automod form
  const [automodType, setAutomodType] = useState("word");
  const [automodPattern, setAutomodPattern] = useState("");
  const [automodAction, setAutomodAction] = useState("warn");
  const [automodReason, setAutomodReason] = useState("");

  // Welcome message editor
  const [welcomeExpanded, setWelcomeExpanded] = useState<string | null>(null);
  const [welcomeEditMsg, setWelcomeEditMsg] = useState("");
  const [welcomeEditEnabled, setWelcomeEditEnabled] = useState(true);
  const [welcomeSaved, setWelcomeSaved] = useState(false);

  useEffect(() => {
    onRequestBanList();
    onRequestMuteList();
    onRequestAdminUserList();
    onRequestWelcomeMessages();
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

  const handleDownloadBackup = () => {
    setBackupLoading(true);
    const url = `${serverBaseUrl}/backup?key=${encodeURIComponent(currentUserId)}`;
    // Use a hidden link to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setBackupLoading(false), 3000);
  };

  const handleRestore = async () => {
    if (!restoreFile) return;
    setRestoreLoading(true);
    setRestoreResult(null);
    try {
      const formData = new FormData();
      formData.append("backup", restoreFile);
      const url = `${serverBaseUrl}/restore?key=${encodeURIComponent(currentUserId)}`;
      const resp = await fetch(url, { method: "POST", body: formData });
      if (resp.ok) {
        setRestoreResult(t("backup.restored"));
      } else {
        const text = await resp.text();
        setRestoreResult(text || "Restore failed");
      }
    } catch {
      setRestoreResult("Restore failed");
    } finally {
      setRestoreLoading(false);
      setShowRestoreConfirm(false);
      setRestoreFile(null);
    }
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
          <button
            className={`admin-tab ${tab === "audit" ? "active" : ""}`}
            onClick={() => {
              setTab("audit");
              onRequestAuditLog();
            }}
          >
            <ClipboardList size={14} />
            {t("admin.auditLog")}
          </button>
          <button
            className={`admin-tab ${tab === "retention" ? "active" : ""}`}
            onClick={() => {
              setTab("retention");
              onRequestRetentionStats();
            }}
          >
            <Database size={14} />
            {t("retention.title")}
          </button>
          <button
            className={`admin-tab ${tab === "automod" ? "active" : ""}`}
            onClick={() => {
              setTab("automod");
              onRequestAutomodRules();
            }}
          >
            <ShieldAlert size={14} />
            {t("automod.title")}
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

              {/* Backup section */}
              <div className="admin-section-label" style={{ marginTop: 20 }}>
                <Database size={13} /> {t("backup.title")}
              </div>
              <div className="backup-section">
                <button
                  className="admin-btn-sm accent"
                  onClick={handleDownloadBackup}
                  disabled={backupLoading}
                >
                  <Download size={12} />
                  {backupLoading ? t("backup.downloading") : t("backup.download")}
                </button>

                <div className="backup-restore">
                  <div className="admin-section-label" style={{ marginTop: 12 }}>
                    <Upload size={13} /> {t("backup.restore")}
                  </div>
                  <p className="admin-ban-info">{t("backup.restoreWarning")}</p>
                  <div className="backup-restore-form">
                    <input
                      type="file"
                      accept=".zip"
                      onChange={(e) => {
                        setRestoreFile(e.target.files?.[0] || null);
                        setRestoreResult(null);
                        setShowRestoreConfirm(false);
                      }}
                      className="backup-file-input"
                    />
                    {restoreFile && !showRestoreConfirm && (
                      <button
                        className="admin-btn-sm danger"
                        onClick={() => setShowRestoreConfirm(true)}
                        disabled={restoreLoading}
                      >
                        <Upload size={12} />
                        {restoreLoading ? t("backup.restoring") : t("backup.restoreBtn")}
                      </button>
                    )}
                    {showRestoreConfirm && (
                      <div className="retention-confirm">
                        <p className="retention-confirm-text">{t("backup.confirmRestore")}</p>
                        <div className="retention-confirm-actions">
                          <button
                            className="admin-btn-sm danger"
                            onClick={handleRestore}
                            disabled={restoreLoading}
                          >
                            <Upload size={12} />
                            {restoreLoading ? t("backup.restoring") : t("backup.restoreBtn")}
                          </button>
                          <button className="admin-btn-sm" onClick={() => setShowRestoreConfirm(false)}>
                            {t("channel.cancel")}
                          </button>
                        </div>
                      </div>
                    )}
                    {restoreResult && (
                      <div className="backup-result">{restoreResult}</div>
                    )}
                  </div>
                </div>
              </div>
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
                      <button
                        className="admin-btn-sm"
                        onClick={() => {
                          if (welcomeExpanded === ch.name) {
                            setWelcomeExpanded(null);
                          } else {
                            const wm = welcomeMessages.find((w) => w.channel === ch.name);
                            setWelcomeEditMsg(wm?.message || "");
                            setWelcomeEditEnabled(wm?.enabled ?? true);
                            setWelcomeExpanded(ch.name);
                            setWelcomeSaved(false);
                          }
                        }}
                        title={t("welcome.title")}
                      >
                        <Type size={12} />
                      </button>
                    </div>
                    {welcomeExpanded === ch.name && (
                      <div style={{ padding: "8px 0 4px", borderTop: "1px solid var(--border, #333)", marginTop: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, color: "var(--text-secondary, #999)" }}>
                          {t("welcome.title")}
                        </div>
                        <textarea
                          value={welcomeEditMsg}
                          onChange={(e) => setWelcomeEditMsg(e.target.value)}
                          placeholder={t("welcome.placeholder", { channel: ch.name })}
                          style={{ width: "100%", minHeight: 60, resize: "vertical", padding: 6, borderRadius: 4, border: "1px solid var(--border, #444)", background: "var(--bg-input, #1a1a2e)", color: "var(--text, #eee)", fontSize: 12 }}
                          maxLength={500}
                        />
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={welcomeEditEnabled}
                              onChange={(e) => setWelcomeEditEnabled(e.target.checked)}
                            />
                            {t("welcome.enabled")}
                          </label>
                          <button
                            className="admin-btn-sm accent"
                            onClick={() => {
                              onSetWelcomeMessage(ch.name, welcomeEditMsg, welcomeEditEnabled);
                              setWelcomeSaved(true);
                              setTimeout(() => setWelcomeSaved(false), 2000);
                            }}
                          >
                            <Save size={12} /> {t("welcome.save")}
                          </button>
                          {welcomeSaved && <span style={{ fontSize: 11, color: "var(--accent, #7c5cbf)" }}>{t("welcome.saved")}</span>}
                        </div>
                        {welcomeEditMsg && (
                          <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 6, background: "var(--bg-hover, #222)", fontSize: 12, fontStyle: "italic", color: "var(--accent, #7c5cbf)", display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ opacity: 0.7 }}>{t("welcome.preview")}:</span> {welcomeEditMsg}
                          </div>
                        )}
                      </div>
                    )}
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

          {/* === AUDIT LOG TAB === */}
          {tab === "audit" && (
            <>
              {auditLog.entries.length === 0 ? (
                <div className="admin-empty">{t("admin.noAuditEntries")}</div>
              ) : (
                <ul className="admin-list">
                  {auditLog.entries.map((entry) => {
                    const ActionIcon = auditActionIcon(entry.action);
                    return (
                      <li key={entry.id} className="admin-list-item audit-entry">
                        <div className="audit-icon">
                          <ActionIcon size={14} />
                        </div>
                        <div className="audit-body">
                          <div className="audit-summary">
                            <span className="admin-user-nick">{entry.actorName || entry.actorKey.slice(0, 12)}</span>
                            {" "}
                            <span className="admin-text-muted">{t(`audit.${entry.action}`, entry.action)}</span>
                            {entry.targetName || entry.targetKey ? (
                              <>
                                {" "}
                                <span className="admin-user-nick">
                                  {entry.targetName || entry.targetKey.slice(0, 12)}
                                </span>
                              </>
                            ) : null}
                          </div>
                          {entry.details && <div className="audit-details">{entry.details}</div>}
                          <div className="audit-time">
                            {new Date(entry.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              {auditLog.entries.length < auditLog.total && (
                <button
                  className="admin-btn-sm accent"
                  style={{ alignSelf: "center" }}
                  onClick={() => onRequestAuditLog(50, auditLog.entries.length)}
                >
                  {t("admin.loadMore")}
                </button>
              )}
            </>
          )}

          {/* === RETENTION TAB === */}
          {tab === "retention" && (
            <>
              {/* Stats section */}
              <div className="admin-section-label">
                <Database size={13} /> {t("retention.stats")}
              </div>
              {retentionStats ? (
                <>
                  <div className="retention-total">
                    {t("retention.totalMessages")}: <strong>{retentionStats.totalMessages.toLocaleString()}</strong>
                  </div>
                  {retentionStats.byChannel && retentionStats.byChannel.length > 0 ? (
                    <div className="retention-chart">
                      {retentionStats.byChannel.map((ch) => {
                        const maxCount = retentionStats.byChannel[0]?.count || 1;
                        const pct = Math.max(2, (ch.count / maxCount) * 100);
                        return (
                          <div key={ch.channel} className="retention-bar-row">
                            <span className="retention-bar-label">#{ch.channel}</span>
                            <div className="retention-bar-track">
                              <div className="retention-bar-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="retention-bar-count">{ch.count.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="admin-empty">{t("retention.noMessages")}</div>
                  )}
                </>
              ) : (
                <div className="admin-empty">{t("retention.noMessages")}</div>
              )}

              {/* Purge section */}
              <div className="admin-section-label" style={{ marginTop: 16 }}>
                <Trash2 size={13} /> {t("retention.purge")}
              </div>
              <div className="retention-purge-form">
                <div className="admin-field">
                  <label>{t("retention.purgeChannel")}</label>
                  <select
                    value={purgeChannel}
                    onChange={(e) => setPurgeChannel(e.target.value)}
                    className="admin-mute-select"
                  >
                    <option value="">{t("retention.allChannels")}</option>
                    {channels.map((ch) => (
                      <option key={ch.name} value={ch.name}>#{ch.name}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label>{t("retention.olderThan")}</label>
                  <select
                    value={purgeOlderThan}
                    onChange={(e) => setPurgeOlderThan(Number(e.target.value))}
                    className="admin-mute-select"
                  >
                    <option value={7}>{t("retention.days7")}</option>
                    <option value={30}>{t("retention.days30")}</option>
                    <option value={90}>{t("retention.days90")}</option>
                    <option value={365}>{t("retention.year1")}</option>
                  </select>
                </div>
                {!showPurgeConfirm ? (
                  <button
                    className="admin-btn-sm danger retention-purge-btn"
                    onClick={() => setShowPurgeConfirm(true)}
                  >
                    <Trash2 size={12} />
                    {t("retention.purgeBtn")}
                  </button>
                ) : (
                  <div className="retention-confirm">
                    <p className="retention-confirm-text">
                      {t("retention.purgeConfirm", {
                        channel: purgeChannel || t("retention.allChannels"),
                        days: purgeOlderThan,
                      })}
                    </p>
                    <div className="retention-confirm-actions">
                      <button
                        className="admin-btn-sm danger"
                        onClick={() => {
                          onPurgeMessages(purgeChannel, purgeOlderThan);
                          setShowPurgeConfirm(false);
                        }}
                      >
                        <Trash2 size={12} />
                        {t("retention.purgeBtn")}
                      </button>
                      <button className="admin-btn-sm" onClick={() => setShowPurgeConfirm(false)}>
                        {t("channel.cancel")}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Export section */}
              <div className="admin-section-label" style={{ marginTop: 16 }}>
                <Download size={13} /> {t("retention.export")}
              </div>
              <div className="retention-export-form">
                <div className="admin-field">
                  <label>{t("retention.purgeChannel")}</label>
                  <select
                    value={exportChannel}
                    onChange={(e) => setExportChannel(e.target.value)}
                    className="admin-mute-select"
                  >
                    <option value="">{t("retention.allChannels")}</option>
                    {channels.map((ch) => (
                      <option key={ch.name} value={ch.name}>#{ch.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="admin-btn-sm accent"
                  onClick={() => onExportMessages(exportChannel, 10000)}
                >
                  <Download size={12} />
                  {t("retention.exportBtn")}
                </button>
              </div>
            </>
          )}

          {/* === AUTOMOD TAB === */}
          {tab === "automod" && (
            <>
              {/* Add Rule Form */}
              <div className="admin-section-label">
                <Plus size={13} /> {t("automod.addRule")}
              </div>
              <div className="automod-form">
                <div className="admin-field">
                  <label>{t("automod.ruleType")}</label>
                  <select
                    value={automodType}
                    onChange={(e) => setAutomodType(e.target.value)}
                    className="admin-mute-select"
                  >
                    <option value="word">{t("automod.typeWord")}</option>
                    <option value="regex">{t("automod.typeRegex")}</option>
                    <option value="spam">{t("automod.typeSpam")}</option>
                    <option value="caps">{t("automod.typeCaps")}</option>
                    <option value="links">{t("automod.typeLinks")}</option>
                  </select>
                </div>
                {automodType !== "spam" && automodType !== "caps" && automodType !== "links" && (
                  <div className="admin-field">
                    <label>{t("automod.pattern")}</label>
                    <input
                      type="text"
                      value={automodPattern}
                      onChange={(e) => setAutomodPattern(e.target.value)}
                      placeholder={automodType === "regex" ? "\\bword\\b" : t("automod.patternPlaceholder")}
                      style={{ padding: "8px 12px", fontSize: "13px" }}
                    />
                  </div>
                )}
                <div className="admin-field">
                  <label>{t("automod.action")}</label>
                  <select
                    value={automodAction}
                    onChange={(e) => setAutomodAction(e.target.value)}
                    className="admin-mute-select"
                  >
                    <option value="warn">{t("automod.actionWarn")}</option>
                    <option value="block">{t("automod.actionBlock")}</option>
                    <option value="mute">{t("automod.actionMute")}</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>{t("automod.reason")}</label>
                  <input
                    type="text"
                    value={automodReason}
                    onChange={(e) => setAutomodReason(e.target.value)}
                    placeholder={t("automod.reasonPlaceholder")}
                    style={{ padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
                <button
                  className="admin-btn-sm accent"
                  onClick={() => {
                    const pat = (automodType === "spam" || automodType === "caps" || automodType === "links")
                      ? automodType
                      : automodPattern;
                    if (!pat.trim()) return;
                    onAddAutomodRule(automodType, pat, automodAction, automodReason);
                    setAutomodPattern("");
                    setAutomodReason("");
                  }}
                >
                  <Plus size={12} />
                  {t("automod.addRule")}
                </button>
              </div>

              {/* Presets */}
              <div className="admin-section-label" style={{ marginTop: 12 }}>
                <Zap size={13} /> {t("automod.presets")}
              </div>
              <div className="automod-presets">
                <button
                  className="admin-btn-sm"
                  onClick={() => onAddAutomodRule("word", "badword", "block", "Profanity filter")}
                >
                  {t("automod.presetProfanity")}
                </button>
                <button
                  className="admin-btn-sm"
                  onClick={() => onAddAutomodRule("spam", "spam", "mute", "Anti-spam")}
                >
                  {t("automod.presetSpam")}
                </button>
                <button
                  className="admin-btn-sm"
                  onClick={() => onAddAutomodRule("caps", "caps", "warn", "No caps lock")}
                >
                  {t("automod.presetCaps")}
                </button>
                <button
                  className="admin-btn-sm"
                  onClick={() => onAddAutomodRule("links", "links", "block", "No links")}
                >
                  {t("automod.presetLinks")}
                </button>
              </div>

              {/* Rules List */}
              <div className="admin-section-label" style={{ marginTop: 12 }}>
                <Shield size={13} /> {t("automod.activeRules")}
              </div>
              {automodRules.length === 0 ? (
                <div className="admin-empty">{t("automod.noRules")}</div>
              ) : (
                <ul className="admin-list">
                  {automodRules.map((rule) => (
                    <li key={rule.id} className="admin-list-item" style={{ opacity: rule.enabled ? 1 : 0.5 }}>
                      <div className="admin-list-main">
                        <span className="automod-type-icon">
                          {rule.ruleType === "word" && <Type size={14} />}
                          {rule.ruleType === "regex" && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>.*</span>}
                          {rule.ruleType === "spam" && <Zap size={14} />}
                          {rule.ruleType === "caps" && <AlertTriangle size={14} />}
                          {rule.ruleType === "links" && <Link2 size={14} />}
                        </span>
                        <span className="automod-rule-pattern">{rule.pattern}</span>
                        <span className={`admin-badge ${rule.action === "block" ? "danger-badge" : rule.action === "mute" ? "mute-badge" : ""}`}>
                          {rule.action}
                        </span>
                      </div>
                      <div className="admin-list-actions">
                        <button
                          className="admin-btn-sm"
                          onClick={() => onToggleAutomodRule(rule.id, !rule.enabled)}
                          title={rule.enabled ? t("automod.disable") : t("automod.enable")}
                        >
                          {rule.enabled ? t("automod.disable") : t("automod.enable")}
                        </button>
                        <button
                          className="admin-btn-sm danger"
                          onClick={() => onDeleteAutomodRule(rule.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      {rule.reason && (
                        <div className="admin-list-meta">
                          <span>{rule.reason}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
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

        /* Audit log styles */
        .audit-entry { align-items: flex-start; gap: 10px; flex-wrap: nowrap; }
        .audit-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          color: var(--text-muted);
        }
        .audit-body { flex: 1; min-width: 0; }
        .audit-summary { font-size: 13px; line-height: 1.4; }
        .audit-details {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          font-style: italic;
        }
        .audit-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Retention tab styles */
        .retention-total {
          font-size: 14px;
          color: var(--text-secondary);
          padding: 8px 0;
        }
        .retention-total strong {
          color: var(--text-primary);
          font-size: 18px;
        }
        .retention-chart {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .retention-bar-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }
        .retention-bar-label {
          width: 90px;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 0;
        }
        .retention-bar-track {
          flex: 1;
          height: 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .retention-bar-fill {
          height: 100%;
          background: var(--accent);
          border-radius: var(--radius-sm);
          transition: width 0.3s ease;
          min-width: 2px;
        }
        .retention-bar-count {
          font-size: 11px;
          color: var(--text-muted);
          width: 50px;
          text-align: right;
          flex-shrink: 0;
        }
        .retention-purge-form,
        .retention-export-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .retention-purge-btn {
          align-self: flex-start;
        }
        .retention-confirm {
          background: var(--danger-dim, rgba(239,68,68,0.08));
          border: 1px solid var(--danger, #ef4444);
          border-radius: var(--radius-sm);
          padding: 12px;
        }
        .retention-confirm-text {
          font-size: 13px;
          color: var(--danger, #ef4444);
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .retention-confirm-actions {
          display: flex;
          gap: 8px;
        }

        /* Backup section styles */
        .backup-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .backup-restore {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .backup-restore-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .backup-file-input {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .backup-file-input::file-selector-button {
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          cursor: pointer;
          margin-right: 8px;
        }
        .backup-file-input::file-selector-button:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .backup-result {
          font-size: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: rgba(16,185,129,0.1);
          color: #10b981;
          font-weight: 500;
        }

        /* Automod tab styles */
        .automod-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .automod-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .automod-type-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .automod-rule-pattern {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 160px;
        }
        .admin-badge.danger-badge {
          background: rgba(239,68,68,0.12);
          color: #ef4444;
        }
        .admin-badge.mute-badge {
          background: rgba(245,158,11,0.12);
          color: #f59e0b;
        }
      `}</style>
    </div>
  );
}
