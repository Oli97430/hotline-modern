import { useMemo } from "react";

interface UserAvatarProps {
  userId: string;
  nickname: string;
  size?: number;
  /** Optional border color (e.g. role color). Omit for no border. */
  borderColor?: string;
}

// --- Deterministic hash helpers ---

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Second independent hash for more bits of entropy */
function hashCode2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Curated palette of hue ranges that look good as backgrounds with white text.
// Avoids yellows/light-greens that have poor contrast.
const HUE_RANGES: [number, number][] = [
  [0, 30], // reds / warm oranges
  [170, 200], // teals
  [200, 260], // blues
  [260, 310], // purples / magentas
  [310, 345], // pinks / roses
  [130, 165], // greens (deeper)
  [35, 55], // amber / burnt orange
];

function getAvatarColors(userId: string): { bg1: string; bg2: string; angle: number } {
  const h1 = hashCode(userId);
  const h2 = hashCode2(userId);

  // Pick a hue range, then a hue within it
  const rangeIdx = h1 % HUE_RANGES.length;
  const [lo, hi] = HUE_RANGES[rangeIdx];
  const hue1 = lo + ((h1 >> 3) % (hi - lo));

  // Second hue: offset by 20-50 degrees for a subtle gradient shift
  const offset = 20 + (h2 % 30);
  const hue2 = (hue1 + offset) % 360;

  // Vary saturation and lightness slightly per user
  const sat1 = 58 + ((h2 >> 5) % 14); // 58-71
  const lit1 = 46 + ((h1 >> 6) % 10); // 46-55
  const sat2 = 50 + ((h1 >> 8) % 16); // 50-65
  const lit2 = 38 + ((h2 >> 8) % 10); // 38-47

  // Gradient angle varies per user
  const angle = 120 + ((h1 >> 10) % 60); // 120-179 degrees

  return {
    bg1: `hsl(${hue1}, ${sat1}%, ${lit1}%)`,
    bg2: `hsl(${hue2}, ${sat2}%, ${lit2}%)`,
    angle,
  };
}

function getInitials(nickname: string): string {
  const trimmed = nickname.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

/**
 * Generate a 5x5 vertically-symmetric identicon grid (like GitHub).
 * Only the left half + center column are random; right half mirrors left.
 * Returns 25 booleans (row-major).
 */
function getSymmetricPattern(userId: string): boolean[] {
  const h1 = hashCode(userId);
  const h2 = hashCode2(userId);
  // We need 15 bits for a 5x5 symmetric grid (5 rows x 3 columns: left, center, right mirrors left)
  const bits = (h1 ^ (h2 << 3)) >>> 0;
  const grid: boolean[] = new Array(25);

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      const bitIdx = row * 3 + col;
      const on = ((bits >> bitIdx) & 1) === 1;
      grid[row * 5 + col] = on;
      // Mirror: col 0 -> 4, col 1 -> 3, col 2 stays center
      grid[row * 5 + (4 - col)] = on;
    }
  }
  return grid;
}

export function UserAvatar({ userId, nickname, size = 32, borderColor }: UserAvatarProps) {
  const { bg1, bg2, angle, initials, pattern } = useMemo(() => {
    const colors = getAvatarColors(userId);
    return {
      ...colors,
      initials: getInitials(nickname),
      pattern: getSymmetricPattern(userId),
    };
  }, [userId, nickname]);

  const showPattern = size >= 24; // skip pattern on very small avatars
  const fontSize = size * (initials.length > 1 ? 0.34 : 0.42);

  return (
    <div
      className="user-avatar"
      style={{
        width: size,
        height: size,
        minWidth: size,
        background: `linear-gradient(${angle}deg, ${bg1}, ${bg2})`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: borderColor
          ? `0 0 0 2px ${borderColor}, inset 0 1px 3px rgba(0,0,0,0.15)`
          : "inset 0 1px 3px rgba(0,0,0,0.15)",
        flexShrink: 0,
      }}
      title={nickname}
    >
      {/* Symmetric identicon pattern overlay */}
      {showPattern && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 5 5"
          style={{ position: "absolute", inset: 0, opacity: 0.12 }}
          aria-hidden="true"
        >
          {pattern.map((on, i) =>
            on ? <rect key={i} x={i % 5} y={Math.floor(i / 5)} width={1} height={1} fill="#fff" /> : null,
          )}
        </svg>
      )}

      {/* Initials */}
      <span
        style={{
          fontSize,
          fontWeight: 700,
          color: "#fff",
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
          letterSpacing: initials.length > 1 ? "-0.3px" : "0px",
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
          userSelect: "none",
        }}
      >
        {initials}
      </span>
    </div>
  );
}
