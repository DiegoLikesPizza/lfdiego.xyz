# Open Source

Your first contribution, step by step. Maintainers are volunteers with limited time; following the project's process is the fastest way to get merged.

1. **Find an issue.** Filter by labels like `good first issue` or `help wanted` (`is:open label:"good first issue" language:kotlin`). Check that nobody is already on it.
2. **Read CONTRIBUTING.md.** Setup, code style, test commands, commit message rules, and whether a CLA is needed.
3. **Say you're working on it.** A short comment avoids duplicate work, and maintainers can steer you early.
4. **Fork, branch, change.** Keep it focused on that one issue. Add or update tests.
   ```sh
   gh repo fork owner/project --clone
   git switch -c fix/1234-null-price
   ```
5. **Open a clear PR.** Link the issue (`Fixes #1234`), explain the change, and make sure checks pass. The first workflow run of a new contributor may need a maintainer's approval.
6. **Iterate patiently.** Respond to review, push fixes to the same branch, and give maintainers time. A friendly ping after a week or two is fine.

Details on forks and keeping them current: [[github/Forks and Cloning]].

## Not just code
Documentation fixes, reproducing bugs, answering questions in issues and improving tests are all real, valued contributions, and a great way to learn a codebase. A typo fix in docs is a perfectly good first PR.

## Before a big change, ask first
Open an issue or discussion describing the idea. A large, unasked-for PR that doesn't fit the project's direction is likely to be closed, however good the code.

## Writing a bug report maintainers love
- A **minimal reproduction**: the smallest code or repository that shows the bug.
- Exact versions (library, language, OS).
- What you expected, what happened, full error output as text.
- What you already tried.
→ [[github/Issues and Projects]]

## Etiquette
- Search existing issues before opening one.
- Don't "+1" issues; use the 👍 reaction.
- Don't @mention maintainers for attention or open PRs that only reformat code.
- AI-generated PRs: many projects restrict or require disclosure of them. Understand and test every line you submit; you're responsible for it, not the tool.
- Be patient and kind. Thank people.

## Maintaining your own open-source project
- README with a clear purpose and quick start, a LICENSE, CONTRIBUTING.md ([[github/Repository Essentials]]).
- Issue forms and labels, `good first issue` for newcomers.
- CI on PRs, Dependabot, branch rules.
- Releases with notes ([[github/Releases and Pages]]).
- It's fine to say no, and to set expectations ("maintained in my spare time").

## Why contribute?
You learn how real, larger codebases are organised, get code review from experienced developers, and build a public track record. For an apprenticeship or job application, a few merged PRs in known projects say more than a CV line. → [[github/Your Profile]]
