// Node.js: process, env, paths, files
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
console.log("read back:", orders, "| basename:", path.basename(file), "| ext:", path.extname(file));
try { await readFile(path.join(dir, "missing.json"), "utf8"); } catch (err) { console.log(err.code, "-", err.message.replace(dir, "<tmp>/js-demo")); }
await rm(dir, { recursive: true });
process.exitCode = 0;
