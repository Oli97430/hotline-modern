import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreateChannelModalProps {
  onSubmit: (name: string, topic: string, password: string) => void;
  onClose: () => void;
}

export function CreateChannelModal({ onSubmit, onClose }: CreateChannelModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const channelName = name.trim().toLowerCase().replace(/\s+/g, "-");
    if (channelName) {
      onSubmit(channelName, topic.trim(), password.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="create-channel-title" onClick={onClose}>
      <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3 id="create-channel-title">{t("channel.create")}</h3>

        <div className="modal-field">
          <label htmlFor="channel-name">{t("channel.name")}</label>
          <input
            id="channel-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="general"
            autoFocus
            maxLength={32}
            aria-required="true"
          />
        </div>

        <div className="modal-field">
          <label htmlFor="channel-topic">{t("channel.topic")}</label>
          <input
            id="channel-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("channel.topic")}
            maxLength={128}
          />
        </div>

        <div className="modal-field">
          <label htmlFor="channel-password">{t("channel.password")}</label>
          <input
            id="channel-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("channel.passwordPlaceholder")}
            maxLength={64}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="modal-btn-cancel" onClick={onClose}>
            {t("channel.cancel")}
          </button>
          <button type="submit" className="modal-btn-submit" disabled={!name.trim()}>
            {t("channel.submit")}
          </button>
        </div>
      </form>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fadeIn 0.15s ease;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .modal-content h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .modal-field input {
          padding: 10px 12px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 8px;
        }
        .modal-btn-cancel {
          padding: 9px 16px;
          border-radius: var(--radius);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .modal-btn-cancel:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .modal-btn-submit {
          padding: 9px 20px;
          border-radius: var(--radius);
          background: var(--accent);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          transition: background var(--transition-normal), transform var(--transition-fast);
        }
        .modal-btn-submit:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .modal-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .modal-btn-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
