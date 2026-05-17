import { useTranslation } from "react-i18next";

interface StatusSelectorProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: "available", label: "status.available", color: "#22c55e" },
  { value: "away", label: "status.away", color: "#eab308" },
  { value: "busy", label: "status.busy", color: "#ef4444" },
];

export function StatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="status-selector">
      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="status-select"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.label)}
          </option>
        ))}
      </select>
      <span
        className="status-dot-indicator"
        style={{ backgroundColor: STATUS_OPTIONS.find((o) => o.value === currentStatus)?.color }}
      />
      <style>{`
        .status-selector {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-select {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border);
          cursor: pointer;
        }
        .status-dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

export function StatusDot({ status }: { status: string }) {
  const color = status === "away" ? "#eab308" : status === "busy" ? "#ef4444" : "#22c55e";
  return (
    <span
      className="user-status-dot"
      style={{ backgroundColor: color }}
      title={status}
    >
      <style>{`
        .user-status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </span>
  );
}
