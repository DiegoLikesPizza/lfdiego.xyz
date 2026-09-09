import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";
import { Logo } from "@/components/Logo";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "dg@lfdiego.xyz",
    href: "mailto:dg@lfdiego.xyz",
    external: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "DiegoLikesPizza",
    href: "https://github.com/DiegoLikesPizza",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Diego Göttler",
    href: "https://www.linkedin.com/in/diego-göttler-25bb0339b",
    external: true,
  },
];

export function ContactSection() {
  return (
    <>
      <section
        id="contact"
        className="mx-auto max-w-[1100px] scroll-mt-24 border-t border-border px-6 py-24 md:px-10 md:py-32"
      >
        <Reveal>
          <SectionIndex label="04 / Contact" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Lead */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                Let&apos;s <span className="text-accent">talk.</span>
              </h2>
              <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-foreground-muted">
                Got a project, a question, or just want to talk shop? Email is
                the fastest way to reach me — I&apos;ll reply within a day or
                two.
              </p>
            </Reveal>
          </div>

          {/* Channels */}
          <div className="lg:col-span-7 lg:-mt-16">
            <Reveal delay={0.1}>
              <ul className="border-t border-border">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-5 border-b border-border py-5 transition-colors hover:bg-accent-soft md:py-6"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-surface text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <channel.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate font-heading text-lg font-medium text-foreground transition-colors group-hover:text-accent-hover md:text-xl">
                          {channel.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-hover" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row md:px-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <p className="font-mono text-xs text-foreground-muted">
              © 2026 Diego Göttler
            </p>
          </div>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-foreground-subtle">
              Built with Next.js + Tailwind
            </p>
            <a
              href="#top"
              className="link-wipe font-mono text-xs text-foreground-muted transition-colors hover:text-foreground"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
