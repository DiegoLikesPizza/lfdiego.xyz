import data from "@/data/claude-stats.json";

export interface ClaudeStats {
  /** ISO timestamp of the last `npm run stats` run. */
  generatedAt: string;
  repo: string;
  totals: {
    commits: number;
    claudeCommits: number;
    /** Share of all commits Claude co-authored, in percent. */
    claudeShare: number;
    linesAdded: number;
    linesRemoved: number;
    filesTouched: number;
    firstCommit: string | null;
    latestCommit: string | null;
  };
  models: { name: string; commits: number }[];
  months: { month: string; claude: number; solo: number }[];
  topFiles: { file: string; commits: number }[];
  recent: {
    hash: string;
    date: string;
    subject: string;
    model: string | null;
    added: number;
    removed: number;
  }[];
}

export const claudeStats = data as ClaudeStats;

/** 1234 → "1,234" — stable between server and client (no locale guessing). */
export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
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
