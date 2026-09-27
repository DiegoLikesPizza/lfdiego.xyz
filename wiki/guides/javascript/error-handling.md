# Error Handling

**Read the error, then open DevTools.** JavaScript errors have a type, a message and a stack trace. Output from `code/javascript/errors.mjs`.

## The error types
| Error | Usually means |
|---|---|
| `TypeError` | using a value the wrong way: often reading a property of `undefined`, or calling a non-function |
| `ReferenceError` | a variable that doesn't exist (typo, or used before `let`/`const`) |
| `SyntaxError` | code (or JSON) the parser can't read: a missing bracket or comma |
| `RangeError` | a number out of range, or infinite recursion |
| `URIError`, `EvalError` | rare |
| `AggregateError` | several errors at once (`Promise.any`) |

Real messages from Node 22 (Chrome's are identical; Firefox and Safari word them differently):
```
TypeError: Cannot read properties of undefined (reading 'name')
TypeError: Cannot read properties of null (reading 'items')
TypeError: total is not a function
ReferenceError: notDeclared is not defined
SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)
SyntaxError: Unexpected end of JSON input
RangeError: Invalid array length
RangeError: Maximum call stack size exceeded
RangeError: toFixed() digits argument must be between 0 and 100
TypeError: Cannot set properties of undefined (setting 'x')
TypeError: Invalid URL
SyntaxError: Unexpected token ';'
```
Explanations for each: [[javascript/Common Errors]].

## try / catch / finally
```js
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
    else throw err;                          // not ours: let it propagate
  } finally {
    console.log("  (checked", JSON.stringify(input) + ")");
  }
}
```
```
price in cents: 1999
  (checked "19.99")
ValidationError on price: Invalid price "abc"
  (checked "abc")
```
- Throw `Error` objects (or subclasses), never strings: only errors have a stack trace.
- Catch only what you can handle; rethrow the rest.
- `catch` without a parameter (`catch { … }`) is allowed when you don't need the error.

## Keep the cause
```js
try { JSON.parse("{"); } catch (err) { throw new Error("Could not read settings", { cause: err }); }
```
```
Could not read settings <- caused by: SyntaxError Expected property name or '}' in JSON at position 1 (line 1 column 2)
```

## Stack traces
```
TypeError: Cannot read properties of undefined (reading 'items')
    at checkout (file:///…/errors.mjs:47:39)
    at file:///…/errors.mjs:48:7
```
Top line: the error; below: where it happened (`checkout`, line 47, column 39) and who called it. With bundled/minified code, **source maps** let DevTools show your original files and lines.

## Async errors
- In `async` functions, `try/catch` around `await` catches rejections ([[javascript/Async and Await]]).
- A promise without `.catch` → unhandled rejection: Node crashes, browsers log "Uncaught (in promise)" ([[javascript/Promises]]).
- Errors in event handlers and timers don't reach an outer `try/catch`: they happen later, in another task.

## Global handlers (last resort)
```js
window.addEventListener("error", (e) => report(e.error));
window.addEventListener("unhandledrejection", (e) => report(e.reason));
process.on("uncaughtException", …); process.on("unhandledRejection", …);   // Node
```
Use them to **report** errors (Sentry and similar tools hook in here), not to ignore them.

## Validating input
Most runtime errors are unexpected data. Validate at the boundaries (form input, API responses, `JSON.parse`, URL parameters), and use TypeScript for everything inside ([[javascript/TypeScript]]).
