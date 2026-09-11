import type { LucideIcon } from "lucide-react";
import { BookOpen, ChartColumn, Clock, FileText, Timer } from "lucide-react";

export type Resource = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /**
   * Served by nginx next to this app rather than by Next.js, so it needs a
   * plain <a> (a full page load) — a client-side <Link> would 404.
   */
  outsideApp?: boolean;
};

/** Everything listed under “Resources” in the header, desktop and mobile. */
export const resources: Resource[] = [
  {
    label: "Wiki",
    description: "Visual guides to Git, Java, Kotlin, IDEs and AI prompting",
    href: "/wiki",
    icon: BookOpen,
  },
  {
    label: "Claude stats",
    description: "How much I use Claude, by the numbers",
    href: "/claude",
    icon: ChartColumn,
  },
  {
    label: "Clock",
    description: "A vertical rolling-digit clock",
    href: "/clock-app/",
    icon: Clock,
    outsideApp: true,
  },
  {
    label: "Focus Timer",
    description: "A cyberpunk terminal focus timer",
    href: "/focus-app/",
    icon: Timer,
    outsideApp: true,
  },
  {
    label: "Seminararbeit",
    description: "Die Geschichte des CERN — vom LEP zum LHC",
    href: "/seminararbeit/",
    icon: FileText,
    outsideApp: true,
  },
];

export function isResourceActive(resource: Resource, pathname: string) {
  return !resource.outsideApp && pathname.startsWith(resource.href);
}
