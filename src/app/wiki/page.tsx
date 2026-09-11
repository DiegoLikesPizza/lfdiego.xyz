import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { guides } from "@/components/wiki/guides";

const TITLE = "Wiki — Diego Göttler";
const DESCRIPTION =
  "Visual guides to Git, GitHub, Java, JavaScript, Kotlin, IDEs and AI prompting — diagrams first, words second.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/wiki/" },
  openGraph: {
    type: "website",
    url: "/wiki/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function WikiPage() {
  const sectionCount = guides.reduce(
    (sum, guide) => sum + guide.sections.length,
    0,
  );

  return (
    <main id="top">
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <Link
            href="/"
            className="link-wipe inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-8 max-w-[16ch] font-heading text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
            The <span className="text-accent">wiki</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-foreground-muted">
            Visual guides to the tools I use every day: Git and GitHub, Java,
            JavaScript and Kotlin, the IDEs I write them in, and how to prompt
            AI well. Diagrams first, words second.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
            {guides.length} guides · {sectionCount} sections
          </p>
        </Reveal>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="01 / Guides" />
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {guides.map((guide, index) => (
            <li key={guide.slug}>
              <Reveal delay={(index % 2) * 0.06} className="h-full">
                <Link
                  href={`/wiki/${guide.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow)] md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-background-secondary text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <guide.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-xs tracking-[0.12em] text-foreground-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                    {guide.kicker}
                  </p>
                  <h2 className="mt-1.5 font-heading text-2xl font-semibold tracking-[-0.01em] text-foreground">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {guide.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {guide.sections.slice(0, 7).map((section) => (
                      <li
                        key={section.id}
                        className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[0.68rem] text-foreground-muted"
                      >
                        {section.label}
                      </li>
                    ))}
                    {guide.sections.length > 7 && (
                      <li className="rounded-full border border-dashed border-border px-2.5 py-1 font-mono text-[0.68rem] text-foreground-subtle">
                        +{guide.sections.length - 7} more
                      </li>
                    )}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent-hover">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal delay={0.06} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-[var(--radius)] border border-dashed border-border p-6 md:p-7">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                  How to read these
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
                  <li>
                    <span className="font-medium text-foreground">Diagrams</span>{" "}
                    show the idea — start there, then read the text.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Code blocks</span>{" "}
                    are copy-paste ready; grey text is a comment.
                  </li>
                  <li>
                    <span className="font-medium text-accent-hover">Accent</span>{" "}
                    marks the thing to focus on, or a warning.
                  </li>
                </ul>
              </div>
            </Reveal>
          </li>
        </ul>
      </section>
    </main>
  );
}
