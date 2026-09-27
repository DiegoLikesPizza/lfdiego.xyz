# GitHub CLI

`gh` does most of GitHub without leaving the terminal: pull requests, issues, workflow runs, releases, repositories, and any API call.

## Install and log in
```sh
winget install GitHub.cli     # Windows
brew install gh               # macOS
sudo apt install gh           # Debian/Ubuntu (or GitHub's own apt repository for the newest version)
gh auth login                 # browser login; choose SSH or HTTPS
gh auth status
```

## Commands you'll use
| Command | What it does |
|---|---|
| `gh repo clone owner/repo` | clone using your authenticated account |
| `gh repo create shop --private --source=. --push` | create a repository from the current folder |
| `gh repo fork owner/repo --clone` | fork + clone + `upstream` remote |
| `gh pr create --fill --draft` | open a draft PR from the current branch |
| `gh pr list --author @me` | your open pull requests |
| `gh pr status` | PRs relevant to you in this repository |
| `gh pr checkout 42` | check out someone's PR locally to test it |
| `gh pr diff 42` | its diff |
| `gh pr review 42 --approve` / `--request-changes -b "…"` | review from the terminal |
| `gh pr checks 42 --watch` | wait for CI |
| `gh pr merge --squash --delete-branch` | squash-merge and clean up |
| `gh issue create --label bug` | file an issue interactively |
| `gh issue list --assignee @me` | your issues |
| `gh run list` / `gh run watch` | recent workflow runs / follow one live |
| `gh run view --log-failed` | only the logs of failed steps |
| `gh run rerun --failed` | re-run failed jobs |
| `gh workflow run deploy.yml -f environment=staging` | trigger a `workflow_dispatch` |
| `gh secret set NAME` | set an Actions secret |
| `gh release create v1.2.0 --generate-notes` | create a release |
| `gh browse` | open the repository (or `gh browse src/app.ts:12`) in the browser |
| `gh api repos/{owner}/{repo}/pulls` | call any REST API endpoint, authenticated |

Every command has `--help`, and most accept `--web` to open the page instead, and `--json` for scripting.

## Scripting with `--json`
```sh
gh pr list --json number,title,author --jq '.[] | "#\(.number) \(.title) by \(.author.login)"'
gh run list --workflow ci.yml --limit 5 --json conclusion,headBranch
gh api graphql -f query='{ viewer { login } }'
```
`--jq` filters with jq syntax without installing jq.

## Aliases and extensions
```sh
gh alias set mine 'pr list --author @me'
gh extension install dlvhdr/gh-dash      # a terminal dashboard for PRs and issues
```

## In workflows
`gh` is preinstalled on GitHub-hosted runners. Give it a token:
```yaml
- run: gh pr comment "$PR" --body "Preview: https://preview.example.com"
  env:
    GH_TOKEN: ${{ github.token }}
    PR: ${{ github.event.pull_request.number }}
```

## Copilot in the CLI
`gh copilot suggest "undo my last commit but keep the changes"` suggests a command, `gh copilot explain "git rebase -i HEAD~3"` explains one. Read suggested commands before running them. → [[ai-prompting/Prompting for Code]]
