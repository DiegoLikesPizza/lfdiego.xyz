import { claudeUsage, formatCompact, formatNumber } from "@/lib/claude-usage";

/**
 * Where the tokens actually go. Cache reads dominate any long session — the
 * conversation so far is re-read on every turn — so the split is worth
 * showing rather than hiding behind one big number.
 */
export function TokenBreakdown() {
  const { totals } = claudeUsage;

  const parts = [
    {
      label: "Cache reads",
      value: totals.cacheRead,
      note: "The conversation so far, re-read each turn",
    },
    {
      label: "Cache writes",
      value: totals.cacheWrite,
      note: "New context written into the cache",
    },
    { label: "Output", value: totals.output, note: "What Claude wrote back" },
    { label: "Input", value: totals.input, note: "Uncached prompt tokens" },
  ];
  const total = totals.tokens || 1;

  return (
    <ul className="space-y-6">
      {parts.map((part) => {
        const share = (part.value / total) * 100;
        return (
          <li key={part.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-heading text-base font-semibold text-foreground">
                {part.label}
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-foreground-muted">
                {formatCompact(part.value)} · {share < 1 ? "<1" : Math.round(share)}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
              <div
                className="h-full rounded-full bg-chart-claude"
                style={{ width: `${Math.max(share, 0.5)}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-foreground-muted">
              {part.note} — {formatNumber(part.value)} tokens
            </p>
          </li>
        );
      })}
    </ul>
  );
}
