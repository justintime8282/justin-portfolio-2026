"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelPokeball from "./PixelPokeball";

interface Particle {
  id: number;
  tx: string;
  ty: string;
  color: string;
  size: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  const colors = ["#dc2626", "#f5f5f5", "#facc15", "#4ade80", "#60a5fa"];
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 80 + Math.random() * 160;
    return {
      id: i,
      tx: `${Math.cos(angle) * distance}px`,
      ty: `${Math.sin(angle) * distance}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      delay: Math.random() * 0.15,
    };
  });
}

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"shake" | "explode" | "done">("shake");
  const [particles] = useState(() => generateParticles(32));

  // Stars must be client-only — Math.random() in render causes SSR/hydration mismatch
  const [stars, setStars] = useState<{ top: string; left: string; opacity: number }[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 20 }, () => ({
        top:     `${Math.random() * 100}%`,
        left:    `${Math.random() * 100}%`,
        opacity: 0.3 + Math.random() * 0.4,
      }))
    );
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (phase === "shake") {
      setPhase("explode");
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "explode") {
      // 0.8s for explosion visuals + 0.5s buffer before revealing content
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#1a1a2e" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Starfield background dots — client-only to avoid SSR hydration mismatch */}
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-none"
              style={{
                width: 3,
                height: 3,
                background: "#4ade80",
                opacity: s.opacity,
                top: s.top,
                left: s.left,
              }}
            />
          ))}

          {/* Status text */}
          <motion.p
            className={`mb-8 tracking-widest text-pixel-green font-pixel ${phase === "explode" ? "text-5xl" : "text-2xl"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phase === "shake" ? "Catching portfolio..." : "Gotcha!"}
          </motion.p>

          {/* Pokéball container */}
          <div className="relative">
            {/* Explosion particles */}
            {phase === "explode" &&
              particles.map((p) => (
                <div
                  key={p.id}
                  className="animate-particle absolute left-1/2 top-1/2"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    marginLeft: -p.size / 2,
                    marginTop: -p.size / 2,
                    "--tx": p.tx,
                    "--ty": p.ty,
                    animationDelay: `${p.delay}s`,
                  } as React.CSSProperties}
                />
              ))}

            {/* The Pokéball */}
            {phase === "shake" && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                // No onAnimationComplete here — the spring firing early was
                // the bug that cut the sequence short.
                transition={{ duration: 0.4, type: "spring" }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 14, -14, 10, -10, 6, -6, 3, -2, 0],
                    scale: [1, 1.06, 1, 1.1, 0.97, 1.08, 1, 1.04, 1, 1],
                  }}
                  transition={{
                    // 0.3s pause after spring, then 2.5s of tension-building shake
                    duration: 2.5,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  <PixelPokeball className="h-28 w-28 drop-shadow-[0_0_24px_rgba(220,38,38,0.5)]" />
                </motion.div>
              </motion.div>
            )}

            {/* Flash on explode */}
            {phase === "explode" && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                initial={{ width: 20, height: 20, opacity: 1 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: "white" }}
              />
            )}
          </div>

          {/* Pixel progress bar */}
          <div className="mt-10 h-4 w-48 pixel-border bg-[#111]">
            <motion.div
              className="h-full bg-pixel-green"
              initial={{ width: "0%" }}
              animate={{ width: phase === "shake" ? "70%" : "100%" }}
              transition={{ duration: phase === "shake" ? 2.8 : 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
