#!/usr/bin/env bash
# Builds Diego's Wiki Engine and (re)starts the three wikis under lfdiego.xyz/wiki/.
# Idempotent: safe to run on every deploy. Run as root, from the server's deploy.sh:
#
#     bash /path/to/lfdiego.xyz/deploy/wiki/deploy.sh
#
# First run: creates the "wiki" user, /etc/wiki/<name>.env with a random admin password
# (printed once, also readable in the env file), the systemd units and the nginx snippets.
# Needs: java 21+ (JDK, to build), git, nginx, and read access to the private engine repo
# (a deploy key; set ENGINE_REPO if you clone it another way).
set -euo pipefail

SITE_REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENGINE_REPO="${ENGINE_REPO:-git@github.com:DiegoLikesPizza/diegos-wiki-engine.git}"
ENGINE_BRANCH="${ENGINE_BRANCH:-main}"
ENGINE_DIR="${ENGINE_DIR:-/srv/wiki-engine}"
HERE="$SITE_REPO/deploy/wiki"

log() { printf '[wiki] %s\n' "$*"; }

# name | port | base path | wiki name | Markdown folder to import
WIKIS=(
  "guides|8091|/wiki/guides|Developer Guides|$SITE_REPO/wiki/guides"
  "java27|8092|/wiki/java27|Java 27|$ENGINE_DIR/examples/java27"
  "kotlin|8093|/wiki/kotlin|Kotlin|$ENGINE_DIR/examples/kotlin"
)

# --- engine source
if [ -d "$ENGINE_DIR/.git" ]; then
  git -C "$ENGINE_DIR" fetch --quiet origin "$ENGINE_BRANCH"
  git -C "$ENGINE_DIR" checkout --quiet -B "$ENGINE_BRANCH" "origin/$ENGINE_BRANCH"
else
  log "cloning $ENGINE_REPO"
  git clone --quiet --branch "$ENGINE_BRANCH" "$ENGINE_REPO" "$ENGINE_DIR"
fi

# --- build the jar only when the engine changed
rev="$(git -C "$ENGINE_DIR" rev-parse HEAD)"
mkdir -p /opt/wiki
if [ ! -f /opt/wiki/wiki.jar ] || [ "$(cat /opt/wiki/wiki.rev 2>/dev/null)" != "$rev" ]; then
  log "building engine ${rev:0:7}"
  (cd "$ENGINE_DIR" && ./gradlew shadowJar --quiet --no-daemon)
  install -m 644 "$ENGINE_DIR/build/libs/wiki.jar" /opt/wiki/wiki.jar.new
  mv /opt/wiki/wiki.jar.new /opt/wiki/wiki.jar
  echo "$rev" > /opt/wiki/wiki.rev
fi

# --- user, units, per-wiki settings
id wiki >/dev/null 2>&1 || useradd --system --home-dir /var/lib/wiki --shell /usr/sbin/nologin wiki
install -d -m 750 -o root -g wiki /etc/wiki
install -m 644 "$HERE/wiki@.service" /etc/systemd/system/wiki@.service
systemctl daemon-reload

for entry in "${WIKIS[@]}"; do
  IFS='|' read -r name port base title import <<<"$entry"
  install -d -m 750 -o wiki -g wiki "/var/lib/wiki/$name"
  env_file="/etc/wiki/$name.env"
  if [ ! -f "$env_file" ]; then
    password="$(head -c 18 /dev/urandom | base64 | tr -d '/+=')"
    umask 027
    cat > "$env_file" <<ENV
WIKI_PORT=$port
WIKI_BASE_PATH=$base
WIKI_IMPORT=$import
# Used only for the very first start (creates the admin); change the password in the wiki afterwards.
WIKI_NAME=$title
WIKI_PUBLIC_READ=true
WIKI_ADMIN_USER=diego
WIKI_ADMIN_PASSWORD=$password
ENV
    chgrp wiki "$env_file"
    log "created $env_file: admin \"diego\", password $password"
  fi
  # The import folder must be readable by the wiki user.
  if ! runuser -u wiki -- test -r "$import"; then
    log "WARNING: $import is not readable by the wiki user; the import will fail"
  fi
  systemctl enable --quiet "wiki@$name"
  systemctl restart "wiki@$name"
done

# --- nginx snippets (reload only when they changed)
changed=0
for pair in "nginx.conf:lfdiego-wiki.conf" "nginx-proxy.conf:lfdiego-wiki-proxy.conf"; do
  src="$HERE/${pair%%:*}"; dst="/etc/nginx/snippets/${pair##*:}"
  if ! cmp -s "$src" "$dst"; then install -D -m 644 "$src" "$dst"; changed=1; fi
done
if [ "$changed" = 1 ]; then
  if grep -rqs "snippets/lfdiego-wiki.conf" /etc/nginx/sites-enabled /etc/nginx/conf.d; then
    nginx -t -q && systemctl reload nginx && log "nginx reloaded"
  else
    log "add 'include snippets/lfdiego-wiki.conf;' to the lfdiego.xyz server block, then: nginx -t && systemctl reload nginx"
  fi
fi

# --- health check
for entry in "${WIKIS[@]}"; do
  IFS='|' read -r name port base _ _ <<<"$entry"
  for _ in $(seq 1 30); do
    code="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$port$base/wiki/home" || true)"
    [ "$code" = 200 ] && break
    sleep 1
  done
  if [ "$code" = 200 ]; then log "$name is up on :$port$base"; else log "ERROR: $name answered $code; see journalctl -u wiki@$name"; exit 1; fi
done
