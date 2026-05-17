import { describe, it, expect, beforeEach } from "vitest";
import { loadCustomEmojis, saveCustomEmojis } from "../components/CustomEmojiUpload";
import { loadScheduledMessages, saveScheduledMessages, ScheduledMessage } from "../components/MessageScheduler";
import { applyChannelOrder, loadChannelOrder, saveChannelOrder } from "../components/ChannelDragReorder";
import { loadNotifFilters, saveNotifFilters, shouldNotify, NotifFilter } from "../components/NotificationFilters";

describe("CustomEmoji storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when no emojis stored", () => {
    expect(loadCustomEmojis()).toEqual([]);
  });

  it("saves and loads custom emojis", () => {
    const emojis = [
      { id: "1", name: "thumbsup", url: "blob:test-url" },
      { id: "2", name: "fire", url: "blob:test-url-2" },
    ];
    saveCustomEmojis(emojis);
    expect(loadCustomEmojis()).toEqual(emojis);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("hotline-custom-emojis", "not-valid-json");
    expect(loadCustomEmojis()).toEqual([]);
  });
});

describe("ScheduledMessages storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when nothing stored", () => {
    expect(loadScheduledMessages()).toEqual([]);
  });

  it("saves and loads scheduled messages", () => {
    const msgs: ScheduledMessage[] = [
      { id: "s1", channel: "general", content: "Hello", scheduledTime: 1700000000000, createdAt: 1699000000000 },
    ];
    saveScheduledMessages(msgs);
    expect(loadScheduledMessages()).toEqual(msgs);
  });

  it("handles corrupted data", () => {
    localStorage.setItem("hotline-scheduled-messages", "{bad}");
    expect(loadScheduledMessages()).toEqual([]);
  });
});

describe("ChannelDragReorder", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when no order saved", () => {
    expect(loadChannelOrder()).toEqual([]);
  });

  it("saves and loads channel order", () => {
    const order = ["random", "general", "lobby"];
    saveChannelOrder(order);
    expect(loadChannelOrder()).toEqual(order);
  });

  it("applyChannelOrder reorders channels correctly", () => {
    const channels = [
      { name: "lobby", topic: "", userCount: 5 },
      { name: "general", topic: "", userCount: 3 },
      { name: "random", topic: "", userCount: 2 },
    ];
    const savedOrder = ["random", "general", "lobby"];
    const result = applyChannelOrder(channels, savedOrder);
    expect(result.map((c) => c.name)).toEqual(["random", "general", "lobby"]);
  });

  it("applyChannelOrder appends new channels not in saved order", () => {
    const channels = [
      { name: "lobby", topic: "", userCount: 5 },
      { name: "general", topic: "", userCount: 3 },
      { name: "new-channel", topic: "", userCount: 1 },
    ];
    const savedOrder = ["general", "lobby"];
    const result = applyChannelOrder(channels, savedOrder);
    expect(result.map((c) => c.name)).toEqual(["general", "lobby", "new-channel"]);
  });

  it("applyChannelOrder with empty saved order returns original", () => {
    const channels = [
      { name: "a", topic: "", userCount: 1 },
      { name: "b", topic: "", userCount: 2 },
    ];
    const result = applyChannelOrder(channels, []);
    expect(result).toEqual(channels);
  });

  it("applyChannelOrder handles removed channels gracefully", () => {
    const channels = [
      { name: "lobby", topic: "", userCount: 5 },
    ];
    const savedOrder = ["deleted-channel", "lobby", "also-deleted"];
    const result = applyChannelOrder(channels, savedOrder);
    expect(result.map((c) => c.name)).toEqual(["lobby"]);
  });
});

describe("NotificationFilters", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default filters when nothing stored", () => {
    const filters = loadNotifFilters();
    expect(filters.mutedChannels).toEqual([]);
    expect(filters.mutedUsers).toEqual([]);
    expect(filters.onlyMentions).toBe(false);
    expect(filters.quietHoursEnabled).toBe(false);
    expect(filters.keywords).toEqual([]);
  });

  it("saves and loads filters", () => {
    const filters: NotifFilter = {
      mutedChannels: ["spam"],
      mutedUsers: ["user123"],
      onlyMentions: true,
      quietHoursEnabled: true,
      quietStart: "23:00",
      quietEnd: "07:00",
      keywords: ["important", "urgent"],
    };
    saveNotifFilters(filters);
    expect(loadNotifFilters()).toEqual(filters);
  });

  describe("shouldNotify", () => {
    const baseFilter: NotifFilter = {
      mutedChannels: [],
      mutedUsers: [],
      onlyMentions: false,
      quietHoursEnabled: false,
      quietStart: "22:00",
      quietEnd: "08:00",
      keywords: [],
    };

    it("returns true with no filters active", () => {
      expect(shouldNotify(baseFilter, "general", "user1", "Hello", "MyNick")).toBe(true);
    });

    it("returns false for muted channel", () => {
      const filter = { ...baseFilter, mutedChannels: ["spam"] };
      expect(shouldNotify(filter, "spam", "user1", "Hello", "MyNick")).toBe(false);
      expect(shouldNotify(filter, "general", "user1", "Hello", "MyNick")).toBe(true);
    });

    it("returns false for muted user", () => {
      const filter = { ...baseFilter, mutedUsers: ["annoying-user"] };
      expect(shouldNotify(filter, "general", "annoying-user", "Hello", "MyNick")).toBe(false);
      expect(shouldNotify(filter, "general", "nice-user", "Hello", "MyNick")).toBe(true);
    });

    it("onlyMentions mode: blocks non-mention messages", () => {
      const filter = { ...baseFilter, onlyMentions: true };
      expect(shouldNotify(filter, "general", "user1", "Just chatting", "Alice")).toBe(false);
    });

    it("onlyMentions mode: allows @mention", () => {
      const filter = { ...baseFilter, onlyMentions: true };
      expect(shouldNotify(filter, "general", "user1", "Hey @Alice check this", "Alice")).toBe(true);
    });

    it("onlyMentions mode: allows keyword match", () => {
      const filter = { ...baseFilter, onlyMentions: true, keywords: ["urgent"] };
      expect(shouldNotify(filter, "general", "user1", "This is urgent!", "Alice")).toBe(true);
    });

    it("onlyMentions mode: case insensitive mention", () => {
      const filter = { ...baseFilter, onlyMentions: true };
      expect(shouldNotify(filter, "general", "user1", "Hey @alice check this", "Alice")).toBe(true);
    });

    it("onlyMentions mode: case insensitive keyword", () => {
      const filter = { ...baseFilter, onlyMentions: true, keywords: ["URGENT"] };
      expect(shouldNotify(filter, "general", "user1", "this is urgent", "Nick")).toBe(true);
    });
  });
});
