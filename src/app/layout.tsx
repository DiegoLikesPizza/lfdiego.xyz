import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://lfdiego.xyz";
const TITLE = "Diego Göttler — Software Developer";
const DESCRIPTION =
  "Software developer from Bavaria, training as a Fachinformatiker (Anwendungsentwicklung) at MediaMarktSaturn. I build fast, reliable web apps with Next.js, TypeScript and Tailwind.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Diego Göttler", url: SITE_URL }],
  creator: "Diego Göttler",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Diego Göttler",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Structured data so search engines understand who this is.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Diego Göttler",
  url: SITE_URL,
  jobTitle: "Apprentice Software Developer (Fachinformatiker — Anwendungsentwicklung)",
  worksFor: {
    "@type": "Organization",
    name: "MediaMarktSaturn",
    url: "https://www.mediamarktsaturn.com",
  },
  alumniOf: {
    "@type": "Organization",
    name: "IT Service Hecker und Göttler GbR",
    url: "https://it-service-hg.de",
  },
  sameAs: [
    "https://github.com/DiegoLikesPizza",
    "https://www.linkedin.com/in/diego-göttler-25bb0339b",
  ],
  knowsAbout: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js"],
};

export const viewport: Viewport = {
  // A single (non-media) theme-color, kept in sync with the *actual* theme by
  // the pre-paint script and ThemeToggle — so the browser chrome follows a
  // manual toggle, not just the OS preference.
  themeColor: "#fafaf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Set the theme before paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',d?'#15140f':'#fafaf7')}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
