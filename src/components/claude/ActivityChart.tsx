import { claudeStats, formatDate } from "@/lib/claude-stats";

/**
 * Commits per month, stacked: the accent segment is what Claude co-authored,
 * the neutral one is what I wrote alone. Two series, so the legend is always
 * present and every bar carries its total as a direct label — identity and
 * magnitude are never color-alone.
 */
export function ActivityChart() {
  const { months } = claudeStats;
  const peak = Math.max(1, ...months.map((m) => m.claude + m.solo));

  return (
    <figure className="m-0">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Commits per month
        </h3>
        <ul className="flex items-center gap-4">
          <li className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-chart-claude" />
            With Claude
          </li>
          <li className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-chart-solo" />
            Solo
          </li>
        </ul>
      </figcaption>

      <div
        className="mt-8 flex items-end gap-3 sm:gap-5"
        style={{ height: "220px" }}
      >
        {months.map((month) => {
          const total = month.claude + month.solo;
          return (
            <div
              key={month.month}
              className="group flex h-full min-w-0 flex-1 flex-col justify-end"
            >
              <p className="mb-2 text-center font-mono text-xs text-foreground-subtle transition-colors group-hover:text-foreground">
                {total}
              </p>

              {/* One column = one month; the 2px gap keeps the two segments
                  readable where they meet. */}
              <div
                className="flex w-full flex-col justify-end gap-0.5"
                style={{ height: `${(total / peak) * 100}%` }}
                title={`${formatDate(month.month)} — ${month.claude} with Claude, ${month.solo} solo`}
              >
                {month.claude > 0 && (
                  <div
                    className="w-full rounded-t-[4px] bg-chart-claude transition-opacity group-hover:opacity-85"
                    style={{ flexGrow: month.claude }}
                  />
                )}
                {month.solo > 0 && (
                  <div
                    className="w-full bg-chart-solo transition-opacity group-hover:opacity-85"
                    style={{
                      flexGrow: month.solo,
                      borderRadius:
                        month.claude > 0 ? "0 0 4px 4px" : "4px 4px 4px 4px",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Baseline + month labels */}
      <div className="flex gap-3 border-t border-border pt-3 sm:gap-5">
        {months.map((month) => (
          <p
            key={month.month}
            className="min-w-0 flex-1 truncate text-center font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground-subtle"
          >
            {formatDate(month.month)}
          </p>
        ))}
      </div>

      {/* The same numbers as a table, for screen readers and anyone who'd
          rather read them than a bar. */}
      <table className="sr-only">
        <caption>Commits per month, split by whether Claude co-authored them</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">With Claude</th>
            <th scope="col">Solo</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr key={month.month}>
              <th scope="row">{formatDate(month.month)}</th>
              <td>{month.claude}</td>
              <td>{month.solo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
