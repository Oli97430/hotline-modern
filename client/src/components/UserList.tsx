import { Clock, Eye, MessageCircle, Shield, Star, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusDot } from "./StatusSelector";
import { UserAvatar } from "./UserAvatar";

function formatDuration(connectedAt?: number): string {
  if (!connectedAt) return "";
  const diff = Math.floor((Date.now() - connectedAt) / 1000);
  if (diff < 60) return "< 1 min";
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainMins = mins % 60;
  if (hours < 24) return remainMins > 0 ? `${hours}h ${remainMins}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  const remainHours = hours % 24;
  return remainHours > 0 ? `${days}d ${remainHours}h` : `${days}d`;
}

interface UserListProps {
  users: {
    userId: string;
    nickname: string;
    role: string;
    status: string;
    connectedAt?: number;
    customStatus?: string;
  }[];
  currentUserId?: string;
  currentRole?: string;
  onKick?: (userId: string) => void;
  onBan?: (userId: string) => void;
  onOp?: (userId: string) => void;
  onDeop?: (userId: string) => void;
  onDM?: (userId: string) => void;
  onProfileClick?: (userId: string, position: { x: number; y: number }) => void;
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

export function UserList({
  users,
  currentUserId,
  currentRole,
  onKick,
  onBan,
  onOp,
  onDeop,
  onDM,
  onProfileClick,
}: UserListProps) {
  const { t } = useTranslation();
  const [menuUser, setMenuUser] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const canModerate = currentRole === "admin" || currentRole === "operator";

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuUser(null);
    };
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuUser(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEsc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  // Focus first menu item when context menu opens
  useEffect(() => {
    if (menuUser && menuRef.current) {
      const firstBtn = menuRef.current.querySelector<HTMLButtonElement>("button");
      firstBtn?.focus();
    }
  }, [menuUser]);

  const handleUserClick = (userId: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    if (onProfileClick) {
      onProfileClick(userId, { x: rect.left, y: rect.bottom + 4 });
      return;
    }
    if (userId === currentUserId) return;
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

      <ul className="user-entries" role="list" aria-label={t("users.title")}>
        {sorted.map((user) => (
          <li
            key={`${user.userId}-${user.nickname}`}
            className={`user-entry ${user.userId !== currentUserId ? "clickable" : ""} ${user.userId === currentUserId ? "self" : ""}`}
            tabIndex={user.userId !== currentUserId ? 0 : undefined}
            onClick={(e) => handleUserClick(user.userId, e)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && user.userId !== currentUserId) {
                e.preventDefault();
                handleUserClick(user.userId, e as unknown as React.MouseEvent);
              }
            }}
          >
            <div className="user-entry-avatar">
              <UserAvatar userId={user.userId} nickname={user.nickname} size={22} />
              <StatusDot status={user.status} />
            </div>
            <RoleIcon role={user.role} />
            <div className="user-nick-wrap">
              <span className="user-nick" style={{ color: `var(--role-${user.role})` }}>
                {user.nickname}
              </span>
              {user.customStatus && (
                <span className="user-custom-status">
                  <MessageCircle size={9} />
                  {user.customStatus}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {menuUser && menuTarget && (
        <div
          ref={menuRef}
          className="user-menu"
          role="menu"
          aria-label={`Actions for ${menuTarget.nickname}`}
          style={{ position: "fixed", left: menuPos.x, top: menuPos.y }}
        >
          <div className="user-menu-header">
            <span className="user-menu-nick">{menuTarget.nickname}</span>
            <span className="user-menu-role" style={{ color: `var(--role-${menuTarget.role})` }}>
              {t(`roles.${menuTarget.role}`)}
            </span>
          </div>
          <div className="user-menu-pubkey" title={menuTarget.userId}>
            {menuTarget.userId.slice(0, 16)}...
          </div>
          {menuTarget.connectedAt && (
            <div className="user-menu-info">
              <Clock size={12} />
              <span>
                {t("users.onlineSince")}: {formatDuration(menuTarget.connectedAt)}
              </span>
            </div>
          )}
          <div className="user-menu-actions">
            <button
              onClick={() => {
                onDM?.(menuUser);
                setMenuUser(null);
              }}
            >
              {t("users.sendDM")}
            </button>
            {canModerate && menuTarget.role !== "operator" && (
              <button
                onClick={() => {
                  onOp?.(menuUser);
                  setMenuUser(null);
                }}
              >
                {t("roles.operator")}
              </button>
            )}
            {canModerate && menuTarget.role === "operator" && (
              <button
                onClick={() => {
                  onDeop?.(menuUser);
                  setMenuUser(null);
                }}
              >
                {t("roles.member")}
              </button>
            )}
            {canModerate && (
              <button
                onClick={() => {
                  onKick?.(menuUser);
                  setMenuUser(null);
                }}
              >
                Kick
              </button>
            )}
            {canModerate && (
              <button
                className="danger"
                onClick={() => {
                  onBan?.(menuUser);
                  setMenuUser(null);
                }}
              >
                Ban
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .user-list {
          width: 100%;
          min-width: 0;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          height: 100%;
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
        .user-nick-wrap {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .user-nick {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 450;
        }
        .user-custom-status {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-style: italic;
          line-height: 1.3;
        }
        .user-custom-status svg {
          flex-shrink: 0;
          opacity: 0.6;
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
        .user-menu-info {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </aside>
  );
}
