# View_GLB_Model.ps1
# Keep this file beside one or more .glb files.
# Launch it with Launch_GLB_Viewer.cmd.

$ErrorActionPreference = 'Stop'

function Write-ViewerLog {
    param([string]$Message)
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $line = "[$stamp] $Message"
    Write-Host $line
    Add-Content -Path $script:LogPath -Value $line -Encoding UTF8
}

function Get-FreeViewerPort {
    foreach ($candidate in 8877..8899) {
        $listener = $null
        try {
            $address = [System.Net.IPAddress]::Parse('127.0.0.1')
            $listener = New-Object System.Net.Sockets.TcpListener $address, $candidate
            $listener.Start()
            $listener.Stop()
            return $candidate
        }
        catch {
            if ($listener) {
                try {
                    $listener.Stop()
                }
                catch {
                }
            }
        }
    }
    throw 'No free local viewer port found from 8877 to 8899'
}

function Get-PythonCommand {
    $pyLauncher = Get-Command py -ErrorAction SilentlyContinue
    if ($pyLauncher) {
        return @($pyLauncher.Source, @('-3'))
    }

    $python = Get-Command python -ErrorAction SilentlyContinue
    if ($python) {
        return @($python.Source, @())
    }

    $python3 = Get-Command python3 -ErrorAction SilentlyContinue
    if ($python3) {
        return @($python3.Source, @())
    }

    return $null
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ScriptDir)) {
    $ScriptDir = (Get-Location).Path
}

$LogPath = Join-Path $ScriptDir ("glb_viewer_log_" + (Get-Date -Format 'yyyyMMdd_HHmmss') + ".txt")
Write-ViewerLog 'Starting GLB viewer'
Write-ViewerLog "Folder: $ScriptDir"

$assets = Get-ChildItem -Path $ScriptDir -Filter '*.glb' -File | Sort-Object Name
if ($assets.Count -eq 0) {
    throw "No .glb file found in $ScriptDir"
}

if ($assets.Count -eq 1) {
    $Asset = $assets[0]
}
else {
    Write-ViewerLog 'Multiple GLB files found'
    for ($i = 0; $i -lt $assets.Count; $i++) {
        Write-Host "[$i] $($assets[$i].Name)"
    }
    $choice = Read-Host 'Enter the number of the GLB file to view'
    if ($choice -notmatch '^\d+$') {
        throw 'Invalid selection'
    }
    $index = [int]$choice
    if ($index -lt 0 -or $index -ge $assets.Count) {
        throw 'Selection is outside the available range'
    }
    $Asset = $assets[$index]
}

$AssetName = $Asset.Name
$Port = Get-FreeViewerPort
$ViewerFile = Join-Path $ScriptDir '_glb_viewer_index.html'
$UrlAsset = [System.Uri]::EscapeDataString($AssetName)
$Url = "http://127.0.0.1:$Port/_glb_viewer_index.html"

Write-ViewerLog "Model: $AssetName"
Write-ViewerLog "Port: $Port"
Write-ViewerLog "Viewer URL: $Url"

$Html = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Local GLB Viewer</title>
<script type="module">
const statusEl = document.getElementById('status')
const sources = [
  'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js',
  'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
]
let loaded = false
for (const src of sources) {
  try {
    await import(src)
    loaded = true
    break
  }
  catch (err) {
    console.warn('model-viewer failed from', src, err)
  }
}
if (loaded) {
  statusEl.textContent = 'Loaded: $AssetName'
}
else {
  statusEl.textContent = 'Could not load model-viewer from the internet. Check browser internet access, then refresh.'
}
</script>
<style>
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: #070b18;
  overflow: hidden;
}
model-viewer {
  width: 100vw;
  height: 100vh;
}
.panel {
  position: fixed;
  left: 14px;
  bottom: 14px;
  max-width: 620px;
  color: #d7f7ff;
  background: rgba(0, 0, 0, 0.56);
  border: 1px solid rgba(120, 235, 255, 0.35);
  border-radius: 12px;
  padding: 10px 12px;
  font-family: system-ui, Segoe UI, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.4;
}
.name {
  font-weight: 700;
}
</style>
</head>
<body>
<model-viewer
  src="$UrlAsset"
  camera-controls
  auto-rotate
  shadow-intensity="1"
  exposure="1.15"
  environment-image="neutral"
  alt="Local GLB asset">
</model-viewer>
<div class="panel">
  <div class="name">Local GLB Viewer</div>
  <div id="status">Loading model-viewer...</div>
  <div>Drag to orbit. Scroll to zoom. Right click drag to pan.</div>
  <div>Leave this command window open while viewing. Press Enter here to stop the server.</div>
</div>
</body>
</html>
"@

Set-Content -Path $ViewerFile -Value $Html -Encoding UTF8
Write-ViewerLog "Viewer HTML written: $ViewerFile"

$pythonInfo = Get-PythonCommand
$ServerProcess = $null

try {
    if (-not $pythonInfo) {
        throw 'Python was not found. Install Python or use Windows 3D Viewer for this GLB file.'
    }

    $PythonExe = $pythonInfo[0]
    $PythonPrefixArgs = $pythonInfo[1]
    $AllArgs = @()
    $AllArgs += $PythonPrefixArgs
    $AllArgs += @('-m', 'http.server', [string]$Port, '--bind', '127.0.0.1')

    Write-ViewerLog "Python: $PythonExe"
    Write-ViewerLog "Starting local HTTP server"

    $ServerProcess = Start-Process -FilePath $PythonExe -ArgumentList $AllArgs -WorkingDirectory $ScriptDir -PassThru -WindowStyle Minimized
    Start-Sleep -Seconds 2

    Set-Clipboard -Value $Url
    Write-ViewerLog 'Viewer URL copied to clipboard'
    Write-ViewerLog 'Opening browser'
    Start-Process $Url

    Write-Host ''
    Write-Host 'Viewer is running.'
    Write-Host 'Do not close this window while viewing the model.'
    Write-Host 'Press Enter here when finished to stop the local server.'
    Read-Host | Out-Null
}
finally {
    if ($ServerProcess -and -not $ServerProcess.HasExited) {
        Write-ViewerLog 'Stopping local HTTP server'
        Stop-Process -Id $ServerProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Write-ViewerLog "Log saved: $LogPath"
}
