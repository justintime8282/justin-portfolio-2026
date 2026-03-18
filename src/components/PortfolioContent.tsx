"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FocusSection from "./FocusSection";

// ── Pixel art icon components ─────────────────────────────────────────────────

function PixelBlock({ color }: { color: string }) {
  // Derive highlight and shadow from the base color
  const light = "#FFD070";
  const dark  = "#B85C00";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      <rect x="0" y="0" width="8" height="8" fill={color} />
      {/* Top + left highlight */}
      <rect x="0" y="0" width="8" height="1" fill={light} />
      <rect x="0" y="0" width="1" height="8" fill={light} />
      {/* Bottom + right shadow */}
      <rect x="0" y="7" width="8" height="1" fill={dark} />
      <rect x="7" y="0" width="1" height="8" fill={dark} />
      {/* Inner grid lines */}
      <rect x="3" y="1" width="1" height="6" fill={dark} fillOpacity={0.3} />
      <rect x="1" y="3" width="6" height="1" fill={dark} fillOpacity={0.3} />
    </svg>
  );
}

function PixelRunner() {
  const g = "#4ade80";
  const d = "#16a34a";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Head */}
      <rect x="4" y="0" width="2" height="2" fill={g} />
      {/* Torso */}
      <rect x="3" y="2" width="2" height="2" fill={g} />
      {/* Arm back */}
      <rect x="5" y="3" width="2" height="1" fill={g} />
      {/* Arm front */}
      <rect x="1" y="2" width="2" height="1" fill={g} />
      {/* Legs */}
      <rect x="2" y="4" width="2" height="2" fill={g} />
      <rect x="4" y="5" width="2" height="2" fill={g} />
      {/* Shoes */}
      <rect x="1" y="6" width="2" height="1" fill={d} />
      <rect x="5" y="7" width="2" height="1" fill={d} />
    </svg>
  );
}

function PixelSun() {
  const y  = "#facc15";
  const ly = "#fef08a";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Cardinal rays */}
      <rect x="3" y="0" width="2" height="1" fill={y} />
      <rect x="3" y="7" width="2" height="1" fill={y} />
      <rect x="0" y="3" width="1" height="2" fill={y} />
      <rect x="7" y="3" width="1" height="2" fill={y} />
      {/* Diagonal rays */}
      <rect x="1" y="1" width="1" height="1" fill={y} />
      <rect x="6" y="1" width="1" height="1" fill={y} />
      <rect x="1" y="6" width="1" height="1" fill={y} />
      <rect x="6" y="6" width="1" height="1" fill={y} />
      {/* Sun body */}
      <rect x="2" y="2" width="4" height="4" fill={y} />
      <rect x="3" y="1" width="2" height="6" fill={y} />
      <rect x="1" y="3" width="6" height="2" fill={y} />
      {/* Bright center */}
      <rect x="3" y="3" width="2" height="2" fill={ly} />
    </svg>
  );
}

function PixelShield() {
  const r  = "#ef4444";
  const g  = "#facc15";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Shield top bar */}
      <rect x="0" y="0" width="8" height="1" fill={r} />
      {/* Shield body */}
      <rect x="0" y="1" width="1" height="4" fill={r} />
      <rect x="7" y="1" width="1" height="4" fill={r} />
      <rect x="1" y="1" width="6" height="4" fill={r} />
      {/* Lower taper */}
      <rect x="1" y="5" width="6" height="1" fill={r} />
      <rect x="2" y="6" width="4" height="1" fill={r} />
      <rect x="3" y="7" width="2" height="1" fill={r} />
      {/* Gold star emblem */}
      <rect x="3" y="2" width="2" height="1" fill={g} />
      <rect x="2" y="3" width="4" height="1" fill={g} />
      <rect x="3" y="4" width="2" height="1" fill={g} />
    </svg>
  );
}

function PixelMapPin() {
  const c  = "#FFA500";
  const lc = "#ffe0b2";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Circle top */}
      <rect x="2" y="0" width="4" height="1" fill={c} />
      {/* Circle body */}
      <rect x="1" y="1" width="6" height="3" fill={c} />
      {/* Inner highlight */}
      <rect x="2" y="1" width="2" height="2" fill={lc} />
      {/* Circle bottom */}
      <rect x="2" y="4" width="4" height="1" fill={c} />
      {/* Thin straight stick */}
      <rect x="3" y="5" width="1" height="3" fill={c} />
    </svg>
  );
}

