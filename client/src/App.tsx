import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ConnectDialog } from "./components/ConnectDialog";
import { Sidebar } from "./components/Sidebar";
import { ChatPanel } from "./components/ChatPanel";
import { UserList } from "./components/UserList";
import { FileBrowser } from "./components/FileBrowser";
import { ServerBanner } from "./components/ServerBanner";
import { LanguageSelector } from "./components/LanguageSelector";
import { CreateChannelModal } from "./components/CreateChannelModal";
import { useIdentity } from "./hooks/useIdentity";
import { useWebSocket } from "./hooks/useWebSocket";
import { getPublicKeyHex, signMessage } from "./lib/crypto";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function App() {
  const { t } = useTranslation();
  const { identity } = useIdentity();
  const [activeChannel, setActiveChannel] = useState("lobby");
  const [serverAddress, setServerAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const prevMessagesLenRef = useRef(0);

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
    setActiveChannel(channel);
    ws.joinChannel(channel);
  };

  const handleCreateChannel = () => {
    setShowCreateModal(true);
  };

  const handleCreateChannelSubmit = (name: string, topic: string) => {
    ws.createChannel(name, topic);
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

  useEffect(() => {
    if (ws.messages.length > prevMessagesLenRef.current) {
      const newMsgs = ws.messages.slice(prevMessagesLenRef.current);
      const counts = { ...unreadCounts };
      for (const msg of newMsgs) {
        if (msg.channel !== activeChannel && msg.userId !== ws.serverInfo?.userId) {
          counts[msg.channel] = (counts[msg.channel] || 0) + 1;
        }
      }
      setUnreadCounts(counts);
    }
    prevMessagesLenRef.current = ws.messages.length;
  }, [ws.messages]);

  const handleSelectChannelWithClear = (channel: string) => {
    setUnreadCounts((prev) => ({ ...prev, [channel]: 0 }));
    handleSelectChannel(channel);
  };

  if (ws.status === "disconnected" || ws.status === "connecting") {
    return <ConnectDialog onConnect={handleConnect} isConnecting={ws.status === "connecting"} />;
  }

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
          onSelectChannel={handleSelectChannelWithClear}
          onCreateChannel={handleCreateChannel}
          onDisconnect={ws.disconnect}
          canCreateChannel={canCreateChannel}
          unreadCounts={unreadCounts}
          nickname={ws.serverInfo?.userId ? (ws.users.find(u => u.userId === ws.serverInfo?.userId)?.nickname || "") : ""}
          role={ws.serverInfo?.role || ""}
        />
        <LanguageSelector />
      </div>

      <main className="app-main">
        {ws.serverInfo?.motd && <ServerBanner motd={ws.serverInfo.motd} />}

        {error && (
          <div className="app-error">{error}</div>
        )}

        <div className="app-chat-row">
          <ChatPanel
            messages={ws.messages}
            activeChannel={activeChannel}
            channelTopic={activeCh?.topic}
            currentUserId={ws.serverInfo?.userId || ""}
            onSendMessage={ws.sendChat}
            onSlashCommand={handleSlashCommand}
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
        <UserList users={ws.users} />
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
