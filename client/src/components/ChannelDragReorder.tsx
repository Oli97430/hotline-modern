import { useState, useRef, useCallback } from "react";

interface DragItem {
  index: number;
  name: string;
}

interface ChannelDragReorderProps {
  channels: string[];
  onReorder: (channels: string[]) => void;
}

const STORAGE_KEY = "hotline-channel-order";

export function loadChannelOrder(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

export function saveChannelOrder(order: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function applyChannelOrder<T extends { name: string }>(channels: T[], savedOrder: string[]): T[] {
  if (savedOrder.length === 0) return channels;
  const ordered: T[] = [];
  const remaining = [...channels];

  for (const name of savedOrder) {
    const idx = remaining.findIndex((c) => c.name === name);
    if (idx !== -1) {
      ordered.push(remaining[idx]);
      remaining.splice(idx, 1);
    }
  }
  // Append any channels not in saved order
  return [...ordered, ...remaining];
}

export function useChannelDragReorder(channels: string[], onReorder: (channels: string[]) => void) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragItemRef = useRef<DragItem | null>(null);

  const handleDragStart = useCallback((index: number, name: string) => {
    dragItemRef.current = { index, name };
    setDraggedIdx(index);
  }, []);

  const handleDragOver = useCallback((index: number) => {
    setOverIdx(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedIdx !== null && overIdx !== null && draggedIdx !== overIdx) {
      const reordered = [...channels];
      const [removed] = reordered.splice(draggedIdx, 1);
      reordered.splice(overIdx, 0, removed);
      onReorder(reordered);
      saveChannelOrder(reordered);
    }
    setDraggedIdx(null);
    setOverIdx(null);
    dragItemRef.current = null;
  }, [draggedIdx, overIdx, channels, onReorder]);

  return {
    draggedIdx,
    overIdx,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}

export function ChannelDragReorder({ channels, onReorder }: ChannelDragReorderProps) {
  const { draggedIdx, overIdx, handleDragStart, handleDragOver, handleDragEnd } = useChannelDragReorder(channels, onReorder);

  return (
    <div className="channel-drag-list">
      {channels.map((ch, i) => (
        <div
          key={ch}
          className={`channel-drag-item ${draggedIdx === i ? "dragging" : ""} ${overIdx === i ? "over" : ""}`}
          draggable
          onDragStart={() => handleDragStart(i, ch)}
          onDragOver={(e) => { e.preventDefault(); handleDragOver(i); }}
          onDragEnd={handleDragEnd}
        >
          <span className="channel-drag-grip">⠿</span>
          <span className="channel-drag-name">#{ch}</span>
        </div>
      ))}

      <style>{`
        .channel-drag-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .channel-drag-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          cursor: grab;
          transition: background var(--transition-fast), transform var(--transition-fast), opacity var(--transition-fast);
          user-select: none;
        }
        .channel-drag-item:hover {
          background: var(--bg-tertiary);
        }
        .channel-drag-item.dragging {
          opacity: 0.4;
          cursor: grabbing;
        }
        .channel-drag-item.over {
          border-top: 2px solid var(--accent);
          padding-top: 4px;
        }
        .channel-drag-grip {
          color: var(--text-muted);
          font-size: 12px;
          opacity: 0.5;
        }
        .channel-drag-item:hover .channel-drag-grip {
          opacity: 1;
        }
        .channel-drag-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
