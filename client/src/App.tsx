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
import { StatusSelector } from "./components/StatusSelector";
import { PinnedMessagesPanel } from "./components/PinnedMessagesPanel";
import { BookmarksPanel, BookmarkedMessage, loadBookmarks, addBookmark, removeBookmark, isBookmarked } from "./components/BookmarksPanel";
import { ChannelSettingsModal } from "./components/ChannelSettingsModal";
import { DragDropOverlay } from "./components/DragDropOverlay";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { AdminPanel } from "./components/AdminPanel";
import { ChannelPasswordPrompt } from "./components/ChannelPasswordPrompt";
import { ImageLightbox } from "./components/ImageLightbox";
import { ThreadPanel } from "./components/ThreadPanel";
import { ThemeEditor, loadSavedTheme } from "./components/ThemeEditor";
import { ServerStats } from "./components/ServerStats";
import { MessageForwardDialog } from "./components/MessageForwardDialog";
import { CustomEmojiUpload, loadCustomEmojis, saveCustomEmojis } from "./components/CustomEmojiUpload";
import { NotificationFilters as NotifFiltersPanel, loadNotifFilters as loadNotifFiltersFull, saveNotifFilters as _saveNF } from "./components/NotificationFilters";
import { MessageScheduler, ScheduledMessage, loadScheduledMessages, saveScheduledMessages } from "./components/MessageScheduler";
import { applyChannelOrder, loadChannelOrder, saveChannelOrder } from "./components/ChannelDragReorder";
import { ToastContainer, useToasts } from "./components/ToastContainer";
import { ServerAgreement, hasAcceptedAgreement } from "./components/ServerAgreement";
import { useIdentity } from "./hooks/useIdentity";
import { useWebSocket } from "./hooks/useWebSocket";
import { useChannelMute } from "./hooks/useChannelMute";
import { useIdleDetection } from "./hooks/useIdleDetection";
import { useTabNotification } from "./hooks/useTabNotification";
import { useCompactMode } from "./hooks/useCompactMode";
import { getFileAuthHeaders } from "./lib/crypto";
import { PanelRightClose, PanelRightOpen, Rows3, StretchHorizontal, Palette, TrendingUp, Menu, Users as UsersIcon, Clock, Smile as SmileIcon, Filter } from "lucide-react";

