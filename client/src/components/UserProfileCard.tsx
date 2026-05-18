import { Copy, Edit3, Eye, Globe, MessageCircle, MessageSquare, Save, Shield, Star, StickyNote, Trash2, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserNote, UserProfile } from "../hooks/useWebSocket";
import { StatusDot } from "./StatusSelector";
import { UserAvatar } from "./UserAvatar";

interface UserProfileCardProps {
  user: { userId: string; nickname: string; role: string; status: string; customStatus?: string };
  position: { x: number; y: number };
  onClose: () => void;
  onDM: (userId: string) => void;
  onKick?: (userId: string) => void;
  onBan?: (userId: string) => void;
  onOp?: (userId: string) => void;
  onDeop?: (userId: string) => void;
  canModerate: boolean;
  isSelf: boolean;
  profile?: UserProfile | null;
  onUpdateProfile?: (bio: string, customStatus: string, pronouns: string, timezone: string) => void;
  viewerRole?: string;
  userNotes?: UserNote[];
  onAddNote?: (targetUserId: string, content: string) => void;
  onDeleteNote?: (noteId: number, targetUserId: string) => void;
  onRequestNotes?: (targetUserId: string) => void;
}

function RoleBadge({ role }: { role: string }) {
  const { t } = useTranslation();
  const icons: Record<string, JSX.Element> = {
    admin: <Star size={10} />,
    operator: <Shield size={10} />,
    guest: <Eye size={10} />,
    member: <User size={10} />,
  };
  return (
    <span className={`profile-role-badge ${role}`}>
      {icons[role] || icons.member}
      {t(`roles.${role}`)}
    </span>
  );
}

