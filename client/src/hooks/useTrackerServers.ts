import { useState, useEffect, useCallback, useRef } from "react";

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
const DEFAULT_TRACKER = "http://localhost:9997";

function loadTrackerUrls(): string[] {
  try {
    const saved = localStorage.getItem(TRACKER_URLS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [DEFAULT_TRACKER];
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
