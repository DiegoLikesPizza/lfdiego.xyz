# Common Errors

Paste the error into the search. Every message from Git itself was copied from a real Git 2.43 run (most of them by `code/git/demo.sh`); the few that come from GitHub's servers are quoted from GitHub and marked *(GitHub)*.

## `fatal: not a git repository (or any of the parent directories): .git`
You're not inside a repository. `cd` into the project folder (the one containing `.git/`), or create one with `git init` / `git clone`.

## `! [rejected] main -> main (fetch first)` / `failed to push some refs`
```
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:ada/shop.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```
Someone pushed before you. Get their work, then push:
```sh
git pull --rebase
git push
```
Variant `(non-fast-forward)`: your branch is behind its remote counterpart, often after you rebased. If it's **your own** feature branch: `git push --force-with-lease`. If it's `main`: pull, never force. → [[git/Remotes]]

## `Your branch and 'origin/main' have diverged`
```
Your branch and 'origin/main' have diverged,
and have 2 and 1 different commits each, respectively.
```
Both you and the server have new commits. `git pull --rebase` (or `git pull` to merge). → [[git/Remotes]]

## `error: Your local changes to the following files would be overwritten by checkout`
```
error: Your local changes to the following files would be overwritten by checkout:
	a.txt
Please commit your changes or stash them before you switch branches.
Aborting
```
Your uncommitted edits would be lost by switching. Commit them, `git stash` them ([[git/Stash]]), or throw them away with `git restore a.txt`. The same message exists for `merge` and `pull`.

## `You are in 'detached HEAD' state`
Not an error: you checked out a commit or tag instead of a branch. Look around freely. To keep new commits, `git switch -c new-branch`. To go back, `git switch -`. → [[git/Refs and HEAD]]

## `CONFLICT (content): Merge conflict in greet.js`
```
Auto-merging greet.js
CONFLICT (content): Merge conflict in greet.js
Automatic merge failed; fix conflicts and then commit the result.
```
Both sides changed the same lines. Edit the file, `git add` it, `git commit` (or `git rebase --continue`). → [[git/Merge Conflicts]]

## `error: could not apply b03fefd... Raise price`
A conflict during a rebase. Resolve, `git add`, `git rebase --continue`; or `git rebase --abort`. → [[git/Rebasing]]

## `nothing to commit, working tree clean`
```
On branch main
nothing to commit, working tree clean
```
There are no changes (or they're ignored: `git status --ignored`). Did you save the file? Are you in the right folder or branch?

## `nothing added to commit but untracked files present`
You created files but didn't `git add` them. → [[git/Daily Workflow]]

## `fatal: No configured push destination.`
```
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using

    git remote add <name> <url>

and then push using the remote name

    git push <name>
```
The repository has no remote yet: `git remote add origin <url>` then `git push -u origin main`.

## `fatal: The current branch feature has no upstream branch.`
```
fatal: The current branch feature has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin feature

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```
First push of a new branch. `git push -u origin feature`, or set `git config --global push.autoSetupRemote true` once.

## `There is no tracking information for the current branch.`
```
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> main
```
`git pull` doesn't know which remote branch belongs to yours. `git branch -u origin/main` once, then `git pull` works.

## `fatal: refusing to merge unrelated histories`
The two branches share no common commit, typically when you `git init`ed locally **and** created the GitHub repository with a README. If you really want to combine them:
```sh
git pull origin main --allow-unrelated-histories
```
Next time, create the GitHub repository empty, or clone it instead of `init`.

## `error: pathspec 'does-not-exist' did not match any file(s) known to git`
The branch or file name doesn't exist. Typo? Remote branch not fetched yet? `git fetch`, then `git switch <name>`. Check with `git branch -a`.

## `error: the branch 'other' is not fully merged.`
```
error: the branch 'other' is not fully merged.
If you are sure you want to delete it, run 'git branch -D other'
```
The branch has commits no other branch contains. Merge it first, or delete it on purpose with `-D` (still recoverable via [[git/Reflog]]).

## `No stash entries found.`
The stash is empty: maybe you already popped it, or you stashed in another clone or worktree. `git stash list` to check.

## `fatal: 'main' is already used by worktree at '…'`
A branch can only be checked out in one worktree. → [[git/Worktrees]]

## `Permission denied (publickey).` / `fatal: Could not read from remote repository.` *(GitHub)*
SSH authentication failed: no key, key not added to GitHub, or wrong account. Test with `ssh -T git@github.com`. → [[github/Authentication]]

## `remote: Support for password authentication was removed` *(GitHub)*
GitHub doesn't accept your account password over HTTPS. Use a personal access token or switch to SSH. → [[github/Authentication]]

## `remote: error: File video.mp4 is 142.00 MB; this exceeds GitHub's file size limit of 100.00 MB` *(GitHub)*
Remove the file from **all** unpushed commits (a later "delete" commit isn't enough), e.g. `git reset --soft origin/main`, unstage it, commit again. Use Git LFS for large files. → [[git/Large Files and Submodules]]

## `warning: in the working copy of 'lf.txt', LF will be replaced by CRLF the next time Git touches it`
Or the other way round: `CRLF will be replaced by LF`. Line-ending conversion (`core.autocrlf`). Harmless; make it consistent with `.gitattributes`. → [[git/Configuration]]

## `Author identity unknown` / `Please tell me who you are.`
```
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
```
Set your name and e-mail: `git config --global user.name "…"` and `user.email "…"`. → [[git/Installing and Setup]]

## `fatal: Need to specify how to reconcile divergent branches.`
```
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint: 
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
```
Since Git 2.33, a pull of diverged branches needs a strategy. Choose once:
```sh
git config --global pull.rebase true    # or false (merge), or: pull.ff only
```

## `error: cannot lock ref` / `unable to update local ref`
(Message varies.) Often a stale remote branch that clashes with a new name (`feature` vs `feature/x`). `git remote prune origin` (or `git fetch --prune`) fixes it.
