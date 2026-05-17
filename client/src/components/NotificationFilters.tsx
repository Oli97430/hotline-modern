import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Bell, BellOff, Filter, Hash, AtSign, MessageSquare } from "lucide-react";

export interface NotifFilter {
  mutedChannels: string[];
  mutedUsers: string[];
  onlyMentions: boolean;
  quietHoursEnabled: boolean;
  quietStart: string; // "22:00"
  quietEnd: string;   // "08:00"
  keywords: string[];
}

const STORAGE_KEY = "hotline-notif-filters";

export function loadNotifFilters(): NotifFilter {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    mutedChannels: [],
    mutedUsers: [],
    onlyMentions: false,
    quietHoursEnabled: false,
    quietStart: "22:00",
    quietEnd: "08:00",
    keywords: [],
  };
}

export function saveNotifFilters(filters: NotifFilter) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
}

export function shouldNotify(filter: NotifFilter, channel: string, userId: string, content: string, myNickname: string): boolean {
  // Quiet hours check
  if (filter.quietHoursEnabled) {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const current = h * 60 + m;
    const [sh, sm] = filter.quietStart.split(":").map(Number);
    const [eh, em] = filter.quietEnd.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    if (start > end) {
      // Overnight: 22:00 to 08:00
      if (current >= start || current < end) return false;
    } else {
      if (current >= start && current < end) return false;
    }
  }

  if (filter.mutedChannels.includes(channel)) return false;
  if (filter.mutedUsers.includes(userId)) return false;
  if (filter.onlyMentions) {
    const mentioned = content.toLowerCase().includes(`@${myNickname.toLowerCase()}`);
    const hasKeyword = filter.keywords.some((k) => content.toLowerCase().includes(k.toLowerCase()));
    return mentioned || hasKeyword;
  }
  return true;
}

interface NotificationFiltersProps {
  filters: NotifFilter;
  channels: string[];
  users: { userId: string; nickname: string }[];
  onChange: (filters: NotifFilter) => void;
  onClose: () => void;
}

