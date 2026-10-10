# Portfolio-V2 handoff

## Project
Laksh Pradhwani's personal developer portfolio (v2): React + Vite single-page app with scroll-driven motion, Three.js visuals and an AI chat assistant. Owner and only developer: Laksh. Public audience: recruiters, clients, college.

## Links
- Live: https://lakshpradhwani.com (www redirects here). Old domain lakshp.live is expired and dead.
- Repo: https://github.com/TheRealLaksh/Portfolio-V2 (push to `main` auto-deploys on Vercel, project `portfolio-v2-llp`)
- Local: `C:\Users\laksh\OneDrive\Documents\Personal Projects\Portfolio-V2`
- Chatbot backend: `..\Portfolio-Chat_Bot` (separate repo and Vercel project)
- Obsidian: `02 Projects\Personal\Portfolio V2.md`, domain audit `05 Resources\lakshp.live Usage Audit.md`, domains `05 Resources\Domains.md`

## Stack, run, deploy
React, Vite, Tailwind, Framer Motion, React Three Fiber, Lenis, AOS, react-router.
`npm run dev` / `npm run build` / `npm run lint`. Deploy = push to `main`. `netlify.toml` is a leftover (only holds the `/resume` redirect); `autocommit.sh` is an old helper loop, not used by the hooks.

## Code map
- `index.html`: meta, og/twitter tags
- `src/components/sections/`: numbered page sections (`01-Hero.jsx`, `06-Resume.jsx`, `08-Contact.jsx` ...)
- `src/components/layout/`: `Footer.jsx`, `SocialSidebar.jsx`
- `src/components/chat/`: chat UI (`ChatCards.jsx`)
- `public/`: icons, manifest, `sw.js`, `me.webp`
- `public/signature/`: images used in Laksh's Gmail signatures, hosted at https://lakshpradhwani.com/signature/<file>. `icon-linkedin.png`, `icon-github.png`, `icon-instagram.png` (36x36, white Simple Icons glyph on black circle) are the live signature icons. `lp-logo.png` is no longer in the signature but is kept because older sent emails reference it. Do not move or delete these or the signature images break.

## Status
**Redesign in progress on branch `feat/skyline-world` (not on `main`, so the live site is unchanged).** Direction (10 Oct 2026): a scroll-driven interactive world, camera never cuts, built around the 3D contribution skyline. The laptop push-in and AI-photo hero ideas were rejected. Chapters: opening, who, ShiftsDeal, Profiley, tools + live GitHub, curated timeline (scroll = time), resume rendered by Profiley's engine, pricing (3 tiers, numbers to update), AI twin + contact. Full plan and decisions are in Claude memory `portfolio-redesign-2026` and the Obsidian note `02 Projects\Personal\Portfolio V2.md` (to be updated). Laksh is sending 3-5 reference sites for the world and camera feel.

Built so far: `src/components/world/ContributionSkyline.tsx` (MIT component by Kedhareswer Naidu from 21st.dev, adapted: scroll-driven `progress` and `sceneRef` added; licence in `THIRD_PARTY_NOTICES.md`; canvas 2D, no three.js), real GitHub data in `src/data/contributions.json` (365 days, 1,245 contributions, fetched with `gh api graphql` on 10 Oct 2026), and an unlinked lab page at `/lab/skyline` (`src/pages/SkylineLab.jsx`).

