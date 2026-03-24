# Portfolio — Claude Context
Last updated: 2026-03-24

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
| Music callout popup (blinking, dismisses on scroll/click/OK) | ✅ |
| Copy-to-clipboard email button with toast | ✅ |
| Walking Party animation (top strip, scroll-triggered party joining) | ✅ |
| Big Ash on Home — welcome bubble + wiggles + runs left on scroll | ✅ |
| Profile photo in About Me (left of bio card, stacks on mobile) | ✅ |
| Resume content (Advantive, EY-Parthenon, BEEBOP) | ✅ |
| Fun Facts "Achievement Unlocked" cards (4 achievements) | ✅ |
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
- Subtitle: "Revenue Strategist & Problem Solver"
- Buttons: About Me (green), Quest Log (yellow), Fun Facts (orange), Contact Me (blue)

### About Me
- `max-w-6xl` container (wider than other sections)
- Profile photo: `public/Profile.jpg` (capital P — case-sensitive for Vercel Linux build)
  - Left of bio card on desktop (`md:flex-row`), centered above text on mobile (`flex-col`)
  - 140×160px with pixel-border, `mx-auto md:mx-0`
- Bio text: "Revenue Strategy & Operations professional who turns complex GTM challenges into measurable wins."
- Background: Advantive · EY-Parthenon · NYU Stern · "Native fluency in English & Korean · A bit of Mandarin & Japanese"
- Toolkit: Salesforce, HubSpot, SQL, Tableau, Google Workspace, Microsoft Office, Notion
- AI Stack: ChatGPT · Gemini · Claude · NotebookLM · Gamma · Gumloop · Granola

### Quest Log
**Advantive** (green) — Revenue Strategy & Operations Lead · Mar 2025–Present
- "Building scalable revenue infrastructure and GTM strategy across a $200M+ ARR PE-backed SaaS platform."
- Led revenue strategy and GTM operations across a $200M+ ARR SaaS portfolio
- Built forecasting and data governance infrastructure, improving forecast accuracy from ~70% to 90%+
- Led pricing, packaging, and AI add-on strategy discussions with C-suite and sales leadership
- Developed cross-sell and expansion strategies across acquired product lines, increasing attach rates and improving net revenue retention
- Standardized GTM processes including territory ownership, pipeline governance, and deal desk frameworks

**EY-Parthenon** (yellow) — Director, Consulting · Sep 2018–Aug 2024
- "Advised Fortune 500 conglomerates and PEs on growth strategy and value creation across $50M–$1B businesses."
- Led commercial and operational due diligence across technology and industrial sector investments
- Designed GTM operating models and integration strategies for post-acquisition value creation
- Built standalone cost structures, TSA frameworks, and capability roadmaps for carve-out situations
- Analyzed market entry strategies including direct, partnership, and channel growth models

**BEEBOP** (orange) — Social Platform Founder · In Development
- "Exploring how technology can enable more spontaneous real-world connections."
- Leading a cross-functional team (PM, engineering, UX) to build a proximity-based social platform
- Designing proximity-based social triggers and meetup facilitation features that bridge digital connections with real-world interactions
- Conducting user research and interviews with target users to define MVP features and product direction
- Running weekly product sprints to iterate on UX and feature design based on user feedback

### Fun Facts — Achievement Order (4 achievements)
1. **Running Enthusiast** | Stamina Achievement | PixelRunner (green)
   - "Half Marathons · Ice Cream Runs · Halloween Runs. If there's a finish line, there's a reason to show up"
2. **Racket Sports Enthusiast** | Social Achievement | PixelTennis (blue #60a5fa)
   - "Annual US Open attendee (as a spectator) · Hosted 50+ tennis club events in NYC over two years · Love all racket sports — table tennis, golf, badminton, but not pickleball"
3. **Hawaii Sabbatical** | Explorer Achievement | PixelSun (yellow)
   - "Unsustainable, unforgettable — whale watching at sunrise, jumping into the ocean on a whim, and eating poke & sushi until the sun went down. Some chapters weren't meant to last forever"
4. **Elite Warrior 특급전사** | Rare Achievement | PixelShield (red + gold star)
   - "Served in the Korean Military as a tactical leader. Awarded the Elite Warrior 특급전사 medal for excellence — the highest individual combat-readiness distinction"
   - h3 has `style={{ wordBreak: "keep-all" }}` so 특급전사 wraps as a whole word on mobile

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

---

## Pending / Not Started

- OG preview image (`public/og-image.png`) — user needs to take screenshot and add file
- LinkedIn / GitHub links in Contact section
- Resume PDF download link
- BEEBOP live URL (no href on card)
