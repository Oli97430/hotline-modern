import { useEffect, useRef } from "react";

const BASE_TITLE = "Hotline Modern";

export function useTabNotification(totalUnread: number) {
  const originalTitle = useRef(BASE_TITLE);

  useEffect(() => {
    if (totalUnread > 0) {
      document.title = `(${totalUnread}) ${originalTitle.current}`;
    } else {
      document.title = originalTitle.current;
    }

    return () => {
      document.title = originalTitle.current;
    };
  }, [totalUnread]);

  // Flash title when window is not focused
  useEffect(() => {
    if (totalUnread === 0) return;
    if (!document.hidden) return;

    let visible = true;
    const interval = setInterval(() => {
      document.title = visible ? `(${totalUnread}) ${originalTitle.current}` : `💬 New messages`;
      visible = !visible;
    }, 1500);

    const handleVisibility = () => {
      if (!document.hidden) {
        clearInterval(interval);
        document.title = totalUnread > 0 ? `(${totalUnread}) ${originalTitle.current}` : originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [totalUnread]);
}
