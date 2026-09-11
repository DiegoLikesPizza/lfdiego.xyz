import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type GuideSection = {
  /** Anchor id — also used by the "On this page" list. */
  id: string;
  /** Short label for the "01 / Label" marker and the table of contents. */
  label: string;
  title: string;
  lead?: ReactNode;
  content: ReactNode;
};

export type Guide = {
  slug: string;
  title: string;
  /** One or two words placing the guide, e.g. "Version control". */
  kicker: string;
  summary: string;
  icon: LucideIcon;
  sections: GuideSection[];
};
