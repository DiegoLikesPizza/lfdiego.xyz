# JSON

**JSON** (JavaScript Object Notation) is the text format almost every web API speaks. It looks like JavaScript object literals, with stricter rules.

## Rules
```json
{
  "id": 1,
  "name": "Ada",
  "active": true,
  "tags": ["admin", "beta"],
  "address": { "city": "London" },
  "nickname": null
}
```
- Keys **must** be in double quotes; strings too (no single quotes).
- Values: string, number, boolean, `null`, array, object. No `undefined`, functions, dates, `NaN`, `Infinity`, BigInt, comments or trailing commas.

## Converting
```js
const text = JSON.stringify(user);                 // object → string
const pretty = JSON.stringify(user, null, 2);      // indented
const back = JSON.parse(text);                      // string → object
```
From `code/javascript/objects.mjs`:
```
JSON: {"id":1,"name":"Ada","role":"admin","address":{"city":"Paris"}} | pretty:
{
  "id": 1,
  "tags": [
    "a"
  ]
}
```

## What gets lost
| Value | After `JSON.stringify` |
|---|---|
| `undefined`, functions, symbols in objects | property is **dropped** |
| … in arrays | `null` |
| `NaN`, `Infinity` | `null` |
| `Date` | ISO string `"2026-09-27T12:00:00.000Z"` (parse doesn't turn it back into a `Date`) |
| `Map`, `Set` | `{}` (convert with `Object.fromEntries(map)` / `[...set]`) |
| BigInt | **throws** `TypeError: Do not know how to serialize a BigInt` |

## Parse errors
```
SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)
SyntaxError: Unexpected end of JSON input
```
The first: `{ name: 'Ada' }` (unquoted key, single quotes). The second: an empty string, typically an empty HTTP response body. Always wrap `JSON.parse` of external input in `try/catch` ([[javascript/Error Handling]]).

`res.json()` after `fetch` parses for you and throws the same `SyntaxError` if the server sent HTML (e.g. an error page) instead of JSON: check `res.ok` and the `Content-Type` first ([[javascript/Fetch and HTTP]]).

## Validating the shape
`JSON.parse` returns `any`: it doesn't check that the data has the fields you expect. Validate external data at the boundary, e.g. with **Zod**:
```js
import { z } from "zod";
const User = z.object({ id: z.number(), name: z.string(), email: z.string().email().optional() });
const user = User.parse(await res.json());   // throws with a clear message if the shape is wrong
```
In TypeScript this also gives you the type ([[javascript/TypeScript]]).

## Replacer and reviver
```js
JSON.stringify(order, (key, value) => (key === "password" ? undefined : value));   // drop fields
JSON.parse(text, (key, value) => (key === "createdAt" ? new Date(value) : value)); // revive dates
```
