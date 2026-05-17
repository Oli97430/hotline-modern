# Hotline Modern

A modern reinvention of [Hotline](https://en.wikipedia.org/wiki/Hotline_Communications) (1997) — decentralized chat and file sharing with self-hosted servers.

**Key principles:** Each server is sovereign. No central accounts. Portable identity via Ed25519 keys. Communities run their own servers.

## Architecture

- **Server:** Go binary with embedded SQLite — zero external dependencies
- **Client:** Tauri + React + TypeScript — lightweight, native, modern
- **Protocol:** WebSocket (real-time chat) + HTTP (file transfers)
- **Auth:** Ed25519 key pair — same key = same identity on every server

## Quick Start

### Server

```bash
cd server
go build -o hotline-server ./cmd/hotline-server/
./hotline-server --name "My Server" --motd "Welcome!" --addr :9998 --http :9999
```

Options:
| Flag      | Default           | Description                |
|-----------|-------------------|----------------------------|
| `--addr`  | `:9998`           | WebSocket listen address   |
| `--http`  | `:9999`           | HTTP file server address   |
| `--data`  | `./data`          | Data directory (DB + files)|
| `--name`  | `Hotline Server`  | Server display name        |
| `--motd`  | `Welcome to Hotline Modern!` | Message of the day |

The first user to connect becomes **admin** automatically.

### Client (Development)

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:1420`, enter the server address and a nickname.

### Client (Tauri Desktop App)

```bash
cd client
npm install
npm run tauri build
```

The built application will be in `client/src-tauri/target/release/`.

## Features

### Chat & Messaging
- **Real-time messaging** with channels and message grouping
- **Direct messages** — private conversations between users
- **Typing indicators** — animated dots for active typers
- **Message reactions** — emoji reactions with quick-react picker
- **Message editing & deletion** — inline edit with history indicator
- **Reply threads** — reply to specific messages with quoted context
- **@Mentions** — autocomplete user mentions with role-colored suggestions
- **Markdown formatting** — bold, italic, strikethrough, code, links
- **Format toolbar** — visual formatting buttons with keyboard shortcuts
- **Image previews** — inline image rendering with lightbox viewer (zoom, rotate, download)
- **Message context menu** — right-click for reply, react, copy, quote, bookmark, pin, edit, delete
- **Message search** — full-text search across channels with highlighted results

### Channels
- **Create/delete channels** — with optional password protection
- **Channel settings** — edit topics, view member count
- **Channel password prompt** — secure entry modal for protected channels
- **Channel muting** — per-channel notification muting, persisted locally

### Organization
- **Pinned messages** — pin important messages, view in floating panel
- **Bookmarks** — locally-saved message bookmarks across channels
- **Message of the Day** — dismissible, expandable server MOTD banner

### File Sharing
- **File browser** — breadcrumb navigation, folder structure
- **Drag & drop upload** — full-screen overlay with file type hints
- **File download** — inline download from the file browser

### Users & Moderation
- **User profile cards** — rich cards with avatar, role badge, status, moderation actions
- **Roles** — 4-level hierarchy: admin > operator > member > guest
- **Slash commands** — /kick, /ban, /op, /deop, /topic
- **Admin panel** — server settings management, ban list
- **User status** — Available, Away, Busy with auto-idle detection (5min)

### Notifications
- **Desktop notifications** — browser notifications for missed messages
- **Sound notifications** — synthesized notification tones
- **Tab title badges** — unread count in browser tab, flashing when hidden
- **Join/leave toasts** — animated toast notifications for user activity

### Interface
- **Dark/Light themes** — with system preference detection
- **Compact mode** — dense message layout toggle, persisted locally
- **Keyboard shortcuts** — Ctrl+K search, Ctrl+B/I formatting, ? for help modal
- **Scroll-to-bottom** — floating button with new message count when scrolled up
- **Connection status** — animated reconnection bar with progress indicator
- **i18n** — English and French, auto-detected with manual override
- **Emoji picker** — 64 emojis across 4 categories with search

## Slash Commands

Type these in the chat input:

| Command             | Role     | Description                |
|---------------------|----------|----------------------------|
| `/kick <nickname>`  | op/admin | Kick a user                |
| `/ban <nickname>`   | op/admin | Ban a user (demote + disconnect) |
| `/op <nickname>`    | admin    | Promote to operator        |
| `/deop <nickname>`  | admin    | Demote to member           |
| `/topic <text>`     | op/admin | Set channel topic          |

## Keyboard Shortcuts

| Shortcut        | Action              |
|-----------------|---------------------|
| `Ctrl + K`      | Search messages     |
| `Ctrl + B`      | Bold text           |
| `Ctrl + I`      | Italic text         |
| `Escape`        | Close panel / Cancel|
| `Enter`         | Send message        |
| `Shift + Enter` | New line            |
| `@ + name`      | Mention a user      |
| `?`             | Show shortcuts help |

## Roles

| Role     | Color  | Can do                                          |
|----------|--------|------------------------------------------------|
| Admin    | Gold   | Everything — manage users, channels, files, config |
| Operator | Blue   | Kick/ban, manage channels, upload files          |
| Member   | Gray   | Chat, download files, join channels              |
| Guest    | Dim    | Chat in #lobby only                              |

## Internationalization (i18n)

The client ships with English (`en`) and French (`fr`). Language is auto-detected from the system and can be changed manually via the dropdown in the sidebar.

### Adding a new language

1. Copy `client/src/i18n/locales/en/` to `client/src/i18n/locales/{code}/`
2. Translate `translation.json`
3. Register it in `client/src/i18n/index.ts`:
   ```ts
   import xx from "./locales/xx/translation.json";
   // In resources:
   xx: { translation: xx },
   ```
4. Add it to `client/src/components/LanguageSelector.tsx`:
   ```ts
   { code: "xx", label: "Language Name", flag: "🏳️" },
   ```

## Protocol

See [protocol/PROTOCOL.md](protocol/PROTOCOL.md) for the full protocol specification.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Server    | Go 1.22+, gorilla/websocket, modernc.org/sqlite |
| Client    | Tauri 1.x, React 18, TypeScript, Vite |
| Crypto    | Ed25519 (Go stdlib / tweetnacl.js) |
| i18n      | react-i18next |
| Icons     | Lucide React |
| CSS       | Custom properties design system, component-scoped styles |

## Project Structure

```
├── server/                     # Go server
│   ├── cmd/hotline-server/     # Entry point
│   └── internal/
│       ├── auth/               # Ed25519 verification
│       ├── chat/               # Chat + channel logic
│       ├── db/                 # SQLite schema + queries
│       ├── files/              # HTTP file server
│       ├── hub/                # WebSocket hub
│       └── permissions/        # Role-based access control
├── client/                     # Tauri + React client
│   ├── src-tauri/              # Rust backend
│   └── src/
│       ├── components/         # React UI components (30+)
│       ├── hooks/              # useWebSocket, useIdentity, useIdleDetection, etc.
│       ├── i18n/               # i18next config + EN/FR translations
│       ├── lib/                # Protocol types, Ed25519 crypto
│       └── styles/             # Global CSS design system
├── protocol/
│   └── PROTOCOL.md             # Protocol specification
└── README.md
```

## License

MIT
