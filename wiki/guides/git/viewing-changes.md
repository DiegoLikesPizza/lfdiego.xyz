# Viewing Changes

`git diff` compares any two states: working directory, staging area, commits, branches.

## What to compare
| Command | Compares |
|---|---|
| `git diff` | working directory ↔ staging area |
| `git diff --staged` | staging area ↔ last commit |
| `git diff HEAD` | working directory ↔ last commit |
| `git diff main feature` | tip of `main` ↔ tip of `feature` |
| `git diff main...feature` | what `feature` changed **since it split off** from `main` (what a pull request shows) |
| `git diff HEAD~3 HEAD -- src/` | the last three commits, only in `src/` |
| `git show <commit>` | one commit: message + its diff |
| `git show <commit>:path/file` | a file as it was in that commit |

`HEAD~1` is the commit before `HEAD`, `HEAD~3` three commits back. → [[git/Refs and HEAD]]

## Reading a diff
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
| Part | Meaning |
|---|---|
| `a/cart.js`, `b/cart.js` | old and new version of the file |
| `index 953c5b8..4c122e5` | the blob hashes before and after ([[git/Objects and Internals]]) |
| `100644` | file mode: normal file (`100755` = executable) |
| `@@ -1,3 +1,3 @@` | a *hunk*: 3 lines from line 1 in the old file, 3 lines from line 1 in the new one |
| `-` / `+` / space | removed / added / unchanged context line |

## Summaries
```sh
git diff --stat HEAD
```
```
 cart.js | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```
```sh
git diff --name-only main...feature     # just the file names
git diff --name-status HEAD~5           # with A/M/D/R letters
```

## Word diff for prose and long lines
When only a word changed in a long line, a line diff shows the whole line twice. `--word-diff` shows the words:
```sh
git diff --word-diff HEAD
```
```
  for (const i of items) sum += [-i.price;-]{+i.price * i.qty;+}
```
`[-…-]` removed, `{+…+}` added. For Markdown and documentation, `--word-diff=color` is easier on the eyes.

## Useful options
| Option | Effect |
|---|---|
| `-w` | ignore whitespace changes (reindented code) |
| `--color-moved` | colour moved lines differently from real changes |
| `-U10` | 10 lines of context instead of 3 |
| `--function-context` / `-W` | show the whole function around each change |
| `-- path` | limit to files under `path` |

## Graphical diffs
```sh
git difftool                       # opens each changed file in the configured diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
```
IntelliJ and VS Code show diffs side by side when you click a changed file in the commit window ([[IDEs/Git in the IDE]]).

## Diffs of binary files
Git can't show a text diff of images or PDFs:
```
Binary files a/logo.png and b/logo.png differ
```
Mark them `binary` in `.gitattributes` so Git never tries to convert or merge them ([[git/Configuration]]). Large binaries belong in Git LFS ([[git/Large Files and Submodules]]).
