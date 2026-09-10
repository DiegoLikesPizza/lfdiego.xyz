#!/usr/bin/env node
/**
 * Generates src/data/claude-stats.json from this repository's git history.
 *
 * Every commit Claude helped with carries a `Co-Authored-By: Claude <model>`
 * trailer, so the history itself is the source of truth — no hand-kept
 * numbers, no API. Run `npm run stats` after pulling new commits.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/claude-stats.json");

// Unit separators keep commit bodies (which contain newlines) parseable.
const REC = "\x1e";
const FIELD = "\x1f";

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function readCommits() {
  const raw = git([
    "log",
    "--no-merges",
    `--format=${REC}%H${FIELD}%ad${FIELD}%s${FIELD}%b${FIELD}`,
    "--numstat",
    "--date=short",
  ]);

  return raw
    .split(REC)
    .slice(1)
    .map((chunk) => {
      const [hash, date, subject, body, rest = ""] = chunk.split(FIELD);
      const files = rest
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [added, removed, file] = line.split("\t");
          return {
            file,
            // "-" marks a binary file; count it as touched, but not as lines.
            added: added === "-" ? 0 : Number(added),
            removed: removed === "-" ? 0 : Number(removed),
          };
        })
        .filter((entry) => entry.file);

      const model = body.match(/Co-Authored-By:\s*Claude([^<\n]*)</i)?.[1]?.trim();

      return {
        hash: hash.slice(0, 7),
        date,
        subject,
        model: model ? `Claude ${model}` : null,
        files,
        added: files.reduce((sum, f) => sum + f.added, 0),
        removed: files.reduce((sum, f) => sum + f.removed, 0),
      };
    });
}

function tally(map, key, amount = 1) {
  map.set(key, (map.get(key) ?? 0) + amount);
}

const commits = readCommits();
const claude = commits.filter((c) => c.model);

const models = new Map();
const files = new Map();
const months = new Map();

for (const commit of commits) {
  const month = commit.date.slice(0, 7);
  if (!months.has(month)) months.set(month, { month, claude: 0, solo: 0 });
  months.get(month)[commit.model ? "claude" : "solo"] += 1;
}

for (const commit of claude) {
  tally(models, commit.model);
  for (const { file } of commit.files) tally(files, file);
}

const sum = (list, key) => list.reduce((total, item) => total + item[key], 0);

const stats = {
  generatedAt: new Date().toISOString(),
  repo: "DiegoLikesPizza/lfdiego.xyz",
  totals: {
    commits: commits.length,
    claudeCommits: claude.length,
    // Share of commits Claude co-authored, in percent.
    claudeShare: commits.length ? Math.round((claude.length / commits.length) * 100) : 0,
    linesAdded: sum(claude, "added"),
    linesRemoved: sum(claude, "removed"),
    filesTouched: files.size,
    firstCommit: claude.at(-1)?.date ?? null,
    latestCommit: claude[0]?.date ?? null,
  },
  models: [...models.entries()]
    .map(([name, commits]) => ({ name, commits }))
    .sort((a, b) => b.commits - a.commits),
  // Oldest → newest, so the chart reads left to right.
  months: [...months.values()].sort((a, b) => a.month.localeCompare(b.month)),
  topFiles: [...files.entries()]
    .map(([file, commits]) => ({ file, commits }))
    .sort((a, b) => b.commits - a.commits || a.file.localeCompare(b.file))
    .slice(0, 8),
  recent: claude.slice(0, 8).map(({ hash, date, subject, model, added, removed }) => ({
    hash,
    date,
    subject,
    model,
    added,
    removed,
  })),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(stats, null, 2)}\n`);
console.log(`Wrote ${OUT} — ${stats.totals.claudeCommits}/${stats.totals.commits} commits co-authored by Claude.`);
