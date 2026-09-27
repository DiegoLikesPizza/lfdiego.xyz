# JavaScript

**JavaScript** is the language of the web: every browser runs it, and with **Node.js** it runs on servers, in build tools and on the command line. It's dynamically typed, single-threaded with an event loop, and full of historical quirks that are easy to avoid once you know them. **TypeScript** adds static types on top.

> Every example was run with **Node.js 22** (files in `code/javascript/`). DOM and event examples ran in **Chromium** via Playwright (`code/javascript/browser/`), TypeScript errors come from **tsc 5.9**.

## Learning path
| Step | Read | You'll be able to… |
|---|---|---|
| 1 | [[javascript/Where It Runs]] · [[javascript/Running JavaScript]] | run code in the browser and in Node |
| 2 | [[javascript/Variables and Scope]] · [[javascript/Types and Equality]] · [[javascript/Numbers and Math]] · [[javascript/Strings]] | avoid the classic quirks |
| 3 | [[javascript/Functions]] · [[javascript/Closures]] · [[javascript/The this Keyword]] | write and pass around functions |
| 4 | [[javascript/Objects]] · [[javascript/Prototypes and Classes]] · [[javascript/JSON]] | model data |
| 5 | [[javascript/Arrays and Array Methods]] · [[javascript/Maps Sets and Iterators]] | transform data |
| 6 | [[javascript/The Event Loop]] · [[javascript/Promises]] · [[javascript/Async and Await]] | write async code confidently |
| 7 | [[javascript/Fetch and HTTP]] · [[javascript/Error Handling]] | talk to APIs and handle failure |
| 8 | [[javascript/The DOM]] · [[javascript/Events]] · [[javascript/Browser APIs]] · [[javascript/DevTools]] | build interactive pages |
| 9 | [[javascript/Modules]] · [[javascript/npm and package.json]] · [[javascript/Tooling]] · [[javascript/Node.js]] | work in real projects |
| 10 | [[javascript/TypeScript]] · [[javascript/Security]] | scale up safely |

Errors: [[javascript/Common Errors]]. Quick lookups: [[javascript/Cheat Sheet]], [[javascript/Glossary]].

## A taste
```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("world"));   // Hello, world!

const adults = users.filter((u) => u.age >= 18).map((u) => u.name).toSorted();
const res = await fetch("/api/todos");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const todos = await res.json();
```

## Three rules that prevent most bugs
1. **`const` by default, `let` when it changes, never `var`.** → [[javascript/Variables and Scope]]
2. **Always `===`, never `==`.** → [[javascript/Types and Equality]]
3. **Check `res.ok` after `fetch`**, and never put user input into `innerHTML`. → [[javascript/Fetch and HTTP]], [[javascript/Security]]

## JavaScript vs Java
Despite the name, they're unrelated (the name was marketing in 1995). JavaScript: dynamic types, functions as values everywhere, prototypes, one thread with an event loop. [[Java]]: static types, classes, many threads. TypeScript closes much of the typing gap.
