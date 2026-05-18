import { ChevronDown, ChevronUp, Globe, Plus, RefreshCw, Settings, Users, Wifi, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { type TrackerServer, useTrackerServers } from "../hooks/useTrackerServers";

interface ServerBrowserProps {
  onConnect: (address: string) => void;
}

export function ServerBrowser({ onConnect }: ServerBrowserProps) {
  const { t } = useTranslation();
  const { servers, loading, error, refresh, trackerUrls, addTracker, removeTracker } = useTrackerServers();
  const [showSettings, setShowSettings] = useState(false);
  const [newTrackerUrl, setNewTrackerUrl] = useState("");

  const handleConnect = (srv: TrackerServer) => {
    // Detect tunnel/cloud addresses — use wss:// without port
    const isPublicDomain = srv.address.includes(".") && !srv.address.match(/^\d+\.\d+\.\d+\.\d+$/) && srv.port === 443;
    if (isPublicDomain) {
      onConnect(`wss://${srv.address}`);
    } else {
      onConnect(`${srv.address}:${srv.port}`);
    }
  };

  const handleAddTracker = () => {
    if (newTrackerUrl.trim()) {
      addTracker(newTrackerUrl);
      setNewTrackerUrl("");
    }
  };

  return (
    <div className="server-browser">
      <div className="sb-header">
        <Globe size={14} />
        <span>{t("tracker.browseServers")}</span>
        <div className="sb-header-actions">
          <button
            className="sb-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            title={t("tracker.settings")}
          >
            <Settings size={12} />
            {showSettings ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
          <button className="sb-refresh" onClick={refresh} disabled={loading} title={t("tracker.refresh")}>
            <RefreshCw size={12} className={loading ? "sb-spin" : ""} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="sb-settings">
          <div className="sb-tracker-list">
            {trackerUrls.map((url) => (
              <div key={url} className="sb-tracker-item">
                <Wifi size={10} />
                <span className="sb-tracker-url">{url}</span>
                <button
                  className="sb-tracker-remove"
                  onClick={() => removeTracker(url)}
                  title={t("tracker.removeTracker")}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
          <div className="sb-add-tracker">
            <input
              type="text"
              value={newTrackerUrl}
              onChange={(e) => setNewTrackerUrl(e.target.value)}
              placeholder={t("tracker.trackerPlaceholder")}
              onKeyDown={(e) => e.key === "Enter" && handleAddTracker()}
            />
            <button className="sb-add-btn" onClick={handleAddTracker} disabled={!newTrackerUrl.trim()}>
              <Plus size={12} />
            </button>
          </div>
        </div>
      )}

      <div className="sb-list">
        {error && <div className="sb-error">{t(error)}</div>}
        {error && trackerUrls.length === 0 && <div className="sb-hint">{t("tracker.addTrackerHint")}</div>}
        {!error && servers.length === 0 && !loading && <div className="sb-empty">{t("tracker.noServers")}</div>}
        {loading && servers.length === 0 && <div className="sb-loading">{t("tracker.loading")}</div>}
        {servers.map((srv) => (
          <div
            key={`${srv.address}:${srv.port}`}
            className="sb-server"
            role="button"
            tabIndex={0}
            aria-label={`${srv.name || srv.address}, ${srv.users} utilisateurs`}
            onClick={() => handleConnect(srv)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleConnect(srv);
              }
            }}
          >
            <div className="sb-server-info">
              <span className="sb-server-name">{srv.name}</span>
              {srv.description && <span className="sb-server-desc">{srv.description}</span>}
            </div>
            <div className="sb-server-meta">
              <span className="sb-server-users">
                <Users size={11} />
                {srv.users}
              </span>
              <span className="sb-server-addr">
                {srv.address}:{srv.port}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .server-browser {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 4px;
        }
        .sb-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .sb-header-actions {
          margin-left: auto;
          display: flex;
          gap: 4px;
        }
        .sb-settings-btn, .sb-refresh {
          padding: 4px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 2px;
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .sb-settings-btn:hover, .sb-refresh:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .sb-spin {
          animation: spin 1s linear infinite;
        }
        .sb-settings {
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          padding: 8px;
          margin-bottom: 8px;
          animation: fadeIn 0.15s ease;
        }
        .sb-tracker-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 6px;
        }
        .sb-tracker-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-secondary);
          padding: 4px 6px;
          border-radius: var(--radius-sm);
        }
        .sb-tracker-url {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono);
          font-size: 10px;
        }
        .sb-tracker-remove {
          padding: 2px;
          border-radius: 3px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .sb-tracker-remove:hover {
          color: var(--danger);
        }
        .sb-add-tracker {
          display: flex;
          gap: 4px;
        }
        .sb-add-tracker input {
          flex: 1;
          padding: 4px 8px;
          font-size: 11px;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }
        .sb-add-btn {
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          transition: opacity var(--transition-fast);
        }
        .sb-add-btn:disabled {
          opacity: 0.4;
        }
        .sb-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 200px;
          overflow-y: auto;
        }
        .sb-server {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .sb-server:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
        }
        .sb-server-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }
        .sb-server-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-server-desc {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-server-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          flex-shrink: 0;
          margin-left: 12px;
        }
        .sb-server-users {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent);
        }
        .sb-server-addr {
          font-size: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .sb-empty, .sb-loading, .sb-error {
          padding: 16px;
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .sb-hint {
          padding: 8px 16px;
          text-align: center;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .sb-error {
          color: var(--danger);
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
