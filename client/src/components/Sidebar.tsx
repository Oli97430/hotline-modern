import {
  BellOff,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Hash,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { VoiceParticipant } from "../hooks/useVoiceChat";
import type { CategoryData } from "../hooks/useWebSocket";
import { ConnectionQuality } from "./ConnectionQuality";
import { StatusDot } from "./StatusSelector";
import { VoicePanel } from "./VoicePanel";

interface DMConversation {
  peerId: string;
  peerNick: string;
  lastMessage: string;
  unread: number;
}

interface SidebarProps {
  serverName: string;
  channels: { name: string; topic: string; userCount: number; hasPassword?: boolean; categoryId?: number }[];
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
  /** Channels that have unread messages (shown as a dot when count is 0) */
  unreadChannelSet?: Set<string>;
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
  customStatus?: string;
  latency?: number | null;
  connectedSince?: number;
  categories?: CategoryData[];
  onCreateCategory?: (name: string) => void;
  onDeleteCategory?: (id: number) => void;
  onSetChannelCategory?: (channel: string, categoryId: number) => void;
  onRenameCategory?: (id: number, name: string) => void;
}

interface ChannelItemProps {
  ch: { name: string; topic: string; userCount: number; hasPassword?: boolean; categoryId?: number };
  activeChannel: string;
  activeDM: string;
  unreadCounts: Record<string, number>;
  unreadChannelSet?: Set<string>;
  mutedChannels?: string[];
  typingChannels?: string[];
  canCreateChannel: boolean;
  onSelectChannel: (channel: string) => void;
  onDeleteChannel: (name: string) => void;
  onToggleMute?: (channel: string) => void;
  t: (key: string) => string;
}

function ChannelItem({
  ch,
  activeChannel,
  activeDM,
  unreadCounts,
  unreadChannelSet,
  mutedChannels,
  typingChannels,
  canCreateChannel,
  onSelectChannel,
  onDeleteChannel,
  onToggleMute,
  t,
}: ChannelItemProps) {
  return (
    <li
      role="option"
      tabIndex={0}
      aria-selected={ch.name === activeChannel && !activeDM}
      className={`channel-item ${ch.name === activeChannel && !activeDM ? "active" : ""}`}
      onClick={() => onSelectChannel(ch.name)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectChannel(ch.name);
        }
      }}
    >
      {ch.hasPassword ? <Lock size={14} className="channel-icon" /> : <Hash size={14} className="channel-icon" />}
      <span className="channel-name" title={ch.name}>
        {ch.name}
      </span>
      {typingChannels?.includes(ch.name) && <span className="channel-typing-dot" />}
      {(unreadCounts[ch.name] || 0) > 0 && <span className="channel-unread">{unreadCounts[ch.name]}</span>}
      {!(unreadCounts[ch.name] || 0) && unreadChannelSet?.has(ch.name) && <span className="channel-unread-dot" />}
      {mutedChannels?.includes(ch.name) && <BellOff size={11} className="channel-muted-icon" aria-hidden="true" />}
      <span className="channel-count" aria-hidden="true">
        {ch.userCount}
      </span>
      {onToggleMute && (
        <button
          className="channel-mute-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute(ch.name);
          }}
          title={mutedChannels?.includes(ch.name) ? t("sidebar.unmute") : t("sidebar.mute")}
        >
          <BellOff size={11} />
        </button>
      )}
      {canCreateChannel && ch.name !== "lobby" && (
        <button
          className="channel-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteChannel(ch.name);
          }}
          title={t("sidebar.deleteChannel")}
        >
          <Trash2 size={12} />
        </button>
      )}
    </li>
  );
}

const COLLAPSED_KEY = "hotline:collapsed-categories";

