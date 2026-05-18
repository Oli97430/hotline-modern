import { Forward, Hash, Send, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MessageForwardDialogProps {
  messageContent: string;
  messageAuthor: string;
  channels: { name: string }[];
  currentChannel: string;
  onForward: (targetChannel: string, comment?: string) => void;
  onClose: () => void;
}

export function MessageForwardDialog({
  messageContent,
  messageAuthor,
  channels,
  currentChannel,
  onForward,
  onClose,
}: MessageForwardDialogProps) {
  const { t } = useTranslation();
  const [selectedChannel, setSelectedChannel] = useState("");
  const [comment, setComment] = useState("");

  const availableChannels = channels.filter((c) => c.name !== currentChannel);

  const handleForward = () => {
    if (!selectedChannel) return;
    onForward(selectedChannel, comment.trim() || undefined);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="forward-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="forward-header">
          <Forward size={16} />
          <h3>{t("forward.title")}</h3>
          <button className="forward-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="forward-body">
          <div className="forward-preview">
            <span className="forward-preview-author">{messageAuthor}</span>
            <span className="forward-preview-content">
              {messageContent.length > 120 ? messageContent.slice(0, 120) + "..." : messageContent}
            </span>
          </div>

          <div className="forward-target">
            <label className="forward-label">{t("forward.sendTo")}</label>
            <div className="forward-channel-list">
              {availableChannels.map((ch) => (
                <button
                  key={ch.name}
                  className={`forward-channel-btn ${selectedChannel === ch.name ? "selected" : ""}`}
                  onClick={() => setSelectedChannel(ch.name)}
                >
                  <Hash size={12} />
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="forward-comment">
            <input
              type="text"
              placeholder={t("forward.commentPlaceholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="forward-comment-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleForward();
              }}
            />
          </div>
        </div>

        <div className="forward-footer">
          <button className="forward-cancel" onClick={onClose}>
            {t("forward.cancel")}
          </button>
          <button className="forward-submit" onClick={handleForward} disabled={!selectedChannel}>
            <Send size={13} />
            <span>{t("forward.send")}</span>
          </button>
        </div>

        <style>{`
          .forward-dialog {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 420px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .forward-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .forward-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .forward-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .forward-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .forward-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .forward-preview {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border-radius: var(--radius);
            border-left: 3px solid var(--accent);
          }
          .forward-preview-author {
            font-size: 11px;
            font-weight: 700;
            color: var(--accent);
          }
          .forward-preview-content {
            font-size: 12px;
            color: var(--text-secondary);
            line-height: 1.4;
          }
          .forward-target {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .forward-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .forward-channel-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            max-height: 120px;
            overflow-y: auto;
          }
          .forward-channel-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            transition: all var(--transition-fast);
            cursor: pointer;
          }
          .forward-channel-btn:hover {
            color: var(--text-primary);
            border-color: var(--accent);
            background: var(--accent-dim);
          }
          .forward-channel-btn.selected {
            color: var(--accent);
            border-color: var(--accent);
            background: var(--accent-dim);
            font-weight: 600;
          }
          .forward-comment-input {
            width: 100%;
            padding: 8px 12px;
            font-size: 13px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            color: var(--text-primary);
            transition: border-color var(--transition-fast);
          }
          .forward-comment-input:focus {
            border-color: var(--accent);
            outline: none;
          }
          .forward-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 12px 20px;
            border-top: 1px solid var(--border);
          }
          .forward-cancel {
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-muted);
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .forward-cancel:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .forward-submit {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast), transform var(--transition-fast);
          }
          .forward-submit:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }
          .forward-submit:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
}
