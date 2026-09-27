#!/usr/bin/env bash
# Reproduces every Git output shown in the Git guide.
# Fixed names and dates make the commit hashes identical on every run.
# Usage: bash demo.sh [section]   (sections: setup internals branches conflict rebase reset stash
#                                  cherry bisect reflog remote errors tags log worktree)
set -uo pipefail
export GIT_AUTHOR_NAME="Ada" GIT_AUTHOR_EMAIL="ada@example.com"
export GIT_COMMITTER_NAME="Ada" GIT_COMMITTER_EMAIL="ada@example.com"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 LANG=C
t=1767261600   # 2026-01-01 10:00 UTC; every commit is one hour later
tick() { t=$((t + 3600)); export GIT_AUTHOR_DATE="@$t +0100" GIT_COMMITTER_DATE="@$t +0100"; }
run() { echo "\$ $*"; "$@" </dev/null 2>&1; echo; }
fresh() {
  rm -rf "$WORK" && mkdir -p "$WORK/shop" && cd "$WORK/shop"
  git init -q -b main . && git config user.name Ada && git config user.email ada@example.com
  git config advice.detachedHead true
}
commit() { tick; git commit -q "$@"; }
WORK="${WORK:-$(mktemp -d)}"
section="${1:-all}"
is() { [ "$section" = all ] || [ "$section" = "$1" ]; }

if is setup; then
  echo "=== setup"
  rm -rf "$WORK" && mkdir -p "$WORK/shop" && cd "$WORK/shop"
  run git init -b main
  git config user.name Ada && git config user.email ada@example.com
  printf '# Shop\n' > README.md
  printf 'export function total(items) {\n  return items.reduce((sum, i) => sum + i.price, 0);\n}\n' > cart.js
  run git status
  run git add README.md cart.js
  run git status --short
  tick; run git commit -m "Add cart total"
  printf 'node_modules/\n' > .gitignore
  sed -i 's/i.price/i.price * i.qty/' cart.js
  run git status
  run git diff
  run git add .
  run git diff --staged --stat
  tick; run git commit -m "Count quantities in the cart total"
  run git log --oneline
fi

if is internals; then
  echo "=== internals"
  fresh
  mkdir src && printf '# Shop\n' > README.md && printf 'console.log("hi")\n' > src/app.js
  git add . && commit -m "Initial commit"
  printf 'console.log("hi, shop")\n' > src/app.js && git add . && commit -m "Greet the shop"
  run cat .git/HEAD
  run cat .git/refs/heads/main
  run git cat-file -t HEAD
  run git cat-file -p HEAD
  run git cat-file -p 'HEAD^{tree}'
  run git ls-tree -r HEAD
  run git cat-file -p HEAD:README.md
  echo '# Shop' | { echo '$ echo "# Shop" | git hash-object --stdin'; git hash-object --stdin; echo; }
  run git count-objects -v
fi

if is branches; then
  echo "=== branches"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "Initial commit"
  run git switch -c feature/login
  printf 'login\n' > login.js && git add . && commit -m "Add login form"
  run git switch main
  run git merge feature/login
  run git branch -d feature/login
  git switch -q -c feature/search
  printf 'search\n' > search.js && git add . && commit -m "Add search box"
  git switch -q main
  printf 'b\n' >> a.txt && git add . && commit -m "Update a.txt on main"
  tick; run git merge --no-edit feature/search
  run git log --oneline --graph
  run git branch -v
  git switch -q -c feature/dark
  printf 'dark\n' > dark.css && git add . && commit -m "Add dark mode"
  printf 'dark2\n' >> dark.css && git add . && commit -m "Tune dark colours"
  git switch -q main
  tick; run git merge --squash feature/dark
  tick; run git commit -m "Add dark mode (#12)"
  run git log --oneline -3
fi

