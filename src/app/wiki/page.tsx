import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { guideHref, guideTopics, wikis } from "@/lib/wikis";

const TITLE = "Wiki — Diego Göttler";
const DESCRIPTION =
  "Developer guides to Git, GitHub, Java, JavaScript, Kotlin, IDEs and AI prompting, plus complete Java 27 and Kotlin wikis — hosted on my own wiki engine.";

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

// The wikis are served by the wiki engine next to this app, so links into
// them are plain <a> tags (a full page load), not client-side <Link>s.
export default function WikiPage() {
  const pageCount = wikis.reduce((sum, wiki) => sum + wiki.pages, 0);

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
            Guides to the tools I use every day, and two complete language
            wikis. All three run on my own wiki engine: instant search that
            forgives typos, full history, and every code example actually run.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
            {wikis.length} wikis · {pageCount} pages
          </p>
        </Reveal>
      </section>

      {/* Wikis */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="01 / Wikis" />
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {wikis.map((wiki, index) => (
            <li key={wiki.path}>
              <Reveal delay={index * 0.06} className="h-full">
                <a
                  href={`${wiki.path}/`}
                  className="group flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow)] md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-background-secondary text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <wiki.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-xs tracking-[0.12em] text-foreground-subtle">
                      {wiki.pages} pages
                    </span>
                  </div>

                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                    {wiki.kicker}
                  </p>
                  <h2 className="mt-1.5 font-heading text-2xl font-semibold tracking-[-0.01em] text-foreground">
                    {wiki.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {wiki.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent-hover">
                    Open the wiki
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="02 / Guides" />
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {guideTopics.map((guide, index) => (
            <li key={guide.slug}>
              <Reveal delay={(index % 2) * 0.06} className="h-full">
                <a
                  href={guideHref(guide.slug)}
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
                  <h3 className="mt-1.5 font-heading text-2xl font-semibold tracking-[-0.01em] text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {guide.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent-hover">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal delay={0.06} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-[var(--radius)] border border-dashed border-border p-6 md:p-7">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                  Finding things
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
                  <li>
                    Press <span className="font-medium text-foreground">/</span>{" "}
                    or <span className="font-medium text-foreground">Ctrl K</span>{" "}
                    in a wiki — results appear while you type.
                  </li>
                  <li>
                    Word beginnings are enough, and small{" "}
                    <span className="font-medium text-foreground">typos</span>{" "}
                    are corrected for you.
                  </li>
                  <li>
                    Paste an{" "}
                    <span className="font-medium text-accent-hover">error message</span>{" "}
                    to land on the page that explains it.
                  </li>
                </ul>
              </div>
            </Reveal>
          </li>
        </ul>
      </section>

      {/* Engine */}
      <section className="mx-auto max-w-[1100px] border-t border-border px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <SectionIndex label="03 / Engine" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-10 max-w-[62ch] text-base leading-relaxed text-foreground-muted">
            <span className="font-medium text-foreground">
              Diego&rsquo;s Wiki Engine
            </span>{" "}
            is a self-hosted wiki I wrote in Kotlin: one jar, one compressed
            SQLite file, a Word-like editor, delta-compressed history and a
            full-text search with typo correction. Each wiki here is its own
            instance of it, imported from Markdown on every deploy.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
