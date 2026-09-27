// var vs let vs const, hoisting, TDZ
console.log("hoisted var before declaration:", typeof hoisted, hoisted);
var hoisted = "set";
try { console.log(early); } catch (e) { console.log(`${e.name}: ${e.message}`); }
let early = 1;

if (true) { var fnScoped = "var leaks out of blocks"; let blockScoped = "let stays inside"; }
console.log(fnScoped, "| blockScoped defined outside?", typeof blockScoped !== "undefined");

const user = { name: "Ada" };
user.name = "Grace";                // allowed: the object is mutable
console.log("const object changed:", user);
try { user = {}; } catch (e) { console.log(`${e.name}: ${e.message}`); }
const frozen = Object.freeze({ name: "Ada" });
try { frozen.name = "Grace"; } catch (e) { console.log(`${e.name}: ${e.message}`); }   // modules are strict: this throws
