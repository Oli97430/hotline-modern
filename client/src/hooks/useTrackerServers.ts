import { useState, useEffect, useCallback, useRef } from "react";
import { Capacitor } from "@capacitor/core";

export interface TrackerServer {
  name: string;
  description: string;
  address: string;
  port: number;
  users: number;
  maxUsers: number;
  tags: string[];
}

const TRACKER_URLS_KEY = "hotline-tracker-urls";
const LAST_SERVER_IP_KEY = "hotline-last-server-ip";

/** Check if running inside a native Capacitor app (Android/iOS) */
function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Derive tracker URL from context:
 * - Browser: use window.location.hostname (works from LAN and localhost)
 * - Capacitor native: use last known server IP, or empty (user must configure)
 */
function getDefaultTracker(): string {
  if (isNativeApp()) {
    // In a native app, localhost is the phone itself — useless
    const lastIp = localStorage.getItem(LAST_SERVER_IP_KEY);
    if (lastIp) return `http://${lastIp}:9997`;
    return ""; // No default — user must add tracker via settings
  }
  const host = typeof window !== "undefined" ? window.location.hostname : "localhost";
  return `http://${host}:9997`;
}

function loadTrackerUrls(): string[] {
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const isRemote = currentHost !== "localhost" && currentHost !== "127.0.0.1";

  try {
    const saved = localStorage.getItem(TRACKER_URLS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Auto-fix: replace localhost URLs when NOT on localhost (LAN browser or native app)
        if (isRemote || isNativeApp()) {
          const target = isRemote ? currentHost : localStorage.getItem(LAST_SERVER_IP_KEY) || "";
          if (target) {
            const fixed = parsed.map((url: string) =>
              url.replace(/\/\/(localhost|127\.0\.0\.1)/, `//${target}`),
            );
            if (JSON.stringify(fixed) !== saved) {
              localStorage.setItem(TRACKER_URLS_KEY, JSON.stringify(fixed));
            }
            return fixed;
          }
        }
        // Filter out localhost URLs in native apps
        if (isNativeApp()) {
          const valid = parsed.filter(
            (url: string) => !url.includes("//localhost") && !url.includes("//127.0.0.1"),
          );
          if (valid.length > 0) return valid;
        }
        return parsed;
      }
    }
  } catch {}
  const def = getDefaultTracker();
  return def ? [def] : [];
}

function saveTrackerUrls(urls: string[]) {
  localStorage.setItem(TRACKER_URLS_KEY, JSON.stringify(urls));
}

export function useTrackerServers() {
  const [trackerUrls, setTrackerUrls] = useState<string[]>(loadTrackerUrls);
  const [servers, setServers] = useState<TrackerServer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const fetchServers = useCallback(async () => {
    if (trackerUrls.length === 0) return;
    setLoading(true);
    setError(null);

    const seen = new Set<string>();
    const allServers: TrackerServer[] = [];
    let anySuccess = false;

    await Promise.allSettled(
      trackerUrls.map(async (url) => {
        try {
          const resp = await fetch(`${url.replace(/\/$/, "")}/servers`, {
            signal: AbortSignal.timeout(5000),
          });
          if (!resp.ok) return;
          const data = await resp.json();
          anySuccess = true;
          for (const srv of data.servers || []) {
            const key = `${srv.address}:${srv.port}`;
            if (!seen.has(key)) {
              seen.add(key);
              allServers.push(srv);
            }
          }
        } catch {}
      })
    );

    if (!anySuccess && trackerUrls.length > 0) {
      setError("tracker.error");
    }

    allServers.sort((a, b) => b.users - a.users);
    setServers(allServers);
    setLoading(false);
  }, [trackerUrls]);

  const addTracker = useCallback((url: string) => {
    const trimmed = url.trim().replace(/\/$/, "");
    if (!trimmed || trackerUrls.includes(trimmed)) return;
    const updated = [...trackerUrls, trimmed];
    setTrackerUrls(updated);
    saveTrackerUrls(updated);
  }, [trackerUrls]);

  const removeTracker = useCallback((url: string) => {
    const updated = trackerUrls.filter((u) => u !== url);
    setTrackerUrls(updated);
    saveTrackerUrls(updated);
  }, [trackerUrls]);

  // Auto-refresh every 30s
  useEffect(() => {
    fetchServers();
    intervalRef.current = setInterval(fetchServers, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchServers]);

  return {
    servers,
    loading,
    error,
    refresh: fetchServers,
    trackerUrls,
    addTracker,
    removeTracker,
  };
}
