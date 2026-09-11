"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const code = [
  'console.log("1 · script start");',
  "",
  'setTimeout(() => console.log("4 · timeout"), 0);',
  "",
  'Promise.resolve().then(() => console.log("3 · microtask"));',
  "",
  'console.log("2 · script end");',
];

type Step = {
  line?: number;
  stack: string[];
  webApis: string[];
  micro: string[];
  tasks: string[];
  output: string[];
  note: string;
};

const steps: Step[] = [
  {
    line: 0,
    stack: ["script", "console.log()"],
    webApis: [],
    micro: [],
    tasks: [],
    output: ["1 · script start"],
    note: "Synchronous code runs first, top to bottom, on the call stack.",
  },
  {
    line: 2,
    stack: ["script", "setTimeout()"],
    webApis: ["timer · 0 ms"],
    micro: [],
    tasks: [],
    output: ["1 · script start"],
    note: "setTimeout hands its callback to the browser’s timer. Even 0 ms means “later”, never “now”.",
  },
  {
    line: 2,
    stack: ["script"],
    webApis: [],
    micro: [],
    tasks: ["timeout callback"],
    output: ["1 · script start"],
    note: "The timer finishes, so the callback moves to the task queue — where it must wait for the stack to empty.",
  },
  {
    line: 4,
    stack: ["script", "then()"],
    webApis: [],
    micro: ["then callback"],
    tasks: ["timeout callback"],
    output: ["1 · script start"],
    note: "The promise is already resolved, so its .then callback is queued as a microtask.",
  },
  {
    line: 6,
    stack: ["script", "console.log()"],
    webApis: [],
    micro: ["then callback"],
    tasks: ["timeout callback"],
    output: ["1 · script start", "2 · script end"],
    note: "Still synchronous — so this logs before either callback, even though it’s written last.",
  },
  {
    stack: [],
    webApis: [],
    micro: ["then callback"],
    tasks: ["timeout callback"],
    output: ["1 · script start", "2 · script end"],
    note: "The script is done and the stack is empty. The event loop now drains every microtask before touching the task queue.",
  },
  {
    line: 4,
    stack: ["then callback"],
    webApis: [],
    micro: [],
    tasks: ["timeout callback"],
    output: ["1 · script start", "2 · script end", "3 · microtask"],
    note: "The microtask runs first…",
  },
  {
    line: 2,
    stack: ["timeout callback"],
    webApis: [],
    micro: [],
    tasks: [],
    output: ["1 · script start", "2 · script end", "3 · microtask", "4 · timeout"],
    note: "…and only then the next task. Final order: 1, 2, 3, 4.",
  },
];

function Lane({
  title,
  items,
  hint,
  highlight = false,
}: {
  title: string;
  items: string[];
  hint: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[112px] flex-col rounded-[8px] border p-3",
        highlight && items.length > 0 ? "border-accent/50 bg-accent-soft" : "border-border bg-background",
      )}
    >
      <p className="flex items-baseline justify-between gap-2">
        <span className="font-heading text-sm font-semibold text-foreground">{title}</span>
        <span className="font-mono text-[0.65rem] text-foreground-subtle">{hint}</span>
      </p>
      <ul className="mt-2 flex flex-1 flex-col-reverse justify-start gap-1.5">
        {items.length === 0 ? (
          <li className="font-mono text-xs text-foreground-subtle">empty</li>
        ) : (
          items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="rounded-[5px] border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground"
            >
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

/** Walks through one snippet, showing the stack and both queues at each step. */
export function EventLoopStepper() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const last = steps.length - 1;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <pre className="overflow-x-auto rounded-[var(--radius)] border border-border bg-background-secondary py-3 font-mono text-[0.78rem] leading-relaxed text-foreground">
            <code className="block min-w-max">
              {code.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex gap-3 border-l-2 pr-4 pl-3 transition-colors",
                    step.line === i ? "border-accent bg-accent-soft" : "border-transparent",
                  )}
                >
                  <span className="w-4 shrink-0 text-right text-foreground-subtle">{i + 1}</span>
                  <span className="whitespace-pre">{line || " "}</span>
                </span>
              ))}
            </code>
          </pre>
          <div className="rounded-[var(--radius)] border border-border bg-background p-3">
            <p className="font-heading text-sm font-semibold text-foreground">Console</p>
            <ol className="mt-2 space-y-1 font-mono text-xs text-foreground">
              {step.output.map((line, i) => (
                <li key={line} className={cn(i === step.output.length - 1 && "text-accent-hover")}>
                  › {line}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Lane title="Call stack" hint="top ↑" items={step.stack} />
          <Lane title="Web APIs" hint="timers, fetch" items={step.webApis} />
          <Lane title="Microtasks" hint="runs 1st" items={step.micro} highlight />
          <Lane title="Task queue" hint="runs 2nd" items={step.tasks} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
        <p aria-live="polite" className="min-h-[3rem] flex-1 text-sm leading-relaxed text-foreground-muted">
          <span className="mr-2 font-mono text-xs text-foreground-subtle">
            {index + 1}/{steps.length}
          </span>
          {step.note}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex(0)}
            disabled={index === 0}
            aria-label="Restart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-foreground-muted transition-colors hover:text-foreground disabled:opacity-40"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="inline-flex h-9 items-center gap-1 rounded-[var(--radius)] border border-border px-3 text-sm text-foreground transition-colors hover:border-accent/40 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(last, i + 1))}
            disabled={index === last}
            className="inline-flex h-9 items-center gap-1 rounded-[var(--radius)] bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-40"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
