# Portfolio — Claude Context
Last updated: 2026-03-25

---

## Project Overview
Minecraft x Pokémon themed personal portfolio for Justin Woo Sung Chun.
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion.
Dev server: `npm run dev` → http://localhost:3000
GitHub: https://github.com/justintime8282/justin-portfolio-2026.git
Live (Vercel): https://justin-portfolio-2026-psi.vercel.app
Custom domain: https://justinchun.space

---

## What's Built

| Feature | Status |
|---------|--------|
| Pokéball loading screen (shake → explode → reveal, ~3s total) | ✅ |
| Password gatekeeper screen (before loading screen) | ✅ |
| 5-section snap-scroll layout (mandatory mobile / free desktop) | ✅ |
| Focus Mode (sections fade 0.7 → 1.0 on scroll) | ✅ |
| Vertical nav (right side desktop, left side mobile, dots only on mobile) | ✅ |
| Scroll spy (scroll event + offsetTop math) | ✅ |
| Jukebox — YouTube IFrame API, Play/Pause button (top-left) | ✅ |
| Music callout popup (blinks twice early, settles solid, dismisses on scroll/click/OK) | ✅ |
| Copy-to-clipboard email button with toast | ✅ |
| Walking Party animation (top strip, scroll-triggered party joining) | ✅ |
| Big Ash on Home — welcome bubble + wiggles + runs left on scroll | ✅ |
| Profile photo in About Me (left of bio card, stacks on mobile) | ✅ |
| Interactive About Me (clickable Background + Fun Facts tags → scroll to section) | ✅ |
| Quest Log — single column, Key Wins / What I Built structure | ✅ |
| Fun Facts cards with bullet descriptions + photo strips | ✅ |
| Pixel art SVG sprites and icons throughout | ✅ |
| Scrollbar mask (hides scrollbar above green grass line) | ✅ |
| Mobile responsive layout | ✅ |
| Open Graph / Twitter Card meta tags | ✅ |
| Deployed to Vercel + justinchun.space | ✅ |

---

## Password Gatekeeper (PasswordScreen.tsx)
- Shown before LoadingScreen — user must pass to enter
- Password: `s62o` (4 characters, mixed)
- Reads from `process.env.NEXT_PUBLIC_SITE_PASSWORD ?? "s62o"` — set in Vercel env vars
- Static Pokéball (no animation), centered on screen
- 4-char input (type="password"), shake animation on wrong entry
- Authenticated state lives in `page.tsx`: `const [authenticated, setAuthenticated] = useState(false)`

---

## Jukebox (Jukebox.tsx)
- **No Spotify** — replaced with YouTube IFrame API (no extra package)
- Video ID: `6CjpgFOOtuI`
- Hidden 1×1px iframe, audio only

### Button — responsive (desktop vs mobile)
| | Desktop (lg+) | Mobile (< lg) |
|---|---|---|
| Position | `left-5 top-[80px]` (below bar) | `left-3 top-[13px]` (centered in 60px character area) |
| Content | `🔇 Music` / `🔊 Music` emoji + text | `PixelNote` SVG icon only (no text) |
| Padding | `px-4 py-2` | `px-3 py-1` |

