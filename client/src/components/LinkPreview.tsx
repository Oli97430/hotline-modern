import { ExternalLink, Globe } from "lucide-react";

interface LinkPreviewProps {
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getPath(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname + u.search;
    return path.length > 60 ? path.slice(0, 57) + "..." : path;
  } catch {
    return "";
  }
}

function getFavicon(url: string): string {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
  } catch {
    return "";
  }
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const domain = getDomain(url);
  const path = getPath(url);
  const favicon = getFavicon(url);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview">
      <div className="link-preview-favicon">
        {favicon ? (
          <img src={favicon} alt="" width={16} height={16} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <Globe size={14} />
        )}
      </div>
      <div className="link-preview-info">
        <span className="link-preview-domain">{domain}</span>
        {path && path !== "/" && <span className="link-preview-path">{path}</span>}
      </div>
      <ExternalLink size={12} className="link-preview-ext" />

      <style>{`
        .link-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius);
          text-decoration: none;
          max-width: 400px;
          transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .link-preview:hover {
          background: var(--bg-hover);
          border-color: var(--accent);
          transform: translateX(2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .link-preview-favicon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-muted);
          border-radius: 4px;
          background: var(--bg-secondary);
          padding: 2px;
        }
        .link-preview-favicon img {
          border-radius: 2px;
        }
        .link-preview-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .link-preview-domain {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .link-preview-path {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .link-preview-ext {
          flex-shrink: 0;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .link-preview:hover .link-preview-ext {
          opacity: 1;
        }
      `}</style>
    </a>
  );
}
