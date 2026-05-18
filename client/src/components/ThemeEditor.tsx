import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Palette, X, Save, RotateCcw, Check, Upload, Download, ClipboardPaste } from "lucide-react";

interface CustomTheme {
  id: string;
  name: string;
  colors: Record<string, string>;
}

const EDITABLE_COLORS = [
  { key: "--accent", label: "Accent", default: "#6366f1" },
  { key: "--bg-primary", label: "Background", default: "#0f0f12" },
  { key: "--bg-secondary", label: "Surface", default: "#1a1a22" },
  { key: "--bg-tertiary", label: "Tertiary", default: "#24242e" },
  { key: "--text-primary", label: "Text", default: "#f0f0f5" },
  { key: "--text-muted", label: "Muted", default: "#6b6b80" },
  { key: "--border", label: "Border", default: "#2a2a35" },
  { key: "--danger", label: "Danger", default: "#ef4444" },
];

const STORAGE_KEY = "hotline-custom-themes";
const ACTIVE_THEME_KEY = "hotline-active-theme";

function loadThemes(): CustomTheme[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function saveThemes(themes: CustomTheme[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
}

function applyTheme(colors: Record<string, string>) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(key, value);
    // Also set RGB version for accent
    if (key === "--accent") {
      const r = parseInt(value.slice(1, 3), 16);
      const g = parseInt(value.slice(3, 5), 16);
      const b = parseInt(value.slice(5, 7), 16);
      root.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
    }
  }
}

function clearCustomTheme() {
  const root = document.documentElement;
  for (const c of EDITABLE_COLORS) {
    root.style.removeProperty(c.key);
  }
  root.style.removeProperty("--accent-rgb");
  localStorage.removeItem(ACTIVE_THEME_KEY);
}

const VALID_KEYS = new Set(EDITABLE_COLORS.map((c) => c.key));

function isValidHexColor(v: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(v);
}

function validateThemeJson(json: unknown): Record<string, string> | null {
  if (typeof json !== "object" || json === null || Array.isArray(json)) return null;
  const obj = json as Record<string, unknown>;
  const colors: Record<string, string> = {};
  for (const key of VALID_KEYS) {
    const val = obj[key];
    if (typeof val !== "string" || !isValidHexColor(val)) return null;
    colors[key] = val;
  }
  return colors;
}

interface ThemeEditorProps {
  onClose: () => void;
}

