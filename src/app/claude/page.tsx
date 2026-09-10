import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCode2, GitCommitHorizontal, Percent, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { StatCard } from "@/components/claude/StatCard";
import { ActivityChart } from "@/components/claude/ActivityChart";
import { ModelSplit } from "@/components/claude/ModelSplit";
import { CommitList } from "@/components/claude/CommitList";
import { claudeStats, formatDate, formatNumber } from "@/lib/claude-stats";

const TITLE = "Claude stats — Diego Göttler";
const DESCRIPTION =
  "How much of lfdiego.xyz I built with Claude: commits co-authored, lines written, models used — counted straight from the git history.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/claude" },
  openGraph: {
    type: "article",
    url: "/claude",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ClaudePage() {
  const { totals, topFiles, repo, generatedAt } = claudeStats;
  const peakFile = Math.max(1, ...topFiles.map((file) => file.commits));

  return (
    <main id="top">
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <Link
            href="/"
            className="link-wipe inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-8 max-w-[16ch] font-heading text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
            Building this site <span className="text-accent">with Claude</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-foreground-muted">
            I pair with Claude on a lot of my work, so I let the repository keep
            score. Every commit Claude helped with carries a co-author trailer —
            these numbers are counted from the git history of{" "}
            <a
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-wipe text-foreground"
            >
              {repo}
            </a>
            , not typed in by hand.
          </p>
        </Reveal>
      </section>

      {/* Headline numbers */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="01 / By the numbers" />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: GitCommitHorizontal,
              value: formatNumber(totals.claudeCommits),
              label: "Commits with Claude",
              note: `Out of ${formatNumber(totals.commits)} commits in total.`,
            },
            {
              icon: Percent,
              value: String(totals.claudeShare),
              suffix: "%",
              label: "Of all commits",
              note: "The share of this repo's history Claude co-authored.",
            },
            {
              icon: Plus,
              value: formatNumber(totals.linesAdded),
              label: "Lines added",
              note: `And ${formatNumber(totals.linesRemoved)} removed — deleting counts too.`,
            },
            {
              icon: FileCode2,
              value: formatNumber(totals.filesTouched),
              label: "Files touched",
              note: "Distinct files changed in those commits.",
            },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>

        {totals.firstCommit && totals.latestCommit && (
          <Reveal delay={0.24}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              First {formatDate(totals.firstCommit)} · Latest{" "}
              {formatDate(totals.latestCommit)}
            </p>
          </Reveal>
        )}
      </section>

      {/* Activity + models */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="02 / Activity" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-6 md:p-8">
              <ActivityChart />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-6 md:p-8">
              <ModelSplit />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where the work landed */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="03 / Where it landed" />
          <h2 className="mt-8 max-w-[24ch] font-heading text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
            The files we came back to most.
          </h2>
        </Reveal>

        <ul className="mt-12 space-y-5">
          {topFiles.map((file, index) => (
            <Reveal key={file.file} delay={index * 0.04}>
              <li>
                <div className="flex items-baseline justify-between gap-4">
                  <code className="min-w-0 truncate font-mono text-sm text-foreground">
                    {file.file}
                  </code>
                  <span className="whitespace-nowrap font-mono text-xs text-foreground-subtle">
                    {file.commits} {file.commits === 1 ? "commit" : "commits"}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
                  <div
                    className="h-full rounded-full bg-chart-claude"
                    style={{ width: `${(file.commits / peakFile) * 100}%` }}
                  />
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Recent commits */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="04 / Latest commits" />
          <p className="mt-8 max-w-[46ch] text-lg text-foreground-muted">
            The most recent work Claude and I shipped together.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12">
            <CommitList />
          </div>
        </Reveal>
      </section>

      {/* Method */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="05 / How this is counted" />
          <div className="mt-8 max-w-[62ch] space-y-4 text-foreground-muted">
            <p className="leading-relaxed">
              A build script walks <code className="font-mono text-sm text-foreground">git log</code>{" "}
              and counts every commit whose message carries a{" "}
              <code className="font-mono text-sm text-foreground">
                Co-Authored-By: Claude
              </code>{" "}
              trailer, along with the model named in it, the files it touched and
              the lines it changed. Merge commits are skipped so nothing is
              counted twice.
            </p>
            <p className="leading-relaxed">
              It only sees this repository — work Claude helped with elsewhere,
              and the thinking that never became a commit, isn&apos;t in here.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              Last counted {formatDate(generatedAt.slice(0, 10))}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