export function NotificationFilters({ filters, channels, users, onChange, onClose }: NotificationFiltersProps) {
  const { t } = useTranslation();
  const [local, setLocal] = useState<NotifFilter>(filters);
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    onChange(local);
    saveNotifFilters(local);
  }, [local, onChange]);

  const toggleMutedChannel = (ch: string) => {
    setLocal((prev) => ({
      ...prev,
      mutedChannels: prev.mutedChannels.includes(ch)
        ? prev.mutedChannels.filter((c) => c !== ch)
        : [...prev.mutedChannels, ch],
    }));
  };

  const toggleMutedUser = (uid: string) => {
    setLocal((prev) => ({
      ...prev,
      mutedUsers: prev.mutedUsers.includes(uid)
        ? prev.mutedUsers.filter((u) => u !== uid)
        : [...prev.mutedUsers, uid],
    }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    setLocal((prev) => ({
      ...prev,
      keywords: [...prev.keywords, keywordInput.trim()],
    }));
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => {
    setLocal((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== kw),
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="notif-filters" onClick={(e) => e.stopPropagation()}>
        <div className="notif-filters-header">
          <Filter size={16} />
          <h3>{t("notifFilters.title")}</h3>
          <button className="notif-filters-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="notif-filters-body">
          {/* Only mentions mode */}
          <div className="nf-toggle-row">
            <div className="nf-toggle-info">
              <AtSign size={14} />
              <div>
                <span className="nf-toggle-label">{t("notifFilters.onlyMentions")}</span>
                <span className="nf-toggle-desc">{t("notifFilters.onlyMentionsDesc")}</span>
              </div>
            </div>
            <button
              className={`nf-switch ${local.onlyMentions ? "on" : ""}`}
              onClick={() => setLocal((prev) => ({ ...prev, onlyMentions: !prev.onlyMentions }))}
            >
              <span className="nf-switch-knob" />
            </button>
          </div>

          {/* Quiet hours */}
          <div className="nf-toggle-row">
            <div className="nf-toggle-info">
              <BellOff size={14} />
              <div>
                <span className="nf-toggle-label">{t("notifFilters.quietHours")}</span>
                <span className="nf-toggle-desc">{t("notifFilters.quietHoursDesc")}</span>
              </div>
            </div>
            <button
              className={`nf-switch ${local.quietHoursEnabled ? "on" : ""}`}
              onClick={() => setLocal((prev) => ({ ...prev, quietHoursEnabled: !prev.quietHoursEnabled }))}
            >
              <span className="nf-switch-knob" />
            </button>
          </div>

          {local.quietHoursEnabled && (
            <div className="nf-quiet-times">
              <input
                type="time"
                value={local.quietStart}
                onChange={(e) => setLocal((prev) => ({ ...prev, quietStart: e.target.value }))}
                className="nf-time-input"
              />
              <span className="nf-time-sep">→</span>
              <input
                type="time"
                value={local.quietEnd}
                onChange={(e) => setLocal((prev) => ({ ...prev, quietEnd: e.target.value }))}
                className="nf-time-input"
              />
            </div>
          )}

          {/* Keywords */}
          <div className="nf-section">
            <span className="nf-section-title">{t("notifFilters.keywords")}</span>
            <div className="nf-keyword-row">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addKeyword(); }}
                placeholder={t("notifFilters.keywordPlaceholder")}
                className="nf-keyword-input"
              />
              <button className="nf-keyword-add" onClick={addKeyword}>+</button>
            </div>
            {local.keywords.length > 0 && (
              <div className="nf-keyword-list">
                {local.keywords.map((kw) => (
                  <span key={kw} className="nf-keyword-tag" onClick={() => removeKeyword(kw)}>
                    {kw} <X size={10} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Muted channels */}
          <div className="nf-section">
            <span className="nf-section-title">
              <Hash size={12} /> {t("notifFilters.mutedChannels")}
            </span>
            <div className="nf-chip-list">
              {channels.map((ch) => (
                <button
                  key={ch}
                  className={`nf-chip ${local.mutedChannels.includes(ch) ? "muted" : ""}`}
                  onClick={() => toggleMutedChannel(ch)}
                >
                  {local.mutedChannels.includes(ch) ? <BellOff size={10} /> : <Bell size={10} />}
                  <span>{ch}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Muted users */}
          <div className="nf-section">
            <span className="nf-section-title">
              <MessageSquare size={12} /> {t("notifFilters.mutedUsers")}
            </span>
            <div className="nf-chip-list">
              {users.slice(0, 20).map((u) => (
                <button
                  key={u.userId}
                  className={`nf-chip ${local.mutedUsers.includes(u.userId) ? "muted" : ""}`}
                  onClick={() => toggleMutedUser(u.userId)}
                >
                  {local.mutedUsers.includes(u.userId) ? <BellOff size={10} /> : <Bell size={10} />}
                  <span>{u.nickname}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .notif-filters {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 440px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .notif-filters-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .notif-filters-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .notif-filters-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .notif-filters-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .notif-filters-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 450px;
            overflow-y: auto;
          }
          .nf-toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 8px 0;
          }
          .nf-toggle-info {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: var(--text-muted);
          }
          .nf-toggle-info > div {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .nf-toggle-label {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-primary);
          }
          .nf-toggle-desc {
            font-size: 11px;
            color: var(--text-muted);
          }
          .nf-switch {
            width: 36px;
            height: 20px;
            border-radius: 10px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            position: relative;
            transition: background var(--transition-fast), border-color var(--transition-fast);
            flex-shrink: 0;
          }
          .nf-switch.on {
            background: var(--accent);
            border-color: var(--accent);
          }
          .nf-switch-knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #fff;
            transition: transform var(--transition-fast);
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }
          .nf-switch.on .nf-switch-knob {
            transform: translateX(16px);
          }
          .nf-quiet-times {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 0 0 24px;
          }
          .nf-time-input {
            padding: 4px 8px;
            font-size: 12px;
            width: 100px;
          }
          .nf-time-sep {
            color: var(--text-muted);
            font-size: 12px;
          }
          .nf-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .nf-section-title {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .nf-keyword-row {
            display: flex;
            gap: 6px;
          }
          .nf-keyword-input {
            flex: 1;
            padding: 6px 10px;
            font-size: 12px;
          }
          .nf-keyword-add {
            padding: 6px 12px;
            background: var(--accent);
            color: #fff;
            border-radius: var(--radius-sm);
            font-weight: 700;
            font-size: 14px;
          }
          .nf-keyword-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .nf-keyword-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 500;
            color: var(--accent);
            background: var(--accent-dim);
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: background var(--transition-fast);
          }
          .nf-keyword-tag:hover {
            background: rgba(var(--accent-rgb), 0.15);
          }
          .nf-chip-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .nf-chip {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 500;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            transition: all var(--transition-fast);
          }
          .nf-chip:hover {
            border-color: var(--accent);
          }
          .nf-chip.muted {
            color: var(--danger);
            border-color: var(--danger);
            background: var(--danger-dim);
          }
        `}</style>
      </div>
    </div>
  );
}
