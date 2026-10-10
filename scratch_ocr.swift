import Foundation
import Vision
import AppKit

let fm = FileManager.default
let mediaDir = URL(fileURLWithPath: "public/media")
let files = try! fm.contentsOfDirectory(at: mediaDir, includingPropertiesForKeys: nil)

for file in files.sorted(by: { $0.lastPathComponent < $1.lastPathComponent }) {
    if !["jpeg", "jpg", "png"].contains(file.pathExtension.lowercased()) { continue }
    guard let img = NSImage(contentsOf: file),
          let cgImg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .fast
    let handler = VNImageRequestHandler(cgImage: cgImg, options: [:])
    try? handler.perform([request])
    
    let texts = (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
    print("FILE: \(file.lastPathComponent)")
    print("TEXT: " + texts.prefix(10).joined(separator: " | "))
}
