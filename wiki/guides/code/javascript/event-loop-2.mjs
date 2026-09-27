// A harder one
console.log("A");
setTimeout(() => {
  console.log("B (timer 1)");
  Promise.resolve().then(() => console.log("C (microtask inside timer 1)"));
}, 0);
setTimeout(() => console.log("D (timer 2)"), 0);
queueMicrotask(() => console.log("E (queueMicrotask)"));
Promise.resolve()
  .then(() => console.log("F (then 1)"))
  .then(() => console.log("G (then 2, queued when then 1 finished)"));
(async () => {
  console.log("H (async function runs synchronously until the first await)");
  await null;
  console.log("I (after await = a microtask)");
})();
console.log("J");
