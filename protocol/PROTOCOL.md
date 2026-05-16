# Hotline Modern Protocol Specification

Version: 0.1.0

## Overview

Hotline Modern uses two communication channels:
- **WebSocket** (default port 9998): Real-time chat, authentication, and channel management
- **HTTP** (default port 9999): File transfers (upload, download, directory listing)

## WebSocket Protocol

### Message Format

Every WebSocket message is a JSON object with this structure:

```json
{
  "type": "string",
  "id": "string",
  "timestamp": 1234567890123,
  "payload": {}
}
```

| Field       | Type   | Description                          |
|-------------|--------|--------------------------------------|
| `type`      | string | Message type identifier              |
| `id`        | string | UUID v4, unique per message          |
| `timestamp` | number | Unix timestamp in milliseconds       |
| `payload`   | object | Type-specific data                   |

### Connection Flow

1. Client opens WebSocket to `ws://{host}:{port}/ws`
2. Server sends `auth.nonce` with a random 32-byte hex nonce
3. Client signs the nonce with its Ed25519 private key
4. Client sends `auth` with public key, signature, nonce, and nickname
5. Server verifies signature and responds with `auth.ok` or `auth.error`
6. On success, client is auto-joined to `#lobby`

### Authentication

#### Server → Client: `auth.nonce`

Sent immediately after WebSocket connection.

```json
{
  "type": "auth.nonce",
  "payload": {
    "nonce": "hex-encoded-32-bytes"
  }
}
```

#### Client → Server: `auth`

```json
{
  "type": "auth",
  "payload": {
    "publicKey": "hex-encoded-ed25519-public-key",
    "signature": "hex-encoded-detached-signature-of-nonce",
    "nonce": "the-nonce-from-server",
    "nickname": "display-name"
  }
}
```

#### Server → Client: `auth.ok`

```json
{
  "type": "auth.ok",
  "payload": {
    "userId": "hex-public-key",
    "role": "admin|operator|member|guest",
    "serverName": "My Server",
    "motd": "Welcome message"
  }
}
```

The first user to connect to a fresh server is automatically assigned the `admin` role.

#### Server → Client: `auth.error`

```json
{
  "type": "auth.error",
  "payload": {
    "reason": "human-readable error"
  }
}
```

### Chat Messages

#### Client → Server: `chat.send`

```json
{
  "type": "chat.send",
  "payload": {
    "channel": "lobby",
    "content": "Hello world"
  }
}
```

#### Server → Client: `chat.message`

Broadcast to all clients in the channel.

```json
{
  "type": "chat.message",
  "payload": {
    "channel": "lobby",
    "userId": "hex-public-key",
    "nickname": "Alice",
    "content": "Hello world",
    "role": "admin"
  }
}
```

### Channel Management

#### Client → Server: `channel.join`

```json
{ "type": "channel.join", "payload": { "channel": "general" } }
```

#### Client → Server: `channel.leave`

```json
{ "type": "channel.leave", "payload": { "channel": "general" } }
```

#### Client → Server: `channel.create` (admin/operator only)

```json
{
  "type": "channel.create",
  "payload": { "name": "general", "topic": "General discussion" }
}
```

#### Client → Server: `channel.list`

Request the current channel list.

```json
{ "type": "channel.list", "payload": {} }
```

#### Server → Client: `channel.list`

```json
{
  "type": "channel.list",
  "payload": {
    "channels": [
      { "name": "lobby", "topic": "Welcome", "userCount": 5 }
    ]
  }
}
```

### User Management

#### Client → Server: `user.list`

```json
{ "type": "user.list", "payload": {} }
```

#### Server → Client: `user.list`

```json
{
  "type": "user.list",
  "payload": {
    "users": [
      { "userId": "hex-key", "nickname": "Alice", "role": "admin", "status": "online" }
    ]
  }
}
```

#### Server → Client: `user.joined`

Broadcast when a user connects and authenticates.

```json
{
  "type": "user.joined",
  "payload": { "userId": "hex-key", "nickname": "Bob", "role": "member" }
}
```

#### Server → Client: `user.left`

Broadcast when a user disconnects.

```json
{
  "type": "user.left",
  "payload": { "userId": "hex-key", "nickname": "Bob" }
}
```

### Admin Commands

#### Client → Server: `admin.kick` (operator/admin)

```json
{ "type": "admin.kick", "payload": { "userId": "hex-key" } }
```

#### Client → Server: `admin.ban` (operator/admin)

Demotes user to `guest` and disconnects them.

```json
{ "type": "admin.ban", "payload": { "userId": "hex-key" } }
```

#### Client → Server: `admin.op` (admin only)

```json
{ "type": "admin.op", "payload": { "userId": "hex-key", "role": "operator" } }
```

#### Client → Server: `admin.topic` (operator/admin)

```json
{ "type": "admin.topic", "payload": { "channel": "lobby", "topic": "New topic" } }
```

#### Server → Client: `user.role_changed`

Broadcast when a user's role changes.

```json
{
  "type": "user.role_changed",
  "payload": { "userId": "hex-key", "role": "operator" }
}
```

### Errors

#### Server → Client: `error`

```json
{
  "type": "error",
  "payload": { "code": "error", "message": "human-readable message" }
}
```

## HTTP File Transfer API

Base URL: `http://{host}:9999`

All requests require authentication headers:
- `X-Hotline-PublicKey`: Hex-encoded Ed25519 public key
- `X-Hotline-Signature`: Hex-encoded signature

### List Directory

```
GET /files/{path}/
```

Response (200):
```json
{
  "path": "documents",
  "entries": [
    { "name": "readme.txt", "size": 1024, "isDir": false, "modified": "2024-01-01T00:00:00Z" },
    { "name": "images", "size": 0, "isDir": true, "modified": "2024-01-01T00:00:00Z" }
  ]
}
```

### Download File

```
GET /files/{path}
```

Supports `Range` headers for resumable downloads.

### Upload File

```
POST /files/{path}
Content-Type: multipart/form-data
```

Form field: `file`

Response (201):
```json
{ "status": "ok", "path": "documents/readme.txt" }
```

## Roles and Permissions

| Permission        | admin | operator | member | guest |
|-------------------|-------|----------|--------|-------|
| Chat (any channel)| yes   | yes      | yes    | no    |
| Chat (#lobby)     | yes   | yes      | yes    | yes   |
| Join channels     | yes   | yes      | yes    | no    |
| Create channels   | yes   | yes      | no     | no    |
| Download files    | yes   | yes      | yes    | no    |
| Upload files      | yes   | yes      | no     | no    |
| Kick users        | yes   | yes      | no     | no    |
| Ban users         | yes   | yes      | no     | no    |
| Set roles         | yes   | no       | no     | no    |

## Identity

- Ed25519 key pair generated client-side
- Public key = persistent user identity across all servers
- Authentication via challenge-response (sign server nonce)
- Nickname is cosmetic; public key is the real identity
