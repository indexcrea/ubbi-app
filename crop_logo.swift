import AppKit

let srcPath = "/Users/mac/Desktop/SITE/public/media__1787712696360.pdf.png"
let dstPath = "/Users/mac/Desktop/SITE/public/ubbi-official-logo.png"

guard let image = NSImage(contentsOfFile: srcPath),
      let tiffData = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiffData) else {
    print("Error loading image")
    exit(1)
}

let width = bitmap.pixelsWide
let height = bitmap.pixelsHigh

var minX = width
var maxX = 0
var minY = height
var maxY = 0

// Find non-white bounding box
for y in 0..<height {
    for x in 0..<width {
        guard let color = bitmap.colorAt(x: x, y: y) else { continue }
        let r = color.redComponent
        let g = color.greenComponent
        let b = color.blueComponent
        
        // If not white
        if r < 0.98 || g < 0.98 || b < 0.98 {
            if x < minX { minX = x }
            if x > maxX { maxX = x }
            if y < minY { minY = y }
            if y > maxY { maxY = y }
        }
    }
}

// Add padding
let padding = 20
minX = max(0, minX - padding)
minY = max(0, minY - padding)
maxX = min(width - 1, maxX + padding)
maxY = min(height - 1, maxY + padding)

let cropW = maxX - minX + 1
let cropH = maxY - minY + 1

print("Bounding box: (\(minX), \(minY), \(cropW), \(cropH))")

let croppedImage = NSImage(size: NSSize(width: cropW, height: cropH))
croppedImage.lockFocus()

let rect = NSRect(x: 0, y: 0, width: cropW, height: cropH)
let fromRect = NSRect(x: minX, y: height - maxY - 1, width: cropW, height: cropH)

image.draw(in: rect, from: fromRect, operation: .copy, fraction: 1.0)
croppedImage.unlockFocus()

if let croppedTiff = croppedImage.tiffRepresentation,
   let croppedBitmap = NSBitmapImageRep(data: croppedTiff),
   let pngData = croppedBitmap.representation(using: .png, properties: [:]) {
    try? pngData.write(to: URL(fileURLWithPath: dstPath))
    print("SUCCESS: Wrote cropped high-res logo to", dstPath)
}
