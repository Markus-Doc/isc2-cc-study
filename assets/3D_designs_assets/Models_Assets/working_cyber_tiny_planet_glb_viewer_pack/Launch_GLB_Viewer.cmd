@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Launch_GLB_Viewer.ps1" %*
if errorlevel 1 pause
