import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Sun, Moon } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem("hotline-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hotline-theme", theme);
  }, [theme]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="lang-selector">
      <button className="theme-toggle" onClick={toggleTheme} title={t("settings.theme")}>
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </button>
      <Globe size={14} />
      <select value={i18n.language.split("-")[0]} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>

      <style>{`
        .lang-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-muted);
        }
        .lang-selector label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lang-selector select {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-size: 12px;
          padding: 2px 6px;
          cursor: pointer;
          outline: none;
        }
        .lang-selector select:focus {
          border-color: var(--accent);
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          color: var(--text-muted);
          transition: color 0.2s, background 0.2s;
        }
        .theme-toggle:hover {
          color: var(--accent);
          background: var(--bg-tertiary);
        }
      `}</style>
    </div>
  );
}
