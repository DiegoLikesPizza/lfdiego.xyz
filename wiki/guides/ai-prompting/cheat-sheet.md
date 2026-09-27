# Cheat Sheet

## The five parts
**Context** · **Task** · **Constraints** · **Format** · **Example** ([[ai-prompting/Anatomy of a Prompt]])

## Phrases that help
| Goal | Say |
|---|---|
| fewer assumptions | "Ask me anything unclear before you start." |
| plan first | "Outline your plan and wait for my OK before writing code." |
| limited change | "Change only X. Keep everything else exactly as it is." |
| honest uncertainty | "If you're not sure, say so rather than guessing." |
| grounded answer | "Use only the document below. Quote the sentence that supports each point." |
| better debugging | "List the likely causes first, most likely first, then the smallest fix." |
| self-check | "Review your answer for edge cases and bugs." |
| usable output | "Reply with one file." / "JSON only, matching: …" / "a table with columns …" |
| right level | "Explain for someone who knows [X] but not [Y]." |
| counter-view | "Argue against this as a sceptical expert." |
| length | "Max 100 words." / "Code only, no explanation." |

## Before you send
- [ ] Versions and stack stated?
- [ ] Real material pasted (error, code, data), fenced with tags?
- [ ] What "done" means?
- [ ] What must not change?
- [ ] Format?
- [ ] No secrets, no personal data?

## After you get it
- [ ] Read all of it.
- [ ] Run it, test it.
- [ ] Unknown APIs/flags checked in the docs.
- [ ] `git diff` reviewed.
- [ ] Follow-up is precise: problem + fix + what to keep ([[ai-prompting/The Loop]]).

## Agents
Explore → plan → build → verify → commit. Clean working tree, tight permissions, test commands in `CLAUDE.md`/`AGENTS.md` ([[ai-prompting/Coding Agents]]).

## Rules of thumb
- ≈ 4 characters per token in English; more for code and German.
- New task → new chat.
- Fluent ≠ correct.
- You own what you merge.
