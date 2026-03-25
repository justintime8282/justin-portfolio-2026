"use client";

import { useEffect, useRef, useState } from "react";
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
  const [snapType, setSnapType] = useState<string>("y mandatory");

  // Desktop (≥1024px) uses proximity — feels natural with mouse scroll.
  // Mobile (<1024px) uses mandatory — prevents section skipping on swipe.
  useEffect(() => {
    const update = () =>
      setSnapType(window.innerWidth >= 1024 ? "none" : "y mandatory");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
            {/* Bottom bar — mirrors top walking party bar */}
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 28, background: "#0f0f1a", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <span style={{ fontSize: "0.6rem", color: "#4b5563", letterSpacing: "0.05em" }}>© {new Date().getFullYear()} Justin Chun. All rights reserved.</span>
            </div>
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
                scrollSnapType: snapType,
                scrollBehavior: "smooth",
                scrollPaddingTop: 72,
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
