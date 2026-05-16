import { useTranslation } from "react-i18next";
import { Shield, Star, User, Eye } from "lucide-react";

interface UserListProps {
  users: { userId: string; nickname: string; role: string; status: string }[];
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

export function UserList({ users }: UserListProps) {
  const { t } = useTranslation();

  const sorted = [...users].sort((a, b) => {
    const order = { admin: 0, operator: 1, member: 2, guest: 3 };
    const aOrder = order[a.role as keyof typeof order] ?? 4;
    const bOrder = order[b.role as keyof typeof order] ?? 4;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.nickname.localeCompare(b.nickname);
  });

  return (
    <aside className="user-list">
      <div className="user-list-header">
        <span>{t("users.title")}</span>
        <span className="user-count">{t("users.online", { count: users.length })}</span>
      </div>

      <ul className="user-entries">
        {sorted.map((user) => (
          <li key={`${user.userId}-${user.nickname}`} className="user-entry">
            <RoleIcon role={user.role} />
            <span className="user-nick" style={{ color: `var(--role-${user.role})` }}>
              {user.nickname}
            </span>
          </li>
        ))}
      </ul>

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
      `}</style>
    </aside>
  );
}
