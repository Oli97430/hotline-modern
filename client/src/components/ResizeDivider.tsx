import { useCallback, useRef, useEffect } from "react";

interface ResizeDividerProps {
  direction: "horizontal" | "vertical";
  onResize: (delta: number) => void;
  onResizeEnd?: () => void;
}

/**
 * Draggable divider for resizing panels.
 * Works with both mouse (desktop) and touch (mobile/APK).
 */
export function ResizeDivider({ direction, onResize, onResizeEnd }: ResizeDividerProps) {
  const dragging = useRef(false);
  const lastPos = useRef(0);
  const dividerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragging.current) return;
      const pos = direction === "horizontal" ? clientX : clientY;
      const delta = pos - lastPos.current;
      if (delta !== 0) {
        lastPos.current = pos;
        onResize(delta);
      }
    },
    [direction, onResize]
  );

  const handleEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    onResizeEnd?.();
  }, [onResizeEnd]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onMouseUp = () => handleEnd();
    const onTouchEnd = () => handleEnd();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleMove, handleEnd]);

  const startDrag = (startX: number, startY: number) => {
    dragging.current = true;
    lastPos.current = direction === "horizontal" ? startX : startY;
    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const isH = direction === "horizontal";

  return (
    <div
      ref={dividerRef}
      className={`resize-divider ${isH ? "resize-h" : "resize-v"}`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="separator"
      aria-orientation={isH ? "vertical" : "horizontal"}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = 20;
        if (isH) {
          if (e.key === "ArrowLeft") onResize(-step);
          if (e.key === "ArrowRight") onResize(step);
        } else {
          if (e.key === "ArrowUp") onResize(-step);
          if (e.key === "ArrowDown") onResize(step);
        }
      }}
    >
      <div className="resize-divider-handle" />
      <style>{`
        .resize-divider {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          touch-action: none;
        }
        .resize-h {
          width: 6px;
          cursor: col-resize;
          flex-direction: column;
        }
        .resize-v {
          height: 6px;
          cursor: row-resize;
          flex-direction: row;
        }
        .resize-divider:hover .resize-divider-handle,
        .resize-divider:active .resize-divider-handle {
          background: var(--accent);
          opacity: 0.7;
        }
        .resize-divider:active .resize-divider-handle {
          opacity: 1;
        }
        .resize-h .resize-divider-handle {
          width: 3px;
          height: 32px;
          border-radius: 2px;
          background: var(--border);
          transition: background 0.15s, opacity 0.15s, height 0.15s;
        }
        .resize-h:hover .resize-divider-handle {
          height: 48px;
        }
        .resize-v .resize-divider-handle {
          height: 3px;
          width: 32px;
          border-radius: 2px;
          background: var(--border);
          transition: background 0.15s, opacity 0.15s, width 0.15s;
        }
        .resize-v:hover .resize-divider-handle {
          width: 48px;
        }
        /* Make touch target bigger on mobile */
        @media (max-width: 768px) {
          .resize-h {
            width: 12px;
          }
          .resize-v {
            height: 12px;
          }
          .resize-h .resize-divider-handle {
            width: 4px;
            height: 40px;
          }
          .resize-v .resize-divider-handle {
            height: 4px;
            width: 40px;
          }
        }
      `}</style>
    </div>
  );
}
