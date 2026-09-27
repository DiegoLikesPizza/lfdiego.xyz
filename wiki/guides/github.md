# GitHub

**Git is the tool. GitHub is where your repository lives online.** Git works fine on its own, offline. GitHub adds a shared copy everyone can reach, plus everything around the code: pull requests and code review, issues, automation with Actions, releases, hosting and security scanning.

> Every workflow file in this guide is in `code/github/.github/workflows/` and passes **actionlint** 1.7. Screens and menus are described as of 2026.

## Learning path
| Step | Read | You'll be able to… |
|---|---|---|
| 1 | [[github/Git vs GitHub]] · [[github/Creating a Repository]] · [[github/Authentication]] | put a project on GitHub and push without password prompts |
| 2 | [[github/Forks and Cloning]] · [[github/Pull Requests]] · [[github/Code Review]] | contribute changes and review others' |
| 3 | [[github/Issues and Projects]] · [[github/Protecting Main]] | plan work and keep `main` safe |
| 4 | [[github/GitHub Actions]] · [[github/Workflow Syntax]] · [[github/Actions in Depth]] | test every push automatically |
| 5 | [[github/Secrets and Environments]] · [[github/Deploying with Actions]] · [[github/Reusable Workflows]] · [[github/Actions Security]] | deploy safely, share automation |
| 6 | [[github/Releases and Pages]] · [[github/Packages]] | publish versions, host sites and packages |
| 7 | [[github/Security]] · [[github/Repository Essentials]] · [[github/Organizations and Permissions]] | run a repository the way teams do |
| 8 | [[github/GitHub CLI]] · [[github/Searching GitHub]] · [[github/Open Source]] · [[github/Your Profile]] | work fast and contribute to other projects |

Stuck? [[github/Common Errors]]. Quick lookups: [[github/Cheat Sheet]], [[github/Glossary]].

## The pull request loop in one picture
![Anatomy of a pull request](github/img/pull-request-anatomy.png)

```sh
git switch -c fix/empty-cart          # 1. branch
git commit -am "Fix crash when cart is empty"
git push -u origin fix/empty-cart     # 2. push
gh pr create --fill                   # 3. open the PR (or use the link Git prints)
# 4. review + checks, push more commits to update the PR
gh pr merge --squash --delete-branch  # 5. merge
git switch main && git pull           # 6. clean up locally
```
Every step explained: [[github/Pull Requests]].

## Alternatives
GitLab and Bitbucket offer the same ideas under slightly different names (merge request = pull request, GitLab CI = Actions). Git itself is identical everywhere, so everything in the [[Git]] guide applies.
