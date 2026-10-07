import type { Metadata } from "next";
import Link from "next/link";
import { H2, H3, LegalPage } from "@/components/LegalPage";
import { LEGAL_UPDATED, OPERATOR } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Diego Göttler",
  description: "Wie lfdiego.xyz, die Wikis, der lfd hub und die lfd-hub-App mit personenbezogenen Daten umgehen.",
  alternates: { canonical: "/datenschutz/" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch von <strong>lfdiego.xyz</strong> verarbeitet werden. Sie gilt
        für die Website mit allen Unterseiten, die Wikis unter /wiki/, den <strong>lfd hub</strong> unter /hub/ und die dazugehörige
        Android-App. Ich setze keine Analyse- oder Werbe-Tracker ein und verkaufe keine Daten.
      </p>

      <H2>1. Verantwortlicher</H2>
      <p>
        {OPERATOR.name}
        <br />
        {OPERATOR.street}
        <br />
        {OPERATOR.city}, {OPERATOR.country}
        <br />
        E-Mail: <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
      </p>
      <p>Ein Datenschutzbeauftragter ist nicht bestellt, da keine gesetzliche Pflicht dazu besteht.</p>

      <H2>2. Hosting</H2>
      <p>
        Die Website und alle Anwendungen laufen auf einem Server der <strong>Hetzner Online GmbH</strong>, Industriestr. 25, 91710
        Gunzenhausen, in einem Rechenzentrum in Nürnberg. Hetzner verarbeitet die Daten ausschließlich in meinem Auftrag
        (Auftragsverarbeitung nach Art. 28 DSGVO). Rechtsgrundlage ist mein berechtigtes Interesse an einem sicheren und zuverlässigen
        Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <H2>3. Cloudflare (Auslieferung und Schutz)</H2>
      <p>
        Alle Anfragen an lfdiego.xyz laufen über das Netzwerk der <strong>Cloudflare, Inc.</strong>, 101 Townsend St., San Francisco, CA
        94107, USA. Cloudflare leitet die Anfragen an meinen Server weiter, schützt ihn vor Angriffen (z. B. DDoS) und beschleunigt die
        Auslieferung. Dabei verarbeitet Cloudflare technische Verbindungsdaten wie IP-Adresse, Zeitpunkt, aufgerufene Adresse und
        Browser-Kennung. Zur Abwehr von Bots kann Cloudflare technisch notwendige Cookies setzen (z. B. <code>__cf_bm</code>, Laufzeit 30
        Minuten).
      </p>
      <p>
        Rechtsgrundlage ist mein berechtigtes Interesse an der Sicherheit und Verfügbarkeit der Website (Art. 6 Abs. 1 lit. f DSGVO).
        Cloudflare handelt als Auftragsverarbeiter. Eine Übermittlung in die USA ist möglich; Cloudflare ist unter dem EU-US Data Privacy
        Framework zertifiziert (Angemessenheitsbeschluss der EU-Kommission, Art. 45 DSGVO), zusätzlich gelten die
        EU-Standardvertragsklauseln. Weitere Informationen:{" "}
        <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank">
          cloudflare.com/privacypolicy
        </a>
        .
      </p>

      <H2>4. Server-Logdateien</H2>
      <p>Bei jedem Aufruf speichert der Webserver (nginx) automatisch:</p>
      <ul>
        <li>IP-Adresse (bei Aufrufen über Cloudflare die von Cloudflare übermittelte Adresse)</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite oder Datei, HTTP-Statuscode und übertragene Datenmenge</li>
        <li>Referrer-URL (die zuvor besuchte Seite) und Browser-Kennung (User-Agent)</li>
      </ul>
      <p>
        Diese Daten brauche ich, um die Website auszuliefern, Fehler zu finden und Missbrauch abzuwehren (Art. 6 Abs. 1 lit. f DSGVO). Sie
        werden nicht mit anderen Daten zusammengeführt und nach <strong>14 Tagen</strong> automatisch gelöscht.
      </p>

      <H2>5. Schriftarten, Inhalte von Dritten, Cookies</H2>
      <p>
        Die verwendeten Schriftarten werden von meinem eigenen Server geladen; beim Besuch wird keine Verbindung zu Google oder anderen
        Schriftanbietern aufgebaut. Es werden keine externen Videos, Karten, Social-Media-Plugins oder Analyse-Dienste eingebunden. Links zu
        anderen Websites (z. B. GitHub, LinkedIn) sind normale Links; erst beim Anklicken gelangen Sie zum jeweiligen Anbieter.
      </p>
      <p>
        Die Website speichert im lokalen Speicher Ihres Browsers (localStorage), ob Sie das helle oder dunkle Design gewählt haben. Diese
        Einstellung verlässt Ihr Gerät nicht. Das Speichern ist für den von Ihnen gewünschten Dienst unbedingt erforderlich (§ 25 Abs. 2
        Nr. 2 TDDDG) und kann jederzeit über die Browser-Einstellungen gelöscht werden. Kleine Web-Apps unter lfdiego.xyz (z. B. Uhr- oder
        Fokus-App) speichern ihre Einstellungen auf die gleiche Weise nur lokal.
      </p>

      <H2>6. Kontakt per E-Mail</H2>
      <p>
        Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Adresse und den Inhalt, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b
        bzw. f DSGVO). Mein E-Mail-Postfach wird von der <strong>Zoho Corporation B.V.</strong>, Beneluxlaan 4B, 3527 HT Utrecht,
        Niederlande, in Rechenzentren in der EU betrieben (Auftragsverarbeitung). E-Mails lösche ich, sobald sie nicht mehr gebraucht
        werden und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <H2>7. Wikis</H2>
      <p>
        Die Wikis unter /wiki/ sind ohne Anmeldung lesbar. Beim Lesen werden nur die unter Nr. 3 und 4 genannten Daten verarbeitet. Die
        Suche läuft auf meinem Server; Suchbegriffe werden nicht gespeichert oder ausgewertet. Ein Login gibt es nur für mich als Betreiber.
      </p>

      <H2>8. lfd hub (Nutzerkonten)</H2>
      <p>
        Der lfd hub unter /hub/ ist ein privater Bereich für eingeladene Personen. Ein Konto lässt sich nur über einen persönlichen
        Einladungslink anlegen.
      </p>
      <H3>Welche Daten</H3>
      <ul>
        <li>
          <strong>Konto:</strong> Benutzername, Passwort (nur als Argon2-Hash gespeichert, nie im Klartext), Zeitpunkt der Registrierung,
          freigeschaltete Werkzeuge.
        </li>
        <li>
          <strong>Anmeldung:</strong> ein Sitzungs-Cookie (<code>hub_session</code>, HttpOnly, 30 Tage) im Browser bzw. ein Anmelde-Token in
          der App (90 Tage). Beim Abmelden wird die Sitzung gelöscht.
        </li>
        <li>
          <strong>Inhalte, die Sie selbst eingeben:</strong> z. B. Noten (Notenübersicht), Erinnerungen, Watchlist, OOP-Planungsprojekte,
          Terminumfragen (Find a date) und Antworten darauf, Spielstände, Spielzüge und Chatnachrichten in Mehrspieler-Spielen sowie
          Spielgeld-Einsätze bei Lucky Chances.
        </li>
        <li>
          <strong>Benachrichtigungen:</strong> die Einträge in Ihrer Benachrichtigungsliste, welche Arten Sie stummgeschaltet haben, und
          (wenn Sie Push erlauben) die Push-Adresse Ihres Browsers bzw. Geräts (siehe Nr. 9).
        </li>
        <li>Technisch: Zeitpunkte von Änderungen und, bei Spielen, wann Sie eine Partie zuletzt geöffnet haben.</li>
      </ul>
      <H3>Wer sieht was</H3>
      <p>
        Ihre Noten, Erinnerungen und Ihre Watchlist sind nur für Sie sichtbar, auch nicht für Administratoren. Andere Mitglieder des Hubs
        sehen Ihren <strong>Benutzernamen</strong> (z. B. in Bestenlisten, bei Einladungen zu Spielen oder Umfragen), Ihre Spielstände in
        Bestenlisten sowie alles, was Sie in einer gemeinsamen Partie, Umfrage oder einem geteilten OOP-Projekt selbst eintragen – jeweils nur
        für die Beteiligten.
      </p>
      <H3>Zweck, Rechtsgrundlage, Speicherdauer</H3>
      <p>
        Die Verarbeitung dient dazu, Ihnen die Funktionen des Hubs bereitzustellen (Art. 6 Abs. 1 lit. b DSGVO). Das Sitzungs-Cookie ist
        dafür unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Die Daten bleiben gespeichert, bis Sie sie löschen oder Ihr Konto gelöscht
        wird; schreiben Sie mir dazu einfach eine E-Mail. Benachrichtigungen werden auf die letzten 200 pro Konto begrenzt. Zur
        Datensicherung wird die Datenbank täglich gesichert; Sicherungen werden nach <strong>7 Tagen</strong> überschrieben.
      </p>
      <p>Der Browser speichert außerdem kleine Einstellungen (z. B. Filter, Design, Steuerung in Spielen) lokal im localStorage.</p>

      <H2>9. Push-Benachrichtigungen</H2>
      <p>
        Auf Wunsch benachrichtigt der Hub Sie, wenn Sie in einem Spiel am Zug sind, eingeladen werden oder ein Termin feststeht. Push wird
        nur aktiviert, wenn Sie es ausdrücklich erlauben (Browser- bzw. Android-Abfrage); Rechtsgrundlage ist Ihre Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit widerrufen: im Hub unter „Account“, in den App-Einstellungen oder
        in den Einstellungen Ihres Browsers bzw. Telefons.
      </p>
      <ul>
        <li>
          <strong>Im Browser (Web Push):</strong> Die Nachricht wird über den Push-Dienst Ihres Browserherstellers zugestellt (z. B. Google
          für Chrome und Edge, Mozilla für Firefox, Apple für Safari). Der Inhalt ist dabei Ende-zu-Ende verschlüsselt; der Push-Dienst
          sieht nur technische Zustelldaten.
        </li>
        <li>
          <strong>In der Android-App:</strong> Die Zustellung erfolgt über Firebase Cloud Messaging der{" "}
          <strong>Google Ireland Limited</strong>, Gordon House, Barrow Street, Dublin 4, Irland. Dafür wird ein Geräte-Token gespeichert;
          Titel und Text der Benachrichtigung (z. B. „Du bist am Zug in Schach“) laufen über Google. Eine Übermittlung an die Google LLC in
          den USA ist möglich; Google ist unter dem EU-US Data Privacy Framework zertifiziert.
        </li>
      </ul>
      <p>Beim Abmelden wird die Push-Adresse des Geräts gelöscht.</p>

      <H2>10. Android-App „lfd hub“</H2>
      <p>
        Die App wird direkt von meinem Server heruntergeladen (nicht über einen App-Store) und fragt dort regelmäßig nach Updates. Sie
        speichert Ihre Anmeldung sowie eine Offline-Kopie Ihrer Noten und Erinnerungen auf dem Gerät; beim Abmelden wird diese Kopie gelöscht.
        Die tägliche Erinnerung wird lokal auf dem Telefon geplant. Die App enthält keine Tracking- oder Werbe-Bibliotheken. Für Push gilt Nr.
        9.
      </p>

      <H2>11. Ihre Rechte</H2>
      <p>Sie haben jederzeit das Recht auf</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung (Art. 16) und Löschung (Art. 17),</li>
        <li>Einschränkung der Verarbeitung (Art. 18) und Datenübertragbarkeit (Art. 20),</li>
        <li>
          <strong>Widerspruch</strong> gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO),
        </li>
        <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
      </ul>
      <p>
        Eine E-Mail an <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a> genügt. Außerdem können Sie sich bei einer
        Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), z. B. beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA),
        Promenade 18, 91522 Ansbach,{" "}
        <a href="https://www.lda.bayern.de" rel="noopener noreferrer" target="_blank">
          lda.bayern.de
        </a>
        .
      </p>

      <H2>12. Sicherheit</H2>
      <p>
        Alle Verbindungen sind per TLS (HTTPS) verschlüsselt. Es findet keine automatisierte Entscheidungsfindung oder Profilbildung im
        Sinne von Art. 22 DSGVO statt.
      </p>

      <H2>13. Änderungen</H2>
      <p>
        Wenn sich die Website oder die Rechtslage ändert, passe ich diese Erklärung an. Es gilt die jeweils hier veröffentlichte Fassung.
      </p>

      <p className="!mt-12">
        Anbieterkennzeichnung: <Link href="/impressum/">Impressum</Link>
      </p>
      <p className="font-mono text-xs text-foreground-subtle">Stand: {LEGAL_UPDATED}</p>
    </LegalPage>
  );
}
