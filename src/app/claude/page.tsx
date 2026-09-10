import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarCheck, Flame, Sigma, TerminalSquare } from "lucide-react";
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
  formatDuration,
  formatNumber,
} from "@/lib/claude-usage";

const TITLE = "Claude stats — Diego Göttler";
const DESCRIPTION =
  "How much I actually use Claude: sessions, tokens, streaks and models, counted from my own Claude Code usage.";

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
  const hasMonths = (claudeUsage.months?.length ?? 0) > 0;

  const meta = [
    `${totals.activeDays} of ${totals.daysInRange} days active`,
    `Longest session ${formatDuration(totals.longestSessionMinutes)}`,
    totals.mostActiveDay ? `Busiest ${formatDate(totals.mostActiveDay)}` : null,
    `Current streak ${totals.currentStreakDays} ${totals.currentStreakDays === 1 ? "day" : "days"}`,
  ].filter(Boolean);

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
            I work with Claude most days — pairing on features, debugging,
            reviewing my own code. This is the whole of it in numbers: sessions,
            tokens and the models that did the work.
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
              note: `Spread over ${totals.activeDays} days of work.`,
            },
            {
              icon: Sigma,
              value: formatCompact(totals.tokens),
              label: "Tokens",
              note: `${formatNumber(totals.tokens)} in total, in and out.`,
            },
            {
              icon: CalendarCheck,
              value: formatNumber(totals.activeDays),
              label: "Active days",
              note: `Out of ${totals.daysInRange} since the first session.`,
            },
            {
              icon: Flame,
              value: formatNumber(totals.longestStreakDays),
              label: "Longest streak",
              note: "Consecutive days with at least one session.",
            },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
            {meta.join(" · ")}
          </p>
        </Reveal>
      </section>

      {/* Models (and activity, once there's per-month data) */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="02 / Models" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {hasMonths && (
            <Reveal className="lg:col-span-7">
              <div className="h-full rounded-[var(--radius)] border border-border bg-surface p-6 md:p-8">
                <ActivityChart />
              </div>
            </Reveal>
          )}

          <Reveal
            delay={hasMonths ? 0.08 : 0}
            className={hasMonths ? "lg:col-span-5" : "lg:col-span-12"}
          >
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
            is why cache reads dwarf everything else. The tokens I actually
            typed are a rounding error next to them.
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
              Claude Code keeps a transcript of every session on my machine.
              These are the totals from those transcripts — sessions, active
              days, streaks and token usage per model. Numbers only: no prompts,
              no code, no file paths, no project names.
            </p>
            <p className="leading-relaxed">
              Sessions I ran on other machines or in the browser aren&apos;t in
              there, so if anything this undercounts.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              Last counted {formatDate(generatedAt.slice(0, 10))}
              {totals.lastUsed ? ` · Latest session ${formatDate(totals.lastUsed)}` : ""}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
