import { useCallback, useRef, useState } from "react";

export function useDesktopNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied",
  );
  const lastNotifRef = useRef<number>(0);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return "denied" as NotificationPermission;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const notify = useCallback((nickname: string, content: string) => {
    // Respect mute setting
    const muted = localStorage.getItem("hotline-notif-desktop") === "true";
    if (muted) return;

    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission().then((p) => setPermission(p));
      return;
    }

    if (Notification.permission !== "granted") return;

    // Throttle: no more than one notification per 500ms
    const now = Date.now();
    if (now - lastNotifRef.current < 500) return;
    lastNotifRef.current = now;

    const preview = content.length > 80 ? content.slice(0, 80) + "..." : content;

    const notif = new Notification(nickname, {
      body: preview,
      icon: "/logo.svg",
      tag: "hotline-msg-" + now,
    });

    notif.onclick = () => {
      window.focus();
      notif.close();
    };
  }, []);

  return { requestPermission, notify, permission };
}
