import { claudeUsage, formatCompact } from "@/lib/claude-usage";

/**
 * Which models did the work, by tokens. One stacked bar for the shape,
 * a labelled list for the numbers — the bar stays a single hue, stepping
 * down in opacity, so nothing is identified by color alone.
 */
export function ModelSplit() {
  const { models } = claudeUsage;
  const total = models.reduce((sum, model) => sum + model.tokens, 0) || 1;

  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Models
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        Share of tokens, by the model that handled the turn.
      </p>

      <div className="mt-6 flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {models.map((model, index) => (
          <div
            key={model.name}
            className="h-full bg-chart-claude first:rounded-l-full last:rounded-r-full"
            style={{ flexGrow: model.tokens, opacity: 1 - index * 0.22 }}
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
                style={{ opacity: 1 - index * 0.22 }}
              />
              {model.name}
            </span>
            <span className="whitespace-nowrap font-mono text-xs text-foreground-muted">
              {formatCompact(model.tokens)} · {Math.round((model.tokens / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
