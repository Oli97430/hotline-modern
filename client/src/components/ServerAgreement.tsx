import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ServerAgreementProps {
  agreement: string;
  serverAddress: string;
  onAccept: () => void;
  onDecline: () => void;
}

function getAcceptedKey(serverAddress: string): string {
  return `hotline-agreement-${serverAddress}`;
}

/** Simple hash to avoid storing large agreement text in localStorage */
async function hashAgreement(text: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback: simple djb2 hash
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export function hasAcceptedAgreement(serverAddress: string, _agreement: string): boolean {
  if (!_agreement) return true;
  // We store a SHA-256 hash on accept — if any hash exists, the user accepted
  return localStorage.getItem(getAcceptedKey(serverAddress)) !== null;
}

export function ServerAgreement({ agreement, serverAddress, onAccept, onDecline }: ServerAgreementProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const onAcceptRef = useRef(onAccept);
  onAcceptRef.current = onAccept;

  useEffect(() => {
    if (!agreement || hasAcceptedAgreement(serverAddress, agreement)) {
      onAcceptRef.current();
      setVisible(false);
    }
  }, [agreement, serverAddress]);

  if (!visible || !agreement) return null;

  const handleAccept = () => {
    hashAgreement(agreement).then((h) => localStorage.setItem(getAcceptedKey(serverAddress), h));
    onAccept();
    setVisible(false);
  };

  const handleDecline = () => {
    onDecline();
    setVisible(false);
  };

  return (
    <div className="agreement-overlay">
      <div className="agreement-modal">
        <h2 className="agreement-title">{t("agreement.title")}</h2>
        <div className="agreement-content">
          <pre className="agreement-text">{agreement}</pre>
        </div>
        <div className="agreement-actions">
          <button className="agreement-decline" onClick={handleDecline}>
            {t("agreement.decline")}
          </button>
          <button className="agreement-accept" onClick={handleAccept}>
            {t("agreement.accept")}
          </button>
        </div>
      </div>
      <style>{`
        .agreement-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.15s ease;
        }
        .agreement-modal {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 12px);
          padding: 24px;
          max-width: 540px;
          width: 90%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.2s ease;
        }
        .agreement-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }
        .agreement-content {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle, var(--border));
          border-radius: var(--radius);
        }
        .agreement-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          font-family: inherit;
        }
        .agreement-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .agreement-decline {
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .agreement-decline:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .agreement-accept {
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius);
          background: var(--accent);
          color: #fff;
          transition: all var(--transition-fast);
        }
        .agreement-accept:hover {
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
