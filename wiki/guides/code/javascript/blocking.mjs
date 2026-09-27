// A long synchronous loop blocks everything, even a 0 ms timer
const start = Date.now();
setTimeout(() => console.log(`timer fired after ${Date.now() - start} ms (asked for 0)`), 0);
while (Date.now() - start < 300) { /* busy for 300 ms */ }
console.log("loop done");
