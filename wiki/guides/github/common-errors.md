# Common Errors

Messages from GitHub (in `git push` output, the web UI and Actions logs), what they mean and how to fix them. For messages from Git itself, see [[git/Common Errors]].

## `Permission denied (publickey).`
```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
SSH found no key GitHub accepts. Check:
```sh
ssh -T git@github.com          # which account (if any) does GitHub see?
ssh-add -l                     # is a key loaded?
ssh -vT git@github.com         # which key files are tried
```
Add the public key to GitHub (*Settings → SSH and GPG keys*). → [[github/Authentication]]

## `remote: Support for password authentication was removed`
You typed your account password for an HTTPS remote. Use `gh auth login` / Git Credential Manager, or a personal access token as the password, or switch to SSH.

## `remote: Repository not found.` / `ERROR: Repository not found.`
- Typo in the URL (`git remote -v`)?
- Private repository and your account has no access, or the **wrong account** is logged in (`gh auth status`, `ssh -T git@github.com`).
- The repository was renamed or transferred: update the URL.

## `remote: Permission to owner/repo.git denied to ada.`
You're authenticated, but have only read access. Ask for write access, or fork and open a PR ([[github/Forks and Cloning]]).

## `! [remote rejected] main -> main (protected branch hook declined)` / `GH006: Protected branch update failed`
A ruleset forbids direct pushes to `main`. Push a branch and open a pull request. → [[github/Protecting Main]]

## `GH013: Repository rule violations found` … `Push cannot contain secrets`
Push protection found a secret in your commits. Remove it from **every** unpushed commit (e.g. `git reset --soft origin/main`, fix, recommit), store it as a secret or environment variable, push again. If it's a false positive, the message includes a link to allow it. → [[github/Security]]

## `File … exceeds GitHub's file size limit of 100.00 MB`
Remove the big file from the unpushed commits (a later delete isn't enough), then use Git LFS. → [[git/Large Files and Submodules]]

## `refusing to allow a Personal Access Token to create or update workflow … without 'workflow' scope`
Pushing changes to `.github/workflows/` needs a token with the `workflow` scope (classic) or *Workflows: write* (fine-grained). `gh auth refresh -s workflow` for the CLI.

## Pull request: "This branch has conflicts that must be resolved"
Merge or rebase `main` into your branch locally, resolve, push. → [[git/Merge Conflicts]]

## Pull request: "Merging is blocked" / "Required status check … is expected"
- A required check hasn't reported. Did the workflow run at all (path filters, `if:` conditions, workflow disabled in forks)?
- The check's **job name** changed; update the ruleset.
- Required reviews or conversation resolution are missing.

## Actions: `Error: Process completed with exit code 1.`
The last command of a `run:` step failed. Scroll **up** in the step's log for the real error (test failure, compile error). Reproduce locally with the same command.

## Actions: `Resource not accessible by integration`
The `GITHUB_TOKEN` lacks a permission. Add it to `permissions:` (e.g. `pull-requests: write`, `issues: write`, `contents: write`). On PRs from forks the token is always read-only. → [[github/Secrets and Environments]]

## Actions: `Unable to resolve action owner/name@v9, unable to find version v9`
Wrong version tag or action name. Check the action's releases page.

## Actions: `The workflow is not valid. … Unexpected value '…'`
YAML syntax or an unknown key. Run **actionlint** locally; check indentation (spaces, never tabs). → [[github/Workflow Syntax]]

## Actions: `npm ci` fails with "The package-lock.json … is not in sync"
`package.json` changed without regenerating the lock file. Run `npm install` locally and commit `package-lock.json`.

## Actions: `Permission denied` running `./gradlew`
The executable bit was lost (often on Windows): `git update-index --chmod=+x gradlew` and commit.

## Actions: scheduled workflow stopped running
Scheduled workflows are disabled automatically after 60 days without repository activity on public repositories. Re-enable on the Actions tab.

## Pages: 404 after deploying
- Wrong source (*Settings → Pages*): branch/folder or "GitHub Actions"?
- Project site under `/<repo>/` but the build assumes `/`: set the base path.
- `index.html` missing at the root of the published folder. → [[github/Releases and Pages]]

## Pages: CSS and images missing
Absolute paths (`/styles.css`) on a project site point to `user.github.io/styles.css`. Configure the framework's base path.
