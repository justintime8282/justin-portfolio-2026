"use client";

import { motion, AnimatePresence } from "framer-motion";

// ─── Sprite renderer (same pattern as PixelPokeball) ─────────────────────────

const PS = 3; // logical pixel → 3 CSS px

function Sprite({
  pixels,
  colors,
  px = PS,
}: {
  pixels: number[][];
  colors: Record<number, string>;
  px?: number;
}) {
  const w = pixels[0].length * px;
  const h = pixels.length * px;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ imageRendering: "pixelated", display: "block" }}>
      {pixels.map((row, y) =>
        row.map((c, x) =>
          c !== 0 ? (
            <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={colors[c]} />
          ) : null
        )
      )}
    </svg>
  );
}

// ─── Trainer (Ash) — 10 × 13 logical pixels ──────────────────────────────────

const TRAINER: number[][] = [
  [0,0,0,2,2,2,2,2,0,0], // hat crown  (5 wide, cols 3-7)
  [0,0,2,2,2,2,2,2,0,0], // hat body   (6 wide, cols 2-7 — matches face)
  [1,1,1,1,1,1,1,1,0,0], // hat brim   (8 wide, cols 0-7 — 2px left overhang)
  [0,3,3,3,3,3,3,3,3,3], // hair
  [0,3,4,3,4,4,3,4,3,0], // face + eyes
  [0,0,4,4,4,4,4,4,0,0], // face lower
  [0,0,5,5,1,1,5,5,0,0], // jacket + white shirt centre
  [0,5,5,5,1,1,5,5,5,0], // jacket arms
  [0,5,5,5,1,1,5,5,5,0], // jacket lower
  [0,0,6,6,6,6,6,6,0,0], // pants
  [0,0,6,6,0,0,6,6,0,0], // legs (shortened)
  [0,0,7,7,0,0,7,7,0,0], // shoes (box — same width as legs)
];
const TRAINER_C: Record<number, string> = {
  0: "transparent", 1: "#ffffff",   2: "#cc1100",
  3: "#111111",     4: "#f5c9a0",   5: "#3454a8",
  6: "#1a2a8c",     7: "#222222",
};

// ─── Pikachu — 8 × 11 ────────────────────────────────────────────────────────

const PIKACHU: number[][] = [
  [0,2,0,0,0,0,2,0], // ear tips (brown)
  [1,2,0,0,0,0,2,1], // ears yellow+brown
  [1,1,1,1,1,1,1,1], // head
  [1,1,4,1,1,4,1,1], // eyes (black dots)
  [1,3,1,1,1,1,3,1], // cheeks (red)
  [1,1,1,1,1,1,1,1], // lower head
  [2,1,1,1,1,1,1,2], // body + brown side stripes
  [1,1,1,1,1,1,1,1], // body
  [1,1,1,1,1,1,1,1], // lower body
  [0,1,1,0,0,1,1,0], // legs
  [0,1,1,0,0,1,1,0], // feet
];
const PIKACHU_C: Record<number, string> = {
  0: "transparent", 1: "#f5d000",
  2: "#8B4513",     3: "#ff0000",  4: "#111111",
};

// ─── Charmander — 8 × 12 ─────────────────────────────────────────────────────

const CHARMANDER: number[][] = [
  [0,0,1,1,1,1,0,0], // head top
  [0,1,1,1,1,1,1,0], // head
  [0,1,3,1,1,3,1,0], // eyes (blue)
  [0,1,1,2,2,1,1,0], // belly peek (cream)
  [1,1,2,2,2,2,1,1], // body full — symmetric
  [4,1,2,2,2,2,1,1], // body + tail exits left (col 0), right side filled
  [0,4,1,1,1,1,1,0], // tail + body (6 wide — fills right dip)
  [0,0,4,1,1,1,0,0], // tail flame + lower body (4 wide, centered)
  [0,0,1,1,1,1,0,0], // lower body (4 wide, symmetric)
  [0,1,1,1,1,1,1,0], // lower body wide (6 wide, symmetric — connects both legs)
  [0,1,1,0,0,1,1,0], // legs (symmetric)
  [1,1,1,0,0,1,1,1], // feet (symmetric)
];
const CHARMANDER_C: Record<number, string> = {
  0: "transparent", 1: "#f34110",
  2: "#ffffcc",     3: "#3399ff",  4: "#ff9900",
};