function loadCollapsed(): Set<number> {
  try {
    const raw = localStorage.getItem(COLLAPSED_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
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
  unreadChannelSet,
  nickname,
  role,
  userStatus,
  mutedChannels,
  onToggleMute,
  onAdminPanel,
  typingChannels,
  voiceChannel,
  voiceParticipants,
  voiceIsMuted,
  voiceIsDeafened,
  onJoinVoice,
  onLeaveVoice,
  onToggleVoiceMute,
  onToggleVoiceDeafen,
  customStatus,
  latency,
  connectedSince,
  categories = [],
  onDeleteCategory,
  onRenameCategory,
}: SidebarProps) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState<Set<number>>(loadCollapsed);
  const [renamingCategory, setRenamingCategory] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [contextMenu, setContextMenu] = useState<{ catId: number; x: number; y: number } | null>(null);

  useEffect(() => {
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...collapsed]));
  }, [collapsed]);

  // Close context menu on click outside
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [contextMenu]);

  const toggleCollapse = useCallback((catId: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  }, []);

  // Group channels by category
  const sortedCategories = [...categories].sort((a, b) => a.position - b.position);
  const uncategorized = channels.filter((ch) => !ch.categoryId || ch.categoryId === 0);
  const grouped = sortedCategories
    .map((cat) => ({
      category: cat,
      channels: channels.filter((ch) => ch.categoryId === cat.id),
    }))
    .filter((g) => g.channels.length > 0);
  const hasCategories = sortedCategories.length > 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{serverName}</h2>
        <div className="sidebar-header-actions">
          {onAdminPanel && role === "admin" && (
            <button
              className="sidebar-admin"
              onClick={onAdminPanel}
              title={t("admin.title")}
              aria-label={t("admin.title")}
            >
              <Settings size={15} />
            </button>
          )}
          <button
            className="sidebar-disconnect"
            onClick={onDisconnect}
            title={t("sidebar.disconnect")}
            aria-label={t("sidebar.disconnect")}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>{t("sidebar.channels")}</span>
          {canCreateChannel && (
            <button
              className="sidebar-add"
              onClick={onCreateChannel}
              title={t("sidebar.createChannel")}
              aria-label={t("sidebar.createChannel")}
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        {channels.length === 0 && <div className="channel-empty">{t("sidebar.noChannels")}</div>}

        {/* Uncategorized channels (or all if no categories exist) */}
        {(hasCategories ? uncategorized : channels).length > 0 && (
          <>
            {hasCategories && uncategorized.length > 0 && (
              <div className="category-header" onClick={() => toggleCollapse(0)}>
                {collapsed.has(0) ? (
                  <ChevronRight size={12} className="category-chevron" />
                ) : (
                  <ChevronDown size={12} className="category-chevron" />
                )}
                <FolderOpen size={12} className="category-icon" />
                <span className="category-name">{t("category.uncategorized")}</span>
              </div>
            )}
            {!collapsed.has(0) && (
              <ul className="channel-list" role="listbox" aria-label={t("sidebar.channels")}>
                {(hasCategories ? uncategorized : channels).map((ch) => (
                  <ChannelItem
                    key={ch.name}
                    ch={ch}
                    activeChannel={activeChannel}
                    activeDM={activeDM}
                    unreadCounts={unreadCounts}
                    unreadChannelSet={unreadChannelSet}
                    mutedChannels={mutedChannels}
                    typingChannels={typingChannels}
                    canCreateChannel={canCreateChannel}
                    onSelectChannel={onSelectChannel}
                    onDeleteChannel={onDeleteChannel}
                    onToggleMute={onToggleMute}
                    t={t}
                  />
                ))}
              </ul>
            )}
          </>
        )}

        {/* Categorized channel groups */}
        {grouped.map(({ category, channels: catChannels }) => (
          <div key={category.id} className="category-group">
            <div
              className="category-header"
              onClick={() => toggleCollapse(category.id)}
              onContextMenu={(e) => {
                if (role === "admin") {
                  e.preventDefault();
                  setContextMenu({ catId: category.id, x: e.clientX, y: e.clientY });
                }
              }}
            >
              {collapsed.has(category.id) ? (
                <ChevronRight size={12} className="category-chevron" />
              ) : (
                <ChevronDown size={12} className="category-chevron" />
              )}
              <FolderOpen size={12} className="category-icon" />
              {renamingCategory === category.id ? (
                <input
                  className="category-rename-input"
                  value={renameValue}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && renameValue.trim()) {
                      onRenameCategory?.(category.id, renameValue.trim());
                      setRenamingCategory(null);
                    } else if (e.key === "Escape") {
                      setRenamingCategory(null);
                    }
                  }}
                  onBlur={() => {
                    if (renameValue.trim() && renameValue.trim() !== category.name) {
                      onRenameCategory?.(category.id, renameValue.trim());
                    }
                    setRenamingCategory(null);
                  }}
                />
              ) : (
                <span className="category-name">{category.name}</span>
              )}
            </div>
            {!collapsed.has(category.id) && (
              <ul className="channel-list" role="listbox" aria-label={category.name}>
                {catChannels.map((ch) => (
                  <ChannelItem
                    key={ch.name}
                    ch={ch}
                    activeChannel={activeChannel}
                    activeDM={activeDM}
                    unreadCounts={unreadCounts}
                    unreadChannelSet={unreadChannelSet}
                    mutedChannels={mutedChannels}
                    typingChannels={typingChannels}
                    canCreateChannel={canCreateChannel}
                    onSelectChannel={onSelectChannel}
                    onDeleteChannel={onDeleteChannel}
                    onToggleMute={onToggleMute}
                    t={t}
                  />
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Category context menu (admin only) */}
        {contextMenu && (
          <div className="category-context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
            <button
              onClick={() => {
                const cat = categories.find((c) => c.id === contextMenu.catId);
                if (cat) {
                  setRenameValue(cat.name);
                  setRenamingCategory(contextMenu.catId);
                }
                setContextMenu(null);
              }}
            >
              {t("category.rename", "Rename")}
            </button>
            <button
              className="danger"
              onClick={() => {
                onDeleteCategory?.(contextMenu.catId);
                setContextMenu(null);
              }}
            >
              {t("category.delete")}
            </button>
          </div>
        )}

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDM(dm.peerId);
                    }
                  }}
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
          <div className="sidebar-footer-info">
            <span className="sidebar-nick">{nickname}</span>
            {customStatus && <span className="sidebar-custom-status">{customStatus}</span>}
          </div>
          <ConnectionQuality latency={latency ?? null} connectedSince={connectedSince} />
          <span className="sidebar-role" data-role={role}>
            {role}
          </span>
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
        .channel-unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          animation: fadeInScale 0.2s ease;
          box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.4);
        }
        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .sidebar-footer-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .sidebar-nick {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }
        .sidebar-custom-status {
          font-size: 10px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-style: italic;
          line-height: 1.3;
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
        .category-group {
          margin-top: 4px;
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px 4px 12px;
          margin: 2px 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--text-muted);
          user-select: none;
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .category-header:hover {
          color: var(--text-secondary);
          background: var(--bg-tertiary);
        }
        .category-chevron {
          flex-shrink: 0;
          opacity: 0.7;
        }
        .category-icon {
          flex-shrink: 0;
          opacity: 0.6;
        }
        .category-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .category-rename-input {
          flex: 1;
          min-width: 0;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 1px 4px;
          outline: none;
        }
        .category-context-menu {
          position: fixed;
          z-index: 1000;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          min-width: 120px;
        }
        .category-context-menu button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 6px 10px;
          font-size: 12px;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          background: none;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .category-context-menu button:hover {
          background: var(--bg-tertiary);
        }
        .category-context-menu button.danger {
          color: var(--danger);
        }
        .category-context-menu button.danger:hover {
          background: var(--danger-dim);
        }
      `}</style>
    </aside>
  );
}
