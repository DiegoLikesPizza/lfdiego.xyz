import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { getGuide, guides } from "@/components/wiki/guides";

type Props = { params: Promise<{ slug: string }> };

// Static export: every guide is known at build time, anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const title = `${guide.title} — a visual guide · Diego Göttler`;
  return {
    title,
    description: guide.summary,
    alternates: { canonical: `/wiki/${guide.slug}/` },
    openGraph: {
      type: "article",
      url: `/wiki/${guide.slug}/`,
      title,
      description: guide.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.summary,
    },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const position = guides.indexOf(guide);
  const previous = guides[position - 1];
  const next = guides[position + 1];

  return (
    <main id="top">
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-32 md:px-10 md:pt-36">
        <Reveal>
          <Link
            href="/wiki"
            className="link-wipe inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All guides
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-border bg-surface text-accent">
              <guide.icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            Guide {pad(position + 1)} · {guide.kicker} · {guide.sections.length} sections
          </p>
          <h1 className="mt-6 font-heading text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
            {guide.title}
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-foreground-muted">
            {guide.summary}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <nav aria-label="On this page" className="mt-12 border-t border-border pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
              On this page
            </p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {guide.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 py-1 text-foreground-muted transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-xs text-foreground-subtle group-hover:text-accent-hover">
                      {pad(index + 1)}
                    </span>
                    <span className="link-wipe">{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </section>

      {guide.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-[1100px] scroll-mt-16 border-t border-border px-6 py-20 md:px-10 md:py-24"
        >
          <Reveal>
            <SectionIndex label={`${pad(index + 1)} / ${section.label}`} />
            <h2 className="mt-8 max-w-[26ch] font-heading text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
              {section.title}
            </h2>
            {section.lead && (
              <p className="mt-6 max-w-[62ch] leading-relaxed text-foreground-muted">
                {section.lead}
              </p>
            )}
          </Reveal>
          <div className="mt-12 space-y-6">{section.content}</div>
        </section>
      ))}

      {/* Previous / next */}
      <nav
        aria-label="More guides"
        className="mx-auto grid max-w-[1100px] gap-4 border-t border-border px-6 py-16 sm:grid-cols-2 md:px-10"
      >
        {previous ? (
          <PagerLink href={`/wiki/${previous.slug}`} label="Previous" title={previous.title} direction="left" />
        ) : (
          <PagerLink href="/wiki" label="Back to" title="All guides" direction="left" />
        )}
        {next ? (
          <PagerLink href={`/wiki/${next.slug}`} label="Next" title={next.title} direction="right" />
        ) : (
          <PagerLink href="/wiki" label="Back to" title="All guides" direction="right" />
        )}
      </nav>
    </main>
  );
}

function PagerLink({
  href,
  label,
  title,
  direction,
}: {
  href: string;
  label: string;
  title: string;
  direction: "left" | "right";
}) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-surface p-5 transition-colors hover:border-accent/40 ${direction === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 text-accent transition-transform ${direction === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
      />
      <span>
        <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
          {label}
        </span>
        <span className="mt-1 block font-heading text-lg font-semibold text-foreground">
          {title}
        </span>
      </span>
    </Link>
  );
}
