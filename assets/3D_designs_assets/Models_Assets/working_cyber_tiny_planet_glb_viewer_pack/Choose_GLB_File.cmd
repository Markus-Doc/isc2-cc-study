@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Choose_GLB_File.ps1"
if errorlevel 1 pause
