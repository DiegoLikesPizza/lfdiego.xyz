import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Braces,
  Coffee,
  GitBranch,
  Github,
  Hexagon,
  LayoutPanelLeft,
  Sparkles,
} from "lucide-react";

/**
 * The wikis under /wiki/. Each one is its own instance of Diego's Wiki Engine,
 * started with --base-path <path> and proxied by nginx (see deploy/wiki/), so
 * every link into them is a plain <a>, never a client-side <Link>.
 */
export type Wiki = {
  /** Base path the engine instance runs under. */
  path: string;
  title: string;
  kicker: string;
  summary: string;
  pages: number;
  icon: LucideIcon;
};

export const wikis: Wiki[] = [
  {
    path: "/wiki/guides",
    title: "Developer guides",
    kicker: "Seven guides",
    summary:
      "Git, GitHub, Java, JavaScript, Kotlin, IDEs and AI prompting — from the mental model to the details, with diagrams and examples that were actually run.",
    pages: 0,
    icon: BookOpen,
  },
  {
    path: "/wiki/java27",
    title: "Java 27",
    kicker: "Release wiki",
    summary:
      "All nine JEPs of Java 27, a full language and library reference, garbage collectors measured side by side, the AOT cache, JFR and an upgrade guide.",
    pages: 66,
    icon: Coffee,
  },
  {
    path: "/wiki/kotlin",
    title: "Kotlin",
    kicker: "Language wiki",
    summary:
      "Basics, classes, coroutines, Flow and channels, idioms and testing, plus Ktor, Spring Boot and Exposed as real Gradle projects — up to Kotlin 2.4.20.",
    pages: 74,
    icon: Hexagon,
  },
];

export type GuideTopic = {
  /** Top-level page in the guides wiki: /wiki/guides/wiki/<slug>. */
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  icon: LucideIcon;
};

export const guideTopics: GuideTopic[] = [
  {
    slug: "git",
    title: "Git",
    kicker: "Version control",
    summary:
      "How Git stores your work, the daily loop, branches, merge vs rebase, conflicts, remotes, searching history, undoing and rewriting commits.",
    icon: GitBranch,
  },
  {
    slug: "github",
    title: "GitHub",
    kicker: "Collaboration",
    summary:
      "SSH keys and tokens, forks, pull requests and code review, Issues and Projects, branch rules, GitHub Actions, releases, Pages and security.",
    icon: Github,
  },
  {
    slug: "java",
    title: "Java",
    kicker: "Language",
    summary:
      "From source file to running program on the JVM: types and memory, OOP, exceptions, generics, collections, streams, concurrency, GC, builds and tests.",
    icon: Coffee,
  },
  {
    slug: "javascript",
    title: "JavaScript",
    kicker: "Language",
    summary:
      "Types and equality, closures and this, prototypes, array methods, the event loop step by step, promises, HTTP, the DOM, npm and TypeScript.",
    icon: Braces,
  },
  {
    slug: "kotlin",
    title: "Kotlin",
    kicker: "Language",
    summary:
      "A learning path for Java developers: null safety, classes, collections, scope functions, idioms, coroutines, structured concurrency and Flow.",
    icon: Hexagon,
  },
  {
    slug: "ides",
    title: "IDEs",
    kicker: "Tools",
    summary:
      "IntelliJ IDEA and VS Code: the window, navigation, editing, refactoring, debugging, Git, tests, project setup, extensions and AI assistants.",
    icon: LayoutPanelLeft,
  },
  {
    slug: "ai-prompting",
    title: "AI Prompting",
    kicker: "Working with AI",
    summary:
      "Tokens and context windows, the anatomy of a strong prompt, techniques, structured output, prompting for code, hallucinations and coding agents.",
    icon: Sparkles,
  },
];

export function guideHref(slug: string) {
  return `/wiki/guides/wiki/${slug}`;
}
