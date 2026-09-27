# Node.js

**Node.js** runs JavaScript outside the browser: servers, command-line tools, build scripts. Same language and event loop, different APIs: files, network, processes. Output from `code/javascript/node-basics.mjs` and `server.mjs`.

## Process, environment, files
```js
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

console.log("node", process.version, "| platform", process.platform, "| args", process.argv.slice(2));
console.log("PORT from env:", process.env.PORT ?? "(not set, using 3000)");
const dir = path.join(os.tmpdir(), "js-demo");
await mkdir(dir, { recursive: true });
const file = path.join(dir, "orders.json");
await writeFile(file, JSON.stringify([{ id: 1, total: 1999 }], null, 2));
const orders = JSON.parse(await readFile(file, "utf8"));
```
```sh
PORT=8080 node node-basics.mjs --verbose
```
```
node v22.22.2 | platform linux | args [ '--verbose' ]
PORT from env: 8080
read back: [ { id: 1, total: 1999 } ] | basename: orders.json | ext: .json
ENOENT - ENOENT: no such file or directory, open '<tmp>/js-demo/missing.json'
```
- Built-in modules use the `node:` prefix: `node:fs/promises`, `node:path`, `node:http`, `node:crypto`, `node:child_process`, `node:test`.
- Use the **promise** APIs (`fs/promises`) with `await`; the old callback APIs and `*Sync` variants still exist (sync is fine in small scripts, never in servers).
- Configuration comes from environment variables; `node --env-file=.env app.mjs` loads a `.env` file (keep it out of Git).
- `process.exitCode = 1` to signal failure to scripts and CI.

## A JSON API with `node:http`
```js
import http from "node:http";

const todos = [{ id: 1, title: "Buy milk", done: false }];

const server = http.createServer(async (req, res) => {
  const send = (status, body, headers = {}) => {
    res.writeHead(status, { "Content-Type": "application/json", ...headers });
    res.end(body === undefined ? undefined : JSON.stringify(body));
  };
  if (req.method === "GET" && req.url === "/api/todos") return send(200, todos);
  if (req.method === "POST" && req.url === "/api/todos") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    let data;
    try { data = JSON.parse(raw); } catch { return send(400, { error: "Invalid JSON" }); }
    if (typeof data.title !== "string" || !data.title.trim()) return send(422, { error: "title is required" });
    const todo = { id: todos.length + 1, title: data.title.trim(), done: false };
    todos.push(todo);
    return send(201, todo, { Location: `/api/todos/${todo.id}` });
  }
  send(404, { error: "Not found" });
});
server.listen(3000);
```
The responses it gives are on [[javascript/Fetch and HTTP]]. Real projects use a framework for routing, validation and middleware:
| Framework | Style |
|---|---|
| **Express** | the classic, minimal |
| **Fastify** | fast, schema-based validation |
| **Hono** | tiny, runs on Node, Bun, Deno and edge platforms |
| **NestJS** | structured, decorators, dependency injection (Spring-like) |
| **Next.js** API routes / server actions | full-stack React |

## One thread, many connections
A Node server handles thousands of concurrent requests on one thread, because waiting (database, network) doesn't block: it's all event loop callbacks ([[javascript/The Event Loop]]). The flip side: **CPU-heavy work blocks every request**. Move it to `worker_threads`, a queue, or another service.

## Versions
Node releases a new major every six months; **even** versions become **LTS** (22, 24…) and are supported for about 30 months. Use an LTS in production, pin it in `engines` and `.nvmrc`, and switch versions with **nvm** / **fnm** / **Volta**.

## Deploying
A Node app is a long-running process: run it with **systemd**, **pm2** or in a container, behind a reverse proxy like nginx (the same setup as Diego's Wiki Engine on this server). Or use a platform (Render, Fly.io, Railway) or serverless functions.
