# Refs and HEAD

Hashes are hard to remember, so Git gives commits names: **refs**. A ref is a file that contains a commit hash (or, for `HEAD`, the name of another ref).

## Kinds of refs
| Ref | File | Moves when… |
|---|---|---|
| branch `main` | `.git/refs/heads/main` | you commit on it, merge into it, reset it |
| tag `v1.2.0` | `.git/refs/tags/v1.2.0` | never (that's the point) |
| remote-tracking `origin/main` | `.git/refs/remotes/origin/main` | you `fetch`/`pull`/`push` |
| `HEAD` | `.git/HEAD` | you switch branches or check out a commit |
| `ORIG_HEAD` | `.git/ORIG_HEAD` | set by `reset`, `merge`, `rebase` to where you were before |
| `FETCH_HEAD`, `MERGE_HEAD` | … | during fetch / merge |

## HEAD: "where you are now"
Normally `HEAD` points to a **branch**:
```sh
cat .git/HEAD
```
```
ref: refs/heads/main
```
When you commit, Git creates the commit with the current `HEAD` commit as parent, then moves the branch `HEAD` points to. `HEAD` itself doesn't change; it still says "main".

## Detached HEAD
If you check out a commit or tag directly, `HEAD` contains a hash instead of a branch name:
```sh
git checkout 5e2aab2
```
```
Note: switching to '5e2aab2'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 5e2aab2 A
```
Nothing is wrong: it's how you look at old versions. But commits you make here belong to **no branch**. Switch away and they're only reachable through the [[git/Reflog]]. Want to keep them? `git switch -c experiment` before switching away.

With `git switch`, detaching must be explicit (`git switch --detach v1.2.0`), which avoids doing it by accident.

## Relative references
| Syntax | Means |
|---|---|
| `HEAD~1` or `HEAD~` | the parent of HEAD |
| `HEAD~3` | three commits back, following first parents |
| `HEAD^2` | the **second** parent (of a merge commit: the branch that was merged in) |
| `main@{1}` | where `main` was one move ago (reflog) |
| `main@{yesterday}` | where `main` was yesterday (reflog, local only) |
| `@` | shorthand for `HEAD` |
| `v1.2.0^{commit}` | the commit a tag points to |
| `HEAD:src/app.js` | the file `src/app.js` in the HEAD commit |
| `:/fix rounding` | the youngest commit whose message matches "fix rounding" |

```
            HEAD~2      HEAD~1       HEAD
... ──●──────●────────────●───────────●  main
                                     /
                         ●──────────●  (HEAD^2 when HEAD is a merge)
```

## Ranges
| Syntax | Commits |
|---|---|
| `main..feature` | on `feature` but not on `main` (what would be merged) |
| `feature..main` | on `main` but not on `feature` (what you're missing) |
| `main...feature` | on either, but not both (in `log`); in `diff`: changes on `feature` since the merge base |
| `^main feature` | same as `main..feature` |

```sh
git log --oneline main..origin/main    # what the server has that you don't
git log --oneline origin/main..main    # what you'd push
```

## Moving refs by hand
You rarely need to, but:
```sh
git branch -f main 4f53a20          # point main at another commit (not the current branch)
git update-ref refs/heads/main 4f53a20
git symbolic-ref HEAD refs/heads/main
```
Normal commands (`reset`, `switch`, `merge`) do this for you. → [[git/Reset in Depth]]

## Packed refs
Repositories with thousands of branches or tags store them in one file, `.git/packed-refs`, instead of thousands of small files. That's why `ls .git/refs/tags` may look empty even though `git tag` lists many. Always use Git commands to read refs in scripts: `git rev-parse main`.
