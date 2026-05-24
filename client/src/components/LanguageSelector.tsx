import { Globe, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
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
      <button type="button" className="theme-toggle" onClick={toggleTheme} title={t("settings.theme")}>
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </button>
      <Globe size={12} className="lang-icon" />
      <select value={i18n.language.split("-")[0]} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

      <style>{`
        .lang-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .lang-icon {
          opacity: 0.5;
          flex-shrink: 0;
        }
        .lang-selector select {
          font-size: 11px;
          padding: 2px 4px;
          font-weight: 500;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .lang-selector select:hover {
          color: var(--text-primary);
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-normal), background var(--transition-normal), transform var(--transition-fast);
        }
        .theme-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
          transform: rotate(15deg);
        }
      `}</style>
    </div>
  );
}
