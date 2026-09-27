# Reusable Workflows

Five repositories with the same CI? Don't copy-paste the YAML. Share it: as a **reusable workflow**, a **composite action**, or a **workflow template**.

## Reusable workflows
A workflow with `on: workflow_call` can be called like a function:
```yaml
# .github/workflows/reusable-test.yml
name: Reusable Node test
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: "22"
    secrets:
      NPM_TOKEN:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ inputs.node-version }}
          cache: npm
      - run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - run: npm test
```
Calling it (a job with `uses:` instead of `steps:`):
```yaml
name: Test (calls the reusable workflow)
on: [pull_request]

jobs:
  node-20:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: "20"
  node-22:
    uses: ./.github/workflows/reusable-test.yml
    secrets: inherit
```
From another repository: `uses: my-org/ci-templates/.github/workflows/node-test.yml@v1`. The called workflow's repository must be public, or shared within the organization (Settings → Actions → Access).

- `secrets: inherit` passes all the caller's secrets; or list them explicitly.
- Reusable workflows can define `outputs` for the caller.
- Pin to a tag or SHA (`@v1`), not `@main`, so changes don't break every caller at once.

## Composite actions
A **composite action** bundles **steps** (not jobs) into one `uses:`. Put it in a folder with an `action.yml`:
```yaml
# .github/actions/setup-project/action.yml
name: Set up the project
description: Checkout-independent setup of Node and dependencies
inputs:
  node-version:
    default: "22"
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v5
      with:
        node-version: ${{ inputs.node-version }}
        cache: npm
    - run: npm ci
      shell: bash
```
```yaml
steps:
  - uses: actions/checkout@v5
  - uses: ./.github/actions/setup-project
  - run: npm test
```
`run` steps in composite actions need an explicit `shell:`.

## Which one?
| | Reusable workflow | Composite action |
|---|---|---|
| Contains | whole jobs (runners, matrices, environments) | steps inside your job |
| Called as | `jobs.<id>.uses:` | `steps[*].uses:` |
| Secrets | passed explicitly or `inherit` | via inputs/env |
| Good for | "the standard CI pipeline" | "the standard setup steps" |

## JavaScript and Docker actions
For real logic (API calls, parsing), write an action in JavaScript/TypeScript (`runs: using: node24`, with `@actions/core`) or as a Docker container. Publish it in its own repository with version tags, and optionally on the Marketplace.

## Workflow templates
An organization's `.github` repository can contain `workflow-templates/`: they appear under *Actions → New workflow* in every repository of the organization, as a starting point that's then copied. Good for onboarding; reusable workflows are better for keeping things in sync.
