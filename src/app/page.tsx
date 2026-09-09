import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { AboutSection } from "@/components/AboutSection";
import { StackSection } from "@/components/StackSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

const socials = [
  { href: "https://github.com/DiegoLikesPizza", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/diego-göttler-25bb0339b",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "mailto:dg@lfdiego.xyz", label: "Email", icon: Mail },
];

export default function Home() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="mx-auto flex min-h-[88svh] max-w-[1100px] items-start px-6 pb-16 pt-28 md:px-10 lg:items-center">
        <div className="grid w-full items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle sm:text-sm">
                Software Developer / Apprentice @ MediaMarktSaturn — Denkendorf, DE
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-heading text-[clamp(2.6rem,8.5vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-foreground">
                I build fast, <span className="text-accent">reliable</span> web
                software — and I&apos;m learning to build it better.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-foreground-muted">
                Software developer focused on Next.js and TypeScript, training
                as a Fachinformatiker (Anwendungsentwicklung) at
                MediaMarktSaturn.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                  View work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="link-wipe text-base font-medium text-foreground"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="link-wipe inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
                    >
                      <social.icon className="h-3.5 w-3.5" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="hidden justify-end lg:col-span-3 lg:flex">
            <Reveal delay={0.12}>
              <Logo size="lg" />
            </Reveal>
          </div>
        </div>
      </section>

      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