export function UserProfileCard({
  user,
  position,
  onClose,
  onDM,
  onKick,
  onBan,
  onOp,
  onDeop,
  canModerate,
  isSelf,
  profile,
  onUpdateProfile,
  viewerRole,
  userNotes,
  onAddNote,
  onDeleteNote,
  onRequestNotes,
}: UserProfileCardProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [editBio, setEditBio] = useState(profile?.bio || "");
  const [editStatus, setEditStatus] = useState(profile?.customStatus || "");
  const [editPronouns, setEditPronouns] = useState(profile?.pronouns || "");
  const [editTimezone, setEditTimezone] = useState(profile?.timezone || "");
  const [saved, setSaved] = useState(false);
  const [noteText, setNoteText] = useState("");
  const isViewerAdmin = viewerRole === "admin" || viewerRole === "operator";

  useEffect(() => {
    if (isViewerAdmin && onRequestNotes) {
      onRequestNotes(user.userId);
    }
  }, [user.userId, isViewerAdmin, onRequestNotes]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.userId);
  };

  const handleStartEdit = () => {
    setEditBio(profile?.bio || "");
    setEditStatus(profile?.customStatus || "");
    setEditPronouns(profile?.pronouns || "");
    setEditTimezone(profile?.timezone || "");
    setEditing(true);
    setSaved(false);
  };

  const handleSave = () => {
    onUpdateProfile?.(editBio, editStatus, editPronouns, editTimezone);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const customStatus = profile?.customStatus || user.customStatus;

  return (
    <>
      <div className="profile-backdrop" onClick={onClose} />
      <div className="profile-card" style={{ position: "fixed", left: position.x, top: position.y }}>
        <div className="profile-card-header">
          <div className="profile-avatar-wrap">
            <UserAvatar
              userId={user.userId}
              nickname={user.nickname}
              size={42}
              borderColor={`var(--role-${user.role})`}
            />
          </div>
          <div className="profile-info">
            <span className="profile-nickname" style={{ color: `var(--role-${user.role})` }}>
              {user.nickname}
            </span>
            {customStatus && (
              <div className="profile-custom-status">
                <MessageCircle size={10} />
                <span>{customStatus}</span>
              </div>
            )}
            <div className="profile-status-row">
              <StatusDot status={user.status} />
              <span className="profile-status-text">{t(`status.${user.status}`)}</span>
            </div>
          </div>
        </div>

        {profile?.pronouns && !editing && (
          <div className="profile-detail-row">
            <User size={12} />
            <span>{profile.pronouns}</span>
          </div>
        )}
        {profile?.timezone && !editing && (
          <div className="profile-detail-row">
            <Globe size={12} />
            <span>{profile.timezone}</span>
          </div>
        )}
        {profile?.bio && !editing && (
          <div className="profile-bio">
            {profile.bio}
          </div>
        )}

        <div className="profile-meta">
          <RoleBadge role={user.role} />
          <button className="profile-copy-id" onClick={handleCopyId} title={t("profile.copyId")}>
            <Copy size={11} />
            <span>{user.userId.slice(0, 12)}...</span>
          </button>
        </div>

        {editing && isSelf && (
          <div className="profile-edit-form">
            <label className="profile-edit-label">{t("profile.customStatus")}</label>
            <input
              className="profile-edit-input"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              placeholder={t("profile.statusPlaceholder")}
              maxLength={50}
            />
            <label className="profile-edit-label">{t("profile.bio")}</label>
            <textarea
              className="profile-edit-textarea"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder={t("profile.bioPlaceholder")}
              maxLength={200}
              rows={3}
            />
            <label className="profile-edit-label">{t("profile.pronouns")}</label>
            <input
              className="profile-edit-input"
              value={editPronouns}
              onChange={(e) => setEditPronouns(e.target.value)}
              placeholder={t("profile.pronounsPlaceholder")}
              maxLength={30}
            />
            <label className="profile-edit-label">{t("profile.timezone")}</label>
            <input
              className="profile-edit-input"
              value={editTimezone}
              onChange={(e) => setEditTimezone(e.target.value)}
              placeholder={t("profile.timezonePlaceholder")}
              maxLength={50}
            />
            <div className="profile-edit-buttons">
              <button className="profile-action-btn" onClick={() => setEditing(false)}>
                <X size={14} />
                {t("profile.cancel")}
              </button>
              <button className="profile-action-btn primary" onClick={handleSave}>
                <Save size={14} />
                {t("profile.save")}
              </button>
            </div>
          </div>
        )}

        {saved && <div className="profile-saved-msg">{t("profile.saved")}</div>}

        {isSelf && !editing && (
          <div className="profile-actions">
            <button className="profile-action-btn primary" onClick={handleStartEdit}>
              <Edit3 size={14} />
              {t("profile.edit")}
            </button>
          </div>
        )}

        {!isSelf && (
          <div className="profile-actions">
            <button
              className="profile-action-btn primary"
              onClick={() => {
                onDM(user.userId);
                onClose();
              }}
            >
              <MessageSquare size={14} />
              {t("users.sendDM")}
            </button>
            {canModerate && user.role !== "operator" && user.role !== "admin" && (
              <button
                className="profile-action-btn"
                onClick={() => {
                  onOp?.(user.userId);
                  onClose();
                }}
              >
                <Shield size={14} />
                {t("profile.promote")}
              </button>
            )}
            {canModerate && user.role === "operator" && (
              <button
                className="profile-action-btn"
                onClick={() => {
                  onDeop?.(user.userId);
                  onClose();
                }}
              >
                <User size={14} />
                {t("profile.demote")}
              </button>
            )}
            {canModerate && (
              <>
                <button
                  className="profile-action-btn danger"
                  onClick={() => {
                    onKick?.(user.userId);
                    onClose();
                  }}
                >
                  {t("profile.kick")}
                </button>
                <button
                  className="profile-action-btn danger"
                  onClick={() => {
                    onBan?.(user.userId);
                    onClose();
                  }}
                >
                  {t("profile.ban")}
                </button>
              </>
            )}
          </div>
        )}

        {isViewerAdmin && (
          <div className="profile-notes-section">
            <div className="profile-notes-header">
              <StickyNote size={12} />
              <span>{t("notes.title")}</span>
            </div>
            {(!userNotes || userNotes.length === 0) && (
              <div className="profile-notes-empty">{t("notes.empty")}</div>
            )}
            {userNotes && userNotes.length > 0 && (
              <div className="profile-notes-list">
                {userNotes.map((note) => (
                  <div key={note.id} className="profile-note-item">
                    <div className="profile-note-meta">
                      <span className="profile-note-author">{t("notes.by", { name: note.authorName })}</span>
                      <span className="profile-note-date">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        className="profile-note-delete"
                        title={t("notes.delete")}
                        onClick={() => onDeleteNote?.(note.id, user.userId)}
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                    <div className="profile-note-content">{note.content}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="profile-note-add">
              <textarea
                className="profile-note-textarea"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t("notes.placeholder")}
                maxLength={500}
                rows={2}
              />
              <button
                className="profile-action-btn primary profile-note-submit"
                disabled={!noteText.trim()}
                onClick={() => {
                  if (noteText.trim()) {
                    onAddNote?.(user.userId, noteText.trim());
                    setNoteText("");
                  }
                }}
              >
                <StickyNote size={14} />
                {t("notes.add")}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .profile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 199;
        }
        .profile-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px;
          width: 260px;
          z-index: 200;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.12s ease;
        }
        .profile-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .profile-avatar-wrap {
          flex-shrink: 0;
        }
        .profile-info {
          flex: 1;
          min-width: 0;
        }
        .profile-nickname {
          font-size: 15px;
          font-weight: 700;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .profile-status-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 3px;
        }
        .profile-status-text {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .profile-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .profile-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-muted);
        }
        .profile-role-badge.admin { color: var(--role-admin); }
        .profile-role-badge.operator { color: var(--role-operator); }
        .profile-copy-id {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          padding: 3px 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          margin-left: auto;
        }
        .profile-copy-id:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .profile-actions {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .profile-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          font-size: 13px;
          font-weight: 450;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: background var(--transition-fast), transform var(--transition-fast);
          width: 100%;
          text-align: left;
        }
        .profile-action-btn:hover {
          background: var(--bg-tertiary);
          transform: translateX(2px);
        }
        .profile-action-btn.primary {
          color: var(--accent);
        }
        .profile-action-btn.danger {
          color: var(--danger);
        }
        .profile-action-btn.danger:hover {
          background: var(--danger-dim);
        }
        .profile-custom-status {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          font-size: 11px;
          color: var(--text-muted);
          font-style: italic;
        }
        .profile-custom-status svg {
          flex-shrink: 0;
          opacity: 0.6;
        }
        .profile-detail-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 0;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .profile-detail-row svg {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .profile-bio {
          font-size: 12px;
          color: var(--text-secondary);
          padding: 8px 0;
          line-height: 1.5;
          border-bottom: 1px solid var(--border);
          margin-bottom: 8px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }
        .profile-edit-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .profile-edit-input {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 8px;
          font-size: 12px;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .profile-edit-input:focus {
          border-color: var(--accent);
        }
        .profile-edit-textarea {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 8px;
          font-size: 12px;
          color: var(--text-primary);
          outline: none;
          resize: vertical;
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }
        .profile-edit-textarea:focus {
          border-color: var(--accent);
        }
        .profile-edit-buttons {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }
        .profile-saved-msg {
          font-size: 11px;
          color: var(--success, #4caf50);
          padding: 4px 0;
          text-align: center;
          font-weight: 500;
        }
        .profile-notes-section {
          border-top: 1px solid var(--border);
          margin-top: 8px;
          padding-top: 8px;
        }
        .profile-notes-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .profile-notes-empty {
          font-size: 11px;
          color: var(--text-muted);
          font-style: italic;
          padding: 4px 0;
        }
        .profile-notes-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 140px;
          overflow-y: auto;
          margin-bottom: 6px;
        }
        .profile-note-item {
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          padding: 6px 8px;
        }
        .profile-note-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }
        .profile-note-author {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .profile-note-date {
          font-size: 9px;
          color: var(--text-muted);
          opacity: 0.7;
        }
        .profile-note-delete {
          margin-left: auto;
          color: var(--text-muted);
          opacity: 0.5;
          transition: opacity var(--transition-fast), color var(--transition-fast);
          padding: 2px;
        }
        .profile-note-delete:hover {
          opacity: 1;
          color: var(--danger);
        }
        .profile-note-content {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .profile-note-add {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .profile-note-textarea {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 8px;
          font-size: 11px;
          color: var(--text-primary);
          outline: none;
          resize: vertical;
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }
        .profile-note-textarea:focus {
          border-color: var(--accent);
        }
        .profile-note-submit {
          align-self: flex-end;
          padding: 4px 10px !important;
          font-size: 11px !important;
        }
        .profile-note-submit:disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
