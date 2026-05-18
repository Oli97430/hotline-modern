import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple keyword-based syntax highlighting
const KEYWORDS: Record<string, string[]> = {
  keyword: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "new",
    "delete",
    "typeof",
    "instanceof",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "finally",
    "throw",
    "yield",
    "of",
    "in",
    "this",
    "super",
    "static",
    "public",
    "private",
    "protected",
    "interface",
    "type",
    "enum",
    "struct",
    "impl",
    "fn",
    "pub",
    "mod",
    "use",
    "crate",
    "trait",
    "where",
    "mut",
    "ref",
    "self",
    "match",
    "loop",
    "def",
    "elif",
    "pass",
    "lambda",
    "with",
    "as",
    "raise",
    "except",
    "True",
    "False",
    "None",
    "func",
    "go",
    "defer",
    "chan",
    "select",
    "package",
    "range",
    "map",
  ],
  builtin: [
    "console",
    "window",
    "document",
    "Math",
    "JSON",
    "Array",
    "Object",
    "String",
    "Number",
    "Boolean",
    "Promise",
    "Map",
    "Set",
    "Error",
    "null",
    "undefined",
    "true",
    "false",
    "nil",
    "fmt",
    "println",
    "print",
    "len",
    "append",
    "make",
  ],
  type: [
    "string",
    "number",
    "boolean",
    "void",
    "any",
    "never",
    "unknown",
    "int",
    "float",
    "double",
    "char",
    "bool",
    "i32",
    "u32",
    "i64",
    "u64",
    "f32",
    "f64",
    "usize",
    "isize",
    "Vec",
    "Option",
    "Result",
  ],
};

function highlightCode(code: string): JSX.Element[] {
  const lines = code.split("\n");
  const elements: JSX.Element[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tokens: JSX.Element[] = [];
    let remaining = line;
    let tokenKey = 0;

    while (remaining.length > 0) {
      // String literals
      const strMatch = remaining.match(/^(["'`])(?:\\.|[^\\])*?\1/);
      if (strMatch) {
        tokens.push(
          <span key={tokenKey++} className="code-string">
            {strMatch[0]}
          </span>,
        );
        remaining = remaining.slice(strMatch[0].length);
        continue;
      }

      // Comments
      const commentMatch = remaining.match(/^(\/\/.*|#.*)/);
      if (commentMatch) {
        tokens.push(
          <span key={tokenKey++} className="code-comment">
            {commentMatch[0]}
          </span>,
        );
        remaining = remaining.slice(commentMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^(0x[0-9a-fA-F]+|\d+\.?\d*)/);
      if (
        numMatch &&
        (tokens.length === 0 || !/\w$/.test(tokens[tokens.length - 1]?.props?.children?.toString() || ""))
      ) {
        tokens.push(
          <span key={tokenKey++} className="code-number">
            {numMatch[0]}
          </span>,
        );
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Words (keywords, builtins, types)
      const wordMatch = remaining.match(/^[a-zA-Z_]\w*/);
      if (wordMatch) {
        const word = wordMatch[0];
        let cls = "";
        if (KEYWORDS.keyword.includes(word)) cls = "code-keyword";
        else if (KEYWORDS.builtin.includes(word)) cls = "code-builtin";
        else if (KEYWORDS.type.includes(word)) cls = "code-type";

        if (cls) {
          tokens.push(
            <span key={tokenKey++} className={cls}>
              {word}
            </span>,
          );
        } else {
          tokens.push(<span key={tokenKey++}>{word}</span>);
        }
        remaining = remaining.slice(word.length);
        continue;
      }

      // Operators and punctuation
      const opMatch = remaining.match(/^[^\w\s]+/);
      if (opMatch) {
        tokens.push(
          <span key={tokenKey++} className="code-punct">
            {opMatch[0]}
          </span>,
        );
        remaining = remaining.slice(opMatch[0].length);
        continue;
      }

      // Whitespace
      const wsMatch = remaining.match(/^\s+/);
      if (wsMatch) {
        tokens.push(<span key={tokenKey++}>{wsMatch[0]}</span>);
        remaining = remaining.slice(wsMatch[0].length);
        continue;
      }

      // Fallback: single character
      tokens.push(<span key={tokenKey++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    elements.push(
      <div key={i} className="code-line">
        <span className="code-line-number">{i + 1}</span>
        <span className="code-line-content">{tokens}</span>
      </div>,
    );
  }

  return elements;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-lang">{language || "code"}</span>
        <button className="code-block-copy" onClick={handleCopy} title="Copy">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="code-block-body">
        <code>{highlightCode(code)}</code>
      </pre>

      <style>{`
        .code-block {
          margin-top: 8px;
          margin-bottom: 4px;
          border-radius: var(--radius);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          max-width: 600px;
          animation: fadeIn 0.15s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }
        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-subtle);
        }
        .code-block-lang {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: lowercase;
          font-family: var(--font-mono);
        }
        .code-block-copy {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-muted);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .code-block-copy:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .code-block-body {
          margin: 0;
          padding: 12px 0;
          overflow-x: auto;
          background: var(--bg-primary);
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
        }
        .code-block-body code {
          display: block;
        }
        .code-line {
          display: flex;
          padding: 0 12px;
        }
        .code-line:hover {
          background: var(--bg-secondary);
        }
        .code-line-number {
          width: 32px;
          text-align: right;
          padding-right: 12px;
          color: var(--text-muted);
          opacity: 0.5;
          user-select: none;
          flex-shrink: 0;
          font-size: 11px;
        }
        .code-line-content {
          flex: 1;
          white-space: pre;
        }
        .code-keyword {
          color: #c678dd;
          font-weight: 500;
        }
        .code-builtin {
          color: #61afef;
        }
        .code-type {
          color: #e5c07b;
        }
        .code-string {
          color: #98c379;
        }
        .code-number {
          color: #d19a66;
        }
        .code-comment {
          color: #5c6370;
          font-style: italic;
        }
        .code-punct {
          color: var(--text-muted);
        }
        [data-theme="light"] .code-keyword { color: #a626a4; }
        [data-theme="light"] .code-builtin { color: #4078f2; }
        [data-theme="light"] .code-type { color: #c18401; }
        [data-theme="light"] .code-string { color: #50a14f; }
        [data-theme="light"] .code-number { color: #986801; }
        [data-theme="light"] .code-comment { color: #a0a1a7; }
      `}</style>
    </div>
  );
}
