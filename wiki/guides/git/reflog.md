# Reflog

Git logs every position `HEAD` (and each branch) has pointed to: commits, checkouts, resets, rebases, merges. This **reflog** is your undo history. After a bad `reset --hard`, a botched rebase or a deleted branch, the reflog shows the hash from before. Check it out and you're back.

## Rescue a commit after `reset --hard`
Two commits, then an accidental reset:
```sh
git reset --hard HEAD~1
```
```
HEAD is now at 8025ea8 Keep me
```
```sh
git log --oneline
```
```
8025ea8 Keep me
```
"Important work" is gone from the log. But not from the reflog:
```sh
git reflog
```
```
8025ea8 HEAD@{0}: reset: moving to HEAD~1
011664a HEAD@{1}: commit: Important work
8025ea8 HEAD@{2}: commit (initial): Keep me
```
`HEAD@{1}` = where HEAD was one move ago. Put a branch on it:
```sh
git switch -c rescue 'HEAD@{1}'
```
```
Switched to a new branch 'rescue'
```
```sh
git log --oneline
```
```
011664a Important work
8025ea8 Keep me
```
Recovered. (Or, to undo the reset on the same branch: `git reset --hard 011664a`.)

## Reading the reflog
| Entry | Means |
|---|---|
| `commit: …` | you committed |
| `commit (amend): …` | you amended (the entry before it is the old version) |
| `checkout: moving from main to feature` | you switched branches |
| `reset: moving to HEAD~1` | you reset |
| `rebase (start)`, `rebase (pick)`, `rebase (finish)` | the steps of a rebase (`pull --rebase (…)` for a pull) |
| `merge feature: Fast-forward` | a merge |

## Useful forms
```sh
git reflog                       # HEAD's reflog
git reflog show feature/login    # one branch's reflog
git log -g --oneline             # the reflog as a log (with -p for diffs)
git show 'main@{2}'              # main, two moves ago
git diff 'main@{1}' main         # what did the last pull/rebase change?
git switch --detach 'main@{yesterday}'   # main as it was yesterday (local time)
```
In PowerShell or zsh, quote `@{…}` so the shell leaves it alone.

## Undo a rebase
A rebase went wrong and you already finished it. Here's the reflog right after the `git pull --rebase` from [[git/Remotes]]:
```sh
git reflog -5
```
```
86f15c4 HEAD@{0}: pull --rebase (finish): returning to refs/heads/main
86f15c4 HEAD@{1}: pull --rebase (pick): C
4f53a20 HEAD@{2}: pull --rebase (pick): B
2f4688d HEAD@{3}: pull --rebase (start): checkout 2f4688dac5cb8f99a9b26b424279e312e2496703
f8fb81e HEAD@{4}: commit: C
```
The entry just before `(start)` is your branch before the rebase:
```sh
git reset --hard f8fb81e
```
(Right after the rebase, `git reset --hard ORIG_HEAD` does the same.)

## Limits
- The reflog is **local**. It's not pushed, and a fresh clone has an empty one.
- Entries expire: reachable ones after **90 days**, unreachable ones after **30 days** (`gc.reflogExpire`, `gc.reflogExpireUnreachable`). Then `git gc` may delete the objects.
- It only knows about **commits**. Uncommitted changes you discarded were never recorded. (One exception: changes you once staged exist as blobs; `git fsck --lost-found` can find them, without file names.)

## Finding dangling commits without the reflog
```sh
git fsck --lost-found
```
lists commits and blobs that nothing points to. A last resort, e.g. for a dropped stash: `git fsck --unreachable | grep commit`.
