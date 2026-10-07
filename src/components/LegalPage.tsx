import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/** Plain reading layout for the Impressum and the Datenschutzerklärung (German, like the law wants). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="top" lang="de" className="mx-auto max-w-[760px] px-6 pb-24 pt-32 md:px-10 md:pt-36">
      <Link
        href="/"
        className="link-wipe inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Zur Startseite
      </Link>
      <h1 className="mt-8 font-heading text-[clamp(2.2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">{title}</h1>
      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground-muted [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="!mt-12 font-heading text-xl font-semibold tracking-tight text-foreground">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="!mt-8 font-heading text-base font-semibold text-foreground">{children}</h3>;
}
