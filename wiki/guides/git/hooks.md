# Hooks

Hooks are scripts Git runs at certain moments: before a commit, before a push, after a checkout. They're perfect for catching mistakes **before** they leave your machine: debug statements, secrets, unformatted code, failing tests.

## A pre-commit hook in 7 lines
Save as `.git/hooks/pre-commit` and make it executable (`chmod +x`):
```sh
#!/bin/sh
# Refuse commits that still contain console.log or a private key.
if git diff --cached -U0 | grep -E '^\+.*(console\.log|BEGIN (RSA|OPENSSH) PRIVATE KEY)'; then
  echo "pre-commit: remove console.log / private keys before committing" >&2
  exit 1
fi
```
A non-zero exit code aborts the commit:
```sh
git commit -m "Add app"
```
```
+console.log("debug")
pre-commit: remove console.log / private keys before committing
```
After fixing the file:
```
[main (root-commit) bc809a2] Add app
 1 file changed, 1 insertion(+)
 create mode 100644 app.js
```
Skip hooks once, deliberately: `git commit --no-verify` (`-n`).

## The useful hooks
| Hook | Runs | Typical use |
|---|---|---|
| `pre-commit` | before the commit is created | lint and format staged files, block secrets |
| `prepare-commit-msg` | before the editor opens | insert the issue number from the branch name |
| `commit-msg` | after you wrote the message | enforce [[git/Commit Messages|Conventional Commits]] |
| `pre-push` | before pushing | run the unit tests |
| `post-checkout`, `post-merge` | after switching / pulling | `npm install` when `package-lock.json` changed |
| `pre-rebase` | before a rebase | refuse rebasing `main` |

Server-side hooks (`pre-receive`, `update`) exist too, but on GitHub you use branch rules and Actions instead ([[github/Protecting Main]]).

## Sharing hooks with the team
`.git/hooks` isn't committed. Options:
1. **Commit a folder and point Git at it** (Git 2.9+):
   ```sh
   git config core.hooksPath .githooks   # every developer runs this once
   ```
2. **Husky** (JavaScript projects) installs hooks via `npm install`:
   ```sh
   npm install --save-dev husky
   npx husky init        # creates .husky/pre-commit and a "prepare" script
   ```
   Pair it with **lint-staged** to run Prettier/ESLint only on staged files.
3. **pre-commit** (the Python tool, any language): hooks declared in `.pre-commit-config.yaml`, e.g. `detect-private-key`, `check-added-large-files`, `trailing-whitespace`.
4. **Gradle/Kotlin**: Spotless or ktlint Gradle plugins can install a pre-commit hook.

## Keep hooks fast
A pre-commit hook that takes 30 seconds gets skipped with `--no-verify`. Check only **staged** files, leave the full test suite to `pre-push` or CI. Hooks are a convenience, not a guarantee: anyone can skip them, so enforce the important checks in CI too ([[github/GitHub Actions]]).
