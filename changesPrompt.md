# Athak Prayas Academy — Website Upgrade Prompt (Round 2)

> **For:** Antigravity / Claude / any coding agent
> **Context:** The website is already built and running at `http://localhost:5173/`. It works. **Do NOT rebuild it, restructure it, or change the stack.** Make only the targeted upgrades below, inside the existing code.

---

## 0. Ground rules (read first)

1. **Inspect before editing.** Open the current project, read `package.json`, the components, the data files (`academy.*`, `courses.*`, `teachers.*`, `media.*`) and the CSS. Reuse what exists.
2. **Keep everything that already works:** header, WhatsApp inquiry form (the form is good, leave its logic untouched), nav scrolling, filters, lightbox, config-driven content, accessibility, `prefers-reduced-motion` handling.
3. **Never touch original files in `content/`.** Any cropped or optimized image is a new derived copy in a clearly named folder such as `public/generated/` (lowercase, hyphenated names).
4. **No new heavy libraries.** Prefer plain CSS + a little JS. Allowed if truly needed: a tiny library for icons is *not* needed, so use inline SVG. No animation framework is needed either; use CSS transitions, `IntersectionObserver`, and `scroll-snap`.
5. **No fake content.** No invented fees, timings, results, reviews, counters, years of experience, or qualifications. Keep the existing rule that unverified data stays editable and can be hidden with a flag.
6. **Keep it simple.** If a feature needs a lot of code or makes the site feel heavy, skip it.

---

## 1. Hero — use the coaching banner photo

**Now:** the hero shows a classroom photo.
**Change:** replace it with the academy's **coaching banner photo** from `content/`.

- Find the best banner/board photo of the coaching centre (the building/banner showing "Athak Prayas Academy"). Inspect candidates visually before choosing; pick the sharpest, best-lit one.
- Show it as a clean framed image next to the hero text (desktop) and below the text (mobile). Use `object-fit: cover` with a sensible `object-position` so the banner text is **not cropped off**. If the photo is portrait or the text gets cut, use `object-fit: contain` on a soft warm-white backing instead.
- Give it explicit `width`/`height`, load it eagerly (it is above the fold), add a short, accurate alt text.
- Subtle polish only: a thin red offset border or soft shadow, and a gentle fade/slide-in on load. No gradients, glass effects, or floating shapes.
- Keep the existing Hindi heading, tagline, and both CTAs exactly as they are.

---

## 2. Courses & Preparation — make it richer, still simple

**Now:** very basic text cards.
**Change:** redesign this section so it feels like a real academy's course page.

- Keep the same course groups and keep every **"Ask about this course"** link working with the pre-filled WhatsApp message:
  School Classes (6–12), Subject Support (Maths/English/Science), Entrance Exam Preparation (JNVST, CHS, BHU), NMMS Preparation, Agniveer Preparation.
- Give each course group:
  - a **relevant real image** from `content/` where one fits (classroom, students studying, teacher teaching, the NMMS/JNV poster). If no suitable image exists for a group, use a clean inline SVG icon (book, calculator, atom, language, shield, medal) in the red accent color instead of a random stock photo;
  - a small label chip (e.g. "Classes 6–12", "Entrance", "Class 8");
  - 3 short bullet points describing what it covers, in plain language. Only use facts from the original brief; do not invent syllabus, selection claims, fees, or schedules.
- Layout idea: a large featured card for **School Classes (6–12)**, and a tidy grid for the rest. Avoid a wall of identical cards.
- Interaction: card lifts slightly on hover, image zooms ~4% inside its frame, CTA arrow slides a few pixels. Cards fade-up on scroll (see Section 7).
- Add one line under the section: *"Contact us for current batches, fees and schedules."*

---

## 3. Results & Achievements — a photo for every achiever

**Now:** results are text only.
**Change:** each achiever gets their own photo and card.

**Image extraction:**
1. Open `content/studentachivers.jpg` (check the exact filename in `content/`; also check other result posters there) and view it.
2. Write a small one-off script (Python + Pillow, or Node + sharp if already installed) that **crops each student's portrait** from the poster into its own file, e.g. `public/generated/achiever-aman-yadav.jpg`. Crop around the face and shoulders, consistent aspect ratio (4:5), resized to about 600px wide, quality about 82.
3. Visually check every crop. Re-crop any that cut off a face, include another student, or contain unreadable text/roll numbers. **Crop out any roll number or personal identifier.**
4. Never modify the original poster. Keep the crop script in `scripts/` so it can be rerun.

**Achievers to show** (from the original brief; keep names and ranks exactly as supplied):

