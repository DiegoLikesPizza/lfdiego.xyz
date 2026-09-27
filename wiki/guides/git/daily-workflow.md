# Daily Workflow

Check what changed, stage it, commit it, catch up with everyone else, share. That loop is 90% of daily Git.

```sh
git status                    # 1. what changed?
git add src/cart.js           # 2. stage (or everything: git add .)
git commit -m "Fix crash when cart is empty"   # 3. record
git pull --rebase             # 4. get teammates' work first
git push                      # 5. share
```

## 1. `git status`: where am I?
Run it constantly. It answers: which branch, what's staged, what's modified, what's untracked, and are you ahead of or behind the server.
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   cart.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
```
The short form is handy once you know the letters:
```sh
git status --short        # or: git status -s
```
```
MM cart.js
?? notes.txt
```
| Code | Meaning |
|---|---|
| `??` | untracked |
| `A ` | added (new file, staged) |
| `M ` | modified and staged |
| ` M` | modified, **not** staged |
| `MM` | staged, then modified again (part staged, part not) |
| `D ` / ` D` | deleted (staged / not staged) |
| `R ` | renamed |
| `UU` | conflict: both modified ([[git/Merge Conflicts]]) |

Left column = staging area, right column = working directory.

## 2. `git add`: choose what goes in
```sh
git add cart.js            # one file
git add src/               # a folder
git add .                  # everything in the current folder (new, modified, deleted)
git add -p                 # hunk by hunk, interactively
```
Review what you staged before committing: `git diff --staged`. → [[git/Staging in Detail]]

## 3. `git commit`: record the snapshot
```sh
git commit -m "Fix crash when cart is empty"
git commit                  # opens your editor for a longer message
git commit -am "Fix typo"   # -a: stage all *modified tracked* files, then commit (not new files!)
```
Good messages: [[git/Commit Messages]].

## 4. `git pull`: catch up
Before you push (and at the start of the day), get what others pushed:
```sh
git pull --rebase
```
`pull` = `fetch` (download) + `merge` or `rebase` (combine). `--rebase` replays your local commits on top of the new ones, so history stays a straight line instead of getting a "Merge branch 'main' of github.com…" commit every time. Make it the default with `git config --global pull.rebase true`. → [[git/Remotes]]

## 5. `git push`: share
```sh
git push                        # current branch to its upstream
git push -u origin feature/x    # first push of a new branch
```
If someone pushed in the meantime, Git refuses:
```
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:ada/shop.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```
Nothing is broken: `git pull --rebase`, then push again. → [[git/Common Errors]]

## On a feature branch
Most teams never commit to `main` directly. The daily loop then looks like this:
```sh
git switch main && git pull           # start from the latest main
git switch -c fix/empty-cart          # branch for this piece of work
# ... edit, add, commit (as often as you like) ...
git push -u origin fix/empty-cart     # publish the branch
# open a pull request on GitHub, get a review, merge
git switch main && git pull           # back to the updated main
git branch -d fix/empty-cart          # clean up
```
→ [[git/Branches]], [[github/Pull Requests]]

## Other everyday commands
| Command | What it does |
|---|---|
| `git clone <url>` | copy a remote repository with its full history |
| `git diff` | unstaged changes; `--staged` for what you're about to commit |
| `git log --oneline --graph` | compact history, branches drawn as lines |
| `git show <commit>` | what exactly changed in one commit |
| `git stash` / `git stash pop` | park unfinished changes and bring them back ([[git/Stash]]) |
| `git blame <file>` | which commit last touched each line ([[git/Searching History]]) |
| `git restore <file>` | throw away unstaged edits to a file ([[git/Undoing Changes]]) |

## Habits that save you
- **Commit small and often.** Small commits are easy to review, revert and bisect.
- **Pull before you start, push when you finish.** The longer you wait, the bigger the conflicts.
- **Read `git status` before every `add` and `commit`.** It prevents committing the wrong files.
- **Never commit secrets.** `.env` belongs in `.gitignore` ([[git/Ignoring Files]]). If you did commit one, rotate the secret: [[github/Security]].
