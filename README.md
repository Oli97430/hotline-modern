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

- **Chat** — Real-time messaging with channels. Default `#lobby` channel.
- **Channels** — Create and manage channels (admin/operator).
- **File sharing** — Browse, upload, and download files via the built-in file server.
- **Roles** — 4-level hierarchy: admin > operator > member > guest.
- **Portable identity** — Ed25519 key pair generated at first launch. Same key works on any server.
- **i18n** — English and French. Auto-detects system language with manual override.

## Slash Commands

Type these in the chat input:

| Command             | Role     | Description                |
|---------------------|----------|----------------------------|
| `/kick <nickname>`  | op/admin | Kick a user                |
| `/ban <nickname>`   | op/admin | Ban a user (demote to guest + disconnect) |
| `/op <nickname>`    | admin    | Promote to operator        |
| `/deop <nickname>`  | admin    | Demote to member           |
| `/topic <text>`     | op/admin | Set channel topic          |

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
│       ├── components/         # React UI components
│       ├── hooks/              # useWebSocket, useIdentity
│       ├── i18n/               # i18next config + translations
│       ├── lib/                # Protocol types, Ed25519 crypto
│       └── styles/             # Global CSS
├── protocol/
│   └── PROTOCOL.md             # Protocol specification
└── README.md
```

## License

MIT
