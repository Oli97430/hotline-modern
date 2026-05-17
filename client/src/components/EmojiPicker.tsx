import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const EMOJI_CATEGORIES = [
  {
    key: "smileys",
    emojis: ["😀", "😂", "🤣", "😍", "🥰", "😘", "😎", "🤔", "🥳", "😢", "😡", "😏", "🤗", "😴", "🥺", "😈"],
  },
  {
    key: "gestures",
    emojis: ["👍", "👎", "👋", "🙌", "👏", "🤝", "🙏", "💪", "🫡", "🤙", "✌️", "🤞", "👀", "🫶", "✋", "👊"],
  },
  {
    key: "symbols",
    emojis: ["🔥", "❤️", "💯", "⭐", "🎉", "🎊", "🚀", "⚡", "✅", "❌", "💬", "💡", "🏆", "💎", "🌟", "🎯"],
  },
  {
    key: "objects",
    emojis: ["💻", "📱", "🎮", "🎧", "📸", "🎬", "🔒", "🔑", "📂", "📌", "🔔", "⏰", "🧪", "🛠️", "📊", "🗂️"],
  },
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const filteredCategories = filter
    ? [{ key: "results", emojis: EMOJI_CATEGORIES.flatMap((c) => c.emojis).filter((e) => e.includes(filter)) }]
    : EMOJI_CATEGORIES;

  return (
    <div ref={ref} className="emoji-picker">
      <input
        className="emoji-search"
        type="text"
        placeholder={t("chat.searchEmoji") || "Search..."}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        autoFocus
      />
      <div className="emoji-grid-area">
        {filteredCategories.map((cat) => (
          <div key={cat.key} className="emoji-category">
            {!filter && <div className="emoji-cat-label">{t(`emoji.${cat.key}`) || cat.key}</div>}
            <div className="emoji-grid">
              {cat.emojis.map((emoji) => (
                <button key={emoji} className="emoji-item" onClick={() => onSelect(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filter && filteredCategories[0]?.emojis.length === 0 && (
          <div className="emoji-empty">No emoji found</div>
        )}
      </div>
      <style>{`
        .emoji-picker {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 10px;
          z-index: 100;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.12s ease;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .emoji-search {
          width: 100%;
          padding: 7px 10px;
          font-size: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .emoji-search:focus {
          border-color: var(--accent);
        }
        .emoji-search::placeholder {
          color: var(--text-muted);
        }
        .emoji-grid-area {
          max-height: 240px;
          overflow-y: auto;
        }
        .emoji-category {
          margin-bottom: 4px;
        }
        .emoji-cat-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          padding: 4px 4px 2px;
        }
        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
        }
        .emoji-item {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .emoji-item:hover {
          background: var(--bg-tertiary);
          transform: scale(1.2);
        }
        .emoji-item:active {
          transform: scale(0.95);
        }
        .emoji-empty {
          padding: 24px 16px;
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
