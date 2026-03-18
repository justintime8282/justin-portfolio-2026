"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FocusSectionProps {
  id?: string;
  className?: string;
  /** Pass true for the Hero — it's already in view on mount, so start at full opacity. */
  initialInView?: boolean;
  /** Ref to the scroll container so IntersectionObserver uses it as the root. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export default function FocusSection({
  id,
  className,
  initialInView = false,
  containerRef,
  children,
}: FocusSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref as React.RefObject<Element>, {
    once: false,
    amount: 0.05,
    root: containerRef,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        willChange: "opacity",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
      initial={{ opacity: initialInView ? 1 : 0.08 }}
      animate={{ opacity: isInView ? 1 : 0.08 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
}
