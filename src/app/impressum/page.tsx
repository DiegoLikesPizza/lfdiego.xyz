import type { Metadata } from "next";
import Link from "next/link";
import { H2, LegalPage } from "@/components/LegalPage";
import { LEGAL_UPDATED, OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Impressum — Diego Göttler",
  description: "Impressum von lfdiego.xyz.",
  alternates: { canonical: "/impressum/" },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <H2>Angaben gemäß § 5 DDG</H2>
      <p>
        <strong>{OPERATOR.name}</strong>
        <br />
        {OPERATOR.street}
        <br />
        {OPERATOR.city}
        <br />
        {OPERATOR.country}
      </p>

      <H2>Kontakt</H2>
      <p>
        E-Mail: <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
      </p>

      <H2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
      <p>
        {OPERATOR.name}, {OPERATOR.street}, {OPERATOR.city}
      </p>

      <H2>Geltungsbereich</H2>
      <p>
        Dieses Impressum gilt für lfdiego.xyz mit allen Unterseiten, darunter die Wikis unter /wiki/, der lfd hub unter /hub/ und die
        zugehörige Android-App, sowie für die Subdomains von lfdiego.xyz, soweit dort nichts anderes angegeben ist.
      </p>

      <H2>Verbraucherstreitbeilegung</H2>
      <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <H2>Haftung für Inhalte und Links</H2>
      <p>
        Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine
        Gewähr übernehmen. Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe; für diese
        Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Wird mir
        eine Rechtsverletzung bekannt, entferne ich den betreffenden Inhalt oder Link umgehend.
      </p>

      <H2>Urheberrecht</H2>
      <p>
        Die von mir erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung,
        Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedarf meiner schriftlichen Zustimmung, soweit nicht anders
        angegeben (z. B. bei Open-Source-Code mit eigener Lizenz).
      </p>

      <p className="!mt-12">
        Informationen zum Datenschutz: <Link href="/datenschutz/">Datenschutzerklärung</Link>
      </p>
      <p className="font-mono text-xs text-foreground-subtle">Stand: {LEGAL_UPDATED}</p>
    </LegalPage>
  );
}
