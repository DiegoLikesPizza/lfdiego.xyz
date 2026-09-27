# Numbers and Math

JavaScript has one `number` type: 64-bit floating point (like Java's `double`), plus `bigint` for huge integers. Output from `code/javascript/numbers-strings.mjs`.

## Floating point
```
0.1 + 0.2 = 0.30000000000000004 | === 0.3? false | close enough? true
(0.1 + 0.2).toFixed(2) = 0.30 string
```
- Never compare floats with `===` after arithmetic; compare with a tolerance (`Math.abs(a - b) < Number.EPSILON`).
- `toFixed` returns a **string**, for display.
- **Money**: store integer cents (`1999`), format for display: `(cents / 100).toFixed(2)` → `19.99`, or better `Intl.NumberFormat`.

## Limits and special values
```
MAX_SAFE_INTEGER = 9007199254740991 | +1 +1 = 9007199254740992 | BigInt: 18446744073709551616n
1 / 0 = Infinity | 0 / 0 = NaN | typeof NaN = number
```
- Integers are exact only up to 2⁵³ − 1. Beyond that, `MAX_SAFE_INTEGER + 2` gives a wrong result. Database IDs from other languages (64-bit longs) must be sent as strings in JSON.
- `BigInt` (`123n`) for exact large integers; can't be mixed with numbers without converting.
- Division by zero gives `Infinity`, not an error; invalid math gives `NaN` ("not a number", which is of type number).

## Rounding
```
Math.round(2.5) = 3 Math.round(-2.5) = -2 | trunc(-4.7) = -4 | floor(-4.7) = -5
```
| Function | Does |
|---|---|
| `Math.round` | nearest; .5 rounds **up** (towards +∞) |
| `Math.floor` / `Math.ceil` | down / up |
| `Math.trunc` | drop the fraction (towards 0) |
| `n.toFixed(2)` | string with 2 decimals |
| `Math.min`, `Math.max`, `Math.abs`, `Math.pow` / `**`, `Math.sqrt`, `Math.random()` | the usual |

## Parsing
```
parseFloat('3.5 kg') = 3.5 | Number('3,5') = NaN | (255).toString(16) = ff
```
| | `Number("42px")` | `parseInt("42px")` | `Number("")` |
|---|---|---|---|
| Result | `NaN` (whole string must be numeric) | `42` (reads until it can't) | `0` (!) |

Prefer `Number(x)` + `Number.isFinite(result)` for validation; `parseInt(x, 10)` always with radix 10. German input `3,5` isn't a number to JavaScript: replace the comma first or use a proper parser.

## Formatting for humans
```
Intl de-DE: 1.234,50 € | en-US: $1,234.50
money in cents: 1999 -> 19.99
```
```js
new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(1234.5);   // "1.234,50 €"
new Intl.NumberFormat("de-DE").format(1234567.891);                                    // "1.234.567,891"
new Intl.NumberFormat("en", { notation: "compact" }).format(1_500_000);                // "1.5M"
```
Numeric separators (`1_500_000`) are just for readability.

## Random numbers
`Math.random()` gives 0 ≤ x < 1, not secure. For tokens, IDs and anything security-related use `crypto.randomUUID()` or `crypto.getRandomValues()`.
