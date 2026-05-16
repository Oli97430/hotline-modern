import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

interface ServerBannerProps {
  motd: string;
}

export function ServerBanner({ motd }: ServerBannerProps) {
  const { t } = useTranslation();

  if (!motd) return null;

  return (
    <div className="server-banner">
      <Info size={14} />
      <span className="banner-label">{t("server.motd")}:</span>
      <span className="banner-text">{motd}</span>

      <style>{`
        .server-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--accent-dim);
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          color: var(--accent);
        }
        .banner-label {
          font-weight: 500;
        }
        .banner-text {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
