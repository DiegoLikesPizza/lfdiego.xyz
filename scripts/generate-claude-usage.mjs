#!/usr/bin/env node
/**
 * Generates src/data/claude-usage.json from the local Claude Code transcripts
 * in ~/.claude/projects (override with CLAUDE_CONFIG_DIR).
 *
 * Only counts leave this machine: sessions, messages, tokens and models. No
 * prompt text, no file paths, no project or repository names are read out of
 * the transcripts, and none end up in the JSON.
 *
 * Run `npm run stats` wherever you actually use Claude Code, then commit the
 * regenerated JSON.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/claude-usage.json");
const CLAUDE_DIR = process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude");

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
    else if (entry.name.endsWith(".jsonl")) found.push(path);
  }
  return found;
}

const files = findTranscripts(join(CLAUDE_DIR, "projects"));
if (files.length === 0) {
  console.error(`No transcripts found under ${join(CLAUDE_DIR, "projects")}.`);
  console.error("Run this on the machine where you use Claude Code, or set CLAUDE_CONFIG_DIR.");
  process.exit(1);
}

const sessions = new Set();
const days = new Set();
const models = new Map(); // model -> { messages, tokens }
const months = new Map(); // YYYY-MM -> { month, tokens, sessions:Set }
// Assistant messages can appear more than once (resumed or compacted sessions),
// so every message is counted at most once.
const seen = new Set();

const tokens = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0, thinking: 0 };
let assistantMessages = 0;
let prompts = 0;
let toolCalls = 0;
let first = null;
let last = null;

function bucket(map, key, init) {
  if (!map.has(key)) map.set(key, init(key));
  return map.get(key);
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
    if (stamp) {
      if (!first || stamp < first) first = stamp;
      if (!last || stamp > last) last = stamp;
      days.add(stamp.slice(0, 10));
    }
    if (entry.sessionId) sessions.add(entry.sessionId);

    // A typed prompt: a user turn whose content is plain text (tool results
    // arrive as arrays) and that isn't a background sub-agent's turn.
    if (entry.type === "user" && !entry.isSidechain && typeof entry.message?.content === "string") {
      prompts += 1;
    }

    if (entry.type !== "assistant") continue;
    const usage = entry.message?.usage;
    if (!usage) continue;

    const id = `${entry.message?.id ?? entry.uuid}:${entry.requestId ?? ""}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const input = usage.input_tokens ?? 0;
    const output = usage.output_tokens ?? 0;
    const cacheWrite = usage.cache_creation_input_tokens ?? 0;
    const cacheRead = usage.cache_read_input_tokens ?? 0;
    const total = input + output + cacheWrite + cacheRead;

    tokens.input += input;
    tokens.output += output;
    tokens.cacheWrite += cacheWrite;
    tokens.cacheRead += cacheRead;
    tokens.thinking += usage.output_tokens_details?.thinking_tokens ?? 0;
    assistantMessages += 1;

    if (Array.isArray(entry.message?.content)) {
      toolCalls += entry.message.content.filter((block) => block.type === "tool_use").length;
    }

    const model = entry.message?.model;
    if (model && model !== "<synthetic>") {
      const row = bucket(models, model, () => ({ model, messages: 0, tokens: 0 }));
      row.messages += 1;
      row.tokens += total;
    }

    if (stamp) {
      const row = bucket(months, stamp.slice(0, 7), (month) => ({
        month,
        tokens: 0,
        sessions: new Set(),
      }));
      row.tokens += total;
      if (entry.sessionId) row.sessions.add(entry.sessionId);
    }
  }
}

/** "claude-opus-5" → "Opus 5"; "claude-haiku-4-5-20251001" → "Haiku 4.5". */
function prettyModel(id) {
  const match = id.match(/(opus|sonnet|haiku|fable)-(\d+)(?:-(\d+))?/i);
  if (!match) return id;
  const [, family, major, minor] = match;
  const name = family[0].toUpperCase() + family.slice(1).toLowerCase();
  return `${name} ${minor ? `${major}.${minor}` : major}`;
}

// Fold the model ids into their display names (a model can ship under several
// dated ids) and keep the biggest first.
const byName = new Map();
for (const row of models.values()) {
  const name = prettyModel(row.model);
  const entry = bucket(byName, name, () => ({ name, messages: 0, tokens: 0 }));
  entry.messages += row.messages;
  entry.tokens += row.tokens;
}

const totalTokens = tokens.input + tokens.output + tokens.cacheWrite + tokens.cacheRead;

const usage = {
  generatedAt: new Date().toISOString(),
  totals: {
    sessions: sessions.size,
    prompts,
    assistantMessages,
    toolCalls,
    daysActive: days.size,
    tokens: totalTokens,
    ...tokens,
    firstUsed: first ? first.slice(0, 10) : null,
    lastUsed: last ? last.slice(0, 10) : null,
  },
  models: [...byName.values()].sort((a, b) => b.tokens - a.tokens),
  months: [...months.values()]
    .map(({ month, tokens: monthTokens, sessions: monthSessions }) => ({
      month,
      tokens: monthTokens,
      sessions: monthSessions.size,
    }))
    .sort((a, b) => a.month.localeCompare(b.month)),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(usage, null, 2)}\n`);

const scanned = files.reduce((sum, file) => {
  try {
    return sum + statSync(file).size;
  } catch {
    return sum;
  }
}, 0);
console.log(
  `Wrote ${OUT} — ${usage.totals.sessions} sessions, ${usage.totals.tokens.toLocaleString("en-US")} tokens ` +
    `from ${files.length} transcripts (${(scanned / 1024 / 1024).toFixed(1)} MB scanned).`,
);
