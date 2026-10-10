# Athak Prayas Academy — Fix Prompt (Round 3)

> **For:** Antigravity / Claude / any coding agent
> **Site:** running at `http://localhost:5173/`
> **Status:** Everything else on the site is approved. **Do not touch** the header, hero, faculty, contact form, footer, colors, or animations. Fix only the four problem areas below, in the existing code.

## 0. Ground rules

1. **Look at the actual pixels.** Before changing any image choice, open and visually inspect every candidate in `content/` (and previously generated crops in `public/generated/`). Never choose an image from its filename alone.
2. **Never modify originals in `content/`.** Write all crops, resized images, and video posters as new files in `public/generated/` with lowercase, hyphenated names.
3. **Prefer no image over a wrong image.** If no suitable photo exists for a slot, use a clean inline SVG icon or typography instead of a mismatched picture.
4. **Fix the cause, not the symptom.** Most of these problems are wrong aspect ratios and wrong `object-fit` / `object-position`. Measure the real width and height of each asset (Pillow / `ffprobe`) and design the card around it.
5. Keep the existing data-file structure (`courses.*`, `media.*`, achievers data) and the `verified` / `showPhoto` flags.

---

## 1. Student Achievements — fix the layout and Anurag's card

**Problems now:** Anurag Yadav's featured card sits awkwardly in the center and dominates the section, and his photo does not fit his card (bad crop, stretched or face cut off).

### 1a. Layout

Use this structure on desktop (≥1024px):

- **Row 1 — featured card, full width of the container, horizontal layout:**
  photo on the **left** (about 35–40% width, portrait 4:5), details on the **right** (name, "UP NMMS 2026", a red badge "District Rank 1st · State Topper 2026", one line like "Prayagraj district, Class 8 NMMS" **only if supported by the poster; otherwise omit**). Left-aligned text, not centered.
- **Row 2 — the other five achievers** in one even grid (5 columns on wide desktop, 3 columns on tablet, 2 on mobile), all **identical card size**: portrait photo on top, name, exam/year, rank badge.
- Order: Anurag, then by rank — Aman Yadav (JNV 92/100, District Rank 49), Ansh Kumar Jaiswal (27), Dev Chaurasiya (37), Shubham Modanwal (43), Arpit Kumar Yadav (47). Keep each exam/year label exactly as in the existing data.
- On mobile: featured card stacks (photo on top, details below), then the 2-column grid.
- Keep **Student Results** and **Events & Awards** visually separate, and keep the "academy-provided results" note.

### 1b. Fix the photos (all six, Anurag first)

1. Open the source poster (`content/studentachivers.jpg`, plus any individual result posters in `content/`) and look at it at full resolution.
2. **Re-crop every achiever** with a script (Pillow, kept in `scripts/crop-achievers.py` so it can be rerun):
   - Crop the face + shoulders, with the face centered horizontally and the eyes in the upper third.
   - Use one fixed aspect ratio for all (**4:5**), resized to about 600×750, JPEG quality about 82.
   - Add comfortable headroom; no cut-off foreheads or chins; no neighbouring student, border, ribbon, or text strip visible; **no roll numbers**.
   - For Anurag use a **larger crop (about 900×1125)** because his card is bigger, and keep the same face-centered rule.
3. If the poster resolution is too low for a clean large crop, **don't upscale blurrily**: use the sharpest crop available, and display Anurag's photo at the same size as the others inside the featured card rather than stretching it.
4. In CSS, the photo box uses `aspect-ratio: 4 / 5; object-fit: cover; object-position: center 20%;` so faces stay in frame. Never set both width and height in a way that distorts the image.
5. After cropping, **view every output file** and redo any that fail the checks above. Fall back to an initials avatar for any student without a clean crop.

---

## 2. Courses & Preparation — choose correct images

**Problems now:** the images chosen for Maths, Science, English, and some other course cards do not match the subject or fit the card badly.

### Process

1. Inventory all images in `content/` and **write a short table** (in your working notes) listing: filename, what it actually shows, orientation, resolution, and which course (if any) it suits.
2. Assign images by what they genuinely show:
   - **School Classes (6–12):** a real classroom/teaching/students photo.
   - **Maths:** only a photo of maths being taught (board with maths work, a maths class). If none exists, use an SVG icon (calculator / geometry set / π).
   - **Science:** only a real science-class photo. Otherwise an SVG icon (atom / flask).
   - **English:** only a real English-class photo. Otherwise an SVG icon (open book / "Aa").
   - **Entrance exams (JNVST / CHS / BHU) and NMMS:** the relevant result/poster or class photo if it is clear and readable; otherwise an SVG icon (medal / target / graduation cap).
   - **Agniveer:** an SVG icon (shield / badge) unless a genuinely relevant photo exists.
