# Configuration

Git reads settings from three levels: `--system` (the machine), `--global` (you), and `--local` (one repository), with the most specific winning. See where each value comes from with `git config --list --show-origin` ([[git/Installing and Setup]]).

## A `~/.gitconfig` worth having
```sh
git config --global pull.rebase true             # pull = fetch + rebase
git config --global fetch.prune true             # drop branches deleted on the remote
git config --global push.autoSetupRemote true    # first push sets the upstream
git config --global push.followTags true         # push annotated tags with their commits
git config --global rerere.enabled true          # remember conflict resolutions
git config --global merge.conflictstyle zdiff3   # show the base in conflicts
git config --global rebase.autoSquash true       # fixup! commits jump into place
git config --global rebase.autoStash true        # stash/unstash around rebases automatically
git config --global diff.colorMoved zebra        # moved lines look different from changed ones
git config --global branch.sort -committerdate   # git branch: most recent first
git config --global init.defaultBranch main
git config --global core.editor "code --wait"    # VS Code for messages
```
The resulting file is plain text; you can edit it directly (`git config --global --edit`):
```ini
[user]
	name = Ada Lovelace
	email = ada@example.com
[pull]
	rebase = true
[alias]
	lg = log --oneline --graph --decorate --all
```

## Aliases
```sh
git config --global alias.st "status --short --branch"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset --soft HEAD~1"
git config --global alias.amend "commit --amend --no-edit"
git config --global alias.last "log -1 --stat"
git config --global alias.wip '!git add -A && git commit -m "WIP"'
```
Now `git lg`, `git undo`, … An alias starting with `!` runs a shell command.

## Per-folder identity
Different e-mail for work repositories, automatically:
```ini
# ~/.gitconfig
[includeIf "gitdir:~/work/"]
	path = ~/.gitconfig-work
```
```ini
# ~/.gitconfig-work
[user]
	email = ada@company.example
```

## `.gitattributes`: consistent line endings and more
Commit a `.gitattributes` file so settings apply to everyone, regardless of their personal config:
```gitattributes
* text=auto eol=lf        # normalise text files to LF in the repository and on disk
*.bat text eol=crlf       # Windows scripts keep CRLF
*.png binary              # never diff, convert or merge images
*.jar binary
package-lock.json -diff   # don't show huge diffs for the lock file
*.pdf filter=lfs diff=lfs merge=lfs -text   # stored with Git LFS
```

### Seeing "LF will be replaced by CRLF"?
That warning comes from `core.autocrlf`: Git converts line endings when checking files in or out. It's harmless, but mixed settings in a team cause "every line changed" diffs. Fix it once, for the whole repository, with `* text=auto eol=lf` in `.gitattributes`, then renormalise:
```sh
git add --renormalize .
git commit -m "Normalise line endings"
```

## Other useful settings
| Setting | Effect |
|---|---|
| `core.excludesFile ~/.gitignore_global` | personal ignore file ([[git/Ignoring Files]]) |
| `core.autocrlf input` (macOS/Linux), `true` (Windows) | line ending conversion, if you have no `.gitattributes` |
| `core.pager "less -FRX"` | don't page short output |
| `help.autocorrect prompt` | `git stauts` → "Did you mean status? [y/N]" |
| `commit.verbose true` | show the diff in the commit message editor |
| `diff.algorithm histogram` | often more readable diffs |
| `status.showUntrackedFiles all` | list files inside untracked folders |
| `credential.helper manager` / `osxkeychain` / `libsecret` | remember HTTPS tokens securely |
| `gpg.format ssh`, `commit.gpgsign true` | sign commits with your SSH key ([[git/Tags and Releases]]) |

## Temporary settings
```sh
git -c core.pager=cat log      # just for one command
GIT_EDITOR=nano git commit     # environment variables also work
```

## Checking a setting
```sh
git config user.email                 # effective value
git config --global --get pull.rebase
git config --show-origin --get-all alias.lg
git config --global --unset alias.wip
```