### PixelNote component
- 8×6 pixel grid — double eighth notes joined by thick 2-row beam (♫ shape)
- Green (#4ade80) when playing, grey (#888888) when paused/muted
- Shown mobile only via `<span className="lg:hidden">`, desktop uses `<span className="hidden lg:inline">`

### Callout popup
- Text (3 lines, each `whitespace-nowrap`):
  ```
  Click the top-left button
  to enjoy some tunes
  while reading! Enjoy 😊
  ```
- Style: `text-base md:text-xl`, `px-4 py-3 md:px-8 md:py-5`, `max-w-[90vw]`
- Blink animation: blinks **twice** immediately after appearing, then settles solid
  - `opacity: [0, 1, 0.15, 1, 0.15, 1, 1]`, `times: [0, 0.08, 0.22, 0.38, 0.52, 0.68, 1]`, `duration: 2.4`
- Dismisses on first click, scroll, or OK button (ref-guarded, fires once)
- Exit animation: `duration: 0.1` (instant feel)

---

## Big Ash (PortfolioContent.tsx — Home section)
- Large Ash sprite (px=12), 12 rows tall (shortened legs, box shoes)
- Rendered **inside the Home section flex column**, above the `h1` — NOT `position: fixed`
- Visible only when `activeSection === "home"`
- Idle: stands still (no bob)
- On scroll away: quick 2-jump wiggle (y: 0→-16→0→-16→0, 0.35s) then sprints left (x: -1500, 0.5s, delay 0.2s)
- `marginBottom: 16` wrapper keeps gap to name consistent

### Welcome Bubble (above BigAsh)
- CSS div approach (no SVG — avoids seam artifacts)
- Main body: white 112×56px div with "Welcome!" text
- Tail: two stepped divs at bottom-left (gap from box: 6px), stepped down-left
- Positioned: `left: "calc(100% + 16px)"`, `top: "-10px"` (to Ash's right)
- **Exit before Ash**: bubble exit `duration: 0.2`, Ash exit starts at delay 0.2s
- **Entrance after Ash**: bubble `transition delay: 0.5s` so Ash appears first
- Hidden on small screens: `className="hidden sm:block"`

---

## Walking Party — Current Sequence
Characters join as user scrolls. Strip is fixed at top of viewport (72px tall).
Strip background: `#1a1a2e` (opaque — prevents content bleeding through).

| Section | Characters visible |
|---------|-------------------|
| Home | None |
| About Me | Trainer (Ash) |
| Quest Log | + Pikachu |
| Fun Facts | + Charmander |
| Contact | + Snorlax |

---

## Sprite Details

### Trainer (Ash) — 10 × 12 rows, px=3 (small) / px=12 (big)
12 rows total (shortened from 14 — removed 1 extra leg row and bent sole row):
- Hat crown: cols 3-7 (red)
- Hat body: cols 2-7 (red)
- Hat brim: cols 0-7 (white, 8 wide — 2px left overhang)
- Hair, face + eyes, jacket rows (same as before)
- Pants: 1 row
- Legs: 1 row (shortened — was 2)
- Shoes: 1 row, same width as legs (box-shaped — no bent soles)
- Colors: red hat (#cc1100), black hair (#111111), skin (#f5c9a0), blue jacket (#3454a8), dark pants (#1a2a8c), dark shoes (#222222)
- Same pixel array used in both WalkingParty.tsx (TRAINER) and PortfolioContent.tsx (BIG_TRAINER)

### Pikachu — 8 × 11, px=3
- Yellow body with brown ear tips and red cheeks, black dot eyes

### Charmander — 8 × 12, px=3
- Orange body with cream belly, blue eyes
- Tail exits from left side of body, fully symmetric legs

### Snorlax — 14 × 14, px=4
- Teal body with snowman silhouette (head + belly + waist dip)
- Cream inner ear, cream muzzle with dark eyes, large cream belly

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Root: auth state, loading state, containerRef, scroll container, all top-level components |
| `src/app/layout.tsx` | VT323 font, metadata, OG/Twitter tags |
| `src/app/globals.css` | Theme vars, pixel-border, GPU acceleration, SVG crisp-edges, keyframes |
| `src/hooks/useActiveSection.ts` | Scroll spy — closest section center to viewport center |
| `src/components/FocusSection.tsx` | Section wrapper — IntersectionObserver opacity (1.0 / 0.7), pre-trigger margin |
| `src/components/LoadingScreen.tsx` | 3-phase Pokéball animation (hydration-safe starfield) |
| `src/components/PasswordScreen.tsx` | Password gatekeeper with static Pokéball |
| `src/components/PixelPokeball.tsx` | Pokéball SVG sprite |
| `src/components/PortfolioContent.tsx` | All 5 sections + pixel icons + copy button + BigAsh + welcome bubble |
| `src/components/VerticalNav.tsx` | Right side (desktop) / left side (mobile, dots only) scroll nav |
| `src/components/Jukebox.tsx` | YouTube IFrame API audio player (top-left) |
| `src/components/WalkingParty.tsx` | Walking sprite animation (top strip) |

---

## Section Content

### Home
- Big Ash sprite with welcome bubble above name, exits left on scroll
- Name: Justin Chun (white, large)
- Subtitle: **"AI-Driven GTM Operator"** (yellow, `text-2xl md:text-3xl`)
- Buttons: About Me (green), Quest Log (yellow), Fun Facts (orange), Contact Me (blue)

### About Me
- `max-w-6xl` container (wider than other sections)
- Profile photo: `public/Profile.jpg` (capital P — case-sensitive for Vercel Linux build)
  - Left of bio card on desktop (`md:flex-row`), centered above text on mobile (`flex-col`)
  - 140×160px with pixel-border, `mx-auto md:mx-0`
- **Bio text**: "Hey there! I'm Justin — an AI-driven GTM operator focused on building systems that turn complex revenue problems into measurable outcomes. From scaling SaaS platforms to complex M&A integrations, I design and deploy systems that directly impact pipeline, forecasting, and revenue growth."

#### Two-column grid below bio card:

**Left column — Background card** (contains Background + Fun Facts teaser)
- `▶ Background` label with `👆 Click for more` hint (appears on About Me visit, 4.5s, blinks 3x then fades)
- Clickable buttons: `[Role @ Company]` + plain year text
  - `[RevOps Lead @ Advantive]  2025–` (green)
  - `[Director @ EY-Parthenon]  2018–2024` (yellow)
  - `[Founder @ Beebop]  2025–` (orange)
- Plain text below divider: NYU Stern · English/Korean/Mandarin/Japanese
- `▶ Fun Facts` section (inside same card, below divider) with same hint
  - `[Running]` (green) `[Racket Sports]` (blue) `[Hawaii Sabbatical]` (yellow) `[Military]` (red)
- Clicking any button calls `scrollToId()` using `getBoundingClientRect` to center target in viewport

**Right column — Tools card**
- `▶ AI & Automation` (blue label):
  - Row 1: ChatGPT · Claude (MCP) · Gemini · Notion
  - Row 2: NotebookLM · Gamma
- Divider
- `▶ Data & Systems` (green label):
  - Row 1: Salesforce · HubSpot · SQL · Tableau
  - Row 2: ZoomInfo · Outreach · Glyphic · Hyperbound
  - Row 3: Google Workspace · Microsoft Office
- All tiles: `border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300`

### Quest Log
- Single column layout (`flex flex-col gap-8`), `max-w-3xl` container
- **Card structure** (all 3 cards identical):
  - Company name + dot icon
  - Title (colored) + Period (right-aligned, same row, `justify-between`)
  - Italic 1-line summary
  - `🔥 / Key / Wins` label box (left) + bullet list (right) — `w-24 flex-col items-center`
  - `⚙️ / Built` label box (left) + bullet list (right)
  - Label boxes: `text-lg uppercase`, color-bordered, stretch full height of bullet list
- Cards scroll-targeted from About Me via `id="quest-advantive"` / `"quest-eyparthenon"` / `"quest-beebop"`

**Advantive** (green) — Revenue Strategy & Operations Lead · Mar 2025–Present
- Summary: "Building AI-driven GTM systems across a $200M+ PE-backed SaaS platform"
- Key Wins (4 bullets): upsell targeting +25%, $1.6M ARR cross-sell NRR 105%→115%, forecast 70%→90%+ sustained 3Q, ~$1M pipeline recovery
- What I Built (6 bullets): LLM pipeline gap workflows, upsell targeting model, forecasting infrastructure, cross-sell system 150+ accounts, GTM systems, M&A integration playbook

**EY-Parthenon** (yellow) — Director, Consulting · Sep 2018–Aug 2024
- Summary: "Solved complex GTM and operating model problems across $50M–$1B businesses"
- Key Wins: $2B+ transactions 20+ acquisitions, GTM/operating models, cross-functional strategy
- What I Built: market/revenue models, operating model blueprints, execution roadmaps

**BEEBOP** (orange) — Social Platform Founder · Nov 2025–Present
- Summary: "Building a proximity-based social product to enable real-world connections"
- Key Wins: MVP from zero, proximity-based concept, cross-functional execution
- What I Built: 0→1 product/GTM strategy, user behavior models, rapid iteration system

### Fun Facts — Achievement Order (4 achievements)
Each card: header strip (badge) + pixel icon + title + bullet points + photo strip (centered, `objectFit: cover`)

1. **Running Enthusiast** | Stamina Achievement | PixelRunner (green)
   - "Ran half marathons, ice cream runs, and halloween runs"
   - "Full marathon? Here I come!"
   - Photos: running-nyc-half · running-icecream · running-halloween

2. **Racket Sports Enthusiast** | Social Achievement | PixelTennis (blue #60a5fa)
   - "Hosted 100+ tennis club events over 2.5 years for 50+ players"
   - "Annual US Open attendee — as a passionate spectator"
   - "Love all racket sports — table tennis, golf, badminton (but not pickleball)"
   - Photos: racket-usopen · racket-tennis · racket-golf (`objectFit: contain`, height 180px)

3. **Hawaii Sabbatical** | Explorer Achievement | PixelSun (yellow)
   - "Month-long escape to Honolulu — traded spreadsheets for sunsets"
   - "Certified poke & sushi connoisseur and obsessive local restaurant explorer"
   - "Whale watching at sunrise, spontaneous ocean dives, and zero regrets"
   - Photos: hawaii-whale · hawaii-snorkel (pos: center 30%) · hawaii-trail

4. **Elite Warrior 특급전사** | Rare Achievement | PixelShield (red + gold star)
   - "Served in the Korean Army — awarded the Elite Warrior 특급전사 medal, the highest individual combat-readiness distinction"
   - "Attempted eggs sunny side up on a military shovel under questionable conditions — unsanitary, unsuccessful, never again 🍳"
   - h3 has `style={{ wordBreak: "keep-all" }}` so 특급전사 wraps as a whole word on mobile
   - Photos: military-patch · military-troops · military-egg

#### Photo data structure
```ts
photos: Array<{ src: string; pos?: string; fit?: string }>
// pos defaults to "center", fit defaults to "cover"
// racket-golf uses fit: "contain" + height 180px (to show full person)
// hawaii-snorkel uses pos: "center 30%"
```
All photo assets in `public/fun/`.

#### Click hints (About Me → Fun Facts scroll)
- `showClickHint` state, triggered when `activeSection === "about"`, auto-dismiss after 4.5s
- `👆 Click for more` text appears next to ▶ Background and ▶ Fun Facts labels
- Animation: `opacity: [0,1,0,1,0,1,0.9,0.9,0]`, `duration: 4.5`, blinks 3x then fades

### Contact
- Header: "[ Contact ]" (blue)
- Paragraph: "Have a strategy challenge`<br className="md:hidden" />` or want to team up?`<br />`Send a message and let's talk!"
- Copy email: `justin.chun@stern.nyu.edu`
- Copy icon: both boxes filled blue (#60a5fa) normally, light grey (#d1d5db) when copied
- Toast: light grey background (#d1d5db), dark grey text (#374151)
- Email button: `text-base md:text-2xl`, `px-4 py-3 md:px-8 md:py-4`

---

## Mobile Responsive Layout (all mobile-only unless noted)

### Scroll Container (page.tsx)
- **Snap type is viewport-responsive** (JS-driven via `useEffect` + `useState`):
  - Desktop (≥1024px): `"none"` — free scroll, no snapping (original desktop feel)
  - Mobile (<1024px): `"y mandatory"` — always locks to nearest section on swipe
  - Updates on window resize too
- `scrollPaddingTop: 72` (offsets snap to clear the 72px fixed walking party bar)
- `overflowX: "hidden"` (prevents horizontal bleed from absolute-positioned bubble)

### VerticalNav (VerticalNav.tsx)
- Desktop (lg+): right side, `right-5`, labels visible
- Mobile (< lg): left side, `left-2`, labels hidden (`hidden lg:inline`), dots only
- Class: `fixed left-2 lg:left-auto lg:right-5 top-1/2 z-40 -translate-y-1/2 flex flex-col items-start lg:items-end gap-3 lg:gap-4 font-pixel`

### Section Padding
- Home: `px-4 md:px-6 pt-20` (pt-20 kept to clear 72px bar)
- About / Quest Log / Fun Facts / Contact: `px-4 md:px-6 pt-20 pb-12 md:py-20`

### FocusSection (FocusSection.tsx)
- `amount: 0.05` (was 0.3 — fires as soon as 5% enters view)
- `margin: "150px 0px 150px 0px"` (pre-triggers fade-in 150px before snap completes)
- `duration: 0.25` (was 0.5 — faster transition)
- `opacity: 0.7` when not in view (was 0.08 — prevents dark flash on mobile snap)

### GPU / Rendering (globals.css)
- `section { backface-visibility: hidden; transform: translateZ(0); }` — force GPU layer
- `svg { image-rendering: crisp-edges; image-rendering: pixelated; }` — cross-browser pixel art
- `body { -webkit-font-smoothing: antialiased; }`

---

## Metadata (layout.tsx)
- **Tab title**: "Justin's Webspace | Career & Adventure"
- **Description**: "A pixel-art journey through the career and side-quests of Justin Chun, Strategy & Ops professional."
- **OG title**: "Justin's Webspace | Career & Adventure"
- **OG image**: `/og-image.png` (1200×630px — user must place screenshot file at `public/og-image.png`)
- **metadataBase**: `https://justin-portfolio-2026-psi.vercel.app`

---

## Design Decisions & Rules (important — don't break these)

1. **Scroll architecture**: `containerRef` div in page.tsx owns scroll. `overflowY: scroll`, snap type is JS-driven (`"none"` desktop / `"y mandatory"` mobile), `scrollPaddingTop: 72`. `html, body { overflow: hidden }` prevents double scrollbar.
2. **Scroll spy**: Uses scroll events + `offsetTop + offsetHeight/2` math. IntersectionObserver was abandoned (failed on tall sections).
3. **LoadingScreen**: `onAnimationComplete` ONLY on inner shake div — not outer spring div. Outer div fires too early (~0.5s).
4. **Nav color sync**: Home=white, About=green (#4ade80), Quest Log=yellow (#facc15), Fun Facts=red (#ef4444), Contact=blue (#60a5fa).
5. **Landing name**: plain white, no gradient or color split.
6. **BEEBOP quest icon**: plain colored square dot (no emoji or map icon).
7. **Scrollbar mask**: 14×72px fixed div (z-35, background #1a1a2e) at top-right hides scrollbar above green grass line.
8. **Walking party visibility**: uses `char.section` field compared against `SECTION_ORDER` index — NOT array index.
9. **Walking party strip background**: must keep `background: "#1a1a2e"` on the outer 72px div — prevents section content from bleeding through on scroll.
10. **BigAsh must NOT use `position: fixed`**: Framer Motion applies CSS transforms to animated ancestors, which breaks fixed positioning. BigAsh lives inside the Home section flex column instead.
11. **Jukebox autoplay blocked by browsers**: Using manual play/pause only. Do not attempt autoplay — browsers require user gesture.
12. **Profile.jpg is case-sensitive**: Must be `Profile.jpg` (capital P) for Vercel Linux build. Do not rename to `profile.jpg`.
13. **Desktop layout must not change**: All mobile fixes use `md:`, `lg:`, `max-md:` prefixes. Desktop (>1024px) is the master design.
14. **scrollToId uses getBoundingClientRect**: Centers target element in viewport — `container.scrollTop + elTop - containerTop - containerH/2 + elH/2`. Do NOT use `offsetTop` alone (unreliable for nested elements).
15. **Quest Log is single column**: Cards use `flex flex-col gap-8`, `max-w-3xl`. Do NOT revert to grid layout.

---

## Pending / Not Started

- OG preview image (`public/og-image.png`) — user needs to take screenshot and add file
- LinkedIn / GitHub links in Contact section
- Resume PDF download link
- BEEBOP live URL (no href on card)
