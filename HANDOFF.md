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

## Status
Migrating off the expired lakshp.live. URLs (meta tags, `/resume` redirect, resume link) now use lakshpradhwani.com. Remaining: the `contact@lakshp.live` address (waiting on email forwarding) and the resume PDF. `npm run build` was not run: `node_modules` is not installed in this folder (run `npm ci` first).

## Next steps
1. Replace `contact@lakshp.live` with `work@lakshpradhwani.com` in `01-Hero.jsx`, `08-Contact.jsx`, `Footer.jsx`, `SocialSidebar.jsx`, `ChatCards.jsx`, once forwarding works (otherwise visitors mail a dead address).
2. Regenerate `src/assets/resume/laksh.pradhwani.resume.pdf`: it contains the link `https://www.lakshp.live/` (export again from Profiley once its default portfolio link is updated).
3. Add a real `public/og-image.jpg` (see open questions).

## Open questions / waiting on
- `og:image` points to `/og-image.jpg` but that file does not exist in `public/` (404 on the live site), so link previews have no image. Needs an image from Laksh.
- Email forwarding (ImprovMX) for work@ and me@lakshpradhwani.com: Laksh signs up and adds aliases, then Claude adds MX/TXT in Hostinger hPanel.

## Decisions not to undo
- Domain is lakshpradhwani.com (Hostinger, bought 8 Oct 2026). Do not reintroduce lakshp.live.
- Public contact address is `work@lakshpradhwani.com`; `me@` is for personal use.
- Laksh chose small commits, pushed after each (every push to `main` goes live on Vercel). Session of 8 Oct 2026.

## Session log (newest first)
- 2026-10-08: replaced lakshp.live with lakshpradhwani.com in `index.html` (og/twitter), `netlify.toml` and `06-Resume.jsx`; emails and resume PDF still pending.
- 2026-10-08: added HANDOFF.md and the handoff hooks (Stop hook, pre-commit, `scripts/handoff.mjs`).

<!-- handoff:auto:start -->
## Auto: repo state

_Refreshed 8 Oct 2026, 11:58 pm IST by `scripts/handoff.mjs` (runs on every commit). Don't edit inside this block._

Branch: `main` · remote: https://github.com/TheRealLaksh/Portfolio-V2.git

### Last 15 commits

- `b2507a1` 2026-10-08 23:57 Add HANDOFF.md and handoff hooks
- `8355d36` 2026-05-19 12:59 Update chatbot hook endpoint linkage
- `76936c9` 2026-02-01 17:41 update
- `45e3901` 2026-01-25 07:46 fixes
- `080e1b9` 2026-01-25 07:38 fix
- `2b018d6` 2026-01-25 07:25 fixes
- `32713d4` 2026-01-25 07:21 mobile layout fix
- `463e602` 2026-01-21 09:00 Update 08-Contact.jsx
- `4f5d709` 2026-01-21 08:40 redirect
- `b5dc396` 2026-01-17 13:15 Create me.webp
- `66f565d` 2025-12-31 01:43 Delete spotify.js
- `5512e66` 2025-12-31 01:42 Update useSpotify.js
- `87727d6` 2025-12-31 01:38 update
- `a6d1344` 2025-12-31 01:30 SECURITY: Remove .env from version control
- `0ec9bfd` 2025-12-31 01:17 bg fix

### Uncommitted changes at refresh time

```
M  HANDOFF.md
M  index.html
M  netlify.toml
M  src/components/sections/06-Resume.jsx
```
<!-- handoff:auto:end -->
