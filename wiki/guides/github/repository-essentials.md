# Repository Essentials

The files that make a repository easy to pick up. GitHub recognises most of them and shows them in the right places.

| File | Why it's there |
|---|---|
| `README.md` | the front page: what it is, how to run it, how to contribute |
| `LICENSE` | without one, nobody may legally reuse your code, even if it's public |
| `.gitignore` | keeps `node_modules`, build output and secrets out ([[git/Ignoring Files]]) |
| `.gitattributes` | line endings, binary files, LFS ([[git/Configuration]]) |
| `.github/workflows/` | Actions workflows: tests, linting, deploys ([[github/GitHub Actions]]) |
| `CONTRIBUTING.md` | how to set up, branch naming, how PRs get reviewed |
| `CODE_OF_CONDUCT.md` | expected behaviour in the community |
| `SECURITY.md` | how to report vulnerabilities ([[github/Security]]) |
| `.github/ISSUE_TEMPLATE/` | forms that make bug reports useful ([[github/Issues and Projects]]) |
| `.github/pull_request_template.md` | the default PR description ([[github/Pull Requests]]) |
| `.github/CODEOWNERS` | automatic reviewers per path ([[github/Code Review]]) |
| `.github/dependabot.yml` | dependency updates |
| `CHANGELOG.md` | what changed in each version |
| `.editorconfig` | indentation and line endings for every editor ([[IDEs/Project Setup]]) |

Organization-wide defaults (templates, CONTRIBUTING, SECURITY) can live in a repository named `.github`.

## A good README
```markdown
# Shop

A small web shop for local businesses: products, cart, Stripe checkout.

![Screenshot](docs/screenshot.png)

## Features
- Product catalogue with categories
- Cart and checkout (Stripe)
- Admin area for orders

## Quick start
    npm install
    cp .env.example .env    # add your Stripe test key
    npm run dev             # http://localhost:3000

## Tech
Next.js 16, TypeScript, Tailwind, PostgreSQL

## Deployment
Every push to main deploys via GitHub Actions (see .github/workflows/deploy.yml).

## License
MIT
```
Checklist: **what** (one sentence), **screenshot** or demo link, **how to run** in copy-paste commands, **how to test**, **how it's deployed**, license. Badges (CI status, version) are nice extras.

## Licenses
No license = "all rights reserved": others may look, not reuse. Common choices (*Add file → LICENSE* offers templates):
| License | In short |
|---|---|
| **MIT** | do anything, keep the copyright notice. Most popular |
| **Apache-2.0** | like MIT plus an explicit patent grant |
| **GPL-3.0** | derived works must also be GPL (copyleft) |
| **AGPL-3.0** | GPL that also applies to software offered over a network |
| none / proprietary | client work, company code: keep the repository private |

Client websites: the contract decides who owns the code; usually the repository stays private and belongs to the client or your company.

## CONTRIBUTING.md
Answer the questions a new contributor has:
- How do I set up the project and run the tests?
- Branch naming, commit message style ([[git/Commit Messages]]).
- How do PRs get reviewed and merged?
- Is a CLA (contributor licence agreement) or `Signed-off-by` needed?

## Never commit secrets
Put API keys in environment variables locally (`.env`, ignored) and in repository secrets for workflows (`${{ secrets.API_KEY }}`). Commit a `.env.example` with dummy values so people know which variables exist. If a key does get pushed, **rotate it immediately**: deleting the commit doesn't help, it's already been seen.

## About section and topics
The repository's *About* box (gear icon): description, website URL, **topics** (`nextjs`, `ecommerce`, `kotlin`). Topics make projects discoverable in GitHub search and topic pages.
