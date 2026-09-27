# Git

**Git** is a version control system: it records snapshots of your project so you can go back to any earlier state, work on several things in parallel, and combine your work with other people's. Almost every software team uses it; GitHub, GitLab and Bitbucket are websites built around it (see [[GitHub]]).

> Every command output in this guide is real: it comes from `code/git/demo.sh`, which builds small example repositories with fixed names and dates, so the commit hashes you see are reproducible. Run with **Git 2.43**; only the temporary folder paths were shortened to `/home/ada/…`.

![Where a change lives: working directory, staging area, local repository, remote](git/img/four-stops.png)

## Learning path

| Step | Read | You'll be able to… |
|---|---|---|
| 1 | [[git/Installing and Setup]] · [[git/Mental Model]] | install Git and know what `add`, `commit` and `push` really do |
| 2 | [[git/Your First Repository]] · [[git/Daily Workflow]] | create a repository and use the five everyday commands |
| 3 | [[git/Staging in Detail]] · [[git/Viewing Changes]] · [[git/Commit Messages]] · [[git/Ignoring Files]] | make clean, focused commits |
| 4 | [[git/Branches]] · [[git/Merging]] · [[git/Rebasing]] · [[git/Merge Conflicts]] | work on features in parallel and bring them together |
| 5 | [[git/Remotes]] | collaborate through GitHub: fetch, pull, push |
| 6 | [[git/Undoing Changes]] · [[git/Reset in Depth]] · [[git/Reflog]] | undo (almost) any mistake |
| 7 | [[git/Searching History]] · [[git/Bisect]] | find out who changed what, when and why |
| 8 | [[git/Rewriting History]] · [[git/Stash]] · [[git/Cherry-pick]] · [[git/Worktrees]] | tidy commits before a pull request, switch context quickly |
| 9 | [[git/Objects and Internals]] · [[git/Refs and HEAD]] | understand what's inside `.git/` |
| 10 | [[git/Tags and Releases]] · [[git/Branching Strategies]] · [[git/Configuration]] · [[git/Hooks]] · [[git/Large Files and Submodules]] | set up a project the way teams do |

When something goes wrong, check [[git/Common Errors]] (paste the error message into the search). Quick lookups: [[git/Cheat Sheet]] and [[git/Glossary]].

## The five commands you'll type every day
```sh
git status                    # what changed?
git add src/cart.js           # stage one file (or everything: git add .)
git commit -m "Fix crash when cart is empty"
git pull --rebase             # get teammates' work first
git push                      # share your commits
```
Everything else is occasional. [[git/Daily Workflow]] shows what each one prints.

## Three ideas that make Git click
1. **A commit is a snapshot, not a diff.** Each commit records the whole project. Unchanged files are shared between commits, so it stays small. Diffs are calculated when you ask for them. → [[git/Objects and Internals]]
2. **A branch is a movable label.** Creating one costs 41 bytes (a hash and a newline in a file). → [[git/Branches]]
3. **Almost nothing committed is ever lost.** The reflog remembers every commit `HEAD` pointed to for 90 days. → [[git/Reflog]]

## Git versions
Git releases a new minor version about every three months. Everything here works with **Git 2.23+** (2019, when `git switch` and `git restore` arrived). Check yours:
```sh
git --version
```
```
git version 2.43.0
```

## Related
- [[GitHub]]: pull requests, code review, Actions
- [[IDEs/Git in the IDE]]: the same operations with buttons and a 3-way merge tool
