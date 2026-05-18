import { useTranslation } from "react-i18next";
import { Hash, Plus, LogOut, MessageSquare, Trash2, Lock, BellOff, Settings } from "lucide-react";
import { StatusDot } from "./StatusSelector";
import { VoicePanel } from "./VoicePanel";
import type { VoiceParticipant } from "../hooks/useVoiceChat";

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
  userStatus?: string;
  mutedChannels?: string[];
  onToggleMute?: (channel: string) => void;
  onAdminPanel?: () => void;
  typingChannels?: string[];
  onReorderChannels?: (order: string[]) => void;
  voiceChannel?: string | null;
  voiceParticipants?: VoiceParticipant[];
  voiceIsMuted?: boolean;
  voiceIsDeafened?: boolean;
  onJoinVoice?: (channel: string) => void;
  onLeaveVoice?: () => void;
  onToggleVoiceMute?: () => void;
  onToggleVoiceDeafen?: () => void;
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
  userStatus,
  mutedChannels,
  onToggleMute,
  onAdminPanel,
  typingChannels,
  onReorderChannels,
  voiceChannel,
  voiceParticipants,
  voiceIsMuted,
  voiceIsDeafened,
  onJoinVoice,
  onLeaveVoice,
  onToggleVoiceMute,
  onToggleVoiceDeafen,
}: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{serverName}</h2>
        <div className="sidebar-header-actions">
          {onAdminPanel && (role === "admin") && (
            <button className="sidebar-admin" onClick={onAdminPanel} title={t("admin.title")} aria-label={t("admin.title")}>
              <Settings size={15} />
            </button>
          )}
          <button className="sidebar-disconnect" onClick={onDisconnect} title={t("sidebar.disconnect")} aria-label={t("sidebar.disconnect")}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>{t("sidebar.channels")}</span>
          {canCreateChannel && (
            <button className="sidebar-add" onClick={onCreateChannel} title={t("sidebar.createChannel")} aria-label={t("sidebar.createChannel")}>
              <Plus size={14} />
            </button>
          )}
        </div>

        <ul className="channel-list" role="listbox" aria-label={t("sidebar.channels")}>
          {channels.length === 0 && (
            <li className="channel-empty">{t("sidebar.noChannels")}</li>
          )}
          {channels.map((ch, idx) => (
            <li
              key={ch.name}
              role="option"
              tabIndex={0}
              aria-selected={ch.name === activeChannel && !activeDM}
              aria-label={`${ch.name}${(unreadCounts[ch.name] || 0) > 0 ? `, ${unreadCounts[ch.name]} non lus` : ""}, ${ch.userCount} utilisateurs`}
              className={`channel-item ${ch.name === activeChannel && !activeDM ? "active" : ""}`}
              onClick={() => onSelectChannel(ch.name)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectChannel(ch.name); } }}
              draggable={!!onReorderChannels}
              onDragStart={(e) => { e.dataTransfer.setData("text/plain", String(idx)); }}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
              onDragLeave={(e) => { e.currentTarget.classList.remove("drag-over"); }}
              onDrop={(e) => {
                e.currentTarget.classList.remove("drag-over");
                const fromIdx = parseInt(e.dataTransfer.getData("text/plain"));
                if (isNaN(fromIdx) || fromIdx === idx || !onReorderChannels) return;
                const names = channels.map(c => c.name);
                const [removed] = names.splice(fromIdx, 1);
                names.splice(idx, 0, removed);
                onReorderChannels(names);
              }}
            >
              {ch.hasPassword ? <Lock size={14} className="channel-icon" /> : <Hash size={14} className="channel-icon" />}
              <span className="channel-name" title={ch.name}>{ch.name}</span>
              {typingChannels?.includes(ch.name) && (
                <span className="channel-typing-dot" />
              )}
              {(unreadCounts[ch.name] || 0) > 0 && (
                <span className="channel-unread">{unreadCounts[ch.name]}</span>
              )}
              {mutedChannels?.includes(ch.name) && (
                <BellOff size={11} className="channel-muted-icon" aria-hidden="true" />
              )}
              <span className="channel-count" aria-hidden="true">{ch.userCount}</span>
              {onToggleMute && (
                <button
                  className="channel-mute-btn"
                  onClick={(e) => { e.stopPropagation(); onToggleMute(ch.name); }}
                  title={mutedChannels?.includes(ch.name) ? t("sidebar.unmute") : t("sidebar.mute")}
                >
                  <BellOff size={11} />
                </button>
              )}
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

        {onJoinVoice && (
          <VoicePanel
            voiceChannel={voiceChannel ?? null}
            participants={voiceParticipants ?? []}
            isMuted={voiceIsMuted ?? false}
            isDeafened={voiceIsDeafened ?? false}
            onJoin={onJoinVoice}
            onLeave={onLeaveVoice ?? (() => {})}
            onToggleMute={onToggleVoiceMute ?? (() => {})}
            onToggleDeafen={onToggleVoiceDeafen ?? (() => {})}
            activeChannel={activeChannel}
          />
        )}

        {dmConversations.length > 0 && (
          <>
            <div className="sidebar-section-header dm-header">
              <span>{t("sidebar.directMessages")}</span>
            </div>
            <ul className="channel-list">
              {dmConversations.map((dm) => (
                <li
                  key={dm.peerId}
                  role="option"
                  tabIndex={0}
                  aria-selected={activeDM === dm.peerId}
                  aria-label={`${dm.peerNick}${dm.unread > 0 ? `, ${dm.unread} non lus` : ""}`}
                  className={`channel-item ${activeDM === dm.peerId ? "active" : ""}`}
                  onClick={() => onSelectDM(dm.peerId)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectDM(dm.peerId); } }}
                >
                  <MessageSquare size={14} className="channel-icon" />
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
          <StatusDot status={userStatus || "available"} />
          <span className="sidebar-nick">{nickname}</span>
          <span className="sidebar-role" data-role={role}>{role}</span>
        </div>
      )}

      <style>{`
        .sidebar {
          width: 100%;
          min-width: 0;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .sidebar-header {
          padding: 16px 16px 14px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sidebar-header h2 {
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.2px;
          flex: 1;
        }
        .sidebar-header-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }
        .sidebar-admin {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-admin:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .sidebar-disconnect {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-disconnect:hover {
          color: var(--danger);
          background: var(--danger-dim);
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
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .sidebar-section-header.dm-header {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .sidebar-add {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-add:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .channel-list {
          list-style: none;
        }
        .channel-empty {
          padding: 8px 16px;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .channel-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 16px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: background var(--transition-fast), color var(--transition-fast);
          font-size: 14px;
          margin: 1px 8px;
          border-radius: var(--radius-sm);
        }
        .channel-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .channel-item.active {
          background: var(--accent-dim);
          color: var(--accent);
          font-weight: 500;
        }
        .channel-item.drag-over {
          border-top: 2px solid var(--accent);
          padding-top: 4px;
        }
        .channel-item.active .channel-icon {
          color: var(--accent);
          opacity: 1;
        }
        .channel-icon {
          flex-shrink: 0;
          opacity: 0.7;
        }
        .channel-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 450;
        }
        .channel-count {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 500;
        }
        .channel-muted-icon {
          color: var(--text-muted);
          opacity: 0.5;
          flex-shrink: 0;
        }
        .channel-mute-btn {
          opacity: 0;
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .channel-item:hover .channel-mute-btn {
          opacity: 1;
        }
        .channel-mute-btn:hover {
          color: var(--accent);
        }
        .channel-delete {
          opacity: 0;
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .channel-item:hover .channel-delete {
          opacity: 1;
        }
        .channel-delete:hover {
          color: var(--danger);
        }
        .channel-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: typingPulse 1.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes typingPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .channel-unread {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          background: var(--accent);
          padding: 1px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          line-height: 1.5;
          animation: fadeInScale 0.2s ease;
          box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.3);
        }
        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
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
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-muted);
        }
        .sidebar-role[data-role="admin"] { color: var(--role-admin); }
        .sidebar-role[data-role="operator"] { color: var(--role-operator); }
      `}</style>
    </aside>
  );
}
