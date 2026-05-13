Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

$currentPid = $PID
$matches = Get-CimInstance Win32_Process | Where-Object {
  $_.ProcessId -ne $currentPid -and
  $_.CommandLine -and
  $_.CommandLine.Contains('Start_Local_GLB_Server.ps1')
}

if (-not $matches) {
  Write-Host 'No local GLB viewer server processes found.'
  exit 0
}

foreach ($proc in $matches) {
  Write-Host "Stopping local GLB viewer server PID $($proc.ProcessId)"
  Stop-Process -Id $proc.ProcessId -Force
}

Write-Host 'Done.'
