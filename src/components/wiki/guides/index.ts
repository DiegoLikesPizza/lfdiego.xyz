import type { Guide } from "../types";
import { gitGuide } from "./git";
import { githubGuide } from "./github";
import { javaGuide } from "./java";
import { javascriptGuide } from "./javascript";
import { kotlinGuide } from "./kotlin";
import { ideGuide } from "./ides";
import { promptingGuide } from "./ai-prompting";

/** Every guide, in reading order. The order drives numbering and prev/next. */
export const guides: Guide[] = [
  gitGuide,
  githubGuide,
  javaGuide,
  javascriptGuide,
  kotlinGuide,
  ideGuide,
  promptingGuide,
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
