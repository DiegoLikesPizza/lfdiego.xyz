# Task: set up the wikis on the lfdiego.xyz server

You are working as root on the Hetzner server that hosts **lfdiego.xyz** (5.75.165.180). Set up three wiki instances of **Diego's Wiki Engine** behind nginx, so that these URLs work:

| URL | Content | Local port |
|---|---|---|
| https://lfdiego.xyz/wiki/ | hub page (part of the static Next.js site, already deployed) | – |
| https://lfdiego.xyz/wiki/guides/ | Developer Guides (Markdown in the site repo, `wiki/guides/`) | 8091 |
| https://lfdiego.xyz/wiki/java27/ | Java 27 wiki (engine repo, `examples/java27`) | 8092 |
| https://lfdiego.xyz/wiki/kotlin/ | Kotlin wiki (engine repo, `examples/kotlin`) | 8093 |

Old URLs like `/wiki/git` must redirect (301) to `/wiki/guides/wiki/git`.

**Current state:** both repos are merged to `main`. The site deploy already published the new `/wiki` hub, so its links return 404 until you're done. Everything you need is in the site repo under `deploy/wiki/`. Read these files first:
- `deploy/wiki/deploy.sh`: idempotent setup and deploy script (run as root)
- `deploy/wiki/wiki@.service`: systemd template unit, one instance per wiki
- `deploy/wiki/nginx.conf` and `deploy/wiki/nginx-proxy.conf`: nginx snippets
- the "Wikis" section in `README.md`

## Background: how deploys work today
- A GitHub Action SSHes in as root on every push to `main` of `DiegoLikesPizza/lfdiego.xyz`. A forced command runs **`/srv/websites/lfdiego.xyz/deploy.sh`**, which builds the static site and publishes it.
- `deploy/wiki/deploy.sh` must be called from that script, so every deploy also updates the wikis.

## Steps

### 0. Look around first (don't change anything yet)
- Read `/srv/websites/lfdiego.xyz/deploy.sh`. Find where the site repo is checked out on the server (call it `$SITE`), and confirm it's at the latest `main` (commit `9831e04` or newer, which contains `deploy/wiki/`).
- Find the nginx config containing the `server` block for `lfdiego.xyz` (probably `/etc/nginx/sites-enabled/`). Note any existing `location /wiki` rules: they may conflict.
- Check `java -version`, `git --version`, `nginx -v` and free RAM (`free -m`). Building the engine with Gradle needs about 1–1.5 GB of RAM.

### 1. Install a JDK (21 or newer)
It must be a JDK, not a JRE, because the script builds the engine with Gradle. For example, on Debian/Ubuntu: `apt install -y openjdk-21-jdk-headless`. The systemd unit starts **`/usr/bin/java`**, so make sure that path exists.

### 2. Give the server read access to the engine repo
The repo is `DiegoLikesPizza/diegos-wiki-engine`. The script clones `git@github.com:DiegoLikesPizza/diegos-wiki-engine.git` into `/srv/wiki-engine` by default.
- Test first: `git ls-remote https://github.com/DiegoLikesPizza/diegos-wiki-engine.git`.
  - **If it works (public repo):** no key needed. Set `ENGINE_REPO=https://github.com/DiegoLikesPizza/diegos-wiki-engine.git` when calling the script (see step 4).
  - **If it fails (private repo):** create a read-only deploy key:
    ```bash
    ssh-keygen -t ed25519 -N "" -f /root/.ssh/wiki_engine_deploy -C "lfdiego.xyz wiki engine (read-only)"
    cat /root/.ssh/wiki_engine_deploy.pub
    ```
    **Stop and ask Diego** to add that public key at GitHub → diegos-wiki-engine → Settings → Deploy keys (read-only, no write access). Then add a host alias to `/root/.ssh/config`:
    ```
    Host github-wiki-engine
        HostName github.com
        User git
        IdentityFile /root/.ssh/wiki_engine_deploy
        IdentitiesOnly yes
    ```
    Use `ENGINE_REPO=git@github-wiki-engine:DiegoLikesPizza/diegos-wiki-engine.git`, and test it with `git ls-remote "$ENGINE_REPO"`.

### 3. Run the wiki deploy script once, by hand
```bash
ENGINE_REPO=<from step 2> bash "$SITE/deploy/wiki/deploy.sh"
```
It clones and builds the engine into `/opt/wiki/wiki.jar`, then creates:
- the `wiki` system user,
- `/var/lib/wiki/<name>` (data),
- `/etc/wiki/<name>.env` (settings; with a **random admin password for user `diego`**, printed once),
- the `wiki@guides`, `wiki@java27` and `wiki@kotlin` services, which it starts and health-checks.

- **Save the three printed admin passwords** and give them to Diego at the end. They are also in `/etc/wiki/*.env` as `WIKI_ADMIN_PASSWORD`.
- The unit runs as user `wiki` and imports `$SITE/wiki/guides`. The `wiki` user must be able to read that folder, including every parent directory. The script warns if it can't. Fix permissions if needed, e.g. `chmod o+rx` on the parent dirs; don't make anything world-writable.
- If a service fails, check `journalctl -u wiki@<name> -n 50`.

### 4. Hook it into the regular deploy
Edit `/srv/websites/lfdiego.xyz/deploy.sh`. **After** the step that updates the site checkout, add:
```bash
ENGINE_REPO=<from step 2> bash "$SITE/deploy/wiki/deploy.sh"
```
Keep the script's existing error handling. A wiki failure should fail the deploy visibly, but it must not leave the static site half-published: put the call after the site has been published.

### 5. nginx
- The script installs `/etc/nginx/snippets/lfdiego-wiki.conf` and `/etc/nginx/snippets/lfdiego-wiki-proxy.conf`.
- Add `include snippets/lfdiego-wiki.conf;` inside the **HTTPS `server` block for lfdiego.xyz**.
- Remove or adjust any old `location` rules for `/wiki/...` that would conflict. Keep whatever serves `/wiki/` (the hub page) from the static site.
- Run `nginx -t && systemctl reload nginx`.

### 6. Verify
```bash
for u in /wiki/ /wiki/guides/ /wiki/guides/wiki/home /wiki/java27/wiki/home /wiki/kotlin/wiki/home \
         /wiki/guides/wiki/ai-prompting /wiki/git /wiki/guides/static/app.css; do
  printf '%-45s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "https://lfdiego.xyz$u")"
done
```
Expected results:
- `/wiki/` and every `/wiki/<name>/wiki/...` page return 200.
- `/wiki/<name>/` returns 302 to `…/wiki/home`.
- `/wiki/git` returns 301 to `/wiki/guides/wiki/git`.
- Static assets return 200.

Then log in once at https://lfdiego.xyz/wiki/guides/login as `diego`, and check that editing works: open a page, click Edit, and check that the editor appears.

Finally, trigger a normal deploy to make sure the hook from step 4 works. Either run `/srv/websites/lfdiego.xyz/deploy.sh` directly, or re-run the "Deploy to production" GitHub Action.

## Rules
- Don't touch the GitHub Action or the SSH forced-command setup.
- Back up any file before you edit it (`cp file file.bak-$(date +%F)`).
- Never open ports 8091–8093 to the internet. The services bind to 127.0.0.1; keep it that way.
- Don't print the admin passwords into logs or commits. Report them to Diego in chat only.
- If something doesn't match this description, stop and ask instead of guessing. Examples: a different checkout path, no nginx, a different OS.

## Report back
1. What you changed (files and services).
2. The verification output from step 6.
3. The three admin passwords, and a reminder to change them in each wiki under *diego ▾ → Change password*.
