# Where It Runs

**One language, two big homes: the browser and Node.js.** The language itself is the same everywhere. What changes is the environment around it: the APIs you can call.

| Browser | Both | Node.js |
|---|---|---|
| **talks to the page** | **the language** | **talks to the machine** |
| `document` and the DOM, `window`, events, `localStorage`, cookies, `navigator`, canvas | variables, functions, objects, classes, promises, modules, JSON, `fetch`, `URL`, `setTimeout`, `console`, `structuredClone` | files (`fs`), servers (`http`), `process` and env variables, child processes, npm packages |
| sandboxed: can't read your disk | | full access to the machine |

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("world"));   // Hello, world!
```
runs identically in both.

## Engines and runtimes
| Runtime | Engine | Notes |
|---|---|---|
| Chrome, Edge, Opera | V8 | |
| Firefox | SpiderMonkey | |
| Safari | JavaScriptCore | |
| **Node.js** | V8 | the server standard; LTS versions every October ([[javascript/Node.js]]) |
| Deno | V8 | TypeScript built in, secure by default |
| Bun | JavaScriptCore | fast all-in-one: runtime, bundler, test runner, package manager |

The engine parses the code, interprets it, and JIT-compiles hot functions to machine code, like the JVM ([[java/How Java Runs]]).

## ECMAScript
The language standard is **ECMAScript**; a new edition ships every June (ES2024, ES2025…). Browsers and Node implement new features continuously. Check support on caniuse.com or MDN's compatibility tables; build tools can transpile modern syntax for old browsers ([[javascript/Tooling]]).

Features from recent years used in this guide: `?.` and `??` (2020), `Array.prototype.at` (2022), `toSorted`/`toReversed`/`with` (2023), `Object.groupBy` (2024), Set methods like `union` (2025).

## Where else?
- **Mobile apps**: React Native, Capacitor/Ionic.
- **Desktop apps**: Electron (VS Code, Slack, Discord), Tauri.
- **Serverless/edge**: Cloudflare Workers, Vercel/Netlify functions.
- **Build tooling**: almost every web build tool is (or was) written in JavaScript.

## Next
Run your first code: [[javascript/Running JavaScript]].
