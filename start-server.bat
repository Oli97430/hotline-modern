@echo off
chcp 65001 >nul
title Hotline Modern Server
cd /d "%~dp0"
taskkill /f /im hotline-server.exe >nul 2>&1
timeout /t 1 /nobreak >nul
hotline-server.exe -addr ":9998" -data "./data" -name "Hotline Server" -motd "Welcome to Hotline Modern!" -desc "Hotline Modern server"
echo.
echo Le serveur s'est arrete.
pause
