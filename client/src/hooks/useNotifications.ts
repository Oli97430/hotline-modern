import { useCallback, useEffect, useRef, useState } from "react";

interface CapacitorLike {
  isNativePlatform?: () => boolean;
}

const getCapacitor = (): CapacitorLike | undefined =>
  (window as unknown as Record<string, unknown>).Capacitor as CapacitorLike | undefined;

const isNative = (): boolean => {
  const cap = getCapacitor();
  return !!cap && typeof cap.isNativePlatform === "function" && cap.isNativePlatform();
};

export interface UseNotificationsOptions {
  enabled: boolean;
  soundEnabled: boolean;
}

export interface UseNotificationsReturn {
  notify: (title: string, body: string, tag?: string) => void;
  permissionGranted: boolean;
  requestPermission: () => Promise<void>;
}

let localNotificationsModule: typeof import("@capacitor/local-notifications") | null = null;

async function getLocalNotifications() {
  if (!localNotificationsModule) {
    localNotificationsModule = await import("@capacitor/local-notifications");
  }
  return localNotificationsModule.LocalNotifications;
}

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioContext();
    }
    // Resume if suspended (e.g. due to autoplay policy)
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function playBeep() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 440;
    osc.type = "sine";
    gain.gain.value = 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // AudioContext operation failed
  }
}

export function useNotifications(options: UseNotificationsOptions): UseNotificationsReturn {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const optionsRef = useRef(options);
  const lastNotifRef = useRef(0);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Check/request permission on mount
  useEffect(() => {
    if (!options.enabled) return;

    if (isNative()) {
      getLocalNotifications()
        .then((LN) => LN.requestPermissions())
        .then((result) => {
          setPermissionGranted(result.display === "granted");
        })
        .catch(() => {});
    } else {
      if (typeof Notification === "undefined") return;
      if (Notification.permission === "granted") {
        setPermissionGranted(true);
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((p) => {
          setPermissionGranted(p === "granted");
        });
      }
    }
  }, [options.enabled]);

  const requestPermission = useCallback(async () => {
    if (isNative()) {
      try {
        const LN = await getLocalNotifications();
        const result = await LN.requestPermissions();
        setPermissionGranted(result.display === "granted");
      } catch {
        // Plugin not available
      }
    } else {
      if (typeof Notification === "undefined") return;
      const result = await Notification.requestPermission();
      setPermissionGranted(result === "granted");
    }
  }, []);

  const notify = useCallback((title: string, body: string, tag?: string) => {
    const { enabled, soundEnabled } = optionsRef.current;
    if (!enabled) return;

    // Throttle: max one notification per 500ms
    const now = Date.now();
    if (now - lastNotifRef.current < 500) return;
    lastNotifRef.current = now;

    if (isNative()) {
      // Capacitor / Android local notifications
      getLocalNotifications()
        .then((LN) =>
          LN.schedule({
            notifications: [
              {
                title,
                body,
                id: Math.floor(Math.random() * 2147483647),
                schedule: { at: new Date() },
                sound: soundEnabled ? undefined : "",
              },
            ],
          }),
        )
        .catch(() => {});
    } else {
      // Web Notification API
      if (typeof Notification === "undefined") return;
      if (Notification.permission !== "granted") return;

      const truncatedBody = body.length > 100 ? `${body.slice(0, 100)}...` : body;

      const notif = new Notification(title, {
        body: truncatedBody,
        tag: tag || `hotline-${now}`,
        icon: "/favicon.ico",
      });

      notif.onclick = () => {
        window.focus();
        notif.close();
      };

      setTimeout(() => notif.close(), 5000);

      if (soundEnabled) {
        playBeep();
      }
    }
  }, []);

  return { notify, permissionGranted, requestPermission };
}