// ─── Snorlax — 14 × 13 at px=4 (bigger!) ────────────────────────────────────

const SNORLAX: number[][] = [
  [0,0,1,0,0,0,0,0,0,0,0,1,0,0], // ear tips
  [0,1,2,1,1,1,1,1,1,1,1,2,1,0], // ears + cream inner ear  (12 wide)
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0], // head circle             (12 wide)
  [0,1,1,1,2,2,2,2,2,2,1,1,1,0], // face cream top
  [0,1,1,2,3,3,2,2,3,3,2,1,1,0], // face cream mid — eyes inside
  [0,1,1,1,2,2,2,2,2,2,1,1,1,0], // face cream bottom
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0], // waist dip               (10 wide — snowman indent)
  [0,1,1,2,2,2,2,2,2,2,2,1,1,0], // belly top               (12 wide)
  [1,1,2,2,2,2,2,2,2,2,2,2,1,1], // belly wide              (14 wide — bigger than head)
  [1,1,2,2,2,2,2,2,2,2,2,2,1,1], // belly wide
  [0,1,1,2,2,2,2,2,2,2,2,1,1,0], // belly bottom            (12 wide)
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0], // lower body
  [0,1,1,1,0,0,0,0,0,0,1,1,1,0], // legs
  [0,0,1,1,0,0,0,0,0,0,1,1,0,0], // feet
];
const SNORLAX_C: Record<number, string> = {
  0: "transparent", 1: "#4a7c6a",
  2: "#e8d5a0",     3: "#1a3a2a",
};

// ─── Character config ─────────────────────────────────────────────────────────

const CHARACTERS = [
  {
    id: "trainer",
    section: "about",
    pixels: TRAINER,
    colors: TRAINER_C,
    px: PS,
    bobY: [0, -4, 0, -4, 0] as number[],
    bobDuration: 0.55,
    bobDelay: 0,
  },
  {
    id: "pikachu",
    section: "projects",
    pixels: PIKACHU,
    colors: PIKACHU_C,
    px: PS,
    bobY: [0, -4, 0, -4, 0] as number[],
    bobDuration: 0.5,
    bobDelay: 0.1,
  },
  {
    id: "charmander",
    section: "funfacts",
    pixels: CHARMANDER,
    colors: CHARMANDER_C,
    px: PS,
    bobY: [0, -4, 0, -4, 0] as number[],
    bobDuration: 0.52,
    bobDelay: 0.2,
  },
  {
    id: "snorlax",
    section: "contact",
    pixels: SNORLAX,
    colors: SNORLAX_C,
    px: 4,
    bobY: [0, -3, 1, -3, 0] as number[],
    bobDuration: 0.9,
    bobDelay: 0,
  },
];

const SECTION_ORDER = ["home", "about", "projects", "funfacts", "contact"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WalkingParty({ activeSection }: { activeSection: string }) {
  const sectionIdx = SECTION_ORDER.indexOf(activeSection);
  // At "contact" all four stay — sectionIdx 4 >= all character thresholds
  const visible = CHARACTERS.filter(
    (char) => SECTION_ORDER.indexOf(char.section) <= sectionIdx
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
      style={{ height: 72, background: "#1a1a2e" }}
    >
      {/* Character row */}
      <div className="flex items-end justify-center gap-2" style={{ height: 60 }}>
        <AnimatePresence mode="popLayout">
          {visible.map((char) => (
            <motion.div
              key={char.id}
              layout
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{
                layout: { type: "spring", stiffness: 180, damping: 22 },
                opacity: { duration: 0.4 },
                x: { type: "spring", stiffness: 200, damping: 24 },
              }}
            >
              <motion.div
                animate={{ y: char.bobY }}
                transition={{
                  duration: char.bobDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: char.bobDelay,
                }}
              >
                <Sprite pixels={char.pixels as number[][]} colors={char.colors} px={char.px} />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pixelated grass ground strip */}
      <div
        style={{
          height: 12,
          imageRendering: "pixelated",
          background:
            "repeating-linear-gradient(90deg, #2d5a1b 0px, #2d5a1b 6px, #3a7a22 6px, #3a7a22 12px)",
        }}
      />
    </div>
  );
}
