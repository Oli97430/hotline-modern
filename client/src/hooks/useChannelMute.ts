import { useCallback, useState } from "react";

const STORAGE_KEY = "hotline_muted_channels";

function loadMuted(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveMuted(muted: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(muted));
}

export function useChannelMute() {
  const [mutedChannels, setMutedChannels] = useState<string[]>(loadMuted);

  const toggleMute = useCallback((channel: string) => {
    setMutedChannels((prev) => {
      const updated = prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel];
      saveMuted(updated);
      return updated;
    });
  }, []);

  const isMuted = useCallback(
    (channel: string) => {
      return mutedChannels.includes(channel);
    },
    [mutedChannels],
  );

  return { mutedChannels, toggleMute, isMuted };
}
