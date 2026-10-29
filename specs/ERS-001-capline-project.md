# ERS-001 — "Projects" section with a Capline card

Repo `/Users/kike/clawd/projects/erslabs-landing` (Next.js 14, static export to `out/`, Tailwind,
lucide-react). Live at `https://erslabs.net`. Base `main`.

## Goal

The section now called "Case Study" (`components/CaseStudy.tsx`) becomes **Projects** and shows two
cards: the existing **Synapseia Network** card, unchanged, then a new **Capline** card built with the
same markup and classes. The Capline card links to `https://capline.erslabs.net`.

## Contract

### 1. Rename "Case Study" → "Projects"

- Section eyebrow text `Case Study` → `Projects`. Section `id="case-study"` → `id="projects"`.
- `components/Header.tsx:9` nav item → `{ label: 'Projects', href: '#projects' }`.
- `components/Footer.tsx:19` link → `href="#projects"`, text `Projects`.
- `components/Hero.tsx:88` `href="#case-study"` → `href="#projects"`.
- Heading stays `Real Projects, Real Results`. Subtitle `See what we built for our clients.` →
  `Platforms we build for clients and products we ship ourselves.`
- Rename the component and file: `CaseStudy` → `Projects` (`components/Projects.tsx`), and update its
  import in `app/`. `git grep -n "case-study\|CaseStudy\|Case Study"` → 0 hits outside `out/` and
  `.next/`.

### 2. One card component, two data entries

Refactor the card into a `ProjectCard` driven by a typed `Project` object (in the same file):
name, tagline, badge, url label, optional href, screenshot (src, alt, width, height), challenge
text, features (icon + text), tech tags, three footer stats. The Synapseia entry reproduces the
current card **byte-for-byte in rendered text, classes and image** (same strings as today in
`CaseStudy.tsx`). Cards stack vertically with `space-y-10` between them. Each card keeps its own
`useInView` fade-in.

### 3. The Capline entry (exact copy)

- Header icon: lucide `Captions`. Name `Capline`. Tagline `On-device captions & video editor for Android`.
- Badge: `LAUNCHING` (same classes as `SHIPPED`).
- Browser-bar URL text: `capline.erslabs.net`. The whole screenshot block is an `<a>` to
  `https://capline.erslabs.net` with `target="_blank" rel="noopener noreferrer"`.
- Screenshot `public/screenshots/capline-landing.png`, 1200×750, alt
  `Capline landing page - on-device captions and video editor for Android`. Produce it by rendering
  `/Users/kike/clawd/projects/best-app/design/site/landing-v2.design.html` (the approved Capline landing
  design) in headless Chromium at viewport 1200×750, device scale 1, after a 1.5 s wait, top of the
  page. Compress to ≤ 300 KB (PNG via `pngquant`, or WebP with the same 1200×750 and update the
  extension). The live landing is being rebuilt to this design; re-capturing from the live site is
  a later task, not this one.
- The Challenge:
  `Build a mobile video editor that turns a raw clip into a captioned, ready-to-post vertical video
  without sending audio or text to any server. Speech recognition, translation, caption rendering
  and export all run on the phone, plus a full-screen teleprompter and voiceover for creators who
  record their own scripts.`
- Key Features (icon — text):
  - `Mic` — `On-device speech-to-text captions with whisper.cpp`
  - `Languages` — `Caption templates and bilingual subtitles, translated on the phone`
  - `Scissors` — `AI Cut: removes silences and dead air automatically`
  - `ScrollText` — `Full-screen teleprompter with voiceover recording`
  - `Smartphone` — `Vertical 9:16 export ready for Reels, Shorts and TikTok`
  - `Lock` — `Capline Pro through Google Play Billing`
- Tech Stack tags: `Kotlin`, `Jetpack Compose`, `Media3`, `whisper.cpp`, `ML Kit`, `Hilt`,
  `Coroutines`, `Play Billing`.
- Footer stats (value / label): `100%` / `On-device AI`; `0 bytes` / `Audio Uploaded`;
  `Android 8+` / `Compatibility`.
- Under the Tech Stack tags, a text link `Visit capline.erslabs.net` with lucide `ArrowUpRight`,
  `text-sm font-semibold text-brand-400 hover:text-brand-300`, same href/target/rel as above.
  Synapseia has no `href`, so it renders no link and no anchor around its screenshot.

If a lucide icon name above does not exist in the installed `lucide-react` version, use the closest
existing one and name the substitution in the report.

## Acceptance

1. `npm run build` exits 0 and `npm run lint` exits 0 (paste the tail of both). If `next lint`
   prompts for setup because no ESLint config exists, say so and paste it; do not add a config.
2. In `out/index.html`: `Projects` appears as the nav label and section eyebrow; `id="projects"`
   exists; `case-study` has 0 hits; `https://capline.erslabs.net` appears exactly twice, each with
   `target="_blank"` and `rel="noopener noreferrer"`. Paste the greps.
3. Serve `out/` locally and take screenshots of the Projects section at 1440×900 and 375×812 into the
   ignored `qa/ERS-001/` (add `qa/` to `.gitignore`). At 375 px `document.documentElement.scrollWidth
   <= 375` (paste the value). Both cards fully visible after scrolling (scroll each into view before
   the shot so the fade-in has run).
4. Synapseia unchanged: paste a diff of the visible text of the Synapseia card (from the built HTML)
   before and after → empty.
5. Nav: clicking `Projects` in the header scrolls to the section (paste `location.hash` and the
   section's `getBoundingClientRect().top` after the click).

## Out of scope

No deploy (the coordinator deploys after review). No other section changes. No new dependencies.

## Delivery

One commit `ERS-001: Projects section with a Capline card` on the branch the cycle names, author
email `enrique.rubio.developer@gmail.com` (`git -c user.email=enrique.rubio.developer@gmail.com
commit ...`; the repo's local config has a work email that must not be used). Report
`REPORT-ERS-001.md` at the worktree root (not committed).
