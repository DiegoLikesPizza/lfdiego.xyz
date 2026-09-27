# Deploying with Actions

Three common ways to ship a website or app from GitHub: to **GitHub Pages**, to **your own server** over SSH, or to a **platform** (Vercel, Netlify, a container host).

## 1. GitHub Pages (static sites)
Free hosting for static files. Settings → Pages → Source: **GitHub Actions**. Then:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build          # a static export, e.g. Next.js with output: 'export'
      - uses: actions/upload-pages-artifact@v4
        with:
          path: out/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
Details, custom domains and limits: [[github/Releases and Pages]].

## 2. Your own server over SSH
How lfdiego.xyz deploys. The workflow only opens an SSH connection; the server runs a deploy script (pull, build, publish, restart):
```yaml
name: Deploy to production

# Runs a deploy script on the server over SSH. The key is stored as a repository
# secret; on the server it is limited to that one command (forced command).
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions: {}

concurrency:
  group: production-deploy
  cancel-in-progress: false         # never kill a deploy halfway

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Run the server's deploy script
        env:
          DEPLOY_SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          SERVER: ${{ vars.SERVER }}
        run: |
          set -euo pipefail
          mkdir -p ~/.ssh
          printf '%s\n' "$DEPLOY_SSH_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -t ed25519 "$SERVER" >> ~/.ssh/known_hosts 2>/dev/null
          ssh -i ~/.ssh/deploy_key -o IdentitiesOnly=yes "deploy@$SERVER" deploy
```

### Locking the key down on the server
Generate a dedicated key pair (`ssh-keygen -t ed25519 -f deploy_key -N ""`), store the private key as the `DEPLOY_SSH_KEY` secret, and add the public key to the server's `~/.ssh/authorized_keys` with a **forced command**:
```
command="/srv/site/deploy.sh",no-port-forwarding,no-agent-forwarding,no-pty ssh-ed25519 AAAA… github-deploy
```
Whatever the workflow sends, the server only runs `deploy.sh`. A leaked key can trigger a deploy, nothing more.

### Why build on the server?
- The workflow needs no build tools and no copy step.
- The server builds exactly the commit it pulls.

The alternative is building in Actions and copying the result (`rsync`, `scp`) to the server: faster deploys for heavy builds, and a failing build never touches the server. Both work; pick one and keep it simple.

## 3. Platforms
| Platform | How |
|---|---|
| Vercel, Netlify, Cloudflare Pages | connect the repository in their dashboard: they build every push and post **preview URLs** on PRs, no workflow needed |
| Container hosts (Fly.io, Render, a Kubernetes cluster) | build an image, push it to a registry ([[github/Packages]]), trigger the deploy |
| Cloud (AWS, Azure, GCP) | official login actions with OIDC, no stored keys ([[github/Secrets and Environments]]) |

## Deploy checklist
- `concurrency` with `cancel-in-progress: false` for deploys.
- An `environment` with branch restrictions (and approval for production if needed).
- Least-privilege `permissions` (`{}` if the job doesn't touch the repository).
- A health check after the deploy; fail the job if the site doesn't answer.
- A way back: redeploy the previous commit (`workflow_dispatch` with a ref input) or keep the previous build around.
- Status badge in the README: `![Deploy](https://github.com/ada/shop/actions/workflows/deploy.yml/badge.svg)`.
