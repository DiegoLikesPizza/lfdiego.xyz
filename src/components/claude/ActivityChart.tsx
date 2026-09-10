import { claudeUsage, formatCompact, formatDate, formatNumber } from "@/lib/claude-usage";

/**
 * Tokens per month — one series, so the title names it and no legend is
 * needed. Every bar is directly labelled, and the same numbers sit in a
 * screen-reader table below.
 */
export function ActivityChart() {
  const { months } = claudeUsage;
  const peak = Math.max(1, ...months.map((month) => month.tokens));

  return (
    <figure className="m-0">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Tokens per month
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
          Sessions below each bar
        </p>
      </figcaption>

      <div className="mt-8 flex items-end gap-3 sm:gap-4" style={{ height: "220px" }}>
        {months.map((month) => (
          <div
            key={month.month}
            className="group flex h-full min-w-0 max-w-[96px] flex-1 flex-col justify-end"
            title={`${formatDate(month.month)} — ${formatNumber(month.tokens)} tokens across ${month.sessions} ${month.sessions === 1 ? "session" : "sessions"}`}
          >
            <p className="mb-2 text-center font-mono text-xs text-foreground-subtle transition-colors group-hover:text-foreground">
              {formatCompact(month.tokens)}
            </p>
            <div
              className="w-full rounded-t-[4px] bg-chart-claude transition-opacity group-hover:opacity-85"
              style={{ height: `${Math.max((month.tokens / peak) * 100, 1.5)}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 border-t border-border pt-3 sm:gap-4">
        {months.map((month) => (
          <div key={month.month} className="min-w-0 max-w-[96px] flex-1 text-center">
            <p className="truncate font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground-subtle">
              {formatDate(month.month)}
            </p>
            <p className="mt-1 font-mono text-[0.7rem] text-foreground-muted">
              {month.sessions}
            </p>
          </div>
        ))}
      </div>

      <table className="sr-only">
        <caption>Tokens and sessions per month</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Tokens</th>
            <th scope="col">Sessions</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr key={month.month}>
              <th scope="row">{formatDate(month.month)}</th>
              <td>{formatNumber(month.tokens)}</td>
              <td>{month.sessions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
