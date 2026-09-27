# Project Instructions

**Write it once, not every prompt.** Put the things you'd otherwise repeat into a project instructions file in the repository. The agent reads it at the start of each session.

## Which file?
| Tool | File |
|---|---|
| Claude Code | `CLAUDE.md` (repo root; also in subfolders and `~/.claude/CLAUDE.md` for personal defaults) |
| many agents (Codex, Cursor, Copilot, Gemini CLI and others) | `AGENTS.md`, a shared convention |
| GitHub Copilot | `.github/copilot-instructions.md` (also reads `AGENTS.md`) |
| Cursor | `.cursor/rules/` |
| Chat apps | project instructions / custom instructions in settings |

If you use several tools, keep one source of truth (e.g. `AGENTS.md`) and have the others point to it.

## A good example
```markdown
# Project notes for the agent

## Commands
npm run dev     # dev server on :3000
npm run lint    # must pass before committing
npm test        # vitest; run after every change

## Conventions
- TypeScript strict, no `any`
- Tailwind for styling; design tokens live in globals.css
- Components in src/components, one per file, named exports
- Never commit .env files

## Gotchas
- The site is a static export: no server actions, no API routes.
- Images must go through next/image with explicit width/height.
```

## What belongs in it
- **Commands**: build, test, lint, run, with what "passing" means.
- **Conventions** a newcomer would get wrong: naming, folder layout, the testing style, the error-handling pattern.
- **Gotchas**: things that look fine but break (static export, a legacy module you must not touch, a generated file).
- **Workflow rules**: "work on a branch", "never push", "ask before adding dependencies".

## What doesn't
- Things the agent can see instantly (the file tree, the obvious from `package.json`).
- Generic advice ("write clean code"): it adds tokens, not behaviour.
- Secrets. The file is committed and read into prompts.
- Long essays: it's read every session, so every line costs context ([[ai-prompting/Tokens and Context]]).

## Keep it alive
Treat it like code: review changes, keep it short, and **add a line every time the agent repeats a mistake**. "Use `pnpm`, not `npm`" once in the file saves telling it in every session.

## For chat assistants
The same idea works in Claude/ChatGPT/Gemini **projects**: instructions plus reference files (your style guide, your data model) attached to every chat in the project. See [[ai-prompting/System Prompts]] for writing good instructions.
