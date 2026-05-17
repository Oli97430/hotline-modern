import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { SearchResult } from "../hooks/useWebSocket";

interface SearchPanelProps {
  onSearch: (query: string, channel?: string) => void;
  onClose: () => void;
  results: SearchResult[];
  activeChannel: string;
}

export function SearchPanel({ onSearch, onClose, results, activeChannel }: SearchPanelProps) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [searchAll, setSearchAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number>(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (value.length >= 2) {
      debounceRef.current = window.setTimeout(() => {
        onSearch(value, searchAll ? undefined : activeChannel);
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
          placeholder={t("search.placeholder")}
        />
        <label className="search-scope">
          <input
            type="checkbox"
            checked={searchAll}
            onChange={(e) => setSearchAll(e.target.checked)}
          />
          <span>{t("search.allChannels")}</span>
        </label>
        <button className="search-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((r) => (
            <li key={r.id} className="search-result-item">
              <div className="search-result-meta">
                <span className="search-result-nick">{r.nickname}</span>
                <span className="search-result-channel">#{r.channel}</span>
                <span className="search-result-time">{formatTime(r.timestamp)}</span>
              </div>
              <div className="search-result-content">{r.content}</div>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="search-empty">{t("search.noResults")}</div>
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
        }
        .search-header {
          display: flex;
          align-items: center;
          gap: 8px;
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
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .search-scope {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
        }
        .search-scope input[type="checkbox"] {
          width: 14px;
          height: 14px;
          accent-color: var(--accent);
        }
        .search-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .search-close:hover {
          color: var(--text-primary);
        }
        .search-results {
          list-style: none;
          overflow-y: auto;
          max-height: 300px;
        }
        .search-result-item {
          padding: 8px 16px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.1s;
        }
        .search-result-item:hover {
          background: var(--bg-tertiary);
        }
        .search-result-meta {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }
        .search-result-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .search-result-channel {
          font-size: 11px;
          color: var(--accent);
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
        }
        .search-empty {
          padding: 16px;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