function PixelTennis() {
  const y = "#c8d400"; // tennis ball yellow-green
  const w = "#ffffff"; // seam white
  // 8×8 tennis ball: circular body with curved ( ) seam
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Row 0 */ } <rect x="2" y="0" width="4" height="1" fill={y} />
      {/* Row 1 */ } <rect x="1" y="1" width="6" height="1" fill={y} />
      {/* Row 2 — seam curves in */ }
      <rect x="0" y="2" width="2" height="1" fill={y} />
      <rect x="2" y="2" width="1" height="1" fill={w} />
      <rect x="3" y="2" width="2" height="1" fill={y} />
      <rect x="5" y="2" width="1" height="1" fill={w} />
      <rect x="6" y="2" width="2" height="1" fill={y} />
      {/* Row 3 — seam curves out */ }
      <rect x="0" y="3" width="1" height="1" fill={y} />
      <rect x="1" y="3" width="1" height="1" fill={w} />
      <rect x="2" y="3" width="4" height="1" fill={y} />
      <rect x="6" y="3" width="1" height="1" fill={w} />
      <rect x="7" y="3" width="1" height="1" fill={y} />
      {/* Row 4 — seam curves out */ }
      <rect x="0" y="4" width="1" height="1" fill={y} />
      <rect x="1" y="4" width="1" height="1" fill={w} />
      <rect x="2" y="4" width="4" height="1" fill={y} />
      <rect x="6" y="4" width="1" height="1" fill={w} />
      <rect x="7" y="4" width="1" height="1" fill={y} />
      {/* Row 5 — seam curves back in */ }
      <rect x="0" y="5" width="2" height="1" fill={y} />
      <rect x="2" y="5" width="1" height="1" fill={w} />
      <rect x="3" y="5" width="2" height="1" fill={y} />
      <rect x="5" y="5" width="1" height="1" fill={w} />
      <rect x="6" y="5" width="2" height="1" fill={y} />
      {/* Row 6 */ } <rect x="1" y="6" width="6" height="1" fill={y} />
      {/* Row 7 */ } <rect x="2" y="7" width="4" height="1" fill={y} />
    </svg>
  );
}

