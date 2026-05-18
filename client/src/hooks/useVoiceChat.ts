import { useCallback, useEffect, useRef, useState } from "react";
import { createMessage, WsMessage } from "../lib/protocol";

export interface VoiceParticipant {
  userId: string;
  nickname: string;
  muted: boolean;
  deafened: boolean;
  speaking?: boolean;
}

interface UseVoiceChatOptions {
  wsRef: React.RefObject<WebSocket | null>;
  currentUserId: string;
}

export interface UseVoiceChatReturn {
  voiceChannel: string | null;
  participants: VoiceParticipant[];
  isMuted: boolean;
  isDeafened: boolean;
  joinVoice: (channel: string) => void;
  leaveVoice: () => void;
  toggleMute: () => void;
  toggleDeafen: () => void;
}

const STUN_SERVERS = [
  "stun:stun.l.google.com:19302",
  "stun:stun1.l.google.com:19302",
];

const SPEAKING_THRESHOLD = 0.015;
const SPEAKING_CHECK_INTERVAL = 100;

export function useVoiceChat({ wsRef, currentUserId }: UseVoiceChatOptions): UseVoiceChatReturn {
  const [voiceChannel, setVoiceChannel] = useState<string | null>(null);
  const [participants, setParticipants] = useState<VoiceParticipant[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const remoteAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const speakingIntervalRef = useRef<number | null>(null);
  const voiceChannelRef = useRef<string | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    voiceChannelRef.current = voiceChannel;
  }, [voiceChannel]);

  const wsSend = useCallback((type: string, payload: Record<string, unknown>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const msg = createMessage(type, payload);
      wsRef.current.send(JSON.stringify(msg));
    }
  }, [wsRef]);

  const createPeerConnection = useCallback((peerId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: STUN_SERVERS }],
    });

    // Add local audio tracks
    if (localStreamRef.current) {
      for (const track of localStreamRef.current.getAudioTracks()) {
        pc.addTrack(track, localStreamRef.current);
      }
    }

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        wsSend("voice.ice", {
          targetUserId: peerId,
          candidate: event.candidate.toJSON(),
        });
      }
    };

    // Handle remote tracks
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteStream) {
        let audio = remoteAudioRef.current.get(peerId);
        if (!audio) {
          audio = new Audio();
          audio.autoplay = true;
          remoteAudioRef.current.set(peerId, audio);
        }
        audio.srcObject = remoteStream;
      }
    };

    peerConnectionsRef.current.set(peerId, pc);
    return pc;
  }, [wsSend]);

  const cleanupPeerConnection = useCallback((peerId: string) => {
    const pc = peerConnectionsRef.current.get(peerId);
    if (pc) {
      pc.close();
      peerConnectionsRef.current.delete(peerId);
    }
    const audio = remoteAudioRef.current.get(peerId);
    if (audio) {
      audio.srcObject = null;
      remoteAudioRef.current.delete(peerId);
    }
  }, []);

  const cleanupAll = useCallback(() => {
    // Stop speaking detection
    if (speakingIntervalRef.current) {
      clearInterval(speakingIntervalRef.current);
      speakingIntervalRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
      analyserRef.current = null;
    }

    // Close all peer connections
    for (const peerId of peerConnectionsRef.current.keys()) {
      cleanupPeerConnection(peerId);
    }

    // Stop local stream
    if (localStreamRef.current) {
      for (const track of localStreamRef.current.getTracks()) {
        track.stop();
      }
      localStreamRef.current = null;
    }
  }, [cleanupPeerConnection]);

  const setupSpeakingDetection = useCallback((stream: MediaStream) => {
    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.4;
      source.connect(analyser);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      const dataArray = new Float32Array(analyser.fftSize);

      speakingIntervalRef.current = window.setInterval(() => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i] * dataArray[i];
        }
        const rms = Math.sqrt(sum / dataArray.length);
        const speaking = rms > SPEAKING_THRESHOLD;

        setParticipants((prev) =>
          prev.map((p) =>
            p.userId === currentUserId
              ? { ...p, speaking }
              : p
          )
        );
      }, SPEAKING_CHECK_INTERVAL);
    } catch {
      // AudioContext not available
    }
  }, [currentUserId]);

  const handleVoiceMessage = useCallback(async (event: MessageEvent) => {
    let msg: WsMessage;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }

    switch (msg.type) {
      case "voice.state": {
        const payload = msg.payload as {
          channel: string;
          participants: { userId: string; nickname: string; muted: boolean; deafened: boolean }[];
        };

        // Only process if we are in this voice channel
        if (!voiceChannelRef.current || payload.channel !== voiceChannelRef.current) return;

        setParticipants((prev) => {
          return payload.participants.map((p) => {
            const existing = prev.find((e) => e.userId === p.userId);
            return {
              ...p,
              speaking: existing?.speaking ?? false,
            };
          });
        });

        // Create peer connections for new participants
        for (const p of payload.participants) {
          if (p.userId === currentUserId) continue;
          if (peerConnectionsRef.current.has(p.userId)) continue;

          // Deterministic: lower userId creates the offer
          const weOffer = currentUserId < p.userId;
          const pc = createPeerConnection(p.userId);

          if (weOffer) {
            try {
              const offer = await pc.createOffer();
              await pc.setLocalDescription(offer);
              wsSend("voice.offer", {
                targetUserId: p.userId,
                sdp: pc.localDescription?.sdp,
              });
            } catch {
              // Offer creation failed
            }
          }
        }

        // Clean up peer connections for participants who left
        const currentPeerIds = new Set(payload.participants.map((p) => p.userId));
        for (const peerId of peerConnectionsRef.current.keys()) {
          if (!currentPeerIds.has(peerId)) {
            cleanupPeerConnection(peerId);
          }
        }
        break;
      }

      case "voice.offer": {
        const payload = msg.payload as { targetUserId: string; sdp: string; userId?: string };
        const fromUserId = payload.userId || (msg.payload as Record<string, string>).fromUserId;
        if (!fromUserId || !voiceChannelRef.current) return;

        let pc = peerConnectionsRef.current.get(fromUserId);
        if (!pc) {
          pc = createPeerConnection(fromUserId);
        }

        try {
          await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: payload.sdp }));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          wsSend("voice.answer", {
            targetUserId: fromUserId,
            sdp: pc.localDescription?.sdp,
          });
        } catch {
          // Answer creation failed
        }
        break;
      }

      case "voice.answer": {
        const payload = msg.payload as { targetUserId: string; sdp: string; userId?: string };
        const fromUserId = payload.userId || (msg.payload as Record<string, string>).fromUserId;
        if (!fromUserId) return;

        const pc = peerConnectionsRef.current.get(fromUserId);
        if (pc) {
          try {
            await pc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: payload.sdp }));
          } catch {
            // Failed to set remote description
          }
        }
        break;
      }

      case "voice.ice": {
        const payload = msg.payload as { targetUserId: string; candidate: RTCIceCandidateInit; userId?: string };
        const fromUserId = payload.userId || (msg.payload as Record<string, string>).fromUserId;
        if (!fromUserId) return;

        const pc = peerConnectionsRef.current.get(fromUserId);
        if (pc && payload.candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } catch {
            // Failed to add ICE candidate
          }
        }
        break;
      }
    }
  }, [currentUserId, createPeerConnection, cleanupPeerConnection, wsSend]);

  // Attach WS message listener
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;

    ws.addEventListener("message", handleVoiceMessage);
    return () => {
      ws.removeEventListener("message", handleVoiceMessage);
    };
  }, [wsRef, handleVoiceMessage]);

  // Re-attach listener when WS reconnects
  useEffect(() => {
    const checkInterval = window.setInterval(() => {
      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.addEventListener("message", handleVoiceMessage);
      }
    }, 2000);

    return () => clearInterval(checkInterval);
  }, [wsRef, handleVoiceMessage]);

  const joinVoice = useCallback(async (channel: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;

      setVoiceChannel(channel);
      setIsMuted(false);
      setIsDeafened(false);
      setParticipants([]);

      wsSend("voice.join", { channel });

      setupSpeakingDetection(stream);
    } catch {
      // Microphone access denied or unavailable
    }
  }, [wsSend, setupSpeakingDetection]);

  const leaveVoice = useCallback(() => {
    if (voiceChannelRef.current) {
      wsSend("voice.leave", { channel: voiceChannelRef.current });
    }
    cleanupAll();
    setVoiceChannel(null);
    setParticipants([]);
    setIsMuted(false);
    setIsDeafened(false);
  }, [wsSend, cleanupAll]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Mute/unmute local audio tracks
    if (localStreamRef.current) {
      for (const track of localStreamRef.current.getAudioTracks()) {
        track.enabled = !newMuted;
      }
    }

    wsSend("voice.mute", { muted: newMuted, deafened: isDeafened });
  }, [isMuted, isDeafened, wsSend]);

  const toggleDeafen = useCallback(() => {
    const newDeafened = !isDeafened;
    setIsDeafened(newDeafened);

    // Set volume on all remote audio elements
    for (const audio of remoteAudioRef.current.values()) {
      audio.volume = newDeafened ? 0 : 1;
    }

    // Deafening also mutes
    const newMuted = newDeafened ? true : isMuted;
    if (newDeafened && !isMuted) {
      setIsMuted(true);
      if (localStreamRef.current) {
        for (const track of localStreamRef.current.getAudioTracks()) {
          track.enabled = false;
        }
      }
    }

    wsSend("voice.mute", { muted: newMuted, deafened: newDeafened });
  }, [isDeafened, isMuted, wsSend]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceChannelRef.current) {
        wsSend("voice.leave", { channel: voiceChannelRef.current });
      }
      cleanupAll();
    };
  }, [wsSend, cleanupAll]);

  return {
    voiceChannel,
    participants,
    isMuted,
    isDeafened,
    joinVoice,
    leaveVoice,
    toggleMute,
    toggleDeafen,
  };
}
