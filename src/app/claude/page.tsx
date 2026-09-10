import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MessagesSquare,
  Sigma,
  TerminalSquare,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { StatCard } from "@/components/claude/StatCard";
import { ActivityChart } from "@/components/claude/ActivityChart";
import { ModelSplit } from "@/components/claude/ModelSplit";
import { TokenBreakdown } from "@/components/claude/TokenBreakdown";
import {
  claudeUsage,
  formatCompact,
  formatDate,
  formatNumber,
} from "@/lib/claude-usage";

const TITLE = "Claude stats — Diego Göttler";
const DESCRIPTION =
  "How much I actually use Claude: sessions, prompts, tokens and models, counted from my own Claude Code transcripts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/claude/" },
  openGraph: {
    type: "article",
    url: "/claude/",
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
  const { totals, generatedAt } = claudeUsage;

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
            My Claude, <span className="text-accent">by the numbers</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-foreground-muted">
            I work with Claude most days, so I counted the whole of it — every
            session, prompt and token, read straight out of my local Claude Code
            transcripts. Numbers only: no prompts, no code, no project names.
          </p>
        </Reveal>
      </section>

      {/* Headline numbers */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="01 / Totals" />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: TerminalSquare,
              value: formatNumber(totals.sessions),
              label: "Sessions",
              note: `Across ${formatNumber(totals.daysActive)} ${totals.daysActive === 1 ? "day" : "days"} of use.`,
            },
            {
              icon: Sigma,
              value: formatCompact(totals.tokens),
              label: "Tokens",
              note: `${formatNumber(totals.tokens)} in total, in and out.`,
            },
            {
              icon: MessagesSquare,
              value: formatNumber(totals.prompts),
              label: "Prompts sent",
              note: `Answered with ${formatNumber(totals.assistantMessages)} replies.`,
            },
            {
              icon: CalendarDays,
              value: formatCompact(totals.toolCalls),
              label: "Tool calls",
              note: "Files read, commands run, edits made.",
            },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>

        {totals.firstUsed && totals.lastUsed && (
          <Reveal delay={0.24}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              First session {formatDate(totals.firstUsed)} · Latest{" "}
              {formatDate(totals.lastUsed)}
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

      {/* Token split */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="03 / Where the tokens go" />
          <h2 className="mt-8 max-w-[24ch] font-heading text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
            Most of a big number is just re-reading.
          </h2>
          <p className="mt-6 max-w-[52ch] leading-relaxed text-foreground-muted">
            A long session re-reads everything said so far on every turn, which
            is why cache reads dwarf the rest. Of the output,{" "}
            {formatNumber(totals.thinking)} tokens were thinking.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 max-w-[62ch]">
            <TokenBreakdown />
          </div>
        </Reveal>
      </section>

      {/* Method */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="04 / How this is counted" />
          <div className="mt-8 max-w-[62ch] space-y-4 text-foreground-muted">
            <p className="leading-relaxed">
              Claude Code keeps a transcript of every session on my machine. A
              script walks those files, adds up sessions, prompts, tool calls
              and token usage per model and per month, and writes the totals to
              a small JSON file this page renders.
            </p>
            <p className="leading-relaxed">
              Only counts ever leave the machine — no prompts, no code, no file
              paths, no project names. Sessions I ran on other machines or in
              the browser aren&apos;t included, so if anything this undercounts.
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
