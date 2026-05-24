import { Check, Copy, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface E2EIndicatorProps {
  enabled: boolean;
  peerFingerprint?: string;
  ownFingerprint?: string;
}

export function E2EIndicator({ enabled, peerFingerprint, ownFingerprint }: E2EIndicatorProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!enabled) {
    return (
      <div className="e2e-indicator not-encrypted" title={t("e2e.notEncrypted")}>
        <ShieldAlert size={13} />
        <style>{`
          .e2e-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            font-weight: 500;
            padding: 3px 8px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all var(--transition-fast);
          }
          .e2e-indicator.not-encrypted {
            color: var(--text-muted);
            background: var(--bg-tertiary);
          }
        `}</style>
      </div>
    );
  }

  const handleCopy = () => {
    if (peerFingerprint) {
      navigator.clipboard.writeText(peerFingerprint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button type="button" className="e2e-indicator encrypted" onClick={() => setShowDetails((v) => !v)} title={t("e2e.encrypted")}>
        <ShieldCheck size={13} />
        <span>{t("e2e.label")}</span>
      </button>

      {showDetails && (
        <div className="e2e-details">
          <div className="e2e-details-header">
            <Shield size={14} />
            <span>{t("e2e.title")}</span>
          </div>
          <p className="e2e-details-desc">{t("e2e.description")}</p>
          {ownFingerprint && (
            <div className="e2e-fingerprint">
              <span className="e2e-fp-label">{t("e2e.yourKey")}</span>
              <code className="e2e-fp-value">{ownFingerprint.slice(0, 16)}...</code>
            </div>
          )}
          {peerFingerprint && (
            <div className="e2e-fingerprint">
              <span className="e2e-fp-label">{t("e2e.peerKey")}</span>
              <code className="e2e-fp-value">{peerFingerprint.slice(0, 16)}...</code>
              <button type="button" className="e2e-fp-copy" onClick={handleCopy}>
                {copied ? <Check size={11} /> : <Copy size={11} />}
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        .e2e-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .e2e-indicator.encrypted {
          color: var(--success);
          background: rgba(34, 197, 94, 0.08);
        }
        .e2e-indicator.encrypted:hover {
          background: rgba(34, 197, 94, 0.14);
        }
        .e2e-indicator.not-encrypted {
          color: var(--text-muted);
          background: var(--bg-tertiary);
        }
        .e2e-details {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 12px;
          min-width: 240px;
          box-shadow: var(--shadow-md);
          animation: fadeInScale 0.15s ease;
          z-index: 50;
        }
        .e2e-details-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: var(--success);
          margin-bottom: 6px;
        }
        .e2e-details-desc {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .e2e-fingerprint {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 0;
        }
        .e2e-fp-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          min-width: 60px;
        }
        .e2e-fp-value {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .e2e-fp-copy {
          color: var(--text-muted);
          padding: 2px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }
        .e2e-fp-copy:hover {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