function PixelStar() {
  const r  = "#ef4444";
  const lr = "#fca5a5";
  return (
    <svg width="28" height="28" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Top point */}
      <rect x="3" y="0" width="2" height="2" fill={r} />
      {/* Wide middle band */}
      <rect x="0" y="2" width="8" height="3" fill={r} />
      {/* Notches cut into the band */}
      <rect x="0" y="2" width="1" height="1" fill="transparent" />
      <rect x="7" y="2" width="1" height="1" fill="transparent" />
      {/* Bottom two points */}
      <rect x="1" y="5" width="2" height="3" fill={r} />
      <rect x="5" y="5" width="2" height="3" fill={r} />
      {/* Highlight */}
      <rect x="3" y="0" width="1" height="1" fill={lr} />
      <rect x="2" y="3" width="1" height="1" fill={lr} />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const quests = [
  {
    company: "Advantive",
    title: "Revenue Strategy & Operations Lead",
    period: "Mar 2025 – Present",
    summary: "Building scalable revenue infrastructure and GTM strategy across a $200M+ ARR PE-backed SaaS platform.",
    color: "#4ade80",
    icon: null,
    highlights: [
      "Led revenue strategy and GTM operations across a $200M+ ARR SaaS portfolio",
      "Built forecasting and data governance infrastructure, improving forecast accuracy from ~70% to 90%+",
      "Led pricing, packaging, and AI add-on strategy discussions with C-suite and sales leadership",
      "Developed cross-sell and expansion strategies across acquired product lines, increasing attach rates and improving net revenue retention",
      "Standardized GTM processes including territory ownership, pipeline governance, and deal desk frameworks",
    ],
  },
  {
    company: "EY-Parthenon",
    title: "Director, Consulting",
    period: "Sep 2018 – Aug 2024",
    summary: "Advised Fortune 500 conglomerates and PEs on growth strategy and value creation across $50M–$1B businesses.",
    color: "#facc15",
    icon: null,
    highlights: [
      "Led commercial and operational due diligence across technology and industrial sector investments",
      "Led commercial and operational due diligence across technology and industrial sector investments",
      "Designed GTM operating models and integration strategies for post-acquisition value creation",
      "Built standalone cost structures, TSA frameworks, and capability roadmaps for carve-out situations",
      "Analyzed market entry strategies including direct, partnership, and channel growth models",
    ],
  },
  {
    company: "BEEBOP",
    title: "Social Platform Founder",
    period: "In Development",
    summary: "Exploring how technology can enable more spontaneous real-world connections.",
    color: "#FFA500",
    icon: null,
    highlights: [
      "Leading a cross-functional team (PM, engineering, UX) to build a proximity-based social platform",
      "Designing proximity-based social triggers and meetup facilitation features that bridge digital connections with real-world interactions",
      "Conducting user research and interviews with target users to define MVP features and product direction",
      "Running weekly product sprints to iterate on UX and feature design based on user feedback",
    ],
  },
];

const achievements = [
  {
    icon: <PixelRunner />,
    title: "Running Enthusiast",
    badge: "Stamina Achievement",
    description:
      "Half Marathons · Ice Cream Runs · Halloween Runs. If there's a finish line, there's a reason to show up",
    color: "#4ade80",
  },
  {
    icon: <PixelTennis />,
    title: "Racket Sports Enthusiast",
    badge: "Ace Achievement",
    description:
      "Annual US Open attendee (as a spectator) · Hosted 50+ tennis club events in NYC over two years · Love all racket sports — table tennis, golf, badminton, but not pickleball",
    color: "#60a5fa",
  },
  {
    icon: <PixelSun />,
    title: "Hawaii Sabbatical",
    badge: "Explorer Achievement",
    description:
      "Unsustainable, unforgettable — whale watching at sunrise, jumping into the ocean on a whim, and eating poke & sushi until the sun went down. Some chapters weren't meant to last forever",
    color: "#facc15",
  },
  {
    icon: <PixelShield />,
    title: "Elite Warrior  특급전사",
    badge: "Rare Achievement",
    description:
      "Served in the Korean Military as a tactical leader. Awarded the Elite Warrior 특급전사 medal for excellence — the highest individual combat-readiness distinction",
    color: "#ef4444",
  },
];

const skills = [
  "Salesforce",
  "HubSpot",
  "SQL",
  "Tableau",
  "Google Workspace",
  "Microsoft Office",
  "Notion",
];

// ── Big Ash sprite (large, home-page only) ───────────────────────────────────
const BIG_TRAINER: number[][] = [
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
const BIG_TRAINER_C: Record<number, string> = {
  0: "transparent", 1: "#ffffff", 2: "#cc1100",
  3: "#111111",     4: "#f5c9a0", 5: "#3454a8",
  6: "#1a2a8c",     7: "#222222",
};
const BIG_PX = 12;

function BigAshSprite() {
  const w = BIG_TRAINER[0].length * BIG_PX;
  const h = BIG_TRAINER.length * BIG_PX;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ imageRendering: "pixelated", display: "block" }}>
      {BIG_TRAINER.map((row, y) =>
        row.map((c, x) =>
          c !== 0 ? <rect key={`${x}-${y}`} x={x * BIG_PX} y={y * BIG_PX} width={BIG_PX} height={BIG_PX} fill={BIG_TRAINER_C[c]} /> : null
        )
      )}
    </svg>
  );
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeSection: string;
}

const EMAIL = "justin.chun@stern.nyu.edu";

