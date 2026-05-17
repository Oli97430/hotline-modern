import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

interface ConnectDialogProps {
  onConnect: (address: string, nickname: string) => void;
  isConnecting: boolean;
}

export function ConnectDialog({ onConnect, isConnecting }: ConnectDialogProps) {
  const { t } = useTranslation();
  const [address, setAddress] = useState("localhost:9998");
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && nickname.trim()) {
      onConnect(address, nickname.trim());
    }
  };

  return (
    <div className="connect-overlay">
      <div className="connect-bg-glow" />
      <form className="connect-dialog" onSubmit={handleSubmit}>
        <div className="connect-logo">
          <img src="/logo.svg" alt="Hotline Modern" className="connect-logo-img" />
          <h1>{t("app.name")}</h1>
          <p className="connect-subtitle">{t("connect.title")}</p>
        </div>

        <div className="connect-field">
          <label>{t("connect.serverAddress")}</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t("connect.serverPlaceholder")}
            disabled={isConnecting}
          />
        </div>

        <div className="connect-field">
          <label>{t("connect.nickname")}</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t("connect.nicknamePlaceholder")}
            disabled={isConnecting}
            maxLength={32}
            autoFocus
          />
        </div>

        <button type="submit" className="connect-btn" disabled={isConnecting || !nickname.trim()}>
          {isConnecting ? (
            <>
              <Loader size={16} className="connect-spinner" />
              {t("connect.connecting")}
            </>
          ) : (
            <>
              {t("connect.button")}
              <kbd className="connect-kbd">↵</kbd>
            </>
          )}
        </button>
      </form>

      <style>{`
        .connect-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }
        .connect-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .connect-dialog {
          position: relative;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px 40px;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.3s ease;
          box-shadow: var(--shadow-lg);
        }
        .connect-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .connect-logo-img {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          box-shadow: 0 0 24px rgba(var(--accent-rgb), 0.2);
          animation: logoFloat 3s ease-in-out infinite;
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .connect-logo h1 {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.3px;
        }
        .connect-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 400;
        }
        .connect-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .connect-field label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .connect-field input {
          padding: 10px 14px;
          font-size: 14px;
        }
        .connect-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          padding: 12px 20px;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 14px;
          margin-top: 4px;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .connect-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.35);
        }
        .connect-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        .connect-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .connect-spinner {
          animation: spin 1s linear infinite;
        }
        .connect-kbd {
          font-size: 11px;
          font-weight: 500;
          opacity: 0.6;
          background: rgba(255, 255, 255, 0.1);
          padding: 1px 6px;
          border-radius: 3px;
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
}
