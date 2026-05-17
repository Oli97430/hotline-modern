import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { MessageBubble } from "../components/MessageBubble";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe("MessageBubble", () => {
  const baseProps = {
    id: "msg-1",
    userId: "user-123",
    nickname: "Alice",
    content: "Hello world!",
    role: "member",
    timestamp: Date.now() - 60000,
    isOwn: false,
    currentUserId: "current-user",
    canModerate: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nickname and content", () => {
    renderWithI18n(<MessageBubble {...baseProps} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });

  it("renders time", () => {
    renderWithI18n(<MessageBubble {...baseProps} />);
    // Time should be displayed in some format
    const timeEl = document.querySelector(".message-time");
    expect(timeEl).toBeInTheDocument();
  });

  it("shows edited badge when edited", () => {
    renderWithI18n(<MessageBubble {...baseProps} edited={true} />);
    expect(screen.getByText("(edited)")).toBeInTheDocument();
  });

  it("does not show edited badge when not edited", () => {
    renderWithI18n(<MessageBubble {...baseProps} edited={false} />);
    expect(screen.queryByText("(edited)")).not.toBeInTheDocument();
  });

  it("renders bold text with **", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="This is **bold** text" />);
    const bold = document.querySelector("strong");
    expect(bold).toBeInTheDocument();
    expect(bold?.textContent).toBe("bold");
  });

  it("renders italic text with *", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="This is *italic* text" />);
    const italic = document.querySelector("em");
    expect(italic).toBeInTheDocument();
    expect(italic?.textContent).toBe("italic");
  });

  it("renders inline code with backticks", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="Use `const x = 1` here" />);
    const code = document.querySelector(".msg-code");
    expect(code).toBeInTheDocument();
    expect(code?.textContent).toBe("const x = 1");
  });

  it("renders @mentions with special styling", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="Hey @Bob check this" />);
    const mention = document.querySelector(".msg-mention");
    expect(mention).toBeInTheDocument();
    expect(mention?.textContent).toBe("@Bob");
  });

  it("renders links as clickable anchors", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="Visit https://example.com" />);
    const link = document.querySelector("a.msg-link") as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link?.href).toBe("https://example.com/");
    expect(link?.target).toBe("_blank");
  });

  it("renders markdown links [text](url)", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="Click [here](https://example.com)" />);
    const link = document.querySelector("a.msg-link") as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toBe("here");
  });

  it("renders strikethrough with ~~", () => {
    renderWithI18n(<MessageBubble {...baseProps} content="This is ~~deleted~~ text" />);
    const del = document.querySelector("del");
    expect(del).toBeInTheDocument();
    expect(del?.textContent).toBe("deleted");
  });

  it("shows pinned badge when isPinned", () => {
    const { container } = renderWithI18n(<MessageBubble {...baseProps} isPinned={true} />);
    const pinBadge = container.querySelector(".message-pin-badge");
    expect(pinBadge).toBeInTheDocument();
  });

  it("opens context menu on right click", () => {
    const { container } = renderWithI18n(<MessageBubble {...baseProps} />);
    const msgEl = container.querySelector(".message");
    if (msgEl) {
      fireEvent.contextMenu(msgEl);
    }
    const ctxMenu = document.querySelector(".ctx-menu");
    expect(ctxMenu).toBeInTheDocument();
  });

  it("hides nickname in grouped messages", () => {
    renderWithI18n(<MessageBubble {...baseProps} isGrouped={true} />);
    // In grouped mode, nickname should not be visible
    const nickEl = document.querySelector(".message-nick");
    expect(nickEl).toBeNull();
  });

  it("renders reactions when provided", () => {
    const reactions = [
      { emoji: "👍", users: ["user-1", "user-2"] },
      { emoji: "❤️", users: ["user-3"] },
    ];
    const { container } = renderWithI18n(<MessageBubble {...baseProps} reactions={reactions} />);
    const reactionChips = container.querySelectorAll(".reaction-chip");
    expect(reactionChips.length).toBe(2);
  });

  it("renders code blocks when content has fenced code", () => {
    const content = "Check this:\n```js\nconst x = 1;\n```\nDone";
    const { container } = renderWithI18n(<MessageBubble {...baseProps} content={content} />);
    const codeBlock = container.querySelector(".code-block");
    expect(codeBlock).toBeInTheDocument();
  });

  it("renders reply context when provided", () => {
    const replyContext = { nickname: "Bob", content: "Original message" };
    renderWithI18n(<MessageBubble {...baseProps} replyContext={replyContext} />);
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders blockquote for lines starting with >", () => {
    const content = "> This is quoted text";
    const { container } = renderWithI18n(<MessageBubble {...baseProps} content={content} />);
    const blockquote = container.querySelector(".msg-blockquote");
    expect(blockquote).toBeInTheDocument();
  });

  it("calls onReply when reply action is triggered", () => {
    const onReply = vi.fn();
    const { container } = renderWithI18n(<MessageBubble {...baseProps} onReply={onReply} />);

    // Open context menu
    const msgEl = container.querySelector(".message");
    if (msgEl) fireEvent.contextMenu(msgEl);

    // Click reply
    const replyBtn = screen.getByText("Reply");
    fireEvent.click(replyBtn);

    expect(onReply).toHaveBeenCalledWith("msg-1");
  });

  it("shows own message styling when isOwn", () => {
    const { container } = renderWithI18n(<MessageBubble {...baseProps} isOwn={true} />);
    const msgEl = container.querySelector(".message.own");
    expect(msgEl).toBeInTheDocument();
  });
});
