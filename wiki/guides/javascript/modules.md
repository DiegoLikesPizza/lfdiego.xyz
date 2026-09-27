# Modules

**Split code into modules; let npm fetch the rest.** An ES module is a file with its own scope that **exports** values and **imports** others. Output from `code/javascript/modules/`.

## Export and import
```js
// math.js: named exports and a default export
export const PI_ROUGH = 3.14;
export function add(a, b) { return a + b; }
export default function mean(xs) {
  return xs.reduce(add, 0) / xs.length;
}
console.log("math.js evaluated (only once, however often it is imported)");
```
```js
// app.js: importing
import mean, { add, PI_ROUGH as PI } from "./math.js";
import * as math from "./math.js";
import { readFile } from "node:fs/promises";

console.log(add(2, 3), mean([1, 2, 3, 4]), PI, Object.keys(math));
const { version } = JSON.parse(await readFile(new URL("./package.json", import.meta.url), "utf8"));   // top-level await
console.log("package version", version);
const { default: lazyMean } = await import("./math.js");     // dynamic import, e.g. for code splitting
console.log("dynamic import:", lazyMean([10, 20]));
```
```
math.js evaluated (only once, however often it is imported)
5 2.5 3.14 [ 'PI_ROUGH', 'add', 'default' ]
package version 1.0.0
dynamic import: 15
```
- A module runs **once**; every importer gets the same instance (a natural singleton).
- Imports are **live bindings** and read-only.
- Paths need the file extension in browsers and Node (`"./math.js"`); bundlers often let you omit it.
- `import.meta.url` is the module's own URL (to find files next to it).
- Modules are always in strict mode.

## Named vs default exports
| Named | Default |
|---|---|
| `export function add` → `import { add }` | `export default function mean` → `import mean` (any name) |
| names are checked; auto-import and rename-refactoring work well | the importer picks the name, so it can differ per file |
| several per file | one per file |

Many teams prefer **named exports** everywhere for consistency (React components are the common exception).

## ESM vs CommonJS
Node also has the older **CommonJS** system:
```js
const fs = require("node:fs");          // CommonJS
module.exports = { add };
```
| | ES modules (ESM) | CommonJS |
|---|---|---|
| Syntax | `import` / `export` | `require` / `module.exports` |
| Loading | static, async; top-level `await` | synchronous |
| Enabled by | `.mjs`, or `"type": "module"` in package.json | `.cjs`, or no `"type"` |
| Browsers | yes | no (needs a bundler) |

Use ESM for new code. Node 22 can `require()` most ES modules; ESM can `import` CommonJS packages.

## In the browser
```html
<script type="module" src="app.js"></script>
```
Browsers load `import`ed files on demand. **Import maps** let you write bare names (`import { z } from "zod"`) without a bundler. For production, bundlers combine and minify modules ([[javascript/Tooling]]).

## Circular imports
If `a.js` imports `b.js` and `b.js` imports `a.js`, one of them sees the other half-initialised (`ReferenceError: Cannot access 'x' before initialization`). Restructure: move shared code into a third module.
