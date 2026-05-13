Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.OpenFileDialog
$dialog.Title = 'Select a GLB file to view'
$dialog.Filter = 'GLB files (*.glb)|*.glb|All files (*.*)|*.*'
$dialog.Multiselect = $false
$dialog.InitialDirectory = $ScriptDir

$result = $dialog.ShowDialog()
if ($result -ne [System.Windows.Forms.DialogResult]::OK) {
  Write-Host 'No file selected.'
  exit 0
}

& (Join-Path $ScriptDir 'Launch_GLB_Viewer.ps1') -Model $dialog.FileName
