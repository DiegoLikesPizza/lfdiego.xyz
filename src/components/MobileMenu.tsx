"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResourceItem } from "@/components/ResourcesMenu";
import { isResourceActive, resources } from "@/lib/resources";

type NavLink = { id: string; label: string; href: string };

// True only in the browser — the panel is portalled to <body>, which doesn't
// exist during the static render.
const subscribeNoop = () => () => {};

/**
 * The menu button shown below the sm breakpoint, and the side panel it opens.
 * The panel is portalled to <body>: the header's backdrop-filter would
 * otherwise become the containing block and trap a fixed panel inside it.
 */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      // Keep Tab focus inside the panel while it's open.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Rotating a tablet or widening the window past sm hides the panel with
    // CSS — close it properly so the page doesn't stay scroll-locked.
    const desktop = window.matchMedia("(min-width: 640px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    const button = buttonRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-foreground transition-colors hover:border-accent/40 sm:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div key="mobile-menu" className="fixed inset-0 z-[60] sm:hidden">
                <motion.div
                  aria-hidden="true"
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                  className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]"
                />
                <motion.div
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={reduce ? { duration: 0 } : { type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col border-l border-border bg-background shadow-[var(--shadow)]"
                >
                  <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border px-5">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
                      Menu
                    </span>
                    <button
                      type="button"
                      data-autofocus
                      onClick={close}
                      aria-label="Close menu"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-foreground transition-colors hover:border-accent/40"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-3 py-5">
                    <nav aria-label="Sections">
                      <ul>
                        {links.map((link) => (
                          <li key={link.id}>
                            <Link
                              href={link.href}
                              onClick={close}
                              className="block rounded-[8px] px-2.5 py-2.5 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground transition-colors hover:bg-surface-hover hover:text-accent"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="mt-6 border-t border-border pt-5">
                      <p className="px-2.5 pb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-foreground-subtle">
                        Resources
                      </p>
                      <ul>
                        {resources.map((resource) => (
                          <li key={resource.href}>
                            <ResourceItem
                              resource={resource}
                              active={isResourceActive(resource, pathname)}
                              onSelect={close}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 border-t border-border p-4">
                    <ThemeToggle />
                    <Link
                      href="/#contact"
                      onClick={close}
                      className="inline-flex flex-1 items-center justify-center rounded-[var(--radius)] bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
                    >
                      Get in touch
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
