import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, string> = {
  sm: "h-9 w-9 rounded-[8px]",
  md: "h-12 w-12 rounded-[10px]",
  lg: "h-28 w-28 rounded-[14px]",
};

/**
 * The lfdiego brand mark — the "<lfd>" wordmark on a self-contained tile, so it
 * reads cleanly on both the light and dark themes. Used as the nav mark, the
 * about avatar and the footer mark. (Decorative; nearby text carries the name.)
 */
export function Logo({
  size = "md",
  className,
}: {
  size?: LogoSize;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG asset, no optimization needed
    <img
      src="/lfd-logo.svg"
      alt=""
      aria-hidden="true"
      // dark:border separates the black tile from the dark background
      className={cn(
        "border border-border dark:border-foreground/15",
        sizes[size],
        className,
      )}
    />
  );
}
