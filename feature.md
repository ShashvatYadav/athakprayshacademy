# Athak Prayas Academy — Website Features & Build Prompt

> **Purpose:** Give Claude, Gemini, Cursor, or another coding assistant this complete brief to build a real, lightweight website for **Athak Prayas Academy** from the existing project directory and its `content/` media folder.
>
> **Important:** Work in the current project. Inspect its structure and existing code before changing anything. Do not replace working setup or delete files without a clear reason.

---

## 1. Academy details extracted from the supplied posters

Use the details below as the current source of truth. Keep public contact and social details centralized in one configuration file so they can be updated easily.

- **English name:** Athak Prayas Academy
- **Hindi name:** अथक प्रयास एकेडमी
- **Tagline options shown in promotional material:** “Path to Winner” and “Your Dream, Our Mission.” Choose one concise tagline for the hero; do not crowd the page with both.
- **Address:** Station Road, Handia, Prayagraj, Uttar Pradesh, India
- **Phone numbers:** `7348001996`, `7348142442`
- **Primary WhatsApp number:** `7348001996` (international-format link: `https://wa.me/917348001996`)
- **Email:** `athakprayasacademy@gmail.com`
- **YouTube channel:** [Athak Prayas Academy](https://youtube.com/@athakprayasacademy?si=-ZzPDo17ww2kFeHY)
- **Instagram:** [@athak_prayas_academy](https://www.instagram.com/athak_prayas_academy/)

### Classes and preparation programs shown in the posters

- School tuition for **Classes 6–12**.
- **UP Board and CBSE Board** support, especially **Maths, English, and Science**.
- Entrance and competitive-exam preparation promoted by the academy: **JNVST, CHS, BHU, NMMS, and Agniveer**. Present these as preparation options only; do not imply official affiliation with these institutions or exam authorities.
- **UP NMMS Class 8** preparation, including foundation/target batches, study material, practice questions, mock tests, and regular test series where those offerings are confirmed by the academy.
- The posters mention a **Pratibha Khoj Pariksha 2026**, a **General Knowledge Competition 2025**, an **Annual Sports Championship 2026**, and prize-distribution/recognition programs. These are past-dated materials as of October 2026. Use them as historical gallery/event items, not as upcoming events, unless the academy supplies updated dates.

### Teachers

- **Vikas Sir** — Maths teacher; qualifications shown in the supplied poster: **M.A., B.Ed., BTC, NET qualified**. Promotional material also identifies him as Director. Keep the spelling and qualifications as supplied, but make this content editable.
- **Aditya Sir** — English teacher; poster/user-provided description: **Navy**. Do not infer a degree or other qualification. Show “English Teacher” and optionally “Navy background” only if the academy approves that wording.
- **Gurudev Sir** — Science teacher. No additional qualifications were supplied, so do not invent any.

### Student results and achievement material visible in the posters

The promotional images mention the following results. Treat these as **academy-provided claims that must be checked before publication**. Keep the entries in one editable data file and show them only if the academy confirms they are accurate and has permission to publish student names/photos.

- **Aman Yadav** — Class 5; JNV selection/exam success poster states **92/100** and **District Rank 49** for 2026.
- **Anurag Yadav** — UP NMMS 2026 poster labels him **District Rank 1st** and **State Topper-2026**; the poster also says Jaunpur.
- **Ansh Kumar Jaiswal** — UP NMMS 2026 poster states **District Rank 27th**.
- **Dev Chaurasiya** — UP NMMS 2026 poster states **District Rank 37th**.
- **Shubham Modanwal** — UP NMMS 2026 poster states **District Rank 43rd**.
- **Arpit Kumar Yadav** — UP NMMS 2026 poster states **District Rank 47th**.

**Privacy and trust:** Never put student roll numbers, personal phone numbers, or other unnecessary identifiers from posters on the site. Since some students may be minors, publish names and identifiable photos only with permission from the student/parent or guardian. Do not invent extra results, ranks, pass rates, reviews, testimonials, years of experience, or success statistics. If any claim is not verified, omit it or label the relevant section as draft content rather than presenting it as fact.

---

## 2. What to build

Create a polished, simple, trustworthy, mobile-first website for local students and parents who want to understand the academy's courses and ask about admission.

### Design direction

- Primary look: **white / warm-white backgrounds with light red accents**.
- Supporting colors may include a restrained **navy blue** for text and small **gold** accents inspired by the academy's posters/logo. The website should not copy the posters' busy designs.
- Suggested palette: white `#FFFFFF`, warm background `#FFF9F7`, soft red `#E84B4B`, deeper red `#C9343D`, navy `#14284B`, muted gold `#E8BD55`, body text `#263247`.
- Use clear typography with strong readability for both English and Hindi. Use a Devanagari-capable font if the project already supports one; otherwise select a reliable Hindi-compatible system fallback.
- Prefer real academy photography and posters from `content/` over stock photos or generated-looking illustrations.
- Keep the layout calm, local, and human: realistic copy, generous whitespace, restrained borders/shadows, natural image crops, and consistent spacing.
- **Do not** use over-the-top gradients, glassmorphism, excessive rounded cards, floating shapes, animated counters, fake dashboards, unnecessary carousels, or generic “AI-generated landing page” patterns.
- Use subtle transitions only where they improve usability. Respect `prefers-reduced-motion`.
- Make all layouts responsive for phones, tablets, and desktops. Ensure Hindi text does not overflow.

### Small, useful navigation

Use a compact header with the academy logo/name and links that scroll to:

1. Home
2. Courses
3. Results / Achievements
4. Teachers
5. Gallery
6. Contact

Use a visible **“Enquire on WhatsApp”** action. On mobile, a small sticky bottom contact bar with **Call** and **WhatsApp** is acceptable, provided it does not cover page content or accessibility controls.

---

## 3. Required page sections

Build a single-page website unless the current project already has a sensible multi-page structure. Do not add routes or pages just to increase feature count.

### A. Header and hero

- Show the academy logo if a suitable, clear logo asset exists in `content/`; otherwise use a clean text wordmark, not a made-up logo.
- Display **Athak Prayas Academy / अथक प्रयास एकेडमी** and one short tagline.
- Suggested Hindi-first heading: **“सही मार्गदर्शन, नियमित अभ्यास और बेहतर तैयारी”**.
- Suggested supporting text: “Classes 6–12, UP/CBSE Board support, and focused preparation for JNVST, CHS, BHU, NMMS and other listed exams.” Keep the claim accurate and easy to edit.
- Primary CTA: **Enquire on WhatsApp**.
- Secondary CTA: **Call the Academy**.
- Show the location briefly: Station Road, Handia, Prayagraj, Uttar Pradesh.
- Use one authentic, relevant photograph or a clean visual from the academy's own media. Do not use a text-heavy promotional poster as the full hero background.

### B. Courses and preparation

Present a concise set of course groups rather than a large card wall:

- **School Classes (6–12):** UP Board and CBSE Board tuition.
- **Subject Support:** Maths, English, and Science.
- **Entrance Exam Preparation:** JNVST, CHS, and BHU.
- **NMMS Preparation:** Class 8 foundation/target preparation, practice, and mock-test support when confirmed.
- **Agniveer Preparation:** Include only if the academy currently offers it; do not make unverified syllabus, placement, or selection claims.

For each group, provide a short plain-language description and a small **Ask about this course** WhatsApp link that pre-fills the course name in the message. Do not publish fees, schedules, batch sizes, admission deadlines, or eligibility requirements unless they are present in verified academy-provided data.

### C. Results and achievements

- Create a compact section for academy achievements with clear year labels.
- Use verified, permitted result entries from the list in Section 1.
- Prefer a small selection of meaningful achievements, not every result in a crowded wall.
- Clearly separate **student results** from **events and awards**.
- Do not describe the academy as guaranteeing selection or marks.
- If result details are not yet verified, use a general heading such as **“Students’ Achievements”** with an editable configuration and keep the claims hidden until approved.

### D. Teachers

Show a short, friendly section for the three named teachers:

- **Vikas Sir — Mathematics**: M.A., B.Ed., BTC, NET qualified; Director (as stated in provided material).
- **Aditya Sir — English**: do not add qualifications not provided. “Navy background” may be included only with academy approval.
- **Gurudev Sir — Science**: no unprovided qualifications or experience claims.

Use real teacher photos only if suitable assets are present and publication is approved. Otherwise use a simple initial/avatar treatment; do not substitute unrelated stock portraits.

### E. Gallery and media

- Build a responsive image gallery using only relevant and suitable assets discovered in `content/`.
- Include an image viewer/lightbox only if it remains accessible, works well on touch screens, and is easy to close. A simple grid is sufficient.
- Videos should be embedded or opened with controls and clear labels; do not autoplay with sound.
- Label older events by their actual year/date. Do not promote the 2025/2026 events as upcoming.
- Use a sensible number of gallery items on the initial page and avoid making the site slow with giant images.

### F. Contact and inquiry

Include:

- Phone: `7348001996` and `7348142442` (use working `tel:` links).
- WhatsApp: `7348001996` (use `https://wa.me/917348001996`).
- Email: `athakprayasacademy@gmail.com` (use a working `mailto:` link).
- Address: Station Road, Handia, Prayagraj, Uttar Pradesh, India.
- YouTube and Instagram links from Section 1.
- A Google Maps direction link based on the address. If an exact verified Google Maps place URL is later supplied, store that URL in configuration and use it. Do not fabricate a place ID or exact map pin.

Add a short inquiry form with only useful fields:

- Student/parent name (required)
- Phone number (required; basic validation)
- Class (select from Classes 6–12, plus “Other”)
- Interested course/exam (select from the listed categories, plus “Not sure yet”)
- Optional message

**No database is available.** On submit:

1. Validate required inputs on the client.
2. Build a polite WhatsApp message containing the entered details.
3. URL-encode the message and open `https://wa.me/917348001996?text=...` in a new tab or use an equally clear WhatsApp handoff. Preserve accessibility and explain that WhatsApp will open so the user can send the inquiry.
4. Do not display a false “submitted successfully” message or imply the academy has received data automatically. The student/parent must send the WhatsApp message themselves.
5. If WhatsApp cannot be opened, keep the phone, email, and direct WhatsApp links visible as fallbacks.
6. Do not store form information in local storage, analytics, logs, or a third-party service.

Use correct labels, keyboard access, visible focus states, useful inline validation, and an accessible success/instruction message after preparing the WhatsApp message.

### G. Footer

Show the academy name in English/Hindi, a short tagline, phone and WhatsApp links, location, email, social links, and a simple copyright line using the current year. Avoid unneeded footer menus.

---

## 4. Inspect and curate the existing `content/` folder

Before implementation, inspect the project directory recursively and inventory the assets in `content/` (or identify the closest existing media folder if its name differs).

1. List files and file types; inspect dimensions, duration, file size, and thumbnail/preview where supported.
2. Select assets that genuinely fit the academy site: logo, classroom/teaching photos, teachers, students (with permission), award ceremonies, event photos, and relevant educational videos.
3. Ignore unrelated files, duplicate copies, accidental screenshots, corrupted assets, unreadable posters, and low-quality images that do not help a visitor.
4. Treat poster/banner designs as **gallery or achievement assets**, not giant text-heavy hero backgrounds. Do not make important website copy available only inside an image.
5. Do not delete, overwrite, rename, or move original user files. Use existing paths or create derived optimized copies in a clearly named generated/public asset directory if needed.
6. Use descriptive, lowercase, hyphenated asset names for any generated copies. Do not invent the contents of an asset from its filename alone.
7. Prefer modern responsive image behavior (`width`/`height`, appropriate `object-fit`, lazy loading below the fold, descriptive alt text, and responsive sizes when applicable). Do not lazy-load the main above-the-fold hero image if it hurts loading performance.
8. For decorative images use empty alt text; for informative images provide concise accurate alt text. Do not put every piece of poster text in alt text.
9. If multiple files show the same poster, use one copy in the gallery unless there is a meaningful reason to show both.
10. Produce a small maintainable media manifest (for example `src/data/media.ts`, `src/data/media.js`, or the equivalent for the current stack) identifying the chosen asset paths, category, alt text, year/date if known, and whether the item is a photo, poster, or video.
11. If the content folder contains student photos, assume permission is required before public display. Keep the implementation easy to disable or remove any such image.
12. If no suitable image exists for a section, use clean typography and whitespace rather than a random stock image.

---

## 5. Technical implementation rules

- First inspect `package.json`, source structure, framework, build scripts, routing, and existing CSS/design system.
- Continue with the current stack if it is healthy. Do not migrate frameworks or add heavy libraries without a concrete need.
- If this is a new/empty frontend, a simple React + Vite implementation is acceptable, but only initialize it after checking what is already present.
- Keep content separate from layout. Place academy details, course lists, teachers, links, and achievement entries in a central config/data file.
- Do not add a database, backend server, login, admin dashboard, payment system, booking system, chatbot, newsletter, or complicated CMS.
- No secrets or API keys are needed for this brochure/inquiry website. Do not add environment variables for public contact information unless the existing project convention calls for it.
- All external links must work. Use safe `target="_blank"` handling when opening a new tab.
- Implement semantic HTML, accessible color contrast, keyboard-friendly navigation, readable font sizes, reduced-motion support, and clear focus states.
- Add a useful page title, description, favicon if a real logo can support one, Open Graph preview metadata, and a sensible Hindi/English language strategy. Do not claim unsupported SEO ranking benefits.
- Avoid dead buttons, fake reviews, fake counters, placeholder lorem ipsum, and links with `href="#"` that do nothing.
- Keep dependencies minimal and remove no existing dependency unless necessary.

### Suggested project organization (adapt to the actual repository)

```text
project-root/
├── content/                    # Existing user-supplied images and videos; preserve originals
├── public/                     # Public static assets if used by the current stack
├── src/
│   ├── components/             # Header, section, contact form, gallery, footer
│   ├── data/
│   │   ├── academy.*            # Contact details, social links, address, tagline
│   │   ├── courses.*            # Editable courses/exams
│   │   ├── teachers.*           # Editable teacher profile text
│   │   └── media.*              # Curated media manifest
│   ├── App.*
│   └── styles/                 # Global and component styles if appropriate
├── feature.md                  # This brief
└── README.md                   # Setup and run instructions
```

This is only a suggested organization. Respect the actual project structure rather than forcing these names.

---

## 6. Central contact/configuration values

Keep these values in one place and use them everywhere; do not hard-code slightly different versions in different components.

```js
export const academy = {
  name: "Athak Prayas Academy",
  nameHindi: "अथक प्रयास एकेडमी",
  tagline: "Path to Winner",
  phonePrimary: "7348001996",
  phoneSecondary: "7348142442",
  whatsappDisplay: "7348001996",
  whatsappUrl: "https://wa.me/917348001996",
  email: "athakprayasacademy@gmail.com",
  address: "Station Road, Handia, Prayagraj, Uttar Pradesh, India",
  youtubeUrl: "https://youtube.com/@athakprayasacademy?si=-ZzPDo17ww2kFeHY",
  instagramUrl: "https://www.instagram.com/athak_prayas_academy/",
  mapsUrl: "https://maps.app.goo.gl/yKzeDNfbfZMzi3xg6?g_st=awb"
};
```

Adapt the file format to the current project language (TypeScript, JavaScript, etc.). The object above is a sample configuration, not a request to introduce a new framework.

---

## 7. WhatsApp inquiry behavior

Use a helper function so the form and course buttons produce consistent messages. Example message:

```text
Namaste Athak Prayas Academy,
I would like to enquire about admission.
Name: [student/parent name]
Phone: [phone number]
Class: [class]
Interested in: [course/exam]
Message: [optional message]
Please share the available batches, timings, and fee details. Thank you.
```

Implementation requirements:

- Use `encodeURIComponent(message)` before building the WhatsApp URL.
- Use the configured WhatsApp number and URL consistently.
- Course CTAs should include the selected course in the message automatically.
- Validate the phone field sensibly without assuming every valid Indian phone number must be written in one specific format.
- Avoid sending any data to an external service other than the user's intentional WhatsApp handoff.

---

## 8. Content tone and writing rules

- Write for students and parents in clear, warm, direct language.
- Use English and Hindi where it is genuinely useful, especially the academy name, hero, and key calls to action. Do not translate every sentence twice if doing so makes the page cluttered.
- Keep all copy editable and avoid unsupported guarantees such as “100% selection,” “best academy,” “No. 1,” or guaranteed results.
- Do not invent fee details, timings, start dates, class size, faculty experience, affiliations, reviews, or rankings.
- Ask visitors to contact the academy for current batches, fees, schedules, and admission availability.
- Use dates exactly when showing a past event, and do not label a past event “upcoming.”

---

## 9. Acceptance checklist

Before saying the work is complete, verify all of the following:

- [ ] The existing project was inspected before changes were made.
- [ ] The website clearly represents Athak Prayas Academy in English and Hindi.
- [ ] Layout uses a restrained white/light-red theme, with navy/gold only as supporting colors.
- [ ] Website looks like a real local academy website, not a generic AI landing page.
- [ ] All main navigation links scroll to the correct sections.
- [ ] Both telephone links work, email opens a mail client, and WhatsApp links open the correct number.
- [ ] YouTube and Instagram links use the supplied profiles.
- [ ] The contact form validates required fields and correctly builds a URL-encoded WhatsApp message.
- [ ] The site never claims an inquiry was sent before the user actually sends it in WhatsApp.
- [ ] No database, backend, account/login, or unnecessary features were added.
- [ ] The `content/` folder was inspected and only relevant assets were selected; originals remain untouched.
- [ ] Images have appropriate alt text and sizing; videos do not autoplay with sound.
- [ ] Student results and photos are configurable and hidden until verified/approved where needed; student roll numbers are not published.
- [ ] Old events are labeled as past events; no outdated date is shown as a future event.
- [ ] Responsive behavior, keyboard navigation, focus states, contrast, and reduced-motion behavior were checked.
- [ ] Existing lint/test/build commands were run when available, and all fixable errors were resolved.
- [ ] `README.md` contains install/run/build instructions appropriate to the repository and a note explaining that inquiries go through WhatsApp with no database.
- [ ] No placeholder buttons, broken links, lorem ipsum, fabricated claims, or console errors remain.

---

## 10. Final instructions for Claude / Gemini / coding agent

**Now implement the site in the current workspace.** Do not merely give me instructions or mockup code: edit/create the actual project files. Start by inspecting the repository and the `content/` folder. Then select the best media, create the page and reusable components appropriate to the current stack, wire the WhatsApp inquiry flow, and test the result.

When finished, report:

1. What sections and features were implemented.
2. Which media files were selected and which broad categories were ignored (do not list every irrelevant file unless useful).
3. The key files changed/created.
4. The exact command to install dependencies if needed and run the site locally.
5. Any details that still need my confirmation, especially student-result permissions, current course availability, teacher wording, or the exact academy map pin.
6. Any build/test issues that could not be resolved.

Do not claim that the website is tested, deployed, or production-ready unless those steps were actually completed.
