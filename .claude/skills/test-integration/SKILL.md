---
name: test-integration
description: Start fresh server infrastructure and run the full multi-user WebSocket integration test suite.
disable-model-invocation: true
---

# /test-integration

Run the complete multi-user integration test suite for Hotline Modern.

## Usage

```
/test-integration
```

## Steps

### 1. Kill existing processes

Stop any running hotline-server, hotline-tracker, or Vite processes on ports 9997, 9998, 9999, 1420.

### 2. Rebuild binaries

```bash
cd server
go build -o hotline-server.exe ./cmd/hotline-server
go build -o hotline-tracker.exe ./cmd/hotline-tracker
```

### 3. Start infrastructure with fresh data

Create a unique temp data directory to ensure a clean state (no existing users/channels).

```bash
# Start tracker
./server/hotline-tracker.exe -addr :9997 &

# Start server with fresh data dir
TEMP_DATA=$(mktemp -d)
./server/hotline-server.exe \
  -addr :9998 \
  -name "Test Server" \
  -agreement data/agreement.txt \
  -tracker http://localhost:9997 \
  -data "$TEMP_DATA" &
```

Wait 2 seconds for startup, then verify both are listening.

### 4. Install test dependencies

```bash
npm install ws tweetnacl tweetnacl-util
```

### 5. Run test suite

```bash
node test-multi.mjs
```

### 6. Report results

- Display the full test results table
- If any tests fail, analyze the failure and suggest fixes
- Clean up: kill server and tracker processes
- Remove temp data directory

### 7. Also run client unit tests

```bash
cd client && npm test
```

Report combined results from both test suites.

## Key test areas covered

- Tracker health & server registration
- Ed25519 authentication with nonce challenge
- Server agreement delivery
- User list with boxPublicKey (E2E encryption keys)
- Channel create, join, password-protected channels
- Chat messages, rich text, edit, delete
- Reactions, pins
- Read receipts
- Typing indicators
- User status changes
- Direct messages (plaintext)
- E2E encrypted DMs (NaCl box encrypt/decrypt roundtrip)
- Voice messages (msgType persistence)
- Chat history & search
- Nick changes
- Disconnect/reconnect
- 3-user concurrency
