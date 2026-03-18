# Portfolio — Claude Context
Last updated: 2026-03-18

---

## Project Overview
Minecraft x Pokémon themed personal portfolio for Justin Woo Sung Chun.
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion.
Dev server: `npm run dev` → http://localhost:3000

---

## What's Built

| Feature | Status |
|---------|--------|
| Pokéball loading screen (shake → explode → reveal, ~3s total) | ✅ |
| 5-section snap-scroll layout | ✅ |
| Focus Mode (sections fade 0.08 → 1.0 on scroll) | ✅ |
| Vertical nav (right side, centered, per-section glow colors) | ✅ |
| Scroll spy (scroll event + offsetTop math) | ✅ |
| Jukebox — YouTube IFrame API, Play/Pause button (top-left) | ✅ |
| Copy-to-clipboard email button with toast | ✅ |
| Walking Party animation (top strip, scroll-triggered party joining) | ✅ |
| Big Ash on Home — wiggles + runs left on scroll | ✅ |
| Profile photo in About Me (left of bio card) | ✅ |
| Resume content (Advantive, EY-Parthenon, BEEBOP) | ✅ |
| Fun Facts "Achievement Unlocked" cards | ✅ |
| Pixel art SVG sprites and icons throughout | ✅ |
| Scrollbar mask (hides scrollbar above green grass line) | ✅ |

---

## Jukebox (Jukebox.tsx)
- **No Spotify** — replaced with YouTube IFrame API (no extra package)
- Video ID: `6CjpgFOOtuI`
- Hidden 1×1px iframe, audio only
- Button: `🔇 Music` / `🔊 Music`, top-left at `top: 80px, left: 5`
- On page load: blinking callout popup — "🎵 click the top-left button to enjoy some tunes while reading! Enjoy 😊"
- Callout dismisses on first click, scroll, or OK button (ref-guarded, fires once)
- Exit animation: `duration: 0.1` (instant feel)

---

## Big Ash (PortfolioContent.tsx — Home section)
- Large Ash sprite (px=12, same pixel data as walking party)
- Rendered **inside the Home section flex column**, above the `h1` — NOT `position: fixed`
  - This ensures the vertical gap to "Justin Chun" is always layout-stable at any screen size
  - Framer Motion transforms on ancestors break `position: fixed`, so fixed approach was abandoned
- Visible only when `activeSection === "home"`
- Idle: stands still (no bob)
- On scroll away: quick 2-jump wiggle (y: 0→-16→0→-16→0, 0.35s) then sprints left (x: -1500, 0.5s, delay 0.2s)
- `marginBottom: 16` wrapper keeps gap to name consistent

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

Visibility logic: `SECTION_ORDER.indexOf(char.section) <= sectionIdx`
Entry/exit: AnimatePresence `mode="popLayout"`, spring x-transition, `layout` prop for smooth reflow.

---

## Sprite Details

