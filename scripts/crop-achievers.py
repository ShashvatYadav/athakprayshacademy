"""Create privacy-safe 4:5 student portraits from supplied academy posters.

The source posters are never modified. This checkout keeps source media in
public/media; content/ is also supported when restored by the owner.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MEDIA_CANDIDATES = (ROOT / "content", ROOT / "public" / "media", ROOT / "dist" / "media")
MEDIA = next((p for p in MEDIA_CANDIDATES if (p / "nmms2026Student.jpeg").exists()), ROOT / "public" / "media")
OUT = ROOT / "public" / "generated"
OUT.mkdir(parents=True, exist_ok=True)


def save_crop(source, box, filename, natural=False):
    image = Image.open(source).convert("RGB").crop(box)
    # Keep low-resolution poster portraits at their source resolution; do not
    # manufacture detail by enlarging. All crops retain a 4:5 frame.
    if natural:
        target_h = round(image.width * 1.25)
        canvas = Image.new("RGB", (image.width, target_h), "#fff9f7")
        y = max(0, (target_h - image.height) // 2)
        canvas.paste(image.crop((0, 0, image.width, min(image.height, target_h))), (0, y))
        image = canvas
    else:
        target_w = min(image.width, 600)
        target_h = round(target_w * 1.25)
        image = ImageOps.fit(image, (target_w, target_h), method=Image.Resampling.LANCZOS, centering=(0.5, 0.32))
    image.save(OUT / filename, "JPEG", quality=82, optimize=True)


nmms = MEDIA / "nmms2026Student.jpeg"
# Anurag's source is a small circular portrait. This crop avoids the roll
# number, name strip, and poster border; it is deliberately not enlarged.
save_crop(nmms, (98, 270, 215, 387), "achiever-anurag-yadav.jpg", natural=True)
# Aman Yadav's only supplied portrait has an adult's hand across his mouth and
# lower face. It is intentionally not cropped; the site uses an initials avatar.
# Crop the four rectangular head-and-shoulder portraits above their name/roll strips.
for filename, box in [
    ("achiever-ansh-kumar-jaiswal.jpg", (80, 585, 285, 865)),
    ("achiever-dev-chaurasiya.jpg", (385, 585, 575, 823)),
    ("achiever-shubham-modanwal.jpg", (710, 585, 895, 865)),
    ("achiever-arpit-kumar-yadav.jpg", (1010, 585, 1210, 835)),
]:
    save_crop(nmms, box, filename)

print("Wrote five clean crops to public/generated/; Aman uses initials because the source portrait is obstructed.")
