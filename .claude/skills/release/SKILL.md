---
name: release
description: Build all Hotline Modern binaries (server, desktop EXE/MSI, Android APK) and create a GitHub release with all artifacts attached.
disable-model-invocation: true
---

# /release

Build and publish a new Hotline Modern release.

## Usage

```
/release <version>
```

Example: `/release v1.3.0`

## Steps

### 1. Pre-flight checks

- Verify git working tree is clean (`git status --porcelain`)
- Verify current branch is `main`
- Run client tests: `cd client && npm test`
- Run Go vet: `cd server && go vet ./...`

### 2. Version bump

- Update `client/package.json` version field
- Update `client/src-tauri/tauri.conf.json` version field
- Update `client/src-tauri/Cargo.toml` version field
- Commit: `git commit -am "release: <version>"`
- Tag: `git tag <version>`

### 3. Build Go binaries

```bash
cd server
# Windows (unified server: WebSocket + Files + Tracker)
GOOS=windows GOARCH=amd64 go build -o ../builds/hotline-server.exe ./cmd/hotline-server
# Linux
GOOS=linux GOARCH=amd64 go build -o ../builds/hotline-server-linux ./cmd/hotline-server
```

### 4. Build client

```bash
cd client
npm run build
```

### 5. Build Tauri desktop (Windows EXE + MSI)

```bash
cd client
npm run tauri build
```

Copy artifacts from `client/src-tauri/target/release/bundle/` to `builds/`.

### 6. Build Android APK

```bash
cd client
npx cap sync android
cd android
./gradlew assembleRelease
```

Copy APK from `android/app/build/outputs/apk/release/` to `builds/`.

### 7. Create GitHub Release

```bash
git push origin main --tags
gh release create <version> \
  builds/hotline-server.exe \
  builds/hotline-server-linux \
  builds/*.msi \
  builds/*.apk \
  --title "Hotline Modern <version>" \
  --generate-notes
```

### 8. Post-release

- Verify release at the GitHub URL
- Report all artifact sizes
