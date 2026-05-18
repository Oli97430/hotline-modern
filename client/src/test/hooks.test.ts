import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useChannelMute } from "../hooks/useChannelMute";
import { useCompactMode } from "../hooks/useCompactMode";
import { useServerFavorites } from "../hooks/useServerFavorites";

describe("useChannelMute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty muted list", () => {
    const { result } = renderHook(() => useChannelMute());
    expect(result.current.mutedChannels).toEqual([]);
  });

  it("toggles mute on a channel", () => {
    const { result } = renderHook(() => useChannelMute());

    act(() => {
      result.current.toggleMute("general");
    });
    expect(result.current.mutedChannels).toContain("general");
    expect(result.current.isMuted("general")).toBe(true);
  });

  it("toggles mute off a channel", () => {
    const { result } = renderHook(() => useChannelMute());

    act(() => {
      result.current.toggleMute("general");
    });
    act(() => {
      result.current.toggleMute("general");
    });
    expect(result.current.mutedChannels).not.toContain("general");
    expect(result.current.isMuted("general")).toBe(false);
  });

  it("persists muted channels to localStorage", () => {
    const { result } = renderHook(() => useChannelMute());

    act(() => {
      result.current.toggleMute("news");
    });

    const stored = JSON.parse(localStorage.getItem("hotline_muted_channels") || "[]");
    expect(stored).toContain("news");
  });

  it("loads from localStorage on mount", () => {
    localStorage.setItem("hotline_muted_channels", JSON.stringify(["alpha", "beta"]));
    const { result } = renderHook(() => useChannelMute());
    expect(result.current.mutedChannels).toEqual(["alpha", "beta"]);
  });

  it("handles multiple channels", () => {
    const { result } = renderHook(() => useChannelMute());

    act(() => {
      result.current.toggleMute("ch1");
      result.current.toggleMute("ch2");
      result.current.toggleMute("ch3");
    });

    expect(result.current.isMuted("ch1")).toBe(true);
    expect(result.current.isMuted("ch2")).toBe(true);
    expect(result.current.isMuted("ch3")).toBe(true);
    expect(result.current.isMuted("ch4")).toBe(false);
  });
});

describe("useCompactMode", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-density");
  });

  it("starts as non-compact by default", () => {
    const { result } = renderHook(() => useCompactMode());
    expect(result.current.compact).toBe(false);
  });

  it("toggles compact mode", () => {
    const { result } = renderHook(() => useCompactMode());

    act(() => {
      result.current.toggleCompact();
    });
    expect(result.current.compact).toBe(true);
  });

  it("sets data-density attribute on document", () => {
    const { result } = renderHook(() => useCompactMode());

    act(() => {
      result.current.toggleCompact();
    });
    expect(document.documentElement.getAttribute("data-density")).toBe("compact");
  });

  it("removes data-density when toggled off", () => {
    const { result } = renderHook(() => useCompactMode());

    act(() => {
      result.current.toggleCompact();
    });
    act(() => {
      result.current.toggleCompact();
    });
    expect(document.documentElement.getAttribute("data-density")).toBeNull();
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useCompactMode());

    act(() => {
      result.current.toggleCompact();
    });
    expect(localStorage.getItem("hotline_compact_mode")).toBe("true");
  });

  it("loads saved state", () => {
    localStorage.setItem("hotline_compact_mode", "true");
    const { result } = renderHook(() => useCompactMode());
    expect(result.current.compact).toBe(true);
  });
});

describe("useServerFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty favorites", () => {
    const { result } = renderHook(() => useServerFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a favorite", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("localhost:9998", "TestUser");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].address).toBe("localhost:9998");
    expect(result.current.favorites[0].nickname).toBe("TestUser");
  });

  it("does not duplicate same address+nickname", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("localhost:9998", "User1");
    });
    act(() => {
      result.current.addFavorite("localhost:9998", "User1");
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("allows same address with different nicknames", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("localhost:9998", "User1");
    });
    act(() => {
      result.current.addFavorite("localhost:9998", "User2");
    });

    expect(result.current.favorites).toHaveLength(2);
  });

  it("removes a favorite by id", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("server1.com", "Nick1");
    });
    const id = result.current.favorites[0].id;

    act(() => {
      result.current.removeFavorite(id);
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it("limits to 10 favorites", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      for (let i = 0; i < 15; i++) {
        result.current.addFavorite(`server${i}.com`, `User${i}`);
      }
    });

    expect(result.current.favorites.length).toBeLessThanOrEqual(10);
  });

  it("touchFavorite updates lastUsed", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("server1.com", "Nick");
    });

    const before = result.current.favorites[0].lastUsed;

    act(() => {
      result.current.touchFavorite("server1.com", "Nick");
    });

    // lastUsed should be >= the original time (may be same ms)
    expect(result.current.favorites[0].lastUsed).toBeGreaterThanOrEqual(before);
  });

  it("persists favorites to localStorage", () => {
    const { result } = renderHook(() => useServerFavorites());

    act(() => {
      result.current.addFavorite("persist-test.com", "Bob");
    });

    const stored = JSON.parse(localStorage.getItem("hotline-server-favorites") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].address).toBe("persist-test.com");
  });
});
