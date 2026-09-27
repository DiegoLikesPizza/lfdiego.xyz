# Your First Repository

A complete walk-through: create a repository, make two commits, look at the history. Every output below is real.

## 1. Create the repository
```sh
mkdir shop && cd shop
git init -b main
```
```
Initialized empty Git repository in /home/ada/shop/.git/
```
`git init` creates the hidden `.git/` folder. That folder **is** the repository: every commit, branch and setting. Delete it and the project is an ordinary folder again.

> Already have a repository on GitHub? Use `git clone <url>` instead of `init`. It creates the folder, downloads the full history and sets up `origin` ([[git/Remotes]]).

## 2. Add files
Create `README.md` and `cart.js`:
```js
export function total(items) {
  return items.reduce((sum, i) => sum + i.price, 0);
}
```
```sh
git status
```
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	cart.js

nothing added to commit but untracked files present (use "git add" to track)
```
*Untracked* means Git sees the files but doesn't manage them yet. Note the hint in brackets: `git status` always suggests the next command.

## 3. Stage and commit
```sh
git add README.md cart.js
git status --short
```
```
A  README.md
A  cart.js
```
`A` = added to the staging area. Now record the snapshot:
```sh
git commit -m "Add cart total"
```
```
[main (root-commit) 67d4863] Add cart total
 2 files changed, 4 insertions(+)
 create mode 100644 README.md
 create mode 100644 cart.js
```
- `main`: the branch the commit went onto.
- `root-commit`: the first commit; it has no parent.
- `67d4863`: the start of the commit's hash, its ID.

## 4. Change something
Make the total count quantities, and add a `.gitignore`:
```sh
git status
```
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   cart.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore

no changes added to commit (use "git add" and/or "git commit -a")
```
See exactly what changed:
```sh
git diff
```
```diff
diff --git a/cart.js b/cart.js
index 953c5b8..4c122e5 100644
--- a/cart.js
+++ b/cart.js
@@ -1,3 +1,3 @@
 export function total(items) {
-  return items.reduce((sum, i) => sum + i.price, 0);
+  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
 }
```
Reading a diff: `-` lines were removed, `+` lines added, the rest is context. `@@ -1,3 +1,3 @@` means "3 lines starting at line 1, before and after". More in [[git/Viewing Changes]].

## 5. Second commit
```sh
git add .
git diff --staged --stat
```
```
 .gitignore | 1 +
 cart.js    | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)
```
```sh
git commit -m "Count quantities in the cart total"
```
```
[main f61c2b7] Count quantities in the cart total
 2 files changed, 2 insertions(+), 1 deletion(-)
 create mode 100644 .gitignore
```

## 6. Look at the history
```sh
git log --oneline
```
```
f61c2b7 Count quantities in the cart total
67d4863 Add cart total
```
Newest first. Each line is one commit: short hash and subject. Try `git log` (full), `git log -p` (with diffs) and `git show 67d4863` (one commit). → [[git/Searching History]]

## 7. Put it on GitHub
Create an empty repository on GitHub (no README, so the histories don't clash), then:
```sh
git remote add origin git@github.com:ada/shop.git
git push -u origin main
```
`-u` remembers `origin/main` as the branch's *upstream*, so later a plain `git push` / `git pull` is enough. → [[git/Remotes]], [[github/Authentication]]

## What's next
- The everyday loop: [[git/Daily Workflow]]
- Work on a feature without touching `main`: [[git/Branches]]
