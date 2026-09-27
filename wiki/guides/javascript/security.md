# Security

The most common web vulnerabilities are easy to prevent once you know them. The browser runs code from many origins side by side, and your JavaScript handles untrusted input all the time.

## XSS (cross-site scripting)
An attacker gets **their** script to run on **your** page, usually through input you display: a comment, a username, a URL parameter. Their script can then read the page, steal tokens from `localStorage`, or act as the user.
```js
el.innerHTML = `<p>${comment}</p>`;     // ❌ comment = "<img src=x onerror=stealCookies()>"
el.textContent = comment;               // ✅ displayed as text, never executed
```
The DOM demo proves it: the same string inserted with `textContent` becomes harmless text ([[javascript/The DOM]]).
- Use `textContent`, `setAttribute`, and framework templating (React/Vue escape by default).
- Dangerous sinks: `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, `setTimeout("string")`, React's `dangerouslySetInnerHTML`, `href="javascript:…"`.
- If you must render user HTML (a rich-text editor), sanitise it with **DOMPurify** (Diego's Wiki Engine sanitises server-side with jsoup).
- Add a **Content-Security-Policy** header: `script-src 'self'` blocks inline and foreign scripts even if an injection happens.

## CORS is not a security feature for your server
CORS decides whether a **browser** may let a page read a cross-origin response ([[javascript/Fetch and HTTP]]). It doesn't stop `curl`, scripts or attackers calling your API directly. Authentication and authorisation must be enforced on the server. Never use `Access-Control-Allow-Origin: *` together with credentials.

## CSRF (cross-site request forgery)
Another site makes the user's browser send a request to your site, with the user's cookies attached ("transfer 500 € to …"). Defences:
- Cookies with `SameSite=Lax` (the default in modern browsers) or `Strict`.
- Check the `Origin` header on state-changing requests.
- CSRF tokens in forms.
- Never change state with `GET`.

## Secrets in frontend code
Everything shipped to the browser is **public**: bundles, environment variables baked in at build time, source maps. API keys that cost money or grant access belong on a server; the browser calls your server, your server calls the API.

## Tokens and sessions
| Storage | XSS can read it? | Sent automatically? |
|---|---|---|
| `localStorage` | **yes** | no |
| cookie with `HttpOnly; Secure; SameSite=Lax` | no | yes (same site) |

For session tokens, prefer `HttpOnly` cookies.

## Input validation
Validate on the **server**. Client-side validation (`required`, `pattern`, Zod in the form) is for user experience; attackers skip it. Use parameterised database queries, never string-built SQL.

## Dependencies
Most of your shipped code is other people's packages. Keep them few and updated, lock versions, run `npm audit`/Dependabot ([[javascript/npm and package.json]], [[github/Security]]).

## Checklist
- [ ] no user input in `innerHTML` / `eval`
- [ ] Content-Security-Policy header
- [ ] auth checked on the server for every request
- [ ] `HttpOnly`, `Secure`, `SameSite` cookies
- [ ] no secrets in the frontend bundle
- [ ] HTTPS everywhere
- [ ] dependencies audited and updated
