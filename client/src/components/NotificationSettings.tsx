import { useTranslation } from "react-i18next";
import { Bell, BellOff, Volume2, VolumeX } from "lucide-react";

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
      <button
        className={`notif-toggle ${prefs.soundEnabled ? "" : "muted"}`}
        onClick={() => toggle("soundEnabled")}
        title={prefs.soundEnabled ? t("notif.muteSound") : t("notif.unmuteSound")}
      >
        {prefs.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      <button
        className={`notif-toggle ${prefs.desktopEnabled ? "" : "muted"}`}
        onClick={() => toggle("desktopEnabled")}
        title={prefs.desktopEnabled ? t("notif.muteDesktop") : t("notif.unmuteDesktop")}
      >
        {prefs.desktopEnabled ? <Bell size={16} /> : <BellOff size={16} />}
      </button>

      <style>{`
        .notif-settings {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .notif-toggle {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .notif-toggle:hover {
          color: var(--accent);
          background: var(--bg-tertiary);
        }
        .notif-toggle.muted {
          color: var(--danger);
          opacity: 0.7;
        }
        .notif-toggle.muted:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
