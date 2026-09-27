// Error types and handling
const cases = [
  () => { const user = undefined; return user.name; },
  () => { const cart = null; return cart.items; },
  () => { const total = 5; total(); },
  () => { return notDeclared + 1; },
  () => JSON.parse("{ name: 'Ada' }"),
  () => JSON.parse(""),
  () => new Array(-1),
  () => { const f = () => f(); f(); },
  () => (1.5).toFixed(200),
  () => { "use strict"; undefined.x = 1; },
  () => { new URL("not a url"); },
];
for (const c of cases) {
  try { c(); } catch (e) { console.log(`${e.name}: ${e.message}`); }
}
try { eval("const x = ;"); } catch (e) { console.log(`${e.name}: ${e.message}`); }

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
function parsePrice(input) {
  const n = Number(input);
  if (!Number.isFinite(n) || n < 0) throw new ValidationError("price", `Invalid price "${input}"`);
  return Math.round(n * 100);
}
for (const input of ["19.99", "abc"]) {
  try {
    console.log("price in cents:", parsePrice(input));
  } catch (err) {
    if (err instanceof ValidationError) console.log(`${err.name} on ${err.field}: ${err.message}`);
    else throw err;
  } finally {
    console.log("  (checked", JSON.stringify(input) + ")");
  }
}
try {
  try { JSON.parse("{"); } catch (err) { throw new Error("Could not read settings", { cause: err }); }
} catch (err) {
  console.log(err.message, "<- caused by:", err.cause.name, err.cause.message);
}
function checkout(cart) { return cart.items.length; }
try { checkout(undefined); } catch (err) { console.log(err.stack.split("\n").slice(0, 3).join("\n")); }