export default function App() {
  const { t } = useTranslation();
  const { identity } = useIdentity();
  const [activeChannel, setActiveChannel] = useState("lobby");
  const [activeDM, setActiveDM] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(() => window.innerWidth > 768);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPins, setShowPins] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showChannelSettings, setShowChannelSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [threadRootId, setThreadRootId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkedMessage[]>(loadBookmarks);
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [forwardMsg, setForwardMsg] = useState<{ content: string; author: string } | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showCustomEmoji, setShowCustomEmoji] = useState(false);
  const [showNotifFilters, setShowNotifFilters] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [customEmojis, setCustomEmojis] = useState(loadCustomEmojis);
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>(loadScheduledMessages);
  const [channelOrder, setChannelOrder] = useState<string[]>(loadChannelOrder);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; nickname: string; content: string } | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [lastReadIds, setLastReadIds] = useState<Record<string, string>>({});
  const [dmUnreadCounts, setDmUnreadCounts] = useState<Record<string, number>>({});
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(loadNotifPrefs);
  const [statusBeforeIdle, setStatusBeforeIdle] = useState<string | null>(null);
  const prevMessagesLenRef = useRef(0);
  const prevDmLenRef = useRef(0);
  const activeChannelRef = useRef(activeChannel);
  const activeDMRef = useRef(activeDM);

  // Load saved custom theme on mount
  useEffect(() => { loadSavedTheme(); }, []);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 5000);
  }, []);

  const ws = useWebSocket({
    identity,
    onError: handleError,
  });

  const { mutedChannels, toggleMute, isMuted } = useChannelMute();
  const { compact, toggleCompact } = useCompactMode();
  const { toasts, addToast, dismissToast } = useToasts();

  // Tab title notifications
  const totalUnread = useMemo(() => {
    return Object.values(unreadCounts).reduce((sum, v) => sum + v, 0) +
      Object.values(dmUnreadCounts).reduce((sum, v) => sum + v, 0);
  }, [unreadCounts, dmUnreadCounts]);
  useTabNotification(totalUnread);

  // Track user join/leave for toasts
  const prevUsersRef = useRef<{ id: string; nick: string }[]>([]);
  useEffect(() => {
    if (ws.status !== "connected") return;
    const currentIds = ws.users.map(u => u.userId);
    const prevEntries = prevUsersRef.current;
    const prevIds = prevEntries.map(e => e.id);
    if (prevIds.length > 0) {
      // New joins
      for (const u of ws.users) {
        if (!prevIds.includes(u.userId)) {
          addToast("join", `${u.nickname} joined`);
        }
      }
      // Leaves
      for (const entry of prevEntries) {
        if (!currentIds.includes(entry.id)) {
          addToast("leave", `${entry.nick} left`);
        }
      }
    }
    prevUsersRef.current = ws.users.map(u => ({ id: u.userId, nick: u.nickname }));
  }, [ws.users, ws.status, addToast]);

  // Idle detection: auto-away after 5 min inactivity
  useIdleDetection({
    timeout: 5 * 60 * 1000,
    onIdle: useCallback(() => {
      const current = ws.users.find(u => u.userId === ws.serverInfo?.userId)?.status;
      if (current && current !== "away") {
        setStatusBeforeIdle(current);
        ws.setStatus("away");
      }
    }, [ws]),
    onActive: useCallback(() => {
      if (statusBeforeIdle) {
        ws.setStatus(statusBeforeIdle);
        setStatusBeforeIdle(null);
      }
    }, [ws, statusBeforeIdle]),
    enabled: ws.status === "connected",
  });

  const handleConnect = (address: string, nick: string) => {
    setServerAddress(address);
    ws.connect(address, nick);
  };

  const handleSelectChannel = (channel: string) => {
    // Check if channel is password-protected
    const ch = ws.channels.find((c) => c.name === channel);
    if (ch?.hasPassword && channel !== activeChannel) {
      setShowPasswordPrompt(channel);
      return;
    }
    // Mark the last message in the current channel as read
    const currentMsgs = ws.messages.filter((m) => m.channel === activeChannel);
    if (currentMsgs.length > 0) {
      setLastReadIds((prev) => ({ ...prev, [activeChannel]: currentMsgs[currentMsgs.length - 1].id }));
    }
    setActiveDM("");
    setActiveChannel(channel);
    ws.joinChannel(channel);
  };

  const handlePasswordSubmit = (password: string) => {
    if (showPasswordPrompt) {
      setActiveDM("");
      setActiveChannel(showPasswordPrompt);
      ws.joinChannel(showPasswordPrompt, password);
      setShowPasswordPrompt(null);
    }
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

  const handleCreateChannelSubmit = (name: string, topic: string, password: string) => {
    ws.createChannel(name, topic, password);
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
            if (!isMuted(msg.channel)) hasUnread = true;
          }
        }
        return counts;
      });
      if (hasUnread) {
        playNotifSound();
        const last = newMsgs[newMsgs.length - 1];
        if (last && last.userId !== currentUserId && !isMuted(last.channel)) {
          showDesktopNotif(last.nickname, last.content);
        }
      }
    }
    prevMessagesLenRef.current = ws.messages.length;
  }, [ws.messages, isMuted]);

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

  const [quoteText, setQuoteText] = useState("");

  const handleSearchClose = useCallback(() => { setShowSearch(false); ws.clearSearch(); }, [ws]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((v) => !v);
      }
      if (e.key === "?" && !isInput) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
      }
      if (e.key === "Escape") {
        if (showShortcuts) { setShowShortcuts(false); return; }
        if (showSearch) { handleSearchClose(); return; }
        if (showPins) { setShowPins(false); return; }
        if (showBookmarks) { setShowBookmarks(false); return; }
        if (replyTo) { setReplyTo(null); return; }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSearch, replyTo, showShortcuts, showPins, showBookmarks, handleSearchClose]);

  const handleQuote = useCallback((text: string, nickname: string) => {
    const quoted = text.split("\n").map((l) => `> ${l}`).join("\n");
    setQuoteText(`${quoted}\n@${nickname} `);
  }, []);

  const handleForward = useCallback((targetChannel: string, comment?: string) => {
    if (!forwardMsg) return;
    const fwdContent = comment
      ? `${comment}\n\n> **Forwarded from ${forwardMsg.author}:**\n> ${forwardMsg.content}`
      : `> **Forwarded from ${forwardMsg.author}:**\n> ${forwardMsg.content}`;
    ws.sendChat(targetChannel, fwdContent);
    setForwardMsg(null);
    addToast("info", t("forward.sent"));
  }, [forwardMsg, ws, addToast, t]);

  const handleForwardMessage = useCallback((messageId: string) => {
    const msg = ws.messages.find((m) => m.id === messageId);
    if (msg) setForwardMsg({ content: msg.content, author: msg.nickname });
  }, [ws.messages]);

  const handleEmojiUpload = useCallback((name: string, file: File) => {
    const url = URL.createObjectURL(file);
    const emoji = { id: Date.now().toString(36), name, url };
    const updated = [...customEmojis, emoji];
    setCustomEmojis(updated);
    saveCustomEmojis(updated);
  }, [customEmojis]);

  const handleEmojiDelete = useCallback((id: string) => {
    const updated = customEmojis.filter((e) => e.id !== id);
    setCustomEmojis(updated);
    saveCustomEmojis(updated);
  }, [customEmojis]);

  const handleScheduleMessage = useCallback((msg: ScheduledMessage) => {
    const updated = [...scheduledMessages, msg];
    setScheduledMessages(updated);
    saveScheduledMessages(updated);
  }, [scheduledMessages]);

  const handleDeleteScheduled = useCallback((id: string) => {
    const updated = scheduledMessages.filter((m) => m.id !== id);
    setScheduledMessages(updated);
    saveScheduledMessages(updated);
  }, [scheduledMessages]);

  // Process scheduled messages every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const due = scheduledMessages.filter((m) => m.scheduledTime <= now);
      if (due.length === 0) return;
      for (const msg of due) {
        ws.sendChat(msg.channel, msg.content);
        addToast("info", `Scheduled message sent to #${msg.channel}`);
      }
      const remaining = scheduledMessages.filter((m) => m.scheduledTime > now);
      setScheduledMessages(remaining);
      saveScheduledMessages(remaining);
    }, 30000);
    return () => clearInterval(interval);
  }, [scheduledMessages, ws, addToast]);

  const handleChannelReorder = useCallback((newOrder: string[]) => {
    setChannelOrder(newOrder);
    saveChannelOrder(newOrder);
  }, []);

  const orderedChannels = useMemo(() => {
    return applyChannelOrder(ws.channels, channelOrder);
  }, [ws.channels, channelOrder]);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const authHeaders = getFileAuthHeaders(identity);
      const protocol = serverAddress.startsWith("wss://") ? "https://" : "http://";
      const base = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "").replace(/:9998/, ":9999");
      const uploadUrl = `${protocol}${base}/files/uploads/`;

      const formData = new FormData();
      formData.append("file", file);

      const resp = await fetch(uploadUrl, {
        method: "POST",
        headers: authHeaders,
        body: formData,
      });

      if (!resp.ok) {
        handleError("File upload failed");
        return;
      }

      const result = await resp.json();
      const fileUrl = `${protocol}${base}/files/${result.path}`;
      ws.sendChat(activeChannel, `[${result.filename}](${fileUrl})`);
    } catch {
      handleError("File upload error");
    }
  }, [serverAddress, activeChannel, ws, handleError, identity]);

  const handleBookmark = useCallback((messageId: string) => {
    if (isBookmarked(messageId)) {
      setBookmarks(removeBookmark(messageId));
    } else {
      const msg = ws.messages.find((m) => m.id === messageId);
      if (msg) {
        setBookmarks(addBookmark({
          id: msg.id,
          channel: msg.channel,
          nickname: msg.nickname,
          content: msg.content,
          timestamp: msg.timestamp,
        }));
      }
    }
  }, [ws.messages]);

  const handleRemoveBookmark = useCallback((messageId: string) => {
    setBookmarks(removeBookmark(messageId));
  }, []);

  if (ws.status === "disconnected" || ws.status === "connecting") {
    return <ConnectDialog onConnect={handleConnect} isConnecting={ws.status === "connecting"} />;
  }

  // Show server agreement modal if needed
  const agreementText = ws.serverInfo?.agreement || "";
  const needsAgreement = agreementText && !agreementAccepted && !hasAcceptedAgreement(serverAddress, agreementText);
  if (needsAgreement) {
    return (
      <ServerAgreement
        agreement={agreementText}
        serverAddress={serverAddress}
        onAccept={() => setAgreementAccepted(true)}
        onDecline={() => { ws.disconnect(); setAgreementAccepted(false); }}
      />
    );
  }

  const handleSearchOpen = () => setShowSearch(true);

  const handleReply = (messageId: string) => {
    const msg = (activeDM ? dmMessagesAsChatMessages : ws.messages).find((m) => m.id === messageId);
    if (msg) setReplyTo({ id: msg.id, nickname: msg.nickname, content: msg.content });
  };

  const handleSendWithReply = (channel: string, content: string) => {
    if (replyTo) {
      ws.sendChatWithReply(channel, content, replyTo.id);
      setReplyTo(null);
    } else {
      ws.sendChat(channel, content);
    }
  };

  const handleStatusChange = (status: string) => {
    ws.setStatus(status);
  };


  const canCreateChannel = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canUpload = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canDownload = ws.serverInfo?.role !== "guest";
  const activeCh = ws.channels.find((c) => c.name === activeChannel);

  return (
    <div className="app-layout">
      {mobileSidebarOpen && <div className="mobile-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />}
      <div className={`app-sidebar-col ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <Sidebar
          serverName={ws.serverInfo?.name || t("app.name")}
          channels={orderedChannels}
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
          userStatus={ws.users.find(u => u.userId === ws.serverInfo?.userId)?.status}
          mutedChannels={mutedChannels}
          onToggleMute={toggleMute}
          onAdminPanel={() => setShowAdmin(true)}
          typingChannels={ws.typingUsers.filter(t => t.userId !== ws.serverInfo?.userId).map(t => t.channel).filter(Boolean)}
          onReorderChannels={handleChannelReorder}
        />
        <div className="app-sidebar-bottom">
          <StatusSelector currentStatus={ws.users.find(u => u.userId === ws.serverInfo?.userId)?.status || "available"} onStatusChange={handleStatusChange} />
          <NotificationSettings prefs={notifPrefs} onChange={setNotifPrefs} />
          <button className="compact-toggle" onClick={toggleCompact} title={compact ? "Comfortable view" : "Compact view"}>
            {compact ? <StretchHorizontal size={14} /> : <Rows3 size={14} />}
          </button>
          <button className="compact-toggle" onClick={() => setShowThemeEditor(true)} title={t("theme.title")}>
            <Palette size={14} />
          </button>
          <button className="compact-toggle" onClick={() => setShowStats(true)} title={t("stats.title")}>
            <TrendingUp size={14} />
          </button>
          <button className="compact-toggle" onClick={() => setShowScheduler(true)} title={t("scheduler.title")}>
            <Clock size={14} />
          </button>
          <button className="compact-toggle" onClick={() => setShowCustomEmoji(true)} title={t("customEmoji.title")}>
            <SmileIcon size={14} />
          </button>
          <button className="compact-toggle" onClick={() => setShowNotifFilters(true)} title={t("notifFilters.title")}>
            <Filter size={14} />
          </button>
          <LanguageSelector />
        </div>
      </div>

      <main className="app-main">
        <div className="mobile-header">
          <button className="mobile-header-btn" onClick={() => setMobileSidebarOpen(true)} aria-label={t("sidebar.openMenu")}>
            <Menu size={18} />
          </button>
          <span className="mobile-header-channel">
            {activeDM ? dmConversations.find(d => d.peerId === activeDM)?.peerNick || "DM" : `#${activeChannel}`}
          </span>
          <button className="mobile-header-btn" onClick={() => setRightPanelOpen(v => !v)} aria-label={t("users.togglePanel")}>
            <UsersIcon size={18} />
          </button>
        </div>
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
          {showPins && (
            <PinnedMessagesPanel
              messages={ws.pinnedMessages}
              onRequestPins={ws.requestPins}
              onUnpin={canCreateChannel ? ws.unpinMessage : undefined}
              onClose={() => setShowPins(false)}
              activeChannel={activeChannel}
              canModerate={canCreateChannel}
            />
          )}
          {showBookmarks && (
            <BookmarksPanel
              bookmarks={bookmarks}
              onRemove={handleRemoveBookmark}
              onClose={() => setShowBookmarks(false)}
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
            onSendMessage={activeDM ? (_ch, content) => ws.sendDM(activeDM, content) : handleSendWithReply}
            onSlashCommand={activeDM ? undefined : handleSlashCommand}
            onTyping={() => activeDM ? ws.sendTyping("", activeDM) : ws.sendTyping(activeChannel)}
            onSearchOpen={handleSearchOpen}
            onReact={ws.addReaction}
            onRemoveReact={ws.removeReaction}
            onEdit={ws.editMessage}
            onDelete={ws.deleteMessage}
            onPin={(msgId) => ws.pinMessage(msgId, activeChannel)}
            onReply={handleReply}
            replyTo={replyTo}
            onCancelReply={() => setReplyTo(null)}
            onLoadHistory={ws.loadHistory}
            historyLoading={ws.historyLoading}
            hasMoreHistory={ws.hasMoreHistory}
            onFileUpload={canUpload ? handleFileUpload : undefined}
            canUpload={canUpload}
            users={ws.users}
            onPinsOpen={() => setShowPins((v) => !v)}
            onBookmarksOpen={() => setShowBookmarks((v) => !v)}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
            onChannelSettings={() => setShowChannelSettings(true)}
            onImageClick={setLightboxSrc}
            lastReadMessageId={lastReadIds[activeChannel]}
            pinnedMessageIds={ws.pinnedMessages.map((p) => p.id)}
            onQuote={handleQuote}
            quotedText={quoteText}
            onQuoteClear={() => setQuoteText("")}
            onThreadOpen={setThreadRootId}
            onForward={handleForwardMessage}
          />

          {threadRootId && (() => {
            const rootMsg = ws.messages.find((m) => m.id === threadRootId);
            if (!rootMsg) return null;
            const threadReplies = ws.messages.filter((m) => m.replyTo === threadRootId);
            return (
              <ThreadPanel
                rootMessage={rootMsg}
                replies={threadReplies}
                currentUserId={ws.serverInfo?.userId || ""}
                currentRole={ws.serverInfo?.role}
                onClose={() => setThreadRootId(null)}
                onReact={ws.addReaction}
                onRemoveReact={ws.removeReaction}
                onEdit={ws.editMessage}
                onDelete={ws.deleteMessage}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked}
                onImageClick={setLightboxSrc}
              />
            );
          })()}

          <button
            className="panel-toggle"
            onClick={() => setRightPanelOpen((v) => !v)}
            title={rightPanelOpen ? "Hide panel" : "Show panel"}
            aria-label={rightPanelOpen ? "Hide panel" : "Show panel"}
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
          identity={identity}
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

      {showChannelSettings && activeCh && (
        <ChannelSettingsModal
          channel={activeCh}
          onSetTopic={ws.setTopic}
          onClose={() => setShowChannelSettings(false)}
          canEdit={canCreateChannel}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}

      {showAdmin && ws.serverInfo && (
        <AdminPanel
          serverName={ws.serverInfo.name}
          motd={ws.serverInfo.motd}
          onUpdateSettings={ws.updateServerSettings}
          onRequestBanList={ws.requestBanList}
          onUnban={ws.unbanUser}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {showPasswordPrompt && (
        <ChannelPasswordPrompt
          channelName={showPasswordPrompt}
          onSubmit={handlePasswordSubmit}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {showThemeEditor && (
        <ThemeEditor onClose={() => setShowThemeEditor(false)} />
      )}

      {showStats && (
        <ServerStats
          messages={ws.messages}
          userCount={ws.users.length}
          channelCount={ws.channels.length}
          serverName={ws.serverInfo?.name || t("app.name")}
          onClose={() => setShowStats(false)}
        />
      )}

      {forwardMsg && (
        <MessageForwardDialog
          messageContent={forwardMsg.content}
          messageAuthor={forwardMsg.author}
          channels={ws.channels}
          currentChannel={activeChannel}
          onForward={handleForward}
          onClose={() => setForwardMsg(null)}
        />
      )}

      {showCustomEmoji && (
        <CustomEmojiUpload
          emojis={customEmojis}
          onUpload={handleEmojiUpload}
          onDelete={handleEmojiDelete}
          onClose={() => setShowCustomEmoji(false)}
        />
      )}

      {showNotifFilters && (
        <NotifFiltersPanel
          filters={loadNotifFiltersFull()}
          channels={ws.channels.map((c) => c.name)}
          users={ws.users}
          onChange={(f) => { _saveNF(f); }}
          onClose={() => setShowNotifFilters(false)}
        />
      )}

      {showScheduler && (
        <MessageScheduler
          activeChannel={activeChannel}
          scheduledMessages={scheduledMessages}
          onSchedule={handleScheduleMessage}
          onDelete={handleDeleteScheduled}
          onClose={() => setShowScheduler(false)}
        />
      )}

      <DragDropOverlay
        onDrop={canUpload ? handleFileUpload : () => {}}
        enabled={canUpload}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

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
          gap: 8px;
          padding: 10px 12px;
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
          padding: 5px;
          border-radius: var(--radius-sm);
          z-index: 2;
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .panel-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .app-right-panel {
          display: flex;
          flex-direction: column;
          width: 200px;
          min-width: 200px;
          border-left: 1px solid var(--border);
          background: var(--bg-secondary);
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      min-width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.2s ease;
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
          background: var(--danger-dim);
          border-bottom: 1px solid var(--danger);
          color: var(--danger);
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          animation: slideDown 0.2s ease;
        }
        .compact-toggle {
          color: var(--text-muted);
          padding: 5px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .compact-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
      `}</style>
    </div>
  );
}
