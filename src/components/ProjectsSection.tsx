"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

interface Project {
  id: string;
  title: string;
  description: string;
  status: "live" | "development" | "archived";
  statusLabel: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: "ithg",
    title: "IT Service Hecker und Göttler",
    description: "Modern agency platform for digital services. High-performance landing page aimed at SMBs with seamless UX and conversion-focused design.",
    status: "live",
    statusLabel: "Live & Operational",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://it-service-hg.de",
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio v1",
    description: "Experimental cyberpunk interface design. Testing the boundaries of dark UI aesthetics and micro-interactions.",
    status: "archived",
    statusLabel: "Archived Build",
    techStack: ["React", "Framer Motion", "CSS Modules"],
    githubUrl: "https://github.com/DiegoLikesPizza/lfdiego.xyz",
  },
];

function StatusBadge({ status, label }: { status: Project["status"]; label: string }) {
  const statusStyles = {
    live: "bg-green-500/10 border-green-500/30 text-green-400",
    development: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    archived: "bg-foreground-muted/10 border-foreground-muted/30 text-foreground-muted",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono", statusStyles[status])}>
      {status === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
      )}
      {status !== "live" && <CheckCircle2 className="w-3 h-3" />}
      {label}
    </div>
  );
}

function TechTag({ name }: { name: string }) {
  return (
    <span className="px-2 py-1 text-xs font-mono bg-background-secondary border border-border rounded text-foreground-muted hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors cursor-default">
      {name}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group glass-card rounded-xl overflow-hidden border border-border hover:border-accent-cyan/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
    >
      {/* Monitor Frame / Image Area */}
      <div className="relative aspect-video bg-background-secondary overflow-hidden">
        {/* Monitor Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-8 bg-background-tertiary/90 backdrop-blur-sm border-b border-border flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-mono text-foreground-muted truncate max-w-[200px]">
              {project.liveUrl?.replace("https://", "") || "localhost:3000"}
            </span>
          </div>
          <Monitor className="w-3.5 h-3.5 text-foreground-muted" />
        </div>

        {/* Screenshot Placeholder */}
        <div className="absolute inset-0 pt-8 bg-gradient-to-br from-background-secondary to-background-tertiary flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-background-tertiary border border-border flex items-center justify-center">
              <Monitor className="w-8 h-8 text-foreground-muted" />
            </div>
            <p className="text-xs font-mono text-foreground-muted">SYSTEM_PREVIEW</p>
          </div>
        </div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 pt-8 pointer-events-none opacity-30 group-hover:opacity-0 transition-opacity duration-500 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

        {/* Hover Zoom Effect Layer */}
        <div className="absolute inset-0 pt-8 transition-transform duration-500 group-hover:scale-105" />
      </div>

      {/* Info Area */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground leading-tight">
            {project.title}
          </h3>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-foreground-muted uppercase tracking-wider">Tech Loadout</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent-cyan text-[#0c0c14] text-sm font-semibold hover:glow-cyan transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              View Live System
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground-muted hover:text-foreground hover:border-foreground/30 transition-all duration-300",
                !project.liveUrl && "flex-1"
              )}
            >
              <Github className="w-4 h-4" />
              Analyze Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-10"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="text-sm font-mono text-accent-purple uppercase tracking-widest">// Project Archives</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-foreground">
              Deployed Systems
            </h2>
            <p className="text-foreground-muted max-w-xl">
              A collection of completed missions and operational deployments.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Archive Note */}
          <motion.div variants={fadeInUp} className="text-center pt-4">
            <p className="text-sm font-mono text-foreground-muted">
              <span className="text-accent-cyan">[</span> More systems currently in development <span className="text-accent-cyan">]</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
