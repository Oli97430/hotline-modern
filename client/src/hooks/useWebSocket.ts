import { useCallback, useEffect, useRef, useState } from "react";
import {
  WsMessage,
  AuthNoncePayload,
  AuthOkPayload,
  ChatMessagePayload,
  ChannelListPayload,
  UserListPayload,
  UserJoinedPayload,
  UserLeftPayload,
  ErrorPayload,
  createMessage,
} from "../lib/protocol";
import { Identity, getPublicKeyHex, signMessage } from "../lib/crypto";

export type ConnectionStatus = "disconnected" | "connecting" | "authenticating" | "connected";

export interface ChatMessage {
  id: string;
  channel: string;
  userId: string;
  nickname: string;
  content: string;
  role: string;
  timestamp: number;
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
}

interface UseWebSocketOptions {
  identity: Identity;
  onError?: (message: string) => void;
}

export interface UseWebSocketReturn {
  status: ConnectionStatus;
  serverInfo: ServerInfo | null;
  messages: ChatMessage[];
  dmMessages: DMMessage[];
  typingUsers: TypingUser[];
  channels: { name: string; topic: string; userCount: number }[];
  users: { userId: string; nickname: string; role: string; status: string }[];
  connect: (address: string, nickname: string) => void;
  disconnect: () => void;
  sendChat: (channel: string, content: string) => void;
  sendDM: (targetId: string, content: string) => void;
  sendTyping: (channel: string, targetId?: string) => void;
  joinChannel: (channel: string) => void;
  leaveChannel: (channel: string) => void;
  createChannel: (name: string, topic: string) => void;
  deleteChannel: (name: string) => void;
  requestUserList: () => void;
  requestChannelList: () => void;
  kickUser: (userId: string) => void;
  banUser: (userId: string) => void;
  setUserRole: (userId: string, role: string) => void;
  setTopic: (channel: string, topic: string) => void;
}

export function useWebSocket({ identity, onError }: UseWebSocketOptions): UseWebSocketReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const addressRef = useRef<string>("");
  const nicknameRef = useRef<string>("");

  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [channels, setChannels] = useState<{ name: string; topic: string; userCount: number }[]>([]);
  const [users, setUsers] = useState<{ userId: string; nickname: string; role: string; status: string }[]>([]);

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
          const payload = msg.payload as ChatMessagePayload;
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [
              ...prev,
              {
                id: msg.id,
                channel: payload.channel,
                userId: payload.userId,
                nickname: payload.nickname,
                content: payload.content,
                role: payload.role,
                timestamp: msg.timestamp,
              },
            ].sort((a, b) => a.timestamp - b.timestamp);
          });
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
            return [...filtered, { ...payload, status: "online" }];
          });
          break;
        }
        case "user.left": {
          const payload = msg.payload as UserLeftPayload;
          setUsers((prev) => prev.filter((u) => u.userId !== payload.userId));
          break;
        }
        case "user.role_changed": {
          const { userId, role } = msg.payload as { userId: string; role: string };
          setUsers((prev) =>
            prev.map((u) => (u.userId === userId ? { ...u, role } : u))
          );
          break;
        }
        case "dm.message": {
          const payload = msg.payload as { from: string; to: string; nickname: string; content: string; role: string };
          setDmMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [
              ...prev,
              {
                id: msg.id,
                from: payload.from,
                to: payload.to,
                nickname: payload.nickname,
                content: payload.content,
                role: payload.role,
                timestamp: msg.timestamp,
              },
            ].sort((a, b) => a.timestamp - b.timestamp);
          });
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
        case "error": {
          const payload = msg.payload as ErrorPayload;
          onError?.(payload.message);
          break;
        }
      }
    },
    [identity, onError]
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

      const protocol = address.startsWith("wss://") ? "" : "ws://";
      const url = address.includes("://") ? address : `${protocol}${address}/ws`;

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {};

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        setStatus("disconnected");
        if (addressRef.current) {
          reconnectTimerRef.current = window.setTimeout(() => {
            if (addressRef.current) {
              connect(addressRef.current, nicknameRef.current);
            }
          }, 3000);
        }
      };

      ws.onerror = () => {
        onError?.("Connection error");
      };
    },
    [handleMessage, onError]
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
  }, []);

  const sendChat = useCallback((channel: string, content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("chat.send", { channel, content });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const joinChannel = useCallback((channel: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("channel.join", { channel });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const leaveChannel = useCallback((channel: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("channel.leave", { channel });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const createChannel = useCallback((name: string, topic: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("channel.create", { name, topic });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const requestUserList = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("user.list", {});
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const requestChannelList = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("channel.list", {});
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const kickUser = useCallback((userId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("admin.kick", { userId });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const banUser = useCallback((userId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("admin.ban", { userId });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const setUserRole = useCallback((userId: string, role: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("admin.op", { userId, role });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const setTopic = useCallback((channel: string, topic: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("admin.topic", { channel, topic });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const sendDM = useCallback((targetId: string, content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("dm.send", { targetId, content });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const sendTyping = useCallback((channel: string, targetId?: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("typing", { channel, targetId: targetId || "" });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const deleteChannel = useCallback((name: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage("channel.delete", { name });
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

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
  };
}
