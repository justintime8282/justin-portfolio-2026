"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PixelPokeball from "./PixelPokeball";

// ─── Component ────────────────────────────────────────────────────────────────

const PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD ?? "s62o";

export default function PasswordScreen({ onComplete }: { onComplete: () => void }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (input === PASSWORD) {
      onComplete();
    } else {
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "#1a1a2e" }}
    >
      {/* Static Pokéball */}
      <div style={{ marginBottom: 32 }}>
        <PixelPokeball className="h-28 w-28 drop-shadow-[0_0_24px_rgba(220,38,38,0.4)]" />
      </div>

      {/* Prompt */}
      <p className="mb-6 font-pixel text-xl tracking-widest text-pixel-green">
        Enter password
      </p>

      {/* Input + button */}
      <motion.div
        className="flex gap-3"
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          type="password"
          maxLength={4}
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="pixel-border bg-[#111] font-pixel text-center text-2xl text-pixel-green py-2"
          style={{ width: 120, outline: "none", letterSpacing: "0.4em" }}
        />
        <button
          onClick={handleSubmit}
          className="pixel-border bg-pixel-green px-5 py-2 font-pixel text-xl text-black transition-transform hover:scale-105"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
}
