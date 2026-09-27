# AI in the IDE

**Three ways AI shows up in your editor.** Most IDEs now ship AI features or support them through extensions: GitHub Copilot, JetBrains AI Assistant (with Junie), Claude Code, Cursor and others. They differ mainly in how much they do on their own.

| Mode | What it does | Best for |
|---|---|---|
| **Inline completion** | grey "ghost text" suggestions as you type; <kbd>Tab</kbd> accepts | boilerplate and obvious next lines |
| **Chat** | ask about selected code, errors or the project; it answers and proposes edits you apply | explaining code, writing a function or test, reviewing a diff |
| **Agent** | given a goal, it reads files, runs commands and edits across the project in several steps, asking for permission as it goes | multi-file changes, "make this test pass", migrations |

## Inline completion
Works best when the surrounding code says what you want: a good function name and signature, a comment describing the intent, similar code nearby. Accept word by word (<kbd>Ctrl</kbd>+<kbd>→</kbd> in both VS Code and IntelliJ) to take only the part you want. Treat it as a fast typist who doesn't know your requirements.

## Chat
- **Select code first**, then ask: "Why could this throw a NullPointerException?", "Write JUnit tests for the edge cases of this method", "Explain this regex".
- Paste the **exact error** and stack trace, not "it doesn't work".
- Reference files explicitly (`#file`, `@file` depending on the tool) so it sees the right context.
- Ask for a plan before code on anything non-trivial.

How to phrase requests so the answer is actually useful: [[ai-prompting/Prompting for Code]].

## Agents
An agent loop: read the relevant files → propose a plan → edit → run the build and tests → read the errors → fix → repeat. Good agents ask before running commands or touching files outside the project. Work with them like with a colleague:
1. Give a clear goal and the constraints ("don't change the public API", "use the existing `Money` class").
2. Let it explore and plan first; review the plan.
3. Keep changes on a branch and review the diff like any pull request ([[github/Code Review]]).
4. Make sure tests exist; they're how both of you know it works.
→ [[ai-prompting/Coding Agents]], [[ai-prompting/How Agents Work]]

## Keep your judgement switched on
- **Read suggestions before accepting them.** AI output can be plausible and wrong: invented methods, outdated APIs, subtle off-by-one errors ([[ai-prompting/Hallucinations]]).
- **Run the tests.** Compile errors are easy to spot; logic errors aren't.
- **You own the code** you commit, however it was written.
- **Check your company's policy** on which tools may see its code; some projects forbid sending code to external services, or require specific approved tools and settings ([[ai-prompting/Privacy and Safety]]).
- **Keep learning the basics.** Accepting code you don't understand makes you slower later, when you have to debug it.

## Project rules for AI tools
Many tools read a file with project conventions: `CLAUDE.md` (Claude Code), `.github/copilot-instructions.md` (Copilot), `AGENTS.md`, `.cursor/rules`. Put in it what a new colleague would need: how to build and test, code style, architecture rules, what not to touch. Commit it so every developer's assistant follows the same rules.
