import { Hash, Lock, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChannelSettingsModalProps {
  channel: { name: string; topic: string; userCount: number; hasPassword?: boolean };
  onSetTopic: (channel: string, topic: string) => void;
  onClose: () => void;
  canEdit: boolean;
}

export function ChannelSettingsModal({ channel, onSetTopic, onClose, canEdit }: ChannelSettingsModalProps) {
  const { t } = useTranslation();
  const [topic, setTopic] = useState(channel.topic);

  const handleSave = () => {
    if (topic !== channel.topic) {
      onSetTopic(channel.name, topic.trim());
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chsettings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chsettings-header">
          <div className="chsettings-icon">{channel.hasPassword ? <Lock size={18} /> : <Hash size={18} />}</div>
          <div>
            <h3>{channel.name}</h3>
            <span className="chsettings-subtitle">{t("channelSettings.title")}</span>
          </div>
        </div>

        <div className="chsettings-info">
          <div className="chsettings-stat">
            <Users size={14} />
            <span>
              {channel.userCount} {t("channelSettings.members")}
            </span>
          </div>
          {channel.hasPassword && (
            <div className="chsettings-stat">
              <Lock size={14} />
              <span>{t("channelSettings.passwordProtected")}</span>
            </div>
          )}
        </div>

        <div className="chsettings-field">
          <label>{t("channel.topic")}</label>
          {canEdit ? (
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("channelSettings.topicPlaceholder")}
              maxLength={256}
              rows={3}
            />
          ) : (
            <div className="chsettings-topic-display">
              {channel.topic || <em className="text-muted">{t("channelSettings.noTopic")}</em>}
            </div>
          )}
        </div>

        <div className="chsettings-actions">
          <button className="modal-btn-cancel" onClick={onClose}>
            {canEdit ? t("channel.cancel") : t("channelSettings.close")}
          </button>
          {canEdit && (
            <button className="modal-btn-submit" onClick={handleSave} disabled={topic === channel.topic}>
              {t("channelSettings.save")}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .chsettings-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .chsettings-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .chsettings-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chsettings-header h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .chsettings-subtitle {
          font-size: 12px;
          color: var(--text-muted);
        }
        .chsettings-info {
          display: flex;
          gap: 16px;
          padding: 12px 14px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
        }
        .chsettings-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .chsettings-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .chsettings-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .chsettings-field textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
        }
        .chsettings-topic-display {
          padding: 10px 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .chsettings-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 4px;
        }
        .chsettings-actions .modal-btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
