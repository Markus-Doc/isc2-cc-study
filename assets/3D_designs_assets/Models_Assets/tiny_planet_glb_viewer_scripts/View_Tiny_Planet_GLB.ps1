# View_Tiny_Planet_GLB.ps1
# Keep this file in the same folder as tiny_planet_low_poly_asset.glb
# Right click and choose Run with PowerShell, or launch with the included CMD file.

$ErrorActionPreference = 'Stop'

function Write-LogLine {
    param(
        [string]$Message
    )
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $line = "[$stamp] $Message"
    Write-Host $line
    Add-Content -Path $script:LogPath -Value $line -Encoding UTF8
}

function Get-FreeLocalPort {
    foreach ($candidate in 8877..8899) {
        $listener = $null
        try {
            $listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Parse('127.0.0.1')), $candidate
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

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ScriptDir)) {
    $ScriptDir = (Get-Location).Path
}

$LogPath = Join-Path $ScriptDir ("glb_viewer_log_" + (Get-Date -Format 'yyyyMMdd_HHmmss') + ".txt")
$PreferredAsset = Join-Path $ScriptDir 'tiny_planet_low_poly_asset.glb'

Write-LogLine 'Starting local GLB viewer'
Write-LogLine "Script folder: $ScriptDir"

if (Test-Path $PreferredAsset) {
    $AssetPath = $PreferredAsset
}
else {
    $assets = Get-ChildItem -Path $ScriptDir -Filter '*.glb' -File | Sort-Object Name
    if ($assets.Count -eq 1) {
        $AssetPath = $assets[0].FullName
    }
    elseif ($assets.Count -gt 1) {
        Write-LogLine 'Multiple GLB files found in this folder'
        $indices = 0..($assets.Count - 1)
        foreach ($i in $indices) {
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
        $AssetPath = $assets[$index].FullName
    }
    else {
        throw "No GLB file found in $ScriptDir"
    }
}

$AssetName = Split-Path -Leaf $AssetPath
$Port = Get-FreeLocalPort
$Url = "http://127.0.0.1:$Port/viewer.html"

Write-LogLine "Asset: $AssetName"
Write-LogLine "Local URL: $Url"

$ServerJob = Start-Job -ArgumentList $AssetPath, $Port, $AssetName -ScriptBlock {
    param(
        [string]$AssetPath,
        [int]$Port,
        [string]$AssetName
    )

    $listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Parse('127.0.0.1')), $Port
    $listener.Start()

    function Send-Response {
        param(
            [System.Net.Sockets.TcpClient]$Client,
            [byte[]]$Body,
            [string]$ContentType,
            [int]$StatusCode = 200,
            [string]$StatusText = 'OK'
        )
        $stream = $Client.GetStream()
        $header = "HTTP/1.1 $StatusCode $StatusText`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($Body, 0, $Body.Length)
        $stream.Flush()
        $Client.Close()
    }

    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $stream = $client.GetStream()
            $buffer = New-Object byte[] 8192
            $count = $stream.Read($buffer, 0, $buffer.Length)
            if ($count -le 0) {
                $client.Close()
                continue
            }

            $request = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $count)
            $firstLine = ($request -split "`r?`n")[0]
            $parts = $firstLine -split ' '
            $path = '/viewer.html'
            if ($parts.Count -ge 2) {
                $path = [System.Uri]::UnescapeDataString($parts[1])
            }

            if ($path -eq '/' -or $path -eq '/viewer.html') {
                $html = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GLB Viewer - $AssetName</title>
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<style>
html { margin: 0 }
body { margin: 0 }
body { background: #f4f4f4 }
model-viewer { width: 100vw }
model-viewer { height: 100vh }
#hint { position: fixed }
#hint { left: 12px }
#hint { bottom: 12px }
#hint { padding: 10px }
#hint { background: rgba(255,255,255,0.88) }
#hint { font-family: Arial, sans-serif }
#hint { font-size: 13px }
#hint { border-radius: 8px }
</style>
</head>
<body>
<model-viewer src="/asset.glb" camera-controls auto-rotate shadow-intensity="1" exposure="1" ar alt="GLB asset viewer"></model-viewer>
<div id="hint">Drag to orbit. Scroll to zoom. Press Enter in the PowerShell window to stop the viewer.</div>
</body>
</html>
"@
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($html)
                Send-Response -Client $client -Body $bytes -ContentType 'text/html'
            }
            elseif ($path -eq '/asset.glb' -or $path -eq "/$AssetName") {
                $bytes = [System.IO.File]::ReadAllBytes($AssetPath)
                Send-Response -Client $client -Body $bytes -ContentType 'model/gltf-binary'
            }
            else {
                $body = [System.Text.Encoding]::UTF8.GetBytes('Not found')
                Send-Response -Client $client -Body $body -ContentType 'text/plain' -StatusCode 404 -StatusText 'Not Found'
            }
        }
        catch {
            try {
                $body = [System.Text.Encoding]::UTF8.GetBytes($_.Exception.Message)
                Send-Response -Client $client -Body $body -ContentType 'text/plain' -StatusCode 500 -StatusText 'Server Error'
            }
            catch {
                $client.Close()
            }
        }
    }
}

try {
    Start-Sleep -Seconds 1
    Set-Clipboard -Value $Url
    Write-LogLine 'Copied local viewer URL to clipboard'
    Write-LogLine 'Opening browser'
    Start-Process $Url
    Write-Host ''
    Write-Host 'Viewer is running. Press Enter here to stop it.'
    Read-Host | Out-Null
}
finally {
    Write-LogLine 'Stopping local viewer'
    Stop-Job -Job $ServerJob -ErrorAction SilentlyContinue
    Remove-Job -Job $ServerJob -Force -ErrorAction SilentlyContinue
    Write-LogLine "Log saved: $LogPath"
}
