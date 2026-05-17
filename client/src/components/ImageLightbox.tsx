import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, Download, RotateCw, Maximize } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  onClose: () => void;
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s + 0.25, 4));
    if (e.key === "-") setScale((s) => Math.max(s - 0.25, 0.5));
    if (e.key === "r") setRotation((r) => r + 90);
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.max(0.5, Math.min(4, s + delta)));
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setScale((s) => Math.min(s + 0.25, 4))} title="Zoom in">
          <ZoomIn size={16} />
        </button>
        <button onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))} title="Zoom out">
          <ZoomOut size={16} />
        </button>
        <button onClick={() => setRotation((r) => r + 90)} title="Rotate">
          <RotateCw size={16} />
        </button>
        <button onClick={() => { setScale(1); setRotation(0); }} title="Reset">
          <Maximize size={16} />
        </button>
        <span className="lightbox-scale">{Math.round(scale * 100)}%</span>
        <a href={src} download className="lightbox-download" title="Download" onClick={(e) => e.stopPropagation()}>
          <Download size={16} />
        </a>
        <button className="lightbox-close-btn" onClick={onClose} title="Close (Esc)">
          <X size={18} />
        </button>
      </div>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()} onWheel={handleWheel}>
        {!loaded && <div className="lightbox-loading"><div className="lightbox-spinner" /></div>}
        <img
          src={src}
          alt=""
          className={`lightbox-img ${loaded ? "loaded" : ""}`}
          style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
          onLoad={() => setLoaded(true)}
          onDoubleClick={() => { setScale(1); setRotation(0); }}
          draggable={false}
        />
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 600;
          animation: fadeIn 0.15s ease;
        }
        .lightbox-toolbar {
          position: absolute;
          top: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 6px 10px;
          z-index: 601;
        }
        .lightbox-toolbar button, .lightbox-toolbar a {
          color: rgba(255, 255, 255, 0.7);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
        }
        .lightbox-toolbar button:hover, .lightbox-toolbar a:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .lightbox-scale {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          min-width: 36px;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        .lightbox-close-btn {
          margin-left: 4px;
        }
        .lightbox-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: grab;
          overflow: hidden;
        }
        .lightbox-content:active {
          cursor: grabbing;
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: var(--radius);
          opacity: 0;
          transition: transform 0.2s ease, opacity 0.3s ease;
          user-select: none;
        }
        .lightbox-img.loaded {
          opacity: 1;
        }
        .lightbox-loading {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
