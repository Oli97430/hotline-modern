import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Upload } from "lucide-react";

interface DragDropOverlayProps {
  onDrop: (file: File) => void;
  enabled: boolean;
}

export function DragDropOverlay({ onDrop, enabled }: DragDropOverlayProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    if (!enabled) return;
    dragCounterRef.current++;
    if (e.dataTransfer?.types.includes("Files")) {
      setIsDragging(true);
    }
  }, [enabled]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    dragCounterRef.current = 0;
    setIsDragging(false);
    if (!enabled) return;
    const file = e.dataTransfer?.files[0];
    if (file) onDrop(file);
  }, [enabled, onDrop]);

  useEffect(() => {
    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  if (!isDragging) return null;

  return (
    <div className="drag-drop-overlay">
      <div className="drag-drop-zone">
        <Upload size={40} className="drag-drop-icon" />
        <span className="drag-drop-text">{t("files.dropHere")}</span>
        <span className="drag-drop-hint">Images, documents, archives</span>
      </div>

      <style>{`
        .drag-drop-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 500;
          animation: fadeIn 0.15s ease;
        }
        .drag-drop-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 72px;
          border: 2px dashed var(--accent);
          border-radius: var(--radius-lg);
          background: rgba(var(--accent-rgb), 0.06);
          animation: fadeInScale 0.2s ease;
          box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.15);
        }
        .drag-drop-icon {
          color: var(--accent);
          animation: dragBounce 1.5s ease-in-out infinite;
          filter: drop-shadow(0 4px 12px rgba(var(--accent-rgb), 0.3));
        }
        .drag-drop-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .drag-drop-hint {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 400;
        }
        @keyframes dragBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
