Add-Type -AssemblyName System.Drawing

$crops = @(
    @{
        Source = "assets/images/blog/test-sunset-fenster.jpg"
        Target = "assets/images/blog/heat-transfer-main.jpg"
        CropCenterY = 0.38
    },
    @{
        Source = "assets/images/blog/test-eck.jpg"
        Target = "assets/images/blog/heat-transfer-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-modern-house.jpg"
        Target = "assets/images/blog/double-vs-triple-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-dreifach.jpg"
        Target = "assets/images/blog/double-vs-triple-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-sunset.jpg"
        Target = "assets/images/blog/warning-signs-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-decay.jpg"
        Target = "assets/images/blog/warning-signs-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-garden-window.jpg"
        Target = "assets/images/blog/u-factor-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-sky-reflected.jpg"
        Target = "assets/images/blog/u-factor-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-casement.jpg"
        Target = "assets/images/blog/casement-vs-doublehung-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-doublehung.jpg"
        Target = "assets/images/blog/casement-vs-doublehung-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-usmc.jpg"
        Target = "assets/images/blog/prepare-installation-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-staging.jpg"
        Target = "assets/images/blog/prepare-installation-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-profile.jpg"
        Target = "assets/images/blog/frame-materials-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-5chamber.jpg"
        Target = "assets/images/blog/frame-materials-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-winter-kitchen.jpg"
        Target = "assets/images/blog/reduce-drafts-main.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-euro68-2.jpg"
        Target = "assets/images/blog/reduce-drafts-secondary.jpg"
        CropCenterY = 0.50
    },
    @{
        Source = "assets/images/blog/test-modern-dusk.jpg"
        Target = "assets/images/blog/replacement-costs-secondary.jpg"
        CropCenterY = 0.50
    }
)

$targetW = 1600
$targetH = 900
$targetAspect = [double]$targetW / [double]$targetH

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

foreach ($item in $crops) {
    $srcPath = Join-Path $PSScriptRoot "..\$($item.Source)"
    $dstPath = Join-Path $PSScriptRoot "..\$($item.Target)"

    if (-not (Test-Path $srcPath)) {
        Write-Error "Source file missing: $srcPath"
        continue
    }

    Write-Host "Processing $($item.Source) -> $($item.Target)"
    $srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $srcW = $srcBmp.Width
    $srcH = $srcBmp.Height
    $srcAspect = [double]$srcW / [double]$srcH

    $cropCenterY = if ($item.CropCenterY) { $item.CropCenterY } else { 0.5 }

    if ($srcAspect -gt $targetAspect) {
        # Source is wider than target aspect: crop width
        $cropH = $srcH
        $cropW = [int]($srcH * $targetAspect)
        $cropX = [int](($srcW - $cropW) / 2)
        $cropY = 0
    } else {
        # Source is taller than target aspect: crop height
        $cropW = $srcW
        $cropH = [int]($srcW / $targetAspect)
        $cropX = 0
        $cropY = [int](($srcH * $cropCenterY) - ($cropH / 2))
        if ($cropY -lt 0) { $cropY = 0 }
        if (($cropY + $cropH) -gt $srcH) { $cropY = $srcH - $cropH }
    }

    $destBmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $graphics = [System.Drawing.Graphics]::FromImage($destBmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $graphics.DrawImage($srcBmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $srcBmp.Dispose()
    $graphics.Dispose()

    # Save to temp then move to prevent file lock
    $tempPath = "$dstPath.tmp.jpg"
    $destBmp.Save($tempPath, $jpegEncoder, $encoderParams)
    $destBmp.Dispose()

    Move-Item -Path $tempPath -Destination $dstPath -Force
    $size = (Get-Item $dstPath).Length
    Write-Host "Saved $dstPath ($([math]::Round($size / 1KB, 1)) KB)"
}

Write-Host "All crops processed successfully!"
