# Cheat Sheet

## Variables and types
```js
const x = 1;  let y = 2;          // never var
typeof x   Array.isArray(a)   x === y   x ?? "default"   obj?.a?.b
Number("42")   String(42)   Boolean(x)   Number.isNaN(n)   Number.isFinite(n)
```
→ [[javascript/Variables and Scope]], [[javascript/Types and Equality]]

## Strings
```js
`Hello ${name}`   s.trim()   s.toLowerCase()   s.includes("x")   s.split(",")   s.slice(-3)
s.replaceAll("a", "b")   s.padStart(3, "0")   s.at(-1)   a.localeCompare(b, "de")
```

## Functions
```js
const add = (a, b) => a + b;
function tag(label = "note", ...words) { }
const makeCounter = () => { let n = 0; return () => ++n; };   // closure
obj.method.bind(obj)   fn.call(thisArg, ...args)
```
→ [[javascript/Functions]], [[javascript/Closures]], [[javascript/The this Keyword]]

## Objects
```js
const { name, role = "guest", ...rest } = user;
const copy = { ...user, role: "owner" };   structuredClone(user)
Object.keys(o)   Object.entries(o)   Object.fromEntries(pairs)   Object.hasOwn(o, "k")
JSON.stringify(o, null, 2)   JSON.parse(text)
```
→ [[javascript/Objects]], [[javascript/JSON]]

## Arrays
```js
a.map(f)  a.filter(f)  a.reduce(f, 0)  a.find(f)  a.some(f)  a.every(f)  a.includes(x)
a.toSorted((x, y) => x - y)  a.toReversed()  a.with(i, v)  a.at(-1)  a.flat()  a.flatMap(f)
[...a, ...b]   [...new Set(a)]   Array.from({ length: n }, (_, i) => i)   Object.groupBy(a, f)
for (const item of a) { }
```
→ [[javascript/Arrays and Array Methods]], [[javascript/Maps Sets and Iterators]]

## Classes
```js
class Dog extends Animal { #secret = 1; static count = 0; constructor(n) { super(n); } get x() {} }
```
→ [[javascript/Prototypes and Classes]]

## Async
```js
const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data), signal: AbortSignal.timeout(5000) });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const json = await res.json();
const [a, b] = await Promise.all([loadA(), loadB()]);
try { await x(); } catch (err) { } finally { }
```
Order: sync code → all microtasks (promises) → one task (timers, events) → repeat.
→ [[javascript/The Event Loop]], [[javascript/Async and Await]], [[javascript/Fetch and HTTP]]

## DOM
```js
const el = document.querySelector("#id");   document.querySelectorAll(".item")
el.textContent = "safe";   el.classList.toggle("done");   el.dataset.id   el.closest("li")
el.addEventListener("click", (e) => { e.preventDefault(); e.target; });
document.createElement("li")   parent.append(child)   el.remove()
```
→ [[javascript/The DOM]], [[javascript/Events]]

## Modules and npm
```js
export function add() {}   export default main;   import main, { add } from "./math.js";
const mod = await import("./big.js");
```
```sh
npm install x   npm install -D x   npm ci   npm run dev   npx tool   npm outdated
```
→ [[javascript/Modules]], [[javascript/npm and package.json]]

## TypeScript
```ts
type Status = "idle" | "loading";   interface User { id: number; email?: string }
function first<T>(xs: T[]): T | undefined   Partial<User>  Pick<User, "id">  Record<string, number>
```
→ [[javascript/TypeScript]]
