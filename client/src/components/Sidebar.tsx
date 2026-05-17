import { useTranslation } from "react-i18next";
import { Hash, Plus, LogOut, Circle, MessageSquare, Trash2, Lock } from "lucide-react";

interface DMConversation {
  peerId: string;
  peerNick: string;
  lastMessage: string;
  unread: number;
}

interface SidebarProps {
  serverName: string;
  channels: { name: string; topic: string; userCount: number; hasPassword?: boolean }[];
  activeChannel: string;
  activeDM: string;
  dmConversations: DMConversation[];
  onSelectChannel: (channel: string) => void;
  onSelectDM: (peerId: string) => void;
  onCreateChannel: () => void;
  onDeleteChannel: (name: string) => void;
  onDisconnect: () => void;
  canCreateChannel: boolean;
  unreadCounts: Record<string, number>;
  nickname: string;
  role: string;
}

export function Sidebar({
  serverName,
  channels,
  activeChannel,
  activeDM,
  dmConversations,
  onSelectChannel,
  onSelectDM,
  onCreateChannel,
  onDeleteChannel,
  onDisconnect,
  canCreateChannel,
  unreadCounts,
  nickname,
  role,
}: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{serverName}</h2>
        <button className="sidebar-disconnect" onClick={onDisconnect} title={t("sidebar.disconnect")}>
          <LogOut size={16} />
        </button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>{t("sidebar.channels")}</span>
          {canCreateChannel && (
            <button className="sidebar-add" onClick={onCreateChannel} title={t("sidebar.createChannel")}>
              <Plus size={14} />
            </button>
          )}
        </div>

        <ul className="channel-list">
          {channels.map((ch) => (
            <li
              key={ch.name}
              className={`channel-item ${ch.name === activeChannel && !activeDM ? "active" : ""}`}
              onClick={() => onSelectChannel(ch.name)}
            >
              {ch.hasPassword ? <Lock size={14} /> : <Hash size={14} />}
              <span className="channel-name">{ch.name}</span>
              {(unreadCounts[ch.name] || 0) > 0 && (
                <span className="channel-unread">{unreadCounts[ch.name]}</span>
              )}
              <span className="channel-count">{ch.userCount}</span>
              {canCreateChannel && ch.name !== "lobby" && (
                <button
                  className="channel-delete"
                  onClick={(e) => { e.stopPropagation(); onDeleteChannel(ch.name); }}
                  title={t("sidebar.deleteChannel")}
                >
                  <Trash2 size={12} />
                </button>
              )}
            </li>
          ))}
        </ul>

        {dmConversations.length > 0 && (
          <>
            <div className="sidebar-section-header" style={{ marginTop: 12 }}>
              <span>{t("sidebar.directMessages")}</span>
            </div>
            <ul className="channel-list">
              {dmConversations.map((dm) => (
                <li
                  key={dm.peerId}
                  className={`channel-item ${activeDM === dm.peerId ? "active" : ""}`}
                  onClick={() => onSelectDM(dm.peerId)}
                >
                  <MessageSquare size={14} />
                  <span className="channel-name">{dm.peerNick}</span>
                  {dm.unread > 0 && <span className="channel-unread">{dm.unread}</span>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {nickname && (
        <div className="sidebar-footer">
          <Circle size={8} className="status-dot" />
          <span className="sidebar-nick">{nickname}</span>
          <span className="sidebar-role">{role}</span>
        </div>
      )}

      <style>{`
        .sidebar {
          width: 240px;
          min-width: 240px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sidebar-header h2 {
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-disconnect {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .sidebar-disconnect:hover {
          color: var(--danger);
        }
        .sidebar-section {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
        }
        .sidebar-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .sidebar-add {
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .sidebar-add:hover {
          color: var(--accent);
        }
        .channel-list {
          list-style: none;
        }
        .channel-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: background 0.15s, color 0.15s;
          font-size: 14px;
        }
        .channel-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .channel-item.active {
          background: var(--accent-dim);
          color: var(--accent);
        }
        .channel-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .channel-count {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 1px 5px;
          border-radius: 8px;
        }
        .channel-delete {
          opacity: 0;
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          transition: opacity 0.15s, color 0.15s;
        }
        .channel-item:hover .channel-delete {
          opacity: 1;
        }
        .channel-delete:hover {
          color: var(--danger);
        }
        .channel-unread {
          font-size: 10px;
          font-weight: 700;
          color: var(--bg-primary);
          background: var(--accent);
          padding: 1px 5px;
          border-radius: 8px;
          min-width: 16px;
          text-align: center;
        }
        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .status-dot {
          color: #22c55e;
          fill: #22c55e;
          flex-shrink: 0;
        }
        .sidebar-nick {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }
        .sidebar-role {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>
    </aside>
  );
}
