import { useState, useEffect, useCallback, useRef } from "react";
import { LogIn, LogOut, X } from "lucide-react";

export interface Toast {
  id: string;
  type: "join" | "leave" | "info";
  message: string;
  timestamp: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icon = toast.type === "join" ? <LogIn size={13} /> : toast.type === "leave" ? <LogOut size={13} /> : null;

  return (
    <div className={`toast-item toast-${toast.type} ${exiting ? "exiting" : ""}`}>
      {icon && <span className="toast-icon">{icon}</span>}
      <span className="toast-text">{toast.message}</span>
      <button className="toast-close" onClick={() => { setExiting(true); setTimeout(() => onDismiss(toast.id), 300); }}>
        <X size={12} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.slice(-5).map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 400;
          pointer-events: none;
        }
        .toast-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          animation: toastIn 0.25s ease;
          pointer-events: auto;
          white-space: nowrap;
        }
        .toast-item.exiting {
          animation: toastOut 0.3s ease forwards;
        }
        .toast-join .toast-icon { color: var(--success); }
        .toast-leave .toast-icon { color: var(--text-muted); }
        .toast-text {
          flex: 1;
        }
        .toast-close {
          color: var(--text-muted);
          padding: 2px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .toast-item:hover .toast-close {
          opacity: 1;
        }
        .toast-close:hover {
          color: var(--text-primary);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

// Hook for managing toasts
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = `toast-${++idRef.current}`;
    setToasts((prev) => [...prev, { id, type, message, timestamp: Date.now() }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
