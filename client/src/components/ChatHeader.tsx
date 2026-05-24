import { Bookmark, Pin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { E2EIndicator } from "./E2EIndicator";

export interface ChatHeaderProps {
  activeChannel: string;
  channelTopic?: string;
  channelSlowmode?: number;
  dmMode?: {
    peerId: string;
    peerNick: string;
    e2eEnabled: boolean;
    ownFingerprint?: string;
    peerFingerprint?: string;
  };
  onSearchOpen?: () => void;
  onPinsOpen?: () => void;
  onBookmarksOpen?: () => void;
  onChannelSettings?: () => void;
}

export function ChatHeader({
  activeChannel,
  channelTopic,
  channelSlowmode,
  dmMode,
  onSearchOpen,
  onPinsOpen,
  onBookmarksOpen,
  onChannelSettings,
}: ChatHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="chat-header">
      <span
        className="chat-channel-name"
        onClick={!dmMode ? onChannelSettings : undefined}
        style={!dmMode ? { cursor: "pointer" } : undefined}
      >
        {dmMode ? `@ ${dmMode.peerNick}` : `# ${activeChannel}`}
      </span>
      {!dmMode && channelTopic && (
        <span className="chat-topic" onClick={onChannelSettings} style={{ cursor: "pointer" }}>
          {channelTopic}
        </span>
      )}
      {!dmMode && channelSlowmode !== undefined && channelSlowmode > 0 && (
        <span className="chat-slowmode-badge">{t("slowmode.active", { seconds: channelSlowmode })}</span>
      )}
      {dmMode && (
        <div style={{ position: "relative", marginLeft: 8 }}>
          <E2EIndicator
            enabled={dmMode.e2eEnabled}
            ownFingerprint={dmMode.ownFingerprint}
            peerFingerprint={dmMode.peerFingerprint}
          />
        </div>
      )}
      <div className="chat-header-actions">
        {onPinsOpen && (
          <button type="button"
            className="chat-header-btn"
            onClick={onPinsOpen}
            title={t("pins.title")}
            aria-label={t("pins.title")}
          >
            <Pin size={15} />
          </button>
        )}
        {onBookmarksOpen && (
          <button type="button"
            className="chat-header-btn"
            onClick={onBookmarksOpen}
            title={t("bookmarks.title")}
            aria-label={t("bookmarks.title")}
          >
            <Bookmark size={15} />
          </button>
        )}
        {onSearchOpen && (
          <button type="button"
            className="chat-header-btn"
            onClick={onSearchOpen}
            title={t("search.title")}
            aria-label={t("search.title")}
          >
            <Search size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
