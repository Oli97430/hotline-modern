import { Loader, WifiOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConnectionStatusProps {
  status: string;
  reconnectIn: number;
}

export function ConnectionStatus({ status, reconnectIn }: ConnectionStatusProps) {
  const { t } = useTranslation();

  if (status === "connected") return null;

  return (
    <div className={`connection-status ${status}`}>
      <div className="connection-status-content">
        {status === "reconnecting" && (
          <>
            <span className="connection-dot danger" />
            <WifiOff size={13} />
            <span>{t("connection.reconnecting", { seconds: reconnectIn })}</span>
          </>
        )}
        {status === "connecting" && (
          <>
            <span className="connection-dot accent" />
            <Loader size={13} className="spin" />
            <span>{t("connection.connecting")}</span>
          </>
        )}
        {status === "authenticating" && (
          <>
            <span className="connection-dot accent" />
            <Loader size={13} className="spin" />
            <span>{t("connection.authenticating")}</span>
          </>
        )}
      </div>
      {status === "reconnecting" && (
        <div className="connection-progress">
          <div className="connection-progress-bar" />
        </div>
      )}

      <style>{`
        .connection-status {
          animation: slideDown 0.2s ease;
          overflow: hidden;
        }
        .connection-status-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 500;
        }
        .connection-status.reconnecting .connection-status-content {
          background: rgba(239, 68, 68, 0.06);
          color: var(--danger);
        }
        .connection-status.connecting .connection-status-content,
        .connection-status.authenticating .connection-status-content {
          background: rgba(6, 182, 212, 0.06);
          color: var(--accent);
        }
        .connection-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .connection-dot.danger { background: var(--danger); box-shadow: 0 0 6px var(--danger); }
        .connection-dot.accent { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
        .connection-progress {
          height: 2px;
          background: rgba(239, 68, 68, 0.15);
          overflow: hidden;
        }
        .connection-progress-bar {
          height: 100%;
          background: var(--danger);
          animation: progressShrink 5s linear infinite;
          transform-origin: left;
        }
        @keyframes progressShrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
