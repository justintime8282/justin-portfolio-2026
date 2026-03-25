"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_ID = "6CjpgFOOtuI";

// Pixel-art double musical note (♫) — two eighth notes joined by a thick beam
function PixelNote({ playing }: { playing: boolean }) {
  const c = playing ? "#4ade80" : "#888888";
  const px = 3;
  const grid = [
    [0,1,1,1,1,1,0,0], // beam row 1 (thick)
    [0,1,1,1,1,1,0,0], // beam row 2 (thick)
    [0,1,0,0,0,1,0,0], // stems
    [0,1,0,0,0,1,0,0], // stems
    [1,1,1,0,1,1,1,0], // note heads
    [1,1,1,0,1,1,1,0], // note heads
  ];
  const w = grid[0].length * px;
  const h = grid.length * px;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ imageRendering: "pixelated", display: "block" }}>
      {grid.map((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x*px} y={y*px} width={px} height={px} fill={c} /> : null
        )
      )}
    </svg>
  );
}

export default function Jukebox() {
  const [playing, setPlaying]         = useState(false);
  const [ready, setReady]             = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const calloutAlive = useRef(true); // ref guard — dismiss only fires once

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const mountRef  = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    function initPlayer() {
      if (!mountRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      playerRef.current = new (window as any).YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => setReady(true),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (e: any) => {
            if (e.data === 1)                setPlaying(true);
            else if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT?.Player) { initPlayer(); return; }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).onYouTubeIframeAPIReady = initPlayer;

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  // Dismiss callout on scroll or click — registered once, ref prevents double-fire
  useEffect(() => {
    function dismiss() {
      if (!calloutAlive.current) return; // already dismissed — ignore
      calloutAlive.current = false;
      setShowCallout(false);
    }
    window.addEventListener("scroll",    dismiss, { passive: true, capture: true });
    window.addEventListener("wheel",     dismiss, { passive: true, capture: true });
    window.addEventListener("touchmove", dismiss, { passive: true, capture: true });
    window.addEventListener("click",     dismiss, { capture: true });
    return () => {
      window.removeEventListener("scroll",    dismiss, { capture: true });
      window.removeEventListener("wheel",     dismiss, { capture: true });
      window.removeEventListener("touchmove", dismiss, { capture: true });
      window.removeEventListener("click",     dismiss, { capture: true });
    };
  }, []); // run once on mount

  function togglePlay() {
    if (!ready || !playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else         playerRef.current.playVideo();
  }

  return (
    <>
      {/* Invisible 1×1 YouTube player — audio only */}
      <div
        ref={mountRef}
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      />

      {/* Play / Pause toggle — top left */}
      <div className="fixed left-3 top-[13px] lg:left-5 lg:top-[80px] z-40 font-pixel">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="pixel-border bg-[#16213e] px-3 py-1 lg:px-4 lg:py-2 text-lg text-pixel-green"
          title={playing ? "Pause music" : "Play music"}
        >
          {/* Mobile: pixel note icon only */}
          <span className="lg:hidden"><PixelNote playing={playing} /></span>
          {/* Desktop: emoji + text */}
          <span className="hidden lg:inline">{playing ? "🔊 Music" : "🔇 Music"}</span>
        </motion.button>
      </div>

      {/* Blinking callout — centered on screen */}
      <AnimatePresence>
        {showCallout && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%" }}
            animate={{
              opacity: [0, 1, 0.1, 1, 1],
              scale: 1,
              x: "-50%",
            }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", transition: { duration: 0.1 } }}
            transition={{
              scale:   { duration: 0.3 },
              opacity: { duration: 2.0, times: [0, 0.05, 0.25, 0.45, 1], ease: "easeInOut" },
            }}
            className="font-pixel pixel-border px-4 py-3 md:px-8 md:py-5 text-base md:text-xl max-w-[90vw]"
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              zIndex: 50,
              textAlign: "center",
              background: "#d1d5db",
              color: "#374151",
            }}
          >
            <div className="whitespace-nowrap">Click the top-left button</div>
            <div className="whitespace-nowrap">to enjoy some tunes</div>
            <div className="whitespace-nowrap">while reading! Enjoy 😊</div>
            <div style={{ marginTop: "1rem" }}>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!calloutAlive.current) return;
                  calloutAlive.current = false;
                  setShowCallout(false);
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="pixel-border px-6 py-1"
                style={{ background: "#374151", color: "#d1d5db", fontSize: "1.1rem" }}
              >
                OK
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
