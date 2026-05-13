@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Stop_GLB_Viewer_Server.ps1"
pause
