import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "hotline-blocked-users";

export function useBlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blockedUsers));
    } catch {
      /* quota exceeded, ignore */
    }
  }, [blockedUsers]);

  const blockUser = useCallback((userId: string) => {
    setBlockedUsers((prev) => {
      if (prev.includes(userId)) return prev;
      return [...prev, userId];
    });
  }, []);

  const unblockUser = useCallback((userId: string) => {
    setBlockedUsers((prev) => prev.filter((id) => id !== userId));
  }, []);

  const isBlocked = useCallback((userId: string) => blockedUsers.includes(userId), [blockedUsers]);

  return { blockedUsers, blockUser, unblockUser, isBlocked };
}
