param(
  [Parameter(Mandatory = $true)]
  [string]$Root,

  [Parameter(Mandatory = $true)]
  [string]$ViewerFile,

  [int]$Port = 8877,

  [string]$Log = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-LogLine {
  param([string]$Message)
  $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $Message"
  Write-Host $line
  if ($Log) {
    Add-Content -LiteralPath $Log -Value $line -Encoding UTF8
  }
}

function Get-ContentType {
  param([string]$Path)
  $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  switch ($ext) {
    '.html' { return 'text/html; charset=utf-8' }
    '.htm'  { return 'text/html; charset=utf-8' }
    '.js'   { return 'text/javascript; charset=utf-8' }
    '.css'  { return 'text/css; charset=utf-8' }
    '.json' { return 'application/json; charset=utf-8' }
    '.glb'  { return 'model/gltf-binary' }
    '.gltf' { return 'model/gltf+json' }
    '.bin'  { return 'application/octet-stream' }
    '.png'  { return 'image/png' }
    '.jpg'  { return 'image/jpeg' }
    '.jpeg' { return 'image/jpeg' }
    '.webp' { return 'image/webp' }
    default { return 'application/octet-stream' }
  }
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType
  )

  $headerText = @(
    "HTTP/1.1 $StatusCode $StatusText"
    "Content-Type: $ContentType"
    "Content-Length: $($Body.Length)"
    "Access-Control-Allow-Origin: *"
    "Cache-Control: no-cache"
    "Connection: close"
    ""
    ""
  ) -join "`r`n"

  $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headerText)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

$Root = [System.IO.Path]::GetFullPath($Root)
$ViewerFile = [System.IO.Path]::GetFullPath($ViewerFile)
if (-not (Test-Path -LiteralPath $Root)) {
  throw "Root folder not found: $Root"
}
if (-not (Test-Path -LiteralPath $ViewerFile)) {
  throw "Viewer file not found: $ViewerFile"
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-LogLine "Serving root: $Root"
Write-LogLine "Serving viewer: $ViewerFile"
Write-LogLine "Listening: http://127.0.0.1:$Port/"

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII)
      $requestLine = $reader.ReadLine()

      while ($true) {
        $line = $reader.ReadLine()
        if ($null -eq $line -or $line.Length -eq 0) {
          break
        }
      }

      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      $parts = $requestLine.Split(' ')
      if ($parts.Count -lt 2) {
        continue
      }

      $rawPath = $parts[1]
      $pathOnly = $rawPath.Split('?')[0]
      if ($pathOnly -eq '/' -or $pathOnly -eq '/glb_viewer.html') {
        $filePath = $ViewerFile
      } else {
        $relative = [System.Uri]::UnescapeDataString($pathOnly.TrimStart('/')).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $candidate = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $relative))
        if (-not $candidate.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
          $body = [System.Text.Encoding]::UTF8.GetBytes('403 Forbidden')
          Send-Response -Stream $stream -StatusCode 403 -StatusText 'Forbidden' -Body $body -ContentType 'text/plain; charset=utf-8'
          continue
        }
        $filePath = $candidate
      }

      if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $pathOnly")
        Send-Response -Stream $stream -StatusCode 404 -StatusText 'Not Found' -Body $body -ContentType 'text/plain; charset=utf-8'
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      Send-Response -Stream $stream -StatusCode 200 -StatusText 'OK' -Body $bytes -ContentType (Get-ContentType -Path $filePath)
    } catch {
      try {
        $body = [System.Text.Encoding]::UTF8.GetBytes("500 Error: $($_.Exception.Message)")
        Send-Response -Stream $stream -StatusCode 500 -StatusText 'Error' -Body $body -ContentType 'text/plain; charset=utf-8'
      } catch {}
      Write-LogLine "Request error: $($_.Exception.Message)"
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
