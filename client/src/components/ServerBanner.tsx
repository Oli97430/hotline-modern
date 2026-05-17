import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Info, X, ChevronDown, ChevronUp } from "lucide-react";

interface ServerBannerProps {
  motd: string;
}

export function ServerBanner({ motd }: ServerBannerProps) {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!motd || dismissed) return null;

  const isLong = motd.length > 120;

  return (
    <div className={`server-banner ${expanded ? "expanded" : ""}`}>
      <div className="banner-main">
        <Info size={14} className="banner-icon" />
        <span className="banner-label">{t("server.motd")}</span>
        <span className="banner-text">{expanded || !isLong ? motd : motd.slice(0, 120) + "…"}</span>
        <div className="banner-actions">
          {isLong && (
            <button className="banner-expand" onClick={() => setExpanded((v) => !v)} title={expanded ? "Collapse" : "Expand"}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
          <button className="banner-dismiss" onClick={() => setDismissed(true)} title="Dismiss">
            <X size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .server-banner {
          background: var(--accent-dim);
          border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
          font-size: 13px;
          color: var(--accent);
          animation: slideDown 0.2s ease;
          overflow: hidden;
        }
        .banner-main {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
        }
        .banner-icon {
          flex-shrink: 0;
          opacity: 0.8;
        }
        .banner-label {
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          flex-shrink: 0;
        }
        .banner-text {
          color: var(--text-secondary);
          flex: 1;
          line-height: 1.4;
        }
        .server-banner.expanded .banner-text {
          white-space: pre-wrap;
        }
        .banner-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
          flex-shrink: 0;
        }
        .banner-expand, .banner-dismiss {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          display: flex;
        }
        .banner-expand:hover, .banner-dismiss:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
