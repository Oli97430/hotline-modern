import { useCallback, useEffect, useRef } from "react";

interface UseIdleDetectionOptions {
  timeout: number; // ms before idle
  onIdle: () => void;
  onActive: () => void;
  enabled: boolean;
}

export function useIdleDetection({ timeout, onIdle, onActive, enabled }: UseIdleDetectionOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIdleRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (!enabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isIdleRef.current) {
      isIdleRef.current = false;
      onActive();
    }

    timerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      onIdle();
    }, timeout);
  }, [timeout, onIdle, onActive, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "pointerdown"];
    events.forEach((ev) => document.addEventListener(ev, resetTimer, { passive: true }));

    // Initial timer
    resetTimer();

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer, enabled]);
}
