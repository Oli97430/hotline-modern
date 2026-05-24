import { ArrowDown, Loader, Megaphone, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChatMessage } from "../hooks/useWebSocket";
import { MessageBubble } from "./MessageBubble";

/** Collapsed placeholder shown for messages from blocked users */
function BlockedMessagePlaceholder({
  msg,
  currentUserId: _currentUserId,
  isGrouped,
  onUnblock,
}: {
  msg: ChatMessage;
  currentUserId: string;
  isGrouped?: boolean;
  onUnblock?: (userId: string) => void;
}) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={`message blocked-message ${isGrouped ? "grouped" : ""}`}>
      {revealed ? (
        <div className="blocked-message-revealed">
          <span className="blocked-message-nick">{msg.nickname}</span>
          <span className="message-content">{msg.content}</span>
          <button type="button" className="blocked-message-hide" onClick={() => setRevealed(false)}>
            {t("chat.blockedMessage")}
          </button>
        </div>
      ) : (
        <div className="blocked-message-collapsed" onClick={() => setRevealed(true)}>
          <span className="blocked-message-label">[{t("chat.blockedMessage")}]</span>
          <span className="blocked-message-hint">{t("chat.clickToReveal")}</span>
          {onUnblock && (
            <button type="button"
              className="blocked-message-unblock"
              onClick={(e) => {
                e.stopPropagation();
                onUnblock(msg.userId);
              }}
            >
              {t("user.unblock")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function formatDateSeparator(ts: number, t: (key: string) => string): string {
  const date = new Date(ts);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (today.getTime() - msgDay.getTime()) / 86400000;

  if (diff === 0) return t("chat.today");
  if (diff === 1) return t("chat.yesterday");
  return date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

export interface MessageListProps {
  messages: ChatMessage[];
  activeChannel: string;
  currentUserId: string;
  currentNickname?: string;
  currentRole?: string;
  dmMode?: { peerId: string; peerNick: string; e2eEnabled: boolean };
  onReact?: (messageId: string, emoji: string) => void;
  onRemoveReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onPin?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
  onLoadHistory?: (channel: string, beforeTimestamp: number) => void;
  historyLoading?: boolean;
  hasMoreHistory?: boolean;
  onBookmark?: (messageId: string) => void;
  isBookmarked?: (messageId: string) => boolean;
  onImageClick?: (src: string) => void;
  lastReadMessageId?: string;
  pinnedMessageIds?: string[];
  onQuote?: (text: string, nickname: string) => void;
  onThreadOpen?: (messageId: string) => void;
  onForward?: (messageId: string) => void;
  readReceipts?: Record<string, string[]>;
  onSendReadReceipt?: (channel: string, messageId: string) => void;
  users?: { userId: string; nickname: string; role: string; status: string }[];
  motd?: string;
  isBlocked?: (userId: string) => boolean;
  onBlockUser?: (userId: string) => void;
  onUnblockUser?: (userId: string) => void;
  /** Ref exposed to parent so it can trigger scrollIntoView */
  messagesEndRef: React.RefObject<HTMLDivElement>;
  /** Ref exposed to parent for scroll container access */
  messagesContainerRef: React.RefObject<HTMLDivElement>;
  /** Callback to parent when scrolled-up state changes */
  onScrollStateChange: (isScrolledUp: boolean) => void;
  /** Whether user is currently scrolled up (controlled by parent) */
  isScrolledUp: boolean;
  /** New message count badge for scroll-to-bottom button */
  newMsgCount: number;
  /** Reset new message count */
  onResetNewMsgCount: () => void;
  /** Increment new message count */
  onIncrementNewMsgCount: (delta: number) => void;
}

export function MessageList({
  messages,
  activeChannel,
  currentUserId,
  currentNickname,
  currentRole,
  dmMode,
  onReact,
  onRemoveReact,
  onEdit,
  onDelete,
  onPin,
  onReply,
  onLoadHistory,
  historyLoading,
  hasMoreHistory,
  onBookmark,
  isBookmarked,
  onImageClick,
  lastReadMessageId,
  pinnedMessageIds,
  onQuote,
  onThreadOpen,
  onForward,
  readReceipts,
  onSendReadReceipt,
  users,
  motd,
  isBlocked,
  onBlockUser,
  onUnblockUser,
  messagesEndRef,
  messagesContainerRef,
  onScrollStateChange,
  isScrolledUp,
  newMsgCount,
  onResetNewMsgCount,
  onIncrementNewMsgCount,
}: MessageListProps) {
  const { t } = useTranslation();
  const [stickyDate, setStickyDate] = useState<string | null>(null);
  const prevScrollHeightRef = useRef(0);
  const isLoadingHistoryRef = useRef(false);
  const prevMsgCountRef = useRef(0);
  const lastSentReceiptRef = useRef<string>("");

  // --- MOTD dismiss tracking ---
  const motdHash = motd ? btoa(unescape(encodeURIComponent(motd))).slice(0, 16) : "";
  const [motdDismissed, setMotdDismissed] = useState<boolean>(() => {
    if (!motdHash) return true;
    try {
      return localStorage.getItem("hotline-motd-dismissed") === motdHash;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!motdHash) {
      setMotdDismissed(true);
      return;
    }
    try {
      setMotdDismissed(localStorage.getItem("hotline-motd-dismissed") === motdHash);
    } catch {
      setMotdDismissed(false);
    }
  }, [motdHash]);

  const handleDismissMotd = () => {
    setMotdDismissed(true);
    try {
      localStorage.setItem("hotline-motd-dismissed", motdHash);
    } catch {
      /* ignore */
    }
  };

  // --- localStorage last-read tracking ---
  const lastReadStorageKey = `hotline-last-read-${activeChannel}`;
  const [localLastReadId, setLocalLastReadId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(lastReadStorageKey);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      setLocalLastReadId(localStorage.getItem(lastReadStorageKey));
    } catch {
      setLocalLastReadId(null);
    }
  }, [lastReadStorageKey]);

  const effectiveLastReadId = lastReadMessageId || localLastReadId;

  const channelMessages = messages.filter((m) => m.channel === activeChannel || m.system);

  // Send read receipt when at bottom and new messages arrive
  useEffect(() => {
    if (!onSendReadReceipt || dmMode || isScrolledUp) return;
    const chMsgs = messages.filter((m) => m.channel === activeChannel && !m.system && m.userId !== currentUserId);
    if (chMsgs.length === 0) return;
    const lastMsg = chMsgs[chMsgs.length - 1];
    if (lastMsg && lastMsg.id !== lastSentReceiptRef.current) {
      lastSentReceiptRef.current = lastMsg.id;
      onSendReadReceipt(activeChannel, lastMsg.id);
    }
  }, [messages, activeChannel, isScrolledUp, dmMode, currentUserId, onSendReadReceipt]);

  // Mark messages as read when panel is visible and scrolled to bottom
  useEffect(() => {
    if (isScrolledUp) return;
    const chMsgs = channelMessages.filter((m) => !m.system);
    if (chMsgs.length === 0) return;
    const lastMsg = chMsgs[chMsgs.length - 1];
    if (lastMsg && lastMsg.id !== localLastReadId) {
      setLocalLastReadId(lastMsg.id);
      try {
        localStorage.setItem(lastReadStorageKey, lastMsg.id);
      } catch {
        /* quota exceeded, ignore */
      }
    }
  }, [channelMessages, isScrolledUp, lastReadStorageKey, localLastReadId]);

  // Update last-read on window focus
  useEffect(() => {
    const handleFocus = () => {
      if (isScrolledUp) return;
      const chMsgs = channelMessages.filter((m) => !m.system);
      if (chMsgs.length === 0) return;
      const lastMsg = chMsgs[chMsgs.length - 1];
      if (lastMsg) {
        setLocalLastReadId(lastMsg.id);
        try {
          localStorage.setItem(lastReadStorageKey, lastMsg.id);
        } catch {
          /* quota exceeded, ignore */
        }
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [channelMessages, isScrolledUp, lastReadStorageKey]);

  // Scroll to top = load more history; track scroll position + sticky date
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const scrolledUp = distFromBottom > 80;
    onScrollStateChange(scrolledUp);
    if (!scrolledUp) onResetNewMsgCount();

    // Sticky date header
    const separators = container.querySelectorAll(".chat-date-separator");
    let activeDateStr: string | null = null;
    for (let i = separators.length - 1; i >= 0; i--) {
      const rect = separators[i].getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (rect.top <= containerRect.top + 10) {
        activeDateStr = separators[i].textContent || null;
        break;
      }
    }
    setStickyDate(scrolledUp ? activeDateStr : null);

    if (historyLoading || !hasMoreHistory || !onLoadHistory || isLoadingHistoryRef.current) return;
    if (container.scrollTop < 100 && channelMessages.length > 0) {
      isLoadingHistoryRef.current = true;
      prevScrollHeightRef.current = container.scrollHeight;
      onLoadHistory(activeChannel, channelMessages[0].timestamp);
    }
  }, [activeChannel, channelMessages, historyLoading, hasMoreHistory, onLoadHistory, messagesContainerRef, onScrollStateChange, onResetNewMsgCount]);

  // Preserve scroll position after prepending history
  useEffect(() => {
    if (isLoadingHistoryRef.current && !historyLoading) {
      isLoadingHistoryRef.current = false;
      const container = messagesContainerRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeightRef.current;
      }
    }
  }, [historyLoading, channelMessages.length, messagesContainerRef]);

  const messagesWithDates = useMemo(() => {
    const result: (ChatMessage | { type: "separator"; date: string; key: string })[] = [];
    let lastDate = "";
    for (const msg of channelMessages) {
      const dayKey = new Date(msg.timestamp).toDateString();
      if (dayKey !== lastDate) {
        lastDate = dayKey;
        result.push({ type: "separator", date: formatDateSeparator(msg.timestamp, t), key: `sep-${dayKey}` });
      }
      result.push(msg);
    }
    return result;
  }, [channelMessages, t]);

  // Auto-scroll or increment new message count
  useEffect(() => {
    if (channelMessages.length > prevMsgCountRef.current) {
      if (!isScrolledUp) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        onIncrementNewMsgCount(channelMessages.length - prevMsgCountRef.current);
      }
    }
    prevMsgCountRef.current = channelMessages.length;
  }, [channelMessages.length, isScrolledUp, messagesEndRef, onIncrementNewMsgCount]);

  return (
    <>
      <div className="chat-messages" ref={messagesContainerRef} onScroll={handleScroll}>
        {motd && !motdDismissed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              margin: "8px 12px",
              borderRadius: 8,
              background: "var(--accent, #7c5cbf)",
              color: "#fff",
              fontSize: 13,
            }}
          >
            <Megaphone size={16} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <strong style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.85 }}>
                {t("motd.announcement")}
              </strong>
              <span>{motd}</span>
            </div>
            <button
              type="button"
              onClick={handleDismissMotd}
              title={t("motd.dismiss")}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: 4,
                borderRadius: 4,
                opacity: 0.7,
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        {stickyDate && (
          <div className="chat-sticky-date">
            <span>{stickyDate}</span>
          </div>
        )}
        {historyLoading && (
          <div className="chat-history-loading">
            <Loader size={14} className="spinner" />
            <span>{t("chat.loadingHistory")}</span>
          </div>
        )}
        {!historyLoading && hasMoreHistory === false && channelMessages.length > 0 && (
          <div className="chat-history-end">{t("chat.historyStart")}</div>
        )}
        {channelMessages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">{"💬"}</div>
            <span>{t("chat.noMessages")}</span>
          </div>
        )}
        {messagesWithDates.map((item) => {
          if ("type" in item && item.type === "separator") {
            return (
              <div key={item.key} className="chat-date-separator">
                <span>{item.date}</span>
              </div>
            );
          }
          const msg = item as ChatMessage;
          const canMod = currentRole === "admin" || currentRole === "operator";
          const replyMsg = msg.replyTo ? channelMessages.find((m) => m.id === msg.replyTo) : undefined;
          const msgIdx = channelMessages.indexOf(msg);
          const prev = msgIdx > 0 ? channelMessages[msgIdx - 1] : undefined;
          const isGrouped =
            prev !== undefined &&
            prev.userId === msg.userId &&
            msg.timestamp - prev.timestamp < 120000 &&
            !msg.replyTo &&
            !msg.system &&
            !prev.system;

          const showUnreadMarker =
            effectiveLastReadId && prev?.id === effectiveLastReadId && msg.userId !== currentUserId;
          const hasThread = msg.replyTo && onThreadOpen;

          const userIsBlocked = !msg.system && isBlocked?.(msg.userId);

          return (
            <div key={msg.id}>
              {showUnreadMarker && (
                <div className="chat-unread-marker">
                  <span>{t("chat.newMessagesLabel")}</span>
                </div>
              )}
              {userIsBlocked ? (
                <BlockedMessagePlaceholder
                  msg={msg}
                  currentUserId={currentUserId}
                  isGrouped={isGrouped}
                  onUnblock={onUnblockUser}
                />
              ) : (
                <>
                  <MessageBubble
                    id={msg.id}
                    userId={msg.userId}
                    nickname={msg.nickname}
                    content={msg.content}
                    role={msg.role}
                    timestamp={msg.timestamp}
                    isOwn={msg.userId === currentUserId}
                    edited={msg.edited}
                    reactions={msg.reactions}
                    currentUserId={currentUserId}
                    currentNickname={currentNickname}
                    canModerate={canMod}
                    system={msg.system}
                    msgType={msg.msgType}
                    onReact={onReact}
                    onRemoveReact={onRemoveReact}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onPin={onPin}
                    onReply={onReply}
                    onBookmark={onBookmark}
                    isBookmarked={isBookmarked?.(msg.id)}
                    isPinned={pinnedMessageIds?.includes(msg.id)}
                    replyContext={replyMsg ? { nickname: replyMsg.nickname, content: replyMsg.content } : undefined}
                    isGrouped={isGrouped}
                    onImageClick={onImageClick}
                    onQuote={onQuote}
                    onThreadOpen={hasThread ? () => onThreadOpen!(msg.replyTo!) : undefined}
                    onForward={onForward}
                    isBlocked={isBlocked}
                    onBlockUser={onBlockUser}
                    onUnblockUser={onUnblockUser}
                  />
                  {msg.userId === currentUserId &&
                    !msg.system &&
                    readReceipts &&
                    (() => {
                      const readers = (readReceipts[msg.id] || []).filter((uid) => uid !== currentUserId);
                      if (readers.length === 0) return null;
                      const names = readers
                        .map((uid) => users?.find((u) => u.userId === uid)?.nickname || uid.slice(0, 6))
                        .slice(0, 5);
                      const label =
                        readers.length <= 5
                          ? t("chat.seenBy", { names: names.join(", ") })
                          : t("chat.seenBy", { names: names.join(", ") + ` +${readers.length - 5}` });
                      return (
                        <div className="chat-read-receipt">
                          <span>{label}</span>
                        </div>
                      );
                    })()}
                </>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {isScrolledUp && (
        <button type="button"
          className="scroll-to-bottom"
          onClick={() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            onScrollStateChange(false);
            onResetNewMsgCount();
          }}
          title={t("chat.scrollToBottom")}
          aria-label={t("chat.scrollToBottom")}
        >
          <ArrowDown size={14} />
          {newMsgCount > 0 && <span className="scroll-badge">{newMsgCount}</span>}
        </button>
      )}
    </>
  );
}
