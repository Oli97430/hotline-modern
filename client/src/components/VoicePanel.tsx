import { Headphones, Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { VoiceParticipant } from "../hooks/useVoiceChat";
import { UserAvatar } from "./UserAvatar";

// Inject styles once globally, not per render
let stylesInjected = false;
function injectVoicePanelStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-voice-panel", "");
  style.textContent = voicePanelStyles;
  document.head.appendChild(style);
}

interface VoicePanelProps {
  voiceChannel: string | null;
  participants: VoiceParticipant[];
  isMuted: boolean;
  isDeafened: boolean;
  onJoin: (channel: string) => void;
  onLeave: () => void;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  activeChannel: string;
}

export function VoicePanel({
  voiceChannel,
  participants,
  isMuted,
  isDeafened,
  onJoin,
  onLeave,
  onToggleMute,
  onToggleDeafen,
  activeChannel,
}: VoicePanelProps) {
  const { t } = useTranslation();

  useEffect(() => {
    injectVoicePanelStyles();
  }, []);

  if (!voiceChannel) {
    return (
      <div className="voice-panel">
        <button
          type="button"
          className="voice-join-btn"
          onClick={() => onJoin(activeChannel)}
          title={t("voice.joinChannel")}
        >
          <Phone size={14} />
          <span>{t("voice.joinChannel")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="voice-panel voice-panel-active">
      <div className="voice-header">
        <Headphones size={14} className="voice-header-icon" />
        <span className="voice-header-text">{t("voice.connected")}</span>
        <span className="voice-header-channel">{t("voice.inChannel", { channel: voiceChannel })}</span>
      </div>

      <ul className="voice-participants">
        {participants.map((p) => (
          <li key={p.userId} className={`voice-participant ${p.speaking ? "speaking" : ""}`}>
            <div className={`voice-avatar-wrap ${p.speaking ? "speaking" : ""}`}>
              <UserAvatar userId={p.userId} nickname={p.nickname} size={24} />
            </div>
            <span className="voice-participant-name">{p.nickname}</span>
            {p.muted && <MicOff size={12} className="voice-status-icon muted" />}
            {p.deafened && <VolumeX size={12} className="voice-status-icon deafened" />}
          </li>
        ))}
      </ul>

      <div className="voice-controls">
        <button
          type="button"
          className={`voice-control-btn ${isMuted ? "active" : ""}`}
          onClick={onToggleMute}
          title={isMuted ? t("voice.unmute") : t("voice.mute")}
          aria-label={isMuted ? t("voice.unmute") : t("voice.mute")}
        >
          {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <button
          type="button"
          className={`voice-control-btn ${isDeafened ? "active" : ""}`}
          onClick={onToggleDeafen}
          title={isDeafened ? t("voice.undeafen") : t("voice.deafen")}
          aria-label={isDeafened ? t("voice.undeafen") : t("voice.deafen")}
        >
          {isDeafened ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          type="button"
          className="voice-control-btn leave"
          onClick={onLeave}
          title={t("voice.leaveChannel")}
          aria-label={t("voice.leaveChannel")}
        >
          <PhoneOff size={16} />
        </button>
      </div>
    </div>
  );
}

const voicePanelStyles = `
  .voice-panel {
    padding: 8px 12px;
    border-top: 1px solid var(--border);
  }
  .voice-panel-active {
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);
    margin: 4px 8px;
    padding: 10px;
    border-top: none;
    border: 1px solid var(--border);
  }
  .voice-join-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    transition: background var(--transition-fast), color var(--transition-fast);
    cursor: pointer;
    background: none;
    border: none;
  }
  .voice-join-btn:hover {
    background: var(--accent-dim);
    color: var(--accent);
  }
  .voice-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }
  .voice-header-icon {
    color: var(--success);
    flex-shrink: 0;
  }
  .voice-header-text {
    font-size: 12px;
    font-weight: 600;
    color: var(--success);
  }
  .voice-header-channel {
    font-size: 11px;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .voice-participants {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
  }
  .voice-participant {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 4px;
    border-radius: var(--radius-sm);
    font-size: 12px;
  }
  .voice-avatar-wrap {
    border-radius: 50%;
    padding: 2px;
    transition: box-shadow 0.2s ease;
  }
  .voice-avatar-wrap.speaking {
    box-shadow: 0 0 0 2px var(--success), 0 0 8px rgba(34, 197, 94, 0.4);
    animation: voicePulse 1.5s ease-in-out infinite;
  }
  @keyframes voicePulse {
    0%, 100% { box-shadow: 0 0 0 2px var(--success), 0 0 6px rgba(34, 197, 94, 0.3); }
    50% { box-shadow: 0 0 0 3px var(--success), 0 0 12px rgba(34, 197, 94, 0.5); }
  }
  .voice-participant-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-primary);
    font-weight: 450;
  }
  .voice-status-icon {
    flex-shrink: 0;
  }
  .voice-status-icon.muted {
    color: var(--danger);
  }
  .voice-status-icon.deafened {
    color: var(--text-muted);
  }
  .voice-controls {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }
  .voice-control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius);
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: none;
    cursor: pointer;
    transition: background var(--transition-fast), color var(--transition-fast);
  }
  .voice-control-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
  .voice-control-btn.active {
    background: var(--danger);
    color: #fff;
  }
  .voice-control-btn.active:hover {
    background: var(--danger);
    opacity: 0.85;
  }
  .voice-control-btn.leave {
    background: var(--danger);
    color: #fff;
  }
  .voice-control-btn.leave:hover {
    opacity: 0.85;
  }
`;
