"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion";

/**
 * Progressive section reveals. Content is fully visible in the server HTML;
 * after hydration, only elements that start below the fold are hidden and then
 * revealed as they scroll in. Without JavaScript, or with reduced motion
 * requested, nothing is ever hidden.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending = new Set<HTMLElement>();

    for (const el of elements) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 28px, 0)";
      pending.add(el);
    }

    // A scroll check (rather than only an IntersectionObserver) also catches
    // elements skipped past during fast scrolls or anchor jumps.
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      for (const el of pending) {
        if (el.getBoundingClientRect().top >= limit) continue;
        pending.delete(el);
        animate(
          el,
          { opacity: 1, transform: "translate3d(0, 0px, 0)" },
          { duration: 0.8, delay: Number(el.dataset.revealDelay ?? 0), ease: [0.22, 1, 0.36, 1] },
        );
      }
      if (!pending.size) detach();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      detach();
      cancelAnimationFrame(frame);
      for (const el of elements) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    };
  }, [pathname]);

  return null;
}
