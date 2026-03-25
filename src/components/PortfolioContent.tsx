"use client";

import { useState, useEffect, useRef } from "react";
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
    summary: "Building AI-driven GTM systems across a $200M+ PE-backed SaaS platform",
    color: "#4ade80",
    icon: null,
    keyWins: [
      "+25% uplift from AI-driven upsell targeting across 200+ accounts using usage, renewal timing, and support signals",
      "$1.6M incremental ARR from cross-sell motion, lifting NRR 105% → 115% across a $10M acquired product line",
      "Forecast accuracy improved from 70% → 90%+ across 20+ acquisitions, sustained for 3+ consecutive quarters",
      "Recovered ~$1M in pipeline during post-acquisition CRM failure, preserving visibility on top deals",
    ],
    whatIBuilt: [
      "LLM-driven workflows to automate pipeline gap detection and follow-up recommendations, reducing manual GTM reporting by 70%",
      "AI-driven upsell targeting model with sensitivity analysis and go/no-go thresholds aligned with sales leadership",
      "End-to-end forecasting infrastructure including Salesforce hygiene SOPs, automated audit dashboards, and stage-gate review cadences",
      "Cross-sell system mapping 150+ accounts by product-fit and renewal timing, embedded into QBR and renewal workflows",
      "GTM systems across pricing, packaging, deal desk governance, and territory ownership alignment",
      "Standardized M&A GTM integration playbook covering CRM migration, comp alignment, territory setup, and forecasting",
    ],
  },
  {
    company: "EY-Parthenon",
    title: "Director, Consulting",
    period: "Sep 2018 – Aug 2024",
    summary: "Solved complex GTM and operating model problems across $50M–$1B businesses",
    color: "#facc15",
    icon: null,
    keyWins: [
      "Supported $2B+ in transaction decisions across 20+ PE acquisitions",
      "Built GTM and operating models to drive post-acquisition growth",
      "Led cross-functional strategy across sales, pricing, and operations",
    ],
    whatIBuilt: [
      "Market and revenue models to assess growth opportunities and commercial viability",
      "Operating model blueprints across GTM, org design, and cost structure",
      "Execution roadmaps for integration, standalone planning, and value creation",
    ],
  },
  {
    company: "BEEBOP",
    title: "Social Platform Founder",
    period: "Nov 2025 – Present",
    summary: "Building a proximity-based social product to enable real-world connections",
    color: "#FFA500",
    icon: null,
    keyWins: [
      "Designed and launched MVP from zero across product, UX, and GTM",
      "Built core concept around proximity-based social triggers and meetup facilitation",
      "Led cross-functional execution across product, design, and engineering",
    ],
    whatIBuilt: [
      "Product and GTM strategy from 0→1, including positioning and user flows",
      "Early-stage user behavior models, retention loops, and adoption hypotheses",
      "Rapid iteration system driven by user research and feedback cycles",
    ],
  },
];

const achievements = [
  {
    icon: <PixelRunner />,
    title: "Running Enthusiast",
    badge: "Stamina Achievement",
    description:
      "Ran half marathons, ice cream runs, and halloween runs · Full marathon? Here I come!",
    color: "#4ade80",
    photos: [
      { src: "/fun/running-nyc-half.jpg" },
      { src: "/fun/running-icecream.jpg" },
      { src: "/fun/running-halloween.jpg" },
    ],
  },
  {
    icon: <PixelTennis />,
    title: "Racket Sports Enthusiast",
    badge: "Social Achievement",
    description:
      "Hosted 100+ tennis club events over 2.5 years for 50+ players · Annual US Open attendee — as a passionate spectator · Love all racket sports — table tennis, golf, badminton (but not pickleball)",
    color: "#60a5fa",
    photos: [
      { src: "/fun/racket-usopen.jpg" },
      { src: "/fun/racket-tennis.jpg" },
      { src: "/fun/racket-golf.jpg", fit: "contain" },
    ],
  },
  {
    icon: <PixelSun />,
    title: "Hawaii Sabbatical",
    badge: "Explorer Achievement",
    description:
      "Month-long escape to Honolulu — traded spreadsheets for sunsets · Certified poke & sushi connoisseur and obsessive local restaurant explorer · Whale watching at sunrise, spontaneous ocean dives, and zero regrets",
    color: "#facc15",
    photos: [
      { src: "/fun/hawaii-whale.jpg" },
      { src: "/fun/hawaii-snorkel.jpg", pos: "center 30%" },
      { src: "/fun/hawaii-trail.jpg" },
    ],
  },
  {
    icon: <PixelShield />,
    title: "Elite Warrior  특급전사",
    badge: "Rare Achievement",
    description:
      "Served in the Korean Army — awarded the Elite Warrior 특급전사 medal, the highest individual combat-readiness distinction · Attempted eggs sunny side up on a military shovel under questionable conditions — unsanitary, unsuccessful, never again 🍳",
    color: "#ef4444",
    photos: [
      { src: "/fun/military-patch.jpg" },
      { src: "/fun/military-troops.jpg" },
      { src: "/fun/military-egg.jpg" },
    ],
  },
];

