import {
  Clock,
  Filter,
  Link as LinkIcon,
  Menu,
  Palette,
  PanelRightClose,
  PanelRightOpen,
  Rows3,
  Smile as SmileIcon,
  StretchHorizontal,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminPanel } from "./components/AdminPanel";
import {
  addBookmark,
  type BookmarkedMessage,
  BookmarksPanel,
  isBookmarked,
  loadBookmarks,
  removeBookmark,
} from "./components/BookmarksPanel";
import { applyChannelOrder, loadChannelOrder, saveChannelOrder } from "./components/ChannelDragReorder";
import { ChannelPasswordPrompt } from "./components/ChannelPasswordPrompt";
import { ChannelSettingsModal } from "./components/ChannelSettingsModal";
import { ChatPanel } from "./components/ChatPanel";
import { ConnectDialog } from "./components/ConnectDialog";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { CreateChannelModal } from "./components/CreateChannelModal";
import { CustomEmojiUpload } from "./components/CustomEmojiUpload";
import { DragDropOverlay } from "./components/DragDropOverlay";
import { FileBrowser } from "./components/FileBrowser";
import { ImageLightbox } from "./components/ImageLightbox";
import { InvitePanel } from "./components/InvitePanel";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { LanguageSelector } from "./components/LanguageSelector";
import { MessageForwardDialog } from "./components/MessageForwardDialog";
import {
  loadScheduledMessages,
  MessageScheduler,
  type ScheduledMessage,
  saveScheduledMessages,
} from "./components/MessageScheduler";
import {
  saveNotifFilters as _saveNF,
  shouldNotify as checkNotifFilter,
  loadNotifFilters as loadNotifFilterCfg,
  loadNotifFilters as loadNotifFiltersFull,
  NotificationFilters as NotifFiltersPanel,
} from "./components/NotificationFilters";
import { loadNotifPrefs, NotificationSettings, type NotifPrefs } from "./components/NotificationSettings";
import { PinnedMessagesPanel } from "./components/PinnedMessagesPanel";
import { ResizeDivider } from "./components/ResizeDivider";
import { SearchPanel } from "./components/SearchPanel";
import { hasAcceptedAgreement, ServerAgreement } from "./components/ServerAgreement";
import { ServerBanner } from "./components/ServerBanner";
import { ServerStats } from "./components/ServerStats";
import { Sidebar } from "./components/Sidebar";
import { StatusSelector } from "./components/StatusSelector";
import { loadSavedTheme, ThemeEditor } from "./components/ThemeEditor";
import { ThreadPanel } from "./components/ThreadPanel";
import { ToastContainer, useToasts } from "./components/ToastContainer";
import { UserList } from "./components/UserList";
import { UserProfileCard } from "./components/UserProfileCard";
import { useChannelMute } from "./hooks/useChannelMute";
import { useCompactMode } from "./hooks/useCompactMode";
import { useIdentity } from "./hooks/useIdentity";
import { useIdleDetection } from "./hooks/useIdleDetection";
import { useNotifications } from "./hooks/useNotifications";
import { useTabNotification } from "./hooks/useTabNotification";
import { useVoiceChat } from "./hooks/useVoiceChat";
import { useWebSocket } from "./hooks/useWebSocket";
import { getBoxPublicKeyHex, getFileAuthHeaders } from "./lib/crypto";

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
  const [showInvites, setShowInvites] = useState(false);
  const [showNotifFilters, setShowNotifFilters] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>(loadScheduledMessages);
  const [channelOrder, setChannelOrder] = useState<string[]>(loadChannelOrder);
  const [profileUser, setProfileUser] = useState<{ userId: string; position: { x: number; y: number } } | null>(null);

  // Resizable panel widths (persisted in localStorage)
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      return Number(localStorage.getItem("hotline-sidebar-w")) || 240;
    } catch {
      return 240;
    }
  });
  const [rightPanelWidth, setRightPanelWidth] = useState(() => {
    try {
      return Number(localStorage.getItem("hotline-right-w")) || 200;
    } catch {
      return 200;
    }
  });
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
  useEffect(() => {
    loadSavedTheme();
  }, []);

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

  const voice = useVoiceChat({
    wsRef: ws.wsRef,
    currentUserId: ws.serverInfo?.userId || "",
  });
  const {
    notify,
    permissionGranted: _notifPermOk,
    requestPermission: _reqNotifPerm,
  } = useNotifications({
    enabled: notifPrefs.desktopEnabled,
    soundEnabled: notifPrefs.soundEnabled,
  });

  // Tab title notifications
  const totalUnread = useMemo(() => {
    return (
      Object.values(unreadCounts).reduce((sum, v) => sum + v, 0) +
      Object.values(dmUnreadCounts).reduce((sum, v) => sum + v, 0)
    );
  }, [unreadCounts, dmUnreadCounts]);
  useTabNotification(totalUnread);

  // Track user join/leave for toasts
  const prevUsersRef = useRef<{ id: string; nick: string }[]>([]);
  useEffect(() => {
    if (ws.status !== "connected") return;
    const currentIds = ws.users.map((u) => u.userId);
    const prevEntries = prevUsersRef.current;
    const prevIds = prevEntries.map((e) => e.id);
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
    prevUsersRef.current = ws.users.map((u) => ({ id: u.userId, nick: u.nickname }));
  }, [ws.users, ws.status, addToast]);

  // Idle detection: auto-away after 5 min inactivity
  useIdleDetection({
    timeout: 5 * 60 * 1000,
    onIdle: useCallback(() => {
      const current = ws.users.find((u) => u.userId === ws.serverInfo?.userId)?.status;
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
      const findUserByNick = (nick: string) => ws.users.find((u) => u.nickname.toLowerCase() === nick.toLowerCase());

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
    [ws, activeChannel],
  );

  const notifPrefsRef = useRef(notifPrefs);
  useEffect(() => {
    notifPrefsRef.current = notifPrefs;
  }, [notifPrefs]);

  const notifyRef = useRef(notify);
  useEffect(() => {
    notifyRef.current = notify;
  }, [notify]);

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
      const myNickname = ws.users.find((u) => u.userId === currentUserId)?.nickname || "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cap1 = (window as any).Capacitor;
      const isNativePlatform = !!cap1 && typeof cap1.isNativePlatform === "function" && cap1.isNativePlatform();
      const filters = loadNotifFilterCfg();

      setUnreadCounts((prev) => {
        const counts = { ...prev };
        for (const msg of newMsgs) {
          if (msg.channel !== currentChannel && msg.userId !== currentUserId) {
            counts[msg.channel] = (counts[msg.channel] || 0) + 1;
          }
        }
        return counts;
      });

      // Send notifications for new messages from others
      for (const msg of newMsgs) {
        if (msg.userId === currentUserId) continue;
        if (isMuted(msg.channel)) continue;
        if (!checkNotifFilter(filters, msg.channel, msg.userId, msg.content, myNickname)) continue;
        if (!isNativePlatform && document.hasFocus() && msg.channel === currentChannel) continue;

        const title = `#${msg.channel} - ${msg.nickname}`;
        const body = msg.content.length > 100 ? msg.content.slice(0, 100) + "..." : msg.content;
        notifyRef.current(title, body, msg.id);
      }
    }
    prevMessagesLenRef.current = ws.messages.length;
  }, [ws.messages, isMuted, ws.serverInfo?.userId, ws.users]);

  useEffect(() => {
    if (ws.dmMessages.length > prevDmLenRef.current) {
      const newDms = ws.dmMessages.slice(prevDmLenRef.current);
      const currentUserId = ws.serverInfo?.userId;
      const currentDM = activeDMRef.current;
      const myNickname = ws.users.find((u) => u.userId === currentUserId)?.nickname || "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cap2 = (window as any).Capacitor;
      const isNativePlatform = !!cap2 && typeof cap2.isNativePlatform === "function" && cap2.isNativePlatform();
      const filters = loadNotifFilterCfg();

      for (const dm of newDms) {
        if (dm.from === currentUserId) continue;
        const peerId = dm.from === currentUserId ? dm.to : dm.from;
        if (peerId !== currentDM) {
          setDmUnreadCounts((prev) => ({ ...prev, [peerId]: (prev[peerId] || 0) + 1 }));
        }
        // Check filters (use empty channel for DMs)
        if (!checkNotifFilter(filters, "", dm.from, dm.content, myNickname)) continue;
        if (!isNativePlatform && document.hasFocus() && peerId === currentDM) continue;

        const title = dm.nickname;
        const body = dm.content.length > 100 ? dm.content.slice(0, 100) + "..." : dm.content;
        notifyRef.current(title, body, dm.id);
      }
    }
    prevDmLenRef.current = ws.dmMessages.length;
  }, [ws.dmMessages, ws.serverInfo?.userId, ws.users]);

  const dmConversations = useMemo(() => {
    const currentUserId = ws.serverInfo?.userId;
    if (!currentUserId) return [];
    const convos = new Map<
      string,
      { peerId: string; peerNick: string; lastMessage: string; unread: number; ts: number }
    >();
    for (const dm of ws.dmMessages) {
      const peerId = dm.from === currentUserId ? dm.to : dm.from;
      const peerNick =
        dm.from === currentUserId
          ? ws.users.find((u) => u.userId === peerId)?.nickname || peerId.slice(0, 8)
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

  const handleSearchClose = useCallback(() => {
    setShowSearch(false);
    ws.clearSearch();
  }, [ws]);

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
        if (showShortcuts) {
          setShowShortcuts(false);
          return;
        }
        if (showSearch) {
          handleSearchClose();
          return;
        }
        if (showPins) {
          setShowPins(false);
          return;
        }
        if (showBookmarks) {
          setShowBookmarks(false);
          return;
        }
        if (replyTo) {
          setReplyTo(null);
          return;
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSearch, replyTo, showShortcuts, showPins, showBookmarks, handleSearchClose]);

  const handleQuote = useCallback((text: string, nickname: string) => {
    const quoted = text
      .split("\n")
      .map((l) => `> ${l}`)
      .join("\n");
    setQuoteText(`${quoted}\n@${nickname} `);
  }, []);

  const handleForward = useCallback(
    (targetChannel: string, comment?: string) => {
      if (!forwardMsg) return;
      const fwdContent = comment
        ? `${comment}\n\n> **Forwarded from ${forwardMsg.author}:**\n> ${forwardMsg.content}`
        : `> **Forwarded from ${forwardMsg.author}:**\n> ${forwardMsg.content}`;
      ws.sendChat(targetChannel, fwdContent);
      setForwardMsg(null);
      addToast("info", t("forward.sent"));
    },
    [forwardMsg, ws, addToast, t],
  );

  const handleForwardMessage = useCallback(
    (messageId: string) => {
      const msg = ws.messages.find((m) => m.id === messageId);
      if (msg) setForwardMsg({ content: msg.content, author: msg.nickname });
    },
    [ws.messages],
  );

  const serverBaseUrl = useMemo(() => {
    if (!serverAddress) return "";
    const protocol = serverAddress.startsWith("wss://") ? "https://" : "http://";
    const base = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
    return `${protocol}${base}`;
  }, [serverAddress]);

  const handleEmojiUpload = useCallback(
    async (name: string, file: File) => {
      try {
        const authHeaders = getFileAuthHeaders(identity);
        const ext = file.name.split(".").pop() || "png";
        const filename = `${name}.${ext}`;
        const uploadUrl = `${serverBaseUrl}/files/emojis/${filename}`;

        const formData = new FormData();
        formData.append("file", file);

        const resp = await fetch(uploadUrl, {
          method: "POST",
          headers: authHeaders,
          body: formData,
        });

        if (!resp.ok) {
          handleError("Emoji upload failed");
          return;
        }

        // Tell the server to register the emoji
        ws.addCustomEmoji(name, filename);
      } catch {
        handleError("Emoji upload error");
      }
    },
    [serverBaseUrl, identity, ws, handleError],
  );

  const handleEmojiDelete = useCallback(
    (name: string) => {
      ws.removeCustomEmoji(name);
    },
    [ws],
  );

  const handleScheduleMessage = useCallback(
    (msg: ScheduledMessage) => {
      const updated = [...scheduledMessages, msg];
      setScheduledMessages(updated);
      saveScheduledMessages(updated);
    },
    [scheduledMessages],
  );

  const handleDeleteScheduled = useCallback(
    (id: string) => {
      const updated = scheduledMessages.filter((m) => m.id !== id);
      setScheduledMessages(updated);
      saveScheduledMessages(updated);
    },
    [scheduledMessages],
  );

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

  const handleFileUpload = useCallback(
    async (file: File, msgType?: string) => {
      try {
        const authHeaders = getFileAuthHeaders(identity);
        const protocol = serverAddress.startsWith("wss://") ? "https://" : "http://";
        const base = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
        const uploadUrl = `${protocol}${base}/files/`;

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
        ws.sendChat(activeChannel, `[${result.filename}](${fileUrl})`, msgType);
      } catch {
        handleError("File upload error");
      }
    },
    [serverAddress, activeChannel, ws, handleError, identity],
  );

  const handleBookmark = useCallback(
    (messageId: string) => {
      if (isBookmarked(messageId)) {
        setBookmarks(removeBookmark(messageId));
      } else {
        const msg = ws.messages.find((m) => m.id === messageId);
        if (msg) {
          setBookmarks(
            addBookmark({
              id: msg.id,
              channel: msg.channel,
              nickname: msg.nickname,
              content: msg.content,
              timestamp: msg.timestamp,
            }),
          );
        }
      }
    },
    [ws.messages],
  );

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
        onDecline={() => {
          ws.disconnect();
          setAgreementAccepted(false);
        }}
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

  // Resize handlers
  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth((w) => Math.max(160, Math.min(400, w + delta)));
  }, []);
  const handleSidebarResizeEnd = useCallback(() => {
    setSidebarWidth((w) => {
      localStorage.setItem("hotline-sidebar-w", String(w));
      return w;
    });
  }, []);
  const handleRightPanelResize = useCallback((delta: number) => {
    setRightPanelWidth((w) => Math.max(140, Math.min(400, w - delta)));
  }, []);
  const handleRightPanelResizeEnd = useCallback(() => {
    setRightPanelWidth((w) => {
      localStorage.setItem("hotline-right-w", String(w));
      return w;
    });
  }, []);

  const canCreateChannel = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canUpload = ws.serverInfo?.role === "admin" || ws.serverInfo?.role === "operator";
  const canDownload = ws.serverInfo?.role !== "guest";
  const activeCh = ws.channels.find((c) => c.name === activeChannel);

  return (
    <div className="app-layout">
      {mobileSidebarOpen && <div className="mobile-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />}
      <nav
        className={`app-sidebar-col ${mobileSidebarOpen ? "mobile-open" : ""}`}
        style={{ width: sidebarWidth, minWidth: sidebarWidth }}
        aria-label={t("sidebar.channels")}
      >
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
          nickname={
            ws.serverInfo?.userId ? ws.users.find((u) => u.userId === ws.serverInfo?.userId)?.nickname || "" : ""
          }
          role={ws.serverInfo?.role || ""}
          userStatus={ws.users.find((u) => u.userId === ws.serverInfo?.userId)?.status}
          mutedChannels={mutedChannels}
          onToggleMute={toggleMute}
          onAdminPanel={() => setShowAdmin(true)}
          typingChannels={ws.typingUsers
            .filter((t) => t.userId !== ws.serverInfo?.userId)
            .map((t) => t.channel)
            .filter(Boolean)}
          onReorderChannels={handleChannelReorder}
          voiceChannel={voice.voiceChannel}
          voiceParticipants={voice.participants}
          voiceIsMuted={voice.isMuted}
          voiceIsDeafened={voice.isDeafened}
          onJoinVoice={voice.joinVoice}
          onLeaveVoice={voice.leaveVoice}
          onToggleVoiceMute={voice.toggleMute}
          onToggleVoiceDeafen={voice.toggleDeafen}
        />
        <div className="app-sidebar-bottom">
          <StatusSelector
            currentStatus={ws.users.find((u) => u.userId === ws.serverInfo?.userId)?.status || "available"}
            onStatusChange={handleStatusChange}
          />
          <NotificationSettings prefs={notifPrefs} onChange={setNotifPrefs} />
          <button
            className="compact-toggle"
            onClick={toggleCompact}
            title={compact ? "Comfortable view" : "Compact view"}
            aria-label={compact ? "Comfortable view" : "Compact view"}
          >
            {compact ? <StretchHorizontal size={14} /> : <Rows3 size={14} />}
          </button>
          <button
            className="compact-toggle"
            onClick={() => setShowThemeEditor(true)}
            title={t("theme.title")}
            aria-label={t("theme.title")}
          >
            <Palette size={14} />
          </button>
          <button
            className="compact-toggle"
            onClick={() => setShowStats(true)}
            title={t("stats.title")}
            aria-label={t("stats.title")}
          >
            <TrendingUp size={14} />
          </button>
          <button
            className="compact-toggle"
            onClick={() => setShowScheduler(true)}
            title={t("scheduler.title")}
            aria-label={t("scheduler.title")}
          >
            <Clock size={14} />
          </button>
          <button
            className="compact-toggle"
            onClick={() => setShowCustomEmoji(true)}
            title={t("customEmoji.title")}
            aria-label={t("customEmoji.title")}
          >
            <SmileIcon size={14} />
          </button>
          {canCreateChannel && (
            <button
              className="compact-toggle"
              onClick={() => {
                setShowInvites(true);
                ws.requestInviteList();
              }}
              title={t("invite.title")}
              aria-label={t("invite.title")}
            >
              <LinkIcon size={14} />
            </button>
          )}
          <button
            className="compact-toggle"
            onClick={() => setShowNotifFilters(true)}
            title={t("notifFilters.title")}
            aria-label={t("notifFilters.title")}
          >
            <Filter size={14} />
          </button>
          <LanguageSelector />
        </div>
      </nav>

      <ResizeDivider direction="horizontal" onResize={handleSidebarResize} onResizeEnd={handleSidebarResizeEnd} />

      <main className="app-main">
        <div className="mobile-header">
          <button
            className="mobile-header-btn"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label={t("sidebar.openMenu")}
          >
            <Menu size={18} />
          </button>
          <span className="mobile-header-channel">
            {activeDM ? dmConversations.find((d) => d.peerId === activeDM)?.peerNick || "DM" : `#${activeChannel}`}
          </span>
          <button
            className="mobile-header-btn"
            onClick={() => setRightPanelOpen((v) => !v)}
            aria-label={t("users.togglePanel")}
          >
            <UsersIcon size={18} />
          </button>
        </div>
        <ConnectionStatus status={ws.status} reconnectIn={ws.reconnectIn} />
        {ws.serverInfo?.motd && <ServerBanner motd={ws.serverInfo.motd} />}

        {error && <div className="app-error">{error}</div>}

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
            channelSlowmode={activeCh?.slowmode}
            currentUserId={ws.serverInfo?.userId || ""}
            currentRole={ws.serverInfo?.role}
            typingUsers={ws.typingUsers}
            dmMode={
              activeDM
                ? (() => {
                    const peerUser = ws.users.find((u) => u.userId === activeDM);
                    const peerBoxPK = peerUser?.boxPublicKey;
                    return {
                      peerId: activeDM,
                      peerNick: dmConversations.find((d) => d.peerId === activeDM)?.peerNick || activeDM.slice(0, 8),
                      e2eEnabled: !!peerBoxPK,
                      ownFingerprint: getBoxPublicKeyHex(identity),
                      peerFingerprint: peerBoxPK,
                    };
                  })()
                : undefined
            }
            onSendMessage={activeDM ? (_ch, content) => ws.sendDM(activeDM, content) : handleSendWithReply}
            onSlashCommand={activeDM ? undefined : handleSlashCommand}
            onTyping={() => (activeDM ? ws.sendTyping("", activeDM) : ws.sendTyping(activeChannel))}
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
            readReceipts={ws.readReceipts}
            onSendReadReceipt={ws.sendReadReceipt}
            customEmojis={ws.customEmojis}
            serverBaseUrl={serverBaseUrl}
            automodWarning={ws.automodWarning}
            onDismissAutomodWarning={ws.dismissAutomodWarning}
            motd={ws.serverInfo?.motd || ""}
          />

          {threadRootId &&
            (() => {
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

      {rightPanelOpen && (
        <ResizeDivider
          direction="horizontal"
          onResize={handleRightPanelResize}
          onResizeEnd={handleRightPanelResizeEnd}
        />
      )}
      <div
        className={`app-right-panel ${rightPanelOpen ? "open" : "closed"}`}
        style={rightPanelOpen ? { width: rightPanelWidth, minWidth: rightPanelWidth } : undefined}
      >
        <UserList
          users={ws.users}
          currentUserId={ws.serverInfo?.userId}
          currentRole={ws.serverInfo?.role}
          onKick={ws.kickUser}
          onBan={ws.banUser}
          onOp={(uid) => ws.setUserRole(uid, "operator")}
          onDeop={(uid) => ws.setUserRole(uid, "member")}
          onDM={handleSelectDM}
          onProfileClick={(userId, position) => {
            ws.requestProfile(userId);
            setProfileUser({ userId, position });
          }}
        />
        <FileBrowser
          serverAddress={serverAddress}
          identity={identity}
          canUpload={canUpload}
          canDownload={canDownload}
        />
      </div>

      {profileUser && (() => {
        const pu = ws.users.find((u) => u.userId === profileUser.userId);
        if (!pu) return null;
        const isSelf = pu.userId === ws.serverInfo?.userId;
        return (
          <UserProfileCard
            user={pu}
            position={profileUser.position}
            onClose={() => setProfileUser(null)}
            onDM={(uid) => { handleSelectDM(uid); setProfileUser(null); }}
            onKick={ws.kickUser}
            onBan={ws.banUser}
            onOp={(uid) => ws.setUserRole(uid, "operator")}
            onDeop={(uid) => ws.setUserRole(uid, "member")}
            canModerate={canCreateChannel}
            isSelf={isSelf}
            profile={ws.profileCache[pu.userId]}
            onUpdateProfile={ws.updateProfile}
            viewerRole={ws.serverInfo?.role}
            userNotes={ws.userNotes[pu.userId]}
            onAddNote={ws.addUserNote}
            onDeleteNote={ws.deleteUserNote}
            onRequestNotes={ws.requestUserNotes}
          />
        );
      })()}

      {showCreateModal && (
        <CreateChannelModal onSubmit={handleCreateChannelSubmit} onClose={() => setShowCreateModal(false)} />
      )}

      {showChannelSettings && activeCh && (
        <ChannelSettingsModal
          channel={activeCh}
          onSetTopic={ws.setTopic}
          onClose={() => setShowChannelSettings(false)}
          canEdit={canCreateChannel}
          channelPermissions={ws.channelPermissions[activeCh.name]}
          onRequestChannelPermissions={ws.requestChannelPermissions}
          onSetChannelPermission={ws.setChannelPermission}
          onSetSlowmode={ws.setChannelSlowmode}
          onSetDescription={ws.setChannelDescription}
          isAdmin={ws.serverInfo?.role === "admin"}
        />
      )}

      {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}

      {showAdmin && ws.serverInfo && (
        <AdminPanel
          serverName={ws.serverInfo.name}
          motd={ws.serverInfo.motd}
          onUpdateSettings={ws.updateServerSettings}
          onRequestBanList={ws.requestBanList}
          onUnban={ws.unbanUser}
          onClose={() => setShowAdmin(false)}
          adminBans={ws.adminBans}
          adminMutes={ws.adminMutes}
          adminUsers={ws.adminUsers}
          channels={ws.channels}
          onMuteUser={ws.muteUser}
          onUnmuteUser={ws.unmuteUser}
          onRequestMuteList={ws.requestMuteList}
          onRequestAdminUserList={ws.requestAdminUserList}
          onRenameChannel={ws.renameChannel}
          onDeleteChannel={ws.deleteChannel}
          onCreateChannel={(name, topic) => ws.createChannel(name, topic)}
          onKickUser={ws.kickUser}
          onBanUser={ws.banUser}
          onSetUserRole={ws.setUserRole}
          auditLog={ws.auditLog}
          onRequestAuditLog={ws.requestAuditLog}
          retentionStats={ws.retentionStats}
          onRequestRetentionStats={ws.requestRetentionStats}
          onPurgeMessages={ws.purgeMessages}
          onExportMessages={ws.exportMessages}
          serverBaseUrl={serverBaseUrl}
          currentUserId={ws.serverInfo?.userId || ""}
          automodRules={ws.automodRules}
          onAddAutomodRule={ws.addAutomodRule}
          onDeleteAutomodRule={ws.deleteAutomodRule}
          onToggleAutomodRule={ws.toggleAutomodRule}
          onRequestAutomodRules={ws.requestAutomodRules}
          welcomeMessages={ws.welcomeMessages}
          onSetWelcomeMessage={ws.setWelcomeMessage}
          onRequestWelcomeMessages={ws.requestWelcomeMessages}
        />
      )}

      {showPasswordPrompt && (
        <ChannelPasswordPrompt
          channelName={showPasswordPrompt}
          onSubmit={handlePasswordSubmit}
          onCancel={() => setShowPasswordPrompt(null)}
        />
      )}

      {lightboxSrc && <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      {showThemeEditor && <ThemeEditor onClose={() => setShowThemeEditor(false)} />}

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
          emojis={ws.customEmojis}
          serverBaseUrl={serverBaseUrl}
          onUploadToServer={handleEmojiUpload}
          onDelete={handleEmojiDelete}
          onClose={() => setShowCustomEmoji(false)}
        />
      )}

      {showInvites && (
        <InvitePanel
          invites={ws.invites}
          serverAddress={serverAddress}
          onCreateInvite={ws.createInvite}
          onDeleteInvite={ws.deleteInvite}
          onClose={() => setShowInvites(false)}
        />
      )}

      {showNotifFilters && (
        <NotifFiltersPanel
          filters={loadNotifFiltersFull()}
          channels={ws.channels.map((c) => c.name)}
          users={ws.users}
          onChange={(f) => {
            _saveNF(f);
          }}
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

      <DragDropOverlay onDrop={canUpload ? handleFileUpload : () => {}} enabled={canUpload} />

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
          background: var(--bg-secondary);
          transition: opacity 0.2s ease;
          overflow: hidden;
        }
        .app-right-panel.closed {
          width: 0 !important;
          min-width: 0 !important;
          opacity: 0;
          pointer-events: none;
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
