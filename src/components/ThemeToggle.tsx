"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

// Read the current theme straight from the <html> class (the source of truth,
// set before paint by the inline script in layout.tsx). useSyncExternalStore
// keeps it hydration-safe without a setState-in-effect.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false, // server + first client render: assume light (no .dark on <html>)
  );

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore (e.g. private mode) */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#15140f" : "#fafaf7");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-foreground-muted transition-colors hover:border-accent/40 hover:text-foreground"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
