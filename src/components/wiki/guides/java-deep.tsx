import type { GuideSection } from "../types";
import {
  C,
  Callout,
  Card,
  Chip,
  Code,
  DataTable,
  DoDont,
  Figure,
  Glossary,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

const access = [
  { mod: "public", cells: [true, true, true, true] },
  { mod: "protected", cells: [true, true, true, false] },
  { mod: "(none) package-private", cells: [true, true, false, false] },
  { mod: "private", cells: [true, false, false, false] },
];

function AccessMatrix() {
  return (
    <Wide minWidth={520}>
      <div className="grid grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] gap-y-2 text-sm">
        <span />
        {["Same class", "Same package", "Subclass elsewhere", "Everywhere"].map((h) => (
          <span key={h} className="px-1 text-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-foreground-subtle">
            {h}
          </span>
        ))}
        {access.map((row) => (
          <div key={row.mod} className="contents">
            <span className="self-center font-mono text-sm text-foreground">{row.mod}</span>
            {row.cells.map((ok, i) => (
              <span key={i} className="flex items-center justify-center py-1.5">
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    ok ? "border-accent bg-accent" : "border-border bg-transparent",
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </Wide>
  );
}

function StringPool() {
  const rows = [
    { y: 60, name: 'a = "hi"' },
    { y: 105, name: 'b = "hi"' },
    { y: 150, name: 'c = new String("hi")' },
  ];
  return (
    <svg
      viewBox="0 0 640 230"
      className="h-auto w-full"
      role="img"
      aria-label="String pool: variables a and b both point to the same pooled String object hi. Variable c, created with new String, points to a separate object outside the pool."
    >
      <defs>
        <marker id="java-pool-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
        <marker id="java-pool-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>
      <text x="20" y="30" fontSize="11" className="fill-foreground-subtle font-mono">
        STACK
      </text>
      <rect x="20" y="40" width="230" height="160" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      {rows.map((row) => (
        <g key={row.name}>
          <rect x="34" y={row.y} width="202" height="34" rx="6" className="fill-surface stroke-border" />
          <text x="46" y={row.y + 22} fontSize="11" className="fill-foreground font-mono">
            {row.name}
          </text>
          <circle cx="222" cy={row.y + 17} r="4.5" className={row.y === 150 ? "fill-foreground-subtle" : "fill-accent"} />
        </g>
      ))}

      <text x="300" y="14" fontSize="11" className="fill-foreground-subtle font-mono">
        HEAP
      </text>
      <rect x="300" y="22" width="320" height="195" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      <rect x="320" y="40" width="190" height="90" rx="8" strokeWidth="1.5" strokeDasharray="5 4" className="fill-accent-soft stroke-accent" />
      <text x="332" y="58" fontSize="10" className="fill-accent-hover font-mono">
        String pool
      </text>
      <rect x="350" y="72" width="130" height="36" rx="6" strokeWidth="1.5" className="fill-surface stroke-accent" />
      <text x="415" y="95" fontSize="12" textAnchor="middle" className="fill-foreground font-mono">
        &quot;hi&quot;
      </text>
      <rect x="350" y="158" width="130" height="36" rx="6" strokeWidth="1" className="fill-surface stroke-border" />
      <text x="415" y="181" fontSize="12" textAnchor="middle" className="fill-foreground font-mono">
        &quot;hi&quot;
      </text>

      <path d="M227 77 C290 77 290 86 344 86" fill="none" strokeWidth="1.8" markerEnd="url(#java-pool-arrow)" className="stroke-accent" />
      <path d="M227 122 C290 122 290 96 344 96" fill="none" strokeWidth="1.8" markerEnd="url(#java-pool-arrow)" className="stroke-accent" />
      <path d="M227 167 C290 167 290 176 344 176" fill="none" strokeWidth="1.5" markerEnd="url(#java-pool-arrow-muted)" className="stroke-foreground-subtle" />
    </svg>
  );
}

function ExceptionTree() {
  const leaf = (names: string[]) => (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {names.map((n) => (
        <Chip key={n}>{n}</Chip>
      ))}
    </div>
  );
  return (
    <div className="text-sm">
      <div className="inline-block rounded-[8px] border border-border bg-background px-4 py-2 font-mono text-foreground">
        Throwable
      </div>
      <div className="ml-5 mt-2 space-y-3 border-l border-border pl-5">
        <div className="rounded-[8px] border border-border bg-background p-4">
          <p className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-foreground">Error</span>
            <span className="text-xs text-foreground-muted">the JVM is in trouble — don’t catch</span>
          </p>
          {leaf(["OutOfMemoryError", "StackOverflowError"])}
        </div>
        <div className="rounded-[8px] border border-border bg-background p-4">
          <p className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-mono text-foreground">Exception</span>
            <span className="text-xs text-foreground-muted">checked — must catch or declare with throws</span>
          </p>
          {leaf(["IOException", "SQLException", "InterruptedException"])}
          <div className="ml-3 mt-4 border-l border-border pl-4">
            <div className="rounded-[8px] border border-accent/50 bg-accent-soft p-4">
              <p className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-accent-hover">RuntimeException</span>
                <span className="text-xs text-foreground-muted">unchecked — usually a bug in the code</span>
              </p>
              {leaf([
                "NullPointerException",
                "IllegalArgumentException",
                "IllegalStateException",
                "IndexOutOfBoundsException",
                "ArithmeticException",
              ])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericBox() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.6fr)]">
      <div className="rounded-[8px] border-2 border-dashed border-accent/50 p-4 text-center">
        <p className="font-mono text-lg text-foreground">
          Box&lt;<span className="text-accent-hover">T</span>&gt;
        </p>
        <p className="mt-1 text-xs text-foreground-muted">written once, T is a placeholder</p>
      </div>
      <span className="text-center font-mono text-xs text-foreground-subtle">fill in T →</span>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          { t: "String", v: '"Ada"' },
          { t: "Integer", v: "42" },
          { t: "User", v: "new User(…)" },
        ].map((b) => (
          <div key={b.t} className="rounded-[8px] border border-border bg-background p-3 text-center">
            <p className="font-mono text-sm text-foreground">
              Box&lt;<span className="text-accent-hover">{b.t}</span>&gt;
            </p>
            <p className="mt-1 font-mono text-xs text-foreground-muted">{b.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const journeys = [
  { name: '"al"', steps: ["filter ✗"], note: "too short — dropped, map never runs" },
  { name: '"ada"', steps: ["filter ✓", "map → \"ADA\"", "findFirst ✓"], note: "first match — the stream stops here" },
  { name: '"bob"', steps: [], note: "never looked at" },
];

function LazyStream() {
  return (
    <div>
      <p className="font-mono text-xs text-foreground-muted">
        {'List.of("al", "ada", "bob").stream().filter(n -> n.length() > 2).map(String::toUpperCase).findFirst()'}
      </p>
      <ol className="mt-5 space-y-3">
        {journeys.map((j) => (
          <li key={j.name} className="grid grid-cols-1 items-center gap-2 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,14rem)]">
            <span className="font-mono text-sm text-foreground">{j.name}</span>
            <span className="flex flex-wrap items-center gap-1.5">
              {j.steps.length === 0 ? (
                <Chip tone="dim">skipped</Chip>
              ) : (
                j.steps.map((s, i) => (
                  <Chip key={i} tone={s.includes("✗") ? "dim" : i === j.steps.length - 1 && s.includes("findFirst") ? "solid" : "accent"}>
                    {s}
                  </Chip>
                ))
              )}
            </span>
            <span className="text-xs text-foreground-muted">{j.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const releases = [
  { v: "8", year: "2014", items: ["Lambdas & streams", "Optional", "java.time"] },
  { v: "11", year: "2018", items: ["var in lambdas", "HttpClient", "Run a .java file directly"] },
  { v: "17", year: "2021", items: ["Records", "Sealed classes", "Text blocks", "Pattern matching for instanceof"] },
  { v: "21", year: "2023", items: ["Virtual threads", "Pattern matching for switch", "Record patterns", "Sequenced collections"] },
  { v: "25", year: "2025", items: ["Compact source files & instance main", "Module imports", "Flexible constructor bodies", "Scoped values"] },
];

function LtsTimeline() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {releases.map((r, index) => (
        <li
          key={r.v}
          className={cn(
            "rounded-[8px] border p-4",
            index === releases.length - 1 ? "border-accent/50 bg-accent-soft" : "border-border bg-background",
          )}
        >
          <p className="flex items-baseline justify-between">
            <span className="font-heading text-2xl font-semibold text-foreground">Java {r.v}</span>
            <span className="font-mono text-xs text-foreground-subtle">{r.year}</span>
          </p>
          <ul className="mt-3 space-y-1 text-xs leading-relaxed text-foreground-muted">
            {r.items.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function ThreadsDiagram() {
  const platform = [0, 1, 2, 3];
  const virtuals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 640 230"
      className="h-auto w-full"
      role="img"
      aria-label="Platform threads versus virtual threads. Left: four Java platform threads, each tied one-to-one to an expensive OS thread. Right: twelve lightweight virtual threads share two carrier threads, unmounting while they wait."
    >
      <text x="20" y="22" fontSize="12" className="fill-foreground font-heading font-semibold">
        Platform threads: 1 Java thread = 1 OS thread
      </text>
      {platform.map((i) => (
        <g key={i}>
          <rect x={30 + i * 62} y="45" width="44" height="30" rx="6" strokeWidth="1.5" className="fill-surface stroke-foreground-subtle" />
          <text x={52 + i * 62} y="64" fontSize="10" textAnchor="middle" className="fill-foreground font-mono">
            T{i + 1}
          </text>
          <path d={`M${52 + i * 62} 75 V135`} strokeWidth="1.5" className="stroke-foreground-subtle" />
          <rect x={30 + i * 62} y="135" width="44" height="30" rx="6" className="fill-foreground" />
          <text x={52 + i * 62} y="154" fontSize="10" textAnchor="middle" className="fill-background font-mono">
            OS
          </text>
        </g>
      ))}
      <text x="20" y="195" fontSize="11" className="fill-foreground-muted font-mono">
        ~1 MB stack each · thousands max
      </text>

      <text x="340" y="22" fontSize="12" className="fill-foreground font-heading font-semibold">
        Virtual threads: many share a few carriers
      </text>
      {virtuals.map((i) => {
        const x = 352 + (i % 6) * 46;
        const y = i < 6 ? 50 : 88;
        const mounted = i === 1 || i === 8;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="11" strokeWidth="1.5" className={mounted ? "fill-accent stroke-accent" : "fill-surface stroke-accent"} />
            <text x={x} y={y + 4} fontSize="9" textAnchor="middle" className={mounted ? "fill-accent-foreground font-mono" : "fill-foreground-muted font-mono"}>
              v{i + 1}
            </text>
          </g>
        );
      })}
      <path d="M398 61 C400 110 420 120 430 135" fill="none" strokeWidth="1.5" className="stroke-accent" />
      <path d="M444 99 C470 115 520 120 540 135" fill="none" strokeWidth="1.5" className="stroke-accent" />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={390 + i * 120} y="135" width="100" height="30" rx="6" className="fill-foreground" />
          <text x={440 + i * 120} y="154" fontSize="10" textAnchor="middle" className="fill-background font-mono">
            carrier {i + 1}
          </text>
        </g>
      ))}
      <text x="340" y="195" fontSize="11" className="fill-foreground-muted font-mono">
        waiting on I/O? unmount, free the carrier
      </text>
      <text x="340" y="212" fontSize="11" className="fill-foreground-muted font-mono">
        millions are fine
      </text>
    </svg>
  );
}

const raceSteps = [
  { a: "reads count → 5", b: "", count: "5" },
  { a: "", b: "reads count → 5", count: "5" },
  { a: "writes 5 + 1", b: "", count: "6" },
  { a: "", b: "writes 5 + 1", count: "6 (should be 7)" },
];

function RaceCondition() {
  return (
    <Wide minWidth={460}>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7rem] gap-2 text-sm">
        {["Thread A", "Thread B", "count"].map((h) => (
          <span key={h} className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
            {h}
          </span>
        ))}
        {raceSteps.map((s, i) => (
          <div key={i} className="contents">
            <span className={cn("rounded-[6px] px-3 py-2 font-mono text-xs", s.a ? "border border-border bg-background text-foreground" : "")}>{s.a}</span>
            <span className={cn("rounded-[6px] px-3 py-2 font-mono text-xs", s.b ? "border border-border bg-background text-foreground" : "")}>{s.b}</span>
            <span
              className={cn(
                "self-center font-mono text-xs",
                i === raceSteps.length - 1 ? "text-accent-hover" : "text-foreground-muted",
              )}
            >
              {s.count}
            </span>
          </div>
        ))}
      </div>
    </Wide>
  );
}

function HeapGenerations() {
  return (
    <div>
      <div className="flex h-16 gap-1 overflow-hidden rounded-[8px] text-center font-mono text-xs">
        <div className="flex w-[34%] flex-col justify-center rounded-[4px] bg-accent text-accent-foreground">
          Eden
        </div>
        <div className="flex w-[8%] flex-col justify-center rounded-[4px] bg-accent/60 text-accent-foreground">S0</div>
        <div className="flex w-[8%] flex-col justify-center rounded-[4px] bg-accent/60 text-accent-foreground">S1</div>
        <div className="flex flex-1 flex-col justify-center rounded-[4px] bg-foreground/15 text-foreground">
          Old generation
        </div>
      </div>
      <div className="mt-2 flex text-center font-mono text-[0.7rem] text-foreground-subtle">
        <span className="w-[50%]">young generation — collected often, fast</span>
        <span className="flex-1">collected rarely</span>
      </div>
      <ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { t: "1 · Allocate", b: "new objects land in Eden. Allocation is just bumping a pointer — very cheap." },
          { t: "2 · Minor GC", b: "Most objects die young. Survivors are copied between S0 and S1; Eden is wiped." },
          { t: "3 · Promote", b: "Objects that survive enough collections move to the old generation." },
        ].map((s) => (
          <li key={s.t} className="rounded-[8px] border border-border bg-background p-4">
            <p className="font-heading font-semibold text-foreground">{s.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{s.b}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const javaDeepSections: GuideSection[] = [
  {
    id: "syntax",
    label: "Syntax essentials",
    title: "Variables, decisions, loops — the everyday grammar.",
    lead: "Java is statically typed: every variable has a type the compiler checks. Modern Java lets you skip writing it with var when the type is obvious.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Variables & control flow"
            code={`
var count = 0;                      // type inferred: int (locals only)
final int max = 10;                 // can't be reassigned

if (count < max) {
    count++;
} else if (count == max) {
    System.out.println("full");
} else {
    throw new IllegalStateException("over max");
}

for (int i = 0; i < 3; i++) { }     // counting loop
for (String name : names) { }       // for-each over any Iterable
while (queue.hasNext()) { }         // loop while a condition holds
`}
          />
          <Code
            title="Modern syntax"
            code={`
// switch expression: returns a value, no fall-through
String label = switch (count) {
    case 0 -> "none";
    case 1, 2, 3 -> "a few";
    default -> "many";
};

// text block: multi-line strings without escaping
String json = """
    { "name": "Ada", "role": "admin" }
    """;

// pattern matching for instanceof
if (shape instanceof Circle c) {
    System.out.println(c.radius());
}
`}
          />
        </div>
        <Figure title="Access modifiers: who can see what">
          <AccessMatrix />
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            Start with <C>private</C> and widen only when something outside
            genuinely needs it. The less that’s visible, the less can break
            when you change it.
          </p>
        </Figure>
      </>
    ),
  },
  {
    id: "strings",
    label: "Strings",
    title: "Strings are immutable — every “change” makes a new one.",
    lead: "That makes them safe to share between threads and to use as map keys, but it means building strings in a loop needs a StringBuilder.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6">
          <Figure title="The string pool">
            <div className="mx-auto max-w-[760px]">
              <Wide minWidth={520}>
                <StringPool />
              </Wide>
            </div>
          </Figure>
          <Code
            title="Why == lies about strings"
            code={`
String a = "hi";
String b = "hi";              // same pooled object as a
String c = new String("hi");  // forces a brand-new object

a == b        // true  — same reference
a == c        // false — different objects
a.equals(c)   // true  — same characters
`}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Common String methods"
            head={["Method", "Example → result"]}
            rows={[
              [<C key="c">length()</C>, '"hello".length() → 5'],
              [<C key="c">substring(a, b)</C>, '"hello".substring(1, 4) → "ell"'],
              [<C key="c">indexOf / contains</C>, '"hello".contains("ll") → true'],
              [<C key="c">split(regex)</C>, '"a,b,c".split(",") → [a, b, c]'],
              [<C key="c">strip() / isBlank()</C>, '"  hi ".strip() → "hi"'],
              [<C key="c">repeat(n)</C>, '"ab".repeat(3) → "ababab"'],
              [<C key="c">formatted(…)</C>, '"%s is %d".formatted("Ada", 36)'],
              [<C key="c">String.join</C>, 'String.join(", ", list) → "a, b"'],
            ]}
          />
          <Code
            title="Building strings"
            code={`
// Slow: a brand-new String on every iteration
String csv = "";
for (String name : names) csv += name + ",";

// Fast: one growable buffer
var sb = new StringBuilder();
for (String name : names) sb.append(name).append(',');
String result = sb.toString();

// Often the simplest of all
String joined = String.join(",", names);
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "exceptions",
    label: "Exceptions",
    title: "Checked, unchecked, and what never to catch.",
    lead: "An exception unwinds the call stack until something catches it. Java splits them into checked exceptions the compiler forces you to handle, and unchecked ones that usually mean a bug.",
    content: (
      <>
        <Figure title="The exception family tree">
          <ExceptionTree />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="try-with-resources, catch, finally"
            code={`
try (var reader = Files.newBufferedReader(Path.of("users.csv"))) {
    return reader.lines().map(User::parse).toList();
} catch (NoSuchFileException e) {
    return List.of();                        // expected: no file yet
} catch (IOException e) {
    throw new UncheckedIOException("Could not read users", e);
} finally {
    log.info("import finished");             // always runs
}
// the reader is closed automatically, even on an exception
`}
          />
          <Code
            title="Your own exception"
            code={`
public class OutOfStockException extends RuntimeException {
    public OutOfStockException(String sku) {
        super("Out of stock: " + sku);
    }
}

if (stock.get(sku) == 0) {
    throw new OutOfStockException(sku);
}
`}
          />
        </div>
        <DoDont
          items={[
            { dont: "catch (Exception e) { }", do: 'catch (IOException e) {\n    log.warn("Import failed", e);\n}', why: "An empty catch hides bugs forever. Catch the specific type and at least log it." },
            { dont: "e.printStackTrace();", do: 'log.error("Payment failed for order {}", id, e);', why: "Use a logger, with context, so the error reaches your logs." },
            { dont: "throw new RuntimeException(e.getMessage());", do: 'throw new RuntimeException("Could not save order " + id, e);', why: "Pass the cause along — otherwise the original stack trace is lost." },
          ]}
        />
      </>
    ),
  },
  {
    id: "generics",
    label: "Generics",
    title: "Write it once, type-safe for any type.",
    lead: "Generics let a class or method work with “some type T” while the compiler still checks that you never put a User into a List<String>.",
    content: (
      <>
        <Figure title="One template, many concrete types">
          <GenericBox />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Generic class and method"
            code={`
class Box<T> {
    private final T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

Box<String> name = new Box<>("Ada");   // <> infers String
String s = name.get();                 // no cast needed

// bounded type: T must be comparable to itself
static <T extends Comparable<T>> T max(List<T> items) {
    return Collections.max(items);
}
`}
          />
          <DataTable
            caption="Wildcards and PECS"
            head={["Write", "Accepts", "Use when you…"]}
            rows={[
              [<C key="c">List&lt;Number&gt;</C>, "Exactly List<Number>", "Read and write Numbers"],
              [<C key="c">List&lt;? extends Number&gt;</C>, "List<Integer>, List<Double>…", "Only read (Producer Extends)"],
              [<C key="c">List&lt;? super Integer&gt;</C>, "List<Integer>, List<Number>, List<Object>", "Only add Integers (Consumer Super)"],
            ]}
          />
        </div>
        <Callout title="Type erasure">
          Generic types exist only at compile time. At runtime a{" "}
          <C>List&lt;String&gt;</C> is just a <C>List</C> — which is why you
          can’t write <C>new T()</C> or check <C>instanceof List&lt;String&gt;</C>.
        </Callout>
      </>
    ),
  },
  {
    id: "lambdas-streams",
    label: "Lambdas & streams",
    title: "Streams are lazy: nothing runs until you ask for a result.",
    lead: "A stream pipeline describes what to do. Only the terminal operation (toList, findFirst, count…) pulls elements through — one at a time, stopping as soon as it can.",
    content: (
      <>
        <Figure title="Each element travels the whole pipeline before the next" note="lazy evaluation">
          <LazyStream />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Core functional interfaces"
            head={["Interface", "Shape", "Example"]}
            rows={[
              [<C key="c">Function&lt;T, R&gt;</C>, "T → R", "User::name"],
              [<C key="c">Predicate&lt;T&gt;</C>, "T → boolean", "u -> u.age() >= 18"],
              [<C key="c">Consumer&lt;T&gt;</C>, "T → nothing", "System.out::println"],
              [<C key="c">Supplier&lt;T&gt;</C>, "nothing → T", "ArrayList::new"],
              [<C key="c">BiFunction&lt;T, U, R&gt;</C>, "(T, U) → R", "(a, b) -> a + b"],
              [<C key="c">UnaryOperator&lt;T&gt;</C>, "T → T", "String::trim"],
            ]}
          />
          <Code
            title="Collectors"
            code={`
Map<String, List<User>> byCity = users.stream()
    .collect(Collectors.groupingBy(User::city));

Map<Boolean, Long> adultsVsMinors = users.stream()
    .collect(Collectors.partitioningBy(
        u -> u.age() >= 18, Collectors.counting()));

double averageAge = users.stream()
    .mapToInt(User::age)
    .average()
    .orElse(0);
`}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Optional instead of null"
            code={`
Optional<User> found = users.stream()
    .filter(u -> u.id() == id)
    .findFirst();

String name = found.map(User::name).orElse("unknown");
found.ifPresent(u -> log.info("found {}", u));
User user = found.orElseThrow();   // throws if empty
`}
          />
          <Callout tone="warn" title="Streams aren’t always better">
            A plain loop is fine — often clearer for complex logic with early
            exits or checked exceptions. And a stream can only be consumed
            once; calling a second terminal operation throws.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "modern-java",
    label: "Modern Java",
    title: "Java moves fast now: a new LTS every two years.",
    lead: "If you learned Java from an old tutorial, a lot has changed. Long-term-support releases are the ones most projects run.",
    content: (
      <>
        <Figure title="LTS releases and what they brought">
          <LtsTimeline />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Sealed types + pattern matching (21+)"
            code={`
sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}

static double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square s -> s.side() * s.side();
    };  // no default: the compiler knows every case
}
`}
          />
          <Code
            title="Compact source files (25)"
            code={`
// Main.java — no class declaration, no static, no String[] args
void main() {
    var name = IO.readln("Your name: ");
    IO.println("Hello, " + name);
}
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "concurrency",
    label: "Concurrency",
    title: "Threads share memory — and that’s where bugs hide.",
    lead: "Running work in parallel makes programs faster and more responsive, but two threads touching the same variable without coordination produce results that are wrong only sometimes.",
    content: (
      <>
        <Figure title="A race condition: two threads, one count++">
          <RaceCondition />
          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-foreground-muted">
            <C>count++</C> is really read, add, write. If both threads read
            before either writes, one increment is lost.
          </p>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Three ways to fix it"
            code={`
// 1. Lock around the critical section
synchronized (lock) { count++; }

// 2. An atomic variable
AtomicInteger count = new AtomicInteger();
count.incrementAndGet();

// 3. Don't share mutable state: give each task its own data
//    and combine the results at the end
`}
          />
          <DataTable
            caption="Concurrency toolbox"
            head={["Tool", "Use it for"]}
            rows={[
              [<C key="c">ExecutorService</C>, "Running tasks on a managed pool of threads"],
              [<C key="c">CompletableFuture</C>, "Chaining and combining async results"],
              [<C key="c">ConcurrentHashMap</C>, "A map many threads can update safely"],
              [<C key="c">AtomicInteger / AtomicLong</C>, "Lock-free counters"],
              [<C key="c">ReentrantLock</C>, "Locks with timeouts and fairness"],
              [<C key="c">Virtual threads</C>, "Thousands of blocking tasks (HTTP, DB) cheaply"],
            ]}
          />
        </div>
        <Figure title="Virtual threads (Java 21+)">
          <Wide minWidth={560}>
            <ThreadsDiagram />
          </Wide>
        </Figure>
        <Code
          title="One virtual thread per task"
          code={`
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10_000; i++) {
        int id = i;
        executor.submit(() -> fetchUser(id));   // blocking I/O is fine here
    }
}   // close() waits for every task to finish
`}
        />
      </>
    ),
  },
  {
    id: "garbage-collection",
    label: "Garbage collection",
    title: "You allocate; the JVM cleans up what nothing points to.",
    lead: "The garbage collector frees objects no longer reachable from your code. It’s built on one observation: most objects die young.",
    content: (
      <>
        <Figure title="A generational heap">
          <HeapGenerations />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Choosing a garbage collector"
            head={["Collector", "Trade-off", "Enable with"]}
            rows={[
              ["G1 (default)", "Balanced throughput and pauses", "— (default since Java 9)"],
              ["ZGC", "Pauses under a millisecond, uses more CPU", <C key="c">-XX:+UseZGC</C>],
              ["Parallel", "Max throughput, longer pauses — batch jobs", <C key="c">-XX:+UseParallelGC</C>],
              ["Serial", "Tiny heaps, single core, containers", <C key="c">-XX:+UseSerialGC</C>],
            ]}
          />
          <div className="space-y-6">
            <Code
              title="Sizing the heap"
              code={`
java -Xms512m -Xmx2g -jar app.jar     # start at 512 MB, cap at 2 GB
java -XX:+UseZGC -Xmx4g -jar app.jar
jcmd <pid> GC.heap_info               # inspect a running JVM
`}
            />
            <Callout tone="warn" title="Leaks still happen">
              GC only frees unreachable objects. Things you keep a reference to
              — a static map used as a cache, listeners you never remove — grow
              forever and end in <C>OutOfMemoryError</C>.
            </Callout>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "testing",
    label: "Testing with JUnit",
    title: "Arrange, act, assert — and let the build run it.",
    lead: "JUnit 5 is the standard test framework. Tests live in src/test/java, mirror your package structure, and run with mvn test or gradle test.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card eyebrow="1 · Arrange" title="Set the scene">
            Build the objects and inputs the test needs.
          </Card>
          <Card eyebrow="2 · Act" title="Do one thing" accent>
            Call the single method you’re testing.
          </Card>
          <Card eyebrow="3 · Assert" title="Check the result">
            Compare against what you expect. One behaviour per test.
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Code
            title="src/test/java/shop/CartTest.java"
            code={`
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class CartTest {

    @Test
    void totalAddsUpItemPrices() {
        // Arrange
        var cart = new Cart(List.of(new Item("tea", 2.5), new Item("cake", 4.0)));
        // Act
        double total = cart.total();
        // Assert
        assertEquals(6.5, total, 0.001);
    }

    @Test
    void negativePriceIsRejected() {
        assertThrows(IllegalArgumentException.class, () -> new Item("x", -1));
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "  "})
    void blankNamesAreInvalid(String name) {
        assertFalse(Item.isValidName(name));
    }
}
`}
          />
          <DataTable
            caption="Common JUnit annotations"
            head={["Annotation", "Purpose"]}
            rows={[
              [<C key="c">@Test</C>, "Marks a test method"],
              [<C key="c">@BeforeEach</C>, "Runs before every test — fresh setup"],
              [<C key="c">@AfterEach</C>, "Cleanup after every test"],
              [<C key="c">@ParameterizedTest</C>, "Same test, many inputs"],
              [<C key="c">@DisplayName</C>, "Readable name in reports"],
              [<C key="c">@Disabled</C>, "Skip, with a reason"],
              [<C key="c">@Nested</C>, "Group related tests in an inner class"],
            ]}
          />
        </div>
      </>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "Java words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "JDK", def: "Java Development Kit — compiler, tools and runtime. What you install." },
          { term: "JVM", def: "Java Virtual Machine — runs bytecode on a specific OS." },
          { term: "bytecode", def: "The platform-neutral instructions in .class files." },
          { term: "JIT", def: "Just-in-time compiler that turns hot bytecode into native machine code." },
          { term: "class", def: "A blueprint defining fields and methods." },
          { term: "object / instance", def: "A concrete value created from a class with new." },
          { term: "record", def: "A compact, immutable data carrier class." },
          { term: "interface", def: "A contract of methods that classes implement." },
          { term: "primitive", def: "One of eight built-in value types like int or boolean." },
          { term: "reference", def: "A variable that points at an object on the heap." },
          { term: "autoboxing", def: "Automatic conversion between int and Integer (and friends)." },
          { term: "checked exception", def: "An exception the compiler forces you to catch or declare." },
          { term: "generics", def: "Type parameters like List<T> for type-safe reusable code." },
          { term: "lambda", def: "A short anonymous function, like x -> x * 2." },
          { term: "stream", def: "A lazy pipeline of operations over a sequence of elements." },
          { term: "garbage collector", def: "The part of the JVM that frees unreachable objects." },
          { term: "classpath", def: "Where the JVM looks for classes and libraries." },
          { term: "JAR", def: "A zip file of compiled classes and resources." },
          { term: "Maven / Gradle", def: "Build tools that manage dependencies and build steps." },
          { term: "LTS", def: "Long-term support release, maintained for years." },
        ]}
      />
    ),
  },
];
