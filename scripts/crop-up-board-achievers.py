"""Crop UP Board student portraits from the 2026 academy banner."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "media" / "studentachievers.jpeg"
OUT = ROOT / "public" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

# Boxes include each portrait only, avoiding the score and name panels. The
# source banner is 1600x800; ImageOps.fit produces the site's 4:5 portrait crop.
CROPS = {
    "up-board-ravi-yadav.jpg": (333, 198, 610, 402),
    "up-board-dheeraj-yadav.jpg": (663, 198, 934, 402),
    "up-board-ruchi-yadav.jpg": (974, 198, 1255, 402),
    "up-board-abhishek-yadav.jpg": (39, 157, 121, 255),
    "up-board-mohit-yadav.jpg": (39, 267, 121, 368),
    "up-board-pratima-yadav.jpg": (39, 377, 121, 481),
    "up-board-mandeep-kumar.jpg": (39, 501, 121, 603),
    "up-board-arpita-yadav.jpg": (39, 615, 121, 719),
}

with Image.open(SOURCE) as source:
    source = source.convert("RGB")
    for filename, box in CROPS.items():
        crop = ImageOps.fit(
            source.crop(box),
            (600, 750),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.3),
        )
        crop.save(OUT / filename, "JPEG", quality=88, optimize=True)

print(f"Wrote {len(CROPS)} 4:5 portraits to {OUT}")
