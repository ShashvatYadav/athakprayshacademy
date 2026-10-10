# Athak Prayas Academy website

A small single-page site (React + Vite) for Athak Prayas Academy, Handia, Prayagraj.
Full brief: `feature.md`.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## How enquiries work (no database)

There is no backend and no database. The enquiry form validates the fields, builds a
WhatsApp message and opens `https://wa.me/917348001996?text=...`. The visitor must press
Send in WhatsApp; nothing is stored or sent anywhere else. Call, email and direct WhatsApp
links stay visible as fallbacks.

## Editing content

Everything editable lives in `src/data/`:

- `academy.js` – phone, WhatsApp, email, address, social links, Google Maps link
- `courses.js` – course groups (set `show: false` to hide one)
- `teachers.js` – teacher names and wording (add `photo` once approved)
- `results.js` – student results and past events; all are `approved: false` until verified
- `media.js` – gallery manifest; the Gallery section stays hidden while it is empty

## Adding photos from `content/`

1. Copy chosen (resized/optimised) files into `public/media/`; do not modify the originals.
2. Add an entry to `src/data/media.js` with alt text, category and year.
3. Optionally set `heroImage` in the same file.
4. Student photos need parent/guardian permission before `approved: true`.
