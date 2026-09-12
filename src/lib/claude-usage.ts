import data from "@/data/claude-usage.json";

export interface ClaudeModelUsage {
  name: string;
  /** Share of all tokens, in percent, as reported. */
  share: number;
  tokens: number;
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
}

export interface ClaudeUsage {
  /** When these numbers were last counted. */
  generatedAt: string;
  totals: {
    sessions: number;
    /** input + output + cache read + cache write. */
    tokens: number;
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    activeDays: number;
    /** Days between the first and the last session, inclusive. */
    daysInRange: number;
    longestStreakDays: number;
    currentStreakDays: number;
    longestSessionMinutes: number;
    mostActiveDay: string | null;
    lastUsed: string | null;
  };
  models: ClaudeModelUsage[];
  /** Optional — only present once a run has per-month data to show. */
  months?: { month: string; tokens: number; sessions: number }[];
}

export const claudeUsage = data as ClaudeUsage;

/** 1234 → "1,234" — stable between server and client (no locale guessing). */
export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

/**
 * 8066523100 → "8.0B" — for numbers too big to read digit by digit. Rounds
 * down, so a running total never reads higher than it is.
 */
export function formatCompact(value: number) {
  const down = (scaled: number) => (Math.floor(scaled * 10) / 10).toFixed(1);
  if (value >= 1_000_000_000) return `${down(value / 1_000_000_000)}B`;
  if (value >= 1_000_000) return `${down(value / 1_000_000)}M`;
  if (value >= 10_000) return `${Math.round(value / 1000)}K`;
  if (value >= 1_000) return `${(value / 1000).toFixed(1)}K`;
  return formatNumber(value);
}

/** 30740 → "21d 8h" — the long ones are what's interesting. */
export function formatDuration(minutes: number) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
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
