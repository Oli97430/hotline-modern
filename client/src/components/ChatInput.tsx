import { Mic, Send, Smile, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ServerCustomEmoji, TypingUser } from "../hooks/useWebSocket";
import { EmojiPicker } from "./EmojiPicker";
import { FormatToolbar } from "./FormatToolbar";
import { MentionSuggestions } from "./MentionSuggestions";
import { VoiceRecorder } from "./VoiceRecorder";

export interface ChatInputProps {
  activeChannel: string;
  currentUserId: string;
  dmMode?: { peerId: string; peerNick: string; e2eEnabled: boolean };
  channelSlowmode?: number;
  onSendMessage: (channel: string, content: string) => void;
  onSlashCommand?: (command: string, args: string[]) => void;
  onTyping?: () => void;
  typingUsers: TypingUser[];
  replyTo?: { id: string; nickname: string; content: string } | null;
  onCancelReply?: () => void;
  onFileUpload?: (file: File, msgType?: string) => void;
  canUpload?: boolean;
  users?: { userId: string; nickname: string; role: string; status: string }[];
  quotedText?: string;
  onQuoteClear?: () => void;
  customEmojis?: ServerCustomEmoji[];
  serverBaseUrl?: string;
  automodWarning?: string | null;
  onDismissAutomodWarning?: () => void;
}

