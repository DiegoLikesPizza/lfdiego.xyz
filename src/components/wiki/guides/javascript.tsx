import { ArrowRight, Braces } from "lucide-react";
import type { Guide } from "../types";
import { EventLoopStepper } from "../EventLoopStepper";
import {
  C,
  Callout,
  Card,
  Chip,
  Code,
  DataTable,
  Figure,
  Wide,
} from "../primitives";

const input = [1, 2, 3, 4, 5];
const arrayRows: {
  method: string;
  note: string;
  keep?: number[];
  output: string[];
}[] = [
  { method: "map(x => x * 2)", note: "transform every item", output: ["2", "4", "6", "8", "10"] },
  { method: "filter(x => x % 2 === 0)", note: "keep items that pass", keep: [2, 4], output: ["2", "4"] },
  { method: "find(x => x > 3)", note: "first match, or undefined", keep: [4], output: ["4"] },
  { method: "some(x => x > 4)", note: "does any item pass?", keep: [5], output: ["true"] },
  { method: "reduce((sum, x) => sum + x, 0)", note: "fold everything into one value", output: ["15"] },
];

function ArrayMethods() {
  return (
    <ul className="space-y-5">
      {arrayRows.map((row) => (
        <li
          key={row.method}
          className="flex flex-col gap-3 border-b border-border pb-5 last:border-0 last:pb-0 md:flex-row md:items-center md:gap-5"
        >
          <div className="md:w-72 md:shrink-0">
            <p className="font-mono text-sm text-foreground">.{row.method}</p>
            <p className="mt-0.5 text-xs text-foreground-muted">{row.note}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex flex-wrap gap-1.5">
              {input.map((n) => (
                <Chip key={n} tone={row.keep && !row.keep.includes(n) ? "dim" : "neutral"}>
                  {n}
                </Chip>
              ))}
            </span>
            <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-accent" />
            <span className="flex flex-wrap gap-1.5">
              {row.output.map((value, i) => (
                <Chip key={i} tone="solid">
                  {value}
                </Chip>
              ))}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PromiseStates() {
  return (
    <svg
      viewBox="0 0 640 200"
      className="h-auto w-full"
      role="img"
      aria-label="Promise states: a pending promise either resolves to fulfilled, handled with then or await, or rejects, handled with catch or try/catch. Both end settled, where finally runs."
    >
      <defs>
        <marker id="js-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
        <marker id="js-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>

      <rect x="20" y="75" width="140" height="50" rx="8" strokeWidth="1.5" strokeDasharray="5 4" className="fill-background stroke-foreground-subtle" />
      <text x="90" y="105" fontSize="14" textAnchor="middle" className="fill-foreground font-mono">
        pending
      </text>

      <rect x="280" y="20" width="160" height="50" rx="8" strokeWidth="1.5" className="fill-accent-soft stroke-accent" />
      <text x="360" y="42" fontSize="14" textAnchor="middle" className="fill-foreground font-mono">
        fulfilled
      </text>
      <text x="360" y="60" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        .then() / await
      </text>

      <rect x="280" y="130" width="160" height="50" rx="8" strokeWidth="1.5" className="fill-surface stroke-border" />
      <text x="360" y="152" fontSize="14" textAnchor="middle" className="fill-foreground font-mono">
        rejected
      </text>
      <text x="360" y="170" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        .catch() / try…catch
      </text>

      <rect x="500" y="75" width="120" height="50" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      <text x="560" y="97" fontSize="14" textAnchor="middle" className="fill-foreground font-mono">
        settled
      </text>
      <text x="560" y="115" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        .finally()
      </text>

      <path d="M160 100 C220 100 220 45 274 45" fill="none" strokeWidth="1.5" markerEnd="url(#js-arrow-accent)" className="stroke-accent" />
      <text x="206" y="50" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
        resolve
      </text>
      <path d="M160 100 C220 100 220 155 274 155" fill="none" strokeWidth="1.5" markerEnd="url(#js-arrow)" className="stroke-foreground-subtle" />
      <text x="206" y="160" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        reject
      </text>
      <path d="M440 45 C475 45 470 100 494 100" fill="none" strokeWidth="1.5" markerEnd="url(#js-arrow)" className="stroke-foreground-subtle" />
      <path d="M440 155 C475 155 470 100 494 100" fill="none" strokeWidth="1.5" markerEnd="url(#js-arrow)" className="stroke-foreground-subtle" />
    </svg>
  );
}

const falsy = ["false", "0", "-0", "0n", '""', "null", "undefined", "NaN"];
const truthySurprises = ['"0"', '"false"', "[]", "{}", "-1", "Infinity"];

export const javascriptGuide: Guide = {
  slug: "javascript",
  title: "JavaScript",
  kicker: "Language",
  summary:
    "Where JavaScript runs, variables and its quirky types, array methods you’ll use constantly, the event loop (step through it yourself), promises and async/await, and modules.",
  icon: Braces,
  sections: [
    {
      id: "where-it-runs",
      label: "Where it runs",
      title: "One language, two big homes: the browser and Node.js.",
      lead: "The language itself is the same everywhere. What changes is the environment around it — the APIs you can call.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card eyebrow="Browser" title="Talks to the page">
              document and the DOM, window, events, localStorage, fetch.
            </Card>
            <Card eyebrow="Both" title="The language" accent>
              Variables, functions, objects, classes, promises, modules, JSON,
              fetch.
            </Card>
            <Card eyebrow="Node.js" title="Talks to the machine">
              Files (fs), servers (http), process and env variables, npm
              packages.
            </Card>
          </div>
          <Code
            title="Runs anywhere"
            code={`
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("world"));   // Hello, world!
`}
          />
        </>
      ),
    },
    {
      id: "variables-types",
      label: "Variables & types",
      title: "const by default, let when it changes, never var.",
      lead: "Most JavaScript surprises come from var’s scoping and from loose equality. Avoid both and the language gets much friendlier.",
      content: (
        <>
          <DataTable
            caption="var, let and const compared"
            head={["", "Scope", "Reassign?", "Before declaration"]}
            rows={[
              [<C key="c">var</C>, "Whole function", "Yes", "undefined (hoisted) — hides bugs"],
              [<C key="c">let</C>, "Block { … }", "Yes", "ReferenceError"],
              [<C key="c">const</C>, "Block { … }", "No — but objects inside can still change", "ReferenceError"],
            ]}
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DataTable
              caption="Loose and strict equality compared"
              head={["Expression", "==", "==="]}
              rows={[
                [<C key="c">{'0 == ""'}</C>, "true", "false"],
                [<C key="c">{'"1" == 1'}</C>, "true", "false"],
                [<C key="c">null == undefined</C>, "true", "false"],
                [<C key="c">NaN == NaN</C>, "false", "false — use Number.isNaN()"],
              ]}
            />
            <Figure title="Truthy or falsy?">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                The only falsy values
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {falsy.map((value) => (
                  <Chip key={value} tone="accent">
                    {value}
                  </Chip>
                ))}
              </div>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
                Truthy — often surprising
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {truthySurprises.map((value) => (
                  <Chip key={value}>{value}</Chip>
                ))}
              </div>
            </Figure>
          </div>
          <Callout title="Always use === and !==">
            Strict equality never converts types behind your back. Linters
            like ESLint flag <C>==</C> for exactly this reason.
          </Callout>
        </>
      ),
    },
    {
      id: "array-methods",
      label: "Array methods",
      title: "map, filter, reduce — watch the data move.",
      lead: "Every row starts with the same array, [1, 2, 3, 4, 5]. Faded items are the ones a method skipped or didn’t keep.",
      content: (
        <>
          <Figure title="Same input, five methods" note="const nums = [1, 2, 3, 4, 5]">
            <ArrayMethods />
          </Figure>
          <Callout tone="warn" title="Some methods change the original">
            map, filter and friends return a new array. <C>sort()</C>,{" "}
            <C>reverse()</C> and <C>splice()</C> mutate in place — reach for{" "}
            <C>toSorted()</C>, <C>toReversed()</C> and <C>toSpliced()</C> when
            you want a copy.
          </Callout>
        </>
      ),
    },
    {
      id: "event-loop",
      label: "Event loop",
      title: "One thread, never blocked: how async code takes turns.",
      lead: "Guess the output order, then step through it. The rule: finish all synchronous code, then run every microtask (promises), then one task (timers, events) — and repeat.",
      content: (
        <Figure title="Step through the event loop" note="interactive">
          <EventLoopStepper />
        </Figure>
      ),
    },
    {
      id: "promises",
      label: "Promises & async",
      title: "A promise is a value that arrives later.",
      lead: "It starts pending and settles exactly once — fulfilled with a value or rejected with an error. async/await is a nicer way to write the same thing.",
      content: (
        <>
          <Figure title="The life of a promise">
            <Wide minWidth={540}>
              <PromiseStates />
            </Wide>
          </Figure>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Code
              title="async / await with error handling"
              code={`
async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Could not load user", err);
    return null;
  }
}

// independent requests: run them in parallel
const [user, posts] = await Promise.all([loadUser(1), loadPosts(1)]);
`}
            />
            <Callout title="await in a loop is sequential">
              <C>for … of</C> with <C>await</C> waits for each request before
              starting the next. If the requests don’t depend on each other,
              start them all and use <C>Promise.all</C> — it’s often many times
              faster.
            </Callout>
          </div>
        </>
      ),
    },
    {
      id: "modules",
      label: "Modules & npm",
      title: "Split code into modules; let npm fetch the rest.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Code
              title="ES modules"
              code={`
// math.js
export function add(a, b) { return a + b; }
export default function mean(xs) {
  return xs.reduce(add, 0) / xs.length;
}

// app.js
import mean, { add } from "./math.js";
`}
            />
            <DataTable
              caption="Everyday npm commands"
              head={["Command", "What it does"]}
              rows={[
                [<C key="c">npm init -y</C>, "Create package.json"],
                [<C key="c">npm install zod</C>, "Add a dependency"],
                [<C key="c">npm install -D eslint</C>, "Add a dev-only tool"],
                [<C key="c">npm ci</C>, "Exact install from the lockfile (CI)"],
                [<C key="c">npm run dev</C>, "Run a script from package.json"],
                [<C key="c">npx &lt;tool&gt;</C>, "Run a package without installing it"],
              ]}
            />
          </div>
          <Callout title="Next step: TypeScript">
            TypeScript is JavaScript plus types, checked before your code runs.
            For anything bigger than a script, it catches whole classes of bugs
            — this site is written in it.
          </Callout>
        </>
      ),
    },
  ],
};
