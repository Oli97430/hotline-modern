import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Star, User, Eye } from "lucide-react";
import { StatusDot } from "./StatusSelector";
import { UserAvatar } from "./UserAvatar";

interface UserListProps {
  users: { userId: string; nickname: string; role: string; status: string }[];
  currentUserId?: string;
  currentRole?: string;
  onKick?: (userId: string) => void;
  onBan?: (userId: string) => void;
  onOp?: (userId: string) => void;
  onDeop?: (userId: string) => void;
  onDM?: (userId: string) => void;
}

function RoleIcon({ role }: { role: string }) {
  switch (role) {
    case "admin":
      return <Star size={11} style={{ color: "var(--role-admin)" }} />;
    case "operator":
      return <Shield size={11} style={{ color: "var(--role-operator)" }} />;
    case "guest":
      return <Eye size={11} style={{ color: "var(--role-guest)" }} />;
    default:
      return <User size={11} style={{ color: "var(--role-member)" }} />;
  }
}

export function UserList({ users, currentUserId, currentRole, onKick, onBan, onOp, onDeop, onDM }: UserListProps) {
  const { t } = useTranslation();
  const [menuUser, setMenuUser] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const canModerate = currentRole === "admin" || currentRole === "operator";

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuUser(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleUserClick = (userId: string, e: React.MouseEvent) => {
    if (userId === currentUserId) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setMenuPos({ x: rect.left, y: rect.bottom + 4 });
    setMenuUser(userId === menuUser ? null : userId);
  };

  const sorted = [...users].sort((a, b) => {
    const order = { admin: 0, operator: 1, member: 2, guest: 3 };
    const aOrder = order[a.role as keyof typeof order] ?? 4;
    const bOrder = order[b.role as keyof typeof order] ?? 4;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.nickname.localeCompare(b.nickname);
  });

  const menuTarget = users.find((u) => u.userId === menuUser);

  return (
    <aside className="user-list">
      <div className="user-list-header">
        <span>{t("users.title")}</span>
        <span className="user-count">{users.length}</span>
      </div>

      <ul className="user-entries">
        {sorted.map((user) => (
          <li
            key={`${user.userId}-${user.nickname}`}
            className={`user-entry ${user.userId !== currentUserId ? "clickable" : ""} ${user.userId === currentUserId ? "self" : ""}`}
            onClick={(e) => handleUserClick(user.userId, e)}
          >
            <div className="user-entry-avatar">
              <UserAvatar userId={user.userId} nickname={user.nickname} size={22} />
              <StatusDot status={user.status} />
            </div>
            <RoleIcon role={user.role} />
            <span className="user-nick" style={{ color: `var(--role-${user.role})` }}>
              {user.nickname}
            </span>
          </li>
        ))}
      </ul>

      {menuUser && menuTarget && (
        <div ref={menuRef} className="user-menu" style={{ position: "fixed", left: menuPos.x, top: menuPos.y }}>
          <div className="user-menu-header">
            <span className="user-menu-nick">{menuTarget.nickname}</span>
            <span className="user-menu-role" style={{ color: `var(--role-${menuTarget.role})` }}>
              {t(`roles.${menuTarget.role}`)}
            </span>
          </div>
          <div className="user-menu-pubkey" title={menuTarget.userId}>
            {menuTarget.userId.slice(0, 16)}...
          </div>
          <div className="user-menu-actions">
            <button onClick={() => { onDM?.(menuUser); setMenuUser(null); }}>
              {t("users.sendDM")}
            </button>
            {canModerate && menuTarget.role !== "operator" && (
              <button onClick={() => { onOp?.(menuUser); setMenuUser(null); }}>
                {t("roles.operator")}
              </button>
            )}
            {canModerate && menuTarget.role === "operator" && (
              <button onClick={() => { onDeop?.(menuUser); setMenuUser(null); }}>
                {t("roles.member")}
              </button>
            )}
            {canModerate && (
              <button onClick={() => { onKick?.(menuUser); setMenuUser(null); }}>Kick</button>
            )}
            {canModerate && (
              <button className="danger" onClick={() => { onBan?.(menuUser); setMenuUser(null); }}>Ban</button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .user-list {
          width: 200px;
          min-width: 200px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--border-subtle);
        }
        .user-list-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user-list-header span:first-child {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .user-count {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 1px 7px;
          border-radius: 10px;
        }
        .user-entries {
          list-style: none;
          overflow-y: auto;
          flex: 1;
          padding: 6px 0;
        }
        .user-entry {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          font-size: 13px;
          margin: 1px 6px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .user-entry-avatar {
          position: relative;
          flex-shrink: 0;
        }
        .user-entry-avatar .status-dot {
          position: absolute;
          bottom: -1px;
          right: -1px;
          border: 1.5px solid var(--bg-secondary);
          border-radius: 50%;
        }
        .user-nick {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 450;
        }
        .user-entry.clickable {
          cursor: pointer;
        }
        .user-entry.clickable:hover {
          background: var(--bg-tertiary);
        }
        .user-entry.self {
          opacity: 0.7;
        }
        .user-menu {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 6px;
          min-width: 160px;
          z-index: 200;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .user-menu-header {
          padding: 8px 10px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .user-menu-nick {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .user-menu-role {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .user-menu-pubkey {
          padding: 2px 10px 8px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .user-menu-actions {
          padding-top: 4px;
        }
        .user-menu-actions button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 10px;
          font-size: 13px;
          font-weight: 450;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: background var(--transition-fast);
        }
        .user-menu-actions button:hover {
          background: var(--bg-tertiary);
        }
        .user-menu-actions button.danger {
          color: var(--danger);
        }
        .user-menu-actions button.danger:hover {
          background: var(--danger-dim);
        }
      `}</style>
    </aside>
  );
}