export function ChatInput({
  activeChannel,
  currentUserId,
  dmMode,
  channelSlowmode,
  onSendMessage,
  onSlashCommand,
  onTyping,
  typingUsers,
  replyTo,
  onCancelReply,
  onFileUpload,
  canUpload,
  users,
  quotedText,
  onQuoteClear,
  customEmojis,
  serverBaseUrl,
  automodWarning,
  onDismissAutomodWarning,
}: ChatInputProps) {
  const { t } = useTranslation();
  const [input, setInputRaw] = useState("");
  const draftTimerRef = useRef<number>(0);

  // --- Per-channel draft persistence ---
  const draftKey = `hotline-draft-${activeChannel}`;

  // Load draft when channel changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`hotline-draft-${activeChannel}`);
      setInputRaw(saved || "");
    } catch {
      setInputRaw("");
    }
  }, [activeChannel]);

  // Save draft on input changes (debounced 300ms)
  const setInput = useCallback(
    (valueOrUpdater: string | ((prev: string) => string)) => {
      setInputRaw((prev) => {
        const newVal = typeof valueOrUpdater === "function" ? valueOrUpdater(prev) : valueOrUpdater;
        window.clearTimeout(draftTimerRef.current);
        draftTimerRef.current = window.setTimeout(() => {
          try {
            if (newVal) {
              localStorage.setItem(draftKey, newVal);
            } else {
              localStorage.removeItem(draftKey);
            }
          } catch {
            /* quota exceeded, ignore */
          }
        }, 300);
        return newVal;
      });
    },
    [draftKey],
  );

  const [showEmoji, setShowEmoji] = useState(false);
  const [mentionFilter, setMentionFilter] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const typingThrottleRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle quoted text injection
  useEffect(() => {
    if (quotedText) {
      setInput(quotedText);
      onQuoteClear?.();
    }
  }, [quotedText, onQuoteClear, setInput]);

  // Slowmode cooldown timer
  useEffect(() => {
    if (cooldownEnd <= Date.now()) {
      setCooldownLeft(0);
      return;
    }
    setCooldownLeft(Math.ceil((cooldownEnd - Date.now()) / 1000));
    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownLeft(0);
        clearInterval(interval);
      } else {
        setCooldownLeft(remaining);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  // Reset cooldown when channel changes
  useEffect(() => {
    setCooldownEnd(0);
    setCooldownLeft(0);
  }, [activeChannel]);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileUpload) {
        onFileUpload(file);
      }
      e.target.value = "";
    },
    [onFileUpload],
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    if (cooldownLeft > 0) return;

    if (text.startsWith("/") && onSlashCommand) {
      const parts = text.slice(1).split(/\s+/);
      onSlashCommand(parts[0], parts.slice(1));
    } else {
      onSendMessage(activeChannel, text);
      if (channelSlowmode && channelSlowmode > 0) {
        setCooldownEnd(Date.now() + channelSlowmode * 1000);
      }
    }
    setInput("");
    try {
      localStorage.removeItem(`hotline-draft-${activeChannel}`);
    } catch {
      /* ignore */
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    const cursorPos = value.length;
    const textBefore = value.slice(0, cursorPos);
    const atMatch = textBefore.match(/@(\w*)$/);
    if (atMatch && users && users.length > 0) {
      setMentionFilter(atMatch[1]);
      setMentionIndex(0);
    } else {
      setMentionFilter(null);
    }
  };

  const handleMentionSelect = (nickname: string) => {
    const regex = /@(\w*)$/;
    setInput((prev) => prev.replace(regex, `@${nickname} `));
    setMentionFilter(null);
  };

  const handleFormat = useCallback((wrapper: string, prefix?: string, suffix?: string) => {
    if (prefix && suffix) {
      setInput((prev) => prev + prefix + "text" + suffix);
    } else {
      setInput((prev) => prev + wrapper + "text" + wrapper);
    }
  }, [setInput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionFilter !== null) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMentionIndex((i) => i + 1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMentionIndex((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const filtered = (users || [])
          .filter((u) => u.nickname.toLowerCase().startsWith((mentionFilter || "").toLowerCase()))
          .slice(0, 6);
        const idx = mentionIndex % Math.max(filtered.length, 1);
        if (filtered[idx]) handleMentionSelect(filtered[idx].nickname);
        return;
      }
      if (e.key === "Escape") {
        setMentionFilter(null);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      return;
    }
    if (onTyping && Date.now() - typingThrottleRef.current > 2000) {
      typingThrottleRef.current = Date.now();
      onTyping();
    }
  };

  const handleEmojiSelect = useCallback((emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
  }, [setInput]);

  // Typing indicator
  const activeTyping = typingUsers.filter((tu) => {
    if (dmMode) return tu.targetId === currentUserId && tu.userId === dmMode.peerId;
    return tu.channel === activeChannel && tu.userId !== currentUserId;
  });

  const typingText = (() => {
    const count = activeTyping.length;
    if (count === 0) return null;
    if (count === 1) return t("chat.typingOne", { name: activeTyping[0].nickname });
    if (count === 2)
      return t("chat.typingTwo", {
        name1: activeTyping[0].nickname,
        name2: activeTyping[1].nickname,
      });
    if (count === 3)
      return t("chat.typingThree", {
        name1: activeTyping[0].nickname,
        name2: activeTyping[1].nickname,
        name3: activeTyping[2].nickname,
      });
    return t("chat.typingMany");
  })();

  return (
    <>
      {typingText && (
        <div className="chat-typing">
          <span className="typing-dots">
            <span />
            <span />
            <span />
          </span>
          {typingText}
        </div>
      )}

      {replyTo && (
        <div className="chat-reply-preview">
          <span className="reply-label">
            {t("chat.replyingTo")} <strong>{replyTo.nickname}</strong>
          </span>
          <span className="reply-content">{replyTo.content.slice(0, 80)}</span>
          <button type="button" className="reply-cancel" onClick={onCancelReply} title="Cancel">
            <span>&times;</span>
          </button>
        </div>
      )}

      {showVoiceRecorder && (
        <div className="chat-voice-area">
          <VoiceRecorder
            onSend={(blob, _duration) => {
              const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
              onFileUpload?.(file, "voice");
              setShowVoiceRecorder(false);
            }}
            onCancel={() => setShowVoiceRecorder(false)}
          />
        </div>
      )}

      {automodWarning && (
        <div className="automod-warning-banner">
          <span>
            {t("automod.warningPrefix")}: {automodWarning}
          </span>
          <button type="button" className="automod-warning-dismiss" onClick={onDismissAutomodWarning}>
            <X size={14} />
          </button>
        </div>
      )}

      <FormatToolbar onFormat={handleFormat} />

      <div className="chat-input-area">
        {canUpload && onFileUpload && (
          <>
            <button type="button" className="chat-upload-btn" onClick={handleFileSelect} title={t("files.upload")}>
              <Upload size={18} />
            </button>
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileInputChange} />
          </>
        )}
        <div className="chat-input-wrapper">
          {mentionFilter !== null && users && (
            <MentionSuggestions
              users={users}
              filter={mentionFilter}
              onSelect={handleMentionSelect}
              selectedIndex={mentionIndex}
            />
          )}
          <textarea
            className="chat-input"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={dmMode ? t("chat.dmPlaceholder", { name: dmMode.peerNick }) : t("chat.placeholder")}
            rows={1}
            aria-label={dmMode ? t("chat.dmPlaceholder", { name: dmMode.peerNick }) : t("chat.placeholder")}
          />
          <button type="button" className="emoji-btn" onClick={() => setShowEmoji((v) => !v)} title="Emoji" aria-label="Emoji">
            <Smile size={18} />
          </button>
          {showEmoji && (
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClose={() => setShowEmoji(false)}
              customEmojis={customEmojis}
              serverBaseUrl={serverBaseUrl}
            />
          )}
        </div>
        {cooldownLeft > 0 && (
          <span className="chat-cooldown-badge">{t("slowmode.wait", { seconds: cooldownLeft })}</span>
        )}
        {!input.trim() && canUpload ? (
          <button type="button"
            className="chat-mic-btn"
            onClick={() => setShowVoiceRecorder(true)}
            title={t("voice.record")}
            aria-label={t("voice.record")}
          >
            <Mic size={18} />
          </button>
        ) : (
          <button type="button"
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || cooldownLeft > 0}
            aria-label={t("chat.send")}
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </>
  );
}
