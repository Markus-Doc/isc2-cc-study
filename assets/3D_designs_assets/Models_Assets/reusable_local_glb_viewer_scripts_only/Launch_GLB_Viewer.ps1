param(
  [string]$Model = "",
  [int]$Port = 8877
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-LocalPortOpen {
  param([int]$PortToTest)
  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $async = $client.BeginConnect('127.0.0.1', $PortToTest, $null, $null)
    $ok = $async.AsyncWaitHandle.WaitOne(250)
    if (-not $ok) {
      return $false
    }
    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    $client.Close()
  }
}

function Get-FreePort {
  param([int]$StartPort)
  foreach ($candidate in $StartPort..8899) {
    if (-not (Test-LocalPortOpen -PortToTest $candidate)) {
      return $candidate
    }
  }
  throw 'No free local port found from 8877 to 8899.'
}

function Get-PowerShellExe {
  $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
  if ($pwsh) {
    return $pwsh.Source
  }
  $windowsPowerShell = Get-Command powershell -ErrorAction SilentlyContinue
  if ($windowsPowerShell) {
    return $windowsPowerShell.Source
  }
  throw 'PowerShell executable was not found.'
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ViewerFile = Join-Path $ScriptDir 'glb_viewer.html'
$ServerScript = Join-Path $ScriptDir 'Start_Local_GLB_Server.ps1'
$LogDir = Join-Path $ScriptDir '_viewer_logs'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$LaunchLog = Join-Path $LogDir ("launch_" + (Get-Date -Format 'yyyyMMdd_HHmmss') + ".log")
$ServerLog = Join-Path $LogDir ("server_" + (Get-Date -Format 'yyyyMMdd_HHmmss') + ".log")

& {
  Write-Host 'Local GLB Viewer launcher'
  Write-Host "Script folder: $ScriptDir"

  if (-not (Test-Path -LiteralPath $ViewerFile)) {
    throw "Viewer file missing: $ViewerFile"
  }
  if (-not (Test-Path -LiteralPath $ServerScript)) {
    throw "Server script missing: $ServerScript"
  }

  if ([string]::IsNullOrWhiteSpace($Model)) {
    $preferred = Join-Path $ScriptDir 'cyber_tiny_planet_lively_full.glb'
    if (Test-Path -LiteralPath $preferred) {
      $ModelPath = $preferred
    } else {
      $candidate = Get-ChildItem -LiteralPath $ScriptDir -Filter '*.glb' -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1
      if (-not $candidate) {
        throw "No GLB file found beside the viewer scripts. Put a .glb file in this folder or run with -Model."
      }
      $ModelPath = $candidate.FullName
    }
  } else {
    if ([System.IO.Path]::IsPathRooted($Model)) {
      $ModelPath = [System.IO.Path]::GetFullPath($Model)
    } else {
      $ModelPath = [System.IO.Path]::GetFullPath((Join-Path $ScriptDir $Model))
    }
    if (-not (Test-Path -LiteralPath $ModelPath)) {
      throw "Model not found: $ModelPath"
    }
  }

  $ModelDir = Split-Path -Parent $ModelPath
  $ModelFile = Split-Path -Leaf $ModelPath
  $UsePort = Get-FreePort -StartPort $Port
  $PowerShellExe = Get-PowerShellExe

  Write-Host "Model: $ModelPath"
  Write-Host "Serving folder: $ModelDir"
  Write-Host "Port: $UsePort"
  Write-Host "Server log: $ServerLog"

  $args = @(
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', $ServerScript,
    '-Root', $ModelDir,
    '-ViewerFile', $ViewerFile,
    '-Port', $UsePort,
    '-Log', $ServerLog
  )

  Start-Process -FilePath $PowerShellExe -ArgumentList $args -WindowStyle Minimized

  $ready = $false
  for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Milliseconds 250
    if (Test-LocalPortOpen -PortToTest $UsePort) {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    throw "The local server did not start. Check: $ServerLog"
  }

  Add-Type -AssemblyName System.Web
  $encodedModel = [System.Web.HttpUtility]::UrlEncode($ModelFile)
  $url = "http://127.0.0.1:$UsePort/glb_viewer.html?model=$encodedModel"
  Write-Host "Opening: $url"
  Start-Process $url
  Write-Host 'Done. Keep the small PowerShell server window running while viewing.'
} 2>&1 | Tee-Object -FilePath $LaunchLog

try {
  Get-Content -LiteralPath $LaunchLog -Raw | Set-Clipboard
  Write-Host "Launch log copied to clipboard: $LaunchLog"
} catch {
  Write-Host "Launch log saved: $LaunchLog"
}
