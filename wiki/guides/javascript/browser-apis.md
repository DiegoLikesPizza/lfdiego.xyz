# Browser APIs

What the browser gives JavaScript beyond the DOM. All available in every modern browser.

## Storage
```js
localStorage.setItem("cart", JSON.stringify({ items: 2 }));
JSON.parse(localStorage.getItem("cart"));   // { items: 2 }
localStorage.getItem("nope");               // null
```
Recorded in Chromium:
```
localStorage: {items: 2} | missing key: null
```
| Storage | Lifetime | Size | Notes |
|---|---|---|---|
| `localStorage` | until cleared | ~5 MB per origin | strings only (JSON), synchronous, same origin only |
| `sessionStorage` | the tab | ~5 MB | same API |
| cookies | set by expiry | ~4 KB | sent with every request; `HttpOnly` cookies are invisible to JavaScript (good for session tokens) |
| IndexedDB | until cleared | large | async database for offline apps (use a wrapper like `idb`) |
| Cache API | until cleared | large | for service workers / offline |

Private browsing modes and blocked site data can make storage throw or disappear: wrap access in `try/catch` and treat it as a cache, not a database.

## URLs
```js
const url = new URL("https://shop.example/search?q=tea&page=2");
url.searchParams.get("q");          // "tea"
url.searchParams.set("page", "3");
url.toString();                     // "https://shop.example/search?q=tea&page=3"
new URL("not a url");               // TypeError: Invalid URL
```
`location.href`, `history.pushState` (change the URL without reloading, how single-page apps route).

## Timers and animation
| API | Use |
|---|---|
| `setTimeout(fn, ms)` / `clearTimeout` | run once, later |
| `setInterval(fn, ms)` / `clearInterval` | repeat (throttled in background tabs) |
| `requestAnimationFrame(fn)` | before the next paint: smooth animations |
| `requestIdleCallback(fn)` | when the browser is idle: low-priority work |

## Observers
| Observer | Tells you when… | Use for |
|---|---|---|
| `IntersectionObserver` | an element enters/leaves the viewport | lazy loading, infinite scroll, scroll animations |
| `ResizeObserver` | an element changes size | responsive components |
| `MutationObserver` | the DOM changes | reacting to third-party markup |

Much cheaper than listening to `scroll` and measuring.

## Other useful APIs
- **Clipboard**: `await navigator.clipboard.writeText("copied!")` (needs a user gesture / HTTPS).
- **Geolocation**, **Notifications**, **Camera** (`getUserMedia`): ask permission.
- **Web Share**: `navigator.share({ title, url })` opens the phone's share sheet.
- **Intl**: dates, numbers, currencies, plurals, relative times in any language ([[javascript/Numbers and Math]]).
- **crypto**: `crypto.randomUUID()`, `crypto.subtle` for hashing and encryption.
- **Web Workers**: run heavy JavaScript on another thread without freezing the page ([[javascript/The Event Loop]]).
- **Service workers**: offline support and push notifications (Progressive Web Apps).
- **View Transitions**: animated transitions between page states.

Check support on MDN's compatibility tables or caniuse.com before relying on newer APIs.
