# Creating a Repository

## Public or private?
| | Public | Private |
|---|---|---|
| Who can see it | everyone | you and people you invite |
| Who can push | only collaborators | only collaborators |
| Actions minutes | unlimited on GitHub-hosted runners | 2,000 min/month on the free plan |
| Good for | open source, portfolio projects | client work, anything with business data |

Public doesn't mean anyone can change your code: they can only fork it and propose changes. But **everything** in a public repository's history is visible, including secrets you committed once.

## On the website
*+* → *New repository*:
1. **Owner** (you or an organization) and **name** (`shop`, lowercase, hyphens).
2. Description, Public/Private.
3. Initialise with a README, `.gitignore` template and license **only if you have no local project yet**. Otherwise leave everything empty: a README created on GitHub plus a local `git init` gives two unrelated histories ([[git/Common Errors]]).

Then follow the commands GitHub shows:
```sh
git remote add origin git@github.com:ada/shop.git
git branch -M main
git push -u origin main
```

## From the terminal
```sh
gh repo create shop --private --source=. --remote=origin --push
```
→ [[github/GitHub CLI]]

## From a template
A repository marked as *Template repository* (Settings → General) gets a **Use this template** button: new repositories start with its files but a fresh history. Great for a company's standard project setup, e.g. a website starter with CI, linting and a deploy workflow already configured.

## Importing from elsewhere
- From GitLab/Bitbucket with full history: `git clone --mirror <old-url>`, then `git push --mirror <new-github-url>`.
- GitHub's importer (*+* → *Import repository*) does the same from a URL.

## First settings worth changing
| Setting | Where | Why |
|---|---|---|
| Default branch = `main` | Settings → General | consistent naming |
| Allowed merge methods | Settings → General → Pull Requests | e.g. only *Squash* ([[github/Pull Requests]]) |
| Automatically delete head branches | same place | no pile of merged branches |
| Branch ruleset for `main` | Settings → Rules | require PRs and green CI ([[github/Protecting Main]]) |
| Dependabot, secret scanning | Settings → Code security | [[github/Security]] |
| Collaborators | Settings → Collaborators | invite people with the right role ([[github/Organizations and Permissions]]) |

## Renaming, transferring, archiving, deleting
- **Rename**: Settings → General. GitHub redirects the old URL, but update your remote anyway: `git remote set-url origin <new-url>`.
- **Transfer** to an organization or another user: Settings → Danger Zone. Issues, PRs, stars move along.
- **Archive**: read-only, clearly marked as no longer maintained. Reversible.
- **Delete**: permanent after a short grace period. Forks survive.
