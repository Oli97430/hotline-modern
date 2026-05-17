import { useEffect, useRef } from "react";

interface MentionSuggestionsProps {
  users: { userId: string; nickname: string; role: string }[];
  filter: string;
  onSelect: (nickname: string) => void;
  selectedIndex: number;
}

export function MentionSuggestions({ users, filter, onSelect, selectedIndex }: MentionSuggestionsProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = users.filter((u) =>
    u.nickname.toLowerCase().startsWith(filter.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    const active = listRef.current?.children[selectedIndex] as HTMLElement;
    active?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (filtered.length === 0) return null;

  return (
    <div className="mention-suggestions">
      <ul ref={listRef}>
        {filtered.map((user, i) => (
          <li
            key={user.userId}
            className={`mention-item ${i === selectedIndex ? "active" : ""}`}
            onMouseDown={(e) => { e.preventDefault(); onSelect(user.nickname); }}
          >
            <span className="mention-nick" style={{ color: `var(--role-${user.role})` }}>
              @{user.nickname}
            </span>
            <span className="mention-role">{user.role}</span>
          </li>
        ))}
      </ul>

      <style>{`
        .mention-suggestions {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          z-index: 80;
          animation: fadeIn 0.1s ease;
          overflow: hidden;
        }
        .mention-suggestions ul {
          list-style: none;
          max-height: 200px;
          overflow-y: auto;
        }
        .mention-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          cursor: pointer;
          transition: background var(--transition-fast), border-color var(--transition-fast);
          border-left: 2px solid transparent;
        }
        .mention-item:hover {
          background: var(--bg-tertiary);
        }
        .mention-item.active {
          background: var(--accent-dim);
          border-left-color: var(--accent);
        }
        .mention-nick {
          font-size: 13px;
          font-weight: 600;
        }
        .mention-role {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 600;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}
