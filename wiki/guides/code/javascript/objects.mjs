// Objects, destructuring, spread, ?. and ??
const user = { id: 1, name: "Ada", role: "admin", address: { city: "London" } };

const { name, role = "guest", nickname = "none" } = user;   // pull out fields, with defaults
const { id, ...rest } = user;                                 // rest = everything else
const updated = { ...user, role: "owner" };                   // copy + override
console.log(name, role, nickname, "| rest:", rest);
console.log("updated.role =", updated.role, "| original still", user.role);

updated.address.city = "Paris";                               // spread is a SHALLOW copy
console.log("after changing the copy's address:", user.address.city);
const deep = structuredClone(user);
deep.address.city = "Berlin";
console.log("structuredClone is deep:", user.address.city, "vs", deep.address.city);

const [first, , third, ...others] = ["a", "b", "c", "d", "e"];
console.log(first, third, others);
let x = 1, y = 2;
[x, y] = [y, x];                                              // swap
console.log("swapped:", x, y);

const key = "color";
const theme = { [key]: "dark", name, greet() { return `hi ${this.name}`; } };   // computed key, shorthand, method
console.log(theme, theme.greet());

console.log("--- optional chaining and nullish coalescing");
const guest = { name: "Bo" };
console.log(user.address?.city, "|", guest.address?.city, "|", guest.address?.city ?? "unknown");
console.log(guest.sayHi?.() ?? "no sayHi method");
for (const v of [0, "", false, null, undefined]) {
  console.log(`${JSON.stringify(v) ?? "undefined"}`.padEnd(10), "|| ->", JSON.stringify(v || "default").padEnd(10), "?? ->", JSON.stringify(v ?? "default"));
}

console.log("--- iterating");
console.log(Object.keys(user), Object.values(rest).length, Object.entries({ a: 1, b: 2 }));
console.log(Object.fromEntries([["tea", 250], ["cake", 400]]));
console.log("'role' in user:", "role" in user, "| Object.hasOwn(user, 'id'):", Object.hasOwn(user, "id"));
console.log("JSON:", JSON.stringify(user), "| pretty:\n" + JSON.stringify({ id: 1, tags: ["a"] }, null, 2));
