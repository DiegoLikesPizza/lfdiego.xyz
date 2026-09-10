import data from "@/data/claude-usage.json";

export interface ClaudeUsage {
  /** ISO timestamp of the last `npm run stats` run. */
  generatedAt: string;
  totals: {
    sessions: number;
    /** Prompts I typed (tool results and sub-agent turns don't count). */
    prompts: number;
    assistantMessages: number;
    toolCalls: number;
    daysActive: number;
    /** input + output + cache write + cache read. */
    tokens: number;
    input: number;
    output: number;
    cacheWrite: number;
    cacheRead: number;
    thinking: number;
    firstUsed: string | null;
    lastUsed: string | null;
  };
  models: { name: string; messages: number; tokens: number }[];
  months: { month: string; tokens: number; sessions: number }[];
}

export const claudeUsage = data as ClaudeUsage;

/** 1234 → "1,234" — stable between server and client (no locale guessing). */
export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

/** 13608425 → "13.6M" — for numbers too big to read digit by digit. */
export function formatCompact(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `${Math.round(value / 1000)}K`;
  if (value >= 1_000) return `${(value / 1000).toFixed(1)}K`;
  return formatNumber(value);
}

/** "2026-09" → "Sep 2026"; "2026-09-09" → "9 Sep 2026". */
export function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  const name = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ][Number(month) - 1];
  return day ? `${Number(day)} ${name} ${year}` : `${name} ${year}`;
}
