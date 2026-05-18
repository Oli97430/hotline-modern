import { useEffect, useState } from "react";

const STORAGE_KEY = "hotline_compact_mode";

export function useCompactMode() {
  const [compact, setCompact] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(compact));
    if (compact) {
      document.documentElement.setAttribute("data-density", "compact");
    } else {
      document.documentElement.removeAttribute("data-density");
    }
  }, [compact]);

  const toggleCompact = () => setCompact((v) => !v);

  return { compact, toggleCompact };
}
