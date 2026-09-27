// Array methods
const nums = [1, 2, 3, 4, 5];
console.log("map(x => x * 2)        ", nums.map((x) => x * 2));
console.log("filter(x => x % 2)     ", nums.filter((x) => x % 2));
console.log("reduce((a, x) => a + x)", nums.reduce((a, x) => a + x, 0));
console.log("find(x => x > 2)       ", nums.find((x) => x > 2), "| findIndex:", nums.findIndex((x) => x > 2), "| findLast:", nums.findLast((x) => x < 4));
console.log("some(x => x > 4)       ", nums.some((x) => x > 4), "| every(x => x > 0):", nums.every((x) => x > 0));
console.log("includes(3)            ", nums.includes(3), "| indexOf(9):", nums.indexOf(9), "| at(-1):", nums.at(-1));
console.log("slice(1, 3)            ", nums.slice(1, 3), "| original:", nums);
console.log("flat / flatMap         ", [[1, 2], [3, [4]]].flat(), [[1, 2], [3, [4]]].flat(Infinity), ["a b", "c"].flatMap((s) => s.split(" ")));
console.log("join / Array.from      ", nums.join("-"), Array.from({ length: 3 }, (_, i) => i * i), Array.from("hey"));

const users = [
  { name: "Ada", age: 36, city: "London" }, { name: "Linus", age: 17, city: "Helsinki" },
  { name: "Grace", age: 85, city: "New York" }, { name: "Alan", age: 41, city: "London" },
];
const adults = users.filter((u) => u.age >= 18).map((u) => u.name).toSorted();
console.log("adult names, sorted:", adults);
console.log("groupBy city:", Object.groupBy(users, (u) => u.city));
const total = [{ price: 250, qty: 2 }, { price: 400, qty: 1 }].reduce((sum, i) => sum + i.price * i.qty, 0);
console.log("cart total:", total);

console.log("--- mutating vs copying");
const letters = ["c", "a", "b"];
const sorted = letters.toSorted();
console.log("toSorted:", sorted, "original:", letters);
letters.sort();
console.log("sort() changed the original:", letters);
console.log("[10, 9, 1, 2].sort() =", [10, 9, 1, 2].sort(), "| with a comparator:", [10, 9, 1, 2].sort((a, b) => a - b));
const arr = [1, 2, 3, 4];
const removed = arr.splice(1, 2, "x");
console.log("splice(1, 2, 'x') removed", removed, "-> arr", arr, "| toSpliced leaves the original:", [1, 2, 3].toSpliced(0, 1), "| with(0, 9):", [1, 2, 3].with(0, 9));
console.log("push/pop/shift/unshift:", (() => { const a = [2]; a.push(3); a.unshift(1); const last = a.pop(); const firstEl = a.shift(); return { a, last, firstEl }; })());

console.log("--- forEach can't be stopped, for...of can");
for (const n of nums) { if (n > 2) break; console.log("  for...of", n); }
nums.forEach((n, i) => { if (i === 0) console.log("  forEach index", i, "value", n); });
console.log("empty reduce without initial value:", (() => { try { return [].reduce((a, b) => a + b); } catch (e) { return `${e.name}: ${e.message}`; } })());
console.log("['1','2','3'].map(parseInt) =", ["1", "2", "3"].map(parseInt), "| .map(Number) =", ["1", "2", "3"].map(Number));
