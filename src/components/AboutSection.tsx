import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { Logo } from "@/components/Logo";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1100px] scroll-mt-24 border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: index + monogram */}
        <div className="lg:col-span-4">
          <Reveal>
            <SectionIndex label="01 / About" />
            <h2 className="sr-only">About</h2>
            <div className="mt-10">
              <Logo size="lg" />
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
                Open to freelance &amp; collaboration
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: bio */}
        <div className="lg:col-span-8">
          <Reveal delay={0.08}>
            <p className="max-w-[46ch] font-heading text-2xl font-medium leading-snug tracking-[-0.01em] text-foreground md:text-[1.75rem]">
              I&apos;m Diego Göttler — a developer and co-founder based near
              Denkendorf, Germany.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-foreground-muted">
              <p>
                I recently finished my Abitur (Class of 2026) and co-founded{" "}
                <span className="text-foreground">
                  IT Service Hecker und Göttler
                </span>
                , where I build custom software and fast websites for local and
                small businesses.
              </p>
              <p>
                I care about clean, maintainable code and software that actually
                gets real work done — not demos. Most of what I ship is built
                with Next.js, TypeScript and Tailwind.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.12em] text-balance text-foreground-subtle">
              Co-Founder &amp; Developer — IT Service Hecker und Göttler
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
