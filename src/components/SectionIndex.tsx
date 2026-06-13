import { cn } from "@/lib/utils";

/**
 * The recurring editorial section marker: a mono index label
 * (e.g. "01 / About") above a short accent rule.
 */
export function SectionIndex({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <span className="block font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
        {label}
      </span>
      <span className="block h-0.5 w-10 bg-accent" />
    </div>
  );
}
