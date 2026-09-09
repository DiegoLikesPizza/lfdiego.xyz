import { AppWindow, Cpu, Gauge } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";

const capabilities = [
  {
    icon: AppWindow,
    title: "Web applications",
    body: "React and Next.js front ends, plus the small APIs behind them.",
  },
  {
    icon: Cpu,
    title: "Desktop & hardware",
    body: "Java desktop apps — including one that drives an Arduino rover over HTTP.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    body: "Fast, accessible, search-friendly pages — this site included.",
  },
];

const stackGroups = [
  {
    label: "Languages & frameworks",
    items: [
      "TypeScript",
      "JavaScript",
      "Java",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
    ],
  },
  {
    label: "Tools",
    items: ["IntelliJ IDEA", "VS Code", "Git & GitHub"],
  },
];

export function StackSection() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[1100px] scroll-mt-24 border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <Reveal>
        <SectionIndex label="02 / Stack" />
        <h2 className="mt-8 max-w-[20ch] font-heading text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
          The tools I build with, day to day.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.title} delay={index * 0.06}>
            <div className="group h-full rounded-[var(--radius)] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow)]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-background-secondary text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <capability.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {capability.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 space-y-8">
        {stackGroups.map((group, index) => (
          <Reveal key={group.label} delay={0.1 + index * 0.06}>
            <div className="border-t border-border pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
                {group.label}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs tracking-tight text-foreground-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
