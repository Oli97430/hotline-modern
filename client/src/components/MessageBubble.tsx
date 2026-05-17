import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function formatMessage(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let key = 0;
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\b(https?:\/\/[^\s]+))/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(<code key={key++} className="msg-code">{match[1].slice(1, -1)}</code>);
    } else if (match[2]) {
      parts.push(<strong key={key++}>{match[2].slice(2, -2)}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3].slice(1, -1)}</em>);
    } else if (match[5]) {
      parts.push(<a key={key++} className="msg-link" href={match[5]} target="_blank" rel="noopener noreferrer">{match[5]}</a>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

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
  const formatted = useMemo(() => formatMessage(content), [content]);

  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <div className="message-header">
        <span className="message-nick" style={{ color: roleColor }}>
          {nickname}
        </span>
        <span className="message-time">{time}</span>
      </div>
      <div className="message-content">{formatted}</div>

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
        .msg-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--bg-tertiary);
          padding: 1px 5px;
          border-radius: 4px;
          color: var(--accent);
        }
        .msg-link {
          color: var(--accent);
          text-decoration: none;
        }
        .msg-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
