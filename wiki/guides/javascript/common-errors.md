# Common Errors

Error messages from Node 22 / Chrome (V8), copied from real runs of `code/javascript/`. Firefox (SpiderMonkey) and Safari word some of them differently; equivalents are noted.

## `TypeError: Cannot read properties of undefined (reading 'name')`
Firefox: `TypeError: user is undefined` / Safari: `undefined is not an object (evaluating 'user.name')`.

You accessed a property on `undefined`. The thing left of the dot doesn't exist: a missing API field, an array index out of range, data that hasn't loaded yet, a function that forgot to `return`, or a destructured field with a typo. Fix the source; guard with `?.` only if "missing" is legitimate ([[javascript/Objects]]).

## `TypeError: Cannot read properties of null (reading 'items')`
Same, for `null`. In the browser, the classic cause is `document.querySelector(...)` returning `null`: wrong selector, or the script ran before the element existed (use `type="module"` or `defer`: [[javascript/Running JavaScript]]).

## `TypeError: Cannot set properties of undefined (setting 'x')`
Writing a property on `undefined`: initialise the object first (`obj.settings ??= {}`).

## `TypeError: total is not a function`
You called something that isn't a function: a typo, a variable that shadows a function, calling the *result* instead of the function, or a missing import (the import is `undefined`). Also `xyz.map is not a function`: `xyz` isn't an array (maybe an object, or `undefined`).

## `ReferenceError: notDeclared is not defined`
The variable doesn't exist in this scope: typo, missing `import`, or a browser-only global (`window`, `document`) used in Node or during server-side rendering.

## `ReferenceError: Cannot access 'early' before initialization`
A `let`/`const`/`class` used before its declaration line (temporal dead zone), or a circular import ([[javascript/Variables and Scope]], [[javascript/Modules]]).

## `TypeError: Assignment to constant variable.`
Reassigning a `const`. Use `let`, or mutate the object instead of reassigning.

## `TypeError: Cannot assign to read only property 'name' of object '#<Object>'`
Writing to a frozen object (or a getter-only property) in strict mode.

## `SyntaxError: Unexpected token …`
The parser hit something it didn't expect: a missing `)` `}` or `,`, a stray character, or JSX/TypeScript in a plain `.js` file run without a build step.

## `SyntaxError: Expected property name or '}' in JSON at position 2` / `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
`JSON.parse`/`res.json()` got something that isn't JSON: single quotes or unquoted keys, or (the second one) an **HTML page**, usually a 404/500 error page or a wrong URL. Check `res.ok` and the URL ([[javascript/Fetch and HTTP]]).

## `SyntaxError: Unexpected end of JSON input`
An empty string was parsed: an empty response body (e.g. `204 No Content`), or an empty `localStorage` value.

## `SyntaxError: Cannot use import statement outside a module`
The file is treated as a classic script or CommonJS: a `<script>` without `type="module"`, a tool running CommonJS (older Jest setups), or a file mixing `require` and `import`. Add `"type": "module"` to `package.json`, use `.mjs`, or `<script type="module">` ([[javascript/Modules]]). (Node 22 detects `import` syntax in `.js` files without `"type"` automatically.)

## `SyntaxError: await is only valid in async functions and the top level bodies of modules` / `SyntaxError: Unexpected reserved word`
`await` inside a function that isn't `async`. CommonJS files get the first message, ES modules the second. Mark the function `async`, or use top-level `await` in an ES module.

## `RangeError: Maximum call stack size exceeded`
Endless recursion: a function calling itself without a base case, a setter setting itself, or two functions calling each other.

## `RangeError: Invalid array length` / `toFixed() digits argument must be between 0 and 100`
A number argument out of range.

## `TypeError: Reduce of empty array with no initial value`
Give `reduce` a second argument ([[javascript/Arrays and Array Methods]]).

## `TypeError: Class constructor Dog cannot be invoked without 'new'`
Call classes with `new`.

## `TypeError: Do not know how to serialize a BigInt`
`JSON.stringify` can't handle BigInt; convert to a string first ([[javascript/JSON]]).

## `TypeError: fetch failed` (cause `ECONNREFUSED`, `ENOTFOUND`)
Node's `fetch` couldn't connect: server not running, wrong port or host name ([[javascript/Fetch and HTTP]]).

## `TimeoutError: The operation was aborted due to timeout` / `AbortError: This operation was aborted`
An `AbortSignal.timeout()` fired or `controller.abort()` was called.

## `Access to fetch at '…' from origin '…' has been blocked by CORS policy`
The **server** must send `Access-Control-Allow-Origin` for your origin. Not fixable in frontend code ([[javascript/Security]]).

## `Uncaught (in promise) …` / Node: process exits on an unhandled rejection
A rejected promise without `.catch` or `try/catch` around `await` ([[javascript/Promises]]).

## `ENOENT: no such file or directory, open '…'`
Node couldn't find the file. Relative paths are relative to the **working directory** (where you ran `node`), not the script: build paths from `import.meta.dirname` or `new URL("./file", import.meta.url)`.

## TypeScript: `TS2339 Property 'x' does not exist on type`, `TS2322 Type 'string' is not assignable to type 'number'`, `TS18048 'x' is possibly 'undefined'`
The compiler caught a bug before it happened ([[javascript/TypeScript]]).

## Things that aren't errors but are bugs
| Symptom | Cause |
|---|---|
| `[object Object]` on the page | an object converted to a string: use `JSON.stringify` or pick a field |
| `NaN` | arithmetic on `undefined` or non-numeric strings |
| `"53"` instead of `8` | `"5" + 3`: string concatenation ([[javascript/Types and Equality]]) |
| `[1, 10, 2, 9]` after sorting | `sort()` without a comparator |
| a `0` or empty string replaced by a default | `||` instead of `??` |
| code after `forEach(async …)` runs too early | `forEach` doesn't await ([[javascript/Async and Await]]) |
