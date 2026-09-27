# Reset in Depth

`git reset <commit>` **moves the current branch** to `<commit>`. The mode decides whether the staging area and your files follow.

| `git reset …` | Moves the branch | Clears staging | Clears your files |
|---|---|---|---|
| `--soft HEAD~1` | yes | no: changes stay staged | no |
| `--mixed HEAD~1` (default) | yes | yes: changes become unstaged | no |
| `--hard HEAD~1` | yes | yes | **yes: uncommitted work is gone** |

Think of the three stops from the [[git/Mental Model]]: `--soft` moves only the repository, `--mixed` also resets the staging area, `--hard` resets all three.

## Starting point
Two commits, "One" (`f.txt` = `v1`) and "Two" (`f.txt` = `v2`).

## `--soft`: uncommit, keep everything staged
```sh
git reset --soft HEAD~1
git status --short
```
```
M  f.txt
```
The commit "Two" is gone from the branch; its change is staged, ready to be committed again (e.g. with a better message, or together with more changes). Use it to **squash your last few commits**:
```sh
git reset --soft HEAD~3 && git commit -m "Add login form"
```

## `--mixed` (default): uncommit and unstage
```sh
git reset HEAD~1
```
```
Unstaged changes after reset:
M	f.txt
```
```sh
git status --short
```
```
 M f.txt
```
The change is in your working directory, not staged. Use it to **redo a commit differently**, e.g. split it into several with `git add -p`.

## `--hard`: uncommit and throw away
```sh
echo "v3 not committed" > f.txt
git reset --hard HEAD~1
```
```
HEAD is now at 9ba3d36 One
```
```sh
cat f.txt
```
```
v1
```
```sh
git status --short
```
(no output: clean). The commit "Two" **and** the uncommitted `v3` edit are gone. The commit can be rescued through the [[git/Reflog]]; the uncommitted edit can't.

> Before `--hard`, run `git status`. If anything is modified that you might want, `git stash` first.

## Reset to a remote state
"Make my branch exactly like the server's":
```sh
git fetch
git reset --hard origin/main
```
Your local commits on that branch disappear from it (reflog still has them).

## Reset a single file
With a path, `reset` doesn't move the branch; it only updates the staging area for that file:
```sh
git reset HEAD f.txt           # old way to unstage = git restore --staged f.txt
git reset a1f3 -- f.txt        # stage f.txt as it was in a1f3
```
Modern Git has clearer commands for this: `git restore --staged f.txt` and `git restore --source=a1f3 --staged --worktree f.txt`.

## reset vs revert vs restore vs checkout
| Command | Changes | Rewrites history? | For |
|---|---|---|---|
| `git reset` | where the branch points (+ staging, files) | yes | local commits |
| `git revert` | adds an inverse commit | no | pushed commits |
| `git restore` | files in working dir / staging area | no | uncommitted changes |
| `git switch` / `checkout` | which branch/commit you're on | no | moving around |

## ORIG_HEAD
Dangerous operations (`reset`, `merge`, `rebase`, `am`) save the previous position in `ORIG_HEAD`. Right after a bad one:
```sh
git reset --hard ORIG_HEAD
```
