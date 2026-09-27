# Glossary

Git words, in one place.

| Term | Meaning |
|---|---|
| **repository** (repo) | a project folder plus its full history, stored in `.git/` |
| **working tree** / working directory | the actual files on disk that you edit |
| **index** / staging area | the draft of your next commit, built with `git add` ([[git/Staging in Detail]]) |
| **commit** | a snapshot of the project with an author, a message and parent(s) |
| **hash** (SHA) | the unique ID of an object, derived from its contents; usually shortened to 7 characters |
| **blob**, **tree** | stored file contents / a stored directory ([[git/Objects and Internals]]) |
| **branch** | a movable name that points at a commit and advances as you commit ([[git/Branches]]) |
| **HEAD** | what you have checked out right now, normally a branch |
| **detached HEAD** | HEAD points directly at a commit, not a branch ([[git/Refs and HEAD]]) |
| **ref** | a name for a commit: branch, tag, remote-tracking branch, HEAD |
| **remote** | another copy of the repository, like the one on GitHub |
| **origin** | the default name for the remote you cloned from |
| **upstream** | the remote branch a local branch tracks; also a common name for the original repo of a fork |
| **remote-tracking branch** | a read-only local bookmark like `origin/main`, updated by fetch |
| **fetch** | download new commits and update `origin/*` without changing your branches |
| **pull** | fetch, then merge (or rebase) into your current branch |
| **push** | upload your commits and move the remote branch |
| **fast-forward** | a merge where the branch simply moves ahead; no merge commit needed |
| **merge commit** | a commit with two parents that joins two lines of history ([[git/Merging]]) |
| **merge base** | the most recent common ancestor of two branches |
| **rebase** | replay commits on top of another base, creating new commits ([[git/Rebasing]]) |
| **conflict** | both sides changed the same lines; Git needs you to choose ([[git/Merge Conflicts]]) |
| **ours / theirs** | in a merge: your branch / the incoming one (swapped during a rebase) |
| **squash** | combine several commits into one |
| **fixup** | a commit meant to be melted into an earlier one during an interactive rebase |
| **amend** | replace the last commit with a corrected one |
| **reset** | move the current branch to another commit ([[git/Reset in Depth]]) |
| **revert** | a new commit that undoes an earlier one |
| **stash** | a stack of shelved, uncommitted changes ([[git/Stash]]) |
| **tag** | a fixed name for a commit, typically a release like `v1.2.0` ([[git/Tags and Releases]]) |
| **reflog** | a local log of everywhere HEAD has been: your undo history ([[git/Reflog]]) |
| **cherry-pick** | copy the changes of one commit onto the current branch ([[git/Cherry-pick]]) |
| **bisect** | binary search through history for the commit that introduced a bug ([[git/Bisect]]) |
| **worktree** | an extra working directory attached to the same repository ([[git/Worktrees]]) |
| **hook** | a script Git runs on an event such as commit or push ([[git/Hooks]]) |
| **LFS** | Large File Storage: big files stored outside the repository ([[git/Large Files and Submodules]]) |
| **submodule** | another repository pinned at a commit inside yours |
| **shallow clone** | a clone with only the most recent history (`--depth`) |
| **packfile** | a compressed file holding many objects as deltas |
| **fork** | your own copy of someone else's repository on GitHub ([[github/Forks and Cloning]]) |
| **pull request** | a GitHub request to merge a branch, with review and CI ([[github/Pull Requests]]) |
