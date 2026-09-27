type Status = "idle" | "loading" | "error";   // union of literals

interface User {
  id: number;
  name: string;
  email?: string;                             // optional
}

function greet(user: User): string {
  return `Hi ${user.name}`;
}

function first<T>(items: T[]): T | undefined { // generic
  return items[0];
}

// narrowing: TypeScript follows your checks
function show(value: string | number): string {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}

// discriminated union: like a sealed type in Java/Kotlin
type Result =
  | { kind: "paid"; transactionId: string }
  | { kind: "declined"; reason: string };

function message(r: Result): string {
  switch (r.kind) {
    case "paid": return `Paid (${r.transactionId})`;
    case "declined": return `Declined: ${r.reason}`;
  }
}

type UserUpdate = Partial<User>;              // all fields optional
type UserPreview = Pick<User, "id" | "name">;
type PriceTable = Record<string, number>;

const status: Status = "loading";
const ada: User = { id: 1, name: "Ada" };
const update: UserUpdate = { email: "ada@example.com" };
const preview: UserPreview = { id: 1, name: "Ada" };
const prices: PriceTable = { tea: 250 };
console.log(status, greet(ada), first([3, 4]), show("ts"), show(3.14159), message({ kind: "declined", reason: "card expired" }), update, preview, prices);

function parse(json: string): unknown { return JSON.parse(json); }
const data = parse('{"name":"Ada"}');
if (typeof data === "object" && data !== null && "name" in data) console.log("unknown narrowed:", data.name);
