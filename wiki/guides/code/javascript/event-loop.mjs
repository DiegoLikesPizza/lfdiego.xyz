// The event loop: guess the order before running it
console.log("1 · script start");
setTimeout(() => console.log("4 · timeout"), 0);
Promise.resolve().then(() => console.log("3 · microtask"));
console.log("2 · script end");
