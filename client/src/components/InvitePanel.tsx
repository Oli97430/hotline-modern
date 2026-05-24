import { Check, Copy, Link, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface InviteData {
  code: string;
  createdBy: string;
  maxUses: number;
  uses: number;
  expiresAt?: number;
  createdAt: number;
}

interface InvitePanelProps {
  invites: InviteData[];
  serverAddress: string;
  onCreateInvite: (maxUses: number, expireHours: number) => void;
  onDeleteInvite: (code: string) => void;
  onClose: () => void;
}

const EXPIRY_OPTIONS = [
  { label: "1h", hours: 1 },
  { label: "24h", hours: 24 },
  { label: "7d", hours: 168 },
  { label: "30d", hours: 720 },
  { label: "never", hours: 0 },
];

export function InvitePanel({ invites, serverAddress, onCreateInvite, onDeleteInvite, onClose }: InvitePanelProps) {
  const { t } = useTranslation();
  const [maxUses, setMaxUses] = useState(0);
  const [expiryIdx, setExpiryIdx] = useState(1); // default 24h
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const getInviteUrl = (code: string) => {
    const protocol = serverAddress.startsWith("wss://") ? "https://" : "http://";
    const base = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
    return `${protocol}${base}/invite/${code}`;
  };

  const handleCreate = () => {
    onCreateInvite(maxUses, EXPIRY_OPTIONS[expiryIdx].hours);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(getInviteUrl(code));
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatExpiry = (expiresAt?: number) => {
    if (!expiresAt) return t("invite.never");
    if (expiresAt < Date.now()) return t("invite.expired");
    const diff = expiresAt - Date.now();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.ceil(diff / 60000)}m`;
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const formatUses = (uses: number, maxUses: number) => {
    if (maxUses === 0) return t("invite.usesUnlimited", { uses });
    return t("invite.uses", { uses, max: maxUses });
  };

  return (
    <div className="invite-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="invite-panel">
        <div className="invite-header">
          <Link size={16} />
          <h3>{t("invite.title")}</h3>
          <button className="invite-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="invite-create-section">
          <div className="invite-create-row">
            <div className="invite-field">
              <label>{t("invite.maxUses")}</label>
              <input
                type="number"
                min={0}
                value={maxUses}
                onChange={(e) => setMaxUses(Math.max(0, Number.parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="invite-field">
              <label>{t("invite.expiry")}</label>
              <select value={expiryIdx} onChange={(e) => setExpiryIdx(Number(e.target.value))}>
                {EXPIRY_OPTIONS.map((opt, i) => (
                  <option key={opt.hours} value={i}>
                    {opt.label === "never" ? t("invite.never") : opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="invite-create-btn" onClick={handleCreate}>
            <Plus size={14} />
            {t("invite.create")}
          </button>
        </div>

        <div className="invite-list">
          {(!invites || invites.length === 0) && <div className="invite-empty">{t("invite.noInvites")}</div>}
          {invites?.map((inv) => {
            const isExpired = inv.expiresAt != null && inv.expiresAt < Date.now();
            const isMaxed = inv.maxUses > 0 && inv.uses >= inv.maxUses;
            return (
              <div key={inv.code} className={`invite-item ${isExpired || isMaxed ? "invite-item-expired" : ""}`}>
                <div className="invite-item-main">
                  <code className="invite-code">{inv.code}</code>
                  <span className="invite-meta">
                    {formatUses(inv.uses, inv.maxUses)} &middot; {formatExpiry(inv.expiresAt)}
                  </span>
                </div>
                <div className="invite-item-actions">
                  <button className="invite-action-btn" onClick={() => handleCopy(inv.code)} title={t("invite.copy")}>
                    {copiedCode === inv.code ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedCode === inv.code ? t("invite.copied") : t("invite.copy")}</span>
                  </button>
                  <button
                    className="invite-action-btn invite-delete-btn"
                    onClick={() => onDeleteInvite(inv.code)}
                    title={t("invite.delete")}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .invite-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          animation: fadeIn 0.15s ease;
        }
        .invite-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 460px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.2s ease;
        }
        .invite-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          color: var(--text-primary);
        }
        .invite-header h3 {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          margin: 0;
        }
        .invite-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .invite-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .invite-create-section {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .invite-create-row {
          display: flex;
          gap: 12px;
        }
        .invite-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .invite-field label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--text-muted);
        }
        .invite-field input,
        .invite-field select {
          padding: 7px 10px;
          font-size: 13px;
          border-radius: var(--radius);
          background: var(--bg-primary);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }
        .invite-create-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--accent);
          color: #fff;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 13px;
          transition: background var(--transition-fast);
        }
        .invite-create-btn:hover {
          background: var(--accent-hover);
        }
        .invite-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px 12px;
        }
        .invite-empty {
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
          padding: 24px;
        }
        .invite-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius);
          transition: background var(--transition-fast);
        }
        .invite-item:hover {
          background: var(--bg-tertiary);
        }
        .invite-item-expired {
          opacity: 0.5;
        }
        .invite-item-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .invite-code {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
          font-family: monospace;
        }
        .invite-meta {
          font-size: 11px;
          color: var(--text-muted);
        }
        .invite-item-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .invite-action-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 8px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .invite-action-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .invite-delete-btn:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
      `}</style>
    </div>
  );
}
