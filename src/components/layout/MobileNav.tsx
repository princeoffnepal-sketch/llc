"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contactHref, navigation } from "@/config/site";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Close when the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Keep focus inside the menu and its toggle while open.
      const focusables = [buttonRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(
        Boolean,
      ) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) close(false);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const duration = reduceMotion ? 0 : 0.45;

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => {
          setOpenedAt(pathname);
          setOpen((v) => !v);
        }}
        className="relative -mr-2 flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-quint ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-quint ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={panelId}
            key="panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 md:top-[4.5rem] z-40 overflow-y-auto border-t border-white/[0.07] bg-ink"
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-6 pb-10">
              <ul className="flex flex-col">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration, delay: reduceMotion ? 0 : 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/[0.08]"
                  >
                    <Link
                      href={item.href}
                      onClick={() => close(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex items-center justify-between py-5 font-display text-[1.75rem] font-medium tracking-[-0.03em] text-paper aria-[current=page]:text-accent-soft"
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-xs text-mist">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Link
                  href={contactHref("digital")}
                  onClick={() => close(false)}
                  className="flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-medium text-white"
                >
                  Discuss a Project
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
