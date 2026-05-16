import { useTranslation } from "react-i18next";

interface MessageBubbleProps {
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
  isOwn: boolean;
}

export function MessageBubble({ nickname, content, role, timestamp, isOwn }: MessageBubbleProps) {
  const { i18n } = useTranslation();

  const time = new Intl.DateTimeFormat(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));

  const roleColor = `var(--role-${role})`;

  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <div className="message-header">
        <span className="message-nick" style={{ color: roleColor }}>
          {nickname}
        </span>
        <span className="message-time">{time}</span>
      </div>
      <div className="message-content">{content}</div>

      <style>{`
        .message {
          padding: 4px 16px;
          transition: background 0.1s;
          animation: fadeIn 0.15s ease;
        }
        .message:hover {
          background: var(--bg-secondary);
        }
        .message.own .message-nick {
          font-weight: 600;
        }
        .message-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }
        .message-nick {
          font-size: 13px;
          font-weight: 500;
        }
        .message-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.4;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}