| Student | Result |
|---|---|
| Anurag Yadav | UP NMMS 2026 — District Rank 1st, State Topper 2026 |
| Aman Yadav | Class 5, JNV — 92/100, District Rank 49 (2026) |
| Ansh Kumar Jaiswal | UP NMMS 2026 — District Rank 27 |
| Dev Chaurasiya | UP NMMS 2026 — District Rank 37 |
| Shubham Modanwal | UP NMMS 2026 — District Rank 43 |
| Arpit Kumar Yadav | UP NMMS 2026 — District Rank 47 |

**Design:**
- Anurag Yadav (the top result) gets a larger featured card; the others sit in a clean row/grid of equal photo cards.
- Each card: portrait photo, name, exam + year, rank as a small red badge. Nothing else.
- Keep **Student Results** visually separate from **Events & Awards** (past-event posters stay labeled with their actual year, never "upcoming").
- Store everything in the existing data file with a `verified` / `showPhoto` flag per student so the owner can hide any photo or entry instantly. If a crop is not clean, fall back to an initials avatar for that student.
- Keep the note that results are academy-provided; no guarantee language.

---

## 4. Faculty — Vikas Sir featured, two teachers below

**Change the layout:**

- **Top:** one **full-width featured card** for **Vikas Sir** — big photo on one side (use his real photo from `content/` if one exists; otherwise an initials avatar), and on the other side: name, role **"Director & MD"**, subject **Mathematics**, qualifications **M.A., B.Ed., BTC, NET qualified**. Add a short, honest line such as "Leads the academy and teaches Mathematics." No invented experience.
- **Below him:** two equal cards side by side — **Aditya Sir (English)** and **Gurudev Sir (Science)** — each with photo or avatar, name, subject. Do not add qualifications that were not provided. "Navy background" for Aditya Sir stays behind an editable flag (default: shown only if the academy has approved it — keep whatever the current site does).
- On mobile, all three stack vertically with Vikas Sir first.
- Keep teacher text in the existing `teachers.*` data file; add a `title` field for "Director & MD".

---

## 5. Gallery & Media — big cards with an animated horizontal scroller (‹ ›)

**Now:** grid gallery with filters and lightbox.
**Change:** turn it into a smooth horizontal scroller with arrow buttons, and make the cards bigger.

- Keep the existing **category filters** and **lightbox** (open/close, Esc key, touch-friendly). Filtering should re-render the scroller and reset it to the start.
- Build the scroller with plain CSS `scroll-snap-type: x mandatory`, `overflow-x: auto`, hidden scrollbar, and `scroll-behavior: smooth`.
- **Cards ≈ 70–80vw wide on mobile, about 420–480px wide on desktop**, with a tall aspect ratio (about 4:5 or 3:4 for posters/photos, 16:9 for videos). Posters must be shown in full (`object-fit: contain` on a warm-white backing) so their text is readable.
- Add round **‹ and › buttons** (inline SVG chevrons, red on white, clear focus ring, `aria-label="Previous"`/`"Next"`). They scroll by about one card width, and disable (or fade) at the start/end.
- Extras that make it feel good (keep each one simple):
  - mouse **drag-to-scroll** on desktop;
  - the centered/active card is slightly larger (scale about 1.03) and neighbors slightly dimmer;
  - a small progress bar or dot indicator under the scroller;
  - keyboard: left/right arrows move focus between cards.
- Videos: show a poster frame with a play icon, open with controls, **never autoplay with sound**; pause videos that scroll out of view.
- Lazy-load off-screen images; keep file sizes sensible (generate resized copies if originals are huge).
- Under `prefers-reduced-motion`, no smooth scrolling or scale effects.

---

## 6. Contact / Footer area — richer info, social icons, Google Map

**Keep the inquiry form exactly as it is** (it is good). Improve the contact information beside/around it:

- Replace the plain text list with a set of clear **contact rows**, each with a small inline SVG icon: Phone (both numbers, `tel:` links), WhatsApp (`wa.me` link), Email (`mailto:`), Address, and "Visit us" hours **only if supplied** (do not invent timings; instead say "Call or WhatsApp for batch timings").
- Add **social media icon buttons** (inline SVG, no external icon library): **YouTube**, **Instagram**, **WhatsApp**, plus **Email** and **Call**. Use the URLs from the central `academy` config. Round buttons, red on white, hover turns solid red with white icon. All open in a new tab with `rel="noopener noreferrer"` and have `aria-label`s.
- Add a **Google Map iframe** of the academy:
  - Use `https://www.google.com/maps?q=Station+Road+Handia+Prayagraj+Uttar+Pradesh+India&output=embed` (no API key needed). If the project's config already has a verified map pin URL, derive the embed from that instead. Put the embed URL in the central config as `mapsEmbedUrl`.
  - `loading="lazy"`, `title="Athak Prayas Academy location map"`, `referrerpolicy="no-referrer-when-downgrade"`, rounded corners, height about 320px mobile / 100% of the column height on desktop.
  - Below it, a **"Get Directions"** button linking to the existing `mapsUrl`, as a fallback if the iframe is blocked.
