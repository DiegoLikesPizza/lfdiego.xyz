"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Cpu } from "lucide-react";
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Tech stack items styled like game loadout
const techStack = [
  { name: "Next.js", level: 90, category: "FRAMEWORK" },
  { name: "TypeScript", level: 85, category: "LANGUAGE" },
  { name: "Tailwind CSS", level: 95, category: "STYLING" },
  { name: "Node.js", level: 80, category: "RUNTIME" },
];

function TechLoadoutItem({ name, level, category }: { name: string; level: number; category: string }) {
  return (
    <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-background-tertiary/50 transition-colors">
      <div className="w-8 h-8 rounded border border-border flex items-center justify-center bg-background-secondary group-hover:border-accent-cyan/50 transition-colors">
        <Cpu className="w-4 h-4 text-accent-cyan" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-wider">{category}</span>
        </div>
        <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="text-sm font-mono text-accent-cyan uppercase tracking-widest">// Operator Profile</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-foreground">
              About Me
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1: Profile */}
            <motion.div
              variants={fadeInUp}
              className="glass-card glass-card-hover rounded-xl p-6 flex flex-col items-center text-center lg:row-span-2"
            >
              {/* Photo Placeholder */}
              <div className="w-32 h-32 rounded-xl bg-background-tertiary border border-border mb-6 flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-foreground-muted" />
              </div>
              
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground mb-1">
                Diego Göttler
              </h3>
              <p className="text-foreground-muted text-sm mb-4">Co-Founder & Developer</p>
              
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-tertiary border border-accent-cyan/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-mono text-green-400">STATUS: ONLINE</span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-border w-full grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-accent-cyan">2026</p>
                  <p className="text-xs text-foreground-muted">Abitur</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent-purple">∞</p>
                  <p className="text-xs text-foreground-muted">Projects</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Background */}
            <motion.div
              variants={fadeInUp}
              className="glass-card glass-card-hover rounded-xl p-6 lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-background-tertiary border border-border flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                    Background
                  </h3>
                  <p className="text-xs text-foreground-muted font-mono">// System.loadProfile()</p>
                </div>
              </div>
              <p className="text-foreground-muted leading-relaxed text-sm mb-4">
                Currently completing my <span className="text-foreground">Abitur at Gymnasium Beilngries</span> (Class of 2026), 
                while building real-world tech solutions. Co-founded{" "}
                <span className="text-accent-cyan">IT Service Hecker und Göttler</span> — delivering professional 
                IT services and custom software to local businesses.
              </p>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent-cyan" />
                <span className="text-xs font-mono text-foreground-muted">
                  IT Service Hecker und Göttler • Co-Founder
                </span>
              </div>
            </motion.div>

            {/* Card 3: Tech Stack Loadout */}
            <motion.div
              variants={fadeInUp}
              className="glass-card glass-card-hover rounded-xl p-6 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background-tertiary border border-border flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                      Tech Loadout
                    </h3>
                    <p className="text-xs text-foreground-muted font-mono">// Primary Weapons</p>
                  </div>
                </div>
                <div className="text-xs font-mono text-accent-cyan px-2 py-1 rounded bg-accent-cyan/10 border border-accent-cyan/20">
                  EQUIPPED
                </div>
              </div>
              
              <div className="space-y-2">
                {techStack.map((tech) => (
                  <TechLoadoutItem key={tech.name} {...tech} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

