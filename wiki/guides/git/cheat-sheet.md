# Cheat Sheet

Every command on one page. Details behind each link.

## Setup
```sh
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
```
→ [[git/Installing and Setup]], [[git/Configuration]]

## Start
```sh
git init -b main                  # new repository here
git clone <url> [folder]          # copy an existing one
```

## Daily loop
```sh
git status                        # what changed?  (-s for short)
git diff                          # unstaged changes  (--staged: staged ones)
git add <file> | . | -p           # stage file / everything / hunks
git commit -m "Message"           # record
git pull --rebase                 # catch up
git push                          # share
```
→ [[git/Daily Workflow]], [[git/Staging in Detail]]

## Branches
```sh
git branch -vv                    # list with upstream and ahead/behind
git switch -c feature/x           # create and switch
git switch main                   # switch
git switch -                      # previous branch
git merge feature/x               # merge into current
git rebase main                   # replay current branch onto main
git branch -d feature/x           # delete (merged)
git push -u origin feature/x      # publish
git push origin --delete feature/x
```
→ [[git/Branches]], [[git/Merging]], [[git/Rebasing]]

## History
```sh
git log --oneline --graph --all
git log -p -- <file>              # changes to one file
git log -S "text"                 # when was text added/removed
git log --author=Ada --since="1 week ago"
git show <commit>                 # one commit
git blame -L 10,20 <file>         # who changed these lines
git bisect start HEAD v1.0 && git bisect run npm test
```
→ [[git/Searching History]], [[git/Bisect]]

## Undo
```sh
git restore <file>                # discard unstaged edits (gone!)
git restore --staged <file>       # unstage
git commit --amend                # fix last commit (not pushed)
git reset --soft HEAD~1           # uncommit, keep changes staged
git reset HEAD~1                  # uncommit, keep changes unstaged
git reset --hard HEAD~1           # uncommit and discard (careful)
git revert <commit>               # undo a pushed commit with a new one
git reflog                        # find "lost" commits
git merge --abort | rebase --abort | cherry-pick --abort
```
→ [[git/Undoing Changes]], [[git/Reset in Depth]], [[git/Reflog]]

## Clean up before a PR
```sh
git commit --fixup=<commit>
git rebase -i --autosquash main
git push --force-with-lease
```
→ [[git/Rewriting History]]

## Context switching
```sh
git stash push -u -m "msg" | git stash list | git stash pop
git cherry-pick <commit>
git worktree add -b hotfix ../repo-hotfix main
```
→ [[git/Stash]], [[git/Cherry-pick]], [[git/Worktrees]]

## Remotes
```sh
git remote -v
git fetch --prune
git log --oneline main..origin/main   # incoming
git log --oneline origin/main..main   # outgoing
git reset --hard origin/main          # make local = remote (careful)
```
→ [[git/Remotes]]

## Tags
```sh
git tag -a v1.2.0 -m "Release 1.2.0"
git push --follow-tags
git describe
```
→ [[git/Tags and Releases]]

## Reference syntax
| | |
|---|---|
| `HEAD~2` | two commits back |
| `HEAD^2` | second parent of a merge |
| `main..feature` | on feature, not on main |
| `main...feature` | diff since the branches split |
| `HEAD@{1}` | where HEAD was one move ago |
| `v1.2.0:src/app.js` | a file in a tagged version |

→ [[git/Refs and HEAD]]
