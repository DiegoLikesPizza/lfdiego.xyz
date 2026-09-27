# Large Files and Submodules

Git is built for text. Big binaries, huge repositories and code shared between repositories need extra tools.

## Why big files hurt
Every version of every file stays in history forever. Commit a 200 MB video, change it three times, delete it: every clone still downloads 600+ MB. GitHub warns at 50 MB and **rejects files over 100 MB**.

## Git LFS (Large File Storage)
LFS stores large files on a separate server and commits only a small pointer file:
```sh
git lfs install                 # once per machine
git lfs track "*.psd" "*.mp4"   # writes rules to .gitattributes
git add .gitattributes design.psd
git commit -m "Add design source"
```
The pointer in the repository looks like this:
```
version https://git-lfs.github.com/spec/v1
oid sha256:4d7a214614ab2935c943f9e0ff69d22eadbb8f32b1258daaa5e2ca24d17e2393
size 12345678
```
Clones download only the LFS versions they check out. GitHub includes 1 GB of LFS storage and 1 GB/month bandwidth for free; more costs money.

Already committed big files? `git lfs migrate import --include="*.psd" --everything` rewrites history to move them into LFS (everyone re-clones afterwards, see [[git/Rewriting History]]).

## Faster clones of big repositories
| Command | Downloads |
|---|---|
| `git clone --depth 1 <url>` | only the latest commit (shallow); CI uses this |
| `git clone --filter=blob:none <url>` | all commits and trees, file contents on demand (partial clone) |
| `git sparse-checkout set apps/web libs/ui` | check out only some folders of a monorepo |
| `git fetch --unshallow` | turn a shallow clone into a full one |

Partial clone + sparse checkout make even huge monorepos manageable.

## Submodules: a repository inside a repository
A submodule pins **another repository at a specific commit** inside yours, e.g. a shared theme or a vendored library:
```sh
git submodule add https://github.com/ada/ui-kit.git libs/ui-kit
git commit -m "Add ui-kit as a submodule"
```
This adds a `.gitmodules` file and a special entry recording the submodule's commit hash.

Cloning a project with submodules:
```sh
git clone --recurse-submodules <url>
# or, after a normal clone:
git submodule update --init --recursive
```
Updating the pinned version:
```sh
cd libs/ui-kit && git switch main && git pull && cd ../..
git add libs/ui-kit && git commit -m "Update ui-kit"
```
Set `git config --global submodule.recurse true` so `pull`/`switch` update submodules automatically.

### The catch
Submodules are easy to get into inconsistent states: someone forgets `--recurse-submodules`, a submodule is in detached HEAD, a commit pins a submodule version that was never pushed. Alternatives are often simpler:
- **A package manager** (npm, Maven Central/GitHub Packages, Gradle composite builds) for shared libraries,
- **a monorepo** (one repository, several projects),
- **git subtree** (copies the other repository's files into yours, with history, no special clone steps).

## Checking repository size
```sh
git count-objects -vH                  # size of packed history
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sort -k3 -n | tail -5   # 5 biggest objects
```
