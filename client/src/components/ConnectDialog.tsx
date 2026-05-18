import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Capacitor } from "@capacitor/core";
import { Loader, Star, X, Zap } from "lucide-react";
import { useServerFavorites, ServerFavorite } from "../hooks/useServerFavorites";
import { ServerBrowser } from "./ServerBrowser";

function getDefaultAddress(): string {
  if (Capacitor.isNativePlatform()) {
    // On native app, use last known IP or show placeholder
    const lastIp = localStorage.getItem("hotline-last-server-ip");
    return lastIp ? `${lastIp}:9998` : "";
  }
  const host = window.location.hostname || "localhost";
  return `${host}:9998`;
}

interface ConnectDialogProps {
  onConnect: (address: string, nickname: string) => void;
  isConnecting: boolean;
}

export function ConnectDialog({ onConnect, isConnecting }: ConnectDialogProps) {
  const { t } = useTranslation();
  const [address, setAddress] = useState(getDefaultAddress);
  const [nickname, setNickname] = useState("");
  const { favorites, addFavorite, removeFavorite } = useServerFavorites();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && nickname.trim()) {
      addFavorite(address, nickname.trim());
      onConnect(address, nickname.trim());
    }
  };

  const handleFavoriteClick = (fav: ServerFavorite) => {
    setAddress(fav.address);
    setNickname(fav.nickname);
  };

  const handleFavoriteConnect = (fav: ServerFavorite) => {
    addFavorite(fav.address, fav.nickname);
    onConnect(fav.address, fav.nickname);
  };

  const handleBrowserConnect = (addr: string) => {
    setAddress(addr);
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

        <ServerBrowser onConnect={handleBrowserConnect} />

        {favorites.length > 0 && (
          <div className="connect-favorites">
            <div className="connect-favorites-header">
              <Star size={12} />
              <span>{t("connect.recentServers")}</span>
            </div>
            <ul className="connect-favorites-list">
              {favorites.slice(0, 5).map((fav) => (
                <li key={fav.id} className="connect-fav-item">
                  <button className="connect-fav-btn" onClick={() => handleFavoriteClick(fav)} title={fav.address}>
                    <span className="connect-fav-addr">{fav.address}</span>
                    <span className="connect-fav-nick">{fav.nickname}</span>
                  </button>
                  <button className="connect-fav-quick" onClick={() => handleFavoriteConnect(fav)} title={t("connect.quickConnect")}>
                    <Zap size={11} />
                  </button>
                  <button className="connect-fav-remove" onClick={() => removeFavorite(fav.id)} title={t("connect.removeFavorite")}>
                    <X size={11} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
        .connect-favorites {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 4px;
        }
        .connect-favorites-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .connect-favorites-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .connect-fav-item {
          display: flex;
          align-items: center;
          gap: 4px;
          animation: fadeIn 0.15s ease;
        }
        .connect-fav-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid transparent;
          transition: all var(--transition-fast);
          cursor: pointer;
          min-width: 0;
        }
        .connect-fav-btn:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
        }
        .connect-fav-addr {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .connect-fav-nick {
          font-size: 11px;
          color: var(--text-muted);
          flex-shrink: 0;
          margin-left: 8px;
        }
        .connect-fav-quick {
          padding: 6px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .connect-fav-quick:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .connect-fav-remove {
          padding: 6px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .connect-fav-remove:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
      `}</style>
    </div>
  );
}
