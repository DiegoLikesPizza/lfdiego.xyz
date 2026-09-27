# Secrets and Environments

Workflows need credentials: a deploy key, an API token, a registry password. **Never** put them in the repository. Store them as **secrets** and read them at runtime.

## Secrets
*Settings → Secrets and variables → Actions → New repository secret*, e.g. `DEPLOY_TOKEN`. Use it:
```yaml
- run: ./scripts/deploy.sh
  env:
    DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```
Or from the terminal:
```sh
gh secret set DEPLOY_TOKEN              # prompts for the value
gh secret set DEPLOY_SSH_KEY < ~/.ssh/deploy_key
gh secret list
```
- Secrets are encrypted; nobody (not even admins) can read them back in the UI.
- Values are **masked** (`***`) in logs, but only exact matches: a base64-encoded or split secret could leak. Don't `echo` them.
- Workflows triggered by PRs **from forks** don't receive secrets.
- Levels: organization (shared by selected repositories) → repository → environment. The most specific wins.

## Variables
Non-secret configuration (server hostname, feature flags) goes in **variables**, readable in logs:
```yaml
env:
  SERVER: ${{ vars.SERVER }}
```

## GITHUB_TOKEN
Every run gets an automatic, short-lived token for **its own repository**: `${{ secrets.GITHUB_TOKEN }}` or `${{ github.token }}`. Limit what it can do:
```yaml
permissions:
  contents: read        # checkout
  pull-requests: write  # comment on PRs
```
Set the default to read-only under *Settings → Actions → General → Workflow permissions*. Events created with `GITHUB_TOKEN` (e.g. a push) don't trigger other workflows, which prevents endless loops.

## Environments
An **environment** (*Settings → Environments*) is a deploy target like `staging` or `production` with:
| Feature | Effect |
|---|---|
| **Environment secrets** | only jobs that declare `environment: production` get them |
| **Required reviewers** | the job pauses until one of them clicks *Approve* |
| **Wait timer** | delay before the job starts (e.g. 10 minutes to cancel) |
| **Deployment branches and tags** | only `main` (or `v*` tags) may deploy here |
| **Deployment history** | the repository page lists deployments and their URLs |

Environments exist on every plan for public repositories; for **private** repositories, required reviewers and wait timers need a paid plan (Pro/Team), environment secrets are available everywhere.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://lfdiego.xyz
    steps:
      - run: ./deploy.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}   # the production environment's secret
```
Put production credentials **only** in the production environment, restricted to `main`: then a workflow on some feature branch can't deploy or read them, even if someone edits the YAML.

## OIDC: no long-lived cloud keys at all
For AWS, Azure, Google Cloud and others, workflows can request a short-lived token via **OpenID Connect** instead of storing an access key:
```yaml
permissions:
  id-token: write
  contents: read
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789012:role/deploy
      aws-region: eu-central-1
```
The cloud provider trusts tokens from your repository and branch; nothing to leak or rotate.

## If a secret leaks
1. **Revoke/rotate it immediately** at the provider. Deleting the commit doesn't help: bots scan public GitHub within minutes.
2. Update the GitHub secret with the new value.
3. Check the provider's logs for misuse.
4. Optionally purge it from history ([[git/Rewriting History]]).

Secret scanning with push protection blocks many token types before they're pushed. → [[github/Security]]
