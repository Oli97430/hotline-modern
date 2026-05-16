import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Folder, File, ArrowUp, Upload, Download } from "lucide-react";
import { FileEntry } from "../lib/protocol";

interface FileBrowserProps {
  serverAddress: string;
  publicKey: string;
  signature: string;
  canUpload: boolean;
  canDownload: boolean;
}

export function FileBrowser({ serverAddress, publicKey, signature, canUpload, canDownload }: FileBrowserProps) {
  const { t, i18n } = useTranslation();
  const [path, setPath] = useState("");
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const httpBase = serverAddress.replace(/:\d+$/, ":9999");
  const baseUrl = `http://${httpBase}`;

  const fetchFiles = async (dirPath: string) => {
    setLoading(true);
    try {
      const url = `${baseUrl}/files/${dirPath}`;
      const res = await fetch(url, {
        headers: {
          "X-Hotline-PublicKey": publicKey,
          "X-Hotline-Signature": signature,
        },
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
      headers: {
        "X-Hotline-PublicKey": publicKey,
        "X-Hotline-Signature": signature,
      },
      body: formData,
    });

    fetchFiles(path);
  };

  const formatSize = (bytes: number) => {
    return new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(bytes);
  };

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
            <Upload size={14} />
            <input type="file" hidden onChange={handleUpload} />
          </label>
        )}
      </div>

      <div className="file-entries">
        {path && (
          <div className="file-entry" onClick={handleGoUp}>
            <ArrowUp size={14} />
            <span>{t("files.parentDir")}</span>
          </div>
        )}
        {entries.map((entry) => (
          <div key={entry.name} className="file-entry" onClick={() => handleNavigate(entry)}>
            {entry.isDir ? <Folder size={14} /> : <File size={14} />}
            <span className="file-name">{entry.name}</span>
            {!entry.isDir && <span className="file-size">{formatSize(entry.size)}</span>}
            {!entry.isDir && canDownload && <Download size={12} className="file-dl" />}
          </div>
        ))}
        {entries.length === 0 && !loading && (
          <div className="file-empty">{t("files.empty")}</div>
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
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .file-upload-btn {
          cursor: pointer;
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .file-upload-btn:hover {
          color: var(--accent);
        }
        .file-entries {
          overflow-y: auto;
          flex: 1;
        }
        .file-entry {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 16px;
          cursor: pointer;
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          transition: background 0.15s;
        }
        .file-entry:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
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
        }
        .file-dl {
          color: var(--text-muted);
        }
        .file-empty {
          padding: 12px 16px;
          color: var(--text-muted);
          font-size: 13px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
