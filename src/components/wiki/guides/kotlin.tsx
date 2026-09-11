import { ArrowDown, ArrowRight, Hexagon } from "lucide-react";
import type { Guide } from "../types";
import {
  C,
  Callout,
  Chip,
  Code,
  DataTable,
  Figure,
  Wide,
} from "../primitives";

const targets = [
  { name: "JVM", sub: "Servers, desktop, Spring — uses every Java library" },
  { name: "Android", sub: "Google’s preferred language for Android apps" },
  { name: "JavaScript / Wasm", sub: "Browser and Node.js code" },
  { name: "Native", sub: "iOS, macOS, Linux and Windows binaries" },
];

function CompileTargets() {
  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      <div className="rounded-[8px] border border-border bg-background px-5 py-4 text-center lg:w-40">
        <p className="font-mono text-sm text-foreground">Main.kt</p>
        <p className="mt-1 text-xs text-foreground-muted">your code</p>
      </div>
      <ArrowDown className="mx-auto h-4 w-4 text-accent lg:hidden" />
      <ArrowRight className="hidden h-4 w-4 shrink-0 text-accent lg:block" />
      <div className="rounded-[8px] border border-accent/50 bg-accent-soft px-5 py-4 text-center lg:w-44">
        <p className="font-heading font-semibold text-foreground">Kotlin compiler</p>
        <p className="mt-1 text-xs text-foreground-muted">one language, many targets</p>
      </div>
      <ArrowDown className="mx-auto h-4 w-4 text-accent lg:hidden" />
      <ArrowRight className="hidden h-4 w-4 shrink-0 text-accent lg:block" />
      <ul className="grid flex-1 gap-3 sm:grid-cols-2">
        {targets.map((target) => (
          <li key={target.name} className="rounded-[8px] border border-border bg-background px-4 py-3">
            <p className="font-heading font-semibold text-foreground">{target.name}</p>
            <p className="mt-0.5 text-xs leading-snug text-foreground-muted">{target.sub}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NullableTypes() {
  return (
    <div className="rounded-[8px] border-2 border-dashed border-accent/50 p-5">
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-lg text-accent-hover">String?</span>
        <span className="text-xs text-foreground-muted">a String, or null</span>
      </p>
      <div className="mt-4 rounded-[8px] border border-border bg-surface p-4">
        <p className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-lg text-foreground">String</span>
          <span className="text-xs text-foreground-muted">never null</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip>&quot;Ada&quot;</Chip>
          <Chip>&quot;hello&quot;</Chip>
          <Chip>&quot;&quot;</Chip>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Chip tone="accent">null</Chip>
        <span className="text-xs text-foreground-muted">
          only fits in the outer box
        </span>
      </div>
    </div>
  );
}

const scopeCells = [
  {
    fn: "run · with",
    ref: "this",
    returns: "lambda result",
    use: "Compute a value from an object.",
    code: "val area = rect.run { width * height }",
  },
  {
    fn: "apply",
    ref: "this",
    returns: "the object",
    use: "Configure an object, then keep it.",
    code: 'val req = Request().apply { url = "/api" }',
  },
  {
    fn: "let",
    ref: "it",
    returns: "lambda result",
    use: "Transform a value, or run only if not null.",
    code: "name?.let { println(it.length) }",
  },
  {
    fn: "also",
    ref: "it",
    returns: "the object",
    use: "Side effects like logging, mid-chain.",
    code: 'list.also { println("size: ${it.size}") }',
  },
];

function ScopeMatrix() {
  return (
    <Wide minWidth={560}>
      <div className="grid grid-cols-[6.5rem_1fr_1fr] gap-3">
        <span />
        <p className="px-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
          Returns the lambda result
        </p>
        <p className="px-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
          Returns the object itself
        </p>
        {["this", "it"].map((ref) => (
          <div key={ref} className="contents">
            <p className="self-center font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
              Object as <span className="text-accent-hover normal-case">{ref}</span>
            </p>
            {scopeCells
              .filter((cell) => cell.ref === ref)
              .map((cell) => (
                <div key={cell.fn} className="rounded-[8px] border border-border bg-background p-4">
                  <p className="font-mono text-lg text-accent-hover">{cell.fn}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{cell.use}</p>
                  <p className="mt-3 overflow-x-auto whitespace-nowrap rounded-[5px] border border-border bg-background-secondary px-2 py-1 font-mono text-[0.72rem] text-foreground">
                    {cell.code}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </Wide>
  );
}

function CoroutineTimeline() {
  const blocked = [
    { y: 44, label: "Thread 1", start: 110 },
    { y: 74, label: "Thread 2", start: 122 },
    { y: 104, label: "Thread 3", start: 134 },
  ];
  return (
    <svg
      viewBox="0 0 640 240"
      className="h-auto w-full"
      role="img"
      aria-label="Timeline comparison. Blocking: three threads each do a little work, then sit blocked while waiting for the network, then finish. Coroutines: one thread runs requests A, B and C briefly, is free while all three wait, then finishes all three."
    >
      <defs>
        <pattern id="kt-wait" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" strokeWidth="2" className="stroke-foreground-subtle" />
        </pattern>
      </defs>

      <text x="20" y="22" fontSize="12" className="fill-foreground font-heading font-semibold">
        Blocking: one thread per request
      </text>
      {blocked.map((lane) => (
        <g key={lane.label}>
          <text x="20" y={lane.y + 13} fontSize="11" className="fill-foreground-subtle font-mono">
            {lane.label}
          </text>
          <rect x={lane.start} y={lane.y} width="36" height="18" rx="3" className="fill-accent" />
          <rect x={lane.start + 36} y={lane.y} width="330" height="18" fill="url(#kt-wait)" opacity="0.55" />
          <rect x={lane.start + 366} y={lane.y} width="36" height="18" rx="3" className="fill-accent" />
        </g>
      ))}

      <text x="20" y="160" fontSize="12" className="fill-foreground font-heading font-semibold">
        Coroutines: all three on one thread
      </text>
      <text x="20" y="189" fontSize="11" className="fill-foreground-subtle font-mono">
        Thread 1
      </text>
      <path d="M110 185 H610" strokeWidth="1" strokeDasharray="3 4" className="stroke-border" />
      {[
        { x: 110, l: "A" },
        { x: 142, l: "B" },
        { x: 174, l: "C" },
        { x: 480, l: "A" },
        { x: 512, l: "B" },
        { x: 544, l: "C" },
      ].map((seg, i) => (
        <g key={i}>
          <rect x={seg.x} y="176" width="30" height="18" rx="3" className="fill-accent" />
          <text x={seg.x + 15} y="189" fontSize="11" textAnchor="middle" className="fill-accent-foreground font-mono">
            {seg.l}
          </text>
        </g>
      ))}
      <text x="342" y="212" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        suspended — thread free for other work
      </text>

      <path d="M110 230 H610" strokeWidth="1" className="stroke-border" />
      <text x="610" y="226" fontSize="10" textAnchor="end" className="fill-foreground-subtle font-mono">
        time →
      </text>
    </svg>
  );
}

export const kotlinGuide: Guide = {
  slug: "kotlin",
  title: "Kotlin",
  kicker: "Language",
  summary:
    "Java’s concise cousin: where it runs, the same class in both languages, null safety that catches NPEs at compile time, scope functions in one grid, and coroutines.",
  icon: Hexagon,
  sections: [
    {
      id: "what-is-kotlin",
      label: "What Kotlin is",
      title: "A modern language for the JVM — and well beyond it.",
      lead: "Built by JetBrains, fully interoperable with Java, and the default for Android. The same code can also compile to JavaScript, WebAssembly and native binaries.",
      content: (
        <>
          <Figure title="One source, many targets">
            <CompileTargets />
          </Figure>
          <Callout title="Mix Java and Kotlin freely">
            Kotlin calls Java libraries directly and Java calls Kotlin back. You
            can add a single .kt file to an existing Java project and grow from
            there — no rewrite needed.
          </Callout>
        </>
      ),
    },
    {
      id: "java-vs-kotlin",
      label: "Java vs Kotlin",
      title: "The same class, in a fraction of the code.",
      lead: "A data class gives you the constructor, getters, equals, hashCode, toString and copy — the boilerplate Java makes you write (or generate).",
      content: (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Code
              title="Java"
              code={`
public final class User {
    private final String name;
    private final int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    // + equals(), hashCode(), toString() ...
}
`}
            />
            <Code
              title="Kotlin"
              code={`
data class User(val name: String, val age: Int)

// equals, hashCode, toString and copy() for free
val ada = User("Ada", 36)
val older = ada.copy(age = 37)
println(older)   // User(name=Ada, age=37)
`}
            />
          </div>
          <Code
            title="The basics"
            code={`
val name = "Ada"     // read-only, type inferred
var count = 0        // mutable
count += 1

fun greet(who: String = "world") = "Hello, $who!"

val label = when {
    count == 0 -> "none"
    count < 10 -> "a few"
    else -> "lots"
}
`}
          />
        </>
      ),
    },
    {
      id: "null-safety",
      label: "Null safety",
      title: "The type system knows what can be null.",
      lead: "String and String? are different types. The compiler won’t let you call .length on something that might be null until you’ve handled that case.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            <Figure title="Nullable types nest">
              <NullableTypes />
            </Figure>
            <div className="space-y-6">
              <DataTable
                caption="Kotlin null-safety operators"
                head={["Operator", "If it has a value", "If it’s null"]}
                rows={[
                  [<C key="c">a?.length</C>, "the length", "null"],
                  [<C key="c">{'a ?: "none"'}</C>, "a", '"none" (Elvis)'],
                  [<C key="c">{"a?.let { … }"}</C>, "runs the block", "skips it"],
                  [<C key="c">a!!.length</C>, "the length", <span key="s" className="text-accent-hover">throws NPE — avoid</span>],
                  [<C key="c">if (a != null)</C>, "a is a String inside", "—"],
                ]}
              />
              <Code
                code={`
var nickname: String? = null
nickname.length            // compile error
nickname?.length           // null
nickname?.length ?: 0      // 0
`}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: "scope-functions",
      label: "Scope functions",
      title: "let, run, with, apply, also — one grid to tell them apart.",
      lead: "They all run a block with an object. They differ in only two ways: how you refer to the object inside, and what the call returns.",
      content: (
        <Figure title="Pick by two questions">
          <ScopeMatrix />
        </Figure>
      ),
    },
    {
      id: "coroutines",
      label: "Coroutines",
      title: "Suspend instead of block: many tasks, few threads.",
      lead: "A suspend function can pause while it waits — for the network, a database, a timer — and hand its thread back. Thousands of coroutines can share a handful of threads.",
      content: (
        <>
          <Figure title="Waiting on three network calls">
            <Wide minWidth={560}>
              <CoroutineTimeline />
            </Wide>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-foreground-muted">
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded-[2px] bg-accent" /> running
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded-[2px] border border-foreground-subtle bg-[repeating-linear-gradient(45deg,var(--foreground-subtle)_0_2px,transparent_2px_5px)] opacity-60" />{" "}
                blocked, thread wasted
              </li>
            </ul>
          </Figure>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Code
              title="Two requests at once"
              code={`
suspend fun loadDashboard(): Dashboard = coroutineScope {
    val user = async { api.user() }      // starts now
    val orders = async { api.orders() }  // runs concurrently
    Dashboard(user.await(), orders.await())
}
`}
            />
            <Callout title="Where coroutines start">
              A suspend function can only be called from another suspend
              function or a coroutine. On Android, launch them in{" "}
              <C>viewModelScope</C> or <C>lifecycleScope</C> so they’re
              cancelled automatically; avoid <C>GlobalScope</C>.
            </Callout>
          </div>
        </>
      ),
    },
    {
      id: "collections",
      label: "Collections",
      title: "Read-only by default, with a huge standard library.",
      content: (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Code
            title="Collections"
            code={`
val scores = listOf(72, 95, 88, 40)          // read-only
val (passed, failed) = scores.partition { it >= 50 }
val best = scores.maxOrNull()                // 95
val average = scores.average()               // 73.75

val prices = mutableMapOf("tea" to 2.5)      // mutable
prices["coffee"] = 3.0
for ((item, price) in prices) println("$item costs $price")
`}
          />
          <DataTable
            caption="Read-only and mutable collection builders"
            head={["Read-only", "Mutable"]}
            rows={[
              [<C key="c">listOf()</C>, <C key="m">mutableListOf()</C>],
              [<C key="c">setOf()</C>, <C key="m">mutableSetOf()</C>],
              [<C key="c">mapOf(k to v)</C>, <C key="m">mutableMapOf()</C>],
            ]}
          />
        </div>
      ),
    },
  ],
};
