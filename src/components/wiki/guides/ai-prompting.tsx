import { Sparkles } from "lucide-react";
import type { Guide } from "../types";
import {
  C,
  Callout,
  Card,
  Code,
  Figure,
  Marker,
  Pipeline,
} from "../primitives";
import { cn } from "@/lib/utils";

const contextSegments = [
  { label: "Instructions", sub: "system prompt, project rules", width: 9, className: "bg-foreground/25" },
  { label: "Attached files & docs", sub: "code, errors, specs you pasted", width: 24, className: "bg-foreground/15" },
  { label: "Conversation so far", sub: "every earlier message and reply", width: 36, className: "bg-foreground/[0.07]" },
  { label: "Your latest message", sub: "what you’re asking right now", width: 11, className: "bg-accent" },
  { label: "Room for the answer", sub: "the reply has to fit too", width: 20, className: "border-2 border-dashed border-border bg-transparent" },
];

function ContextWindow() {
  return (
    <div>
      <div className="flex h-14 gap-1 overflow-hidden rounded-[8px]">
        {contextSegments.map((segment) => (
          <div
            key={segment.label}
            className={cn("h-full rounded-[4px]", segment.className)}
            style={{ width: `${segment.width}%` }}
          />
        ))}
      </div>
      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
        {contextSegments.map((segment) => (
          <li key={segment.label} className="flex gap-2.5">
            <span className={cn("mt-1 h-3 w-3 shrink-0 rounded-[3px]", segment.className)} />
            <span>
              <span className="block text-sm font-medium text-foreground">{segment.label}</span>
              <span className="block text-xs leading-snug text-foreground-muted">{segment.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const promptParts = [
  {
    part: "Context",
    text: "I’m building a Next.js 16 site with TypeScript and Tailwind. It’s a static export, so there’s no server at runtime.",
    why: "Who you are, what exists, what’s fixed. The model can’t see your project unless you tell it.",
  },
  {
    part: "Task",
    text: "Write a React component that lists blog posts, with a search box that filters them by title.",
    why: "One clear verb and deliverable. If you have two tasks, consider two prompts.",
  },
  {
    part: "Constraints",
    text: "No new dependencies. Filtering happens on the client, case-insensitive. It must work with the keyboard only.",
    why: "What “good” means for you — the things it would otherwise guess.",
  },
  {
    part: "Format",
    text: "Reply with one .tsx file, then a short list of anything I need to change elsewhere.",
    why: "Shape the answer so you can use it directly.",
  },
  {
    part: "Example",
    text: 'A post looks like: { slug: "hello", title: "Hello world", date: "2026-01-04" }',
    why: "One concrete sample removes a whole paragraph of ambiguity.",
  },
];

function PromptAnatomy() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-2 rounded-[8px] border border-border bg-background p-4">
        {promptParts.map((item, index) => (
          <p key={item.part} className="flex gap-3 rounded-[6px] bg-surface p-3 text-sm leading-relaxed text-foreground">
            <span className="mt-0.5">
              <Marker n={index + 1} />
            </span>
            <span>{item.text}</span>
          </p>
        ))}
      </div>
      <ol className="space-y-4">
        {promptParts.map((item, index) => (
          <li key={item.part} className="flex gap-3">
            <span className="mt-0.5">
              <Marker n={index + 1} />
            </span>
            <div>
              <p className="font-heading font-semibold text-foreground">{item.part}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground-muted">{item.why}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const beforeAfter = [
  {
    before: "make my code better",
    beforeResult: "Random renames, changed behaviour, a lecture on best practices.",
    after:
      "Refactor calculateTotal in cart.ts for readability. Keep the behaviour and the function signature exactly the same. Explain each change in one line.",
    afterResult: "A focused diff you can review in a minute.",
  },
  {
    before: "explain git rebase",
    beforeResult: "A generic essay pitched at nobody in particular.",
    after:
      "Explain git rebase to someone who already knows commit and merge. Use a 3-commit example and end with when NOT to use it.",
    afterResult: "Starts where you are, with an example and a warning.",
  },
];

const techniques = [
  { title: "Give it the real material", body: "Paste the full error, the file, the versions. Don’t describe code — show it." },
  { title: "Show one example", body: "An input and the output you want beats a paragraph of description." },
  { title: "Say what done looks like", body: "“Tests pass, no new dependencies, works on mobile.”" },
  { title: "Ask for a plan first", body: "“Outline the steps and wait for my OK before writing code.”" },
  { title: "Break big tasks down", body: "One component, one function, one step per message." },
  { title: "Let it ask questions", body: "“Ask me anything unclear before you start.”" },
  { title: "Specify the format", body: "A table, JSON, a single file, three bullet points." },
  { title: "Ask it to check itself", body: "“Review your answer for edge cases and bugs.”" },
];

function IterationLoop() {
  const nodes = [
    { x: 230, y: 50, label: "Ask" },
    { x: 380, y: 160, label: "Read" },
    { x: 230, y: 270, label: "Verify" },
    { x: 80, y: 160, label: "Refine" },
  ];
  return (
    <svg
      viewBox="0 0 460 320"
      className="mx-auto h-auto w-full max-w-[420px]"
      role="img"
      aria-label="A loop: ask, read the answer, verify it, refine your prompt, and ask again."
    >
      <defs>
        <marker id="ai-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>
      <path d="M292 56 Q372 66 382 132" fill="none" strokeWidth="2" markerEnd="url(#ai-arrow)" className="stroke-accent" />
      <path d="M382 188 Q372 256 294 266" fill="none" strokeWidth="2" markerEnd="url(#ai-arrow)" className="stroke-accent" />
      <path d="M168 266 Q88 256 78 188" fill="none" strokeWidth="2" markerEnd="url(#ai-arrow)" className="stroke-accent" />
      <path d="M78 132 Q88 66 166 56" fill="none" strokeWidth="2" markerEnd="url(#ai-arrow)" className="stroke-accent" />
      {nodes.map((node) => (
        <g key={node.label}>
          <rect x={node.x - 60} y={node.y - 22} width="120" height="44" rx="22" strokeWidth="1.5" className="fill-surface stroke-border" />
          <text x={node.x} y={node.y + 5} fontSize="15" textAnchor="middle" className="fill-foreground font-heading font-semibold">
            {node.label}
          </text>
        </g>
      ))}
      <text x="230" y="158" fontSize="12" textAnchor="middle" className="fill-foreground-subtle font-mono">
        until it’s
      </text>
      <text x="230" y="176" fontSize="12" textAnchor="middle" className="fill-foreground-subtle font-mono">
        right
      </text>
    </svg>
  );
}

export const promptingGuide: Guide = {
  slug: "ai-prompting",
  title: "AI Prompting",
  kicker: "Working with AI",
  summary:
    "How language models read your message, the five parts of a strong prompt, before-and-after rewrites, techniques that reliably help, and a workflow for coding with AI agents.",
  icon: Sparkles,
  sections: [
    {
      id: "how-models-read",
      label: "How models read",
      title: "The model only knows what’s in the window.",
      lead: "Every reply is built from one thing: the context window — everything sent so far in this conversation. It doesn’t see your screen, your repo or your last chat unless that text is in there.",
      content: (
        <>
          <Figure title="What the model sees on every turn" note="not to scale">
            <ContextWindow />
          </Figure>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card eyebrow="Great at" title="Drafting & explaining">
              First drafts, explanations at your level, boilerplate, refactors,
              translating code between languages.
            </Card>
            <Card eyebrow="Needs you for" title="What’s in your head">
              Project conventions, the real requirements, and what “done”
              means. It can’t guess those well.
            </Card>
            <Card eyebrow="Watch out for" title="Confident mistakes" accent>
              Invented APIs, outdated versions, subtle bugs, made-up sources.
              Fluent isn’t the same as correct.
            </Card>
          </div>
          <Callout title="New topic? New chat">
            Long conversations fill the window with old, half-relevant material.
            When you switch tasks, start fresh and paste in only what matters.
          </Callout>
        </>
      ),
    },
    {
      id: "anatomy",
      label: "Anatomy of a prompt",
      title: "Five parts of a prompt that lands the first time.",
      lead: "Not every prompt needs all five — a quick question needs none. The more the answer depends on details only you know, the more parts you’ll want.",
      content: (
        <Figure title="One prompt, taken apart">
          <PromptAnatomy />
        </Figure>
      ),
    },
    {
      id: "before-after",
      label: "Before & after",
      title: "Vague in, generic out.",
      lead: "The fix is almost never a magic phrase. It’s adding the specifics you already know but didn’t write down.",
      content: (
        <div className="space-y-6">
          {beforeAfter.map((pair) => (
            <div key={pair.before} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card eyebrow="Before" title={<span className="font-mono text-base font-normal">“{pair.before}”</span>}>
                <span className="text-foreground-subtle">→ {pair.beforeResult}</span>
              </Card>
              <Card eyebrow="After" title={<span className="text-base font-normal leading-relaxed">“{pair.after}”</span>} accent>
                → {pair.afterResult}
              </Card>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "techniques",
      label: "Techniques",
      title: "Eight moves that reliably improve answers.",
      content: (
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techniques.map((technique, index) => (
            <li key={technique.title} className="h-full rounded-[var(--radius)] border border-border bg-surface p-5">
              <p className="font-mono text-xs text-accent-hover">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-heading font-semibold text-foreground">{technique.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{technique.body}</p>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "the-loop",
      label: "The loop",
      title: "Prompting is a conversation, not a single shot.",
      lead: "The first answer is a draft. Read it, check it, then say precisely what to change — instead of starting over or repeating yourself louder.",
      content: (
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Figure title="Iterate">
            <IterationLoop />
          </Figure>
          <div className="space-y-6">
            <Card eyebrow="Weak follow-up" title={<span className="font-mono text-base font-normal">“that’s wrong, try again”</span>}>
              The model has to guess what was wrong — and often changes the parts
              that were right.
            </Card>
            <Card
              eyebrow="Strong follow-up"
              accent
              title={
                <span className="text-base font-normal leading-relaxed">
                  “The filter is case-sensitive — make it case-insensitive. Keep
                  everything else exactly as it is.”
                </span>
              }
            >
              Names the problem, the fix, and what must not change.
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "coding-agents",
      label: "Coding with agents",
      title: "With coding agents: explore, plan, build, verify.",
      lead: "Agents like Claude Code can read your repo, run commands and edit files. That power works best in a steady rhythm — and with you reviewing every step.",
      content: (
        <>
          <Figure title="A reliable agent workflow">
            <Pipeline
              nodes={[
                { title: "Explore", sub: "let it read the relevant code first" },
                { title: "Plan", sub: "agree on the approach before edits" },
                { title: "Build", sub: "small steps, one change at a time" },
                { title: "Verify", sub: "tests, lint, try it yourself", accent: true },
              ]}
              links={[{ forward: "read" }, { forward: "approve" }, { forward: "run" }]}
            />
          </Figure>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="leading-relaxed text-foreground-muted">
                Put the things you’d otherwise repeat in every prompt into a
                project instructions file — <C>CLAUDE.md</C> for Claude Code,{" "}
                <C>AGENTS.md</C> for many other tools. The agent reads it at the
                start of each session.
              </p>
              <Callout tone="warn" title="You’re still the engineer">
                Review every diff before it ships. Never paste passwords, API
                keys or customer data into a prompt. Run the tests — an agent
                saying “done” isn’t proof that it works.
              </Callout>
            </div>
            <Code
              title="CLAUDE.md"
              code={`
# Project notes for the agent

## Commands
npm run dev     # dev server on :3000
npm run lint    # must pass before committing

## Conventions
- TypeScript strict — no any
- Tailwind for styling; design tokens live in globals.css
- Never commit .env files
`}
            />
          </div>
        </>
      ),
    },
  ],
};
