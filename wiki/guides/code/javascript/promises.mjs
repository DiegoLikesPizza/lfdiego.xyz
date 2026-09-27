// Promises and async/await
const wait = (ms, value, fail = false) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

const p = wait(50, "done");
console.log("right away:", p);
p.then((v) => console.log("later:", v, p));

wait(20, "boom", true)
  .then((v) => console.log("never", v))
  .catch((err) => console.log("caught:", err.message))
  .finally(() => console.log("finally runs either way"));

async function loadDashboard() {
  const t0 = Date.now();
  const user = await wait(100, "Ada");          // sequential: 100 ms…
  const orders = await wait(150, 3);            // …then 150 ms more
  console.log(`sequential: ${user} has ${orders} orders after ~${Math.round((Date.now() - t0) / 50) * 50} ms`);

  const t1 = Date.now();
  const [u, o] = await Promise.all([wait(100, "Ada"), wait(150, 3)]);   // parallel
  console.log(`parallel:   ${u} has ${o} orders after ~${Math.round((Date.now() - t1) / 50) * 50} ms`);

  try {
    await Promise.all([wait(30, "ok"), wait(10, "service down", true)]);
  } catch (err) {
    console.log("Promise.all rejects on the first failure:", err.message);
  }
  const results = await Promise.allSettled([wait(30, "ok"), wait(10, "service down", true)]);
  console.log("allSettled:", results.map((r) => r.status + ":" + (r.value ?? r.reason.message)).join(", "));
  console.log("race:", await Promise.race([wait(50, "slow"), wait(10, "fast")]), "| any:", await Promise.any([wait(10, "x", true), wait(20, "first success")]));

  const withTimeout = (promise, ms) => Promise.race([promise, wait(ms, `timed out after ${ms} ms`, true)]);
  try { await withTimeout(wait(500, "too slow"), 100); } catch (err) { console.log(err.message); }
}
setTimeout(loadDashboard, 100);

process.on("unhandledRejection", (reason) => console.log("unhandledRejection:", reason.message));
setTimeout(() => wait(1, "nobody catches me", true), 1200);
