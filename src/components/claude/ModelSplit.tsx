import { claudeStats } from "@/lib/claude-stats";

/**
 * Which Claude model co-authored what, read straight from the
 * `Co-Authored-By: Claude <model>` trailers. A single stacked bar plus a
 * labelled list — the bar is the shape, the list carries the numbers.
 */
export function ModelSplit() {
  const { models, totals } = claudeStats;
  const total = models.reduce((sum, model) => sum + model.commits, 0) || 1;

  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Models
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        Taken from the co-author trailer on each of the{" "}
        {totals.claudeCommits} commits.
      </p>

      <div className="mt-6 flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {models.map((model, index) => (
          <div
            key={model.name}
            className="h-full first:rounded-l-full last:rounded-r-full bg-chart-claude"
            // Later models step down in opacity so the bar stays one hue.
            style={{ flexGrow: model.commits, opacity: 1 - index * 0.28 }}
          />
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {models.map((model, index) => (
          <li
            key={model.name}
            className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0"
          >
            <span className="inline-flex items-center gap-2.5 text-sm text-foreground">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-chart-claude"
                style={{ opacity: 1 - index * 0.28 }}
              />
              {model.name}
            </span>
            <span className="font-mono text-xs text-foreground-muted">
              {model.commits} · {Math.round((model.commits / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
