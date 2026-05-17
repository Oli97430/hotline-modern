import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Star, User, Eye } from "lucide-react";
import { StatusDot } from "./StatusSelector";

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
      return <Star size={12} style={{ color: "var(--role-admin)" }} />;
    case "operator":
      return <Shield size={12} style={{ color: "var(--role-operator)" }} />;
    case "guest":
      return <Eye size={12} style={{ color: "var(--role-guest)" }} />;
    default:
      return <User size={12} style={{ color: "var(--role-member)" }} />;
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
        <span className="user-count">{t("users.online", { count: users.length })}</span>
      </div>

      <ul className="user-entries">
        {sorted.map((user) => (
          <li
            key={`${user.userId}-${user.nickname}`}
            className={`user-entry ${user.userId !== currentUserId ? "clickable" : ""}`}
            onClick={(e) => handleUserClick(user.userId, e)}
          >
            <StatusDot status={user.status} />
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
      )}

      <style>{`
        .user-list {
          width: 200px;
          min-width: 200px;
          background: var(--bg-secondary);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .user-list-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .user-list-header span:first-child {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .user-count {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .user-entries {
          list-style: none;
          overflow-y: auto;
          flex: 1;
          padding: 8px 0;
        }
        .user-entry {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 16px;
          font-size: 13px;
        }
        .user-nick {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-entry.clickable {
          cursor: pointer;
          border-radius: 4px;
        }
        .user-entry.clickable:hover {
          background: var(--bg-tertiary);
        }
        .user-menu {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 4px;
          min-width: 120px;
          z-index: 200;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          animation: fadeInScale 0.1s ease;
        }
        .user-menu-header {
          padding: 6px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }
        .user-menu-nick {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .user-menu-role {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .user-menu-pubkey {
          padding: 2px 10px 6px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          margin-bottom: 4px;
        }
        .user-menu button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 6px 10px;
          font-size: 13px;
          border-radius: 4px;
          color: var(--text-primary);
        }
        .user-menu button:hover {
          background: var(--bg-tertiary);
        }
        .user-menu button.danger {
          color: var(--danger);
        }
        .user-menu button.danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </aside>
  );
}
