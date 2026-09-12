import { Fragment, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

/**
 * Building blocks shared by every wiki guide. Everything is drawn from the
 * site's CSS variables, so diagrams re-theme with light/dark like the rest.
 *
 * Boxes never use h-full: in a column stacked inside a grid, h-full resolves
 * to the whole row and pushes the next box out of the grid. Side by side they
 * still match heights — grid items stretch, and Figure and Callout grow to
 * fill their Reveal wrapper.
 */

/** A bordered panel with an optional heading row — the frame for diagrams. */
export function Figure({
  title,
  note,
  children,
  className,
}: {
  title?: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className="flex flex-col">
      <figure
        className={cn(
          "m-0 grow rounded-[var(--radius)] border border-border bg-surface p-5 md:p-8",
          className,
        )}
      >
        {(title || note) && (
          <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            {title && (
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>
            )}
            {note && (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
                {note}
              </p>
            )}
          </figcaption>
        )}
        {children}
      </figure>
    </Reveal>
  );
}

/** Lets a fixed-layout diagram scroll sideways on narrow screens. */
export function Wide({
  minWidth = 560,
  children,
}: {
  minWidth?: number;
  children: ReactNode;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

const FULL_LINE_COMMENT = /^\s*(\/\/|#)/;
const TRAILING_COMMENT = /\s{2,}(\/\/|#)\s/;

/** Mutes whole-line comments and trailing comments set off by 2+ spaces. */
function CodeLine({ line }: { line: string }) {
  if (FULL_LINE_COMMENT.test(line)) {
    return <span className="block text-foreground-subtle">{line}</span>;
  }
  const match = TRAILING_COMMENT.exec(line);
  if (match) {
    return (
      <span className="block">
        {line.slice(0, match.index)}
        <span className="text-foreground-subtle">{line.slice(match.index)}</span>
      </span>
    );
  }
  return <span className="block">{line || " "}</span>;
}

export function Code({
  code,
  title,
  className,
}: {
  code: string;
  title?: string;
  className?: string;
}) {
  const lines = code.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
  return (
    <Reveal className="min-w-0">
      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius)] border border-border bg-background-secondary",
          className,
        )}
      >
        {title && (
          <p className="border-b border-border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
            {title}
          </p>
        )}
        <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-foreground">
          <code className="block min-w-max">
            {lines.map((line, index) => (
              <CodeLine key={index} line={line} />
            ))}
          </code>
        </pre>
      </div>
    </Reveal>
  );
}

/** Inline code. */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[4px] border border-border bg-background-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

/** A small numbered accent dot used to tie a diagram to its legend. */
export function Marker({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.65rem] font-medium leading-none text-accent-foreground">
      {n}
    </span>
  );
}

/**
 * Keyboard shortcut. Spaces separate a sequence ("Shift Shift"),
 * "+" separates keys pressed together ("Ctrl+Shift+P").
 */
