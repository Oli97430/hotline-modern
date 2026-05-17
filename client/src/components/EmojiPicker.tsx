import { useEffect, useRef } from "react";

const EMOJIS = [
  "😀", "😂", "😍", "🤔", "😎", "🥳", "😢", "😡",
  "👍", "👎", "👋", "🙌", "🔥", "❤️", "💯", "⭐",
  "🎉", "🎊", "💻", "🚀", "✅", "❌", "⚡", "💬",
  "👀", "🤝", "🙏", "💪", "🫡", "🤣", "😏", "🤙",
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div ref={ref} className="emoji-picker">
      {EMOJIS.map((emoji) => (
        <button key={emoji} className="emoji-item" onClick={() => onSelect(emoji)}>
          {emoji}
        </button>
      ))}
      <style>{`
        .emoji-picker {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
          z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          animation: fadeInScale 0.1s ease;
        }
        .emoji-item {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.1s;
        }
        .emoji-item:hover {
          background: var(--bg-tertiary);
        }
      `}</style>
    </div>
  );
}
