# Tags and Releases

A **tag** is a fixed name for a commit, typically a release like `v1.2.0`. Unlike a branch, a tag never moves.

## Annotated vs lightweight
| | Annotated `git tag -a v1.2.0 -m "…"` | Lightweight `git tag v1.2.0` |
|---|---|---|
| Stores | tagger, date, message (a tag object) | just a ref to the commit |
| Can be signed | yes (`-s`) | no |
| Use for | releases | private bookmarks |

```sh
git tag -a v1.2.0 -m "Release 1.2.0"
git show --no-patch v1.2.0
```
```
tag v1.2.0
Tagger: Ada <ada@example.com>
Date:   Sun Jan 4 03:00:00 2026 +0100

Release 1.2.0

commit 6ce9d80f40e89b6898f62b2fce3146884ca2c9a6
Author: Ada <ada@example.com>
Date:   Sun Jan 4 03:00:00 2026 +0100

    Release prep
```

## Working with tags
```sh
git tag                          # list all
git tag --list "v1.*"            # filter
git tag -a v1.1.0 -m "…" 9fceb02 # tag an older commit
git push origin v1.2.0           # tags are NOT pushed by default
git push --follow-tags           # push commits + their annotated tags
git tag -d v1.2.0                # delete locally
git push origin --delete v1.2.0  # delete on the server
```
Set `git config --global push.followTags true` to always send annotated tags along with commits.

> Don't move a published tag. People (and package managers, CI caches) assume `v1.2.0` always means the same code. Made a mistake? Release `v1.2.1`.

## Describe: "how far from the last release?"
```sh
git describe
```
```
v1.2.0-2-ged7913b
```
= 2 commits after `v1.2.0`, currently at commit `ed7913b` (the `g` prefix stands for Git). Handy as a build version string. `git describe --tags` also considers lightweight tags; `--dirty` appends `-dirty` if there are uncommitted changes.

## Looking at an old release
```sh
git switch --detach v1.2.0
```
```
HEAD is now at 6ce9d80 Release prep
```
You're in **detached HEAD** state: `HEAD` points at a commit, not a branch. Look around, build, run it. If you want to commit (e.g. a patch release), create a branch first: `git switch -c release/1.2.x v1.2.0`. → [[git/Refs and HEAD]]

## Semantic versioning
`MAJOR.MINOR.PATCH`, e.g. `2.4.1`:
- **MAJOR**: incompatible changes, users must adapt,
- **MINOR**: new features, backwards compatible,
- **PATCH**: bug fixes only.

Pre-releases: `2.5.0-beta.1`, `2.5.0-rc.1`. Full details and GitHub Releases (release notes, downloadable build files): [[github/Releases and Pages]].

## A release, step by step
```sh
git switch main && git pull
# update version in package.json / build.gradle.kts and CHANGELOG.md
git commit -am "Release 1.3.0"
git tag -a v1.3.0 -m "Release 1.3.0"
git push --follow-tags
```
Then create the GitHub Release from the tag, or let a workflow do it on `push: tags: ['v*']` ([[github/Actions in Depth]]).

## Signed tags and commits
```sh
git tag -s v1.3.0 -m "Release 1.3.0"     # GPG or SSH signature
git verify-tag v1.3.0
git config --global gpg.format ssh        # sign with your SSH key
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true   # sign every commit
```
GitHub shows a "Verified" badge on signed commits and tags once you've uploaded the key as a *signing key*.
