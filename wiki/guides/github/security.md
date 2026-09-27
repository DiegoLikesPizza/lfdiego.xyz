# Security

Let GitHub watch your dependencies and secrets. Most features are free for public repositories; for private ones, some need GitHub Advanced Security (paid) on organization plans.

| Feature | Does |
|---|---|
| **Dependency graph** | lists what your project depends on (from lock files) |
| **Dependabot alerts** | warns when a dependency has a known vulnerability (CVE) |
| **Dependabot security updates** | opens a PR that bumps the vulnerable package |
| **Dependabot version updates** | opens PRs to keep dependencies current, on a schedule |
| **Secret scanning** | detects committed keys and tokens from 200+ providers; many providers are notified and revoke automatically |
| **Push protection** | blocks the push before a secret lands on GitHub |
| **Code scanning (CodeQL)** | analyses your code for security bugs (SQL injection, XSS, path traversal…) on every PR |
| **Private vulnerability reporting** | a button for researchers to report issues privately |
| **Security advisories** | draft a fix privately, request a CVE, publish |

Turn them on under *Settings → Code security*.

## Dependabot version updates
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      minor-and-patch:
        update-types: [minor, patch]   # one PR instead of twenty
  - package-ecosystem: gradle
    directory: /
    schedule:
      interval: weekly
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```
Tips:
- **Group** updates, or you'll drown in PRs.
- Good tests make Dependabot PRs safe to merge; with auto-merge on patch updates, maintenance is almost free.
- Major updates need reading the changelog: breaking changes.
- **Renovate** is a popular, more configurable alternative.

## Secret scanning and push protection
With push protection on, a push containing a recognised secret is rejected:
```
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
```
Remove the secret from **the commits** (not just the latest file state: `git reset --soft origin/main`, fix, recommit), move it to an environment variable or secret store, and push again. Enable push protection for your personal account too: *Settings → Code security → Push protection for yourself*.

If a secret did get public: **rotate it first**, then clean up. → [[github/Secrets and Environments]]

## Code scanning with CodeQL
*Security → Code scanning → Set up → Default*: GitHub picks the languages (Java/Kotlin, JavaScript/TypeScript, Python, Go, C#, C/C++, Ruby, Swift, Actions workflows) and scans on every push and PR. Findings appear in the PR diff and the Security tab. **Copilot Autofix** can propose a fix for many alerts.

## SECURITY.md
Tell people how to report a vulnerability **privately** instead of in a public issue:
```markdown
# Security policy
Please report vulnerabilities via "Report a vulnerability" on the Security tab
or by e-mail to security@example.com. Don't open public issues for them.
We answer within 3 working days.

## Supported versions
| Version | Supported |
|---|---|
| 2.x | ✅ |
| 1.x | security fixes until 2026-12-31 |
```
Enable *Private vulnerability reporting* to give reporters a button for it.

## Account security
- Two-factor authentication with a passkey or security key.
- Review *Settings → Sessions*, *Applications* (OAuth apps), SSH keys and tokens now and then; delete what you don't use.
- Fine-grained tokens with expiry instead of classic tokens ([[github/Authentication]]).
- Signed commits for verified authorship ([[git/Tags and Releases]]).

## Workflows are part of the attack surface
Pinned actions, least-privilege tokens, no untrusted input in scripts: [[github/Actions Security]].
