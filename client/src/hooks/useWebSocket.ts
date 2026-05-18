import { useCallback, useEffect, useRef, useState } from "react";
import { decryptDM, encryptDM, getBoxPublicKeyHex, getPublicKeyHex, type Identity, signMessage } from "../lib/crypto";
import {
  type AuthNoncePayload,
  type AuthOkPayload,
  type ChannelListPayload,
  type ChatMessagePayload,
  createMessage,
  type ErrorPayload,
  type UserJoinedPayload,
  type UserLeftPayload,
  type UserListPayload,
  type WsMessage,
} from "../lib/protocol";
import { LAST_SERVER_IP_KEY } from "./useTrackerServers";

export type ConnectionStatus = "disconnected" | "connecting" | "authenticating" | "connected" | "reconnecting";

export interface ChatMessage {
  id: string;
  channel: string;
  userId: string;
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
  edited?: boolean;
  reactions?: MessageReaction[];
  replyTo?: string;
  msgType?: string;
  system?: boolean;
}

export interface DMMessage {
  id: string;
  from: string;
  to: string;
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
}

export interface TypingUser {
  userId: string;
  nickname: string;
  channel: string;
  targetId: string;
  expiry: number;
}

export interface ServerInfo {
  name: string;
  motd: string;
  userId: string;
  role: string;
  agreement: string;
}

interface UseWebSocketOptions {
  identity: Identity;
  onError?: (message: string) => void;
}

export interface SearchResult {
  id: string;
  channel: string;
  userId: string;
  nickname: string;
  content: string;
  timestamp: number;
}

export interface MessageReaction {
  emoji: string;
  users: string[];
}

export interface PinnedMessage {
  id: string;
  channel: string;
  userId: string;
  nickname: string;
  content: string;
  timestamp: number;
}

export interface ChannelMember {
  userId: string;
  nickname: string;
  role: string;
  status: string;
}

export interface AdminBan {
  publicKey: string;
  nickname: string;
  bannedBy: string;
  reason: string;
  bannedAt: number;
}

export interface AdminMute {
  publicKey: string;
  mutedBy: string;
  reason: string;
  mutedAt: number;
  expiresAt?: number;
}

export interface AdminUser {
  publicKey: string;
  nickname: string;
  role: string;
  online: boolean;
  lastSeen: number;
}

export interface ServerCustomEmoji {
  name: string;
  url: string;
}

export interface AuditEntry {
  id: number;
  action: string;
  actorKey: string;
  actorName: string;
  targetKey: string;
  targetName: string;
  details: string;
  createdAt: string;
}

export interface InviteData {
  code: string;
  createdBy: string;
  maxUses: number;
  uses: number;
  expiresAt?: number;
  createdAt: number;
}

export interface UserProfile {
  userId: string;
  bio: string;
  customStatus: string;
  pronouns: string;
  timezone: string;
  nickname?: string;
  role?: string;
  status?: string;
  online?: boolean;
}

export interface VoiceStatePayload {
  channel: string;
  participants: { userId: string; nickname: string; muted: boolean; deafened: boolean }[];
}

