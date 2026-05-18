# start-public.ps1 — Start Hotline server + Cloudflare tunnel
# Usage: powershell -ExecutionPolicy Bypass -File start-public.ps1
#
# The unified server runs everything on one port (9998):
#   - WebSocket (/ws)
#   - File server (/files/)
#   - Embedded tracker (/register, /servers)

$ErrorActionPreference = "Continue"
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n=== Hotline Modern — Public Server Launch ===" -ForegroundColor Cyan

# --- Kill previous instances ---
foreach ($name in "hotline-server", "hotline-tracker", "cloudflared") {
    Get-Process -Name $name -ErrorAction SilentlyContinue | Stop-Process -Force -Confirm:$false
}
Start-Sleep -Seconds 2

# --- Ensure data directory ---
$dataDir = Join-Path $ROOT "data"
if (-not (Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir -Force | Out-Null }
$agreementFile = Join-Path $dataDir "agreement.txt"
if (-not (Test-Path $agreementFile)) {
    Set-Content -Path $agreementFile -Value "Welcome to Hotline Modern! Be respectful and have fun." -Encoding utf8
}

# --- Start Cloudflare tunnel (single tunnel for everything) ---
Write-Host "`n[1/4] Starting Cloudflare tunnel..." -ForegroundColor Yellow

$tunnelLog = Join-Path $ROOT "tunnel.log"
"" | Set-Content $tunnelLog

$tunnel = Start-Process -FilePath "$ROOT\cloudflared.exe" `
    -ArgumentList "tunnel","--url","http://localhost:9998" `
    -PassThru -RedirectStandardError $tunnelLog

# Wait for tunnel URL to appear
Write-Host "  Waiting for tunnel URL..." -ForegroundColor Gray
$tunnelUrl = ""
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    $match = Select-String -Path $tunnelLog -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($match) {
        $tunnelUrl = $match.Matches[0].Value
        break
    }
}

if (-not $tunnelUrl) {
    Write-Host "  ERROR: Could not get tunnel URL after 30s" -ForegroundColor Red
    exit 1
}

$tunnelHost = ($tunnelUrl -replace 'https://', '')
$wssUrl = "wss://$tunnelHost/ws"

Write-Host "  Tunnel: $tunnelUrl" -ForegroundColor Green

# --- Start unified server ---
Write-Host "`n[2/4] Starting Hotline server (WebSocket + Files + Tracker)..." -ForegroundColor Yellow
$serverArgs = "-data `"$dataDir`" -name `"Hotline Server`" -agreement `"$agreementFile`" -public-addr `"$tunnelHost`" -public-port 443 -desc `"Hotline Modern public server`""
$server = Start-Process -FilePath "$ROOT\hotline-server.exe" -ArgumentList $serverArgs -PassThru
Start-Sleep -Seconds 3

if ($server.HasExited) {
    Write-Host "  ERROR: Server failed to start (exit code: $($server.ExitCode))" -ForegroundColor Red
    exit 1
}
Write-Host "  Server PID: $($server.Id)" -ForegroundColor Green

# --- Update public-config.json ---
Write-Host "`n[3/4] Updating public-config.json..." -ForegroundColor Yellow
$config = @{
    tracker = $tunnelUrl
    server  = $wssUrl
    updated = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json
Set-Content -Path "$ROOT\public-config.json" -Value $config -Encoding utf8
Write-Host "  Config updated" -ForegroundColor Green

# --- Git push config ---
Write-Host "`n[4/4] Pushing config to GitHub..." -ForegroundColor Yellow
Push-Location $ROOT
git add public-config.json 2>$null
git commit -m "Update public tunnel URLs" 2>$null
git push 2>$null
Pop-Location
Write-Host "  Pushed to GitHub" -ForegroundColor Green

# --- Summary ---
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host " HOTLINE MODERN — PUBLIC SERVER RUNNING" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " Server  : $wssUrl" -ForegroundColor White
Write-Host " Tracker : $tunnelUrl/servers" -ForegroundColor White
Write-Host " Files   : $tunnelUrl/files/" -ForegroundColor White
Write-Host ""
Write-Host " Everything runs on one port, one tunnel." -ForegroundColor Gray
Write-Host " The app auto-discovers the server via GitHub." -ForegroundColor Gray
Write-Host ""
Write-Host " Press Ctrl+C to stop everything." -ForegroundColor DarkGray
Write-Host ""

# --- Keep alive and cleanup on exit ---
try {
    while ($true) { Start-Sleep -Seconds 60 }
} finally {
    Write-Host "`nShutting down..." -ForegroundColor Yellow
    foreach ($proc in $server, $tunnel) {
        if ($proc -and -not $proc.HasExited) {
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
        }
    }
    Write-Host "All services stopped." -ForegroundColor Green
}
