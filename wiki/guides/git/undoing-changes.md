# Undoing Changes

Made a mistake? Find your situation, run the line. Almost nothing in Git is truly lost once it has been committed. The trick is picking the right tool for where the mistake lives.

## Find your situation
| I want to… | Command | Careful? |
|---|---|---|
| Throw away unstaged edits to a file | `git restore <file>` | **those edits are gone** |
| Throw away all unstaged edits | `git restore .` | **gone** |
| Delete untracked files | `git clean -n` (preview), then `git clean -f` | **gone**; `-d` for folders |
| Unstage a file but keep the changes | `git restore --staged <file>` | safe |
| Fix the message of my last commit | `git commit --amend -m "…"` | only before pushing |
| Add a forgotten file to my last commit | `git add f && git commit --amend --no-edit` | only before pushing |
| Undo my last commit, keep the changes staged | `git reset --soft HEAD~1` | only before pushing |
| Undo my last commit, keep the changes unstaged | `git reset HEAD~1` | only before pushing |
| Undo my last commit and throw its changes away | `git reset --hard HEAD~1` | **uncommitted work is gone** |
| Undo a commit that's already pushed | `git revert <commit>` | safe: adds a new commit |
| Undo a pushed merge | `git revert -m 1 <merge>` | safe |
| Get a file back as it was in a commit | `git restore --source=<commit> <file>` | overwrites the file |
| Get back a commit I "lost" | `git reflog`, then `git switch -c rescue <hash>` | safe ([[git/Reflog]]) |
| Undo a merge/rebase that went wrong (not pushed) | `git reset --hard ORIG_HEAD` | **uncommitted work is gone** |
| Stop a merge/rebase/cherry-pick in progress | `git merge --abort` / `rebase --abort` / `cherry-pick --abort` | safe |
| Committed to `main` instead of a branch | `git branch feature && git reset --hard origin/main && git switch feature` | see below |

## Working directory and staging area
```sh
git restore f.txt              # discard edits (working dir ← staging area)
git restore --staged f.txt     # unstage (staging area ← last commit)
git status --short
```
```
 M f.txt
```
`git restore` never touches commits. Uncommitted changes you discard are **not** in the reflog; they're really gone. When unsure, `git stash` instead: it's reversible ([[git/Stash]]).

## Revert: undo by adding a commit
For anything that's already pushed. `revert` creates a new commit that applies the **opposite** diff:
```sh
git revert --no-edit HEAD
```
```
[main f252c64] Revert "Three: breaks checkout"
 Date: Fri Jan 2 18:00:00 2026 +0100
 1 file changed, 1 insertion(+), 1 deletion(-)
```
```sh
git log --oneline
```
```
f252c64 Revert "Three: breaks checkout"
5fcc14a Three: breaks checkout
c67b957 Two
9ba3d36 One
```
History stays honest: the bad commit and its reversal are both visible, and nobody's copy is invalidated. Write a real message saying *why* (drop `--no-edit`, or amend it before pushing):
```sh
git commit --amend -m "Revert the checkout change (bug #31)"
```
```
[main ee7292f] Revert the checkout change (bug #31)
 Date: Fri Jan 2 18:00:00 2026 +0100
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## Reset: undo by moving the branch
For commits that exist **only on your machine**. `git reset <commit>` moves the current branch back to `<commit>`; the three modes decide what happens to the changes. Full explanation with real output: [[git/Reset in Depth]].

## "I committed to main instead of a feature branch"
Not pushed yet:
```sh
git branch feature/login          # keep a label on your commits
git reset --hard origin/main      # move main back to the server's state
git switch feature/login          # continue there
```
Your commits are safe on `feature/login`; `main` is clean again.

## "I committed secrets"
Not pushed: `git reset --soft HEAD~1`, remove the file, add it to `.gitignore`, commit again.
Pushed: **revoke the secret first** (it's compromised: bots scan GitHub within minutes), then remove it from history ([[git/Rewriting History]]).

## "I deleted a branch"
```sh
git reflog | grep feature/login     # or look for its last commit message
git branch feature/login <hash>
```
`git branch -d`/`-D` prints the hash it deleted, too: `Deleted branch feature/login (was 50ab89b).`

## The safety net
Committed work is kept for at least 30 days (unreachable) to 90 days (reachable from the reflog). The [[git/Reflog]] page shows how to find it. What Git **can't** give back: uncommitted changes you discarded with `restore`, `reset --hard`, `checkout -- file` or `clean`. So when in doubt: **commit or stash first, then experiment.**
