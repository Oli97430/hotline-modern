import { Capacitor } from "@capacitor/core";
import { useCallback, useEffect, useRef, useState } from "react";

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
export const LAST_SERVER_IP_KEY = "hotline-last-server-ip";
const BOOTSTRAP_CONFIG_KEY = "hotline-bootstrap-config";

/** GitHub-hosted config — always reachable, auto-updated by start-public.ps1 */
const BOOTSTRAP_URL = "https://raw.githubusercontent.com/Oli97430/hotline-modern/master/public-config.json";

function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

/** Fetch public-config.json from GitHub to discover tracker URL */
async function fetchBootstrapConfig(): Promise<string | null> {
  try {
    const resp = await fetch(`${BOOTSTRAP_URL}?t=${Date.now()}`, {
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!resp.ok) return null;
    const config = await resp.json();
    // Only use if tracker URL is non-empty
    if (config.tracker && typeof config.tracker === "string" && config.tracker.trim() !== "") {
      // Verify the tracker is reachable before caching
      try {
        const check = await fetch(`${config.tracker.replace(/\/$/, "")}/servers`, {
          signal: AbortSignal.timeout(3000),
        });
        if (!check.ok) return null;
      } catch {
        return null; // Tunnel is dead, don't use it
      }
      localStorage.setItem(BOOTSTRAP_CONFIG_KEY, JSON.stringify(config));
      return config.tracker;
    }
  } catch {}
  // Fallback to cached config — but verify it's still reachable
  try {
    const cached = localStorage.getItem(BOOTSTRAP_CONFIG_KEY);
    if (cached) {
      const config = JSON.parse(cached);
      if (config.tracker && config.tracker.trim() !== "") {
        try {
          const check = await fetch(`${config.tracker.replace(/\/$/, "")}/servers`, {
            signal: AbortSignal.timeout(3000),
          });
          if (check.ok) return config.tracker;
        } catch {}
        // Cached tracker is dead — remove stale cache
        localStorage.removeItem(BOOTSTRAP_CONFIG_KEY);
      }
    }
  } catch {}
  return null;
}

function getDefaultTracker(): string {
  if (isNativeApp()) {
    const lastIp = localStorage.getItem(LAST_SERVER_IP_KEY);
    if (lastIp) return `http://${lastIp}:9998`;
    return "";
  }
  let host = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1";
  // Use 127.0.0.1 instead of localhost to avoid IPv6 DNS resolution issues
  if (host === "localhost") host = "127.0.0.1";
  return `http://${host}:9998`;
}

function loadTrackerUrls(): string[] {
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const isRemote = currentHost !== "localhost" && currentHost !== "127.0.0.1";

  try {
    const saved = localStorage.getItem(TRACKER_URLS_KEY);
    if (saved) {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Fix localhost → 127.0.0.1 to avoid IPv6 DNS issues
        parsed = parsed.map((url: string) => url.replace("//localhost:", "//127.0.0.1:"));
        if (isRemote || isNativeApp()) {
          const target = isRemote ? currentHost : localStorage.getItem(LAST_SERVER_IP_KEY) || "";
          if (target) {
            const fixed = parsed.map((url: string) => url.replace(/\/\/(localhost|127\.0\.0\.1)/, `//${target}`));
            if (JSON.stringify(fixed) !== saved) {
              localStorage.setItem(TRACKER_URLS_KEY, JSON.stringify(fixed));
            }
            return fixed;
          }
        }
        if (isNativeApp()) {
          const valid = parsed.filter((url: string) => !url.includes("//localhost") && !url.includes("//127.0.0.1"));
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
  const bootstrapDone = useRef(false);

  // On mount: fetch bootstrap config from GitHub to discover public tracker
  useEffect(() => {
    if (bootstrapDone.current) return;
    bootstrapDone.current = true;

    fetchBootstrapConfig().then((publicTracker) => {
      if (!publicTracker) {
        // No valid public tracker — clean up any stale tunnel URLs
        setTrackerUrls((prev) => {
          const cleaned = prev.filter((u) => !u.includes("trycloudflare.com"));
          if (cleaned.length !== prev.length) {
            // Ensure we still have at least the local tracker
            if (cleaned.length === 0) {
              const def = getDefaultTracker();
              if (def) cleaned.push(def);
            }
            saveTrackerUrls(cleaned);
            return cleaned;
          }
          return prev;
        });
        return;
      }

      setTrackerUrls((prev) => {
        const normalized = publicTracker.replace(/\/$/, "");
        if (prev.some((u) => u === normalized)) return prev;
        // Replace any existing trycloudflare URLs (stale tunnel) instead of accumulating
        // But NEVER remove local tracker URLs
        const withoutOldTunnels = prev.filter(
          (u) => !u.includes("trycloudflare.com") || u === normalized,
        );
        const updated = [...withoutOldTunnels, normalized];
        saveTrackerUrls(updated);
        return updated;
      });
    });
  }, []);

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
      }),
    );

    if (!anySuccess && trackerUrls.length > 0) {
      setError("tracker.error");
    }

    allServers.sort((a, b) => b.users - a.users);
    setServers(allServers);
    setLoading(false);
  }, [trackerUrls]);

  const addTracker = useCallback(
    (url: string) => {
      const trimmed = url.trim().replace(/\/$/, "");
      if (!trimmed || trackerUrls.includes(trimmed)) return;
      const updated = [...trackerUrls, trimmed];
      setTrackerUrls(updated);
      saveTrackerUrls(updated);
    },
    [trackerUrls],
  );

  const removeTracker = useCallback(
    (url: string) => {
      const updated = trackerUrls.filter((u) => u !== url);
      setTrackerUrls(updated);
      saveTrackerUrls(updated);
    },
    [trackerUrls],
  );

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
