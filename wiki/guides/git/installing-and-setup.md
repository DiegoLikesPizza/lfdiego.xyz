# Installing and Setup

Five minutes of setup, once per computer.

## Install Git
| System | How |
|---|---|
| **Windows** | Download *Git for Windows* from git-scm.com. Keep the defaults, but choose **"Use Visual Studio Code as Git's default editor"** (or your editor) and **"Checkout as-is, commit Unix-style line endings"**. It includes **Git Bash**, a terminal where all commands in this guide work. |
| **macOS** | Run `git --version` in Terminal. If Git is missing, macOS offers to install the *Command Line Tools*. Newer versions: `brew install git`. |
| **Linux** | `sudo apt install git` (Debian/Ubuntu), `sudo dnf install git` (Fedora), `sudo pacman -S git` (Arch). |

Check it:
```sh
git --version
```
```
git version 2.43.0
```

## Tell Git who you are
Every commit stores an author name and e-mail. Set them once:
```sh
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"
```
Use the same e-mail as your GitHub account, so GitHub links your commits to your profile. If you don't want your address public, GitHub gives you a private one (`12345+ada@users.noreply.github.com`) under *Settings → Emails*.

## Sensible defaults
```sh
git config --global init.defaultBranch main     # new repositories start on "main", not "master"
git config --global pull.rebase true            # git pull = fetch + rebase (straight history)
git config --global fetch.prune true            # forget branches deleted on the server
git config --global push.autoSetupRemote true   # first "git push" of a branch just works
git config --global core.editor "code --wait"   # VS Code for commit messages (or "nano", "vim", "idea --wait")
```
Why each one matters is explained in [[git/Configuration]].

## Where settings are stored
```sh
git config --list --show-origin
```
```
file:/home/ada/.gitconfig	user.name=Ada Lovelace
file:/home/ada/.gitconfig	user.email=ada@example.com
file:/home/ada/.gitconfig	init.defaultbranch=main
file:.git/config	core.repositoryformatversion=0
file:.git/config	core.filemode=true
file:.git/config	core.bare=false
file:.git/config	core.logallrefupdates=true
file:.git/config	remote.origin.url=git@github.com:ada/shop.git
file:.git/config	remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
```
Ask for one setting to see which file it comes from:
```sh
git config --show-origin user.email
```
```
file:/home/ada/.gitconfig	ada@example.com
```
| Level | Flag | File | Applies to |
|---|---|---|---|
| system | `--system` | `/etc/gitconfig` | every user on the machine |
| global | `--global` | `~/.gitconfig` | you, in every repository |
| local | `--local` (default) | `.git/config` | this one repository |

The most specific level wins. Use a local setting for a different e-mail in work repositories:
```sh
cd ~/work/company-repo
git config user.email "ada@company.example"
```

## Connecting to GitHub
You need either **SSH keys** (recommended) or **HTTPS with a token**; GitHub doesn't accept account passwords for Git. Step by step: [[github/Authentication]].

## Line endings on Windows
Windows uses CRLF (`\r\n`), macOS and Linux LF (`\n`). Mixing them makes every line look changed. The installer's default (`core.autocrlf=true`) converts automatically; a `.gitattributes` file in the repository makes it consistent for the whole team: [[git/Configuration]].

## Graphical tools
You don't have to live in the terminal. IntelliJ IDEA and VS Code have excellent Git support ([[IDEs/Git in the IDE]]). Still, learn the commands first: every GUI button runs one of them, and error messages are written in their terms.
