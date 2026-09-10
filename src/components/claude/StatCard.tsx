import type { LucideIcon } from "lucide-react";

/**
 * One headline number on the Claude stats page: a big figure, a label and
 * a one-line note giving it context.
 */
export function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  note,
}: {
  icon: LucideIcon;
  value: string;
  suffix?: string;
  label: string;
  note: string;
}) {
  return (
    <div className="group h-full rounded-[var(--radius)] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow)]">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-background-secondary text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-heading text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
        {value}
        {suffix ? (
          <span className="ml-1 text-2xl text-accent">{suffix}</span>
        ) : null}
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{note}</p>
    </div>
  );
}
