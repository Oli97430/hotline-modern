import { useState } from "react";
import { useTranslation } from "react-i18next";

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
      <form className="connect-dialog" onSubmit={handleSubmit}>
        <div className="connect-logo">
          <img src="/logo.svg" alt="Hotline Modern" className="connect-logo-img" />
          <h1>{t("app.name")}</h1>
        </div>

        <h2>{t("connect.title")}</h2>

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
          />
        </div>

        <button type="submit" className="connect-btn" disabled={isConnecting || !nickname.trim()}>
          {isConnecting ? t("connect.connecting") : t("connect.button")}
        </button>
      </form>

      <style>{`
        .connect-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: var(--bg-primary);
        }
        .connect-dialog {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.3s ease;
        }
        .connect-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .connect-logo-img {
          width: 80px;
          height: 80px;
          border-radius: 16px;
        }
        .connect-logo h1 {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .connect-dialog h2 {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }
        .connect-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .connect-field label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .connect-btn {
          background: var(--accent);
          color: var(--bg-primary);
          padding: 10px 20px;
          border-radius: var(--radius);
          font-weight: 600;
          transition: background 0.2s;
        }
        .connect-btn:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        .connect-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
