export interface WsMessage {
  type: string;
  id: string;
  timestamp: number;
  payload: unknown;
}

export interface AuthPayload {
  publicKey: string;
  signature: string;
  nonce: string;
  nickname: string;
}

export interface AuthOkPayload {
  userId: string;
  role: string;
  serverName: string;
  motd: string;
  agreement: string;
}

export interface AuthNoncePayload {
  nonce: string;
}

export interface AuthErrorPayload {
  reason: string;
}

export interface ChatSendPayload {
  channel: string;
  content: string;
}

export interface ChatMessagePayload {
  channel: string;
  userId: string;
  nickname: string;
  content: string;
  role: string;
}

export interface ChannelInfo {
  name: string;
  topic: string;
  userCount: number;
  hasPassword: boolean;
}

export interface ChannelListPayload {
  channels: ChannelInfo[];
}

export interface UserInfo {
  userId: string;
  nickname: string;
  role: string;
  status: string;
  boxPublicKey?: string;
  connectedAt?: number;
  customStatus?: string;
}

export interface UserListPayload {
  users: UserInfo[];
}

export interface UserJoinedPayload {
  userId: string;
  nickname: string;
  role: string;
  boxPublicKey?: string;
  connectedAt?: number;
  customStatus?: string;
}

export interface UserLeftPayload {
  userId: string;
  nickname: string;
}

export interface FileEntry {
  name: string;
  size: number;
  isDir: boolean;
  modified: string;
}

export interface FileListPayload {
  path: string;
  entries: FileEntry[];
}

export interface ErrorPayload {
  code: string;
  message: string;
}

export const MSG = {
  AUTH: "auth",
  AUTH_NONCE: "auth.nonce",
  AUTH_OK: "auth.ok",
  CHAT_SEND: "chat.send",
  CHAT_MESSAGE: "chat.message",
  CHAT_HISTORY: "chat.history",
  CHANNEL_LIST: "channel.list",
  CHANNEL_JOIN: "channel.join",
  USER_LIST: "user.list",
  USER_JOINED: "user.joined",
  USER_LEFT: "user.left",
  DM_SEND: "dm.send",
  DM_MESSAGE: "dm.message",
  TYPING: "typing",
  ERROR: "error",
} as const;

export function createMessage(type: string, payload: unknown): WsMessage {
  return {
    type,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    payload,
  };
}
