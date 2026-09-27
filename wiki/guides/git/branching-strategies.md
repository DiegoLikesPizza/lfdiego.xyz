# Branching Strategies

How a team uses branches depends mostly on **how often it ships**. Pick the simplest model that works.

## The three common models
| | Trunk-based | GitHub flow | Git flow |
|---|---|---|---|
| Ship | continuously, many times a day | whenever a PR is merged | scheduled releases |
| Long-lived branches | `main` only | `main` only | `main` + `develop` (+ `release/*`, `hotfix/*`) |
| Feature branches | very short (hours) or none | short (days), one per PR | per feature, merged into `develop` |
| Unfinished work | behind feature flags | behind flags or not merged yet | on its feature branch |
| Good for | experienced teams with strong CI | most teams, web apps | versioned products (apps, libraries with several supported versions) |

## Trunk-based development
Everyone integrates into `main` ("trunk") at least daily, either directly or via tiny pull requests. `main` must always be releasable, so it needs:
- fast, reliable automated tests on every push ([[github/GitHub Actions]]),
- **feature flags** to hide incomplete features: the code ships, but is switched off,
- small changes. Big refactors are done in many steps.

Why: no long-lived branches → no painful merges; problems show up within hours.

## GitHub flow
1. Create a branch from `main` (`feature/dark-mode`).
2. Commit, push, open a **pull request** early.
3. Discuss, review, CI runs on every push.
4. Merge into `main` (squash, merge or rebase: [[github/Pull Requests]]).
5. Deploy `main` (often automatically).

That's it. It's what most GitHub projects do and what this wiki recommends by default.

## Git flow
```
main     ●────────────────●──────────────●     (only releases, tagged)
          \              / \            /
release    \        ●──●    \          /
            \      /         \        /
develop      ●──●──●──●───────●──●───●
               \     /
feature         ●──●
hotfix  (from main, merged into main and develop)
```
- `develop` collects finished features; `main` only gets release merges.
- A `release/1.3` branch stabilises a release (only bug fixes), then merges into `main` (tagged `v1.3.0`) and back into `develop`.
- `hotfix/*` branches start from `main` for urgent fixes.

Powerful for products that support several versions at once, heavy for a website that deploys every day. Its author himself recommends GitHub flow for continuously delivered software.

## Release branches without full Git flow
Supporting an old version (e.g. `1.x` while `2.x` is current)? Keep a `release/1.x` branch, fix bugs on `main` first, and [[git/Cherry-pick|cherry-pick]] them back with `-x`.

## Tags mark releases
Whatever the model, tag every release so you can always find, build and compare it: [[git/Tags and Releases]].

## Rules that help in any model
- Protect `main`: pull requests only, required reviews and CI ([[github/Protecting Main]]).
- Delete branches after merging (GitHub can do it automatically).
- Keep pull requests small: under ~400 changed lines gets real review.
- Rebase or merge `main` into your branch regularly.
- Name branches consistently ([[git/Branches]]).
