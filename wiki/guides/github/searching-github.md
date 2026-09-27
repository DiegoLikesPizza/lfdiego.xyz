# Searching GitHub

GitHub's search finds code, issues, PRs, repositories and people, across all of GitHub or inside one repository. Press `/` anywhere on github.com.

## Code search
```
"calculateTotal" language:kotlin
repo:ada/shop path:src/ TODO
org:shop-org "API_KEY" NOT path:test
/throw new \w+Exception\("price/ language:java
symbol:PriceFormatter
```
| Qualifier | Limits to |
|---|---|
| `repo:owner/name` | one repository |
| `org:` / `user:` | an organization's / user's repositories |
| `language:` | a language |
| `path:` | files whose path matches (`path:*.yml`, `path:.github/workflows`) |
| `symbol:` | definitions of functions/classes named … |
| `content:` | only file contents, not paths |
| `"exact phrase"` | an exact string |
| `/regex/` | a regular expression |
| `NOT`, `OR`, `AND`, `( )` | boolean logic |

Code search needs you to be logged in, searches the default branch, and skips very large files.

Great for learning: "how do other projects configure `setup-gradle`?" → `path:.github/workflows "gradle/actions/setup-gradle"`.

## Issues and pull requests
```
is:pr is:open review-requested:@me
is:issue is:open label:bug no:assignee repo:ada/shop
is:pr author:@me is:merged merged:>=2026-09-01
is:issue "NullPointerException" in:title,body
is:open label:"good first issue" language:kotlin
```
| Qualifier | |
|---|---|
| `is:issue` / `is:pr` / `is:open` / `is:closed` / `is:merged` / `is:draft` | type and state |
| `author:`, `assignee:`, `mentions:`, `commenter:` | people (`@me` = you) |
| `review-requested:@me`, `reviewed-by:` | reviews |
| `label:`, `milestone:`, `no:label`, `no:assignee` | organisation |
| `created:>2026-01-01`, `updated:<…` | dates |
| `sort:updated-desc`, `sort:reactions-+1-desc` | order |

Your dashboard's *Pull requests* and *Issues* pages are saved searches like these.

## Repositories
```
topic:wiki language:kotlin stars:>50
"static site generator" pushed:>2026-01-01 archived:false
good-first-issues:>5 language:typescript
```

## Commits
```
repo:ada/shop "fix rounding" author:ada
```
For deep history questions in a repository you've cloned, local Git is faster and more precise: [[git/Searching History]].

## Finding an error message
Pasting an error into GitHub's issue search (`is:issue "exact error text"`) across all repositories often finds the library's issue tracker entry with a workaround, faster than a web search.
