"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Terminal, CheckCircle2 } from "lucide-react";
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

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
}

function InputField({ label, id, type = "text", placeholder, required = true, textarea = false }: InputFieldProps) {
  const baseClasses = cn(
    "w-full bg-background-secondary/50 border border-border rounded-lg px-4 py-3",
    "text-foreground placeholder:text-foreground-muted/50",
    "focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)]",
    "transition-all duration-300",
    "font-[family-name:var(--font-jetbrains-mono)] text-sm"
  );

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-mono text-accent-cyan uppercase tracking-wider">
        {">> "}{label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cn(baseClasses, "resize-none")}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg glass-card hover:border-accent-cyan/50 transition-all group"
    >
      <Icon className="w-5 h-5 text-foreground-muted group-hover:text-accent-cyan transition-colors" />
      <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">{label}</span>
    </motion.a>
  );
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;

    try {
      const response = await fetch("https://formspree.io/f/xaqqqveg", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Transmission failed. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-10"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
                <Terminal className="w-4 h-4 text-accent-cyan" />
                <span className="text-xs font-mono text-accent-cyan">COMMS_TERMINAL_v2.1</span>
              </div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-foreground">
                Initialize Uplink
              </h2>
              <p className="text-foreground-muted max-w-md mx-auto">
                Ready to collaborate? Open a secure channel and let&apos;s build something extraordinary.
              </p>
            </motion.div>

            {/* Terminal Panel */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-8 md:p-10 border border-border">
              {/* Terminal Header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                </div>
                <span className="text-xs font-mono text-foreground-muted">secure_transmission.exe</span>
              </div>

              <div className="grid lg:grid-cols-5 gap-10">
                {/* Form */}
                <div className="lg:col-span-3">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground mb-2">
                        Transmission Successful
                      </h3>
                      <p className="text-foreground-muted text-sm">
                        Your message has been received. Expect a response within 24-48 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <InputField label="ENTER_IDENTITY" id="name" placeholder="Your name" />
                      <InputField label="RETURN_ADDRESS" id="email" type="email" placeholder="your@email.com" />
                      <InputField label="MESSAGE_PAYLOAD" id="message" placeholder="Your message..." textarea />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full relative overflow-hidden group",
                          "inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg",
                          "bg-accent-cyan text-[#0c0c14] font-semibold font-mono",
                          "transition-all duration-300",
                          "hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]",
                          "disabled:opacity-70 disabled:cursor-not-allowed"
                        )}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-white/20 to-accent-cyan translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <span className="animate-pulse">TRANSMITTING</span>
                              <span className="animate-spin">◌</span>
                            </>
                          ) : (
                            <>
                              INITIALIZE_TRANSMISSION
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  )}
                </div>

                {/* Alternative Comms */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <p className="text-xs font-mono text-foreground-muted uppercase tracking-wider mb-4">
                      {">> "}ALTERNATIVE_CHANNELS
                    </p>
                    <div className="space-y-3">
                      <a
                        href="mailto:dg@lfdiego.xyz"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg glass-card hover:border-accent-cyan/50 transition-all group"
                      >
                        <Mail className="w-5 h-5 text-accent-cyan" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Direct Line</p>
                          <p className="text-xs text-foreground-muted font-mono">dg@lfdiego.xyz</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-foreground-muted uppercase tracking-wider mb-4">
                      {">> "}NETWORK_LINKS
                    </p>
                    <div className="space-y-3">
                      <SocialLink href="https://github.com/DiegoLikesPizza" icon={Github} label="GitHub" />
                      <SocialLink href="https://www.linkedin.com/in/diego-göttler-25bb0339b" icon={Linkedin} label="LinkedIn" />
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="p-4 rounded-lg bg-background-secondary/30 border border-border">
                    <p className="text-xs font-mono text-foreground-muted">
                      <span className="text-accent-cyan">SYS:</span> Average response time
                    </p>
                    <p className="text-lg font-bold text-foreground mt-1">&lt; 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-foreground-muted text-sm font-mono">
                © {new Date().getFullYear()} Diego Göttler. System Status: <span className="text-green-400">Nominal</span>
              </p>
            </div>
            <p className="text-foreground-muted text-xs font-mono">
              <span className="text-accent-cyan">{"<"}</span>
              {" Built with Next.js & Tailwind "}
              <span className="text-accent-cyan">{"/>"}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
