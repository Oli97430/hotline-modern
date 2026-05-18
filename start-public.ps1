# start-public.ps1 — Start Hotline server + tracker + Cloudflare tunnels
# Usage: powershell -ExecutionPolicy Bypass -File start-public.ps1

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

# --- Start tracker ---
Write-Host "`n[1/5] Starting tracker..." -ForegroundColor Yellow
$tracker = Start-Process -FilePath "$ROOT\hotline-tracker.exe" -ArgumentList "-addr :9997" -PassThru
Start-Sleep -Seconds 1
Write-Host "  Tracker PID: $($tracker.Id)" -ForegroundColor Green

# --- Start tunnels ---
Write-Host "`n[2/5] Starting Cloudflare tunnels..." -ForegroundColor Yellow

$trackerLog = Join-Path $ROOT "tunnel-tracker.log"
$wsLog = Join-Path $ROOT "tunnel-ws.log"

# Clear old logs
"" | Set-Content $trackerLog
"" | Set-Content $wsLog

$tunnelTracker = Start-Process -FilePath "$ROOT\cloudflared.exe" `
    -ArgumentList "tunnel","--url","http://localhost:9997" `
    -PassThru -RedirectStandardError $trackerLog
Start-Sleep -Seconds 2

$tunnelWs = Start-Process -FilePath "$ROOT\cloudflared.exe" `
    -ArgumentList "tunnel","--url","http://localhost:9998" `
    -PassThru -RedirectStandardError $wsLog

# Wait for tunnel URLs to appear
Write-Host "  Waiting for tunnel URLs..." -ForegroundColor Gray
$trackerUrl = ""
$wsUrl = ""
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    if (-not $trackerUrl) {
        $match = Select-String -Path $trackerLog -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($match) { $trackerUrl = $match.Matches[0].Value }
    }
    if (-not $wsUrl) {
        $match = Select-String -Path $wsLog -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($match) { $wsUrl = $match.Matches[0].Value }
    }
    if ($trackerUrl -and $wsUrl) { break }
}

if (-not $trackerUrl -or -not $wsUrl) {
    Write-Host "  ERROR: Could not get tunnel URLs after 30s" -ForegroundColor Red
    exit 1
}

# Extract WSS hostname for server registration
$wsHost = ($wsUrl -replace 'https://', '')
$wssUrl = "wss://$wsHost/ws"

Write-Host "  Tracker tunnel: $trackerUrl" -ForegroundColor Green
Write-Host "  Server tunnel:  $wssUrl" -ForegroundColor Green

# --- Start server with tunnel addresses ---
Write-Host "`n[3/5] Starting Hotline server..." -ForegroundColor Yellow
$serverArgs = "-data `"$dataDir`" -name `"Hotline Server`" -agreement `"$agreementFile`" -tracker `"$trackerUrl`" -public-addr `"$wsHost`" -public-port 443"
$server = Start-Process -FilePath "$ROOT\hotline-server.exe" -ArgumentList $serverArgs -PassThru
Start-Sleep -Seconds 2
Write-Host "  Server PID: $($server.Id)" -ForegroundColor Green

# --- Update public-config.json ---
Write-Host "`n[4/5] Updating public-config.json..." -ForegroundColor Yellow
$config = @{
    tracker = $trackerUrl
    server  = $wssUrl
    updated = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
} | ConvertTo-Json
Set-Content -Path "$ROOT\public-config.json" -Value $config -Encoding utf8
Write-Host "  Config updated" -ForegroundColor Green

# --- Git push config ---
Write-Host "`n[5/5] Pushing config to GitHub..." -ForegroundColor Yellow
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
Write-Host " Tracker : $trackerUrl" -ForegroundColor White
Write-Host " Server  : $wssUrl" -ForegroundColor White
Write-Host ""
Write-Host " Share this with anyone:" -ForegroundColor Gray
Write-Host " The app auto-discovers the server via GitHub." -ForegroundColor Gray
Write-Host ""
Write-Host " Press Ctrl+C to stop everything." -ForegroundColor DarkGray
Write-Host ""

# --- Keep alive and cleanup on exit ---
try {
    while ($true) { Start-Sleep -Seconds 60 }
} finally {
    Write-Host "`nShutting down..." -ForegroundColor Yellow
    foreach ($proc in $server, $tracker, $tunnelTracker, $tunnelWs) {
        if ($proc -and -not $proc.HasExited) {
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
        }
    }
    Write-Host "All services stopped." -ForegroundColor Green
}
