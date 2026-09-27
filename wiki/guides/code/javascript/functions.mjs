// Functions, closures, this
function add(a, b) { return a + b; }                 // declaration (hoisted)
const multiply = function (a, b) { return a * b; };  // expression
const square = (x) => x * x;                          // arrow
const greet = (name = "world") => `Hello, ${name}!`;   // default parameter
function tag(label = "note", ...words) {               // rest parameter
  return `[${label}] ${words.join(" ")}`;
}
console.log(add(2, 3), multiply(2, 3), square(4), greet(), greet("Ada"));
console.log(tag(undefined, "hello", "there"), "|", tag("todo"));
console.log("Math.max(...[3, 9, 4]) =", Math.max(...[3, 9, 4]));
console.log("add(1) =", add(1), "| add(1, 2, 3) =", add(1, 2, 3));

console.log("--- closures");
function makeCounter() {
  let count = 0;                   // private: nothing outside can touch it
  return () => ++count;
}
const counter = makeCounter();
const other = makeCounter();
console.log(counter(), counter(), counter(), "| other:", other());

const makeAdder = (n) => (x) => x + n;
const add10 = makeAdder(10);
console.log("add10(5) =", add10(5));

function once(fn) {
  let done = false, result;
  return (...args) => (done ? result : ((done = true), (result = fn(...args))));
}
const init = once(() => { console.log("  initialising..."); return 42; });
console.log(init(), init());

console.log("--- the var-in-a-loop trap");
const withVar = [], withLet = [];
for (var i = 0; i < 3; i++) withVar.push(() => i);
for (let j = 0; j < 3; j++) withLet.push(() => j);
console.log("var:", withVar.map((f) => f()), "let:", withLet.map((f) => f()));

console.log("--- this");
const cart = {
  items: ["tea", "cake"],
  count() { return this.items.length; },
  countLater() { return [1].map(() => this.items.length)[0]; },          // arrow keeps this
  countBroken() { return [1].map(function () { return this?.items?.length; })[0]; },
};
console.log("cart.count() =", cart.count(), "| arrow inside method =", cart.countLater(), "| function inside method =", cart.countBroken());
const detached = cart.count;
try { detached(); } catch (e) { console.log(`detached method: ${e.name}: ${e.message}`); }
const bound = cart.count.bind(cart);
console.log("bound() =", bound(), "| call with another this =", cart.count.call({ items: [1, 2, 3] }));

console.log("--- higher-order functions");
const pipe = (...fns) => (x) => fns.reduce((acc, f) => f(acc), x);
const slugify = pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(/\s+/g, "-"));
console.log(slugify("  Hello World From JS  "));

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}
const search = debounce((q) => console.log("  search for", JSON.stringify(q)), 50);
search("j"); search("ja"); search("jav"); search("java");   // only the last one runs
