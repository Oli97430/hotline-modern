import { ExternalLink, Play } from "lucide-react";

interface RichEmbedProps {
  url: string;
}

interface EmbedData {
  type: "youtube" | "twitter" | "generic";
  id?: string;
  title?: string;
}

function parseEmbed(url: string): EmbedData | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return { type: "youtube", id: ytMatch[1] };
  }

  // Twitter/X
  const twMatch = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  if (twMatch) {
    return { type: "twitter", id: twMatch[1] };
  }

  return null;
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rich-embed rich-embed-youtube"
    >
      <div className="rich-embed-thumb">
        <img src={thumbUrl} alt="YouTube video" loading="lazy" />
        <div className="rich-embed-play">
          <Play size={20} fill="#fff" />
        </div>
      </div>
      <div className="rich-embed-info">
        <span className="rich-embed-source">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff0000">
            <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z" />
            <path fill="#fff" d="M9.5 15.5V8.5l6.5 3.5z" />
          </svg>
          <span>YouTube</span>
        </span>
        <span className="rich-embed-id">{videoId}</span>
      </div>
      <ExternalLink size={11} className="rich-embed-ext" />
    </a>
  );
}

function TwitterEmbed({ tweetId, url }: { tweetId: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="rich-embed rich-embed-twitter">
      <div className="rich-embed-twitter-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <div className="rich-embed-info">
        <span className="rich-embed-source">
          <span>X (Twitter)</span>
        </span>
        <span className="rich-embed-id">Tweet #{tweetId.slice(-6)}</span>
      </div>
      <ExternalLink size={11} className="rich-embed-ext" />
    </a>
  );
}

export function RichEmbed({ url }: RichEmbedProps) {
  const embed = parseEmbed(url);
  if (!embed) return null;

  if (embed.type === "youtube" && embed.id) {
    return <YouTubeEmbed videoId={embed.id} />;
  }

  if (embed.type === "twitter" && embed.id) {
    return <TwitterEmbed tweetId={embed.id} url={url} />;
  }

  return null;
}

// Check if a URL can be rendered as a rich embed
export function isEmbeddableUrl(url: string): boolean {
  return parseEmbed(url) !== null;
}
