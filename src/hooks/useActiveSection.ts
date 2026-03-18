"use client";

import { useEffect, useState } from "react";

/**
 * Determines the active section by finding whichever section's center
 * is closest to the scroll container's viewport center.
 *
 * This approach is more reliable than IntersectionObserver ratio-picking
 * for snap-scroll layouts where multiple sections can overlap in visibility.
 */
export function useActiveSection(
  containerRef: React.RefObject<HTMLDivElement | null>,
  sectionIds: string[],
  ready: boolean
): string {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    if (!ready) return;

    const container = containerRef.current;
    if (!container) return;

    const getActive = () => {
      const viewportCenter = container.scrollTop + container.clientHeight / 2;

      let closest = sectionIds[0];
      let closestDist = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const elCenter = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(viewportCenter - elCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });

      setActive(closest);
    };

    // Run once immediately so the initial state is correct
    getActive();

    container.addEventListener("scroll", getActive, { passive: true });
    return () => container.removeEventListener("scroll", getActive);
  }, [containerRef, sectionIds, ready]);

  return active;
}
