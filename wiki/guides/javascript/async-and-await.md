# Async and Await

`async`/`await` is syntax on top of promises that lets asynchronous code read top to bottom. Output from `code/javascript/promises.mjs`.

## The basics
```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Could not load user", err);
    return null;
  }
}
```
- An `async` function **always returns a promise**. `return x` fulfils it, `throw` rejects it.
- `await promise` pauses **this function** (not the thread) until the promise settles, then gives you its value or throws its error.
- Errors are handled with ordinary `try/catch/finally`.
- `await` works at the top level of ES modules too.

## Sequential vs parallel
```js
const user = await wait(100, "Ada");          // sequential: 100 ms…
const orders = await wait(150, 3);            // …then 150 ms more

const [u, o] = await Promise.all([wait(100, "Ada"), wait(150, 3)]);   // parallel
```
```
sequential: Ada has 3 orders after ~250 ms
parallel:   Ada has 3 orders after ~150 ms
```
If requests don't depend on each other, **start them all, then await them together**.

### `await` in a loop is sequential
```js
// one after another: 10 × 200 ms = 2 s
for (const id of ids) results.push(await loadUser(id));

// all at once: ~200 ms
const results = await Promise.all(ids.map((id) => loadUser(id)));
```
Sequential is right when order matters or you must not overload a server; for many requests, limit concurrency (e.g. batches of 5, or a library like `p-limit`).

### `forEach` ignores `await`
```js
ids.forEach(async (id) => { await save(id); });   // doesn't wait: forEach discards the promises
console.log("done?");                            // runs immediately
```
Use `for…of` (sequential) or `Promise.all(ids.map(…))` (parallel).

## Error handling patterns
```js
// 1. try/catch around the awaits
try { const data = await load(); } catch (err) { showError(err); }

// 2. catch on the promise, for a fallback value
const data = await load().catch(() => defaultData);

// 3. let it propagate to the caller, and catch once at the top (route handler, event handler)
```
Always handle errors at **some** level; an `async` event handler that throws becomes an unhandled rejection.

## Cancellation
Promises can't be cancelled, but the work behind them often can, with an `AbortController`:
```js
const controller = new AbortController();
const res = fetch(url, { signal: controller.signal });
cancelButton.onclick = () => controller.abort();   // fetch rejects with AbortError
```
Typical use: a search box aborting the previous request when the user types again.

## Under the hood
`await x` is roughly `x.then(continueRestOfFunction)`: everything after an `await` runs as a microtask ([[javascript/The Event Loop]]). The function's code before its first `await` runs synchronously.

## In other languages
Kotlin's `suspend` functions and `async/await` in coroutines follow the same idea, with structured concurrency on top ([[kotlin/Coroutines]]). Java uses (virtual) threads and plain blocking calls instead ([[java/Virtual Threads and Executors]]).
