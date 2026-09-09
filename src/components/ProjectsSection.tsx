import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionIndex } from "@/components/SectionIndex";

interface Project {
  num: string;
  title: string;
  summary: string;
  tech: string[];
  year: string;
  status?: "live" | "archived";
  href: string;
  linkLabel: string;
}

const projects: Project[] = [
  {
    num: "01",
    title: "IT Service Hecker und Göttler",
    summary:
      "The site for the IT company I co-founded — a fast, conversion-focused landing page for small and mid-sized businesses, built end to end.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2025",
    status: "live",
    href: "https://it-service-hg.de",
    linkLabel: "Visit site",
  },
  {
    num: "02",
    title: "CUTECAT",
    summary:
      "A Java desktop app that drives an Arduino-powered rover — camera, ultrasonic sensor and a ball launcher — over HTTP, with manual, semi-autonomous and fully autonomous modes. Built with a team of six.",
    tech: ["Java", "Arduino", "HTTP"],
    year: "2025",
    status: "archived",
    href: "https://github.com/DiegoLikesPizza/CUTECAT",
    linkLabel: "View source",
  },
  {
    num: "03",
    title: "Seminararbeit — Die Geschichte des CERN",
    summary:
      "A companion site for my Seminararbeit on CERN — how the LEP became the LHC. Hand-built in plain HTML, CSS and JavaScript, with the full paper as a PDF.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    status: "live",
    href: "https://lfdiego.xyz/seminararbeit/",
    linkLabel: "Visit site",
  },
  {
    num: "04",
    title: "Vokabeltrainer",
    summary:
      "A vocabulary trainer that turns a plain JSON file into custom study sets — built to make exam prep faster.",
    tech: ["Next.js", "JavaScript"],
    year: "2026",
    href: "https://github.com/DiegoLikesPizza/vokabeltrainer",
    linkLabel: "View source",
  },
  {
    num: "05",
    title: "Personal Portfolio v1",
    summary:
      "My first portfolio — an experimental dark, high-energy interface. Archived, kept on GitHub as a snapshot of where I started.",
    tech: ["React", "Framer Motion", "CSS"],
    year: "2024",
    status: "archived",
    href: "https://github.com/DiegoLikesPizza/lfdiego.xyz",
    linkLabel: "View source",
  },
];

function StatusTag({ status }: { status?: Project["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-foreground-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Live
      </span>
    );
  }
  if (status === "archived") {
    return (
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-foreground-subtle">
        Archived
      </span>
    );
  }
  return null;
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-t border-border transition-colors hover:bg-accent-soft"
    >
      {/* accent left-border that grows on hover */}
      <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

      <div className="grid gap-4 py-8 transition-[padding] duration-300 md:grid-cols-12 md:gap-8 md:py-10 md:pl-4 md:group-hover:pl-6">
        <div className="font-mono text-sm text-foreground-subtle md:col-span-1 md:pt-1.5">
          {project.num}
        </div>

        <div className="md:col-span-7">
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent md:text-[1.9rem]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-foreground-muted">
            {project.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.7rem] text-foreground-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 md:col-span-4 md:flex-col md:flex-nowrap md:items-end md:justify-start md:gap-3">
          <span className="font-mono text-xs text-foreground-subtle">
            {project.year}
          </span>
          <StatusTag status={project.status} />
          <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors group-hover:text-accent-hover md:mt-auto">
            {project.linkLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1100px] scroll-mt-24 border-t border-border px-6 py-24 md:px-10 md:py-32"
    >
      <Reveal>
        <SectionIndex label="03 / Selected Work" />
        <h2 className="sr-only">Selected work</h2>
        <p className="mt-8 max-w-[40ch] text-lg text-foreground-muted">
          A short, curated index of things I&apos;ve designed and shipped.
        </p>
      </Reveal>

      <div className="mt-12">
        {projects.map((project, index) => (
          <Reveal key={project.num} delay={index * 0.06}>
            <ProjectRow project={project} />
          </Reveal>
        ))}
        <p className="border-t border-border pt-8 font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">
          More work in progress.
        </p>
      </div>
    </section>
  );
}
