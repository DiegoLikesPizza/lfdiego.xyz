# Cheat Sheet

## Connect
```sh
ssh-keygen -t ed25519 -C "you@example.com"   # then add ~/.ssh/id_ed25519.pub on GitHub
ssh -T git@github.com
gh auth login
git remote add origin git@github.com:you/project.git
git push -u origin main
```
→ [[github/Authentication]]

## Pull request loop
```sh
git switch -c fix/x
git push -u origin fix/x
gh pr create --fill [--draft]
gh pr checks --watch
gh pr merge --squash --delete-branch
git switch main && git pull && git branch -D fix/x
```
→ [[github/Pull Requests]]

## Fork workflow
```sh
gh repo fork owner/project --clone
git fetch upstream && git rebase upstream/main
git push -u origin my-branch
```
→ [[github/Forks and Cloning]]

## Keywords
| Write | Effect |
|---|---|
| `Closes #12` / `Fixes #12` / `Resolves #12` | closes the issue when merged into the default branch |
| `#12`, `owner/repo#12` | link |
| `@ada`, `@org/team` | notify |
| ```` ```suggestion ```` | one-click code suggestion in a review |

## Minimal CI
```yaml
name: CI
on: { push: { branches: [main] }, pull_request: {} }
permissions: { contents: read }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with: { node-version: 22, cache: npm }
      - run: npm ci && npm test && npm run build
```
→ [[github/GitHub Actions]]

## Workflow building blocks
| | |
|---|---|
| `needs: [a, b]` | job order |
| `strategy.matrix` | many combinations |
| `if: github.ref == 'refs/heads/main'` | condition |
| `concurrency` | one run at a time |
| `environment: production` | protected deploy target |
| `secrets.X`, `vars.X`, `github.token` | credentials and config |
| `$GITHUB_OUTPUT`, `$GITHUB_ENV`, `$GITHUB_STEP_SUMMARY` | pass data |
| `actions/upload-artifact` / `download-artifact` | files between jobs |

→ [[github/Workflow Syntax]], [[github/Actions in Depth]]

## gh
```sh
gh pr list --author @me       gh pr checkout 42      gh pr review 42 --approve
gh issue create --label bug   gh run watch           gh run view --log-failed
gh release create v1.2.0 --generate-notes            gh browse
gh secret set NAME            gh workflow run deploy.yml
```
→ [[github/GitHub CLI]]

## Search
```
is:pr is:open review-requested:@me
is:issue is:open label:bug no:assignee
"calculateTotal" language:kotlin repo:ada/shop
```
→ [[github/Searching GitHub]]

## Shortcuts on github.com
`/` search · `t` file finder · `.` web editor · `y` permalink · `b` blame · `?` all shortcuts
