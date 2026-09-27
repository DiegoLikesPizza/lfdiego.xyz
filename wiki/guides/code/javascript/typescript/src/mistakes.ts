interface User { id: number; name: string; email?: string }

const user: User = { id: 1, name: "Ada" };
user.nmae = "Grace";                          // typo
const id: number = "42";                      // wrong type
greet({ id: 2 });                             // missing field
console.log(user.email.toLowerCase());        // might be undefined
const scores = [90, 72];
const firstScore: number = scores[0];         // noUncheckedIndexedAccess: might be undefined

function greet(u: User): string { return "Hi " + u.name; }
function total(prices: number[]) { return prices.reduce((a, b) => a + b, 0); }
total(["1", "2"]);