export interface UseWebSocketReturn {
  status: ConnectionStatus;
  serverInfo: ServerInfo | null;
  messages: ChatMessage[];
  dmMessages: DMMessage[];
  typingUsers: TypingUser[];
  channels: { name: string; topic: string; userCount: number; hasPassword: boolean }[];
  users: {
    userId: string;
    nickname: string;
    role: string;
    status: string;
    boxPublicKey?: string;
    connectedAt?: number;
    customStatus?: string;
  }[];
  searchResults: SearchResult[];
  pinnedMessages: PinnedMessage[];
  channelMembers: ChannelMember[];
  readReceipts: Record<string, string[]>;
  reconnectIn: number;
  historyLoading: boolean;
  hasMoreHistory: boolean;
  adminBans: AdminBan[];
  adminMutes: AdminMute[];
  adminUsers: AdminUser[];
  customEmojis: ServerCustomEmoji[];
  invites: InviteData[];
  auditLog: { entries: AuditEntry[]; total: number };
  profileCache: Record<string, UserProfile>;
  voiceState: VoiceStatePayload | null;
  wsRef: React.RefObject<WebSocket | null>;
  connect: (address: string, nickname: string) => void;
  disconnect: () => void;
  sendChat: (channel: string, content: string, msgType?: string) => void;
  sendDM: (targetId: string, content: string) => void;
  sendTyping: (channel: string, targetId?: string) => void;
  joinChannel: (channel: string, password?: string) => void;
  leaveChannel: (channel: string) => void;
  createChannel: (name: string, topic: string, password?: string) => void;
  deleteChannel: (name: string) => void;
  requestUserList: () => void;
  requestChannelList: () => void;
  kickUser: (userId: string) => void;
  banUser: (userId: string) => void;
  setUserRole: (userId: string, role: string) => void;
  setTopic: (channel: string, topic: string) => void;
  search: (query: string, channel?: string) => void;
  clearSearch: () => void;
  editMessage: (messageId: string, content: string) => void;
  deleteMessage: (messageId: string) => void;
  addReaction: (messageId: string, emoji: string) => void;
  removeReaction: (messageId: string, emoji: string) => void;
  pinMessage: (messageId: string, channel: string) => void;
  unpinMessage: (messageId: string, channel: string) => void;
  requestPins: (channel: string) => void;
  changeNickname: (nickname: string) => void;
  sendChatWithReply: (channel: string, content: string, replyTo: string, msgType?: string) => void;
  updateServerSettings: (serverName: string, motd: string) => void;
  requestBanList: () => void;
  unbanUser: (publicKey: string) => void;
  setStatus: (status: string) => void;
  requestChannelMembers: (channel: string) => void;
  loadHistory: (channel: string, beforeTimestamp: number) => void;
  sendReadReceipt: (channel: string, messageId: string) => void;
  muteUser: (publicKey: string, reason: string, duration: number) => void;
  unmuteUser: (publicKey: string) => void;
  requestMuteList: () => void;
  requestAdminUserList: () => void;
  renameChannel: (oldName: string, newName: string) => void;
  requestCustomEmojis: () => void;
  addCustomEmoji: (name: string, filename: string) => void;
  removeCustomEmoji: (name: string) => void;
  createInvite: (maxUses: number, expireHours: number) => void;
  deleteInvite: (code: string) => void;
  requestInviteList: () => void;
  requestProfile: (userId: string) => void;
  updateProfile: (bio: string, customStatus: string, pronouns: string, timezone: string) => void;
  requestAuditLog: (limit?: number, offset?: number) => void;
}

/** Append a message to an array with dedup, conditional sort, and cap. */
function insertAndCap<T extends { id: string; timestamp: number }>(prev: T[], newMsg: T, cap: number): T[] {
  if (prev.some((m) => m.id === newMsg.id)) return prev;
  const result = prev.length >= cap ? [...prev.slice(1), newMsg] : [...prev, newMsg];
  if (prev.length > 0 && prev[prev.length - 1].timestamp > newMsg.timestamp) {
    result.sort((a, b) => a.timestamp - b.timestamp);
  }
  return result;
}

