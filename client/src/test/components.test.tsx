import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { beforeEach, describe, expect, it, vi } from "vitest";
// Components
import { MessageForwardDialog } from "../components/MessageForwardDialog";
import { MessageScheduler, type ScheduledMessage } from "../components/MessageScheduler";
import { ServerStats } from "../components/ServerStats";
import { ThemeEditor } from "../components/ThemeEditor";
import i18n from "../i18n";

// Helper to wrap with i18n
function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe("MessageForwardDialog", () => {
  const defaultProps = {
    messageContent: "Hello, this is a test message",
    messageAuthor: "Alice",
    channels: [{ name: "general" }, { name: "random" }, { name: "lobby" }],
    currentChannel: "general",
    onForward: vi.fn(),
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with message preview", () => {
    renderWithI18n(<MessageForwardDialog {...defaultProps} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Hello, this is a test message")).toBeInTheDocument();
  });

  it("shows available channels (excludes current)", () => {
    renderWithI18n(<MessageForwardDialog {...defaultProps} />);
    expect(screen.queryByText("general")).not.toBeInTheDocument(); // current channel excluded
    expect(screen.getByText("random")).toBeInTheDocument();
    expect(screen.getByText("lobby")).toBeInTheDocument();
  });

  it("calls onForward when a channel is selected and send clicked", async () => {
    renderWithI18n(<MessageForwardDialog {...defaultProps} />);

    // Select a channel
    fireEvent.click(screen.getByText("random"));

    // Click forward
    const submitBtn = screen.getByRole("button", { name: /forward/i });
    fireEvent.click(submitBtn);

    expect(defaultProps.onForward).toHaveBeenCalledWith("random", undefined);
  });

  it("forward button is disabled without channel selection", () => {
    renderWithI18n(<MessageForwardDialog {...defaultProps} />);
    const submitBtn = screen.getAllByRole("button").find((btn) => btn.textContent?.includes("Forward"));
    expect(submitBtn).toHaveAttribute("disabled");
  });

  it("calls onClose when overlay is clicked", () => {
    renderWithI18n(<MessageForwardDialog {...defaultProps} />);
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("truncates long messages in preview", () => {
    const longMsg = "A".repeat(200);
    renderWithI18n(<MessageForwardDialog {...defaultProps} messageContent={longMsg} />);
    const preview = screen.getByText(/A{100,}\.\.\.$/);
    expect(preview).toBeInTheDocument();
  });
});

describe("ServerStats", () => {
  const mockMessages = [
    {
      id: "1",
      channel: "general",
      userId: "u1",
      nickname: "Alice",
      content: "Hi",
      role: "admin",
      timestamp: Date.now() - 1000,
    },
    {
      id: "2",
      channel: "general",
      userId: "u2",
      nickname: "Bob",
      content: "Hey",
      role: "member",
      timestamp: Date.now() - 2000,
    },
    {
      id: "3",
      channel: "random",
      userId: "u1",
      nickname: "Alice",
      content: "Test",
      role: "admin",
      timestamp: Date.now() - 3000,
    },
    {
      id: "4",
      channel: "general",
      userId: "u1",
      nickname: "Alice",
      content: "Again",
      role: "admin",
      timestamp: Date.now() - 100000,
    },
    {
      id: "5",
      channel: "random",
      userId: "u3",
      nickname: "Charlie",
      content: "Yo",
      role: "member",
      timestamp: Date.now() - 200000,
    },
  ];

  const defaultProps = {
    messages: mockMessages,
    userCount: 5,
    channelCount: 3,
    serverName: "Test Server",
    onClose: vi.fn(),
  };

  it("renders the stats panel with server name", () => {
    renderWithI18n(<ServerStats {...defaultProps} />);
    expect(screen.getByText(/Test Server/)).toBeInTheDocument();
  });

  it("shows total message count", () => {
    const { container } = renderWithI18n(<ServerStats {...defaultProps} />);
    const cards = container.querySelectorAll(".stats-card-value");
    // First card = total messages = 5
    expect(cards[0].textContent).toBe("5");
  });

  it("shows user count", () => {
    const { container } = renderWithI18n(<ServerStats {...defaultProps} />);
    const cards = container.querySelectorAll(".stats-card-value");
    // Second card = online users = 5
    expect(cards[1].textContent).toBe("5");
  });

  it("shows channel count", () => {
    const { container } = renderWithI18n(<ServerStats {...defaultProps} />);
    const cards = container.querySelectorAll(".stats-card-value");
    // Third card = channels = 3
    expect(cards[2].textContent).toBe("3");
  });

  it("shows top contributors", () => {
    renderWithI18n(<ServerStats {...defaultProps} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows top channels", () => {
    renderWithI18n(<ServerStats {...defaultProps} />);
    expect(screen.getByText("#general")).toBeInTheDocument();
    expect(screen.getByText("#random")).toBeInTheDocument();
  });

  it("renders 24 bars in the activity chart", () => {
    const { container } = renderWithI18n(<ServerStats {...defaultProps} />);
    const bars = container.querySelectorAll(".stats-bar-wrap");
    expect(bars.length).toBe(24);
  });

  it("calls onClose when close button clicked", () => {
    renderWithI18n(<ServerStats {...defaultProps} />);
    const closeBtn = document.querySelector(".stats-close") as HTMLElement;
    if (closeBtn) fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});

describe("ThemeEditor", () => {
  const defaultProps = {
    onClose: vi.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    // Reset CSS custom properties
    const root = document.documentElement;
    root.style.cssText = "";
  });

  it("renders the theme editor with color pickers", () => {
    const { container } = renderWithI18n(<ThemeEditor {...defaultProps} />);
    const colorInputs = container.querySelectorAll('input[type="color"]');
    expect(colorInputs.length).toBe(8); // 8 editable colors
  });

  it("renders hex input fields", () => {
    const { container } = renderWithI18n(<ThemeEditor {...defaultProps} />);
    const hexInputs = container.querySelectorAll(".theme-color-hex");
    expect(hexInputs.length).toBe(8);
  });

  it("has a save button that is disabled without a name", () => {
    renderWithI18n(<ThemeEditor {...defaultProps} />);
    const saveBtn = document.querySelector(".theme-save-btn") as HTMLElement;
    expect(saveBtn).toHaveAttribute("disabled");
  });

  it("enables save button when name is entered", async () => {
    renderWithI18n(<ThemeEditor {...defaultProps} />);

    const nameInput = document.querySelector(".theme-name-input") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "My Theme" } });

    const saveBtn = document.querySelector(".theme-save-btn") as HTMLElement;
    expect(saveBtn).not.toHaveAttribute("disabled");
  });

  it("saves theme to localStorage on save", async () => {
    renderWithI18n(<ThemeEditor {...defaultProps} />);

    const nameInput = document.querySelector(".theme-name-input") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Dark Pro" } });

    const saveBtn = document.querySelector(".theme-save-btn") as HTMLElement;
    fireEvent.click(saveBtn);

    const stored = JSON.parse(localStorage.getItem("hotline-custom-themes") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe("Dark Pro");
  });

  it("calls onClose when overlay is clicked", () => {
    renderWithI18n(<ThemeEditor {...defaultProps} />);
    const overlay = document.querySelector(".modal-overlay") as HTMLElement;
    if (overlay) fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});

describe("MessageScheduler", () => {
  const defaultProps = {
    activeChannel: "general",
    scheduledMessages: [] as ScheduledMessage[],
    onSchedule: vi.fn(),
    onDelete: vi.fn(),
    onClose: vi.fn(),
  };

  it("renders the scheduler panel", () => {
    renderWithI18n(<MessageScheduler {...defaultProps} />);
    expect(screen.getByText("#general")).toBeInTheDocument();
  });

  it("has a textarea for message content", () => {
    const { container } = renderWithI18n(<MessageScheduler {...defaultProps} />);
    const textarea = container.querySelector(".scheduler-textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("has a datetime input", () => {
    const { container } = renderWithI18n(<MessageScheduler {...defaultProps} />);
    const dateInput = container.querySelector('input[type="datetime-local"]');
    expect(dateInput).toBeInTheDocument();
  });

  it("schedule button is disabled when textarea is empty", () => {
    const { container } = renderWithI18n(<MessageScheduler {...defaultProps} />);
    const submitBtn = container.querySelector(".scheduler-submit") as HTMLElement;
    expect(submitBtn).toHaveAttribute("disabled");
  });

  it("shows existing scheduled messages", () => {
    const msgs: ScheduledMessage[] = [
      {
        id: "s1",
        channel: "general",
        content: "Scheduled hello",
        scheduledTime: Date.now() + 60000,
        createdAt: Date.now(),
      },
    ];
    renderWithI18n(<MessageScheduler {...defaultProps} scheduledMessages={msgs} />);
    expect(screen.getByText("Scheduled hello")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const msgs: ScheduledMessage[] = [
      { id: "s1", channel: "general", content: "Delete me", scheduledTime: Date.now() + 60000, createdAt: Date.now() },
    ];
    const { container } = renderWithI18n(<MessageScheduler {...defaultProps} scheduledMessages={msgs} />);
    const deleteBtn = container.querySelector(".scheduler-item-delete") as HTMLElement;
    if (deleteBtn) fireEvent.click(deleteBtn);
    expect(defaultProps.onDelete).toHaveBeenCalledWith("s1");
  });

  it("separates messages by current and other channels", () => {
    const msgs: ScheduledMessage[] = [
      { id: "s1", channel: "general", content: "In general", scheduledTime: Date.now() + 60000, createdAt: Date.now() },
      { id: "s2", channel: "random", content: "In random", scheduledTime: Date.now() + 120000, createdAt: Date.now() },
    ];
    renderWithI18n(<MessageScheduler {...defaultProps} scheduledMessages={msgs} />);
    expect(screen.getByText("In general")).toBeInTheDocument();
    expect(screen.getByText("In random")).toBeInTheDocument();
  });
});
