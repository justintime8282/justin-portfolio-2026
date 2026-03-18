"use client";

import { motion } from "framer-motion";

// Per-section accent colors:
//   Home      → white   (clean starting point, high contrast)
//   About Me  → green   (matches green "About Me" landing button)
//   Quest Log → yellow  (matches yellow "Projects" landing button)
//   Fun Facts → red     (matches Fun Facts section title accent)
//   Contact   → blue    (matches blue email/copy button)
const NAV_ITEMS = [
  { id: "home",     label: "Home",      color: "#ffffff" },
  { id: "about",    label: "About Me",  color: "#4ade80" },
  { id: "projects", label: "Quest Log", color: "#facc15" },
  { id: "funfacts", label: "Fun Facts", color: "#ef4444" },
  { id: "contact",  label: "Contact",   color: "#60a5fa" },
];

interface Props {
  activeSection: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function VerticalNav({ activeSection, containerRef }: Props) {
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed right-5 top-1/2 z-40 -translate-y-1/2 flex flex-col items-end gap-4 font-pixel">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {/* Label — slides in and glows with its section color when active */}
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0.25,
                x: isActive ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="text-sm tracking-widest uppercase"
              style={{
                color: isActive ? item.color : "#888",
                textShadow: isActive ? `0 0 10px ${item.color}` : "none",
              }}
            >
              {item.label}
            </motion.span>

            {/* Square pixel dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.6 : 1,
                backgroundColor: isActive ? item.color : "#444",
                boxShadow: isActive ? `0 0 6px ${item.color}` : "none",
              }}
              transition={{ duration: 0.25 }}
              className="h-3 w-3 shrink-0"
              style={{ imageRendering: "pixelated" }}
            />
          </button>
        );
      })}
    </nav>
  );
}
