import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SearchResult } from "../hooks/useWebSocket";

interface SearchPanelProps {
  onSearch: (query: string, channel?: string) => void;
  onClose: () => void;
  results: SearchResult[];
  activeChannel: string;
}

function highlightText(text: string, query: string): (string | JSX.Element)[] {
  if (!query || query.length < 2) return [text];
  const parts: (string | JSX.Element)[] = [];
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  let last = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <mark key={key++} className="search-highlight">
        {match[1]}
      </mark>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const SEARCH_HISTORY_KEY = "hotline-search-history";

export function SearchPanel({ onSearch, onClose, results, activeChannel }: SearchPanelProps) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [searchAll, setSearchAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number>(0);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [inputFocused, setInputFocused] = useState(true);

  const saveToHistory = (q: string) => {
    if (q.length < 2) return;
    const updated = [q, ...searchHistory.filter((h) => h !== q)].slice(0, 20);
    setSearchHistory(updated);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  };

  const removeFromHistory = (q: string) => {
    const updated = searchHistory.filter((h) => h !== q);
    setSearchHistory(updated);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (value.length >= 2) {
      debounceRef.current = window.setTimeout(() => {
        onSearch(value, searchAll ? undefined : activeChannel);
        saveToHistory(value);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const formatTime = (ts: number) =>
    new Intl.DateTimeFormat(i18n.language, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));

  return (
    <div className="search-panel">
      <div className="search-header">
        <Search size={16} />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
          placeholder={t("search.placeholder")}
        />
        {results.length > 0 && <span className="search-count">{results.length}</span>}
        <label className="search-scope">
          <input type="checkbox" checked={searchAll} onChange={(e) => setSearchAll(e.target.checked)} />
          <span>{t("search.allChannels")}</span>
        </label>
        <button type="button" className="search-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {query === "" && inputFocused && searchHistory.length > 0 && (
        <ul className="search-history">
          {searchHistory.map((h) => (
            <li key={h} className="search-history-item">
              <button type="button"
                className="search-history-btn"
                onClick={() => {
                  setQuery(h);
                  handleChange(h);
                }}
              >
                <Search size={12} />
                <span>{h}</span>
              </button>
              <button type="button" className="search-history-remove" onClick={() => removeFromHistory(h)}>
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((r) => (
            <li key={r.id} className="search-result-item">
              <div className="search-result-meta">
                <span className="search-result-nick">{r.nickname}</span>
                <span className="search-result-channel">#{r.channel}</span>
                <span className="search-result-time">{formatTime(r.timestamp)}</span>
              </div>
              <div className="search-result-content">{highlightText(r.content, query)}</div>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="search-empty">
          <Search size={20} className="search-empty-icon" />
          <span>{t("search.noResults")}</span>
        </div>
      )}

      <style>{`
        .search-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          z-index: 50;
          animation: slideDown 0.15s ease;
          max-height: 60%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }
        .search-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          font-weight: 450;
        }
        .search-input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }
        .search-count {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          background: var(--accent);
          padding: 2px 7px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          line-height: 1.4;
          animation: fadeIn 0.15s ease;
        }
        .search-scope {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .search-scope:hover {
          background: var(--bg-tertiary);
        }
        .search-scope input[type="checkbox"] {
          width: 14px;
          height: 14px;
          accent-color: var(--accent);
        }
        .search-close {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .search-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .search-results {
          list-style: none;
          overflow-y: auto;
          max-height: 300px;
        }
        .search-result-item {
          padding: 10px 16px;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .search-result-item:hover {
          background: var(--bg-tertiary);
        }
        .search-result-item:last-child {
          border-bottom: none;
        }
        .search-result-meta {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 3px;
        }
        .search-result-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .search-result-channel {
          font-size: 11px;
          color: var(--accent);
          font-weight: 500;
        }
        .search-result-time {
          font-size: 11px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .search-result-content {
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }
        .search-highlight {
          background: rgba(var(--accent-rgb), 0.2);
          color: var(--accent);
          border-radius: 2px;
          padding: 1px 3px;
          font-weight: 600;
          border-bottom: 1px solid rgba(var(--accent-rgb), 0.4);
        }
        .search-empty {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 13px;
          animation: fadeIn 0.2s ease;
        }
        .search-empty-icon {
          opacity: 0.4;
        }
        .search-history {
          list-style: none;
          border-bottom: 1px solid var(--border);
          max-height: 200px;
          overflow-y: auto;
        }
        .search-history-item {
          display: flex;
          align-items: center;
          padding: 0 8px 0 0;
        }
        .search-history-btn {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 13px;
          color: var(--text-secondary);
          text-align: left;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .search-history-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .search-history-remove {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .search-history-item:hover .search-history-remove {
          opacity: 1;
        }
        .search-history-remove:hover {
          color: var(--danger);
        }
      `}</style>
    </div>
  );
}
