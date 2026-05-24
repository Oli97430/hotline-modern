import { ArrowUp, Download, File, Folder, FolderOpen, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFileAuthHeaders, type Identity } from "../lib/crypto";
import type { FileEntry } from "../lib/protocol";

interface FileBrowserProps {
  serverAddress: string;
  identity: Identity;
  canUpload: boolean;
  canDownload: boolean;
}

export function FileBrowser({ serverAddress, identity, canUpload, canDownload }: FileBrowserProps) {
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // File server runs on the same port as WebSocket
  const isWSS = serverAddress.startsWith("wss://");
  const cleanAddr = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
  const protocol = isWSS ? "https" : "http";
  const baseUrl = `${protocol}://${cleanAddr}`;

  const fetchFiles = async (dirPath: string) => {
    setLoading(true);
    try {
      const url = `${baseUrl}/files/${dirPath}`;
      const res = await fetch(url, {
        headers: getFileAuthHeaders(identity),
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
        setPath(dirPath);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (entry: FileEntry) => {
    if (entry.isDir) {
      const newPath = path ? `${path}/${entry.name}` : entry.name;
      fetchFiles(newPath);
    } else if (canDownload) {
      const filePath = path ? `${path}/${entry.name}` : entry.name;
      window.open(`${baseUrl}/files/${filePath}`, "_blank");
    }
  };

  const handleGoUp = () => {
    const parts = path.split("/").filter(Boolean);
    parts.pop();
    fetchFiles(parts.join("/"));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadPath = path ? `${path}/${file.name}` : file.name;
    await fetch(`${baseUrl}/files/${uploadPath}`, {
      method: "POST",
      headers: getFileAuthHeaders(identity),
      body: formData,
    });

    fetchFiles(path);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const breadcrumbs = path ? path.split("/").filter(Boolean) : [];

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchFiles("");
    }
  }, []);

  return (
    <div className="file-browser">
      <div className="file-header">
        <span>{t("files.title")}</span>
        {canUpload && (
          <label className="file-upload-btn">
            <Upload size={13} />
            <input type="file" hidden onChange={handleUpload} />
          </label>
        )}
      </div>

      {breadcrumbs.length > 0 && (
        <div className="file-breadcrumb">
          <button type="button" className="breadcrumb-item" onClick={() => fetchFiles("")}>
            ~
          </button>
          {breadcrumbs.map((part, i) => (
            <span key={i} className="breadcrumb-item">
              <span className="breadcrumb-sep">/</span>
              <button type="button" onClick={() => fetchFiles(breadcrumbs.slice(0, i + 1).join("/"))}>{part}</button>
            </span>
          ))}
        </div>
      )}

      <div className="file-entries">
        {loading && (
          <div className="file-skeleton">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        )}
        {!loading && path && (
          <div className="file-entry" onClick={handleGoUp} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { handleGoUp; } }} role="button" tabIndex={0}>
            <ArrowUp size={14} className="file-icon up" />
            <span className="file-name">..</span>
          </div>
        )}
        {!loading &&
          entries.map((entry) => (
            <div
              key={entry.name}
              className={`file-entry ${entry.isDir ? "dir" : ""}`}
              onClick={() => handleNavigate(entry)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { () => handleNavigate(entry); } }} role="button" tabIndex={0}
            >
              {entry.isDir ? (
                <Folder size={14} className="file-icon folder" />
              ) : (
                <File size={14} className="file-icon" />
              )}
              <span className="file-name">{entry.name}</span>
              {!entry.isDir && <span className="file-size">{formatSize(entry.size)}</span>}
              {!entry.isDir && canDownload && <Download size={12} className="file-dl" />}
            </div>
          ))}
        {!loading && entries.length === 0 && (
          <div className="file-empty">
            <FolderOpen size={20} className="file-empty-icon" />
            <span>{t("files.empty")}</span>
          </div>
        )}
      </div>

      <style>{`
        .file-browser {
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          max-height: 300px;
        }
        .file-header {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .file-upload-btn {
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .file-upload-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .file-breadcrumb {
          padding: 0 16px 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1px;
        }
        .breadcrumb-item button {
          color: var(--text-muted);
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 1px 3px;
          border-radius: 2px;
          transition: color var(--transition-fast);
        }
        .breadcrumb-item button:hover {
          color: var(--accent);
        }
        .breadcrumb-sep {
          color: var(--text-muted);
          opacity: 0.5;
          margin: 0 1px;
        }
        .file-entries {
          overflow-y: auto;
          flex: 1;
          padding-bottom: 4px;
        }
        .file-skeleton {
          padding: 8px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .skeleton-line {
          height: 20px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          animation: pulse 1.5s ease-in-out infinite;
        }
        .skeleton-line:nth-child(2) { width: 75%; }
        .skeleton-line:nth-child(3) { width: 60%; }
        .file-entry {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          cursor: pointer;
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          transition: background var(--transition-fast), transform var(--transition-fast);
          margin: 1px 6px;
          border-radius: var(--radius-sm);
        }
        .file-entry:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .file-entry:active {
          transform: scale(0.99);
        }
        .file-icon {
          flex-shrink: 0;
          color: var(--text-muted);
        }
        .file-icon.folder {
          color: var(--accent);
          opacity: 0.8;
        }
        .file-icon.up {
          color: var(--text-muted);
        }
        .file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .file-size {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .file-dl {
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .file-entry:hover .file-dl {
          opacity: 1;
        }
        .file-empty {
          padding: 20px 16px;
          color: var(--text-muted);
          font-size: 13px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .file-empty-icon {
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
