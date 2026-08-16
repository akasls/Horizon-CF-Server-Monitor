$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root "Horizon-CF-Server-Monitor.zip"

$inputs = @(
  "index.html",
  "assets/app.css",
  "assets/app.js",
  "assets/logo.svg",
  "docs/preview.svg",
  "README.md"
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

if (Test-Path $output) {
  Remove-Item $output -Force
}

$archive = [System.IO.Compression.ZipFile]::Open($output, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($relativePath in $inputs) {
    $sourcePath = Join-Path $root $relativePath
    if (-not (Test-Path $sourcePath)) {
      Write-Warning "Skipping missing file: $relativePath"
      continue
    }

    $entryName = $relativePath -replace "\\", "/"
    $entry = $archive.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)

    $sourceStream = [System.IO.File]::OpenRead($sourcePath)
    $targetStream = $entry.Open()
    try {
      $sourceStream.CopyTo($targetStream)
    } finally {
      $targetStream.Dispose()
      $sourceStream.Dispose()
    }
  }
} finally {
  $archive.Dispose()
}

Write-Host "Created theme release package: $output"
