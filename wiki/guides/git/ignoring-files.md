# Ignoring Files

Some files must never be committed: dependencies you can download again, build output, logs, editor settings, and above all **secrets**. List them in a file called `.gitignore`.

## A typical `.gitignore`
```gitignore
# dependencies and build output
node_modules/
dist/
build/
target/
.gradle/

# secrets
.env
.env.*
!.env.example

# logs and OS junk
*.log
.DS_Store
Thumbs.db

# editors
.idea/
.vscode/*
!.vscode/extensions.json
```
Commit the `.gitignore` itself so the whole team shares it.

## Pattern rules
| Pattern | Matches |
|---|---|
| `debug.log` | a file named `debug.log` in any folder |
| `/debug.log` | only in the repository root |
| `*.log` | every file ending in `.log` |
| `build/` | a folder named `build` anywhere (and everything inside) |
| `docs/**/*.pdf` | PDFs anywhere below `docs/` |
| `!keep.log` | exception: **do** track `keep.log` although `*.log` matches it |
| `# comment` | a comment |

A `.gitignore` in a subfolder applies to that folder. Later rules win over earlier ones, which is how `!` exceptions work.

## Why is this file ignored?
```sh
git check-ignore -v debug.log node_modules/x.js
```
```
.gitignore:2:*.log	debug.log
.gitignore:1:node_modules/	node_modules/x.js
```
File, line number and pattern that matched. To list ignored files:
```sh
git status --short --ignored
```
```
?? .gitignore
?? keep.log
!! debug.log
!! node_modules/
```
`!!` = ignored. `keep.log` shows as untracked (`??`) because of the `!keep.log` exception.

## Already committed? Untrack it
`.gitignore` only affects **untracked** files. If `config.local.json` is already in the repository, adding it to `.gitignore` changes nothing. Remove it from the index but keep it on disk:
```sh
echo "config.local.json" >> .gitignore
git rm --cached config.local.json
git commit -m "Stop tracking config.local.json"
```
Teammates' copies are deleted when they pull that commit, so tell them to back it up first.

> **A committed secret stays in history** even after you delete it. Treat it as leaked: revoke it and create a new one. Then consider removing it from history ([[git/Rewriting History]]) and enable GitHub's secret scanning ([[github/Security]]).

## Personal ignores
Things only *you* produce (your editor, your OS) shouldn't clutter the project's `.gitignore`:
```sh
git config --global core.excludesFile ~/.gitignore_global
echo ".DS_Store" >> ~/.gitignore_global
```
For one repository only, without committing anything: `.git/info/exclude` (same syntax).

## Keeping an empty folder
Git tracks files, not folders; an empty folder disappears. The convention is an empty file named `.gitkeep` inside it (the name means nothing to Git).

## Templates
github.com/github/gitignore has ready-made files for every language and tool (`Node.gitignore`, `Java.gitignore`, `Gradle.gitignore`, …). GitHub offers them when you create a repository, and IntelliJ/VS Code generate one for new projects.