### Trainer (Ash) — 10 × 14, px=3 (small) / px=12 (big)
Sprite shifted right by 1 column vs earlier versions to accommodate wider brim:
- Hat crown: cols 3-7 (red, 5 wide)
- Hat body: cols 2-7 (red, 6 wide — matches face)
- Hat brim: cols 0-7 (white, 8 wide — 2px left overhang, cap faces left)
- Hair: cols 1-9
- Face + eyes: dark pixels flanking skin face, eyes at cols 3 & 7 (in face row)
- Colors: red hat (#cc1100), black hair (#111111), skin (#f5c9a0), blue jacket (#3454a8), dark pants (#1a2a8c), dark shoes (#222222)
- Same pixel array used in both WalkingParty.tsx (TRAINER) and PortfolioContent.tsx (BIG_TRAINER)

### Pikachu — 8 × 11, px=3
- Yellow body with brown ear tips and red cheeks
- Black dot eyes

### Charmander — 8 × 12, px=3
- Orange body with cream belly, blue eyes
- Tail exits from left side of body (rows 5-7), body stays symmetric
- Fully symmetric legs (rows 10-11) connected via wide lower body (row 9)

### Snorlax — 14 × 14, px=4
- Teal body with snowman silhouette (head circle + belly circle + waist dip)
- Pointed ears with cream inner ear
- Face circle: cream muzzle with dark eyes inside
- Belly circle: larger cream oval, separated from face by teal waist (10px wide dip)

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Root: loading state, containerRef, scrollbar mask, all top-level components |
| `src/app/layout.tsx` | VT323 font, metadata |
| `src/app/globals.css` | Theme vars, pixel-border, keyframes, overflow hidden |
| `src/hooks/useActiveSection.ts` | Scroll spy — closest section center to viewport center |
| `src/components/FocusSection.tsx` | Section wrapper — IntersectionObserver opacity (1.0 / 0.08) |
| `src/components/LoadingScreen.tsx` | 3-phase Pokéball animation |
| `src/components/PixelPokeball.tsx` | Pokéball SVG sprite |
| `src/components/PortfolioContent.tsx` | All 5 sections + pixel icons + copy button + BigAsh sprite |
| `src/components/VerticalNav.tsx` | Right-side centered scroll nav |
| `src/components/Jukebox.tsx` | YouTube IFrame API audio player (top-left) |
| `src/components/WalkingParty.tsx` | Walking sprite animation (top strip) |

---

## Section Content

### Home
- Big Ash sprite above name, exits left on scroll
- Name: Justin Chun (white, large)
- Subtitle: "Revenue Strategy & Operations | Problem Solver"
- Buttons: About Me (green), Projects (yellow), Fun Facts (orange), Contact Me (blue)

### About Me
- max-w-6xl container (wider than other sections)
- Profile photo: `public/profile.jpg` — left side of bio card, 140×160px with pixel-border
- Bio text: no trailing period
- Background: Advantive, EY-Parthenon, NYU Stern, bilingual
- Toolkit: Salesforce, HubSpot, SQL, Tableau, Google Workspace, Microsoft Office, Notion
- AI Stack: ChatGPT · Gemini · Claude · NotebookLM

### Quest Log
- Advantive (green dot) — Rev Ops Lead, $200M+ ARR
- EY-Parthenon (yellow dot) — Director Consulting
- BEEBOP (orange dot) — Social Platform Founder, "In Development"
  - Uses present tense: "Building unique 'social trigger'..."

### Fun Facts — Achievement Order
1. Running Enthusiast | Stamina Achievement | PixelRunner (green)
2. Racket Sports Enthusiast | Ace Achievement | PixelTennis (blue #60a5fa)
   - "Annual US Open attendee (as a spectator) · Hosted 50+ tennis club events in NYC over two years · Love all racket sports — table tennis, golf, badminton"
3. Building a Social App — BEEBOP | Builder Achievement | PixelMapPin (orange)
4. Hawaii Sabbatical | Explorer Achievement | PixelSun (yellow)
   - "Unsustainable, unforgettable — whale watching at sunrise, jumping into the ocean on a whim, and eating poke & sushi until the sun went down. Some chapters weren't meant to last forever"
5. Elite Warrior 특급전사 | Rare Achievement | PixelShield (red + gold star)
   - No parentheses around 특급전사 in description
- All descriptions have no trailing periods

### Contact
- Header: "[ Contact ]" (blue)
- No "New quest available" text
- Copy email: `justin.chun@stern.nyu.edu`
- Copy icon: both boxes filled blue (#60a5fa) normally, light grey (#d1d5db) when copied
- Toast: light grey background (#d1d5db), dark grey text (#374151)

---

## Design Decisions & Rules (important — don't break these)

1. **Scroll architecture**: `containerRef` div in page.tsx owns scroll. `overflowY: scroll`, `scrollSnapType: y proximity`. `html, body { overflow: hidden }` prevents double scrollbar.
2. **Scroll spy**: Uses scroll events + `offsetTop + offsetHeight/2` math. IntersectionObserver was abandoned (failed on tall sections).
3. **LoadingScreen**: `onAnimationComplete` ONLY on inner shake div — not outer spring div. Outer div fires too early (~0.5s).
4. **Nav color sync**: Home=white, About=green (#4ade80), Quest Log=yellow (#facc15), Fun Facts=red (#ef4444), Contact=blue (#60a5fa).
5. **Landing name**: plain white, no gradient or color split.
6. **BEEBOP quest icon**: plain colored square dot (no emoji or map icon).
7. **Scrollbar mask**: 14×72px fixed div (z-35, background #1a1a2e) at top-right hides scrollbar above green grass line.
8. **Walking party visibility**: uses `char.section` field compared against `SECTION_ORDER` index — NOT array index.
9. **Walking party strip background**: must keep `background: "#1a1a2e"` on the outer 72px div — prevents section content from bleeding through on scroll.
10. **BigAsh must NOT use `position: fixed`**: Framer Motion applies CSS transforms to animated ancestors, which breaks fixed positioning (element scrolls with content). BigAsh lives inside the Home section flex column instead.
11. **Jukebox autoplay blocked by browsers**: Using manual play/pause only. Do not attempt autoplay — browsers require user gesture.

---

## Pending / Not Started

- Mobile responsiveness (desktop-first build)
- LinkedIn / GitHub links in Contact section
- Resume PDF download link
- BEEBOP live URL (no href on card)
- SEO / og:image meta tags
- Deployment to Vercel
