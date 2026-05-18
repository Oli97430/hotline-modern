import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface ConnectionQualityProps {
  latency: number | null;
  connectedSince?: number;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export function ConnectionQuality({ latency, connectedSince }: ConnectionQualityProps) {
  const { t } = useTranslation();
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    if (!connectedSince) {
      setElapsed("");
      return;
    }
    const update = () => setElapsed(formatDuration(Date.now() - connectedSince));
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [connectedSince]);

  if (latency === null) return null;

  const quality = latency < 100 ? "good" : latency < 300 ? "fair" : "poor";
  const colorClass = `cq-dot-${quality}`;
  const qualityLabel = t(`connection.quality.${quality}`);

  const tooltipText = `${t("connection.latency", { ms: latency })}${elapsed ? ` | ${elapsed}` : ""}`;

  return (
    <div className="connection-quality" title={tooltipText} aria-label={qualityLabel}>
      <span className={`cq-dot ${colorClass}`} />
      <span className="cq-text">{latency}ms</span>

      <style>{`
        .connection-quality {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: default;
          user-select: none;
        }
        .cq-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cq-dot-good {
          background: #22c55e;
          box-shadow: 0 0 4px rgba(34, 197, 94, 0.5);
        }
        .cq-dot-fair {
          background: #eab308;
          box-shadow: 0 0 4px rgba(234, 179, 8, 0.5);
        }
        .cq-dot-poor {
          background: #ef4444;
          box-shadow: 0 0 4px rgba(239, 68, 68, 0.5);
        }
        .cq-text {
          font-size: 10px;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
