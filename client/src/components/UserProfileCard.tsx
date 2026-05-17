import { useTranslation } from "react-i18next";
import { Shield, Star, User, Eye, MessageSquare, Copy } from "lucide-react";
import { StatusDot } from "./StatusSelector";

interface UserProfileCardProps {
  user: { userId: string; nickname: string; role: string; status: string };
  position: { x: number; y: number };
  onClose: () => void;
  onDM: (userId: string) => void;
  onKick?: (userId: string) => void;
  onBan?: (userId: string) => void;
  onOp?: (userId: string) => void;
  onDeop?: (userId: string) => void;
  canModerate: boolean;
  isSelf: boolean;
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

export function UserProfileCard({ user, position, onClose, onDM, onKick, onBan, onOp, onDeop, canModerate, isSelf }: UserProfileCardProps) {
  const { t } = useTranslation();

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.userId);
  };

  return (
    <>
      <div className="profile-backdrop" onClick={onClose} />
      <div className="profile-card" style={{ position: "fixed", left: position.x, top: position.y }}>
        <div className="profile-card-header">
          <div className="profile-avatar" style={{ borderColor: `var(--role-${user.role})` }}>
            {user.nickname.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <span className="profile-nickname" style={{ color: `var(--role-${user.role})` }}>
              {user.nickname}
            </span>
            <div className="profile-status-row">
              <StatusDot status={user.status} />
              <span className="profile-status-text">{t(`status.${user.status}`)}</span>
            </div>
          </div>
        </div>

        <div className="profile-meta">
          <RoleBadge role={user.role} />
          <button className="profile-copy-id" onClick={handleCopyId} title={t("profile.copyId")}>
            <Copy size={11} />
            <span>{user.userId.slice(0, 12)}...</span>
          </button>
        </div>

        {!isSelf && (
          <div className="profile-actions">
            <button className="profile-action-btn primary" onClick={() => { onDM(user.userId); onClose(); }}>
              <MessageSquare size={14} />
              {t("users.sendDM")}
            </button>
            {canModerate && user.role !== "operator" && user.role !== "admin" && (
              <button className="profile-action-btn" onClick={() => { onOp?.(user.userId); onClose(); }}>
                <Shield size={14} />
                {t("profile.promote")}
              </button>
            )}
            {canModerate && user.role === "operator" && (
              <button className="profile-action-btn" onClick={() => { onDeop?.(user.userId); onClose(); }}>
                <User size={14} />
                {t("profile.demote")}
              </button>
            )}
            {canModerate && (
              <>
                <button className="profile-action-btn danger" onClick={() => { onKick?.(user.userId); onClose(); }}>
                  {t("profile.kick")}
                </button>
                <button className="profile-action-btn danger" onClick={() => { onBan?.(user.userId); onClose(); }}>
                  {t("profile.ban")}
                </button>
              </>
            )}
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
        .profile-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          border: 2px solid;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
      `}</style>
    </>
  );
}