const skills = [
  "Salesforce",
  "HubSpot",
  "SQL",
  "Tableau",
  "ZoomInfo",
  "Outreach",
  "Glyphic",
  "Hyperbound",
  "Google Workspace",
  "Microsoft Office",
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
        className="pixel-border inline-flex items-center gap-2 md:gap-3 bg-pixel-blue px-4 py-3 md:px-8 md:py-4 text-base md:text-2xl text-black transition-transform hover:scale-105"
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

const bgEntries = [
  { id: "quest-advantive",   company: "Advantive",     role: "RevOps Lead", years: "2025–",       color: "#4ade80" },
  { id: "quest-eyparthenon", company: "EY-Parthenon",  role: "Director",    years: "2018–2024",   color: "#facc15" },
  { id: "quest-beebop",      company: "Beebop",        role: "Founder",     years: "2025–",       color: "#FFA500" },
];

const factEntries = [
  { id: "fact-0", label: "Running",           color: "#4ade80" },
  { id: "fact-1", label: "Racket Sports",     color: "#60a5fa" },
  { id: "fact-2", label: "Hawaii Sabbatical", color: "#facc15" },
  { id: "fact-3", label: "Military",          color: "#ef4444" },
];

export default function PortfolioContent({ containerRef, activeSection }: Props) {
  const isHome = activeSection === "home";
  const [showClickHint, setShowClickHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activeSection === "about") {
      setShowClickHint(true);
      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setShowClickHint(false), 4500);
    }
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, [activeSection]);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    const container = containerRef.current;
    if (el && container) {
      const elTop = el.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const containerH = container.clientHeight;
      const elH = el.clientHeight;
      const centeredTop = container.scrollTop + elTop - containerTop - (containerH / 2) + (elH / 2);
      container.scrollTo({ top: centeredTop, behavior: "smooth" });
    }
  }

  return (
    <div className="font-pixel">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <FocusSection
        id="home"
        containerRef={containerRef}
        initialInView
        className="flex min-h-screen flex-col items-center justify-center px-4 md:px-6 pt-20 text-center"
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
          AI-Driven GTM Operator
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
        className="flex min-h-screen flex-col justify-center px-4 md:px-6 pt-20 pb-12 md:py-20"
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
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              {/* Profile photo */}
              <div className="pixel-border flex-shrink-0 overflow-hidden mx-auto md:mx-0" style={{ width: 140, height: 160 }}>
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
                  Hey there! I&apos;m Justin — an AI-driven GTM operator focused on
                  building systems that turn complex revenue problems into measurable
                  outcomes. From scaling SaaS platforms to complex M&amp;A integrations,
                  I design and deploy systems that directly impact pipeline,
                  forecasting, and revenue growth.
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
              <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-pixel-green">
                ▶ Background
                <AnimatePresence>
                  {showClickHint && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0, 1, 0, 1, 0.9, 0.9, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4.5, times: [0, 0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.88, 1] }}
                      className="flex items-center gap-1 text-gray-400 normal-case tracking-normal"
                      style={{ fontSize: "0.85rem" }}
                    >
                      👆 Click for more
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-3">
                {bgEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3">
                    <button
                      onClick={() => scrollToId(entry.id)}
                      className="pixel-border bg-[#0a0a1a] px-3 py-1 text-lg transition-opacity hover:opacity-80"
                      style={{ color: entry.color, borderColor: entry.color }}
                    >
                      {entry.role} @ {entry.company}
                    </button>
                    <span className="text-lg text-gray-500">{entry.years}</span>
                  </div>
                ))}
                <div className="mt-2 border-t border-[#333] pt-3 space-y-2 text-lg text-gray-400">
                  <div>NYU Stern — B.S. Finance &amp; Statistics, 2018</div>
                  <div>Native fluency in English &amp; Korean · A bit of Mandarin &amp; Japanese</div>
                </div>
              </div>

              {/* Fun Facts teaser — inside Background card */}
              <div className="mt-5 border-t border-[#333] pt-5">
                <div className="mb-3 flex items-center gap-2 text-sm uppercase tracking-widest text-pixel-green">
                  ▶ Fun Facts
                  <AnimatePresence>
                    {showClickHint && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1, 0, 1, 0.9, 0.9, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 4.5, times: [0, 0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.88, 1] }}
                        className="flex items-center gap-1 text-gray-400 normal-case tracking-normal"
                        style={{ fontSize: "0.85rem" }}
                      >
                        👆 Click for more
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap gap-2">
                  {factEntries.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => scrollToId(f.id)}
                      className="pixel-border bg-[#0a0a1a] px-3 py-1 text-lg transition-opacity hover:opacity-80"
                      style={{ color: f.color, borderColor: f.color }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pixel-border bg-[#16213e] p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              custom={3}
            >
              <div className="mb-2 text-sm uppercase tracking-widest text-pixel-blue">
                ▶ AI &amp; Automation
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex gap-3">
                  {["ChatGPT", "Claude (MCP)", "Gemini", "Notion"].map((tool) => (
                    <span key={tool} className="border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {["NotebookLM", "Gamma"].map((tool) => (
                    <span key={tool} className="border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#333] pt-4">
                <div className="mb-3 text-sm uppercase tracking-widest text-pixel-green">
                  ▶ Data &amp; Systems
                </div>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    {["Salesforce", "HubSpot", "SQL", "Tableau"].map((s) => (
                      <span key={s} className="border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {["ZoomInfo", "Outreach", "Glyphic", "Hyperbound"].map((s) => (
                      <span key={s} className="border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {["Google Workspace", "Microsoft Office"].map((s) => (
                      <span key={s} className="border-2 border-gray-500 bg-[#0a0a1a] px-3 py-1 text-lg text-gray-300">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </FocusSection>

      {/* ── Projects / Quests ────────────────────────────────── */}
      <FocusSection
        id="projects"
        containerRef={containerRef}
        className="flex min-h-screen flex-col justify-center px-4 md:px-6 pt-20 pb-12 md:py-20"
      >
        <div className="mx-auto w-full max-w-3xl">
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

          <div className="flex flex-col gap-8">
            {quests.map((quest, i) => (
              <motion.div
                key={quest.company}
                id={`quest-${quest.company.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                className="pixel-border bg-[#16213e] p-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                custom={i + 2}
                style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
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
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <p className="text-lg" style={{ color: quest.color }}>{quest.title}</p>
                  <p className="shrink-0 text-lg text-gray-500">{quest.period}</p>
                </div>
                <p className="mb-4 text-lg italic text-gray-400">{quest.summary}</p>

                {/* Key Wins */}
                <div className="mb-4 flex gap-3">
                  <div
                    className="pixel-border w-24 shrink-0 flex flex-col items-center justify-center text-center text-lg uppercase tracking-wide px-2 py-2 leading-tight"
                    style={{ color: quest.color, borderColor: quest.color }}
                  >
                    <span>🔥</span>
                    <span>Key</span>
                    <span>Wins</span>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {quest.keyWins.map((h, j) => (
                      <li key={j} className="flex gap-3 text-lg text-gray-300">
                        <span className="mt-1 shrink-0" style={{ color: quest.color }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What I Built */}
                <div className="flex gap-3">
                  <div
                    className="pixel-border w-24 shrink-0 flex flex-col items-center justify-center text-center text-lg uppercase tracking-wide px-2 py-2 leading-tight"
                    style={{ color: quest.color, borderColor: quest.color }}
                  >
                    <span>⚙️</span>
                    <span>Built</span>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {quest.whatIBuilt.map((h, j) => (
                      <li key={j} className="flex gap-3 text-lg text-gray-300">
                        <span className="mt-1 shrink-0" style={{ color: quest.color }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FocusSection>

      {/* ── Fun Facts ────────────────────────────────────────── */}
      <FocusSection
        id="funfacts"
        containerRef={containerRef}
        className="flex min-h-screen flex-col justify-center px-4 md:px-6 pt-20 pb-12 md:py-20"
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
                id={`fact-${i}`}
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

                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-2xl text-white" style={{ wordBreak: "keep-all" }}>{a.title}</h3>
                    <ul className="space-y-1">
                      {a.description.split(" · ").map((line, k) => (
                        <li key={k} className="flex gap-2 text-lg leading-7 text-gray-400">
                          <span className="mt-1 shrink-0" style={{ color: a.color }}>▸</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Photo strip */}
                {a.photos && a.photos.length > 0 && (
                  <div className="flex justify-center gap-3 overflow-x-auto px-5 pb-5">
                    {a.photos.map((photo, k) => (
                      <div
                        key={k}
                        className="pixel-border shrink-0 overflow-hidden"
                        style={{ width: 140, height: photo.fit === "contain" ? 180 : 110, border: `2px solid ${a.color}`, background: "#0a0a1a" }}
                      >
                        <Image
                          src={photo.src}
                          alt=""
                          width={140}
                          height={photo.fit === "contain" ? 180 : 110}
                          style={{ objectFit: photo.fit ?? "cover", objectPosition: photo.pos ?? "center", width: "100%", height: "100%" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </FocusSection>

      {/* ── Contact ──────────────────────────────────────────── */}
      <FocusSection
        id="contact"
        containerRef={containerRef}
        className="flex min-h-screen flex-col items-center justify-center px-4 md:px-6 text-center"
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
          Have a strategy challenge<br className="md:hidden" /> or want to team up?<br />Send a message and let&apos;s talk!
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
