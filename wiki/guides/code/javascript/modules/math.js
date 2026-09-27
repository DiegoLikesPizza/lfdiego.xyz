// math.js: named exports and a default export
export const PI_ROUGH = 3.14;
export function add(a, b) { return a + b; }
export default function mean(xs) {
  return xs.reduce(add, 0) / xs.length;
}
console.log("math.js evaluated (only once, however often it is imported)");
