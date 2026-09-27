# Git vs GitHub

| | Git | GitHub |
|---|---|---|
| What | a version control **program** | a **website** (and company, owned by Microsoft since 2018) |
| Runs | on your machine, offline | in the cloud |
| Made | 2005, by Linus Torvalds for the Linux kernel | 2008 |
| Cost | free, open source | free for public and private repositories; paid plans add features for teams |
| Gives you | history, branches, merges | a shared remote, pull requests, code review, issues, Projects, Actions (CI/CD), Pages (hosting), Packages, security scanning, Copilot |

You can use Git without GitHub (a USB stick, your own server, GitLab). You can't really use GitHub without Git: it stores Git repositories.

## How they connect
Your local repository has a **remote** called `origin` pointing to GitHub. `git push` uploads commits to it, `git fetch`/`git pull` download them. → [[git/Remotes]]
```sh
git remote add origin git@github.com:ada/shop.git
git push -u origin main   # -u remembers where to push
```
Or let the GitHub CLI create the repository and push in one step:
```sh
gh auth login
gh repo create shop --public --source=. --push
```
→ [[github/GitHub CLI]]

## What lives where
| Only in Git (your repository) | Only on GitHub |
|---|---|
| commits, branches, tags | pull requests and their review comments |
| `.gitignore`, `.gitattributes` | issues, Projects, Discussions, wiki |
| hooks in `.git/hooks` | stars, forks, watchers |
| the reflog | Actions runs and logs, secrets |
|  | branch rules, collaborators, settings |

Files that GitHub reads **from** your repository: `README.md`, `LICENSE`, `.github/workflows/*.yml`, `.github/CODEOWNERS`, `.github/ISSUE_TEMPLATE/`, `.github/dependabot.yml`, `SECURITY.md`, `CONTRIBUTING.md`. → [[github/Repository Essentials]]

## GitHub's main areas
| Tab | For |
|---|---|
| **Code** | files, branches, commits, README, releases |
| **Issues** | bugs, tasks, ideas ([[github/Issues and Projects]]) |
| **Pull requests** | proposed changes, reviews ([[github/Pull Requests]]) |
| **Actions** | workflow runs ([[github/GitHub Actions]]) |
| **Projects** | boards and tables of issues |
| **Security** | Dependabot, secret and code scanning ([[github/Security]]) |
| **Insights** | contributors, traffic, dependency graph |
| **Settings** | collaborators, branch rules, Pages, secrets (admins only) |

## Keyboard shortcuts on github.com
| Key | Does |
|---|---|
| `?` | show all shortcuts |
| `/` or `s` | focus search |
| `t` | file finder in a repository |
| `.` | open the repository in the web editor (github.dev) |
| `y` | turn the URL into a permalink to this exact commit |
| `b` | blame view of a file |
| `g` then `c` / `i` / `p` / `a` | go to Code / Issues / Pull requests / Actions |