if is conflict; then
  echo "=== conflict"
  fresh
  git config merge.conflictstyle zdiff3
  printf 'export function greet(name) {\n  return "Hello " + name;\n}\n' > greet.js && git add . && commit -m "Add greet"
  git switch -q -c feature/formal
  sed -i 's/"Hello " + name/"Good day, " + name/' greet.js && git add . && commit -m "Formal greeting"
  git switch -q main
  sed -i 's/"Hello " + name/`Hi ${name}!`/' greet.js && git add . && commit -m "Casual greeting"
  tick; run git merge feature/formal
  run git status
  run cat greet.js
  run git diff
  printf 'export function greet(name) {\n  return `Good day, ${name}!`;\n}\n' > greet.js
  run git add greet.js
  tick; run git commit --no-edit
  run git log --oneline --graph
fi

if is rebase; then
  echo "=== rebase"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "A"
  printf 'b\n' > b.txt && git add . && commit -m "B"
  git switch -q -c feature
  printf 'f1\n' > f1.txt && git add . && commit -m "F1"
  printf 'f2\n' > f2.txt && git add . && commit -m "F2"
  git switch -q main
  printf 'e\n' > e.txt && git add . && commit -m "E"
  git switch -q feature
  run git log --oneline --graph --all
  tick; run git rebase main
  run git log --oneline --graph --all
  git switch -q main
  run git merge feature
fi

if is reset; then
  echo "=== reset"
  fresh
  printf 'v1\n' > f.txt && git add . && commit -m "One"
  printf 'v2\n' > f.txt && git add . && commit -m "Two"
  run git reset --soft HEAD~1
  run git status --short
  tick; git commit -q -m "Two"
  run git reset HEAD~1
  run git status --short
  git add . && tick && git commit -q -m "Two"
  printf 'v3 not committed\n' > f.txt
  run git reset --hard HEAD~1
  run cat f.txt
  run git status --short
  printf 'oops\n' > f.txt
  run git restore f.txt
  printf 'staged\n' > f.txt && git add f.txt
  run git restore --staged f.txt
  run git status --short
  git restore f.txt
  printf 'v2\n' > f.txt && git add . && commit -m "Two"
  printf 'v3\n' > f.txt && git add . && commit -m "Three: breaks checkout"
  tick; run git revert --no-edit HEAD
  run git log --oneline
  tick; run git commit --amend -m "Revert the checkout change (bug #31)"
  run git log --oneline -2
fi

if is stash; then
  echo "=== stash"
  fresh
  printf 'body{}\n' > style.css && printf 'x\n' > app.js && git add . && commit -m "Initial commit"
  printf 'header{}\n' >> style.css
  run git stash push -m "header styles"
  printf 'y\n' >> app.js; printf 'new\n' > notes.txt
  run git stash -u
  run git stash list
  run git stash show -p 'stash@{1}'
  run git stash pop
  run git stash list
  run git status --short
fi

if is cherry; then
  echo "=== cherry"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "A"
  git switch -q -c release/1.x
  git switch -q main
  printf 'x\n' > x.txt && git add . && commit -m "X: new checkout page"
  printf 'price fix\n' > fix.txt && git add . && commit -m "Fix rounding of prices"
  fix=$(git rev-parse --short HEAD)
  git switch -q release/1.x
  tick; run git cherry-pick "$fix"
  run git log --oneline --graph --all
  run git cherry -v main
fi

if is bisect; then
  echo "=== bisect"
  fresh
  printf 'function add(a, b) { return a + b; }\nmodule.exports = add;\n' > add.js
  printf 'const add = require("./add"); process.exit(add(2, 2) === 4 ? 0 : 1);\n' > test.js
  git add . && commit -m "Add add()" && git tag v1.0.0
  for i in $(seq 1 15); do
    printf '// change %s\n' "$i" >> notes.js
    [ "$i" = 11 ] && sed -i 's/a + b/a + b + (b > 1 ? 1 : 0)/' add.js
    git add . && commit -m "Change $i"
  done
  run git bisect start HEAD v1.0.0
  run git bisect run node test.js
  run git bisect reset
fi

