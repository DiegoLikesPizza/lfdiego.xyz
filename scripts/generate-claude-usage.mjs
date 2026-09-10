#!/usr/bin/env node
/**
 * Generates src/data/claude-usage.json from the local Claude Code transcripts
 * in ~/.claude/projects (override with CLAUDE_CONFIG_DIR).
 *
 * Only counts leave this machine: sessions, active days, streaks and token
 * usage per model. No prompt text, no code, no file paths, no project or
 * repository names are read out of the transcripts, and none end up in the
 * JSON.
 *
 * Run `npm run stats` wherever you actually use Claude Code, then commit the
 * regenerated JSON.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/claude-usage.json");
const CLAUDE_DIR = process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude");
const DAY = 86_400_000;

/**
 * Claude Code writes transcripts under two roots, not one.
 *
 * ~/.claude/projects holds ordinary CLI and desktop sessions. Agent-mode
 * sessions live under the desktop app's own data directory instead, each with a
 * nested .claude/projects of its own — scanning only the first root silently
 * dropped fifteen sessions here.
 *
 * audit.jsonl sits alongside them and is a different shape, so it is skipped by
 * name rather than parsed and ignored.
 */
const ROOTS = [
  join(CLAUDE_DIR, "projects"),
  join(homedir(), "AppData", "Roaming", "Claude", "local-agent-mode-sessions"),
  join(homedir(), "Library", "Application Support", "Claude", "local-agent-mode-sessions"),
  join(homedir(), ".config", "Claude", "local-agent-mode-sessions"),
];

function findTranscripts(dir) {
  let found = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found = found.concat(findTranscripts(path));
    else if (entry.name.endsWith(".jsonl") && entry.name !== "audit.jsonl") found.push(path);
  }
  return found;
}

// A message can appear in more than one root once a session has been resumed,
// so the id-level dedupe below is what keeps the total honest.
const files = ROOTS.flatMap((root) => findTranscripts(root));
if (files.length === 0) {
  console.error("No transcripts found under any of:");
  for (const root of ROOTS) console.error(`  ${root}`);
  console.error("Run this on the machine where you use Claude Code, or set CLAUDE_CONFIG_DIR.");
  process.exit(1);
}

const sessions = new Map(); // sessionId -> { first, last }
const dayTokens = new Map(); // YYYY-MM-DD -> tokens
const models = new Map(); // display name -> token counters
const months = new Map(); // YYYY-MM -> { tokens, sessions:Set }
// Assistant messages can appear more than once (resumed or compacted
// sessions), so every message is counted at most once.
const seen = new Set();

const totals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };

function bucket(map, key, init) {
  if (!map.has(key)) map.set(key, init(key));
  return map.get(key);
}

/** "claude-opus-5" → "Opus 5"; "claude-haiku-4-5-20251001" → "Haiku 4.5". */
function prettyModel(id) {
  const match = id.match(/(opus|sonnet|haiku|fable)-(\d+)(?:-(\d+))?/i);
  if (!match) return id;
  const [, family, major, minor] = match;
  const name = family[0].toUpperCase() + family.slice(1).toLowerCase();
  return `${name} ${minor ? `${major}.${minor}` : major}`;
}

for (const file of files) {
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }

    const stamp = entry.timestamp;
    if (stamp && entry.sessionId) {
      const span = bucket(sessions, entry.sessionId, () => ({ first: stamp, last: stamp }));
      if (stamp < span.first) span.first = stamp;
      if (stamp > span.last) span.last = stamp;
    }

    if (entry.type !== "assistant") continue;
    const usage = entry.message?.usage;
    if (!usage) continue;

    const id = `${entry.message?.id ?? entry.uuid}:${entry.requestId ?? ""}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const counts = {
      input: usage.input_tokens ?? 0,
      output: usage.output_tokens ?? 0,
      cacheWrite: usage.cache_creation_input_tokens ?? 0,
      cacheRead: usage.cache_read_input_tokens ?? 0,
    };
    const tokens = counts.input + counts.output + counts.cacheWrite + counts.cacheRead;
    for (const key of Object.keys(totals)) totals[key] += counts[key];

    const model = entry.message?.model;
    if (model && model !== "<synthetic>") {
      const row = bucket(models, prettyModel(model), () => ({
        name: prettyModel(model),
        tokens: 0,
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
      }));
      row.tokens += tokens;
      for (const key of Object.keys(counts)) row[key] += counts[key];
    }

    if (stamp) {
      const day = stamp.slice(0, 10);
      dayTokens.set(day, (dayTokens.get(day) ?? 0) + tokens);

      const month = bucket(months, stamp.slice(0, 7), () => ({ tokens: 0, sessions: new Set() }));
      month.tokens += tokens;
      if (entry.sessionId) month.sessions.add(entry.sessionId);
    }
  }
}

const activeDays = [...dayTokens.keys()].sort();
const totalTokens = totals.input + totals.output + totals.cacheWrite + totals.cacheRead;

// Longest run of consecutive active days, and the run still going today.
let longestStreak = 0;
let run = 0;
let previous = null;
for (const day of activeDays) {
  const time = Date.parse(day);
  run = previous !== null && time - previous === DAY ? run + 1 : 1;
  longestStreak = Math.max(longestStreak, run);
  previous = time;
}
const today = new Date().toISOString().slice(0, 10);
const lastDay = activeDays.at(-1);
const gap = lastDay ? (Date.parse(today) - Date.parse(lastDay)) / DAY : Infinity;
const currentStreak = gap <= 1 ? run : 0;

const mostActiveDay =
  activeDays.length > 0
    ? activeDays.reduce((best, day) => (dayTokens.get(day) > dayTokens.get(best) ? day : best))
    : null;

const spans = [...sessions.values()];
const longestSessionMinutes = spans.reduce(
  (longest, span) => Math.max(longest, Math.round((Date.parse(span.last) - Date.parse(span.first)) / 60000)),
  0,
);

const daysInRange =
  activeDays.length > 0
    ? Math.round((Date.parse(activeDays.at(-1)) - Date.parse(activeDays[0])) / DAY) + 1
    : 0;

const usage = {
  generatedAt: new Date().toISOString(),
  totals: {
    sessions: sessions.size,
    tokens: totalTokens,
    ...totals,
    activeDays: activeDays.length,
    daysInRange,
    longestStreakDays: longestStreak,
    currentStreakDays: currentStreak,
    longestSessionMinutes,
    mostActiveDay,
    lastUsed: lastDay ?? null,
  },
  models: [...models.values()]
    .sort((a, b) => b.tokens - a.tokens)
    .map((model) => ({
      ...model,
      share: Number(((model.tokens / (totalTokens || 1)) * 100).toFixed(1)),
    })),
  months: [...months.entries()]
    .map(([month, row]) => ({ month, tokens: row.tokens, sessions: row.sessions.size }))
    .sort((a, b) => a.month.localeCompare(b.month)),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(usage, null, 2)}\n`);
console.log(
  `Wrote ${OUT} — ${usage.totals.sessions} sessions, ` +
    `${usage.totals.tokens.toLocaleString("en-US")} tokens from ${files.length} transcripts.`,
);