// Pixel-art copy icon: two overlapping squares rendered as SVG rects
function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 10 10"
      style={{ imageRendering: "pixelated", display: "inline-block", verticalAlign: "middle" }}
      aria-hidden="true"
    >
      {/* Back page */}
      <rect x="3" y="0" width="7" height="7" fill={copied ? "#d1d5db" : "#60a5fa"} stroke="currentColor" strokeWidth="1" />
      {/* Front page */}
      <rect x="0" y="3" width="7" height="7" fill={copied ? "#d1d5db" : "#60a5fa"} stroke="currentColor" strokeWidth="1" />
      {/* Lines on front page */}
      <line x1="2" y1="5.5" x2="5.5" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="2" y1="7.5" x2="5.5" y2="7.5" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.96 }}
        className="pixel-border inline-flex items-center gap-3 bg-pixel-blue px-8 py-4 text-2xl text-black transition-transform hover:scale-105"
      >
        {EMAIL}
        <CopyIcon copied={copied} />
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pixel-border absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1 text-lg whitespace-nowrap" style={{ background: "#d1d5db", color: "#374151" }}
          >
            ✓ Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PortfolioContent({ containerRef, activeSection }: Props) {
  const isHome = activeSection === "home";

  return (
    <div className="font-pixel">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <FocusSection
        id="home"
        containerRef={containerRef}
        initialInView
        className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
      >
        {/* Big Ash — lives in the flex column so gap to name is layout-stable */}
        <div style={{ marginBottom: 16, position: "relative", display: "inline-block" }}>
          {/* Welcome bubble — to the right of Ash, exits fast before Ash runs */}
          <AnimatePresence>
            {isHome && (
              <motion.div
                key="welcome-bubble"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: 0.5 }}
                style={{
                  position: "absolute",
                  left: "calc(100% + 16px)",
                  top: "-10px",
                }}
              >
                {/* Speech bubble — CSS divs, no SVG seams */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  {/* Main body */}
                  <div style={{ width: 112, height: 56, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", color: "#222222", letterSpacing: "0.05em" }}>
                    Welcome!
                  </div>
                  {/* Tail step 1 — gap of 6px from box left edge */}
                  <div style={{ position: "absolute", bottom: 0, left: -20, width: 14, height: 14, background: "#ffffff" }} />
                  {/* Tail step 2 — steps further left and slightly down */}
                  <div style={{ position: "absolute", bottom: -7, left: -27, width: 7, height: 7, background: "#ffffff" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ash sprite — exits with wiggle + sprint left */}
          <AnimatePresence>
            {isHome && (
              <motion.div
                key="big-ash"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1, y: 0 }}
                exit={{
                  x: -1500,
                  y: [0, -16, 0, -16, 0, 0],
                  transition: {
                    y:       { duration: 0.35, ease: "easeInOut" },
                    x:       { duration: 0.5,  ease: "easeIn", delay: 0.2 },
                    opacity: { duration: 0.1,  delay: 0.65 },
                  },
                }}
                transition={{ opacity: { duration: 0.4 } }}
              >
                <BigAshSprite />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.h1
          className="mb-2 text-6xl text-white md:text-8xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          Justin Chun
        </motion.h1>
        <motion.p
          className="mb-8 text-2xl text-pixel-yellow md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Revenue Strategist &amp; Problem Solver
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#about"
            className="pixel-border bg-pixel-green px-6 py-3 text-xl text-black transition-transform hover:scale-105"
          >
            About Me
          </a>
          <a
            href="#projects"
            className="pixel-border bg-pixel-yellow px-6 py-3 text-xl text-black transition-transform hover:scale-105"
          >
            Quest Log
          </a>
          <a
            href="#funfacts"
            className="pixel-border px-6 py-3 text-xl text-black transition-transform hover:scale-105"
            style={{ background: "#FFA500" }}
          >
            Fun Facts
          </a>
          <a
            href="#contact"
            className="pixel-border bg-pixel-blue px-6 py-3 text-xl text-black transition-transform hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          className="mt-16 text-3xl text-pixel-green"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ▼
        </motion.div>
      </FocusSection>

      {/* ── About ────────────────────────────────────────────── */}
      <FocusSection
        id="about"
        containerRef={containerRef}
        className="flex min-h-screen flex-col justify-center px-6 py-20"
      >
        <div className="mx-auto w-full max-w-6xl">
          <motion.h2
            className="mb-10 text-center text-4xl text-pixel-green"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={0}
          >
            [ About Me ]
          </motion.h2>

          {/* Bio card */}
          <motion.div
            className="pixel-border bg-[#16213e] p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={1}
          >
            <div className="flex gap-8 items-center">
              {/* Profile photo */}
              <div className="pixel-border flex-shrink-0 overflow-hidden" style={{ width: 140, height: 160 }}>
                <Image
                  src="/Profile.jpg"
                  alt="Justin Chun"
                  width={140}
                  height={160}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              {/* Bio text */}
              <div>
                <div className="mb-2 text-sm uppercase tracking-widest text-pixel-green">
                  ▶ Profile
                </div>
                <p className="text-xl leading-9 text-gray-200">
                  Hey there! I&apos;m Justin — a Revenue Strategy &amp; Operations
                  professional who turns complex GTM challenges into measurable wins.
                  From PE-backed SaaS platforms to global consulting, I build the
                  systems, models, and strategies that move revenue forward
                </p>
              </div>
            </div>
          </motion.div>

          {/* Two-column: Background + Toolkit */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <motion.div
              className="pixel-border bg-[#16213e] p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              custom={2}
            >
              <div className="mb-4 text-sm uppercase tracking-widest text-pixel-green">
                ▶ Background
              </div>
              <ul className="space-y-3 text-lg text-gray-300">
                <li className="flex gap-3">
                  <span className="mt-1 text-pixel-green">◆</span>
                  <span>Rev Ops Lead @ Advantive ($200M+ ARR) · 2025–</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-pixel-yellow">◆</span>
                  <span>Director, Consulting @ EY-Parthenon · 2018–2024</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-pixel-yellow">◆</span>
                  <span>NYU Stern — B.S. Finance &amp; Statistics, 2018</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-pixel-yellow">◆</span>
                  <span>Native fluency in English &amp; Korean · A bit of Mandarin &amp; Japanese</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="pixel-border bg-[#16213e] p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              custom={3}
            >
              <div className="mb-4 text-sm uppercase tracking-widest text-pixel-green">
                ▶ Toolkit
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-2 border-pixel-green bg-[#0a0a1a] px-3 py-1 text-lg text-pixel-green"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 border-t border-[#333] pt-4">
                <div className="mb-2 text-sm uppercase tracking-widest text-pixel-blue">
                  ▶ AI Stack
                </div>
                <p className="text-lg text-gray-400">
                  ChatGPT &bull; Gemini &bull; Claude &bull; NotebookLM
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </FocusSection>

      {/* ── Projects / Quests ────────────────────────────────── */}
      <FocusSection
        id="projects"
        containerRef={containerRef}
        className="flex min-h-screen flex-col justify-center px-6 py-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <motion.h2
            className="mb-4 text-center text-4xl"
            style={{ color: "#facc15" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={0}
          >
            [ Quest Log ]
          </motion.h2>
          <motion.p
            className="mb-10 text-center text-lg text-gray-500"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={1}
          >
            Professional achievements unlocked
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2">
            {quests.map((quest, i) => (
              <motion.div
                key={quest.company}
                className="pixel-border bg-[#16213e] p-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                custom={i + 2}
              >
                {/* Quest header */}
                <div className="mb-1 flex items-center gap-3">
                  {quest.icon ? (
                    <span className="shrink-0 leading-none">{quest.icon}</span>
                  ) : (
                    <div className="h-3 w-3 shrink-0" style={{ background: quest.color }} />
                  )}
                  <h3 className="text-2xl text-white">{quest.company}</h3>
                </div>
                <p className="mb-1 text-lg" style={{ color: quest.color }}>
                  {quest.title}
                </p>
                <p className="mb-3 text-sm text-gray-500">{quest.period}</p>
                <p className="mb-4 text-lg italic text-gray-400">{quest.summary}</p>

                {/* Achievement list */}
                <ul className="space-y-2">
                  {quest.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-lg text-gray-300">
                      <span className="mt-1 shrink-0" style={{ color: quest.color }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </FocusSection>

      {/* ── Fun Facts ────────────────────────────────────────── */}
      <FocusSection
        id="funfacts"
        containerRef={containerRef}
        className="flex min-h-screen flex-col justify-center px-6 py-20"
      >
        <div className="mx-auto w-full max-w-4xl">
          <motion.h2
            className="mb-2 text-center text-4xl"
            style={{ color: "#ef4444" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={0}
          >
            [ Fun Facts ]
          </motion.h2>
          <motion.p
            className="mb-10 text-center text-lg text-gray-500"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            custom={1}
          >
            Side quests completed outside the office
          </motion.p>

          <div className="flex flex-col gap-5">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                className="pixel-border bg-[#0f0f1a] overflow-hidden"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                custom={i + 2}
              >
                {/* Achievement header strip — Minecraft-style gold bar */}
                <div
                  className="flex items-center gap-2 px-4 py-1"
                  style={{ background: "#1a1200", borderBottom: `2px solid ${a.color}` }}
                >
                  <span className="text-xs uppercase tracking-widest" style={{ color: a.color }}>
                    ◆ {a.badge}
                  </span>
                </div>

                {/* Achievement body */}
                <div className="flex items-start gap-5 p-5">
                  {/* Pixel icon box */}
                  <div
                    className="pixel-border flex h-14 w-14 shrink-0 items-center justify-center text-3xl"
                    style={{ background: "#16213e", border: `2px solid ${a.color}` }}
                  >
                    {a.icon}
                  </div>

                  <div>
                    <h3 className="mb-1 text-2xl text-white">{a.title}</h3>
                    <p className="text-lg leading-7 text-gray-400">{a.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FocusSection>

      {/* ── Contact ──────────────────────────────────────────── */}
      <FocusSection
        id="contact"
        containerRef={containerRef}
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.h2
          className="mb-6 text-5xl text-pixel-blue"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          custom={0}
        >
          [ Contact ]
        </motion.h2>
        <motion.p
          className="mb-10 max-w-md text-xl text-gray-400"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          custom={1}
        >
          Have a strategy challenge or want to team up?<br />Send a message and let&apos;s talk!
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          custom={2}
        >
          <CopyEmailButton />
        </motion.div>

        {/* Minimal sign-off — no footer text */}
        <motion.p
          className="mt-20 text-lg text-gray-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          custom={3}
        >
          &#9632; &#9632; &#9632;
        </motion.p>
      </FocusSection>

    </div>
  );
}
