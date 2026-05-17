import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Square, Send, X, Loader } from "lucide-react";

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob, duration: number) => void;
  onCancel: () => void;
}

export function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const { t } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startRecording();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start(100);
      setRecording(true);
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 200);
    } catch {
      onCancel();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleSend = () => {
    if (audioBlob) {
      onSend(audioBlob, duration);
    }
  };

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="voice-recorder">
      <div className="voice-recorder-indicator">
        {recording && <span className="voice-rec-dot" />}
        <span className="voice-rec-time">{formatDuration(duration)}</span>
      </div>

      {recording && (
        <div className="voice-recorder-wave">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="voice-wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      )}

      {audioUrl && !recording && (
        <audio className="voice-recorder-preview" src={audioUrl} controls />
      )}

      <div className="voice-recorder-actions">
        {recording ? (
          <button className="voice-btn voice-stop" onClick={stopRecording} title={t("voice.stop")}>
            <Square size={14} />
          </button>
        ) : audioBlob ? (
          <button className="voice-btn voice-send" onClick={handleSend} title={t("voice.send")}>
            <Send size={14} />
          </button>
        ) : (
          <Loader size={14} className="voice-loading" />
        )}
        <button className="voice-btn voice-cancel" onClick={onCancel} title={t("voice.cancel")}>
          <X size={14} />
        </button>
      </div>

      <style>{`
        .voice-recorder {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          animation: fadeIn 0.15s ease;
          box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .voice-recorder-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .voice-rec-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
          animation: recPulse 1s ease-in-out infinite;
        }
        @keyframes recPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .voice-rec-time {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--text-primary);
          min-width: 36px;
        }
        .voice-recorder-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 20px;
        }
        .voice-wave-bar {
          width: 3px;
          height: 100%;
          border-radius: 2px;
          background: var(--accent);
          animation: waveBar 0.8s ease-in-out infinite alternate;
          opacity: 0.8;
        }
        .voice-wave-bar:nth-child(1) { animation-duration: 0.6s; height: 60%; }
        .voice-wave-bar:nth-child(2) { animation-duration: 0.9s; height: 90%; }
        .voice-wave-bar:nth-child(3) { animation-duration: 0.7s; height: 100%; }
        .voice-wave-bar:nth-child(4) { animation-duration: 1.0s; height: 75%; }
        .voice-wave-bar:nth-child(5) { animation-duration: 0.65s; height: 50%; }
        @keyframes waveBar {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        .voice-recorder-preview {
          height: 28px;
          flex: 1;
          max-width: 200px;
        }
        .voice-recorder-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .voice-btn {
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          transition: all var(--transition-fast);
        }
        .voice-stop {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .voice-stop:hover {
          background: var(--danger);
          color: #fff;
        }
        .voice-send {
          color: #fff;
          background: var(--accent);
        }
        .voice-send:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .voice-cancel {
          color: var(--text-muted);
        }
        .voice-cancel:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .voice-loading {
          animation: spin 1s linear infinite;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

// Audio message player inline in chat
interface AudioMessageProps {
  src: string;
  duration?: number;
}

export function AudioMessage({ src, duration }: AudioMessageProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animRef = useRef<number>(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
      if (!audio.paused) animRef.current = requestAnimationFrame(update);
    };
    audio.addEventListener("play", () => { animRef.current = requestAnimationFrame(update); });
    audio.addEventListener("ended", () => { setPlaying(false); setProgress(0); });
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const formatDur = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-message" onClick={toggle}>
      <audio ref={audioRef} src={src} preload="metadata" />
      <button className="audio-play-btn">
        {playing ? <Square size={10} /> : <Mic size={12} />}
      </button>
      <div className="audio-progress-bar">
        <div className="audio-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      {duration !== undefined && <span className="audio-duration">{formatDur(duration)}</span>}

      <style>{`
        .audio-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          cursor: pointer;
          max-width: 240px;
          margin-top: 6px;
          transition: background var(--transition-fast);
        }
        .audio-message:hover {
          background: var(--bg-hover);
        }
        .audio-play-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }
        .audio-message:hover .audio-play-btn {
          transform: scale(1.05);
        }
        .audio-progress-bar {
          flex: 1;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        .audio-progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.1s linear;
        }
        .audio-duration {
          font-size: 11px;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
