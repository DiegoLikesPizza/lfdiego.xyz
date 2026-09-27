# Objects

Objects are collections of key → value properties, JavaScript's all-purpose data structure. Output from `code/javascript/objects.mjs`.

## Destructuring, spread and shorthand
```js
const user = { id: 1, name: "Ada", role: "admin", address: { city: "London" } };

const { name, role = "guest", nickname = "none" } = user;   // pull out fields, with defaults
const { id, ...rest } = user;                                 // rest = everything else
const updated = { ...user, role: "owner" };                   // copy + override
```
```
Ada admin none | rest: { name: 'Ada', role: 'admin', address: { city: 'London' } }
updated.role = owner | original still admin
```
Arrays destructure by position:
```js
const [first, , third, ...others] = ["a", "b", "c", "d", "e"];
let x = 1, y = 2;
[x, y] = [y, x];                                              // swap
```
```
a c [ 'd', 'e' ]
swapped: 2 1
```
Computed keys, shorthand properties and methods:
```js
const key = "color";
const theme = { [key]: "dark", name, greet() { return `hi ${this.name}`; } };
```
```
{ color: 'dark', name: 'Ada', greet: [Function: greet] } hi Ada
```

## Shallow vs deep copies
```js
updated.address.city = "Paris";                               // spread is a SHALLOW copy
console.log("after changing the copy's address:", user.address.city);
const deep = structuredClone(user);
deep.address.city = "Berlin";
```
```
after changing the copy's address: Paris
structuredClone is deep: Paris vs Berlin
```
`{ ...obj }` copies only the top level; nested objects are shared. `structuredClone` copies deeply (not functions or class instances' methods). This matters in React/Redux, where state must be updated immutably.

## `?.` and `??`: use them together
```js
console.log(user.address?.city, "|", guest.address?.city, "|", guest.address?.city ?? "unknown");
console.log(guest.sayHi?.() ?? "no sayHi method");
```
```
Paris | undefined | unknown
no sayHi method
```
- `?.` stops and returns `undefined` if the left side is `null`/`undefined`, instead of throwing ("Cannot read properties of undefined").
- `??` falls back **only** for `null`/`undefined`; `||` falls back for every falsy value:

| Value | `value \|\| "default"` | `value ?? "default"` |
|---|---|---|
| `0` | `"default"` | `0` |
| `""` | `"default"` | `""` |
| `false` | `"default"` | `false` |
| `null` | `"default"` | `"default"` |
| `undefined` | `"default"` | `"default"` |

`user?.address?.city ?? "unknown"` reads safely through missing objects and only falls back when the result is `null` or `undefined`, so a real `0` or empty string survives. Also: `??=` (assign if nullish), `||=`, `&&=`.

## Working with keys and values
```js
Object.keys(user)                  // ['id', 'name', 'role', 'address']
Object.entries({ a: 1, b: 2 })     // [['a', 1], ['b', 2]]
Object.fromEntries([["tea", 250], ["cake", 400]])   // { tea: 250, cake: 400 }
"role" in user                     // true (also finds inherited properties)
Object.hasOwn(user, "id")          // true (own properties only)
delete user.role                   // remove a property
```
Transform an object: `Object.fromEntries(Object.entries(prices).map(([k, v]) => [k, v * 2]))`.

## Getters, setters, freezing
```js
const product = {
  cents: 1999,
  get euros() { return this.cents / 100; },
  set euros(v) { this.cents = Math.round(v * 100); },
};
Object.freeze(product);   // read-only (shallow)
```

## Objects vs Maps
Use plain objects for records with known keys (`{ id, name }`) and JSON. Use `Map` for dictionaries with arbitrary or non-string keys and frequent additions/removals ([[javascript/Maps Sets and Iterators]]).
