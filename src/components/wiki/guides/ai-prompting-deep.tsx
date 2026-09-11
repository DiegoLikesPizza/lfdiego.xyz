import type { GuideSection } from "../types";
import {
  C,
  Callout,
  Card,
  Code,
  DataTable,
  DoDont,
  Figure,
  Glossary,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

const tokens = ["Un", "believ", "ably", ",", " token", "ization", " isn", "’t", " magic", "."];

function TokenChips() {
  return (
    <div>
      <p className="text-sm text-foreground-muted">“Unbelievably, tokenization isn’t magic.”</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {tokens.map((t, i) => (
          <span
            key={i}
            className={cn(
              "whitespace-pre rounded-[4px] border px-1.5 py-1 font-mono text-sm",
              i % 2 === 0 ? "border-accent/50 bg-accent-soft text-foreground" : "border-border bg-background text-foreground",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-xs text-foreground-subtle">
        10 tokens · illustrative — every model splits text a little differently
      </p>
    </div>
  );
}

function SystemLayers() {
  const layers = [
    { title: "System prompt", sub: "Set by the app or developer. Persona, rules, format — applies to the whole conversation.", accent: true },
    { title: "Project / custom instructions", sub: "Your standing preferences, or files like CLAUDE.md loaded at the start." },
    { title: "Conversation history", sub: "Every earlier message and reply, re-read each turn." },
    { title: "Your latest message", sub: "The actual question right now." },
  ];
  return (
    <ol className="space-y-2">
      {layers.map((layer, i) => (
        <li
          key={layer.title}
          style={{ marginLeft: `${i * 16}px` }}
          className={cn("rounded-[8px] border p-4", layer.accent ? "border-accent/50 bg-accent-soft" : "border-border bg-background")}
        >
          <p className="font-heading font-semibold text-foreground">{layer.title}</p>
          <p className="mt-1 text-sm text-foreground-muted">{layer.sub}</p>
        </li>
      ))}
    </ol>
  );
}

function ThinkVisual() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-[8px] border border-border bg-background p-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">Answer immediately</p>
        <p className="mt-3 text-sm text-foreground">Q: Pens cost €2 for 3. How much are 12 pens?</p>
        <p className="mt-2 rounded-[6px] border border-dashed border-border px-3 py-2 font-mono text-sm text-foreground-muted">A: €6 ✗</p>
        <p className="mt-2 text-xs text-foreground-muted">A plausible-looking number, produced in one jump.</p>
      </div>
      <div className="rounded-[8px] border border-accent/50 bg-accent-soft p-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent-hover">Think, then answer</p>
        <p className="mt-3 text-sm text-foreground">Q: Pens cost €2 for 3. How much are 12 pens?</p>
        <ol className="mt-2 space-y-1 font-mono text-sm text-foreground-muted">
          <li>1 · 12 ÷ 3 = 4 packs</li>
          <li>2 · 4 × €2 = €8</li>
        </ol>
        <p className="mt-2 rounded-[6px] border border-accent/50 bg-surface px-3 py-2 font-mono text-sm text-foreground">A: €8 ✓</p>
      </div>
    </div>
  );
}

function AgentLoop() {
  const box = (x: number, y: number, w: number, h: number, title: string, sub: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" strokeWidth="1.5" className={accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"} />
      <text x={x + w / 2} y={y + h / 2 - 3} fontSize="13" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 14} fontSize="10" textAnchor="middle" className="fill-foreground-muted font-mono">
        {sub}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 280"
      className="h-auto w-full"
      role="img"
      aria-label="The agent loop: you give a goal. The model decides the next step and calls a tool, like reading a file, running tests or editing code. The tool's result goes back to the model, which decides again. When the goal is met, it gives a final answer."
    >
      <defs>
        <marker id="ai-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
        <marker id="ai-loop-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>
      {box(10, 105, 130, 60, "Your goal", "“fix the failing test”")}
      {box(200, 105, 170, 60, "Model", "decides the next step", true)}
      {box(440, 20, 190, 60, "Tool call", "read · search · run · edit")}
      {box(440, 190, 190, 60, "Result", "file contents · test output")}
      {box(200, 215, 170, 50, "Final answer", "summary + what changed")}

      <path d="M140 135 H194" strokeWidth="1.5" markerEnd="url(#ai-loop-muted)" className="stroke-foreground-subtle" />
      <path d="M370 120 C410 120 400 50 434 50" fill="none" strokeWidth="2" markerEnd="url(#ai-loop-arrow)" className="stroke-accent" />
      <path d="M535 80 V184" strokeWidth="2" markerEnd="url(#ai-loop-arrow)" className="stroke-accent" />
      <path d="M440 220 C400 220 410 150 376 150" fill="none" strokeWidth="2" markerEnd="url(#ai-loop-arrow)" className="stroke-accent" />
      <path d="M285 165 V209" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ai-loop-muted)" className="stroke-foreground-subtle" />
      <text x="292" y="192" fontSize="10" className="fill-foreground-subtle font-mono">
        when done
      </text>
      <text x="552" y="138" fontSize="10" className="fill-accent-hover font-mono">
        repeat
      </text>
    </svg>
  );
}

const checklist = [
  { title: "Run it", body: "Code: compile it, run the tests, try the edge cases yourself." },
  { title: "Check the source", body: "APIs and flags: open the official docs for your exact version." },
  { title: "Ask where it came from", body: "Request sources — then open them. Invented citations are common." },
  { title: "Cross-check numbers", body: "Recalculate figures and dates; ask it to show the working." },
  { title: "Watch for recency", body: "Models have a knowledge cutoff; recent releases and events may be missing or wrong." },
  { title: "Get a second opinion", body: "Ask it to critique its own answer, or ask a colleague for anything important." },
];

export const promptingDeepSections: GuideSection[] = [
  {
    id: "tokens",
    label: "Tokens & limits",
    title: "Models read tokens, not words.",
    lead: "Text is split into tokens — whole words, pieces of words, punctuation. Context windows, output limits and API prices are all measured in tokens.",
    content: (
      <>
        <Figure title="A sentence, tokenised">
          <TokenChips />
        </Figure>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card eyebrow="Rule of thumb" title="≈ 4 characters per token">
            In English, 100 tokens is roughly 75 words. Code, numbers and many
            other languages use more tokens for the same length.
          </Card>
          <Card eyebrow="Two limits" title="Context vs output">
            The context window caps everything the model can see at once. A
            separate, smaller limit caps how long a single reply can be.
          </Card>
          <Card eyebrow="Randomness" title="Temperature" accent>
            An API setting: low values give focused, repeatable answers; high
            values give more varied ones. Chat apps choose it for you.
          </Card>
        </div>
        <Callout title="Why long chats get worse">
          Every turn re-sends the whole conversation. As it grows, costs rise,
          replies slow down, and important early details compete with
          everything since. Some tools summarise (“compact”) old context
          automatically — which also loses detail.
        </Callout>
      </>
    ),
  },
  {
    id: "system-prompts",
    label: "System prompts",
    title: "Standing instructions sit above the conversation.",
    lead: "A system prompt shapes every reply: role, rules, tone, format. In chat apps you control a version of it through custom or project instructions.",
    content: (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Figure title="Layers the model reads, top to bottom">
          <SystemLayers />
        </Figure>
        <Code
          title="An example system prompt"
          code={`
You are a senior code reviewer for a TypeScript + React codebase.

Rules:
- Review only the diff you are given. Do not rewrite unrelated code.
- Rank findings: bugs first, then security, then readability.
- For each finding, quote the line, explain the problem in one
  sentence, and propose a fix.
- If the diff looks fine, say so in one line. Don't invent issues.

Format: a numbered list. No introduction, no summary.
`}
        />
      </div>
    ),
  },
  {
    id: "structured-output",
    label: "Structured output",
    title: "Separate instructions from data, and ask for a shape.",
    lead: "When you paste a document or code, fence it off so the model can’t confuse it with your instructions. When you need to process the answer with code, specify the exact format.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Tag the parts of a prompt"
            code={`
Extract every action item from the meeting notes below.

<notes>
Ada will send the Q3 numbers by Friday.
We agreed to move the launch to 14 October.
Grace to check whether the EU servers are ready.
</notes>

<format>
Return JSON only, matching:
[{ "owner": string, "task": string, "due": string | null }]
</format>
`}
          />
          <Code
            title="What comes back"
            code={`
[
  { "owner": "Ada", "task": "Send the Q3 numbers", "due": "Friday" },
  { "owner": "Grace", "task": "Check EU server readiness", "due": null }
]
`}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="Why tags help">
            Clear boundaries — <C>&lt;notes&gt;</C>, <C>&lt;code&gt;</C>,{" "}
            <C>&lt;example&gt;</C> — stop pasted text being read as instructions,
            and let you refer to parts by name.
          </Card>
          <Card title="Give the schema">
            Field names, types, and what to use when a value is missing (
            <C>null</C>, not an empty string or a guess).
          </Card>
          <Card title="Validate anyway" accent>
            If code consumes the output, parse and validate it (e.g. with a
            schema library). Many APIs also offer a strict structured-output
            mode.
          </Card>
        </div>
      </>
    ),
  },
  {
    id: "reasoning",
    label: "Letting it think",
    title: "Multi-step problems go better with visible steps.",
    lead: "A model produces its answer token by token. Asking it to work through the problem first — or using a model’s built-in thinking mode — gives it room to get intermediate steps right.",
    content: (
      <>
        <Figure title="Same question, two approaches">
          <ThinkVisual />
        </Figure>
        <DataTable
          caption="When step-by-step reasoning helps"
          head={["Helps a lot", "Barely matters"]}
          rows={[
            ["Maths and multi-step logic", "Simple facts and definitions"],
            ["Debugging: “why does this fail?”", "Rewording or translating text"],
            ["Planning a change across many files", "Short formatting tasks"],
            ["Comparing options against criteria", "Autocomplete-style code"],
          ]}
        />
        <Callout title="How to ask for it">
          “Think through this step by step before answering”, or “First list
          the possible causes, then pick the most likely and explain why.” For
          debugging, asking for hypotheses before a fix avoids confident
          patches for the wrong problem.
        </Callout>
      </>
    ),
  },
  {
    id: "prompting-for-code",
    label: "Prompting for code",
    title: "Templates for the coding prompts you’ll write most.",
    lead: "Copy one, fill in the brackets. Each one supplies the context a model would otherwise have to guess.",
    content: (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Code
          title="Fix a bug"
          code={`
I have a bug in [file / function].

Expected: [what should happen]
Actual:   [what happens instead]
Steps:    [how to reproduce]

Error output:
<error>
[full stack trace]
</error>

Relevant code:
<code>
[the function and anything it calls]
</code>

Stack: [language, framework and versions]
First list the likely causes, then propose the smallest fix.
`}
        />
        <Code
          title="Build a feature"
          code={`
Add [feature] to [project].

Context: [what exists, where it lives, conventions to follow]
Requirements:
- [behaviour 1]
- [behaviour 2]
Constraints: [no new dependencies / must work offline / accessibility]
Done means: [tests pass, types check, works on mobile]

Before writing code, outline your plan and any questions.
`}
        />
        <Code
          title="Write tests"
          code={`
Write unit tests for the function below using [Jest / JUnit 5 / kotlin.test].

Cover: the normal case, empty input, boundary values, and invalid input.
Name each test after the behaviour it checks.
Don't change the function. If you find a bug, point it out separately.

<code>
[function]
</code>
`}
        />
        <Code
          title="Review a diff"
          code={`
Review this diff as a careful senior engineer.

Focus on: correctness, edge cases, security, and error handling.
Ignore: formatting and naming preferences.
For each issue give the line, the risk, and a suggested fix.
If it's good, say so briefly.

<diff>
[git diff output]
</diff>
`}
        />
      </div>
    ),
  },
  {
    id: "hallucinations",
    label: "Hallucinations",
    title: "Fluent is not the same as true.",
    lead: "Language models generate the most plausible continuation of text. Usually that’s also correct — but when it isn’t, the wrong answer sounds just as confident as a right one.",
    content: (
      <>
        <Figure title="A verification checklist">
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item, i) => (
              <li key={item.title} className="flex gap-3 rounded-[8px] border border-border bg-background p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/50 font-mono text-xs text-accent-hover">
                  {i + 1}
                </span>
                <div>
                  <p className="font-heading font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Figure>
        <DataTable
          caption="When to be extra careful"
          head={["Higher risk", "Why"]}
          rows={[
            ["Exact numbers, dates, prices, statistics", "Easy to produce plausible-but-wrong specifics"],
            ["Citations, links, paper titles, quotes", "Can be invented wholesale"],
            ["Niche libraries, config flags, CLI options", "Less training data — may blend similar tools"],
            ["Anything after the model’s knowledge cutoff", "It may not know, and may not say so"],
            ["Legal, medical, financial specifics", "High stakes — verify with a qualified source"],
          ]}
        />
        <Callout title="Make “I don’t know” allowed">
          Add “If you’re not sure, say so rather than guessing.” Giving the model
          the real document or docs page to work from (instead of its memory)
          reduces invented answers the most.
        </Callout>
      </>
    ),
  },
  {
    id: "how-agents-work",
    label: "How agents work",
    title: "An agent is a model in a loop with tools.",
    lead: "A coding agent doesn’t answer in one go. It picks a tool, looks at the result, and decides what to do next — dozens of times — until the goal is met or it needs you.",
    content: (
      <>
        <Figure title="The agent loop">
          <Wide minWidth={560}>
            <AgentLoop />
          </Wide>
        </Figure>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card eyebrow="Give it" title="A way to check its work" accent>
            Test commands, a linter, a build script, a URL to load. An agent that
            can verify fixes its own mistakes; one that can’t just says “done”.
          </Card>
          <Card eyebrow="Keep" title="Permissions tight">
            Approve commands that change things (installs, deletes, pushes,
            deploys). Allow-list safe read-only commands to cut the prompts.
          </Card>
          <Card eyebrow="Use" title="Git as a safety net">
            Start from a clean working tree and commit at good checkpoints, so
            any bad step is one <C>git restore</C> away.
          </Card>
        </div>
        <DoDont
          code={false}
          items={[
            { dont: "“Improve the app.”", do: "“The /cart page takes 3 s to load. Find why and fix it. Measure before and after with npm run bench.”" },
            { dont: "Letting it run for an hour on a vague task, then reviewing 60 changed files.", do: "Asking for a plan first, approving it, and reviewing in small steps." },
            { dont: "Re-explaining the project’s commands and conventions in every session.", do: "Writing them once into CLAUDE.md or AGENTS.md in the repository." },
          ]}
        />
      </>
    ),
  },
  {
    id: "privacy",
    label: "Privacy & responsibility",
    title: "What you paste is data you’re sharing.",
    lead: "Prompts may be stored, logged or reviewed depending on the tool, plan and settings. Treat an AI chat like any external service.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card eyebrow="Never paste" title="Secrets and other people’s data" accent>
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>Passwords, API keys, tokens, private keys</li>
              <li>Customer or patient data, personal details of others</li>
              <li>Confidential company documents your policy doesn’t allow</li>
            </ul>
          </Card>
          <Card eyebrow="Instead" title="Share safely">
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>Replace secrets with placeholders like API_KEY</li>
              <li>Use fake or anonymised sample data</li>
              <li>Use the tool and plan your employer has approved</li>
            </ul>
          </Card>
        </div>
        <DoDont
          code={false}
          items={[
            { dont: "Shipping AI-written code you haven’t read because the tests are green.", do: "Reviewing it like a colleague’s pull request — you own what you merge." },
            { dont: "Submitting AI-generated work as entirely your own where that isn’t allowed.", do: "Following your school’s or company’s rules on disclosure." },
            { dont: "Assuming generated text or code is free of licence or copyright issues.", do: "Checking anything that closely resembles existing work before publishing it." },
          ]}
        />
      </>
    ),
  },
  {
    id: "prompt-library",
    label: "Prompt library",
    title: "Everyday prompts, ready to copy.",
    content: (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Code
          title="Learn a concept"
          code={`
Explain [concept] to someone who already knows [related concept].
Use one concrete example, then list 3 common misconceptions.
Finish with 3 short quiz questions — answers at the end.
`}
        />
        <Code
          title="Understand unfamiliar code"
          code={`
Explain what this code does, section by section, for a developer
new to this codebase. Point out anything surprising or risky.

<code>
[paste]
</code>
`}
        />
        <Code
          title="Write a commit message"
          code={`
Write a git commit message for this diff.
Subject: imperative, under 60 characters.
Body: why the change was needed, wrapped at 72 characters.

<diff>
[git diff --staged]
</diff>
`}
        />
        <Code
          title="Summarise a long document"
          code={`
Summarise the document below for [audience] in 5 bullet points.
Then list any decisions, deadlines and open questions it mentions.
Quote the exact sentence for each deadline.

<document>
[paste]
</document>
`}
        />
        <Code
          title="Rewrite for clarity"
          code={`
Rewrite this [email / README section] to be clearer and shorter.
Keep every fact and the friendly tone. Don't add new claims.
Show the rewrite, then a bullet list of what you changed.
`}
        />
        <Code
          title="Stress-test an idea"
          code={`
Here's my plan: [plan].
Argue against it as a sceptical expert. List the 5 strongest
objections, how likely each is to matter, and what evidence would
change your mind.
`}
        />
      </div>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "AI words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "LLM", def: "Large language model — a model trained on text to predict what comes next." },
          { term: "token", def: "The unit models read and write: a word, part of a word, or a symbol." },
          { term: "context window", def: "The maximum number of tokens a model can consider at once." },
          { term: "prompt", def: "The input you give the model." },
          { term: "system prompt", def: "Standing instructions that apply to the whole conversation." },
          { term: "temperature", def: "A setting for how random or deterministic outputs are." },
          { term: "hallucination", def: "A confident but false or invented output." },
          { term: "knowledge cutoff", def: "The point after which the model’s training data has no information." },
          { term: "few-shot prompting", def: "Including examples of the input/output you want." },
          { term: "chain of thought", def: "Having the model reason through intermediate steps." },
          { term: "extended thinking", def: "A model mode that reasons internally before answering." },
          { term: "structured output", def: "Responses constrained to a format like JSON matching a schema." },
          { term: "tool use", def: "The model calling functions — search, code execution, APIs." },
          { term: "agent", def: "A model running in a loop, using tools to reach a goal." },
          { term: "MCP", def: "Model Context Protocol — an open standard for connecting AI apps to tools and data." },
          { term: "RAG", def: "Retrieval-augmented generation — fetching relevant documents into the prompt." },
          { term: "embedding", def: "A list of numbers representing meaning, used for semantic search." },
          { term: "fine-tuning", def: "Further training a model on specific examples." },
        ]}
      />
    ),
  },
];
