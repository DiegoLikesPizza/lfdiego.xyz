# Strings

Strings are immutable sequences of UTF-16 code units, written with `"…"`, `'…'` or backticks. Output from `code/javascript/numbers-strings.mjs`.

## Template literals
```js
const name = "Ada", items = 3;
console.log(`Hello ${name}, you have ${items} item${items === 1 ? "" : "s"} (${items * 2.5} €)`);
```
```
Hello Ada, you have 3 items (7.5 €)
```
Backticks allow any expression inside `${…}` and span multiple lines. Prefer them over `+` concatenation.

## Everyday methods
```js
const s = "  Hello, World  ";
```
```
"Hello, World" hello, world true true [ 'Hello', 'World' ]
padStart: 007 | repeat: ababab | slice(-5): World | at(-1): c
replaceAll: a+b+c | regex: [ '42', '7' ] | replace with fn: 6 apples
```
| Method | Example |
|---|---|
| `trim()`, `trimStart()`, `trimEnd()` | remove whitespace |
| `toLowerCase()`, `toUpperCase()` | case |
| `includes`, `startsWith`, `endsWith` | search → boolean |
| `indexOf` | position or −1 |
| `slice(start, end)` | substring; negative counts from the end |
| `split(sep)` / `array.join(sep)` | string ↔ array |
| `padStart(3, "0")` | `"7"` → `"007"` |
| `repeat(n)` | `"ab".repeat(3)` |
| `at(-1)` | last character |
| `replace` / `replaceAll` | first / all matches; the replacement can be a function |
| `match(/…/g)`, `matchAll` | regular expression matches |
| `localeCompare` | language-aware comparison |

All return **new** strings; the original never changes.

## Regular expressions
```js
"Order 42 and 7".match(/\d+/g);              // ['42', '7']
"3 apples".replace(/\d+/, (n) => n * 2);     // '6 apples'
/^[\w.+-]+@[\w-]+\.[\w.]+$/.test("ada@example.com");   // simple e-mail check
const { groups } = "2026-09-27".match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/);
```
Flags: `g` (all), `i` (ignore case), `m` (multi-line), `u`/`v` (Unicode), `s` (dot matches newline). regex101.com explains any pattern.

## Unicode and sorting
```
'😀'.length = 2 | [...'😀'].length = 1
localeCompare sort: [ 'Anna', 'Zoe', 'ärger' ] vs [ 'Anna', 'ärger', 'Zoe' ]
```
- `length` counts UTF-16 units; emoji take two. Spread (`[...str]`) or `Intl.Segmenter` for real characters.
- Default `sort()` compares code units, so `ä` lands after `Z`. Sort user-visible text with `localeCompare(b, "de")` or `new Intl.Collator("de").compare`.

## Converting
`String(42)`, `(42).toString()`, `` `${value}` ``; back with `Number(s)` ([[javascript/Numbers and Math]]). `JSON.stringify` for objects ([[javascript/JSON]]).

## Escaping
`"\n"` newline, `"\t"` tab, `"\\"` backslash, `"ä"` → `ä`. Inside template literals, `` \` `` and `\${`. Never build HTML by concatenating user input: [[javascript/Security]].