3. **Do not reuse the same photo** on several course cards, and do not use a teacher portrait as a "subject" image.
4. **Use a consistent style inside the grid:** either all-photo cards or all-icon cards for the three subject cards, so they look like a set. A mix of one photo and two icons looks accidental. If only some subjects have a good photo, use the icon style for all three.
5. **Fit:** one fixed image box per card (`aspect-ratio: 16 / 10`), `object-fit: cover`, with `object-position` tuned per image (store it in the course data as `imagePosition`). Check that the important part (board, students' faces) is not cropped away. Icon cards use a soft warm-white/light-red tile with the SVG centered.
6. Keep all **"Ask about this course"** WhatsApp links, bullets, and the featured School Classes card working.

---

## 3. Gallery — sports event videos: fix the aspect ratio

**Problem now:** the two sports event videos look cropped or stretched in the gallery cards.

1. Run `ffprobe` on both videos and record their real width, height, rotation metadata, and duration. Phone videos are often **vertical (9:16)** or have rotation metadata that browsers apply differently.
2. Store each video's real aspect ratio in the media manifest (`width`, `height`, or `aspectRatio`).
3. Card display:
   - Vertical video → a tall card (`aspect-ratio: 9 / 16`, capped with `max-height: 70vh` so it never exceeds the screen).
   - Landscape video → `aspect-ratio: 16 / 9`.
   - Use `object-fit: contain` on a dark or warm-white backing so **nothing is cropped or stretched**. Never force a video into the same box as the photo cards.
4. Generate a **poster frame** for each with `ffmpeg` (a clear mid-action frame, not black or blurry) into `public/generated/`, correctly oriented, and use it as the `poster` and as the card thumbnail with a play icon.
5. Video behaviour: `controls`, `preload="metadata"`, `playsinline`, **no autoplay with sound**, pause when scrolled out of view. The lightbox/modal sizes the player to fit the viewport (`max-width: 92vw; max-height: 88vh`) with the correct ratio.
6. If a video has rotation or encoding that plays sideways or without audio in a browser, create a corrected copy in `public/generated/` (e.g. `ffmpeg -i in.mp4 -c:v libx264 -crf 24 -preset medium -c:a aac -movflags +faststart out.mp4`) and point the manifest to it. Do not alter the original.
7. Because card widths vary, make sure the horizontal scroller (‹ › buttons, snap, drag) still works with mixed card widths and that the arrows still scroll one card at a time.

---

## 4. Gallery — award ceremony, awards, and event images

**Problems now:** award ceremony / award / event images look poor in their cards (bad crop, wrong framing, low quality, or mixed-up categories).

1. Re-inspect every award-ceremony, award, prize-distribution, and event image in `content/`. For each one decide: **keep, replace, or drop**.
   - Drop: blurry, very dark, duplicate, near-duplicate, accidental screenshots, or images where people are cut off awkwardly.
   - If two images show the same moment, keep only the sharper one.
2. **Photos vs posters need different treatment:**
   - **Event/ceremony photos:** `object-fit: cover` with a hand-tuned `object-position` (set per image in the manifest, e.g. `"50% 30%"`) so faces and the award are in frame. Use a consistent 4:3 or 4:5 box for the set; never distort.
   - **Posters/banners with text:** `object-fit: contain` on a warm-white backing so all text is readable, with a card box ratio close to the poster's real ratio.
3. If a good photo is cropped by the card's ratio, make a **better framed derived crop** (Pillow) in `public/generated/` instead of fighting CSS.
4. **Fix labels and categories:** each item gets the correct category filter (Ceremony / Awards / Events / Results / Videos), a concise accurate alt text, and its real year (e.g. "Pratibha Khoj Pariksha 2026", "General Knowledge Competition 2025", "Annual Sports Championship 2026"). Past events must read as past; nothing is "upcoming".
5. Show a short caption under or over each card (title + year), readable on the image (use a plain solid or very subtle backing, no heavy gradients).
6. Check that filters still re-render correctly, the lightbox shows the **full uncropped image** (`object-fit: contain`), and large originals are resized (width about 1200–1600px) so the gallery stays fast.

---

## 5. Verify at `http://localhost:5173/` (desktop + ~390px mobile)

1. **Achievements:** featured Anurag card is left-aligned horizontal on desktop; photo is face-centered and not stretched; five other cards are identical in size and well aligned; mobile stacks correctly; no roll numbers visible.
2. **Courses:** every card's image or icon matches its subject; style is consistent across Maths/Science/English; nothing important is cropped; all WhatsApp links work.
3. **Gallery videos:** both sports videos display at the correct ratio with a clean poster, no cropping or stretching, controls work, no autoplay with sound, modal fits the screen.
4. **Gallery images:** award/ceremony/event photos are framed well, posters are fully readable, categories and years are correct, filters and the ‹ › scroller work, lightbox open/close works (button, Esc, outside tap).
5. Console shows no errors; no broken images; run the existing lint/build (`npm run lint`, `npm run build`) and fix problems.

---

## 6. Final report (short)

1. What you changed in each of the four areas.
2. The image table for the courses (which file → which course, and which cards use icons instead).
3. The ffprobe results (ratio) for the two videos and what you did for each.
4. Which gallery images you dropped or replaced and why.
5. Generated files and key files edited.
6. Anything that needs the owner's decision (e.g. a missing photo for a subject, low-resolution poster for Anurag's crop).

Do not claim success without actually viewing the result at `localhost:5173`.