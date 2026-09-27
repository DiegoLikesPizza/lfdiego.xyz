# Searching History

History is a searchable database. When something broke, who changed a line, or when a function disappeared: Git can answer in seconds.

## Questions and the commands that answer them
| Question | Command |
|---|---|
| What happened recently, across all branches? | `git log --oneline --graph --all` |
| Every change to one file, with diffs | `git log -p -- src/cart.js` |
| … including before it was renamed | `git log --follow -p -- src/cart.js` |
| When was this text added or removed? | `git log -S "calculateTotal"` |
| … matching a regular expression | `git log -G "calculate\w+"` |
| Commits whose message mentions a word | `git log --grep="rounding" -i` |
| Commits by one person in the last 2 weeks | `git log --author="Ada" --since="2 weeks ago"` |
| Who last changed lines 40–60? | `git blame -L 40,60 src/cart.js` |
| History of one function | `git log -L :calculateTotal:src/cart.js` |
| What's on my branch that main doesn't have? | `git log main..feature` |
| What did my branch change since it split off? | `git diff main...feature` |
| What did a file look like in an old commit? | `git show a1f3:src/cart.js` |
| Which commit introduced a bug? | [[git/Bisect]] |
| Who contributed how much? | `git shortlog -sn` |

## The pickaxe: `-S`
Find commits that changed the **number of occurrences** of a string, i.e. added or removed it. Perfect for "when did this function appear/disappear?":
```sh
git log -S calculateTotal --oneline
```
```
cd7dffa Rename calculateTotal to sum
72f0846 Add calculateTotal stub
```
Commit `dc77659` ("Count items") also touched `calculateTotal`'s body, but didn't add or remove the name, so `-S` skips it. `-G` would list it (it matches any diff line containing the pattern).

## Formatting the log
```sh
git log --format='%h %ad %s' --date=short
```
```
cd7dffa 2026-01-04 Rename calculateTotal to sum
dc77659 2026-01-04 Count items
72f0846 2026-01-04 Add calculateTotal stub
```
| Placeholder | Is |
|---|---|
| `%h` / `%H` | short / full hash |
| `%an` / `%ae` | author name / e-mail |
| `%ad` / `%ar` | author date / relative ("3 days ago") |
| `%s` / `%b` | subject / body |
| `%d` | ref names (branches, tags) |

Save a favourite as an alias: `git config --global alias.lg "log --oneline --graph --decorate --all"`. → [[git/Configuration]]

## Filtering
```sh
git log --author=Bo --format='%h %an %s'
```
```
dc77659 Bo Count items
```
| Option | Filters |
|---|---|
| `-n 5` or `-5` | the last 5 commits |
| `--since`, `--until` | by date: `"2026-01-01"`, `"2 weeks ago"`, `"yesterday"` |
| `--author`, `--committer` | by person (regex) |
| `--grep` | by message (regex); add `-i` for case-insensitive |
| `--no-merges` / `--merges` | exclude / only merge commits |
| `--first-parent` | follow only the main line (skip commits inside merged branches) |
| `-- path` | only commits touching `path` |

## blame: who changed each line
```sh
git blame cart.js
```
```
cd7dffad (Ada 2026-01-04 08:00:00 +0100 1) function sum(items) {
dc77659f (Bo  2026-01-04 07:00:00 +0100 2)   return items.length;
^72f0846 (Ada 2026-01-04 06:00:00 +0100 3) }
```
Each line shows the last commit that touched it. `^` marks the initial commit. Then `git show dc77659f` explains *why* (if the message is good: [[git/Commit Messages]]).

Useful options:
| Option | Effect |
|---|---|
| `-L 40,60` | only these lines |
| `-w` | ignore whitespace changes |
| `-C` | detect lines moved or copied from other files |
| `--ignore-rev <hash>` | skip a commit (e.g. "Reformat everything") |

Put mass-reformatting commits in a `.git-blame-ignore-revs` file and run `git config blame.ignoreRevsFile .git-blame-ignore-revs`; GitHub's blame view reads this file too.

Blame tells you *who last touched* a line, not who is to blame. The line may have moved, been reformatted, or been written by someone else and merged.

## One commit in detail
```sh
git show --stat HEAD
```
```
commit cd7dffad6e7f764fa98d6e089687cf1e17d384fb
Author: Ada <ada@example.com>
Date:   Sun Jan 4 08:00:00 2026 +0100

    Rename calculateTotal to sum

 cart.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
Without `--stat` you get the full diff.

## Who contributed
```sh
git shortlog -sn HEAD
```
```
     2	Ada
     1	Bo
```
Same person with several e-mails? Map them in a `.mailmap` file.

## Searching the current code
Not history, but often what you want: `git grep` searches tracked files, fast, and can search old versions too:
```sh
git grep -n "calculateTotal"
git grep -n "calculateTotal" v1.2.0     # in the v1.2.0 release
```

## In the IDE
IntelliJ: right-click the gutter → *Annotate with Git Blame*; select code → *Git → Show History for Selection* (that's `log -L`). VS Code with GitLens shows blame inline. → [[IDEs/Git in the IDE]]
