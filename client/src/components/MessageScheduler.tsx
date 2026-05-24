import { Calendar, Clock, Send, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface ScheduledMessage {
  id: string;
  channel: string;
  content: string;
  scheduledTime: number; // unix ms
  createdAt: number;
}

const STORAGE_KEY = "hotline-scheduled-messages";

export function loadScheduledMessages(): ScheduledMessage[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveScheduledMessages(msgs: ScheduledMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

interface MessageSchedulerProps {
  activeChannel: string;
  scheduledMessages: ScheduledMessage[];
  onSchedule: (msg: ScheduledMessage) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function MessageScheduler({
  activeChannel,
  scheduledMessages,
  onSchedule,
  onDelete,
  onClose,
}: MessageSchedulerProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Set minimum datetime to now
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    const local = now.toISOString().slice(0, 16);
    setDateTime(local);
  }, []);

  const handleSchedule = () => {
    if (!content.trim() || !dateTime) return;
    const ts = new Date(dateTime).getTime();
    if (ts <= Date.now()) return;

    const msg: ScheduledMessage = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      channel: activeChannel,
      content: content.trim(),
      scheduledTime: ts,
      createdAt: Date.now(),
    };
    onSchedule(msg);
    setContent("");
  };

  const channelMsgs = scheduledMessages.filter((m) => m.channel === activeChannel);
  const otherMsgs = scheduledMessages.filter((m) => m.channel !== activeChannel);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={(e) => e.key === "Escape" && onClose()} role="dialog" tabIndex={-1}>
      <div className="scheduler-panel" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="presentation">
        <div className="scheduler-header">
          <Clock size={16} />
          <h3>{t("scheduler.title")}</h3>
          <button type="button" className="scheduler-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="scheduler-body">
          <div className="scheduler-form">
            <div className="scheduler-form-row">
              <span className="scheduler-channel-tag">#{activeChannel}</span>
            </div>
            <textarea
              className="scheduler-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t("scheduler.placeholder")}
              rows={3}
            />
            <div className="scheduler-time-row">
              <Calendar size={13} />
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="scheduler-datetime"
                min={new Date().toISOString().slice(0, 16)}
              />
              <button type="button" className="scheduler-submit" onClick={handleSchedule} disabled={!content.trim() || !dateTime}>
                <Send size={12} />
                <span>{t("scheduler.schedule")}</span>
              </button>
            </div>
          </div>

          {channelMsgs.length > 0 && (
            <div className="scheduler-list">
              <span className="scheduler-list-label">
                {t("scheduler.pending")} — #{activeChannel}
              </span>
              {channelMsgs.map((msg) => (
                <div key={msg.id} className="scheduler-item">
                  <div className="scheduler-item-info">
                    <span className="scheduler-item-time">{formatTime(msg.scheduledTime)}</span>
                    <span className="scheduler-item-content">{msg.content}</span>
                  </div>
                  <button type="button" className="scheduler-item-delete" onClick={() => onDelete(msg.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {otherMsgs.length > 0 && (
            <div className="scheduler-list">
              <span className="scheduler-list-label">{t("scheduler.otherChannels")}</span>
              {otherMsgs.map((msg) => (
                <div key={msg.id} className="scheduler-item">
                  <div className="scheduler-item-info">
                    <span className="scheduler-item-channel">#{msg.channel}</span>
                    <span className="scheduler-item-time">{formatTime(msg.scheduledTime)}</span>
                    <span className="scheduler-item-content">{msg.content}</span>
                  </div>
                  <button type="button" className="scheduler-item-delete" onClick={() => onDelete(msg.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <style>{`
          .scheduler-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 440px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .scheduler-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .scheduler-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .scheduler-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .scheduler-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .scheduler-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 420px;
            overflow-y: auto;
          }
          .scheduler-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .scheduler-form-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .scheduler-channel-tag {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent);
            background: var(--accent-dim);
            padding: 3px 8px;
            border-radius: var(--radius-sm);
          }
          .scheduler-textarea {
            width: 100%;
            padding: 10px 12px;
            font-size: 13px;
            resize: none;
            min-height: 60px;
            border-radius: var(--radius);
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            color: var(--text-primary);
            transition: border-color var(--transition-fast);
          }
          .scheduler-textarea:focus {
            border-color: var(--accent);
            outline: none;
          }
          .scheduler-time-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-muted);
          }
          .scheduler-datetime {
            flex: 1;
            padding: 6px 10px;
            font-size: 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
          }
          .scheduler-submit {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 7px 12px;
            font-size: 11px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
          }
          .scheduler-submit:hover:not(:disabled) {
            background: var(--accent-hover);
          }
          .scheduler-submit:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .scheduler-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .scheduler-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .scheduler-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
          }
          .scheduler-item-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
          .scheduler-item-channel {
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
          }
          .scheduler-item-time {
            font-size: 10px;
            font-weight: 500;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }
          .scheduler-item-content {
            font-size: 12px;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .scheduler-item-delete {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast);
            flex-shrink: 0;
          }
          .scheduler-item-delete:hover {
            color: var(--danger);
          }
        `}</style>
      </div>
    </div>
  );
}