export function Keys({ combo }: { combo: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 whitespace-nowrap">
      {combo.split(" ").map((group, g) => (
        <Fragment key={g}>
          {g > 0 && <span className="text-foreground-subtle">then</span>}
          {group.split("+").map((key, k) => (
            <Fragment key={k}>
              {k > 0 && <span className="text-foreground-subtle">+</span>}
              <kbd className="rounded-[5px] border border-b-2 border-border bg-surface px-1.5 py-0.5 font-mono text-[0.72rem] text-foreground">
                {key}
              </kbd>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </span>
  );
}

export function Callout({
  tone = "tip",
  title,
  children,
}: {
  tone?: "tip" | "warn";
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? TriangleAlert : Lightbulb;
  return (
    <Reveal className="flex flex-col">
      <aside
        className={cn(
          "flex grow gap-4 rounded-[var(--radius)] border p-5",
          tone === "warn"
            ? "border-accent/40 bg-accent-soft"
            : "border-border bg-background-secondary",
        )}
      >
        <Icon
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0",
            tone === "warn" ? "text-accent" : "text-foreground-muted",
          )}
          strokeWidth={1.75}
        />
        <div>
          <p className="font-heading font-semibold text-foreground">{title}</p>
          <div className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
            {children}
          </div>
        </div>
      </aside>
    </Reveal>
  );
}

export function Card({
  title,
  eyebrow,
  children,
  accent = false,
  className,
}: {
  title: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border p-5",
        accent ? "border-accent/45 bg-accent-soft" : "border-border bg-surface",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-[0.7rem] uppercase tracking-[0.12em]",
            accent ? "text-accent-hover" : "text-foreground-subtle",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h3
        className={cn(
          "font-heading font-semibold text-foreground",
          eyebrow && "mt-2",
        )}
      >
        {title}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}

export function DataTable({
  head,
  rows,
  caption,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  caption: string;
}) {
  return (
    <Reveal className="min-w-0">
      <div className="overflow-x-auto rounded-[var(--radius)] border border-border bg-surface">
        <table
          className={cn(
            "w-full border-collapse text-left text-sm",
            // Scroll only when the columns genuinely can't fit; narrow tables
            // should shrink into half-width layouts instead.
            head.length >= 4
              ? "min-w-[560px]"
              : head.length === 3
                ? "min-w-[420px]"
                : "min-w-[280px]",
          )}
        >
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border bg-background-secondary">
              {head.map((cell, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] text-foreground-subtle"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-border last:border-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={cn(
                      "px-4 py-3 align-top leading-relaxed",
                      c === 0 ? "text-foreground" : "text-foreground-muted",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

type PipelineNode = { title: string; sub?: string; accent?: boolean };
type PipelineLink = { forward: string; back?: string };

/**
 * A left-to-right chain of stages with the command that moves between them.
 * Stacks vertically below lg so labels never get squeezed.
 */
export function Pipeline({
  nodes,
  links,
}: {
  nodes: PipelineNode[];
  links: PipelineLink[];
}) {
  return (
    <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
      {nodes.map((node, index) => (
        <Fragment key={node.title}>
          <div
            className={cn(
              "min-w-0 flex-1 rounded-[8px] border px-4 py-4 text-center",
              node.accent
                ? "border-accent/50 bg-accent-soft"
                : "border-border bg-background",
            )}
          >
            <p className="font-heading font-semibold leading-snug text-foreground">
              {node.title}
            </p>
            {node.sub && (
              <p className="mt-1 text-xs leading-snug text-foreground-muted">
                {node.sub}
              </p>
            )}
          </div>
          {index < links.length && <PipelineConnector link={links[index]} />}
        </Fragment>
      ))}
    </div>
  );
}

function PipelineConnector({ link }: { link: PipelineLink }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-5 py-3 font-mono text-[0.7rem] lg:w-36 lg:flex-col lg:gap-1 lg:px-2 lg:py-0">
      <span className="flex items-center gap-1.5 text-accent-hover lg:flex-col lg:gap-0.5">
        <span className="text-center">{link.forward}</span>
        <ArrowDown className="h-4 w-4 text-accent lg:hidden" />
        <ArrowRight className="hidden h-4 w-4 text-accent lg:block" />
      </span>
      {link.back && (
        <span className="flex items-center gap-1.5 text-foreground-subtle lg:flex-col lg:gap-0.5">
          <ArrowUp className="h-4 w-4 lg:hidden" />
          <ArrowLeft className="hidden h-4 w-4 lg:block" />
          <span className="text-center">{link.back}</span>
        </span>
      )}
    </div>
  );
}

/** A vertical, numbered timeline. */
export function Steps({
  items,
}: {
  items: { title: string; body: ReactNode; code?: string }[];
}) {
  return (
    <Reveal>
      <ol className="ml-3 space-y-8 border-l border-border pl-8">
        {items.map((item, index) => (
          <li key={item.title} className="relative">
            <span className="absolute -left-[46px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent/50 bg-background font-mono text-xs text-accent-hover">
              {index + 1}
            </span>
            <p className="font-heading font-semibold leading-7 text-foreground">
              {item.title}
            </p>
            <div className="mt-1 max-w-[60ch] text-sm leading-relaxed text-foreground-muted">
              {item.body}
            </div>
            {item.code && (
              <p className="mt-3 inline-block max-w-full overflow-x-auto whitespace-nowrap rounded-[6px] border border-border bg-background-secondary px-3 py-1.5 font-mono text-[0.78rem] text-foreground">
                {item.code}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/** Code with numbered markers on some lines, explained in a legend beside it. */
export function AnnotatedCode({
  title,
  lines,
  notes,
}: {
  title?: string;
  lines: [text: string, marker?: number][];
  notes: { title: string; body: ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="min-w-0 overflow-hidden rounded-[var(--radius)] border border-border bg-background-secondary">
        {title && (
          <p className="border-b border-border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
            {title}
          </p>
        )}
        <pre className="overflow-x-auto py-4 font-mono text-[0.8rem] leading-relaxed text-foreground">
          <code className="block min-w-max">
            {lines.map(([text, marker], index) => (
              <span
                key={index}
                className={cn(
                  "flex items-center gap-3 pr-5",
                  marker && "bg-accent-soft",
                )}
              >
                <span className="inline-flex w-9 shrink-0 justify-end">
                  {marker ? <Marker n={marker} /> : null}
                </span>
                <span className="whitespace-pre">{text || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <ol className="space-y-4">
        {notes.map((note, index) => (
          <li key={note.title} className="flex gap-3">
            <span className="mt-0.5">
              <Marker n={index + 1} />
            </span>
            <div>
              <p className="font-heading font-semibold text-foreground">
                {note.title}
              </p>
              <div className="mt-1 text-sm leading-relaxed text-foreground-muted">
                {note.body}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Side-by-side “instead of → prefer” pairs. */
export function DoDont({
  items,
  code = true,
}: {
  items: { dont: string; do: string; why?: ReactNode }[];
  code?: boolean;
}) {
  const Body = ({ text, strong }: { text: string; strong?: boolean }) =>
    code ? (
      <pre
        className={cn(
          "mt-1.5 overflow-x-auto whitespace-pre font-mono text-[0.78rem] leading-relaxed",
          strong ? "text-foreground" : "text-foreground-muted",
        )}
      >
        {text}
      </pre>
    ) : (
      <p
        className={cn(
          "mt-1.5 text-sm leading-relaxed",
          strong ? "text-foreground" : "text-foreground-muted",
        )}
      >
        {text}
      </p>
    );

  return (
    <Reveal className="min-w-0">
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid grid-cols-1 gap-3 rounded-[var(--radius)] border border-border bg-surface p-4 md:grid-cols-2 md:gap-5"
          >
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                Instead of
              </p>
              <Body text={item.dont} />
            </div>
            <div className="min-w-0 border-t border-border pt-3 md:border-t-0 md:border-l md:pl-5 md:pt-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent-hover">
                Prefer
              </p>
              <Body text={item.do} strong />
              {item.why && (
                <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                  {item.why}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** A two-column list of terms and short definitions. */
export function Glossary({
  terms,
}: {
  terms: { term: string; def: ReactNode }[];
}) {
  return (
    <Reveal>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        {terms.map((item) => (
          <div key={item.term} className="border-t border-border pt-4">
            <dt className="font-mono text-sm text-foreground">{item.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground-muted">
              {item.def}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/** A mono pill. */
export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "solid" | "dim";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs",
        tone === "neutral" && "border-border bg-surface text-foreground",
        tone === "accent" && "border-accent/50 bg-accent-soft text-accent-hover",
        tone === "solid" && "border-accent bg-accent text-accent-foreground",
        tone === "dim" &&
          "border-dashed border-border bg-transparent text-foreground-subtle line-through",
      )}
    >
      {children}
    </span>
  );
}