if is reflog; then
  echo "=== reflog"
  fresh
  printf '1\n' > f.txt && git add . && commit -m "Keep me"
  printf '2\n' >> f.txt && git add . && commit -m "Important work"
  run git reset --hard HEAD~1
  run git log --oneline
  run git reflog
  run git switch -c rescue 'HEAD@{1}'
  run git log --oneline
fi

if is remote; then
  echo "=== remote"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "A"
  git init -q --bare -b main "$WORK/origin.git"
  git remote add origin "$WORK/origin.git"
  run git push -u origin main
  run git remote -v
  git clone -q "$WORK/origin.git" "$WORK/teammate" && cd "$WORK/teammate"
  git config user.name Bo && git config user.email bo@example.com
  printf 'teammate\n' > t.txt && git add . && commit -m "Teammate: add t.txt" && git push -q
  cd "$WORK/shop"
  printf 'b\n' > b.txt && git add . && commit -m "B"
  printf 'c\n' > c.txt && git add . && commit -m "C"
  run git push
  run git fetch
  run git status
  run git log --oneline --graph --all
  run git branch -vv
  run git log --oneline main..origin/main
  tick; run git pull --rebase
  run git reflog -5
  run git log --oneline --graph --all
  run git push
  git switch -q -c feature/login && printf 'l\n' > l.txt && git add . && commit -m "Login"
  run git push -u origin feature/login
  run git branch -vv
fi

if is errors; then
  echo "=== errors"
  cd "$WORK" && mkdir -p notrepo && cd notrepo
  run git status
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "A"
  git switch -q -c other && printf 'other\n' > a.txt && git add . && commit -m "Other"
  git switch -q main && printf 'local edit\n' > a.txt
  run git switch other
  git restore a.txt
  run git checkout "$(git rev-parse --short HEAD)"
  git switch -q main
  run git commit -m "nothing"
  run git push
  mkdir -p "$WORK/unrel" && cd "$WORK/unrel" && git init -q -b main && printf 'u\n' > u.txt && git add . && tick && git commit -q -m "Unrelated"
  cd "$WORK/shop" && git remote add unrel "$WORK/unrel" && git fetch -q unrel
  run git merge unrel/main
  run git checkout does-not-exist
  run git branch -d other
  run git stash pop
fi

if is tags; then
  echo "=== tags"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "Release prep"
  run git tag -a v1.2.0 -m "Release 1.2.0"
  printf 'b\n' > b.txt && git add . && commit -m "Fix typo"
  printf 'c\n' > c.txt && git add . && commit -m "Add search"
  run git describe
  run git tag --list "v1.*"
  run git show --no-patch v1.2.0
  run git switch --detach v1.2.0
fi

if is log; then
  echo "=== log"
  fresh
  printf 'function calculateTotal(items) {\n  return 0;\n}\n' > cart.js && git add . && commit -m "Add calculateTotal stub"
  export GIT_AUTHOR_NAME=Bo GIT_AUTHOR_EMAIL=bo@example.com
  printf 'function calculateTotal(items) {\n  return items.length;\n}\n' > cart.js && git add . && commit -m "Count items"
  export GIT_AUTHOR_NAME=Ada GIT_AUTHOR_EMAIL=ada@example.com
  printf 'function sum(items) {\n  return items.length;\n}\n' > cart.js && git add . && commit -m "Rename calculateTotal to sum"
  run git log -S calculateTotal --oneline
  run git log --author=Bo --format='%h %an %s'
  run git blame cart.js
  run git log --format='%h %ad %s' --date=short
  run git show --stat HEAD
  run git shortlog -sn HEAD
fi

if is worktree; then
  echo "=== worktree"
  fresh
  printf 'a\n' > a.txt && git add . && commit -m "A"
  run git worktree add -b hotfix/login ../shop-hotfix main
  run git worktree list
  run git worktree remove ../shop-hotfix
fi

