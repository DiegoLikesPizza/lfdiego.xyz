import { claudeUsage, formatCompact } from "@/lib/claude-usage";

/**
 * Which models did the work, by share of tokens. One bar for the shape, a
 * labelled list for the numbers — the bar stays a single hue, stepping down
 * in opacity, so nothing is identified by color alone.
 */
export function ModelSplit() {
  const { models } = claudeUsage;

  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Models
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        Share of all tokens, by the model that handled the turn.
      </p>

      <div className="mt-6 flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {models.map((model, index) => (
          <div
            key={model.name}
            className="h-full bg-chart-claude first:rounded-l-full last:rounded-r-full"
            style={{ flexGrow: Math.max(model.share, 0.4), opacity: 1 - index * 0.22 }}
          />
        ))}
      </div>

      <ul className="mt-7 space-y-5">
        {models.map((model, index) => (
          <li
            key={model.name}
            className="border-b border-border pb-5 last:border-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="inline-flex items-center gap-2.5 font-heading text-base font-semibold text-foreground">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-chart-claude"
                  style={{ opacity: 1 - index * 0.22 }}
                />
                {model.name}
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-foreground-muted">
                {formatCompact(model.tokens)} · {model.share}%
              </span>
            </div>
            <p className="mt-2 font-mono text-[0.7rem] leading-relaxed text-foreground-subtle">
              In {formatCompact(model.input)} · Out {formatCompact(model.output)} ·
              Cache {formatCompact(model.cacheRead)} read /{" "}
              {formatCompact(model.cacheWrite)} write
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
