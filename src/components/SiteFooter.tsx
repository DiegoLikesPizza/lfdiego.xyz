import Link from "next/link";
import { Logo } from "@/components/Logo";

/** On every page: the Impressum and the Datenschutzerklärung must always be one click away. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-5 px-6 py-10 md:flex-row md:px-10">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <p className="font-mono text-xs text-foreground-muted">© 2026 Diego Göttler</p>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/impressum/" className="link-wipe font-mono text-xs text-foreground-muted transition-colors hover:text-foreground">
            Impressum
          </Link>
          <Link href="/datenschutz/" className="link-wipe font-mono text-xs text-foreground-muted transition-colors hover:text-foreground">
            Datenschutz
          </Link>
          <a href="#top" className="link-wipe font-mono text-xs text-foreground-muted transition-colors hover:text-foreground">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}