export function useWebSocket({ identity, onError }: UseWebSocketOptions): UseWebSocketReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const reconnectCountRef = useRef(0);
  const addressRef = useRef<string>("");
  const nicknameRef = useRef<string>("");

  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [channels, setChannels] = useState<{ name: string; topic: string; userCount: number; hasPassword: boolean }[]>(
    [],
  );
  const [users, setUsers] = useState<
    { userId: string; nickname: string; role: string; status: string; boxPublicKey?: string; connectedAt?: number; customStatus?: string }[]
  >([]);
  const usersRef = useRef(users);
  usersRef.current = users;
  const [profileCache, setProfileCache] = useState<Record<string, UserProfile>>({});
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessage[]>([]);
  const [channelMembers, setChannelMembers] = useState<ChannelMember[]>([]);
  const [readReceipts, setReadReceipts] = useState<Record<string, string[]>>({});
  const [reconnectIn, setReconnectIn] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);
  const [adminBans, setAdminBans] = useState<AdminBan[]>([]);
  const [adminMutes, setAdminMutes] = useState<AdminMute[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [customEmojis, setCustomEmojis] = useState<ServerCustomEmoji[]>([]);
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [auditLog, setAuditLog] = useState<{ entries: AuditEntry[]; total: number }>({ entries: [], total: 0 });
  const [voiceState, setVoiceState] = useState<VoiceStatePayload | null>(null);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const msg: WsMessage = JSON.parse(event.data);

      switch (msg.type) {
        case "auth.nonce": {
          const { nonce } = msg.payload as AuthNoncePayload;
          setStatus("authenticating");
          const signature = signMessage(nonce, identity.secretKey);
          const authMsg = createMessage("auth", {
            publicKey: getPublicKeyHex(identity),
            boxPublicKey: getBoxPublicKeyHex(identity),
            signature,
            nonce,
            nickname: nicknameRef.current,
          });
          wsRef.current?.send(JSON.stringify(authMsg));
          break;
        }
        case "auth.ok": {
          const payload = msg.payload as AuthOkPayload;
          setStatus("connected");
          setServerInfo({
            name: payload.serverName,
            motd: payload.motd,
            userId: payload.userId,
            role: payload.role,
            agreement: payload.agreement || "",
          });
          const clMsg = createMessage("channel.list", {});
          wsRef.current?.send(JSON.stringify(clMsg));
          const ulMsg = createMessage("user.list", {});
          wsRef.current?.send(JSON.stringify(ulMsg));
          break;
        }
        case "auth.error": {
          const { reason } = msg.payload as { reason: string };
          onError?.(reason);
          break;
        }
        case "chat.message": {
          const payload = msg.payload as ChatMessagePayload & { replyTo?: string; msgType?: string };
          setMessages((prev) =>
            insertAndCap(
              prev,
              {
                id: msg.id,
                channel: payload.channel,
                userId: payload.userId,
                nickname: payload.nickname,
                content: payload.content,
                role: payload.role,
                timestamp: msg.timestamp,
                replyTo: payload.replyTo,
                msgType: payload.msgType,
              },
              2000,
            ),
          );
          break;
        }
        case "channel.list": {
          const { channels: ch } = msg.payload as ChannelListPayload;
          setChannels(ch || []);
          break;
        }
        case "user.list": {
          const { users: u } = msg.payload as UserListPayload;
          setUsers(u || []);
          break;
        }
        case "user.joined": {
          const payload = msg.payload as UserJoinedPayload;
          setUsers((prev) => {
            const filtered = prev.filter((u) => u.userId !== payload.userId);
            return [
              ...filtered,
              { ...payload, status: "online", boxPublicKey: payload.boxPublicKey, connectedAt: payload.connectedAt, customStatus: payload.customStatus },
            ];
          });
          setMessages((prev) =>
            insertAndCap(
              prev,
              {
                id: msg.id,
                channel: "__system__",
                userId: payload.userId,
                nickname: payload.nickname,
                content: "joined",
                role: payload.role,
                timestamp: msg.timestamp,
                system: true,
              },
              2000,
            ),
          );
          break;
        }
        case "user.left": {
          const payload = msg.payload as UserLeftPayload;
          setUsers((prev) => prev.filter((u) => u.userId !== payload.userId));
          setMessages((prev) =>
            insertAndCap(
              prev,
              {
                id: msg.id,
                channel: "__system__",
                userId: payload.userId,
                nickname: payload.nickname,
                content: "left",
                role: "",
                timestamp: msg.timestamp,
                system: true,
              },
              2000,
            ),
          );
          break;
        }
        case "user.role_changed": {
          const { userId, role } = msg.payload as { userId: string; role: string };
          setUsers((prev) => prev.map((u) => (u.userId === userId ? { ...u, role } : u)));
          break;
        }
        case "dm.message": {
          const payload = msg.payload as {
            from: string;
            to: string;
            nickname: string;
            content: string;
            role: string;
            encrypted?: boolean;
            ciphertext?: string;
            nonce?: string;
            senderBoxPublicKey?: string;
          };
          let content = payload.content;
          if (payload.encrypted && payload.ciphertext && payload.nonce) {
            // Determine peer's box public key for decryption
            const peerId = payload.from === getPublicKeyHex(identity) ? payload.to : payload.from;
            // Use senderBoxPublicKey from payload if available, otherwise look up from users list
            const peerBoxPK =
              payload.senderBoxPublicKey || usersRef.current.find((u) => u.userId === peerId)?.boxPublicKey;
            if (peerBoxPK) {
              const decrypted = decryptDM(payload.ciphertext, payload.nonce, peerBoxPK, identity);
              content = decrypted ?? "[Decryption failed]";
            } else {
              content = "[Encrypted - missing peer key]";
            }
          }
          setDmMessages((prev) =>
            insertAndCap(
              prev,
              {
                id: msg.id,
                from: payload.from,
                to: payload.to,
                nickname: payload.nickname,
                content,
                role: payload.role,
                timestamp: msg.timestamp,
              },
              1000,
            ),
          );
          break;
        }
        case "typing": {
          const payload = msg.payload as { userId: string; nickname: string; channel: string; targetId: string };
          setTypingUsers((prev) => {
            const filtered = prev.filter((t) => t.userId !== payload.userId || t.channel !== payload.channel);
            return [...filtered, { ...payload, expiry: Date.now() + 3000 }];
          });
          break;
        }
        case "chat.search_results": {
          const payload = msg.payload as { query: string; results: SearchResult[] };
          setSearchResults(payload.results || []);
          break;
        }
        case "chat.edited": {
          const payload = msg.payload as { messageId: string; channel: string; content: string; userId: string };
          setMessages((prev) =>
            prev.map((m) => (m.id === payload.messageId ? { ...m, content: payload.content, edited: true } : m)),
          );
          break;
        }
        case "chat.deleted": {
          const payload = msg.payload as { messageId: string; channel: string };
          setMessages((prev) => prev.filter((m) => m.id !== payload.messageId));
          break;
        }
        case "reaction.updated": {
          const payload = msg.payload as { messageId: string; emoji: string; userId: string; action: string };
          setMessages((prev) =>
            prev.map((m) => {
              if (m.id !== payload.messageId) return m;
              const reactions = [...(m.reactions || [])];
              const idx = reactions.findIndex((r) => r.emoji === payload.emoji);
              if (payload.action === "add") {
                if (idx >= 0) {
                  if (!reactions[idx].users.includes(payload.userId)) {
                    reactions[idx] = { ...reactions[idx], users: [...reactions[idx].users, payload.userId] };
                  }
                } else {
                  reactions.push({ emoji: payload.emoji, users: [payload.userId] });
                }
              } else {
                if (idx >= 0) {
                  const users = reactions[idx].users.filter((u) => u !== payload.userId);
                  if (users.length === 0) {
                    reactions.splice(idx, 1);
                  } else {
                    reactions[idx] = { ...reactions[idx], users };
                  }
                }
              }
              return { ...m, reactions };
            }),
          );
          break;
        }
        case "pin.added": {
          // Just trigger a refresh if needed
          break;
        }
        case "pin.removed": {
          setPinnedMessages((prev) => prev.filter((p) => p.id !== (msg.payload as { messageId: string }).messageId));
          break;
        }
        case "pin.list": {
          const payload = msg.payload as { channel: string; messages: PinnedMessage[] };
          setPinnedMessages(payload.messages || []);
          break;
        }
        case "user.nick_changed": {
          const payload = msg.payload as { userId: string; oldNick: string; newNick: string };
          setUsers((prev) => prev.map((u) => (u.userId === payload.userId ? { ...u, nickname: payload.newNick } : u)));
          break;
        }
        case "server.settings_updated": {
          const payload = msg.payload as { serverName: string; motd: string };
          setServerInfo((prev) => (prev ? { ...prev, name: payload.serverName, motd: payload.motd } : prev));
          break;
        }
        case "user.status_changed": {
          const payload = msg.payload as { userId: string; status: string };
          setUsers((prev) => prev.map((u) => (u.userId === payload.userId ? { ...u, status: payload.status } : u)));
          break;
        }
        case "channel.members": {
          const payload = msg.payload as { channel: string; members: ChannelMember[] };
          setChannelMembers(payload.members || []);
          break;
        }
        case "chat.read_receipt": {
          const payload = msg.payload as { channel: string; messageId: string; userId: string; nickname: string };
          setReadReceipts((prev) => {
            const existing = prev[payload.messageId] || [];
            if (existing.includes(payload.userId)) return prev;
            return { ...prev, [payload.messageId]: [...existing, payload.userId] };
          });
          break;
        }
        case "chat.history": {
          const payload = msg.payload as {
            channel: string;
            messages: {
              id: string;
              timestamp: number;
              payload: ChatMessagePayload & { replyTo?: string; msgType?: string };
            }[];
            hasMore: boolean;
          };
          setHistoryLoading(false);
          setHasMoreHistory(payload.hasMore);
          if (payload.messages && payload.messages.length > 0) {
            setMessages((prev) => {
              const newMsgs: ChatMessage[] = payload.messages.map((m) => ({
                id: m.id,
                channel: m.payload.channel,
                userId: m.payload.userId,
                nickname: m.payload.nickname,
                content: m.payload.content,
                role: m.payload.role,
                timestamp: m.timestamp,
                replyTo: m.payload.replyTo,
                msgType: m.payload.msgType,
              }));
              // Prepend older messages, deduping by id
              const existingIds = new Set(prev.map((m) => m.id));
              const unique = newMsgs.filter((m) => !existingIds.has(m.id));
              return [...unique, ...prev].sort((a, b) => a.timestamp - b.timestamp);
            });
          }
          break;
        }
        case "admin.banlist": {
          const payload = msg.payload as { bans: AdminBan[] };
          setAdminBans(payload.bans || []);
          break;
        }
        case "admin.unbanned": {
          const payload = msg.payload as { publicKey: string };
          setAdminBans((prev) => prev.filter((b) => b.publicKey !== payload.publicKey));
          break;
        }
        case "admin.mutelist": {
          const payload = msg.payload as { mutes: AdminMute[] };
          setAdminMutes(payload.mutes || []);
          break;
        }
        case "admin.userlist": {
          const payload = msg.payload as { users: AdminUser[] };
          setAdminUsers(payload.users || []);
          break;
        }
        case "custom_emoji.list": {
          const payload = msg.payload as { emojis: ServerCustomEmoji[] };
          setCustomEmojis(payload.emojis || []);
          break;
        }
        case "invite.list": {
          const payload = msg.payload as { invites: InviteData[] };
          setInvites(payload.invites || []);
          break;
        }
        case "voice.state": {
          const payload = msg.payload as VoiceStatePayload;
          setVoiceState(payload);
          break;
        }
        case "profile.data": {
          const payload = msg.payload as UserProfile;
          setProfileCache((prev) => ({ ...prev, [payload.userId]: payload }));
          break;
        }
        case "profile.updated": {
          const payload = msg.payload as { userId: string; customStatus: string };
          setUsers((prev) => prev.map((u) => (u.userId === payload.userId ? { ...u, customStatus: payload.customStatus } : u)));
          setProfileCache((prev) => {
            if (prev[payload.userId]) {
              return { ...prev, [payload.userId]: { ...prev[payload.userId], customStatus: payload.customStatus } };
            }
            return prev;
          });
          break;
        }
        case "audit.log": {
          const payload = msg.payload as { entries: AuditEntry[]; total: number };
          setAuditLog((prev) => ({
            entries: [...prev.entries, ...(payload.entries || [])],
            total: payload.total || 0,
          }));
          break;
        }
        case "error": {
          const payload = msg.payload as ErrorPayload;
          onError?.(payload.message);
          break;
        }
      }
    },
    [identity, onError],
  );

  const connect = useCallback(
    (address: string, nickname: string) => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      addressRef.current = address;
      nicknameRef.current = nickname;
      setStatus("connecting");
      setMessages([]);

      // Remember server IP for native app tracker auto-discovery
      try {
        const host = address.replace(/^wss?:\/\//, "").split(":")[0];
        if (host && host !== "localhost" && host !== "127.0.0.1") {
          localStorage.setItem(LAST_SERVER_IP_KEY, host);
        }
      } catch {}

      // Build WebSocket URL — support ws://, wss://, or bare address:port
      let url: string;
      if (address.includes("://")) {
        url = address.endsWith("/ws") ? address : `${address}/ws`;
      } else {
        url = `ws://${address}/ws`;
      }

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectCountRef.current = 0;
        setReconnectIn(0);
      };

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        if (addressRef.current) {
          const attempt = reconnectCountRef.current;
          const delay = Math.min(1000 * 2 ** attempt, 30000);
          reconnectCountRef.current = attempt + 1;
          setStatus("reconnecting");
          setReconnectIn(Math.round(delay / 1000));

          const countdownInterval = window.setInterval(() => {
            setReconnectIn((v) => {
              if (v <= 1) {
                clearInterval(countdownInterval);
                return 0;
              }
              return v - 1;
            });
          }, 1000);

          reconnectTimerRef.current = window.setTimeout(() => {
            clearInterval(countdownInterval);
            if (addressRef.current) {
              connect(addressRef.current, nicknameRef.current);
            }
          }, delay);
        } else {
          setStatus("disconnected");
        }
      };

      ws.onerror = () => {
        onError?.("Connection error");
      };
    },
    [handleMessage, onError],
  );

  const disconnect = useCallback(() => {
    addressRef.current = "";
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus("disconnected");
    setServerInfo(null);
    setMessages([]);
    setDmMessages([]);
    setTypingUsers([]);
    setChannels([]);
    setUsers([]);
    setReadReceipts({});
    setCustomEmojis([]);
    setInvites([]);
    setProfileCache({});
    setVoiceState(null);
  }, []);

  const wsSend = useCallback((type: string, payload: Record<string, unknown>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage(type, payload);
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const sendChat = useCallback(
    (channel: string, content: string, msgType?: string) => {
      const payload: Record<string, string> = { channel, content };
      if (msgType) payload.msgType = msgType;
      wsSend("chat.send", payload);
    },
    [wsSend],
  );

  const joinChannel = useCallback(
    (channel: string, password?: string) => {
      const payload: Record<string, string> = { channel };
      if (password) payload.password = password;
      wsSend("channel.join", payload);
    },
    [wsSend],
  );

  const leaveChannel = useCallback(
    (channel: string) => {
      wsSend("channel.leave", { channel });
    },
    [wsSend],
  );

  const createChannel = useCallback(
    (name: string, topic: string, password?: string) => {
      wsSend("channel.create", { name, topic, password: password || "" });
    },
    [wsSend],
  );

  const requestUserList = useCallback(() => {
    wsSend("user.list", {});
  }, [wsSend]);

  const requestChannelList = useCallback(() => {
    wsSend("channel.list", {});
  }, [wsSend]);

  const kickUser = useCallback(
    (userId: string) => {
      wsSend("admin.kick", { userId });
    },
    [wsSend],
  );

  const banUser = useCallback(
    (userId: string) => {
      wsSend("admin.ban", { userId });
    },
    [wsSend],
  );

  const setUserRole = useCallback(
    (userId: string, role: string) => {
      wsSend("admin.op", { userId, role });
    },
    [wsSend],
  );

  const setTopic = useCallback(
    (channel: string, topic: string) => {
      wsSend("admin.topic", { channel, topic });
    },
    [wsSend],
  );

  const sendDM = useCallback(
    (targetId: string, content: string) => {
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;
      const peerBoxPK = usersRef.current.find((u) => u.userId === targetId)?.boxPublicKey;
      if (peerBoxPK) {
        // Encrypt the message with the peer's box public key
        const { ciphertext, nonce } = encryptDM(content, peerBoxPK, identity);
        wsSend("dm.send", {
          targetId,
          content: "",
          encrypted: true,
          ciphertext,
          nonce,
          senderBoxPublicKey: getBoxPublicKeyHex(identity),
        });
      } else {
        // Fallback: peer doesn't have box key (old client), send plaintext
        wsSend("dm.send", { targetId, content });
      }
    },
    [identity, wsSend],
  );

  const sendTyping = useCallback(
    (channel: string, targetId?: string) => {
      wsSend("typing", { channel, targetId: targetId || "" });
    },
    [wsSend],
  );

  const deleteChannel = useCallback(
    (name: string) => {
      wsSend("channel.delete", { name });
    },
    [wsSend],
  );

  const search = useCallback(
    (query: string, channel?: string) => {
      wsSend("chat.search", { query, channel: channel || "" });
    },
    [wsSend],
  );

  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  const editMessage = useCallback(
    (messageId: string, content: string) => {
      wsSend("chat.edit", { messageId, content });
    },
    [wsSend],
  );

  const deleteMessage = useCallback(
    (messageId: string) => {
      wsSend("chat.delete", { messageId });
    },
    [wsSend],
  );

  const addReaction = useCallback(
    (messageId: string, emoji: string) => {
      wsSend("reaction.add", { messageId, emoji });
    },
    [wsSend],
  );

  const removeReaction = useCallback(
    (messageId: string, emoji: string) => {
      wsSend("reaction.remove", { messageId, emoji });
    },
    [wsSend],
  );

  const pinMessage = useCallback(
    (messageId: string, channel: string) => {
      wsSend("pin.add", { messageId, channel });
    },
    [wsSend],
  );

  const unpinMessage = useCallback(
    (messageId: string, channel: string) => {
      wsSend("pin.remove", { messageId, channel });
    },
    [wsSend],
  );

  const requestPins = useCallback(
    (channel: string) => {
      wsSend("pin.list", { channel });
    },
    [wsSend],
  );

  const changeNickname = useCallback(
    (nickname: string) => {
      wsSend("user.nick", { nickname });
    },
    [wsSend],
  );

  const sendChatWithReply = useCallback(
    (channel: string, content: string, replyTo: string, msgType?: string) => {
      const payload: Record<string, string> = { channel, content, replyTo };
      if (msgType) payload.msgType = msgType;
      wsSend("chat.send", payload);
    },
    [wsSend],
  );

  const updateServerSettings = useCallback(
    (serverName: string, motd: string) => {
      wsSend("admin.settings", { serverName, motd });
    },
    [wsSend],
  );

  const requestBanList = useCallback(() => {
    wsSend("admin.banlist", {});
  }, [wsSend]);

  const unbanUser = useCallback(
    (publicKey: string) => {
      wsSend("admin.unban", { publicKey });
    },
    [wsSend],
  );

  const setUserStatus = useCallback(
    (status: string) => {
      wsSend("user.status", { status });
    },
    [wsSend],
  );

  const requestChannelMembers = useCallback(
    (channel: string) => {
      wsSend("channel.members", { channel });
    },
    [wsSend],
  );

  const loadHistory = useCallback(
    (channel: string, beforeTimestamp: number) => {
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;
      setHistoryLoading(true);
      wsSend("chat.history", { channel, before: beforeTimestamp, limit: 50 });
    },
    [wsSend],
  );

  const sendReadReceipt = useCallback(
    (channel: string, messageId: string) => {
      wsSend("chat.read", { channel, messageId });
    },
    [wsSend],
  );

  const muteUser = useCallback(
    (publicKey: string, reason: string, duration: number) => {
      wsSend("admin.mute", { publicKey, reason, duration });
    },
    [wsSend],
  );

  const unmuteUser = useCallback(
    (publicKey: string) => {
      wsSend("admin.unmute", { publicKey });
    },
    [wsSend],
  );

  const requestMuteList = useCallback(() => {
    wsSend("admin.mutelist", {});
  }, [wsSend]);

  const requestAdminUserList = useCallback(() => {
    wsSend("admin.userlist", {});
  }, [wsSend]);

  const renameChannel = useCallback(
    (oldName: string, newName: string) => {
      wsSend("admin.rename_channel", { oldName, newName });
    },
    [wsSend],
  );

  const requestCustomEmojis = useCallback(() => {
    wsSend("custom_emoji.list", {});
  }, [wsSend]);

  const addCustomEmoji = useCallback(
    (name: string, filename: string) => {
      wsSend("custom_emoji.add", { name, filename });
    },
    [wsSend],
  );

  const removeCustomEmoji = useCallback(
    (name: string) => {
      wsSend("custom_emoji.remove", { name });
    },
    [wsSend],
  );

  const createInvite = useCallback(
    (maxUses: number, expireHours: number) => {
      wsSend("invite.create", { maxUses, expireHours });
    },
    [wsSend],
  );

  const deleteInvite = useCallback(
    (code: string) => {
      wsSend("invite.delete", { code });
    },
    [wsSend],
  );

  const requestInviteList = useCallback(() => {
    wsSend("invite.list", {});
  }, [wsSend]);

  const requestAuditLog = useCallback(
    (limit?: number, offset?: number) => {
      const off = offset ?? 0;
      if (off === 0) {
        setAuditLog({ entries: [], total: 0 });
      }
      wsSend("audit.log", { limit: limit ?? 50, offset: off });
    },
    [wsSend],
  );

  const requestProfile = useCallback(
    (userId: string) => {
      wsSend("profile.get", { userId });
    },
    [wsSend],
  );

  const updateProfile = useCallback(
    (bio: string, customStatus: string, pronouns: string, timezone: string) => {
      wsSend("profile.update", { bio, customStatus, pronouns, timezone });
    },
    [wsSend],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingUsers((prev) => prev.filter((t) => t.expiry > Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    status,
    serverInfo,
    messages,
    dmMessages,
    typingUsers,
    channels,
    users,
    searchResults,
    pinnedMessages,
    channelMembers,
    reconnectIn,
    historyLoading,
    hasMoreHistory,
    connect,
    disconnect,
    sendChat,
    sendDM,
    sendTyping,
    joinChannel,
    leaveChannel,
    createChannel,
    deleteChannel,
    requestUserList,
    requestChannelList,
    kickUser,
    banUser,
    setUserRole,
    setTopic,
    search,
    clearSearch,
    editMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    pinMessage,
    unpinMessage,
    requestPins,
    changeNickname,
    sendChatWithReply,
    updateServerSettings,
    requestBanList,
    unbanUser,
    setStatus: setUserStatus,
    requestChannelMembers,
    loadHistory,
    readReceipts,
    sendReadReceipt,
    adminBans,
    adminMutes,
    adminUsers,
    customEmojis,
    invites,
    muteUser,
    unmuteUser,
    requestMuteList,
    requestAdminUserList,
    renameChannel,
    requestCustomEmojis,
    addCustomEmoji,
    removeCustomEmoji,
    createInvite,
    deleteInvite,
    requestInviteList,
    auditLog,
    requestAuditLog,
    profileCache,
    requestProfile,
    updateProfile,
    voiceState,
    wsRef,
  };
}
