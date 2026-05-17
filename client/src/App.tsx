import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ConnectDialog } from "./components/ConnectDialog";
import { Sidebar } from "./components/Sidebar";
import { ChatPanel } from "./components/ChatPanel";
import { UserList } from "./components/UserList";
import { FileBrowser } from "./components/FileBrowser";
import { ServerBanner } from "./components/ServerBanner";
import { LanguageSelector } from "./components/LanguageSelector";
import { CreateChannelModal } from "./components/CreateChannelModal";
import { SearchPanel } from "./components/SearchPanel";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { NotificationSettings, NotifPrefs, loadNotifPrefs } from "./components/NotificationSettings";
import { useIdentity } from "./hooks/useIdentity";
import { useWebSocket } from "./hooks/useWebSocket";
import { getPublicKeyHex, signMessage } from "./lib/crypto";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function App() {
  const { t } = useTranslation();
  const { identity } = useIdentity();
  const [activeChannel, setActiveChannel] = useState("lobby");
  const [activeDM, setActiveDM] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [dmUnreadCounts, setDmUnreadCounts] = useState<Record<string, number>>({});
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(loadNotifPrefs);
  const prevMessagesLenRef = useRef(0);
  const prevDmLenRef = useRef(0);
  const activeChannelRef = useRef(activeChannel);
  const activeDMRef = useRef(activeDM);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  }, []);

  const ws = useWebSocket({
    identity,
    onError: handleError,
  });

  const handleConnect = (address: string, nick: string) => {
    setServerAddress(address);
    ws.connect(address, nick);
  };

  const handleSelectChannel = (channel: string) => {
    setActiveDM("");
    setActiveChannel(channel);
    ws.joinChannel(channel);
  };

  const handleSelectDM = (peerId: string) => {
    setActiveDM(peerId);
    setDmUnreadCounts((prev) => ({ ...prev, [peerId]: 0 }));
  };

  const handleDeleteChannel = (name: string) => {
    ws.deleteChannel(name);
    if (activeChannel === name) {
      setActiveChannel("lobby");
      ws.joinChannel("lobby");
    }
  };

  const handleCreateChannel = () => {
    setShowCreateModal(true);
  };

  const handleCreateChannelSubmit = (name: string, topic: string) => {
    ws.createChannel(name, topic);
    setTimeout(() => {
      handleSelectChannelWithClear(name);
      ws.requestChannelList();
    }, 300);
  };

  const handleSlashCommand = useCallback(
    (command: string, args: string[]) => {
      const findUserByNick = (nick: string) =>
        ws.users.find((u) => u.nickname.toLowerCase() === nick.toLowerCase());

      switch (command) {
        case "kick": {
          const user = findUserByNick(args[0] || "");
          if (user) ws.kickUser(user.userId);
          break;
        }
        case "ban": {
          const user = findUserByNick(args[0] || "");
          if (user) ws.banUser(user.userId);
          break;
        }
        case "op": {
          const user = findUserByNick(args[0] || "");
          if (user) ws.setUserRole(user.userId, "operator");
          break;
        }
        case "deop": {
          const user = findUserByNick(args[0] || "");
          if (user) ws.setUserRole(user.userId, "member");
          break;
        }
        case "topic": {
          const topic = args.join(" ");
          if (topic) ws.setTopic(activeChannel, topic);
          break;
        }
      }
    },
    [ws, activeChannel]
  );

  const notifPrefsRef = useRef(notifPrefs);
  useEffect(() => { notifPrefsRef.current = notifPrefs; }, [notifPrefs]);

  const playNotifSound = useCallback(() => {
    if (!notifPrefsRef.current.soundEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }, []);

  useEffect(() => {
    activeChannelRef.current = activeChannel;
  }, [activeChannel]);

  useEffect(() => {
    activeDMRef.current = activeDM;
  }, [activeDM]);

  useEffect(() => {
    if (ws.messages.length > prevMessagesLenRef.current) {
      const newMsgs = ws.messages.slice(prevMessagesLenRef.current);
      const currentChannel = activeChannelRef.current;
      const currentUserId = ws.serverInfo?.userId;
      let hasUnread = false;
      setUnreadCounts((prev) => {
        const counts = { ...prev };
        for (const msg of newMsgs) {
          if (msg.channel !== currentChannel && msg.userId !== currentUserId) {
            counts[msg.channel] = (counts[msg.channel] || 0) + 1;
            hasUnread = true;
          }
        }
        return counts;
      });
      if (hasUnread) {
        playNotifSound();
        const last = newMsgs[newMsgs.length - 1];
        if (last && last.userId !== currentUserId) showDesktopNotif(last.nickname, last.content);
      }
    }
    prevMessagesLenRef.current = ws.messages.length;
  }, [ws.messages]);

  useEffect(() => {
    if (ws.dmMessages.length > prevDmLenRef.current) {
      const newDms = ws.dmMessages.slice(prevDmLenRef.current);
      const currentUserId = ws.serverInfo?.userId;
      const currentDM = activeDMRef.current;
      for (const dm of newDms) {
        const peerId = dm.from === currentUserId ? dm.to : dm.from;
        if (peerId !== currentDM && dm.from !== currentUserId) {
          setDmUnreadCounts((prev) => ({ ...prev, [peerId]: (prev[peerId] || 0) + 1 }));
          playNotifSound();
          showDesktopNotif(dm.nickname, dm.content);
        }
      }
    }
    prevDmLenRef.current = ws.dmMessages.length;
  }, [ws.dmMessages]);

  const showDesktopNotif = useCallback((title: string, body: string) => {
    if (!notifPrefsRef.current.desktopEnabled) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
      return;
    }
    if (Notification.permission === "granted" && document.hidden) {
      new Notification(title, { body, icon: "/logo.svg" });
    }
  }, []);

  const dmConversations = useMemo(() => {
    const currentUserId = ws.serverInfo?.userId;
    if (!currentUserId) return [];
    const convos = new Map<string, { peerId: string; peerNick: string; lastMessage: string; unread: number; ts: number }>();
    for (const dm of ws.dmMessages) {
      const peerId = dm.from === currentUserId ? dm.to : dm.from;
      const peerNick = dm.from === currentUserId
        ? (ws.users.find((u) => u.userId === peerId)?.nickname || peerId.slice(0, 8))
        : dm.nickname;
      const existing = convos.get(peerId);
      if (!existing || dm.timestamp > existing.ts) {
        convos.set(peerId, {
          peerId,
          peerNick,
          lastMessage: dm.content,
          unread: dmUnreadCounts[peerId] || 0,
          ts: dm.timestamp,
        });
      }
    }
    return Array.from(convos.values()).sort((a, b) => b.ts - a.ts);
  }, [ws.dmMessages, ws.serverInfo?.userId, ws.users, dmUnreadCounts]);

  const handleSelectChannelWithClear = (channel: string) => {
    setUnreadCounts((prev) => ({ ...prev, [channel]: 0 }));
    handleSelectChannel(channel);
  };

  const dmMessagesAsChatMessages = useMemo(() => {
    if (!activeDM || !ws.serverInfo?.userId) return [];
    const myId = ws.serverInfo.userId;
    return ws.dmMessages
      .filter((dm) => (dm.from === myId && dm.to === activeDM) || (dm.from === activeDM && dm.to === myId))
      .map((dm) => ({
        id: dm.id,
        channel: "__dm__",
        userId: dm.from,
        nickname: dm.nickname,
        content: dm.content,
        role: dm.role,
        timestamp: dm.timestamp,
      }));
  }, [ws.dmMessages, activeDM, ws.serverInfo?.userId]);

  if (ws.status === "disconnected" || ws.status === "connecting") {
    return <ConnectDialog onConnect={handleConnect} isConnecting={ws.status === "connecting"} />;
  }

  const handleSearchOpen = () => setShowSearch(true);
  const handleSearchClose = () => { setShowSearch(false); ws.clearSearch(); };

  const canCreateChannel = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canUpload = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canDownload = ws.serverInfo?.role !== "guest";
  const activeCh = ws.channels.find((c) => c.name === activeChannel);

  const pubKeyHex = getPublicKeyHex(identity);
  const sig = signMessage(pubKeyHex, identity.secretKey);

  return (
    <div className="app-layout">
      <div className="app-sidebar-col">
        <Sidebar
          serverName={ws.serverInfo?.name || t("app.name")}
          channels={ws.channels}
          activeChannel={activeChannel}
          activeDM={activeDM}
          dmConversations={dmConversations}
          onSelectChannel={handleSelectChannelWithClear}
          onSelectDM={handleSelectDM}
          onCreateChannel={handleCreateChannel}
          onDeleteChannel={handleDeleteChannel}
          onDisconnect={ws.disconnect}
          canCreateChannel={canCreateChannel}
          unreadCounts={unreadCounts}
          nickname={ws.serverInfo?.userId ? (ws.users.find(u => u.userId === ws.serverInfo?.userId)?.nickname || "") : ""}
          role={ws.serverInfo?.role || ""}
        />
        <div className="app-sidebar-bottom">
          <NotificationSettings prefs={notifPrefs} onChange={setNotifPrefs} />
          <LanguageSelector />
        </div>
      </div>

      <main className="app-main">
        <ConnectionStatus status={ws.status} reconnectIn={ws.reconnectIn} />
        {ws.serverInfo?.motd && <ServerBanner motd={ws.serverInfo.motd} />}

        {error && (
          <div className="app-error">{error}</div>
        )}

        <div className="app-chat-row">
          {showSearch && (
            <SearchPanel
              onSearch={ws.search}
              onClose={handleSearchClose}
              results={ws.searchResults}
              activeChannel={activeChannel}
            />
          )}
          <ChatPanel
            messages={activeDM ? dmMessagesAsChatMessages : ws.messages}
            activeChannel={activeChannel}
            channelTopic={activeCh?.topic}
            currentUserId={ws.serverInfo?.userId || ""}
            currentRole={ws.serverInfo?.role}
            typingUsers={ws.typingUsers}
            dmMode={activeDM ? { peerId: activeDM, peerNick: dmConversations.find((d) => d.peerId === activeDM)?.peerNick || activeDM.slice(0, 8) } : undefined}
            onSendMessage={activeDM ? (_ch, content) => ws.sendDM(activeDM, content) : ws.sendChat}
            onSlashCommand={activeDM ? undefined : handleSlashCommand}
            onTyping={() => activeDM ? ws.sendTyping("", activeDM) : ws.sendTyping(activeChannel)}
            onSearchOpen={handleSearchOpen}
            onReact={ws.addReaction}
            onRemoveReact={ws.removeReaction}
            onEdit={ws.editMessage}
            onDelete={ws.deleteMessage}
            onPin={(msgId) => ws.pinMessage(msgId, activeChannel)}
          />

          <button
            className="panel-toggle"
            onClick={() => setRightPanelOpen((v) => !v)}
            title={rightPanelOpen ? "Hide panel" : "Show panel"}
          >
            {rightPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
          </button>
        </div>
      </main>

      <div className={`app-right-panel ${rightPanelOpen ? "open" : "closed"}`}>
        <UserList
          users={ws.users}
          currentUserId={ws.serverInfo?.userId}
          currentRole={ws.serverInfo?.role}
          onKick={ws.kickUser}
          onBan={ws.banUser}
          onOp={(uid) => ws.setUserRole(uid, "operator")}
          onDeop={(uid) => ws.setUserRole(uid, "member")}
          onDM={handleSelectDM}
        />
        <FileBrowser
          serverAddress={serverAddress}
          publicKey={pubKeyHex}
          signature={sig}
          canUpload={canUpload}
          canDownload={canDownload}
        />
      </div>

      {showCreateModal && (
        <CreateChannelModal
          onSubmit={handleCreateChannelSubmit}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      <style>{`
        .app-layout {
          display: flex;
          height: 100%;
          width: 100%;
        }
        .app-sidebar-col {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
        }
        .app-sidebar-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-top: 1px solid var(--border);
        }
        .app-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .app-chat-row {
          flex: 1;
          display: flex;
          min-height: 0;
          position: relative;
        }
        .panel-toggle {
          position: absolute;
          right: 8px;
          top: 10px;
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          z-index: 2;
          transition: color 0.2s;
        }
        .panel-toggle:hover {
          color: var(--accent);
        }
        .app-right-panel {
          display: flex;
          flex-direction: column;
          width: 200px;
          min-width: 200px;
          border-left: 1px solid var(--border);
          background: var(--bg-secondary);
          transition: width 0.25s ease, min-width 0.25s ease, opacity 0.2s ease;
          overflow: hidden;
        }
        .app-right-panel.closed {
          width: 0;
          min-width: 0;
          border-left: none;
          opacity: 0;
        }
        .app-error {
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.1);
          border-bottom: 1px solid var(--danger);
          color: var(--danger);
          font-size: 13px;
          text-align: center;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
