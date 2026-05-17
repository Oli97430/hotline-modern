import { useTranslation } from "react-i18next";
import { WifiOff, Loader } from "lucide-react";

interface ConnectionStatusProps {
  status: string;
  reconnectIn: number;
}

export function ConnectionStatus({ status, reconnectIn }: ConnectionStatusProps) {
  const { t } = useTranslation();

  if (status === "connected") return null;

  return (
    <div className={`connection-status ${status}`}>
      {status === "reconnecting" && (
        <>
          <WifiOff size={14} />
          <span>{t("connection.reconnecting", { seconds: reconnectIn })}</span>
        </>
      )}
      {status === "connecting" && (
        <>
          <Loader size={14} className="spin" />
          <span>{t("connection.connecting")}</span>
        </>
      )}
      {status === "authenticating" && (
        <>
          <Loader size={14} className="spin" />
          <span>{t("connection.authenticating")}</span>
        </>
      )}

      <style>{`
        .connection-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          animation: slideDown 0.2s ease;
        }
        .connection-status.reconnecting {
          background: rgba(239, 68, 68, 0.1);
          border-bottom: 1px solid var(--danger);
          color: var(--danger);
        }
        .connection-status.connecting,
        .connection-status.authenticating {
          background: rgba(6, 182, 212, 0.1);
          border-bottom: 1px solid var(--accent);
          color: var(--accent);
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
