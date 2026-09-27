// Map, Set, iterators, generators
const stock = new Map([["tea", 3]]);
stock.set("cake", 0).set({ sku: 1 }, "object keys work");
console.log(stock.get("tea"), stock.has("cake"), stock.size, [...stock.keys()]);
const counts = new Map();
for (const w of "the cat and the hat".split(" ")) counts.set(w, (counts.get(w) ?? 0) + 1);
console.log(counts, "->", Object.fromEntries(counts));

const tags = new Set(["js", "css", "js"]);
tags.add("html");
console.log(tags, tags.has("css"), [...tags].length);
console.log("dedupe:", [...new Set([3, 1, 3, 2, 1])]);
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
console.log("union", a.union(b), "intersection", a.intersection(b), "difference", a.difference(b));

function* idGenerator(prefix) {
  let n = 1;
  while (true) yield `${prefix}-${n++}`;
}
const ids = idGenerator("order");
console.log(ids.next().value, ids.next().value, ids.next());

function* take(iterable, n) { for (const x of iterable) { if (n-- <= 0) return; yield x; } }
console.log("first 3 from an infinite generator:", [...take(idGenerator("x"), 3)]);

const range = { from: 1, to: 4, *[Symbol.iterator]() { for (let i = this.from; i <= this.to; i++) yield i; } };
console.log("custom iterable:", [...range], Math.max(...range));
const wm = new WeakMap();
const el = {};
wm.set(el, "metadata that disappears with the object");
console.log("WeakMap has el:", wm.has(el));
