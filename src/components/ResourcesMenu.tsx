"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { isResourceActive, resources, type Resource } from "@/lib/resources";

/** One resource row: icon, name and a one-line description. */
export function ResourceItem({
  resource,
  active,
  onSelect,
}: {
  resource: Resource;
  active: boolean;
  onSelect?: () => void;
}) {
  const className = cn(
    "group flex items-start gap-3 rounded-[8px] p-2.5 transition-colors hover:bg-surface-hover",
    active && "bg-accent-soft",
  );
  const body = (
    <>
      <span
        className={cn(
          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border bg-background-secondary transition-colors group-hover:border-accent/40 group-hover:text-accent",
          active ? "border-accent/40 text-accent" : "border-border text-foreground-muted",
        )}
      >
        <resource.icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">{resource.label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-foreground-muted">
          {resource.description}
        </span>
      </span>
    </>
  );

  return resource.outsideApp ? (
    <a href={resource.href} className={className} onClick={onSelect}>
      {body}
    </a>
  ) : (
    <Link
      href={resource.href}
      className={className}
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
    >
      {body}
    </Link>
  );
}

/** Desktop “Resources” dropdown in the header nav. */
export function ResourcesMenu() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = resources.some((resource) => isResourceActive(resource, pathname));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        // Close when keyboard focus leaves the button and its panel.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative inline-flex items-center gap-1 px-3 py-2 text-sm transition-colors",
          active || open ? "text-foreground" : "text-foreground-muted hover:text-foreground",
        )}
      >
        Resources
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
        />
        <span
          className={cn(
            "absolute inset-x-3 -bottom-1 h-0.5 origin-left bg-accent transition-transform duration-300",
            active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -6, x: "-50%" }}
            transition={{ duration: reduce ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-10 mt-3 w-[340px] rounded-[var(--radius)] border border-border bg-surface p-2 shadow-[var(--shadow)]"
          >
            <p className="px-2.5 pb-1.5 pt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-foreground-subtle">
              Resources
            </p>
            <ul>
              {resources.map((resource) => (
                <li key={resource.href}>
                  <ResourceItem
                    resource={resource}
                    active={isResourceActive(resource, pathname)}
                    onSelect={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
