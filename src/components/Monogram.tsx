import { cn } from "@/lib/utils";

type MonogramSize = "sm" | "md" | "lg";

const sizes: Record<MonogramSize, string> = {
  sm: "h-9 w-9 text-sm rounded-[8px]",
  md: "h-12 w-12 text-lg rounded-[10px]",
  lg: "h-28 w-28 text-4xl rounded-[14px]",
};

/**
 * The "DG" brand mark — a thin-bordered paper tile with a single accent
 * corner tick. Reused as the nav mark, the about avatar and (in spirit) the
 * favicon, so the site has an identity before a real photo exists.
 */
export function Monogram({
  size = "md",
  className,
}: {
  size?: MonogramSize;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex select-none items-center justify-center border border-border bg-surface",
        sizes[size],
        className,
      )}
    >
      <span className="font-heading font-semibold tracking-tight text-foreground">
        DG
      </span>
      {/* accent corner tick */}
      <span className="absolute -right-px -top-px h-2.5 w-2.5 border-r-2 border-t-2 border-accent" />
    </span>
  );
}
