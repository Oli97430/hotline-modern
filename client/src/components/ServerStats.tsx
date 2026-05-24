import { Activity, Clock, Cpu, HardDrive, Hash, MessageCircle, TrendingUp, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChatMessage } from "../hooks/useWebSocket";

interface HealthData {
  status: string;
  uptime: number;
  users: number;
  channels: number;
  goroutines: number;
  memoryMB: number;
  version: string;
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

interface ServerStatsProps {
  messages: ChatMessage[];
  userCount: number;
  channelCount: number;
  serverName: string;
  serverAddress?: string;
  onClose: () => void;
}

export function ServerStats({
  messages,
  userCount,
  channelCount,
  serverName,
  serverAddress,
  onClose,
}: ServerStatsProps) {
  const { t } = useTranslation();
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    if (!serverAddress) return;
    const baseUrl = serverAddress.replace(/^wss?:\/\//, "").replace(/\/ws$/, "");
    const proto = serverAddress.startsWith("wss") ? "https" : "http";
    const url = `${proto}://${baseUrl}/health`;
    let cancelled = false;
    const fetchHealth = () => {
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) setHealth(data);
        })
        .catch(() => {});
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [serverAddress]);

  const stats = useMemo(() => {
    const now = Date.now();
    const lastHour = messages.filter((m) => now - m.timestamp < 3600000).length;
    const last24h = messages.filter((m) => now - m.timestamp < 86400000).length;

    // Top contributors
    const userMsgCounts: Record<string, { nickname: string; count: number }> = {};
    for (const msg of messages) {
      if (!userMsgCounts[msg.userId]) {
        userMsgCounts[msg.userId] = { nickname: msg.nickname, count: 0 };
      }
      userMsgCounts[msg.userId].count++;
    }
    const topUsers = Object.values(userMsgCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Active channels
    const channelCounts: Record<string, number> = {};
    for (const msg of messages) {
      channelCounts[msg.channel] = (channelCounts[msg.channel] || 0) + 1;
    }
    const topChannels = Object.entries(channelCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Activity by hour (last 24h)
    const hourly = new Array(24).fill(0);
    for (const msg of messages) {
      if (now - msg.timestamp < 86400000) {
        const h = new Date(msg.timestamp).getHours();
        hourly[h]++;
      }
    }

    return { total: messages.length, lastHour, last24h, topUsers, topChannels, hourly };
  }, [messages]);

  const maxHourly = Math.max(...stats.hourly, 1);

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={(e) => e.key === "Escape" && onClose()} role="dialog" tabIndex={-1}>
      <div className="stats-panel" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="presentation">
        <div className="stats-header">
          <TrendingUp size={18} />
          <h3>
            {serverName} — {t("stats.title")}
          </h3>
          <button type="button" className="stats-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="stats-body">
          <div className="stats-cards">
            <div className="stats-card">
              <MessageCircle size={16} />
              <div className="stats-card-info">
                <span className="stats-card-value">{stats.total}</span>
                <span className="stats-card-label">{t("stats.totalMessages")}</span>
              </div>
            </div>
            <div className="stats-card">
              <Users size={16} />
              <div className="stats-card-info">
                <span className="stats-card-value">{userCount}</span>
                <span className="stats-card-label">{t("stats.onlineUsers")}</span>
              </div>
            </div>
            <div className="stats-card">
              <Hash size={16} />
              <div className="stats-card-info">
                <span className="stats-card-value">{channelCount}</span>
                <span className="stats-card-label">{t("stats.channels")}</span>
              </div>
            </div>
            <div className="stats-card">
              <Clock size={16} />
              <div className="stats-card-info">
                <span className="stats-card-value">{stats.lastHour}</span>
                <span className="stats-card-label">{t("stats.lastHour")}</span>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <span className="stats-section-title">{t("stats.activity24h")}</span>
            <div className="stats-chart">
              {stats.hourly.map((count, i) => (
                <div key={i} className="stats-bar-wrap" title={`${i}:00 — ${count} msgs`}>
                  <div className="stats-bar" style={{ height: `${(count / maxHourly) * 100}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <span className="stats-section-title">{t("stats.topContributors")}</span>
            <ul className="stats-ranking">
              {stats.topUsers.map((u, i) => (
                <li key={i}>
                  <span className="stats-rank">#{i + 1}</span>
                  <span className="stats-rank-name">{u.nickname}</span>
                  <span className="stats-rank-count">{u.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="stats-section">
            <span className="stats-section-title">{t("stats.topChannels")}</span>
            <ul className="stats-ranking">
              {stats.topChannels.map(([ch, count], i) => (
                <li key={i}>
                  <span className="stats-rank">#{i + 1}</span>
                  <span className="stats-rank-name">#{ch}</span>
                  <span className="stats-rank-count">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          {health && (
            <div className="stats-section">
              <span className="stats-section-title">{t("health.title")}</span>
              <div className="stats-health-grid">
                <div className="stats-health-item">
                  <Clock size={14} />
                  <span className="stats-health-label">{t("health.uptime")}</span>
                  <span className="stats-health-value">{formatUptime(health.uptime)}</span>
                </div>
                <div className="stats-health-item">
                  <HardDrive size={14} />
                  <span className="stats-health-label">{t("health.memory")}</span>
                  <span className="stats-health-value">{health.memoryMB.toFixed(1)} MB</span>
                </div>
                <div className="stats-health-item">
                  <Cpu size={14} />
                  <span className="stats-health-label">{t("health.goroutines")}</span>
                  <span className="stats-health-value">{health.goroutines}</span>
                </div>
                <div className="stats-health-item">
                  <Activity size={14} />
                  <span className="stats-health-label">{t("health.version")}</span>
                  <span className="stats-health-value">v{health.version}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .stats-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 480px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .stats-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .stats-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .stats-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .stats-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .stats-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 450px;
            overflow-y: auto;
          }
          .stats-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .stats-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: var(--bg-tertiary);
            border-radius: var(--radius);
            border: 1px solid var(--border-subtle);
            color: var(--accent);
          }
          .stats-card-info {
            display: flex;
            flex-direction: column;
          }
          .stats-card-value {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.2;
          }
          .stats-card-label {
            font-size: 10px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.3px;
            font-weight: 500;
          }
          .stats-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .stats-section-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .stats-chart {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 60px;
            padding: 4px 0;
          }
          .stats-bar-wrap {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-end;
          }
          .stats-bar {
            width: 100%;
            background: var(--accent);
            border-radius: 2px 2px 0 0;
            min-height: 2px;
            opacity: 0.7;
            transition: opacity var(--transition-fast);
          }
          .stats-bar-wrap:hover .stats-bar {
            opacity: 1;
          }
          .stats-ranking {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .stats-ranking li {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 8px;
            border-radius: var(--radius-sm);
            font-size: 12px;
          }
          .stats-ranking li:hover {
            background: var(--bg-tertiary);
          }
          .stats-rank {
            font-weight: 700;
            color: var(--text-muted);
            width: 20px;
            font-size: 10px;
          }
          .stats-rank-name {
            flex: 1;
            font-weight: 500;
            color: var(--text-primary);
          }
          .stats-rank-count {
            font-size: 11px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
            background: var(--bg-tertiary);
            padding: 1px 6px;
            border-radius: 8px;
          }
          .stats-health-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .stats-health-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 10px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
            font-size: 12px;
            color: var(--accent);
          }
          .stats-health-label {
            color: var(--text-muted);
            font-size: 10px;
            font-weight: 500;
          }
          .stats-health-value {
            margin-left: auto;
            color: var(--text-primary);
            font-weight: 600;
            font-variant-numeric: tabular-nums;
          }
        `}</style>
      </div>
    </div>
  );
}
