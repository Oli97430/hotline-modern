import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreateChannelModalProps {
  onSubmit: (name: string, topic: string) => void;
  onClose: () => void;
}

export function CreateChannelModal({ onSubmit, onClose }: CreateChannelModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const channelName = name.trim().toLowerCase().replace(/\s+/g, "-");
    if (channelName) {
      onSubmit(channelName, topic.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>{t("channel.create")}</h3>

        <div className="modal-field">
          <label>{t("channel.name")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="general"
            autoFocus
            maxLength={32}
          />
        </div>

        <div className="modal-field">
          <label>{t("channel.topic")}</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t("channel.topic")}
            maxLength={128}
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
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fadeIn 0.15s ease;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeInScale 0.2s ease;
        }
        .modal-content h3 {
          font-size: 16px;
          font-weight: 600;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-field label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 4px;
        }
        .modal-btn-cancel {
          padding: 8px 16px;
          border-radius: var(--radius);
          color: var(--text-secondary);
          font-size: 13px;
          transition: color 0.2s;
        }
        .modal-btn-cancel:hover {
          color: var(--text-primary);
        }
        .modal-btn-submit {
          padding: 8px 16px;
          border-radius: var(--radius);
          background: var(--accent);
          color: var(--bg-primary);
          font-size: 13px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .modal-btn-submit:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        .modal-btn-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
