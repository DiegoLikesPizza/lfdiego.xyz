# Staging in Detail

The staging area (also called the **index**) is the draft of your next commit. Using it well is the difference between "fixed stuff" commits and a history that explains itself.

## Staging part of a file: `git add -p`
You fixed a bug and left a debug line in the same file. Stage only the fix:
```sh
git add -p cart.js
```
```diff
diff --git a/cart.js b/cart.js
index d671611..1a0cad3 100644
--- a/cart.js
+++ b/cart.js
@@ -1,6 +1,6 @@
 function total(items) {
   let sum = 0;
-  for (const i of items) sum += i.price;
+  for (const i of items) sum += i.price * i.qty;
   return sum;
 }
 
(1/2) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? y
@@ -10,5 +10,6 @@ function total(items) {
 
 
 function label(n) {
+  console.log("DEBUG", n);
   return n + " items";
 }
(2/2) Stage this hunk [y,n,q,a,d,K,g,/,e,?]? n
```
Now the file is **both** staged and modified:
```sh
git status --short
```
```
MM cart.js
```
```sh
git commit -m "Count quantities"
```
```
[main 917d88f] Count quantities
 1 file changed, 1 insertion(+), 1 deletion(-)
```
The debug line is still in your working directory, not in the commit (`git status --short` shows ` M cart.js`).

### The answers
| Key | Meaning |
|---|---|
| `y` / `n` | stage / skip this hunk |
| `s` | split the hunk into smaller ones (if possible) |
| `e` | edit the hunk by hand (delete `+` lines you don't want) |
| `q` | quit; everything so far stays staged |
| `a` / `d` | stage / skip this and all remaining hunks in the file |
| `?` | help |

Your IDE does the same with checkboxes next to each changed block ([[IDEs/Git in the IDE]]).

## See what is staged
| Command | Shows |
|---|---|
| `git diff` | working directory vs staging area (what you **haven't** staged) |
| `git diff --staged` | staging area vs last commit (what **will** be committed) |
| `git diff HEAD` | working directory vs last commit (everything) |

After the `add -p` above:
```sh
git diff --staged
```
```diff
@@ -1,6 +1,6 @@
 function total(items) {
   let sum = 0;
-  for (const i of items) sum += i.price;
+  for (const i of items) sum += i.price * i.qty;
   return sum;
 }
```
```sh
git diff
```
```diff
@@ -10,5 +10,6 @@ function total(items) {
 function label(n) {
+  console.log("DEBUG", n);
   return n + " items";
 }
```

## Unstage
```sh
git restore --staged cart.js      # take it out of the next commit, keep your edits
git restore --staged .            # unstage everything
```
Older tutorials use `git reset HEAD cart.js`; it does the same.

## Staging deletions and renames
```sh
git rm old.js              # delete the file and stage the deletion
git rm --cached secrets.env   # stop tracking it but keep the file on disk
git mv utils.js helpers.js  # rename and stage
```
Git doesn't record renames explicitly: it detects them by comparing content (a file that disappeared and a very similar one that appeared). `git mv` is just `mv` + `git add` of both paths. `git log --follow helpers.js` shows history across the rename.

## Committing everything tracked: `-a`
```sh
git commit -a -m "Fix typo"
```
`-a` stages every **modified or deleted tracked** file before committing. It does **not** add new (untracked) files. Convenient for small changes; for anything bigger, review with `git status` and `git diff` first.

## Tips
- `git add .` + `git commit` without looking is how debug code, `.env` files and 50 MB videos end up in history. Look first.
- Commit **one logical change** at a time. If the message needs "and", it's probably two commits.
- Staged by mistake while in the middle of `add -p`? `git restore --staged -p cart.js` unstages hunk by hunk.
