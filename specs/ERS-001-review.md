# ERS-001 r1 — Review (Projects section + Capline card)

Repo `/Users/kike/clawd/projects/erslabs-landing`. Review branch `fix/ers-001-impl` at **84506f1**,
base `main` (`ac3fa8f`). Contract: `/Users/kike/clawd/projects/erslabs-landing/specs/ERS-001-capline-project.md`
(read it fully: every string in §3 is exact copy). Implementer's report (claims, not evidence):
`/Users/kike/clawd/projects/erslabs-landing/ERS-001-impl-r1/REPORT-ERS-001.md`.

Reproduce every claim you rule on, with the command and its real output pasted.

## What to verify

1. `npm ci` (or `npm install` if no lockfile match) and `npm run build` → exit 0 on 84506f1. `npm run lint`
   exits 1 because the repo has no ESLint config: confirm it also exits 1 on `ac3fa8f` (pre-existing,
   not a finding).
2. **Copy**: every string of contract §1 and §3 appears verbatim in `out/index.html` (name, tagline,
   badge, URL label, challenge, the six features, eight tech tags, three stats, link text, subtitle).
   Paste a script that checks each and its output. A missing or altered string is a MEDIUM.
3. **Rename**: `git grep -n "case-study\|CaseStudy\|Case Study" 84506f1 -- ':!specs' ':!out' ':!.next'`
   → 0 hits. `components/CaseStudy.tsx` is gone (not left as dead code).
4. **Synapseia unchanged**: build `ac3fa8f` and 84506f1, extract the Synapseia card's visible text and
   classes, diff → empty.
5. **Links**: exactly two `https://capline.erslabs.net` anchors, both `target="_blank"` and
   `rel="noopener noreferrer"`; Synapseia renders no anchor around its screenshot.
6. **Screenshot**: `public/screenshots/capline-landing.png` is 1200×750 and ≤ 300 KB (paste `file` and
   size). Open it and describe what it shows: it must be the top of the Capline landing (nav + hero),
   not blank, not cut mid-section.
7. **Visual**: serve `out/`, screenshot the Projects section at 1440×900 and 375×812 (scroll each card
   into view first). At 375 px `scrollWidth <= 375`. Describe both cards: same structure, nothing
   overlapping, stats row readable. Header `Projects` click → `#projects`.
8. `.gitignore` contains `qa/`; no file under `qa/` is committed.

## Delivery

Read-only review: do not commit. Report `REVIEW-ERS-001-r1.md` at your worktree root. First line
`VERDICT: SAFE` or `VERDICT: CHANGES`, then counts; one `### <SEV>-<n>` heading per finding with
location, reproduction and fix; then a `NO VERIFICADO` list.
