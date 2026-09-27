// Types, equality, truthiness
const show = (v) => typeof v === "bigint" ? `${v}n` : typeof v === "number" ? (Object.is(v, -0) ? "-0" : String(v))
  : v === undefined ? "undefined" : typeof v === "function" ? "() => {}" : typeof v === "symbol" ? v.toString() : JSON.stringify(v);
const values = [42, 3.14, "hi", true, null, undefined, 10n, Symbol("id"), {}, [], () => {}];
for (const v of values) console.log(show(v).padEnd(15), typeof v, Array.isArray(v) ? "(but Array.isArray says true)" : "", v === null ? "(a famous bug from 1995)" : "");

console.log("--- == vs ===");
const pairs = [[0, ""], ["1", 1], [null, undefined], [NaN, NaN], [[], false], ["0", false]];
for (const [a, b] of pairs) console.log(`${show(a)} == ${show(b)}:`.padEnd(24), String(a == b).padEnd(6), "===", a === b);
console.log("Number.isNaN(NaN):", Number.isNaN(NaN), " Object.is(NaN, NaN):", Object.is(NaN, NaN));

console.log("--- falsy values");
for (const v of [false, 0, -0, 0n, "", null, undefined, NaN]) console.log(show(v), "->", Boolean(v));
console.log("--- truthy surprises");
for (const v of ["0", "false", " ", [], {}, -1, Infinity]) console.log(show(v), "->", Boolean(v));

console.log("--- coercion");
console.log('"5" + 3 =', "5" + 3, '| "5" - 3 =', "5" - 3, '| "5" * "2" =', "5" * "2", '| [] + [] =', JSON.stringify([] + []), '| [] + {} =', [] + {});
console.log("Number(\"42px\") =", Number("42px"), "| parseInt(\"42px\") =", parseInt("42px"), "| Number(\"\") =", Number(""), "| +true =", +true);
