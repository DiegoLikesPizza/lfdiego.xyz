import { ArrowUpRight } from "lucide-react";
import { claudeStats, formatDate } from "@/lib/claude-stats";

/**
 * The most recent commits Claude co-authored, each linking to the diff on
 * GitHub — the receipts behind the numbers above.
 */
export function CommitList() {
  const { recent, repo } = claudeStats;

  return (
    <ul>
      {recent.map((commit) => (
        <li key={commit.hash}>
          <a
            href={`https://github.com/${repo}/commit/${commit.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border-t border-border py-5 transition-colors hover:bg-accent-soft md:pl-4 md:transition-[padding] md:duration-300 md:hover:pl-6"
          >
            <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

            {/* Stacks on phones; one line from md up. */}
            <span className="flex items-start gap-3 md:items-baseline">
              <code className="mt-0.5 font-mono text-xs text-foreground-subtle md:mt-0">
                {commit.hash}
              </code>
              <span className="min-w-0 flex-1 text-[0.95rem] leading-relaxed text-foreground transition-colors group-hover:text-accent-hover">
                {commit.subject}
              </span>
              <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-foreground-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent md:mt-0" />
            </span>

            <span className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 pl-[4.25rem] font-mono text-xs text-foreground-subtle md:mt-1.5">
              <span>
                <span className="text-chart-claude">+{commit.added}</span>{" "}
                <span className="text-foreground-muted">−{commit.removed}</span>
              </span>
              <span>{formatDate(commit.date)}</span>
              {commit.model && <span>{commit.model}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
