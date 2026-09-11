import type { GuideSection } from "../types";
import {
  AnnotatedCode,
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Glossary,
  Marker,
  Pipeline,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

function ClosureVisual() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)]">
      <div className="rounded-[8px] border border-border bg-background p-4">
        <p className="font-mono text-xs text-foreground-subtle">makeCounter() ran and returned…</p>
        <div className="mt-3 rounded-[8px] border-2 border-dashed border-accent/50 p-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent-hover">closure scope</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            let count = <span className="text-accent-hover">2</span>
          </p>
          <p className="mt-1 text-xs text-foreground-muted">still alive — the function below points to it</p>
        </div>
      </div>
      <span className="text-center font-mono text-xs text-accent">← remembers</span>
      <div className="rounded-[8px] border border-accent/50 bg-accent-soft p-4">
        <p className="font-mono text-sm text-foreground">counter()</p>
        <p className="mt-1 text-xs text-foreground-muted">each call reads and updates that same count: 1, 2, 3…</p>
      </div>
    </div>
  );
}

function PrototypeChain() {
  const boxes = [
    { x: 10, title: "rex", sub: "name: \"Rex\"", accent: true },
    { x: 165, title: "Dog.prototype", sub: "bark()" },
    { x: 320, title: "Animal.prototype", sub: "eat()" },
    { x: 475, title: "Object.prototype", sub: "toString()" },
  ];
  return (
    <svg
      viewBox="0 0 640 150"
      className="h-auto w-full"
      role="img"
      aria-label="Prototype chain: the object rex links to Dog.prototype, which links to Animal.prototype, then Object.prototype, then null. Looking up rex.toString walks along the chain until it finds the method."
    >
      <defs>
        <marker id="js-proto-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
        <marker id="js-proto-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>
      {boxes.map((b, i) => (
        <g key={b.title}>
          <rect x={b.x} y="30" width="140" height="54" rx="8" strokeWidth="1.5" className={b.accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"} />
          <text x={b.x + 70} y="52" fontSize="12" textAnchor="middle" className="fill-foreground font-mono">
            {b.title}
          </text>
          <text x={b.x + 70} y="71" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {b.sub}
          </text>
          {i < boxes.length - 1 && (
            <path d={`M${b.x + 140} 57 H${b.x + 159}`} strokeWidth="1.5" markerEnd="url(#js-proto-arrow)" className="stroke-foreground-subtle" />
          )}
        </g>
      ))}
      <text x="630" y="20" fontSize="11" textAnchor="end" className="fill-foreground-subtle font-mono">
        → null
      </text>
      <path d="M80 100 C80 130 545 130 545 94" fill="none" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#js-proto-accent)" className="stroke-accent" />
      <text x="312" y="140" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
        rex.toString() walks the chain until it finds it
      </text>
    </svg>
  );
}

function DomTree() {
  const nodes = [
    { id: "document", x: 270, y: 10 },
    { id: "html", x: 270, y: 70 },
    { id: "head", x: 130, y: 130 },
    { id: "body", x: 410, y: 130 },
    { id: "title", x: 70, y: 190 },
    { id: "meta", x: 190, y: 190 },
    { id: "h1", x: 350, y: 190 },
    { id: "button#buy", x: 470, y: 190, accent: true },
  ];
  const edges = [
    ["document", "html"],
    ["html", "head"],
    ["html", "body"],
    ["head", "title"],
    ["head", "meta"],
    ["body", "h1"],
    ["body", "button#buy"],
  ];
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  return (
    <svg
      viewBox="0 0 640 230"
      className="h-auto w-full"
      role="img"
      aria-label="DOM tree: document contains html, which contains head and body. head contains title and meta; body contains an h1 and a button with id buy."
    >
      {edges.map(([from, to]) => {
        const a = find(from);
        const b = find(to);
        return (
          <path
            key={`${from}-${to}`}
            d={`M${a.x + 50} ${a.y + 30} C${a.x + 50} ${a.y + 45} ${b.x + 50} ${b.y - 15} ${b.x + 50} ${b.y}`}
            fill="none"
            strokeWidth="1.5"
            className="stroke-border"
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width="100" height="30" rx="6" strokeWidth="1.5" className={n.accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"} />
          <text x={n.x + 50} y={n.y + 19} fontSize="11" textAnchor="middle" className={n.accent ? "fill-accent-hover font-mono" : "fill-foreground font-mono"}>
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

const levels = ["window", "document", "<body>", "<ul id=\"todos\">", "<li>", "<button> ← clicked"];

function Propagation() {
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_4.5rem] gap-x-3 gap-y-1.5 text-sm">
      <span className="text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-foreground-subtle">1 · capture</span>
      <span />
      <span className="text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent-hover">3 · bubble</span>
      {levels.map((level, i) => {
        const target = i === levels.length - 1;
        return (
          <div key={level} className="contents">
            <span className="text-center font-mono text-foreground-subtle">↓</span>
            <span
              style={{ marginLeft: `${i * 10}px` }}
              className={cn(
                "rounded-[6px] border px-3 py-1.5 font-mono text-xs",
                target ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-foreground",
              )}
            >
              {target ? `2 · target: ${level}` : level}
            </span>
            <span className="text-center font-mono text-accent">↑</span>
          </div>
        );
      })}
    </div>
  );
}

function DevToolsMock() {
  const tabs = ["Elements", "Console", "Sources", "Network", "Application", "Performance"];
  const requests = [
    { name: "index.html", status: "200", type: "document", start: 0, width: 18 },
    { name: "app.js", status: "200", type: "script", start: 16, width: 22 },
    { name: "styles.css", status: "200", type: "stylesheet", start: 16, width: 12 },
    { name: "/api/user", status: "401", type: "fetch", start: 40, width: 30, bad: true },
    { name: "logo.svg", status: "304", type: "image", start: 42, width: 8 },
  ];
  return (
    <Wide minWidth={620}>
      <div className="overflow-hidden rounded-[8px] border border-border bg-background font-mono text-[0.72rem]">
        <div className="flex items-center gap-4 border-b border-border bg-background-secondary px-3 py-2 text-foreground-subtle">
          {tabs.map((tab, i) => (
            <span key={tab} className={cn("flex items-center gap-1.5", tab === "Network" && "text-foreground")}>
              {i < 4 && <Marker n={i + 1} />}
              {tab}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[8rem_3.5rem_5.5rem_minmax(0,1fr)] gap-x-3 border-b border-border px-3 py-1.5 text-foreground-subtle">
          <span>Name</span>
          <span>Status</span>
          <span>Type</span>
          <span>Waterfall</span>
        </div>
        {requests.map((r) => (
          <div key={r.name} className={cn("grid grid-cols-[8rem_3.5rem_5.5rem_minmax(0,1fr)] items-center gap-x-3 px-3 py-1.5", r.bad && "bg-accent-soft")}>
            <span className={r.bad ? "text-accent-hover" : "text-foreground"}>{r.name}</span>
            <span className={r.bad ? "text-accent-hover" : "text-foreground-muted"}>{r.status}</span>
            <span className="text-foreground-muted">{r.type}</span>
            <span className="relative h-2.5">
              <span
                className={cn("absolute top-0 h-2.5 rounded-[2px]", r.bad ? "bg-accent" : "bg-chart-solo")}
                style={{ left: `${r.start}%`, width: `${r.width}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </Wide>
  );
}

export const javascriptDeepSections: GuideSection[] = [
  {
    id: "functions-closures",
    label: "Functions & closures",
    title: "Functions remember where they were born.",
    lead: "A closure is a function plus the variables that were in scope when it was created. It’s how JavaScript does private state, callbacks and much of React.",
    content: (
      <>
        <Figure title="A closure keeps its scope alive">
          <ClosureVisual />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Closures in practice"
            code={`
function makeCounter() {
  let count = 0;                   // private: nothing outside can touch it
  return () => ++count;
}

const counter = makeCounter();
counter();   // 1
counter();   // 2

// default and rest parameters
function tag(label = "note", ...words) {
  return \`[\${label}] \${words.join(" ")}\`;
}
tag(undefined, "hello", "there");  // "[note] hello there"
`}
          />
          <DataTable
            caption="What this refers to"
            head={["How it’s called", "this is…"]}
            rows={[
              [<C key="c">obj.method()</C>, "obj — whatever is left of the dot"],
              [<C key="c">plainFunction()</C>, "undefined (strict mode / modules)"],
              [<C key="c">{"() => { … }"}</C>, "inherited from the surrounding code — arrows have no own this"],
              [<C key="c">new Thing()</C>, "the brand-new object"],
              [<C key="c">fn.call(x) / fn.bind(x)</C>, "x, explicitly"],
              [<C key="c">el.addEventListener(&quot;click&quot;, function () {"{…}"})</C>, "the element (use an arrow to keep the outer this)"],
            ]}
          />
        </div>
        <Callout tone="warn" title="The classic this bug">
          Passing <C>obj.method</C> as a callback loses <C>obj</C> — inside,{" "}
          <C>this</C> is undefined. Use an arrow{" "}
          <C>{"() => obj.method()"}</C> or <C>obj.method.bind(obj)</C>.
        </Callout>
      </>
    ),
  },
  {
    id: "objects-prototypes",
    label: "Objects & prototypes",
    title: "Objects inherit from other objects, through a chain.",
    lead: "Every object has a hidden link to a prototype. Property lookups walk that chain. class syntax is a friendlier way to set it up — underneath, it’s still prototypes.",
    content: (
      <>
        <Figure title="The prototype chain">
          <Wide minWidth={560}>
            <PrototypeChain />
          </Wide>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Classes"
            code={`
class Animal {
  #energy = 10;                     // truly private field
  constructor(name) { this.name = name; }
  eat() { this.#energy++; }
}

class Dog extends Animal {
  bark() { return \`\${this.name}: woof\`; }
}

const rex = new Dog("Rex");
rex.bark();                                  // "Rex: woof"
Object.getPrototypeOf(rex) === Dog.prototype // true
`}
          />
          <Code
            title="Destructuring, spread & shorthand"
            code={`
const user = { id: 1, name: "Ada", role: "admin" };

const { name, role = "guest" } = user;       // pull out fields
const { id, ...rest } = user;                // rest = { name, role }
const updated = { ...user, role: "owner" };  // copy + override

const [first, , third] = ["a", "b", "c"];    // array destructuring
const merged = [...listA, ...listB];

const key = "color";
const theme = { [key]: "dark", name };       // computed key + shorthand
`}
          />
        </div>
        <DataTable
          caption="Nullish coalescing compared with logical OR"
          head={["value", "value || \"default\"", "value ?? \"default\""]}
          rows={[
            [<C key="c">0</C>, '"default"', "0"],
            [<C key="c">&quot;&quot;</C>, '"default"', '""'],
            [<C key="c">false</C>, '"default"', "false"],
            [<C key="c">null</C>, '"default"', '"default"'],
            [<C key="c">undefined</C>, '"default"', '"default"'],
          ]}
        />
        <Callout title="?? and ?. — use them together">
          <C>user?.address?.city ?? &quot;unknown&quot;</C> reads safely through
          missing objects and only falls back when the result is null or
          undefined — so a real <C>0</C> or empty string survives.
        </Callout>
      </>
    ),
  },
  {
    id: "fetch-http",
    label: "Fetch & HTTP",
    title: "Talking to servers: requests, responses and status codes.",
    lead: "Almost every web app loads data over HTTP. fetch sends a request and gives you back a promise for the response.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnnotatedCodeWrapper />
        </div>
        <DataTable
          caption="HTTP status codes worth knowing"
          head={["Code", "Meaning", "Typical cause"]}
          rows={[
            ["200 OK", "Success", "A normal GET"],
            ["201 Created", "Something new exists", "A successful POST"],
            ["204 No Content", "Success, empty body", "A DELETE"],
            ["301 / 308", "Moved permanently", "Old URL, redirect forever"],
            ["304 Not Modified", "Use your cached copy", "Browser caching"],
            ["400 Bad Request", "The request is malformed", "Invalid JSON or missing fields"],
            ["401 Unauthorized", "Not logged in", "Missing or expired token"],
            ["403 Forbidden", "Logged in, but not allowed", "Insufficient permissions"],
            ["404 Not Found", "Nothing at that URL", "Typo or deleted resource"],
            ["422 Unprocessable", "Valid JSON, invalid data", "Validation failed"],
            ["429 Too Many Requests", "Slow down", "Rate limit hit"],
            ["500 Internal Server Error", "The server crashed", "A bug on the backend"],
            ["503 Service Unavailable", "Temporarily down", "Overload or maintenance"],
          ]}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="POST JSON, with a timeout"
            code={`
const res = await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Buy milk" }),
  signal: AbortSignal.timeout(5000),     // give up after 5 s
});

if (!res.ok) {
  throw new Error(\`Request failed: \${res.status}\`);
}
const todo = await res.json();
`}
          />
          <div className="space-y-6">
            <Callout tone="warn" title="fetch doesn’t throw on 404 or 500">
              The promise only rejects when the request couldn’t be made at all
              — offline, DNS failure, CORS block, timeout. An error status still
              “succeeds”, so always check <C>res.ok</C>.
            </Callout>
            <Callout title="What is CORS?">
              Browsers block a page on one origin from reading responses from
              another origin unless that server allows it with{" "}
              <C>Access-Control-Allow-Origin</C> headers. It’s fixed on the
              server, not in your fetch call.
            </Callout>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "dom-events",
    label: "DOM & events",
    title: "The page is a tree of objects you can read, change and listen to.",
    lead: "The browser turns HTML into the DOM — a tree of nodes. JavaScript finds nodes, updates them, and reacts to events that travel through the tree.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6">
          <Figure title="HTML becomes a tree">
            <div className="mx-auto max-w-[760px]">
              <Wide minWidth={520}>
                <DomTree />
              </Wide>
            </div>
          </Figure>
          <Figure title="An event’s journey" note="capture → target → bubble">
            <Propagation />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Listeners run on the way back up by default. That’s why one
              listener on the list can handle clicks on every item.
            </p>
          </Figure>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Find, change, listen"
            code={`
const button = document.querySelector("#buy");
const items = document.querySelectorAll(".cart li");

button.textContent = "Added!";
button.classList.add("is-done");
button.setAttribute("aria-pressed", "true");

button.addEventListener("click", (event) => {
  event.preventDefault();          // stop a form submit or link jump
  console.log("clicked", event.target);
});
`}
          />
          <Code
            title="Event delegation"
            code={`
// One listener handles every current AND future <li>
document.querySelector("#todos").addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  item.classList.toggle("done");
});

// Build elements safely — textContent never runs HTML
const li = document.createElement("li");
li.textContent = userInput;
list.append(li);
`}
          />
        </div>
        <Callout tone="warn" title="Never put user input into innerHTML">
          <C>el.innerHTML = userInput</C> lets anyone inject scripts (XSS). Use{" "}
          <C>textContent</C> for text, or a framework that escapes for you.
        </Callout>
      </>
    ),
  },
  {
    id: "errors-devtools",
    label: "Errors & DevTools",
    title: "Read the error, then open DevTools.",
    lead: "The browser’s developer tools (F12) show what the page is doing: the DOM, logs, source with breakpoints, and every network request.",
    content: (
      <>
        <Figure title="Browser DevTools — the Network panel">
          <DevToolsMock />
          <ol className="mt-5 grid grid-cols-1 gap-2 text-sm text-foreground-muted sm:grid-cols-2">
            {[
              "Elements — inspect and live-edit HTML & CSS",
              "Console — logs, errors, run JavaScript",
              "Sources — breakpoints and step debugging",
              "Network — every request, status, timing, payload",
            ].map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <Marker n={i + 1} /> {label}
              </li>
            ))}
          </ol>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Common JavaScript error types"
            head={["Error", "Usually means"]}
            rows={[
              [<C key="c">TypeError</C>, "Using a value the wrong way — often calling or reading a property of undefined"],
              [<C key="c">ReferenceError</C>, "A variable that doesn’t exist (typo, or used before let/const)"],
              [<C key="c">SyntaxError</C>, "Code the parser can’t read — a missing bracket or comma"],
              [<C key="c">RangeError</C>, "A number out of range, or infinite recursion"],
            ]}
          />
          <Code
            title="Console beyond console.log"
            code={`
console.table(users);              // arrays of objects as a table
console.group("checkout");         // collapsible, indented logs
console.log("items", cart.items);
console.groupEnd();
console.time("render");            // measure how long something takes
render();
console.timeEnd("render");         // render: 12.4 ms
debugger;                          // pause here when DevTools is open
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "tooling",
    label: "Tooling & packages",
    title: "package.json, versions, and what a bundler does.",
    content: (
      <>
        <Figure title="Anatomy of package.json">
          <AnnotatedCode
            title="package.json"
            lines={[
              ["{"],
              ['  "name": "shop",'],
              ['  "type": "module",', 1],
              ['  "scripts": {', 2],
              ['    "dev": "vite",'],
              ['    "build": "vite build",'],
              ['    "test": "vitest"'],
              ["  },"],
              ['  "dependencies": {', 3],
              ['    "zod": "^3.23.8"'],
              ["  },"],
              ['  "devDependencies": {', 4],
              ['    "vite": "~6.0.1",'],
              ['    "typescript": "5.6.3"'],
              ["  }"],
              ["}"],
            ]}
            notes={[
              { title: "type: module", body: "Treat .js files as ES modules (import/export) instead of CommonJS (require)." },
              { title: "scripts", body: "Named commands: npm run dev, npm run build. npm test and npm start work without run." },
              { title: "dependencies", body: "Needed at runtime by your app." },
              { title: "devDependencies", body: "Only needed to build, test or lint — not shipped to users." },
            ]}
          />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Semver ranges in package.json"
            head={["Range", "Allows", "Example"]}
            rows={[
              [<C key="c">^3.23.8</C>, "Minor + patch updates", "3.24.0 ✓   4.0.0 ✗"],
              [<C key="c">~6.0.1</C>, "Patch updates only", "6.0.9 ✓   6.1.0 ✗"],
              [<C key="c">5.6.3</C>, "Exactly that version", "5.6.4 ✗"],
              [<C key="c">^0.4.2</C>, "Careful: 0.x is treated as unstable", "0.4.9 ✓   0.5.0 ✗"],
            ]}
          />
          <Callout title="Commit the lockfile">
            <C>package-lock.json</C> records the exact version of every package
            — including dependencies of dependencies. Commit it, and use{" "}
            <C>npm ci</C> in CI so every install is identical.
          </Callout>
        </div>
        <Figure title="What a bundler does">
          <Pipeline
            nodes={[
              { title: "Your source", sub: "many .ts, .jsx, .css files" },
              { title: "Bundler", sub: "Vite, esbuild, Turbopack" },
              { title: "Optimised output", sub: "minified, tree-shaken, split" },
              { title: "Browser", sub: "fast to download", accent: true },
            ]}
            links={[{ forward: "import graph" }, { forward: "build" }, { forward: "deploy" }]}
          />
        </Figure>
      </>
    ),
  },
  {
    id: "typescript",
    label: "TypeScript",
    title: "TypeScript catches the bug before the user does.",
    lead: "TypeScript adds a type layer on top of JavaScript. It checks your code while you type and in CI, then strips the types away — what runs is plain JavaScript.",
    content: (
      <>
        <Figure title="Types exist only at build time">
          <Pipeline
            nodes={[
              { title: "cart.ts", sub: "code + type annotations" },
              { title: "Type checker", sub: "tsc --noEmit, or your editor" },
              { title: "cart.js", sub: "types erased" },
              { title: "Runs anywhere JS runs", accent: true },
            ]}
            links={[{ forward: "check" }, { forward: "strip types" }, { forward: "run" }]}
          />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="The types you’ll use most"
            code={`
type Status = "idle" | "loading" | "error";   // union of literals

interface User {
  id: number;
  name: string;
  email?: string;                             // optional
}

function greet(user: User): string {
  return \`Hi \${user.name}\`;
}

function first<T>(items: T[]): T | undefined { // generic
  return items[0];
}

// narrowing: TypeScript follows your checks
function show(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
`}
          />
          <div className="space-y-6">
            <DataTable
              caption="Built-in utility types"
              head={["Utility", "Gives you"]}
              rows={[
                [<C key="c">Partial&lt;User&gt;</C>, "All fields optional — great for updates"],
                [<C key="c">Required&lt;User&gt;</C>, "All fields required"],
                [<C key="c">Pick&lt;User, &quot;id&quot; | &quot;name&quot;&gt;</C>, "Only those fields"],
                [<C key="c">Omit&lt;User, &quot;email&quot;&gt;</C>, "Everything except those"],
                [<C key="c">Record&lt;string, number&gt;</C>, "An object map of keys to values"],
                [<C key="c">ReturnType&lt;typeof fn&gt;</C>, "Whatever a function returns"],
              ]}
            />
            <Code
              title="tsconfig.json — turn on strict"
              code={`
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "module": "ESNext"
  }
}
`}
            />
          </div>
        </div>
        <Card title="any vs unknown">
          <C>any</C> switches type checking off — errors slip through silently.{" "}
          <C>unknown</C> means “I don’t know yet”, and forces you to check the
          type before using it. Reach for <C>unknown</C> for data from APIs or{" "}
          <C>JSON.parse</C>.
        </Card>
      </>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "JavaScript words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "ECMAScript", def: "The official language standard JavaScript implements; a new edition ships yearly." },
          { term: "runtime", def: "The environment that runs JS: a browser, Node.js, Deno, Bun." },
          { term: "DOM", def: "The tree of objects representing the web page." },
          { term: "hoisting", def: "Declarations being processed before code runs (var is initialised as undefined)." },
          { term: "scope", def: "Where a variable is visible: block, function, module or global." },
          { term: "closure", def: "A function together with the variables it captured from its scope." },
          { term: "prototype", def: "The object another object inherits properties from." },
          { term: "callback", def: "A function passed in to be called later." },
          { term: "promise", def: "An object representing a value that will be available later." },
          { term: "async / await", def: "Syntax for writing promise-based code that reads top to bottom." },
          { term: "event loop", def: "The mechanism that runs queued callbacks when the call stack is empty." },
          { term: "microtask", def: "A high-priority callback (promise reactions) run before the next task." },
          { term: "module", def: "A file with its own scope that exports and imports values." },
          { term: "npm", def: "Node’s package manager and the registry of packages." },
          { term: "bundler", def: "A tool that combines and optimises modules for the browser." },
          { term: "transpile", def: "Convert code to another version or dialect, like TS to JS." },
          { term: "JSON", def: "A text format for data, based on JavaScript object syntax." },
          { term: "CORS", def: "Browser rules controlling cross-origin HTTP responses." },
          { term: "XSS", def: "An attack that injects scripts into a page through unescaped input." },
          { term: "TypeScript", def: "JavaScript with static types, checked before running." },
        ]}
      />
    ),
  },
];

function AnnotatedCodeWrapper() {
  return (
    <>
      <Code
        title="An HTTP request"
        code={`
POST /api/todos HTTP/1.1               # method, path, protocol
Host: example.com
Content-Type: application/json         # headers: metadata
Authorization: Bearer eyJhbGciOi...
                                       # blank line, then the body
{"title": "Buy milk"}
`}
      />
      <Code
        title="…and its response"
        code={`
HTTP/1.1 201 Created                   # status code + reason
Content-Type: application/json
Location: /api/todos/42
Cache-Control: no-store

{"id": 42, "title": "Buy milk", "done": false}
`}
      />
    </>
  );
}
