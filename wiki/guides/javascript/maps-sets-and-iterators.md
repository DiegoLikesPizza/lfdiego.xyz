# Maps, Sets and Iterators

Beyond plain objects and arrays: `Map` for dictionaries, `Set` for unique values, and iterators/generators for sequences, even infinite ones. Output from `code/javascript/collections.mjs`.

## Map
```js
const stock = new Map([["tea", 3]]);
stock.set("cake", 0).set({ sku: 1 }, "object keys work");
console.log(stock.get("tea"), stock.has("cake"), stock.size, [...stock.keys()]);
```
```
3 true 3 [ 'tea', 'cake', { sku: 1 } ]
```
Counting words:
```js
const counts = new Map();
for (const w of "the cat and the hat".split(" ")) counts.set(w, (counts.get(w) ?? 0) + 1);
```
```
Map(4) { 'the' => 2, 'cat' => 1, 'and' => 1, 'hat' => 1 } -> { the: 2, cat: 1, and: 1, hat: 1 }
```
| | Object | Map |
|---|---|---|
| Keys | strings/symbols | anything (objects, numbers…) |
| Order | mostly insertion (integer-like keys first) | always insertion |
| Size | `Object.keys(o).length` | `map.size` |
| Iterate | `Object.entries(o)` | `for (const [k, v] of map)` |
| JSON | directly | `Object.fromEntries(map)` first |
| Prototype keys like `"constructor"` | can clash | no |

## Set
```js
const tags = new Set(["js", "css", "js"]);
tags.add("html");
[...new Set([3, 1, 3, 2, 1])];              // dedupe
a.union(b); a.intersection(b); a.difference(b);   // ES2025 set methods
```
```
Set(3) { 'js', 'css', 'html' } true 3
dedupe: [ 3, 1, 2 ]
union Set(4) { 1, 2, 3, 4 } intersection Set(2) { 2, 3 } difference Set(1) { 1 }
```
`set.has(x)` is O(1), `array.includes(x)` O(n): for membership checks on large collections, use a Set.

## Iteration protocol
Anything with a `[Symbol.iterator]` method works with `for…of`, spread `[...x]`, `Array.from`, destructuring and `Promise.all`: arrays, strings, Maps, Sets, NodeLists, generators.
```js
const range = { from: 1, to: 4, *[Symbol.iterator]() { for (let i = this.from; i <= this.to; i++) yield i; } };
[...range];            // [1, 2, 3, 4]
Math.max(...range);    // 4
```

## Generators
A `function*` can pause at each `yield` and continue later, producing values lazily:
```js
function* idGenerator(prefix) {
  let n = 1;
  while (true) yield `${prefix}-${n++}`;
}
const ids = idGenerator("order");
console.log(ids.next().value, ids.next().value, ids.next());
```
```
order-1 order-2 { value: 'order-3', done: false }
```
An infinite sequence is fine because values are only computed on demand:
```js
function* take(iterable, n) { for (const x of iterable) { if (n-- <= 0) return; yield x; } }
[...take(idGenerator("x"), 3)];   // ['x-1', 'x-2', 'x-3']
```
Async generators (`async function*` + `for await…of`) do the same for streams of data, e.g. paginated API results or reading a request body in Node ([[javascript/Node.js]]).

## WeakMap and WeakSet
Keys must be objects and are held **weakly**: when the object is garbage-collected, the entry disappears. For attaching metadata to objects you don't own (DOM elements, library objects) without leaking memory.
