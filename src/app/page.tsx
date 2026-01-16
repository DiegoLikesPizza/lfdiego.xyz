"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Zap, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { IntroDataStreams } from "@/components/IntroDataStreams";

// Animation variants
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
      delayChildren: 0.3,
    },
  },
};

// Neon CTA Button Component
function NeonButton({
  children,
  className,
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg",
        "bg-accent-cyan text-[#0c0c14] font-semibold",
        "transition-all duration-300 ease-out",
        "hover:glow-cyan",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

// Bento Grid Card Component
function BentoCard({
  title,
  description,
  icon: Icon,
  className,
  href = "#",
  accent = "cyan",
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  href?: string;
  accent?: "cyan" | "purple";
}) {
  const accentColor = accent === "cyan" ? "accent-cyan" : "accent-purple";
  const glowClass = accent === "cyan" ? "group-hover:glow-cyan" : "group-hover:glow-purple";

  return (
    <motion.a
      href={href}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className={cn(
        "group glass-card glass-card-hover rounded-xl p-6",
        "transition-all duration-300 ease-out cursor-pointer",
        glowClass,
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        "bg-background-tertiary border border-border",
        "transition-colors duration-300",
        `group-hover:border-${accentColor}`
      )}>
        <Icon className={cn(
          "w-6 h-6 text-foreground-muted",
          "transition-colors duration-300",
          `group-hover:text-${accentColor}`
        )} />
      </div>
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-foreground-muted text-sm leading-relaxed">
        {description}
      </p>
    </motion.a>
  );
}

// Social Link Component
function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-foreground-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Intro Animation */}
      <IntroDataStreams />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
              </span>
              <span className="text-sm text-foreground-muted font-mono">Available for projects</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                Building the
                <span className="block text-accent-cyan text-glow-cyan">
                  Digital Future
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground-muted max-w-2xl leading-relaxed">
                Full-stack developer and UI/UX designer crafting high-performance
                web experiences with clean code and striking visuals.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <NeonButton href="#work">
                View My Work
              </NeonButton>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex gap-3 pt-8">
              <SocialLink href="https://github.com/DiegoLikesPizza" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/diego-göttler-25bb0339b" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:dg@lfdiego.xyz" icon={Mail} label="Email" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Bento Grid Section */}
      <section id="work" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-foreground">
                What I Do
              </h2>
              <p className="text-foreground-muted max-w-xl">
                Specializing in modern web technologies to deliver exceptional digital experiences.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <BentoCard
                title="Web Development"
                description="Building scalable, performant applications with React, Next.js, and Node.js. Clean architecture that stands the test of time."
                icon={Code2}
                accent="cyan"
                className="lg:col-span-2"
              />
              <BentoCard
                title="UI/UX Design"
                description="Crafting intuitive interfaces that balance aesthetics with functionality."
                icon={Palette}
                accent="purple"
              />
              <BentoCard
                title="Performance"
                description="Optimizing for speed, accessibility, and SEO to maximize reach and impact."
                icon={Zap}
                accent="cyan"
              />
              <BentoCard
                title="Featured Project"
                description="A showcase of recent work demonstrating modern design patterns and clean implementation."
                icon={ArrowRight}
                accent="purple"
                className="lg:col-span-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section + Footer */}
      <ContactSection />
    </main>
  );
}
