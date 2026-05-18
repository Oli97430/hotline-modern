import { FileIcon, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getFileAuthHeaders, type Identity } from "../lib/crypto";

interface FileUploadZoneProps {
  serverAddress: string;
  identity: Identity;
  onFileUploaded: (url: string, filename: string) => void;
  children: React.ReactNode;
}

export function FileUploadZone({ serverAddress, identity, onFileUploaded, children }: FileUploadZoneProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setUploadProgress(file.name);

      try {
        const protocol = serverAddress.startsWith("wss://") ? "https://" : "http://";
        const base = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
        const uploadUrl = `${protocol}${base}/files/`;

        const formData = new FormData();
        formData.append("file", file);

        const resp = await fetch(uploadUrl, {
          method: "POST",
          headers: getFileAuthHeaders(identity),
          body: formData,
        });

        if (!resp.ok) {
          throw new Error(`Upload failed: ${resp.status}`);
        }

        const result = await resp.json();
        const fileUrl = `${protocol}${base}/files/${result.path}`;
        onFileUploaded(fileUrl, result.filename || file.name);
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
        setUploadProgress("");
      }
    },
    [serverAddress, identity, onFileUploaded],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFile(files[0]);
      }
    },
    [uploadFile],
  );

  return (
    <div
      className="file-upload-zone-wrapper"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
      {isDragging && (
        <div className="file-drop-overlay">
          <Upload size={48} />
          <span>{t("files.dropHere")}</span>
        </div>
      )}
      {uploading && (
        <div className="file-upload-progress">
          <FileIcon size={14} />
          <span>{uploadProgress}</span>
          <span className="upload-spinner" />
        </div>
      )}
      <style>{`
        .file-upload-zone-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }
        .file-drop-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(var(--accent-rgb, 59, 130, 246), 0.15);
          border: 2px dashed var(--accent);
          border-radius: 8px;
          z-index: 20;
          color: var(--accent);
          font-size: 16px;
          font-weight: 500;
          pointer-events: none;
        }
        .file-upload-progress {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 12px;
          color: var(--text-secondary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
        .upload-spinner {
          width: 12px;
          height: 12px;
          border: 2px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
}

export function FileUploadButton({ onFileSelect }: FileUploadButtonProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button className="file-upload-btn" onClick={() => inputRef.current?.click()} title={t("files.upload")}>
        <Upload size={16} />
      </button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onFileSelect(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />
      <style>{`
        .file-upload-btn {
          padding: 6px;
          color: var(--text-muted);
          border-radius: 4px;
          transition: color 0.2s;
        }
        .file-upload-btn:hover {
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