- Footer: show the logo/wordmark, English and Hindi name, tagline, quick links, the same social icons, and a copyright line with the current year. Keep it tidy, not a mega-footer.

---

## 7. Animation & polish (cool, but simple and human)

The goal is a site that feels crafted by a local designer, **not** a generic AI landing page.

**Do (all light-weight):**
- **Scroll reveal:** sections and cards fade up about 16–24px using `IntersectionObserver` with a small stagger (50–80ms) between siblings. Animate once, not repeatedly.
- **Header:** becomes slightly compact with a thin bottom border/shadow after scrolling; the **active nav link highlights** according to the visible section; a thin red **scroll-progress bar** at the very top.
- **Hover/focus micro-interactions** on buttons and cards (lift, underline slide, arrow nudge), about 200ms ease-out.
- **Smooth anchor scrolling** with an offset for the sticky header.
- **Back-to-top** small button that appears after scrolling down; it must not collide with the mobile Call/WhatsApp bar.
- Keep the **sticky mobile Call + WhatsApp bar**, and make sure the new elements do not hide behind it.
- Optional (only if it stays simple): a subtle one-time text highlight under the Hindi hero heading's key word.

**Don't:**
- animated number counters, fake stats, parallax everywhere, particles, floating blobs, neon glows, glassmorphism, big gradient backgrounds, stacked drop shadows, emoji bullets, or a dozen different card styles;
- generic phrases like "Unlock your potential", "Empower the future", "world-class". Use warm, concrete, local copy.

**Visual consistency:** stay with the existing palette (white `#FFFFFF`, warm `#FFF9F7`, soft red `#E84B4B`, deep red `#C9343D`, navy `#14284B`, gold `#E8BD55` sparingly, body `#263247`). One border radius scale (e.g. 8px / 14px), one shadow style, consistent spacing. Hindi text must never overflow or clip.

---

## 8. Performance & accessibility checks

- Images: correct `width`/`height`, `loading="lazy"` below the fold, `decoding="async"`, optimized derived copies for large posters.
- Contrast stays AA; every interactive element is keyboard reachable with a visible focus ring; arrows, lightbox, and filters have proper labels.
- `prefers-reduced-motion`: disable reveal, scale, smooth-scroll, and drag-inertia effects.
- No console errors, no broken links, no `href="#"` dead buttons.
- Page must feel fast on a mid-range Android phone over 4G.

---

## 9. Verify at `http://localhost:5173/` (desktop and a ~390px mobile viewport)

1. **Header:** logo and English + Hindi name still correct.
2. **Hero:** coaching banner photo displays fully, with CTAs working.
3. **Courses:** richer layout, images/icons load, every **Ask about this course** link opens WhatsApp with the course name pre-filled.
4. **Achievements:** all six achievers show a clean cropped photo, name, exam/year, and rank; no roll numbers visible; past events labeled by year.
5. **Faculty:** Vikas Sir full-width card ("Director & MD"), two teachers below, and the stack is correct on mobile.
6. **Gallery:** ‹ › buttons scroll, drag works, filters work, cards are large, lightbox opens/closes (button, Esc, tap outside), videos don't autoplay.
7. **Contact:** form still builds the correct URL-encoded WhatsApp message; social icons link to the right profiles; the map iframe loads; Get Directions works.
8. **Footer** is tidy and the year is current.
9. Run the existing lint/build commands (`npm run lint`, `npm run build` if present) and fix any errors.

---

## 10. Final report (keep it short)

Report back with:
1. What changed, section by section.
2. Which images were chosen for the hero and the courses, and how the achiever crops were made (list the generated filenames).
3. Key files created/edited.
4. Commands to run and build.
5. Anything that needs the owner's confirmation: student/parent permission for photos, Aditya Sir's "Navy" wording, whether "Director & MD" is final, timings, and a verified Google Maps pin.
6. Any issue you could not resolve.

Do not claim it is tested or production-ready unless you actually ran the checks.