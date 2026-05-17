import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Sun, Moon } from "lucide-react";

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
      <button className="theme-toggle" onClick={toggleTheme} title={t("settings.theme")}>
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
          opacity: 0.6;
        }
        .lang-selector select {
          font-size: 11px;
          padding: 2px 4px;
          font-weight: 500;
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .theme-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
      `}</style>
    </div>
  );
}
