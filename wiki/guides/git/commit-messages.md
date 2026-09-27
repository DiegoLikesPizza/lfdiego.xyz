# Commit Messages

A good history reads like a changelog. The person who will search it most is future you, trying to find out when and why a bug appeared.

## Avoid → prefer
| Avoid | Prefer |
|---|---|
| `fix` | `Fix crash when cart is empty` |
| `stuff` | `Add dark mode toggle to header` |
| `WIP final FINAL` | `Remove unused lodash dependency` |
| `changes` | `Validate e-mail before sending the reset link` |
| `fixed the bug from yesterday` | `Round prices to 2 decimals in the checkout total` |

## Rules of thumb
1. **Imperative mood**: "Add", "Fix", "Remove", not "Added" or "Fixes". Read it as *"If applied, this commit will … add dark mode toggle"*. Git itself writes messages this way ("Merge branch …", "Revert …").
2. **Subject around 50 characters**, maximum 72, no full stop. GitHub cuts longer subjects off.
3. **One logical change per commit.** "and" in the subject is a hint to split it ([[git/Staging in Detail]]).
4. **Explain *why* in the body** when it isn't obvious. The diff already shows *what*.

## Subject + body
```
Round prices to 2 decimals in the checkout total

Adding 0.1 + 0.2 as doubles gave 0.30000000000000004, which the
payment provider rejected as an invalid amount. Totals are now kept
in cents (Long) and only formatted as euros for display.

Fixes #31
```
- A **blank line** separates subject and body. Tools rely on it.
- Wrap the body at about 72 characters.
- `git commit` without `-m` opens your editor for this. `git commit -m "Subject" -m "Body paragraph"` also works.

## Linking issues
On GitHub, `Fixes #31`, `Closes #31` or `Resolves #31` in a commit (or pull request) closes issue 31 when it reaches the default branch. `Refs #31` only links. → [[github/Issues and Projects]]

## Conventional Commits
Many projects use a machine-readable prefix, which lets tools generate changelogs and version numbers:
```
feat: add dark mode toggle to header
fix(cart): round prices to 2 decimals
docs: explain the release process
refactor!: rename total() to calculateTotal()
```
| Type | For |
|---|---|
| `feat` | a new feature (→ minor version) |
| `fix` | a bug fix (→ patch version) |
| `docs`, `test`, `refactor`, `perf`, `style`, `build`, `ci`, `chore` | everything else |
| `!` or `BREAKING CHANGE:` in the body | an incompatible change (→ major version) |

Use it if your team does; otherwise the rules above are enough. Versioning: [[github/Releases and Pages]].

## Trailers
Lines at the end of the body in `Key: value` form:
```
Co-authored-by: Bo Builder <bo@example.com>
Signed-off-by: Ada Lovelace <ada@example.com>
Reviewed-by: Cleo <cleo@example.com>
```
GitHub shows every `Co-authored-by` person as an author of the commit. `git commit -s` adds `Signed-off-by` for you (some open-source projects require it).

## Fixing a message
- **Last commit, not pushed:** `git commit --amend` (opens the editor) or `git commit --amend -m "Better message"`.
- **Older commits, not pushed:** interactive rebase with `reword` ([[git/Rewriting History]]).
- **Already pushed to a shared branch:** leave it. Rewriting shared history hurts more than a bad message.

## Commits that are too big
If you can't describe a commit in one line, it's doing too much. Signs:
- 30 files changed across unrelated features,
- "and" or a list in the subject,
- a reviewer can't tell which change caused which test failure.

Commit as you go instead of at the end of the day, and use `git add -p` to split mixed changes.
