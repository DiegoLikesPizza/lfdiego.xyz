# Worktrees

A normal repository has one working directory, so one checked-out branch at a time. `git worktree` adds **more working directories to the same repository**, each with its own branch. No stashing, no second clone, no re-downloading history.

## Two branches checked out at once
You're in the middle of a feature; an urgent hotfix comes in:
```sh
git worktree add -b hotfix/login ../shop-hotfix main
```
```
Preparing worktree (new branch 'hotfix/login')
HEAD is now at f21e23a A
```
```sh
git worktree list
```
```
/home/ada/shop         f21e23a [main]
/home/ada/shop-hotfix  f21e23a [hotfix/login]
```
```sh
cd ../shop-hotfix
# fix, commit, push — your feature folder stays untouched
cd ../shop
git worktree remove ../shop-hotfix
```

## Commands
| Command | Does |
|---|---|
| `git worktree add ../dir branch` | check out an existing branch in a new folder |
| `git worktree add -b new ../dir start` | create a branch from `start` and check it out there |
| `git worktree add --detach ../dir v1.2.0` | look at a tag or commit |
| `git worktree list` | all worktrees |
| `git worktree remove ../dir` | delete the folder and its registration (refuses if it has uncommitted changes) |
| `git worktree prune` | forget worktrees whose folder you deleted by hand |

## Rules
- A branch can be checked out in **only one** worktree at a time. Git refuses `git switch main` in a second worktree if `main` is checked out elsewhere: `fatal: 'main' is already used by worktree at '…'`.
- All worktrees share one `.git` (objects, branches, stashes, config). A commit in one is immediately visible in the others.
- Put worktrees **next to** the main folder (`../shop-hotfix`), not inside it, or tools will index them twice.

## Great for
- **Hotfixes** while a feature is half done.
- **Reviewing** a pull request while keeping your work open: `git worktree add ../review origin/their-branch`.
- **Comparing** behaviour of two versions side by side (run the old and new build at once).
- **Long builds or test runs** in one folder while you keep coding in another.
- **AI coding agents** working in parallel: each agent gets its own worktree and branch, so they don't overwrite each other's files. → [[ai-prompting/Coding Agents]]

## Cost
A worktree needs disk space for the checked-out files (and `node_modules`, `build/` etc. if you build there), but not for history. Much cheaper than a second clone.
