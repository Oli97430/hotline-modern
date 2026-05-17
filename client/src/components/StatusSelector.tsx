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
  const currentColor = STATUS_OPTIONS.find((o) => o.value === currentStatus)?.color || "#22c55e";

  return (
    <div className="status-selector">
      <span className="status-dot-sel" style={{ backgroundColor: currentColor }} />
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
      <style>{`
        .status-selector {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-dot-sel {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .status-select {
          font-size: 11px;
          padding: 2px 4px;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--text-secondary);
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .status-select:hover {
          color: var(--text-primary);
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
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--bg-secondary);
        }
      `}</style>
    </span>
  );
}
