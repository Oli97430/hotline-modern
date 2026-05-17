interface UserAvatarProps {
  userId: string;
  nickname: string;
  size?: number;
}

// Generate deterministic color from userId hash
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAvatarColors(userId: string): [string, string] {
  const h = hashCode(userId);
  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + (h >> 8) % 60) % 360;
  return [
    `hsl(${hue1}, 65%, 55%)`,
    `hsl(${hue2}, 55%, 45%)`,
  ];
}

function getInitials(nickname: string): string {
  const parts = nickname.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nickname.slice(0, 2).toUpperCase();
}

// Generate a simple SVG pattern from userId
function getPattern(userId: string): number[] {
  const h = hashCode(userId);
  const cells: number[] = [];
  for (let i = 0; i < 9; i++) {
    cells.push((h >> i) & 1);
  }
  return cells;
}

export function UserAvatar({ userId, nickname, size = 32 }: UserAvatarProps) {
  const [color1, color2] = getAvatarColors(userId);
  const initials = getInitials(nickname);
  const pattern = getPattern(userId);

  return (
    <div
      className="user-avatar"
      style={{
        width: size,
        height: size,
        minWidth: size,
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      title={nickname}
    >
      {/* Subtle pattern overlay */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 3 3"
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
      >
        {pattern.map((cell, i) =>
          cell ? (
            <rect
              key={i}
              x={i % 3}
              y={Math.floor(i / 3)}
              width={1}
              height={1}
              fill="#fff"
            />
          ) : null
        )}
      </svg>
      <span
        style={{
          fontSize: size * 0.38,
          fontWeight: 700,
          color: "#fff",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          letterSpacing: "-0.5px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {initials}
      </span>
    </div>
  );
}