if is config; then
  echo "=== config"
  fresh
  export HOME="$WORK/home" && mkdir -p "$HOME" && unset GIT_CONFIG_GLOBAL
  git config --global user.name "Ada Lovelace"
  git config --global user.email "ada@example.com"
  git config --global init.defaultBranch main
  git remote add origin git@github.com:ada/shop.git
  run git config --list --show-origin
  run git config --show-origin user.email
  git config user.email "ada@company.example"
  run git config --show-origin user.email
  printf 'node_modules/\n*.log\n!keep.log\n' > .gitignore
  mkdir -p node_modules && touch node_modules/x.js debug.log keep.log
  run git check-ignore -v debug.log node_modules/x.js
  run git status --short --ignored
fi

if is stage; then
  echo "=== stage"
  fresh
  printf 'function total(items) {\n  let sum = 0;\n  for (const i of items) sum += i.price;\n  return sum;\n}\n\n\n\n\n\n\nfunction label(n) {\n  return n + " items";\n}\n' > cart.js
  git add . && commit -m "Cart"
  printf 'function total(items) {\n  let sum = 0;\n  for (const i of items) sum += i.price * i.qty;\n  return sum;\n}\n\n\n\n\n\n\nfunction label(n) {\n  console.log("DEBUG", n);\n  return n + " items";\n}\n' > cart.js
  echo '$ git add -p cart.js     (answers: y, n)'
  printf 'y\nn\n' | git add -p cart.js 2>&1; echo
  run git status --short
  run git diff --staged
  run git diff
  run git diff --word-diff HEAD
  run git diff --stat HEAD
  run git commit -m "Count quantities"
  run git status --short
fi

if is rebase-conflict; then
  echo "=== rebase-conflict"
  fresh
  printf 'price = 10\n' > cart.js && git add . && commit -m "Cart"
  git switch -q -c feature
  printf 'price = 12\n' > cart.js && git add . && commit -m "Raise price"
  git switch -q main
  printf 'price = 9\n' > cart.js && git add . && commit -m "Discount"
  git switch -q feature
  tick; run git rebase main
  run git status
fi

if is rewrite; then
  echo "=== rewrite"
  fresh
  printf 'main\n' > README.md && git add . && commit -m "Initial commit"
  git switch -q -c feature/login
  printf 'form\n' > login.html && git add . && commit -m "Add login form"
  printf 'wip\n' > login.js && git add . && commit -m "wip"
  printf 'css\n' > login.css && git add . && commit -m "Style login form"
  printf 'form fixed\n' > login.html && git add . && commit --fixup=HEAD~2
  run git log --oneline
  echo '$ git rebase -i --autosquash main     (the to-do list Git opens in your editor)'
  tick; GIT_SEQUENCE_EDITOR='cat' git rebase -i --autosquash main 2>&1 | sed 's/\x1b\[K//g; s/\r/\n/g'; echo
  run git log --oneline
  echo '$ git rebase -i main     (change "pick" to "reword" for the wip commit)'
  tick; GIT_SEQUENCE_EDITOR='sed -i "s/^pick \([0-9a-f]*\) wip/reword \1 wip/"' GIT_EDITOR='sed -i "1s/.*/Validate the login form/"' git rebase -i main 2>&1 | sed 's/\x1b\[K//g; s/\r/\n/g'; echo
  run git log --oneline
fi

if is hooks; then
  echo "=== hooks"
  fresh
  cat > .git/hooks/pre-commit <<'HOOK'
#!/bin/sh
# Refuse commits that still contain console.log or a private key.
if git diff --cached -U0 | grep -E '^\+.*(console\.log|BEGIN (RSA|OPENSSH) PRIVATE KEY)'; then
  echo "pre-commit: remove console.log / private keys before committing" >&2
  exit 1
fi
HOOK
  chmod +x .git/hooks/pre-commit
  printf 'console.log("debug")\n' > app.js && git add app.js
  tick; run git commit -m "Add app"
  printf 'export const app = 1\n' > app.js && git add app.js
  tick; run git commit -m "Add app"
  printf 'console.log("debug")\n' >> app.js && git add app.js
  tick; run git commit --no-verify -m "Debug on purpose"
fi
