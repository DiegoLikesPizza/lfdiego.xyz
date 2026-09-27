# Running JavaScript

## In the browser console
Press <kbd>F12</kbd> (or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> / <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>J</kbd>), open **Console**, type:
```js
2 + 2
[1, 2, 3].map((x) => x * 2)
document.title
```
Instant feedback on the current page. → [[javascript/DevTools]]

## In a web page
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Shop</title>
  <script type="module" src="app.js"></script>
</head>
<body>
  <button id="buy">Buy</button>
</body>
</html>
```
| Script tag | Loads | Runs |
|---|---|---|
| `<script src="app.js">` in `<head>` | blocks HTML parsing | immediately, before the page exists: `document.querySelector` finds nothing |
| `<script defer src="app.js">` | in parallel | after the HTML is parsed, in order |
| `<script type="module" src="app.js">` | in parallel | like `defer`; enables `import`/`export` and strict mode ([[javascript/Modules]]) |
| `<script async src="analytics.js">` | in parallel | as soon as it's loaded, any order: for independent scripts |

Use **`type="module"`** for your own code. Open the page through a local server (`npx serve`, VS Code Live Server, `python3 -m http.server`): modules don't load from `file://` URLs.

## With Node.js
Install Node's **LTS** version (nodejs.org, `winget install OpenJS.NodeJS.LTS`, `brew install node`, or **nvm**/**fnm** to switch versions):
```sh
node --version
```
```
v22.22.2
```
```sh
node app.mjs               # run a file
node                        # interactive REPL (.exit to quit)
node --watch app.mjs       # re-run on every save
node --env-file=.env app.mjs   # load environment variables
```
`.mjs` = ES module; `.js` is an ES module if `package.json` has `"type": "module"`, otherwise CommonJS (`require`). → [[javascript/Modules]]

## In a project
Real projects use npm scripts:
```sh
npm install        # dependencies from package.json
npm run dev        # e.g. start Vite's dev server with hot reload
npm test
npm run build
```
→ [[javascript/npm and package.json]], [[javascript/Tooling]]

## Online playgrounds
StackBlitz, CodeSandbox and the TypeScript Playground run code in the browser with no setup: handy for sharing a minimal reproduction of a bug.

## Strict mode
Modules and classes are **strict** automatically: assigning to an undeclared variable throws instead of creating a global, writing to a frozen object throws, `this` in plain functions is `undefined`. In old-style scripts, add `"use strict";` at the top. All examples in this guide are modules.
