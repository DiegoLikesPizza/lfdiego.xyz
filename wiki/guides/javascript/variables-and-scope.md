# Variables and Scope

**`const` by default, `let` when it changes, never `var`.** Most JavaScript surprises come from `var`'s scoping and from loose equality. Avoid both and the language gets much friendlier. Output from `code/javascript/scope.mjs`.

| | Scope | Reassign? | Before declaration |
|---|---|---|---|
| `var` | whole function | yes | `undefined` (hoisted): hides bugs |
| `let` | block `{ … }` | yes | `ReferenceError` |
| `const` | block `{ … }` | no, but objects inside can still change | `ReferenceError` |

## Hoisting and the temporal dead zone
```js
console.log("hoisted var before declaration:", typeof hoisted, hoisted);
var hoisted = "set";
try { console.log(early); } catch (e) { console.log(`${e.name}: ${e.message}`); }
let early = 1;
```
```
hoisted var before declaration: undefined undefined
ReferenceError: Cannot access 'early' before initialization
```
Declarations are processed before code runs (**hoisting**). `var` is initialised to `undefined`, so a typo-level ordering bug silently gives `undefined`. `let`/`const` exist but are unusable until their line: the **temporal dead zone**. Function declarations are hoisted completely (callable before their line).

## Block scope
```js
if (true) { var fnScoped = "var leaks out of blocks"; let blockScoped = "let stays inside"; }
console.log(fnScoped, "| blockScoped defined outside?", typeof blockScoped !== "undefined");
```
```
var leaks out of blocks | blockScoped defined outside? false
```
The famous consequence, callbacks in a loop, is on [[javascript/Closures]].

## `const` is not "immutable"
```js
const user = { name: "Ada" };
user.name = "Grace";                // allowed: the object is mutable
user = {};                          // not allowed
```
```
const object changed: { name: 'Grace' }
TypeError: Assignment to constant variable.
```
`const` fixes the **binding** (the variable can't point elsewhere), not the object. To make the object itself read-only:
```js
const frozen = Object.freeze({ name: "Ada" });
frozen.name = "Grace";
```
```
TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```
(In modules, which are strict; in sloppy scripts the assignment is silently ignored.) `Object.freeze` is shallow; nested objects stay mutable.

## Scopes
| Scope | Created by |
|---|---|
| global | top level of a classic script (`window` in browsers, `globalThis` everywhere) |
| module | top level of an ES module: variables are **not** global |
| function | every function |
| block | `{ }` of `if`, `for`, `while`, or a bare block, for `let`/`const`/`class` |

Inner scopes see outer variables, not the other way round. A variable declared in an inner scope with the same name **shadows** the outer one.

## Naming
`camelCase` for variables and functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for true constants (`const MAX_ITEMS = 50`). Names are case-sensitive; `$` and `_` are allowed.

## Declaring several
```js
let x = 1, y = 2;
[x, y] = [y, x];     // swap with destructuring
```
→ [[javascript/Objects]]
