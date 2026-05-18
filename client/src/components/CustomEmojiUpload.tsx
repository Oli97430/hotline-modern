import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import type { ServerCustomEmoji } from "../hooks/useWebSocket";

interface CustomEmojiUploadProps {
  emojis: ServerCustomEmoji[];
  serverBaseUrl: string;
  onUploadToServer: (name: string, file: File) => void;
  onDelete: (name: string) => void;
  onClose: () => void;
}

// Keep these for backward compatibility — they are no-ops now that we use the server
const STORAGE_KEY = "hotline-custom-emojis";
interface LegacyEmoji { id: string; name: string; url: string; }
export function loadCustomEmojis(): LegacyEmoji[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
export function saveCustomEmojis(emojis: LegacyEmoji[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emojis));
}

export function CustomEmojiUpload({ emojis, serverBaseUrl, onUploadToServer, onDelete, onClose }: CustomEmojiUploadProps) {
  const { t } = useTranslation();
  const [emojiName, setEmojiName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 256 * 1024) return; // Max 256KB
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleUpload = async () => {
    if (!selectedFile || !emojiName.trim()) return;
    setUploading(true);
    try {
      const cleanName = emojiName.trim().toLowerCase().replace(/\s+/g, "_");
      await onUploadToServer(cleanName, selectedFile);
      setEmojiName("");
      setPreview(null);
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="custom-emoji-panel" onClick={(e) => e.stopPropagation()}>
        <div className="custom-emoji-header">
          <Upload size={16} />
          <h3>{t("customEmoji.title")}</h3>
          <button className="custom-emoji-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="custom-emoji-body">
          <div className="custom-emoji-upload-area">
            <div className="custom-emoji-preview-zone" onClick={() => fileInputRef.current?.click()}>
              {preview ? (
                <img src={preview} alt="preview" className="custom-emoji-preview-img" />
              ) : (
                <>
                  <Plus size={20} />
                  <span>{t("customEmoji.selectImage")}</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <div className="custom-emoji-upload-form">
              <input
                type="text"
                value={emojiName}
                onChange={(e) => setEmojiName(e.target.value)}
                placeholder={t("customEmoji.namePlaceholder")}
                className="custom-emoji-name-input"
                maxLength={20}
              />
              <button
                className="custom-emoji-upload-btn"
                onClick={handleUpload}
                disabled={!selectedFile || !emojiName.trim() || uploading}
              >
                <Upload size={12} />
                <span>{uploading ? "..." : t("customEmoji.upload")}</span>
              </button>
            </div>
            <span className="custom-emoji-hint">{t("customEmoji.hint")}</span>
          </div>

          {emojis.length > 0 && (
            <div className="custom-emoji-list">
              <span className="custom-emoji-list-label">{t("customEmoji.existing")}</span>
              <div className="custom-emoji-grid">
                {emojis.map((emoji) => (
                  <div key={emoji.name} className="custom-emoji-item">
                    <img src={`${serverBaseUrl}${emoji.url}`} alt={emoji.name} className="custom-emoji-img" />
                    <span className="custom-emoji-item-name">:{emoji.name}:</span>
                    <button className="custom-emoji-delete" onClick={() => onDelete(emoji.name)}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          .custom-emoji-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 400px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .custom-emoji-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .custom-emoji-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .custom-emoji-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .custom-emoji-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .custom-emoji-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 400px;
            overflow-y: auto;
          }
          .custom-emoji-upload-area {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }
          .custom-emoji-preview-zone {
            width: 80px;
            height: 80px;
            border: 2px dashed var(--border);
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            color: var(--text-muted);
            font-size: 10px;
            cursor: pointer;
            transition: border-color var(--transition-fast), background var(--transition-fast);
          }
          .custom-emoji-preview-zone:hover {
            border-color: var(--accent);
            background: var(--accent-dim);
          }
          .custom-emoji-preview-img {
            width: 48px;
            height: 48px;
            object-fit: contain;
          }
          .custom-emoji-upload-form {
            display: flex;
            gap: 8px;
            width: 100%;
          }
          .custom-emoji-name-input {
            flex: 1;
            padding: 7px 10px;
            font-size: 12px;
          }
          .custom-emoji-upload-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 7px 12px;
            font-size: 11px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
          }
          .custom-emoji-upload-btn:hover:not(:disabled) {
            background: var(--accent-hover);
          }
          .custom-emoji-upload-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .custom-emoji-hint {
            font-size: 10px;
            color: var(--text-muted);
            text-align: center;
          }
          .custom-emoji-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .custom-emoji-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .custom-emoji-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .custom-emoji-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 8px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
          }
          .custom-emoji-img {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }
          .custom-emoji-item-name {
            font-size: 11px;
            font-family: var(--font-mono);
            color: var(--text-secondary);
          }
          .custom-emoji-delete {
            color: var(--text-muted);
            padding: 2px;
            border-radius: var(--radius-sm);
            opacity: 0;
            transition: opacity var(--transition-fast), color var(--transition-fast);
          }
          .custom-emoji-item:hover .custom-emoji-delete {
            opacity: 1;
          }
          .custom-emoji-delete:hover {
            color: var(--danger);
          }
        `}</style>
      </div>
    </div>
  );
}
