@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0View_Tiny_Planet_GLB.ps1"
echo.
echo Viewer closed. Press any key to exit.
pause >nul
