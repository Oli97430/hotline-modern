import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChannelPasswordPromptProps {
  channelName: string;
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

export function ChannelPasswordPrompt({ channelName, onSubmit, onCancel }: ChannelPasswordPromptProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (!password.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onSubmit(password);
  };

  return (
    <div className="modal-overlay" onClick={onCancel} onKeyDown={(e) => e.key === "Escape" && onCancel()} role="dialog" tabIndex={-1}>
      <div className={`channel-pw-modal ${shake ? "shake" : ""}`} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="presentation">
        <div className="channel-pw-icon">
          <Lock size={24} />
        </div>
        <h3 className="channel-pw-title">{t("channel.passwordRequired")}</h3>
        <p className="channel-pw-desc">{t("channel.passwordDesc", { channel: channelName })}</p>
        <div className="channel-pw-input-row">
          <input
            type="password"
            className="channel-pw-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
              if (e.key === "Escape") onCancel();
            }}
            placeholder={t("channel.passwordPlaceholderJoin")}
            autoFocus
          />
          <button type="button" className="channel-pw-submit" onClick={handleSubmit} disabled={!password.trim()}>
            <ArrowRight size={16} />
          </button>
        </div>
        <button type="button" className="channel-pw-cancel" onClick={onCancel}>
          {t("channel.cancel")}
        </button>
      </div>

      <style>{`
        .channel-pw-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
          text-align: center;
        }
        .channel-pw-modal.shake {
          animation: headShake 0.5s ease;
        }
        .channel-pw-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15);
          animation: lockPulse 2s ease-in-out infinite;
        }
        @keyframes lockPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15); }
          50% { box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.25); }
        }
        .channel-pw-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .channel-pw-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .channel-pw-input-row {
          display: flex;
          gap: 8px;
          width: 100%;
          margin-top: 4px;
        }
        .channel-pw-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 14px;
          text-align: center;
          letter-spacing: 2px;
        }
        .channel-pw-submit {
          padding: 10px 14px;
          background: var(--accent);
          color: #fff;
          border-radius: var(--radius);
          transition: background var(--transition-normal), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .channel-pw-submit:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .channel-pw-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .channel-pw-cancel {
          font-size: 12px;
          color: var(--text-muted);
          padding: 4px 12px;
          transition: color var(--transition-fast);
        }
        .channel-pw-cancel:hover {
          color: var(--text-primary);
        }
        @keyframes headShake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(5px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
