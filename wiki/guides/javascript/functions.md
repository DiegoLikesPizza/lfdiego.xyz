# Functions

Functions are **values**: you can store them in variables, pass them as arguments and return them from other functions. Output from `code/javascript/functions.mjs`.

## Three ways to write one
```js
function add(a, b) { return a + b; }                 // declaration (hoisted)
const multiply = function (a, b) { return a * b; };  // expression
const square = (x) => x * x;                          // arrow
```
| | Declaration | Arrow function |
|---|---|---|
| Hoisted | yes, callable before its line | no |
| Own `this` | yes (depends on the call) | no, inherits it ([[javascript/The this Keyword]]) |
| `arguments` object | yes | no (use `...rest`) |
| Usable with `new` | yes | no |
| Typical use | top-level named functions | callbacks, short functions, methods that need the outer `this` |

Arrow body forms: `x => x * 2` (implicit return), `x => { return x * 2; }` (block), `() => ({ id: 1 })` (returning an object literal needs parentheses).

## Parameters
```js
const greet = (name = "world") => `Hello, ${name}!`;   // default parameter
function tag(label = "note", ...words) {               // rest parameter
  return `[${label}] ${words.join(" ")}`;
}
```
```
5 6 16 Hello, world! Hello, Ada!
[note] hello there | [todo] 
Math.max(...[3, 9, 4]) = 9
add(1) = NaN | add(1, 2, 3) = 3
```
- JavaScript doesn't check argument counts: missing ones are `undefined` (`1 + undefined` = `NaN`), extra ones are ignored.
- Defaults apply when the argument is `undefined` (not `null`).
- `...` in a call **spreads** an array into arguments.

### Options objects
Instead of many positional parameters, take one object and destructure it:
```js
function createUser({ name, role = "guest", active = true } = {}) { … }
createUser({ name: "Ada", active: false });
```
Readable at the call site, order-independent, easy to extend.

## Higher-order functions
Functions that take or return functions:
```js
const pipe = (...fns) => (x) => fns.reduce((acc, f) => f(acc), x);
const slugify = pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(/\s+/g, "-"));
console.log(slugify("  Hello World From JS  "));
```
```
hello-world-from-js
```
`map`, `filter`, `addEventListener`, `setTimeout` and `then` all take functions ("callbacks").

### Debounce
Run a function only after calls stop for a while, e.g. search-as-you-type:
```js
function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}
const search = debounce((q) => console.log("  search for", JSON.stringify(q)), 50);
search("j"); search("ja"); search("jav"); search("java");   // only the last one runs
```
```
  search for "java"
```
It works because the returned function **remembers** `timer`: a closure ([[javascript/Closures]]).

## Pure functions
A pure function returns the same output for the same input and changes nothing outside itself. Easy to test and reason about. Keep side effects (DOM updates, network, logging) at the edges.

## Recursion
Works, but deep recursion throws `RangeError: Maximum call stack size exceeded` (around 10,000 frames). Prefer loops for long sequences.
