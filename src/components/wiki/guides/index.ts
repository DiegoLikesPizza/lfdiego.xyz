import type { Guide, GuideSection } from "../types";
import { gitGuide } from "./git";
import { gitDeepSections } from "./git-deep";
import { githubGuide } from "./github";
import { githubDeepSections } from "./github-deep";
import { javaGuide } from "./java";
import { javaDeepSections } from "./java-deep";
import { javascriptGuide } from "./javascript";
import { javascriptDeepSections } from "./javascript-deep";
import { kotlinGuide } from "./kotlin";
import { kotlinDeepSections } from "./kotlin-deep";
import { ideGuide } from "./ides";
import { ideDeepSections } from "./ides-deep";
import { promptingGuide } from "./ai-prompting";
import { promptingDeepSections } from "./ai-prompting-deep";

/**
 * Merges a guide's core sections with its in-depth ones, in reading order.
 * Throws at build time if an id is unknown, duplicated or left out, so a
 * section can never silently go missing.
 */
function compose(
  guide: Guide,
  extra: GuideSection[],
  order: string[],
  summary: string,
): Guide {
  const all = [...guide.sections, ...extra];
  const byId = new Map(all.map((section) => [section.id, section]));
  if (byId.size !== all.length) {
    throw new Error(`Duplicate section id in guide "${guide.slug}"`);
  }
  if (new Set(order).size !== order.length || order.length !== all.length) {
    throw new Error(`Section order for "${guide.slug}" must list every section exactly once`);
  }
  return {
    ...guide,
    summary,
    sections: order.map((id) => {
      const section = byId.get(id);
      if (!section) throw new Error(`Unknown section "${id}" in guide "${guide.slug}"`);
      return section;
    }),
  };
}

/** Every guide, in reading order. The order drives numbering and prev/next. */
export const guides: Guide[] = [
  compose(
    gitGuide,
    gitDeepSections,
    [
      "mental-model",
      "daily-loop",
      "under-the-hood",
      "branches",
      "merge-vs-rebase",
      "conflicts",
      "remotes",
      "history",
      "undo",
      "rewriting-history",
      "stash-cherry-pick",
      "good-commits",
      "strategies-tags",
      "config",
      "glossary",
    ],
    "From the mental model to the object database: daily commands, branches, merge vs rebase, conflicts, remotes, searching history and bisect, undoing and rewriting commits, stash, cherry-pick, worktrees, branching strategies and config.",
  ),
  compose(
    githubGuide,
    githubDeepSections,
    [
      "git-vs-github",
      "authentication",
      "fork-clone",
      "pull-requests",
      "code-review",
      "issues-projects",
      "protecting-main",
      "actions",
      "actions-in-depth",
      "releases-pages",
      "security",
      "repo-essentials",
      "gh-cli",
      "open-source",
      "glossary",
    ],
    "Everything around the code: SSH and tokens, forks, pull requests and code review, Issues and Projects, branch rules, GitHub Actions from first workflow to matrices and deploy environments, releases, Pages, security features, the gh CLI and contributing to open source.",
  ),
  compose(
    javaGuide,
    javaDeepSections,
    [
      "how-it-runs",
      "syntax",
      "class-anatomy",
      "types-memory",
      "strings",
      "oop",
      "exceptions",
      "generics",
      "collections",
      "lambdas-streams",
      "modern-java",
      "concurrency",
      "garbage-collection",
      "build-tools",
      "testing",
      "glossary",
    ],
    "How Java runs on the JVM, syntax and access modifiers, memory and strings, OOP, exceptions, generics, collections, lazy streams, what changed from Java 8 to 25, threads and virtual threads, garbage collection, build tools and JUnit.",
  ),
  compose(
    javascriptGuide,
    javascriptDeepSections,
    [
      "where-it-runs",
      "variables-types",
      "functions-closures",
      "objects-prototypes",
      "array-methods",
      "event-loop",
      "promises",
      "fetch-http",
      "dom-events",
      "errors-devtools",
      "modules",
      "tooling",
      "typescript",
      "glossary",
    ],
    "The language and its runtime: types and equality, closures and this, prototypes, array methods, an interactive event loop, promises, HTTP and status codes, the DOM and events, DevTools, npm and bundlers, and TypeScript.",
  ),
  compose(
    kotlinGuide,
    kotlinDeepSections,
    [
      "what-is-kotlin",
      "java-vs-kotlin",
      "functions",
      "expressions",
      "null-safety",
      "classes",
      "collections",
      "collection-operations",
      "scope-functions",
      "idioms",
      "coroutines",
      "structured-concurrency",
      "flow",
      "interop",
      "glossary",
    ],
    "Kotlin from first function to Flow: extensions and lambdas, expressions and ranges, null safety, every kind of class, sealed types, collection operations and sequences, scope functions, idioms, coroutines, structured concurrency, Java interop and Gradle.",
  ),
  compose(
    ideGuide,
    ideDeepSections,
    [
      "what-it-does",
      "anatomy",
      "shortcuts",
      "navigation",
      "editing",
      "refactoring",
      "debugging",
      "debugging-deep",
      "git-in-ide",
      "testing",
      "setup",
      "extensions",
      "ai-in-ide",
      "troubleshooting",
      "glossary",
    ],
    "Get fluent in IntelliJ IDEA and VS Code: a labelled window, navigation, multi-cursor editing, refactorings, debugging from breakpoints to remote JVMs, Git and merge tools, test runners, shared project config, AI assistants and fixing a misbehaving IDE.",
  ),
  compose(
    promptingGuide,
    promptingDeepSections,
    [
      "how-models-read",
      "tokens",
      "anatomy",
      "before-after",
      "techniques",
      "system-prompts",
      "structured-output",
      "reasoning",
      "the-loop",
      "prompting-for-code",
      "hallucinations",
      "coding-agents",
      "how-agents-work",
      "privacy",
      "prompt-library",
      "glossary",
    ],
    "How models read (tokens and context windows), the anatomy of a strong prompt, system prompts, structured output, reasoning, coding templates, spotting hallucinations, how coding agents work, privacy, and a library of copy-paste prompts.",
  ),
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
