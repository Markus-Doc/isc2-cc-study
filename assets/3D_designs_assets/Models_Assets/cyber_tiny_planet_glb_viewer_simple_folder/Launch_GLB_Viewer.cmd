@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0View_GLB_Model.ps1"
echo.
echo Viewer closed. Press any key to exit.
pause >nul
