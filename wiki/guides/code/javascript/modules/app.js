// app.js: importing
import mean, { add, PI_ROUGH as PI } from "./math.js";
import * as math from "./math.js";
import { readFile } from "node:fs/promises";

console.log(add(2, 3), mean([1, 2, 3, 4]), PI, Object.keys(math));
const { version } = JSON.parse(await readFile(new URL("./package.json", import.meta.url), "utf8"));   // top-level await
console.log("package version", version);
const { default: lazyMean } = await import("./math.js");     // dynamic import, e.g. for code splitting
console.log("dynamic import:", lazyMean([10, 20]));
