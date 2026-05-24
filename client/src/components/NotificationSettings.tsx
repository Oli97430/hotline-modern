import { Bell, BellOff, Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface NotifPrefs {
  soundEnabled: boolean;
  desktopEnabled: boolean;
}

const STORAGE_KEY = "hotline_notif_prefs";

export function loadNotifPrefs(): NotifPrefs {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { soundEnabled: true, desktopEnabled: true };
}

export function saveNotifPrefs(prefs: NotifPrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

interface NotificationSettingsProps {
  prefs: NotifPrefs;
  onChange: (prefs: NotifPrefs) => void;
}

export function NotificationSettings({ prefs, onChange }: NotificationSettingsProps) {
  const { t } = useTranslation();

  const toggle = (key: keyof NotifPrefs) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    onChange(updated);
    saveNotifPrefs(updated);
  };

  return (
    <div className="notif-settings">
      <button type="button"
        className={`notif-toggle ${prefs.soundEnabled ? "active" : "muted"}`}
        onClick={() => toggle("soundEnabled")}
        title={prefs.soundEnabled ? t("notif.muteSound") : t("notif.unmuteSound")}
      >
        {prefs.soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>
      <button type="button"
        className={`notif-toggle ${prefs.desktopEnabled ? "active" : "muted"}`}
        onClick={() => toggle("desktopEnabled")}
        title={prefs.desktopEnabled ? t("notif.muteDesktop") : t("notif.unmuteDesktop")}
      >
        {prefs.desktopEnabled ? <Bell size={15} /> : <BellOff size={15} />}
      </button>

      <style>{`
        .notif-settings {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .notif-toggle {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .notif-toggle:hover {
          background: var(--bg-tertiary);
          transform: scale(1.1);
        }
        .notif-toggle.active {
          color: var(--text-secondary);
        }
        .notif-toggle.active:hover {
          color: var(--accent);
        }
        .notif-toggle.muted {
          color: var(--danger);
          opacity: 0.6;
        }
        .notif-toggle.muted:hover {
          opacity: 1;
          background: var(--danger-dim);
        }
      `}</style>
    </div>
  );
}
