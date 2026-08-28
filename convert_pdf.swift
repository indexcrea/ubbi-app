import AppKit
import PDFKit

let pdfPath = "/Users/mac/.gemini/antigravity-ide/brain/41eeb22f-b662-4cc1-b55b-b44c3c3deb5f/media__1787712696360.pdf"
let outPath = "/Users/mac/Desktop/SITE/public/official-ubbi-logo.png"

guard let pdfUrl = URL(string: "file://" + pdfPath),
      let doc = PDFDocument(url: pdfUrl),
      let page = doc.page(at: 0) else {
    print("Failed to open PDF")
    exit(1)
}

let bounds = page.bounds(for: .mediaBox)
let scale: CGFloat = 3.0
let targetSize = NSSize(width: bounds.width * scale, height: bounds.height * scale)

let img = NSImage(size: targetSize)
img.lockFocus()
if let context = NSGraphicsContext.current?.cgContext {
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
}
img.unlockFocus()

if let tiffData = img.tiffRepresentation,
   let bitmap = NSBitmapImageRep(data: tiffData),
   let pngData = bitmap.representation(using: .png, properties: [:]) {
    try? pngData.write(to: URL(fileURLWithPath: outPath))
    print("SUCCESS: Exported official logo PNG to", outPath)
} else {
    print("Failed to create PNG representation")
}
