import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CodeBlock } from "../components/CodeBlock";

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock code="const x = 42;" language="javascript" />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows language label", () => {
    render(<CodeBlock code="print('hi')" language="python" />);
    expect(screen.getByText("python")).toBeInTheDocument();
  });

  it("shows 'code' as default language", () => {
    render(<CodeBlock code="something" />);
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("renders line numbers", () => {
    const code = "line1\nline2\nline3";
    const { container } = render(<CodeBlock code={code} language="text" />);
    const lineNumbers = container.querySelectorAll(".code-line-number");
    expect(lineNumbers.length).toBe(3);
    expect(lineNumbers[0].textContent).toBe("1");
    expect(lineNumbers[2].textContent).toBe("3");
  });

  it("highlights keywords", () => {
    const { container } = render(<CodeBlock code="const x = function() {}" language="js" />);
    const keywords = container.querySelectorAll(".code-keyword");
    expect(keywords.length).toBeGreaterThan(0);
  });

  it("highlights strings", () => {
    const { container } = render(<CodeBlock code='const name = "hello"' language="js" />);
    const strings = container.querySelectorAll(".code-string");
    expect(strings.length).toBeGreaterThan(0);
  });

  it("highlights comments", () => {
    const { container } = render(<CodeBlock code="// this is a comment" language="js" />);
    const comments = container.querySelectorAll(".code-comment");
    expect(comments.length).toBeGreaterThan(0);
  });

  it("highlights numbers", () => {
    const { container } = render(<CodeBlock code="const x = 42" language="js" />);
    const numbers = container.querySelectorAll(".code-number");
    expect(numbers.length).toBeGreaterThan(0);
  });

  it("highlights builtin identifiers", () => {
    const { container } = render(<CodeBlock code="console.log(null)" language="js" />);
    const builtins = container.querySelectorAll(".code-builtin");
    expect(builtins.length).toBeGreaterThan(0);
  });

  it("highlights type keywords", () => {
    const { container } = render(<CodeBlock code="let x: string = ''" language="ts" />);
    const types = container.querySelectorAll(".code-type");
    expect(types.length).toBeGreaterThan(0);
  });

  it("has a copy button", () => {
    render(<CodeBlock code="test" language="js" />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("copies code to clipboard on click", async () => {
    render(<CodeBlock code="const y = 10;" language="js" />);
    const copyBtn = screen.getByText("Copy");
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("const y = 10;");
  });

  it("shows 'Copied!' after clicking copy", async () => {
    render(<CodeBlock code="test" language="js" />);
    const copyBtn = screen.getByText("Copy");
    fireEvent.click(copyBtn);
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("handles empty code", () => {
    const { container } = render(<CodeBlock code="" language="js" />);
    const lines = container.querySelectorAll(".code-line");
    expect(lines.length).toBe(1); // One empty line
  });

  it("handles multiline code", () => {
    const code = "function hello() {\n  return 'world';\n}";
    const { container } = render(<CodeBlock code={code} language="js" />);
    const lines = container.querySelectorAll(".code-line");
    expect(lines.length).toBe(3);
  });

  it("handles hex numbers", () => {
    const { container } = render(<CodeBlock code="const color = 0xFF00FF;" language="js" />);
    const numbers = container.querySelectorAll(".code-number");
    expect(numbers.length).toBeGreaterThan(0);
  });
});
