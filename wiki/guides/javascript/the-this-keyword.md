# The this Keyword

In JavaScript, `this` isn't fixed when you write a function: it's decided **when the function is called**. Arrow functions are the exception. Output from `code/javascript/functions.mjs`.

| How it's called | `this` is… |
|---|---|
| `obj.method()` | `obj`: whatever is left of the dot |
| `plainFunction()` | `undefined` (strict mode / modules) |
| `() => { … }` | inherited from the surrounding code: arrows have no own `this` |
| `new Thing()` | the brand-new object |
| `fn.call(x)` / `fn.apply(x)` / `fn.bind(x)` | `x`, explicitly |
| `el.addEventListener("click", function () {…})` | the element (use an arrow to keep the outer `this`) |

## Seeing it
```js
const cart = {
  items: ["tea", "cake"],
  count() { return this.items.length; },
  countLater() { return [1].map(() => this.items.length)[0]; },          // arrow keeps this
  countBroken() { return [1].map(function () { return this?.items?.length; })[0]; },
};
```
```
cart.count() = 2 | arrow inside method = 2 | function inside method = undefined
```
Inside `countBroken`, the inner `function` is called by `map` as a plain function, so its `this` is `undefined`.

## The classic `this` bug
Passing `obj.method` as a callback loses `obj`:
```js
const detached = cart.count;
detached();
```
```
detached method: TypeError: Cannot read properties of undefined (reading 'items')
```
Same with `setTimeout(cart.count, 100)`, `button.addEventListener("click", this.handleClick)` or `promise.then(service.load)`. Fixes:
```js
setTimeout(() => cart.count(), 100);          // arrow: calls it as a method
const bound = cart.count.bind(cart);          // bind: this is fixed forever
cart.count.call({ items: [1, 2, 3] });        // call: this for one call
```
```
bound() = 2 | call with another this = 3
```

## In classes
Methods have the same problem. Two common patterns:
```js
class Checkout {
  total = 0;
  // 1. arrow function as a class field: this is always the instance
  handleClick = () => { this.total++; };
  // 2. normal method + bind where you pass it
  submit() { … }
}
button.addEventListener("click", checkout.handleClick);
form.addEventListener("submit", checkout.submit.bind(checkout));
```

## Rules of thumb
- Use **arrow functions for callbacks**: they keep the `this` of the surrounding code.
- Use **method syntax** (`count() {}`) for object and class methods.
- If you see `const self = this;` or `var that = this;`, it's pre-2015 code working around this problem; an arrow function replaces it.
- In TypeScript, a `this` parameter can document and check what `this` a function expects.
