// Numbers and strings
console.log("0.1 + 0.2 =", 0.1 + 0.2, "| === 0.3?", 0.1 + 0.2 === 0.3, "| close enough?", Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);
console.log("(0.1 + 0.2).toFixed(2) =", (0.1 + 0.2).toFixed(2), typeof (0.1 + 0.2).toFixed(2));
console.log("MAX_SAFE_INTEGER =", Number.MAX_SAFE_INTEGER, "| +1 +1 =", Number.MAX_SAFE_INTEGER + 2, "| BigInt:", 2n ** 64n);
console.log("1 / 0 =", 1 / 0, "| 0 / 0 =", 0 / 0, "| typeof NaN =", typeof NaN);
console.log("Math.round(2.5) =", Math.round(2.5), "Math.round(-2.5) =", Math.round(-2.5), "| trunc(-4.7) =", Math.trunc(-4.7), "| floor(-4.7) =", Math.floor(-4.7));
console.log("parseFloat('3.5 kg') =", parseFloat("3.5 kg"), "| Number('3,5') =", Number("3,5"), "| (255).toString(16) =", (255).toString(16));
console.log("Intl de-DE:", new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(1234.5),
  "| en-US:", new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(1234.5));
const cents = 1999;
console.log("money in cents:", cents, "->", (cents / 100).toFixed(2));

const name = "Ada", items = 3;
console.log(`Hello ${name}, you have ${items} item${items === 1 ? "" : "s"} (${items * 2.5} €)`);
const s = "  Hello, World  ";
console.log(JSON.stringify(s.trim()), s.trim().toLowerCase(), s.includes("World"), s.trim().startsWith("Hello"), s.trim().split(", "));
console.log("padStart:", "7".padStart(3, "0"), "| repeat:", "ab".repeat(3), "| slice(-5):", "Hello, World".slice(-5), "| at(-1):", "abc".at(-1));
console.log("replaceAll:", "a-b-c".replaceAll("-", "+"), "| regex:", "Order 42 and 7".match(/\d+/g), "| replace with fn:", "3 apples".replace(/\d+/, (n) => n * 2));
console.log("'😀'.length =", "😀".length, "| [...'😀'].length =", [..."😀"].length);
console.log("localeCompare sort:", ["Zoe", "ärger", "Anna"].toSorted(), "vs", ["Zoe", "ärger", "Anna"].toSorted((a, b) => a.localeCompare(b, "de")));
const multiline = `line 1
line 2`;
console.log(multiline.split("\n").length, "lines");
