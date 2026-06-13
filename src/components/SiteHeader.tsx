"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Monogram } from "@/components/Monogram";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Highlight the topmost section in view, or clear when none is
        // (e.g. over the hero, or the unobserved Stack section).
        setActive(links.find((link) => visible.has(link.id))?.id ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          aria-label="Diego Göttler — back to top"
          className="rounded-[8px]"
        >
          <Monogram size="sm" />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors",
                    active === link.id
                      ? "text-foreground"
                      : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-1 h-0.5 origin-left bg-accent transition-transform duration-300",
                      active === link.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="ml-1 inline-flex items-center rounded-[var(--radius)] border border-accent/45 px-3.5 py-1.5 text-sm font-medium text-accent-hover transition-colors hover:bg-accent hover:text-white"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