Migrating off the expired lakshp.live. URLs (meta tags, `/resume` redirect, resume link) now use lakshpradhwani.com. The contact address is now `work@lakshpradhwani.com` (Cloudflare Email Routing forwards it to Laksh's Gmail). Remaining: the resume PDF. `npm run build` passes (10 Oct 2026). `node_modules` is installed with `npm install --no-package-lock`, because `npm ci` fails: `package-lock.json` is out of sync with `package.json` (lock has vite 7 / react-router 7, package.json says vite 5 / react-router 6). Do not rewrite the lock without checking what Vercel installs.

## Next steps
1. Adapt the skyline for the film (scroll-driven `progress` is done): a camera zoom/pan that flies along the weeks, a bare full-bleed mode with a transparent canvas, milestone markers drawn on the skyline, and a custom palette. Then place it as a chapter once the world design is agreed.
2. Wait for Laksh's reference sites before designing the rest of the world; collect: updated pricing numbers, a curated milestone list, ShiftsDeal permission for screenshots.
3. Refresh `src/data/contributions.json` automatically (daily GitHub Action) instead of by hand; keep it real data only.
4. Regenerate `src/assets/resume/laksh.pradhwani.resume.pdf`: it contains the link `https://www.lakshp.live/` (export again from Profiley once its default portfolio link is updated).
5. Optionally replace `public/og-image.jpg` with a designed 1200x630 image (the current one is a cropped screenshot of the hero).

## Open questions / waiting on
- Laksh's 3-5 reference links for the 3D world (requested 10 Oct 2026).
- Copyright line in `THIRD_PARTY_NOTICES.md` is the author name as shown on 21st.dev; confirm against the author's repository before redistributing.
- Mail forwarding is verified: test mails to work@ and me@ showed "Forwarded" in Cloudflare's activity log on 9 Oct 2026.

## Decisions not to undo
- Domain is lakshpradhwani.com (Hostinger, bought 8 Oct 2026). Do not reintroduce lakshp.live.
- Public contact address is `work@lakshpradhwani.com`; `me@` is for personal use.
- Laksh chose small commits, pushed after each (every push to `main` goes live on Vercel). Session of 8 Oct 2026. Chosen again 10 Oct 2026; redesign commits go to branch `feat/skyline-world` so nothing reaches production until Laksh approves a merge to `main`.
- Keep `overflow-x: clip` (not `hidden`) on `body` and the Layout wrapper: `hidden` breaks `position: sticky` for every pinned scene.
- No AI-generated photos or laptop-on-desk hero. No fake stats: only real GitHub data, never the component demo's sample numbers.

## Session log (newest first)
- 2026-10-10: `ContributionSkyline` gets a `bare` mode (transparent, no card, fills its container) and the lab page a sticky scroll-scene preview that drives it.
- 2026-10-10: `src/index.css` body and `Layout.jsx` wrapper use `overflow-x: clip` instead of `hidden` (body also `overflow-y: visible`). `hidden` made them scroll containers, which stopped `position: sticky` pinned scenes from working. Checked no sideways scroll on `/` at 1280 and 375 px.
- 2026-10-10: `ContributionSkyline.tsx` now takes `progress` (0 to 1) or a `sceneRef.set({ progress })` handle so scroll drives the flat-to-skyline morph; the timer still works when `progress` is undefined. `/lab/skyline` has a scroll slider to test it.
- 2026-10-10: added real GitHub contribution data (`src/data/contributions.json`), the unlinked `/lab/skyline` page and its route in `src/App.jsx`.
- 2026-10-10: added `src/components/world/ContributionSkyline.tsx` (unmodified MIT component from 21st.dev) and `THIRD_PARTY_NOTICES.md`; created branch `feat/skyline-world`; installed deps with `npm install --no-package-lock`.
- 2026-10-09: removed `Shopping-demo` from `REPO_NAMES` in `src/hooks/useGitHub.js` (the repo is now private, so the GitHub API would 404 for it).
- 2026-10-09: replaced `public/og-image.jpg` with a hero crop captured while the headline reads "a Web Developer" (the first version showed "a Passionate Learner").
- 2026-10-09: added `public/signature/icon-{linkedin,github,instagram}.png` for the new Gmail signature (logo removed from the signature at Laksh's request).
- 2026-10-09: added `public/og-image.jpg` (1200x630 crop of the live hero); `index.html` already pointed at it, so link previews (LinkedIn, WhatsApp, X) now have an image instead of a 404.
- 2026-10-09: added `public/signature/lp-logo.png` (opaque version of `icon-192.png`) to host the logo for the Gmail signature on the new domain.
- 2026-10-09: replaced `contact@lakshp.live` with `work@lakshpradhwani.com` in `08-Contact.jsx`, `01-Hero.jsx`, `Footer.jsx`, `SocialSidebar.jsx`, `ChatCards.jsx`. Domain DNS moved to Cloudflare (nameservers george/ruth.ns.cloudflare.com); MX + SPF live; work@ and me@ forward to Gmail.
- 2026-10-08: replaced lakshp.live with lakshpradhwani.com in `index.html` (og/twitter), `netlify.toml` and `06-Resume.jsx`; emails and resume PDF still pending.
- 2026-10-08: added HANDOFF.md and the handoff hooks (Stop hook, pre-commit, `scripts/handoff.mjs`).

<!-- handoff:auto:start -->
## Auto: repo state

_Refreshed 10 Oct 2026, 2:37 pm IST by `scripts/handoff.mjs` (runs on every commit). Don't edit inside this block._

Branch: `feat/skyline-world` · remote: https://github.com/TheRealLaksh/Portfolio-V2.git

### Last 15 commits

- `1a5add5` 2026-10-10 14:37 Clip sideways overflow instead of hiding it so sticky scenes pin
- `df2c361` 2026-10-10 14:34 Drive the skyline morph from scroll
- `649144a` 2026-10-10 14:31 Add real contribution data and an unlinked skyline lab page
- `4a37ac3` 2026-10-10 14:31 Add the contribution skyline component
- `5b18fc7` 2026-10-09 13:40 Drop the private Shopping-demo repo from the GitHub project list
- `afa14ab` 2026-10-09 13:15 Use the Web Developer hero frame for og-image
- `21ba901` 2026-10-09 13:04 Add social icons for the email signature
- `8966bdf` 2026-10-09 01:07 Add the missing og-image for link previews
- `4c1deb1` 2026-10-09 00:59 Host the LP logo for the email signature
- `2d7b824` 2026-10-09 00:32 Use work@lakshpradhwani.com as the contact address
- `f536175` 2026-10-08 23:58 Point site URLs at lakshpradhwani.com
- `b2507a1` 2026-10-08 23:57 Add HANDOFF.md and handoff hooks
- `8355d36` 2026-05-19 12:59 Update chatbot hook endpoint linkage
- `76936c9` 2026-02-01 17:41 update
- `45e3901` 2026-01-25 07:46 fixes

### Uncommitted changes at refresh time

```
M  src/components/world/ContributionSkyline.tsx
M  src/pages/SkylineLab.jsx
```
<!-- handoff:auto:end -->
