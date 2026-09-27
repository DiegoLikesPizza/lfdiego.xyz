# Glossary

JavaScript words, in one place.

| Term | Meaning |
|---|---|
| **ECMAScript** | the official language standard JavaScript implements; a new edition ships yearly |
| **runtime** | the environment that runs JS: a browser, Node.js, Deno, Bun ([[javascript/Where It Runs]]) |
| **engine** | the part that executes JS: V8, SpiderMonkey, JavaScriptCore |
| **DOM** | the tree of objects representing the web page ([[javascript/The DOM]]) |
| **hoisting** | declarations being processed before code runs (`var` is initialised as `undefined`) |
| **temporal dead zone** | the time before a `let`/`const` line runs, when using the variable throws |
| **scope** | where a variable is visible: block, function, module or global ([[javascript/Variables and Scope]]) |
| **closure** | a function together with the variables it captured from its scope ([[javascript/Closures]]) |
| **this** | the object a function was called on; arrows inherit it ([[javascript/The this Keyword]]) |
| **prototype** | the object another object inherits properties from ([[javascript/Prototypes and Classes]]) |
| **truthy / falsy** | values that count as true / false in conditions ([[javascript/Types and Equality]]) |
| **coercion** | automatic type conversion, e.g. by `==` or `+` |
| **destructuring** | pulling values out of objects/arrays into variables |
| **spread / rest** | `...` expanding or collecting elements |
| **callback** | a function passed in to be called later |
| **higher-order function** | a function that takes or returns functions |
| **promise** | an object representing a value that will be available later ([[javascript/Promises]]) |
| **async / await** | syntax for writing promise-based code that reads top to bottom ([[javascript/Async and Await]]) |
| **event loop** | the mechanism that runs queued callbacks when the call stack is empty ([[javascript/The Event Loop]]) |
| **call stack** | the functions currently running |
| **microtask** | a high-priority callback (promise reactions) run before the next task |
| **task** (macrotask) | a queued callback such as a timer or event |
| **event bubbling / capturing** | an event travelling up / down the DOM tree ([[javascript/Events]]) |
| **event delegation** | one listener on a parent handling events of many children |
| **module** | a file with its own scope that exports and imports values ([[javascript/Modules]]) |
| **ESM / CommonJS** | the standard module system / Node's older one |
| **npm** | Node's package manager and the registry of packages ([[javascript/npm and package.json]]) |
| **lock file** | exact versions of all installed packages |
| **bundler** | a tool that combines and optimises modules for the browser ([[javascript/Tooling]]) |
| **tree shaking** | removing unused exports from a bundle |
| **HMR** | hot module replacement: updating code in the browser without a reload |
| **transpile** | convert code to another version or dialect, like TS to JS |
| **source map** | maps bundled code back to original files for debugging |
| **JSON** | a text format for data, based on JavaScript object syntax ([[javascript/JSON]]) |
| **fetch** | the standard API for HTTP requests ([[javascript/Fetch and HTTP]]) |
| **CORS** | browser rules controlling cross-origin HTTP responses |
| **XSS** | an attack that injects scripts into a page through unescaped input ([[javascript/Security]]) |
| **CSRF** | an attack that makes a user's browser send an unwanted request |
| **TypeScript** | JavaScript with static types, checked before running ([[javascript/TypeScript]]) |
| **type narrowing** | TypeScript refining a type after a check like `typeof x === "string"` |
| **Node.js** | JavaScript runtime for servers and tools ([[javascript/Node.js]]) |
| **LTS** | long-term support Node version (even numbers) |
| **SPA** | single-page application: one HTML page, JavaScript renders the views |
| **SSR / SSG** | server-side rendering / static site generation |
