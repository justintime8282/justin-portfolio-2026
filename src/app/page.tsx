"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PasswordScreen from "@/components/PasswordScreen";
import LoadingScreen from "@/components/LoadingScreen";
import PortfolioContent from "@/components/PortfolioContent";
import VerticalNav from "@/components/VerticalNav";
import Jukebox from "@/components/Jukebox";
import WalkingParty from "@/components/WalkingParty";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["home", "about", "projects", "funfacts", "contact"];

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pass !loading so the observer only attaches once the container & sections
  // are in the DOM — fixing the "always stuck on Home" bug.
  const activeSection = useActiveSection(containerRef, SECTION_IDS, !loading);

  return (
    <>
      {!authenticated && <PasswordScreen onComplete={() => setAuthenticated(true)} />}

      {authenticated && <LoadingScreen onComplete={() => setLoading(false)} />}

      <AnimatePresence>
        {authenticated && !loading && (
          <>
            <VerticalNav activeSection={activeSection} containerRef={containerRef} />
            <Jukebox />
            <WalkingParty activeSection={activeSection} />

            {/* Mask the scrollbar above the green grass line */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: 14,
                height: 72,
                background: "#1a1a2e",
                zIndex: 35,
                pointerEvents: "none",
              }}
            />

            <motion.div
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden",
                scrollSnapType: "y proximity",
                scrollBehavior: "smooth",
              }}
            >
              <PortfolioContent containerRef={containerRef} activeSection={activeSection} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
