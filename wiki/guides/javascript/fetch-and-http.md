# Fetch and HTTP

**Talking to servers: requests, responses and status codes.** Almost every web app loads data over HTTP. `fetch` sends a request and gives you a promise for the response. All output here comes from `code/javascript/server.mjs`: a tiny Node API plus `fetch` calls against it.

## An HTTP request…
```http
POST /api/todos HTTP/1.1               # method, path, protocol
Host: example.com
Content-Type: application/json         # headers: metadata
Authorization: Bearer eyJhbGciOi...
                                       # blank line, then the body
{"title": "Buy milk"}
```
## …and its response
```http
HTTP/1.1 201 Created                   # status code + reason
Content-Type: application/json
Location: /api/todos/42
Cache-Control: no-store

{"id": 42, "title": "Buy milk", "done": false}
```

## Methods
| Method | Means | Body? | Safe to repeat? |
|---|---|---|---|
| `GET` | read | no | yes |
| `POST` | create / do something | yes | no |
| `PUT` | replace | yes | yes |
| `PATCH` | change part | yes | usually |
| `DELETE` | remove | rarely | yes |

## GET and POST with fetch
```js
let res = await fetch(`${base}/api/todos`);
console.log("GET  /api/todos ->", res.status, await res.json());

res = await fetch(`${base}/api/todos`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Buy milk" }),
  signal: AbortSignal.timeout(5000),     // give up after 5 s
});
console.log("POST /api/todos ->", res.status, res.statusText, "Location:", res.headers.get("location"), await res.json());
```
```
GET  /api/todos -> 200 [ { id: 1, title: 'Buy milk', done: false } ]
POST /api/todos -> 201 Created Location: /api/todos/2 { id: 2, title: 'Buy milk', done: false }
```

## fetch doesn't throw on 404 or 500
```
POST bad JSON   -> 400 res.ok = false { error: 'Invalid JSON' }
POST empty title-> 422 { error: 'title is required' }
GET  /nope      -> 404 res.ok = false (fetch did NOT throw)
```
The promise only **rejects** when the request couldn't be made at all: offline, DNS failure, CORS block, timeout:
```
timeout         -> TimeoutError: The operation was aborted due to timeout
no server       -> TypeError: fetch failed / cause: ECONNREFUSED
```
An error **status** still "succeeds". So always check `res.ok` (status 200–299):
```js
async function getJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`${options?.method ?? "GET"} ${url} failed: ${res.status} ${detail}`);
  }
  return res.json();
}
```

## Status codes
| Code | Meaning | Typical cause |
|---|---|---|
| 200 OK | success | a normal GET |
| 201 Created | something new exists | a successful POST |
| 204 No Content | success, empty body | a DELETE (don't call `res.json()`!) |
| 301 / 308 | moved permanently | old URL, redirect forever |
| 304 Not Modified | use your cached copy | browser caching |
| 400 Bad Request | the request is malformed | invalid JSON or missing fields |
| 401 Unauthorized | not logged in | missing or expired token |
| 403 Forbidden | logged in, but not allowed | insufficient permissions |
| 404 Not Found | nothing at that URL | typo or deleted resource |
| 409 Conflict | clashes with current state | duplicate, edit conflict |
| 422 Unprocessable | valid JSON, invalid data | validation failed |
| 429 Too Many Requests | slow down | rate limit hit |
| 500 Internal Server Error | the server crashed | a bug on the backend |
| 502 / 503 / 504 | gateway / unavailable / timeout | server down, overloaded, maintenance |

Rule of thumb: **4xx = the client did something wrong, 5xx = the server did.**

## Other bodies
```js
await fetch("/upload", { method: "POST", body: new FormData(form) });   // files and form fields (no Content-Type header!)
await fetch("/search?" + new URLSearchParams({ q: "tea", page: 2 }));   // query strings, correctly encoded
const blob = await (await fetch("/logo.png")).blob();
```

## What is CORS?
Browsers block a page on one origin (`https://shop.example`) from reading responses from another origin (`https://api.other.example`) unless that server allows it with `Access-Control-Allow-Origin` headers. It's fixed **on the server**, not in your `fetch` call. Non-simple requests (JSON body, custom headers) first send an `OPTIONS` "preflight". The error looks like: *Access to fetch at '…' from origin '…' has been blocked by CORS policy*. Server-to-server calls (Node) aren't affected. → [[javascript/Security]]

## Cookies and auth
- `credentials: "include"` sends cookies to other origins (the server must allow it).
- Tokens go in the `Authorization: Bearer …` header. Don't store long-lived tokens in `localStorage` if you can use `HttpOnly` cookies instead.

## Seeing requests
DevTools → **Network** shows every request, its headers, body, timing and response ([[javascript/DevTools]]). `curl -i https://…` in a terminal shows raw status and headers.
