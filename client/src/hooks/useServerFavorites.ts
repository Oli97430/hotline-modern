import { useState, useCallback } from "react";

export interface ServerFavorite {
  id: string;
  address: string;
  nickname: string;
  label?: string;
  lastUsed: number;
}

const STORAGE_KEY = "hotline-server-favorites";

function loadFavorites(): ServerFavorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: ServerFavorite[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function useServerFavorites() {
  const [favorites, setFavorites] = useState<ServerFavorite[]>(loadFavorites);

  const addFavorite = useCallback((address: string, nickname: string, label?: string) => {
    setFavorites((prev) => {
      // Don't add duplicates
      const existing = prev.find((f) => f.address === address && f.nickname === nickname);
      if (existing) {
        const updated = prev.map((f) =>
          f.id === existing.id ? { ...f, lastUsed: Date.now(), label: label || f.label } : f
        );
        saveFavorites(updated);
        return updated;
      }
      const fav: ServerFavorite = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        address,
        nickname,
        label,
        lastUsed: Date.now(),
      };
      const updated = [fav, ...prev].slice(0, 10); // max 10 favorites
      saveFavorites(updated);
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      saveFavorites(updated);
      return updated;
    });
  }, []);

  const touchFavorite = useCallback((address: string, nickname: string) => {
    setFavorites((prev) => {
      const idx = prev.findIndex((f) => f.address === address && f.nickname === nickname);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], lastUsed: Date.now() };
      updated.sort((a, b) => b.lastUsed - a.lastUsed);
      saveFavorites(updated);
      return updated;
    });
  }, []);

  return { favorites, addFavorite, removeFavorite, touchFavorite };
}