export function ThemeEditor({ onClose }: ThemeEditorProps) {
  const { t } = useTranslation();
  const [themes, setThemes] = useState<CustomTheme[]>(loadThemes);
  const [colors, setColors] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const c of EDITABLE_COLORS) {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(c.key).trim();
      initial[c.key] = computed || c.default;
    }
    return initial;
  });
  const [themeName, setThemeName] = useState("");
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  // Live preview
  useEffect(() => {
    applyTheme(colors);
  }, [colors]);

  const handleColorChange = (key: string, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!themeName.trim()) return;
    const theme: CustomTheme = {
      id: Date.now().toString(36),
      name: themeName.trim(),
      colors: { ...colors },
    };
    const updated = [...themes, theme];
    setThemes(updated);
    saveThemes(updated);
    localStorage.setItem(ACTIVE_THEME_KEY, theme.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLoadTheme = (theme: CustomTheme) => {
    setColors(theme.colors);
    setThemeName(theme.name);
    applyTheme(theme.colors);
    localStorage.setItem(ACTIVE_THEME_KEY, theme.id);
  };

  const handleDeleteTheme = (id: string) => {
    const updated = themes.filter((t) => t.id !== id);
    setThemes(updated);
    saveThemes(updated);
  };

  const handleReset = () => {
    clearCustomTheme();
    const initial: Record<string, string> = {};
    for (const c of EDITABLE_COLORS) {
      initial[c.key] = c.default;
    }
    setColors(initial);
  };

  const handleExport = () => {
    const json = JSON.stringify(colors);
    navigator.clipboard.writeText(json);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleImport = () => {
    setImportError(false);
    setImportSuccess(false);
    try {
      const parsed = JSON.parse(importText);
      const validated = validateThemeJson(parsed);
      if (!validated) {
        setImportError(true);
        setTimeout(() => setImportError(false), 3000);
        return;
      }
      setColors(validated);
      applyTheme(validated);
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
        setShowImport(false);
        setImportText("");
      }, 1500);
    } catch {
      setImportError(true);
      setTimeout(() => setImportError(false), 3000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="theme-editor" onClick={(e) => e.stopPropagation()}>
        <div className="theme-editor-header">
          <Palette size={18} />
          <h3>{t("theme.title")}</h3>
          <button className="theme-editor-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="theme-editor-body">
          <div className="theme-colors">
            {EDITABLE_COLORS.map((c) => (
              <div key={c.key} className="theme-color-row">
                <label className="theme-color-label">{c.label}</label>
                <div className="theme-color-input-wrap">
                  <input
                    type="color"
                    value={colors[c.key] || c.default}
                    onChange={(e) => handleColorChange(c.key, e.target.value)}
                    className="theme-color-picker"
                  />
                  <input
                    type="text"
                    value={colors[c.key] || c.default}
                    onChange={(e) => handleColorChange(c.key, e.target.value)}
                    className="theme-color-hex"
                    maxLength={7}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="theme-save-row">
            <input
              type="text"
              placeholder={t("theme.namePlaceholder")}
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="theme-name-input"
            />
            <button className={`theme-save-btn ${saved ? "saved" : ""}`} onClick={handleSave} disabled={!themeName.trim()}>
              {saved ? <Check size={14} /> : <Save size={14} />}
              <span>{saved ? t("theme.saved") : t("theme.save")}</span>
            </button>
            <button className="theme-reset-btn" onClick={handleReset} title={t("theme.reset")}>
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="theme-share-row">
            <button className={`theme-export-btn ${exported ? "exported" : ""}`} onClick={handleExport}>
              {exported ? <Check size={14} /> : <Download size={14} />}
              <span>{exported ? t("theme.exported") : t("theme.export")}</span>
            </button>
            <button className={`theme-import-btn ${showImport ? "active" : ""}`} onClick={() => { setShowImport(!showImport); setImportError(false); setImportSuccess(false); }}>
              <Upload size={14} />
              <span>{t("theme.import")}</span>
            </button>
          </div>

          {showImport && (
            <div className="theme-import-area">
              <textarea
                className={`theme-import-input ${importError ? "error" : ""} ${importSuccess ? "success" : ""}`}
                placeholder={t("theme.importPlaceholder")}
                value={importText}
                onChange={(e) => { setImportText(e.target.value); setImportError(false); }}
                rows={3}
              />
              {importError && <span className="theme-import-msg error">{t("theme.importError")}</span>}
              {importSuccess && <span className="theme-import-msg success">{t("theme.importSuccess")}</span>}
              <button className="theme-import-apply-btn" onClick={handleImport} disabled={!importText.trim()}>
                <ClipboardPaste size={14} />
                <span>{t("theme.importApply")}</span>
              </button>
            </div>
          )}

          {themes.length > 0 && (
            <div className="theme-list">
              <span className="theme-list-label">{t("theme.saved_themes")}</span>
              {themes.map((theme) => (
                <div key={theme.id} className="theme-list-item">
                  <div className="theme-list-swatches">
                    {Object.values(theme.colors).slice(0, 4).map((c, i) => (
                      <span key={i} className="theme-swatch" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="theme-list-name" onClick={() => handleLoadTheme(theme)}>{theme.name}</span>
                  <button className="theme-list-delete" onClick={() => handleDeleteTheme(theme.id)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <style>{`
          .theme-editor {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 0;
            width: 100%;
            max-width: 400px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .theme-editor-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .theme-editor-header h3 {
            flex: 1;
            font-size: 15px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .theme-editor-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .theme-editor-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .theme-editor-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 400px;
            overflow-y: auto;
          }
          .theme-colors {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .theme-color-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .theme-color-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            min-width: 70px;
          }
          .theme-color-input-wrap {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .theme-color-picker {
            width: 28px;
            height: 28px;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            padding: 0;
            background: none;
          }
          .theme-color-hex {
            width: 72px;
            padding: 4px 8px;
            font-size: 11px;
            font-family: var(--font-mono);
            text-align: center;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
          }
          .theme-save-row {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .theme-name-input {
            flex: 1;
            padding: 8px 12px;
            font-size: 13px;
          }
          .theme-save-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 12px;
            background: var(--accent);
            color: #fff;
            border-radius: var(--radius-sm);
            font-size: 12px;
            font-weight: 600;
            transition: background var(--transition-fast), transform var(--transition-fast);
          }
          .theme-save-btn:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }
          .theme-save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
          .theme-save-btn.saved { background: #10b981; }
          .theme-reset-btn {
            padding: 8px;
            color: var(--text-muted);
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .theme-reset-btn:hover {
            color: var(--danger);
            background: var(--danger-dim);
          }
          .theme-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .theme-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .theme-list-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
            cursor: pointer;
          }
          .theme-list-item:hover {
            background: var(--bg-tertiary);
          }
          .theme-list-swatches {
            display: flex;
            gap: 2px;
          }
          .theme-swatch {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            border: 1px solid var(--border);
          }
          .theme-list-name {
            flex: 1;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-primary);
          }
          .theme-list-delete {
            color: var(--text-muted);
            padding: 3px;
            border-radius: var(--radius-sm);
            opacity: 0;
            transition: opacity var(--transition-fast), color var(--transition-fast);
          }
          .theme-list-item:hover .theme-list-delete { opacity: 1; }
          .theme-list-delete:hover { color: var(--danger); }
          .theme-share-row {
            display: flex;
            gap: 8px;
          }
          .theme-export-btn, .theme-import-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            border-radius: var(--radius-sm);
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border: 1px solid var(--border);
            transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
          }
          .theme-export-btn:hover, .theme-import-btn:hover {
            background: var(--accent);
            color: #fff;
            border-color: var(--accent);
          }
          .theme-export-btn.exported {
            background: #10b981;
            color: #fff;
            border-color: #10b981;
          }
          .theme-import-btn.active {
            background: var(--accent);
            color: #fff;
            border-color: var(--accent);
          }
          .theme-import-area {
            display: flex;
            flex-direction: column;
            gap: 8px;
            animation: fadeInScale 0.15s ease;
          }
          .theme-import-input {
            width: 100%;
            padding: 8px 12px;
            font-size: 11px;
            font-family: var(--font-mono);
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            resize: vertical;
            min-height: 60px;
            transition: border-color var(--transition-fast);
          }
          .theme-import-input:focus {
            outline: none;
            border-color: var(--accent);
          }
          .theme-import-input.error {
            border-color: var(--danger);
          }
          .theme-import-input.success {
            border-color: #10b981;
          }
          .theme-import-msg {
            font-size: 11px;
            font-weight: 500;
          }
          .theme-import-msg.error {
            color: var(--danger);
          }
          .theme-import-msg.success {
            color: #10b981;
          }
          .theme-import-apply-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            border-radius: var(--radius-sm);
            background: var(--accent);
            color: #fff;
            transition: background var(--transition-fast), transform var(--transition-fast);
          }
          .theme-import-apply-btn:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }
          .theme-import-apply-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
}

// Load saved theme on app start
export function loadSavedTheme() {
  const activeId = localStorage.getItem(ACTIVE_THEME_KEY);
  if (!activeId) return;
  const themes = loadThemes();
  const theme = themes.find((t) => t.id === activeId);
  if (theme) applyTheme(theme.colors);
}
