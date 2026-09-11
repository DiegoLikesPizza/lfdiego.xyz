import { Coffee } from "lucide-react";
import type { Guide } from "../types";
import {
  AnnotatedCode,
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Pipeline,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

function JdkNesting() {
  return (
    <div className="rounded-[8px] border border-accent/50 bg-accent-soft p-4">
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-heading font-semibold text-foreground">JDK</span>
        <span className="font-mono text-xs text-accent-hover">what you install</span>
      </p>
      <p className="mt-1 text-sm text-foreground-muted">
        Development tools: javac, jar, jshell, the debugger.
      </p>
      <div className="mt-4 rounded-[8px] border border-border bg-surface p-4">
        <p className="font-heading font-semibold text-foreground">JRE</p>
        <p className="mt-1 text-sm text-foreground-muted">
          The standard library — java.util, java.net, java.time…
        </p>
        <div className="mt-4 rounded-[8px] border border-border bg-background-secondary p-4">
          <p className="font-heading font-semibold text-foreground">JVM</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Loads bytecode, runs it, JIT-compiles hot code, collects garbage.
          </p>
        </div>
      </div>
    </div>
  );
}

const primitives = [
  { name: "byte", bits: 8, range: "−128 to 127" },
  { name: "short", bits: 16, range: "−32,768 to 32,767" },
  { name: "char", bits: 16, range: "one UTF-16 unit, like 'A'" },
  { name: "int", bits: 32, range: "about ±2.1 billion — the default", accent: true },
  { name: "float", bits: 32, range: "~7 significant digits" },
  { name: "long", bits: 64, range: "about ±9.2 × 10¹⁸" },
  { name: "double", bits: 64, range: "~15–16 digits — the default decimal", accent: true },
  { name: "boolean", bits: 1, range: "true / false (storage is up to the JVM)" },
];

function PrimitiveBars() {
  return (
    <ul className="space-y-3">
      {primitives.map((type) => (
        <li
          key={type.name}
          className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 md:grid-cols-[4.5rem_minmax(0,1fr)_17rem]"
        >
          <span className="font-mono text-sm text-foreground">{type.name}</span>
          <span className="flex items-center gap-3">
            <span
              className={cn("h-3 rounded-[3px]", type.accent ? "bg-accent" : "bg-chart-solo")}
              style={{ width: `${Math.max((type.bits / 64) * 100, 1.5)}%` }}
            />
            <span className="shrink-0 font-mono text-xs text-foreground-subtle">
              {type.bits} bit{type.bits === 1 ? "" : "s"}
            </span>
          </span>
          <span className="col-start-2 text-xs text-foreground-muted md:col-start-3 md:text-sm">
            {type.range}
          </span>
        </li>
      ))}
    </ul>
  );
}

function StackHeapDiagram() {
  const rows = [
    { y: 70, name: "int count", value: "3" },
    { y: 120, name: "User user", ref: true },
    { y: 170, name: "User same", ref: true },
  ];
  return (
    <svg
      viewBox="0 0 640 270"
      className="h-auto w-full"
      role="img"
      aria-label="Stack and heap: the stack frame for main holds count equal to 3 directly, and two references, user and same, which both point to the same User object on the heap. That object's name field points to the String Grace."
    >
      <defs>
        <marker id="java-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
        <marker id="java-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>

      <text x="30" y="30" fontSize="12" className="fill-foreground-subtle font-mono">
        STACK · main()
      </text>
      <rect x="30" y="42" width="240" height="210" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      {rows.map((row) => (
        <g key={row.name}>
          <rect x="45" y={row.y} width="210" height="36" rx="6" strokeWidth="1" className="fill-surface stroke-border" />
          <text x="58" y={row.y + 23} fontSize="12" className="fill-foreground font-mono">
            {row.name}
          </text>
          {row.ref ? (
            <circle cx="235" cy={row.y + 18} r="5" className="fill-accent" />
          ) : (
            <text x="238" y={row.y + 23} fontSize="13" textAnchor="end" className="fill-foreground font-mono font-semibold">
              {row.value}
            </text>
          )}
        </g>
      ))}

      <text x="370" y="30" fontSize="12" className="fill-foreground-subtle font-mono">
        HEAP
      </text>
      <rect x="370" y="42" width="240" height="210" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      <rect x="400" y="80" width="180" height="72" rx="6" strokeWidth="1.5" className="fill-surface stroke-accent" />
      <text x="490" y="103" fontSize="13" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        User
      </text>
      <path d="M400 114 H580" strokeWidth="1" className="stroke-border" />
      <text x="414" y="138" fontSize="12" className="fill-foreground-muted font-mono">
        name
      </text>
      <circle cx="560" cy="133" r="5" className="fill-foreground-subtle" />
      <rect x="430" y="195" width="150" height="40" rx="6" strokeWidth="1" className="fill-surface stroke-border" />
      <text x="505" y="220" fontSize="12" textAnchor="middle" className="fill-foreground font-mono">
        String &quot;Grace&quot;
      </text>

      <path d="M240 138 C320 138 320 108 394 108" fill="none" strokeWidth="2" markerEnd="url(#java-arrow)" className="stroke-accent" />
      <path d="M240 188 C330 188 330 132 394 132" fill="none" strokeWidth="2" markerEnd="url(#java-arrow)" className="stroke-accent" />
      <path d="M560 139 C560 165 530 170 520 189" fill="none" strokeWidth="1.5" markerEnd="url(#java-arrow-muted)" className="stroke-foreground-subtle" />
    </svg>
  );
}

function ShapeUml() {
  const classBox = (x: number, name: string, field: string) => (
    <g>
      <rect x={x} y="170" width="200" height="82" rx="6" strokeWidth="1.5" className="fill-surface stroke-border" />
      <text x={x + 100} y="194" fontSize="14" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        {name}
      </text>
      <path d={`M${x} 205 H${x + 200}`} strokeWidth="1" className="stroke-border" />
      <text x={x + 14} y="225" fontSize="11" className="fill-foreground-muted font-mono">
        {field}
      </text>
      <text x={x + 14} y="242" fontSize="11" className="fill-foreground-muted font-mono">
        + area(): double
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 262"
      className="h-auto w-full"
      role="img"
      aria-label="Class diagram: interface Shape declares area(). Records Circle, with a radius, and Rectangle, with width and height, both implement Shape."
    >
      <defs>
        <marker id="java-implements" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto">
          <path d="M1 1 L11 6 L1 11 z" strokeWidth="1.2" className="fill-surface stroke-foreground-subtle" />
        </marker>
      </defs>
      <rect x="220" y="14" width="200" height="86" rx="6" strokeWidth="1.5" className="fill-accent-soft stroke-accent" />
      <text x="320" y="36" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
        «interface»
      </text>
      <text x="320" y="56" fontSize="15" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        Shape
      </text>
      <path d="M220 67 H420" strokeWidth="1" className="stroke-accent" strokeOpacity="0.5" />
      <text x="320" y="88" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        + area(): double
      </text>

      {classBox(60, "Circle", "radius: double")}
      {classBox(380, "Rectangle", "w: double, h: double")}

      <path d="M160 170 L292 104" fill="none" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#java-implements)" className="stroke-foreground-subtle" />
      <path d="M480 170 L348 104" fill="none" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#java-implements)" className="stroke-foreground-subtle" />
      <text x="196" y="132" fontSize="11" textAnchor="end" className="fill-foreground-subtle font-mono">
        implements
      </text>
      <text x="444" y="132" fontSize="11" className="fill-foreground-subtle font-mono">
        implements
      </text>
    </svg>
  );
}

const collectionGroups = [
  {
    name: "List",
    rule: "Ordered, duplicates allowed, access by index.",
    impls: [
      { name: "ArrayList", use: "The default. Fast reads by index." },
      { name: "LinkedList", use: "Rarely faster in practice — prefer ArrayDeque for queues." },
    ],
  },
  {
    name: "Set",
    rule: "No duplicates.",
    impls: [
      { name: "HashSet", use: "Fastest; no order." },
      { name: "LinkedHashSet", use: "Keeps insertion order." },
      { name: "TreeSet", use: "Always sorted." },
    ],
  },
  {
    name: "Queue / Deque",
    rule: "Process items in order.",
    impls: [
      { name: "ArrayDeque", use: "Stack or queue — use it instead of Stack." },
      { name: "PriorityQueue", use: "Smallest (or highest-priority) first." },
    ],
  },
  {
    name: "Map",
    rule: "Key → value. Not a Collection, but part of the family.",
    impls: [
      { name: "HashMap", use: "The default lookup table." },
      { name: "LinkedHashMap", use: "Keeps insertion order." },
      { name: "TreeMap", use: "Keys always sorted." },
    ],
  },
];

export const javaGuide: Guide = {
  slug: "java",
  title: "Java",
  kicker: "Language",
  summary:
    "From source file to running program on the JVM, the anatomy of a class, primitives vs references, interfaces and polymorphism, collections, and build tools.",
  icon: Coffee,
  sections: [
    {
      id: "how-it-runs",
      label: "How Java runs",
      title: "Compile once to bytecode, run it on any JVM.",
      lead: "javac turns your source into platform-neutral bytecode. The JVM on each operating system runs that same bytecode — and compiles the hot parts to native code as it goes.",
      content: (
        <>
          <Figure title="From .java to a running program">
            <Pipeline
              nodes={[
                { title: "Hello.java", sub: "source you write" },
                { title: "Hello.class", sub: "bytecode, any platform" },
                { title: "JVM", sub: "interprets + JIT-compiles" },
                { title: "Your OS", sub: "Windows · macOS · Linux", accent: true },
              ]}
              links={[
                { forward: "javac" },
                { forward: "java Hello" },
                { forward: "machine code" },
              ]}
            />
          </Figure>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Code
                title="Hello.java"
                code={`
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, JVM");
    }
}
`}
              />
              <Code
                title="Terminal"
                code={`
javac Hello.java   # → Hello.class
java Hello         # run it on the JVM
java Hello.java    # or compile + run a single file in one step
`}
              />
            </div>
            <Figure title="JDK, JRE, JVM" note="nested">
              <JdkNesting />
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Install a JDK — a current LTS release such as 21 or 25 (for
                example Eclipse Temurin). It includes everything inside it.
              </p>
            </Figure>
          </div>
        </>
      ),
    },
    {
      id: "class-anatomy",
      label: "Anatomy of a class",
      title: "Everything in Java lives inside a type.",
      lead: "A small shopping cart, labelled part by part.",
      content: (
        <AnnotatedCode
          title="Cart.java"
          lines={[
            ["package shop;", 1],
            ["import java.util.List;"],
            [""],
            ["public class Cart {", 2],
            ["    private final List<Item> items;", 3],
            [""],
            ["    public Cart(List<Item> items) {", 4],
            ["        this.items = items;"],
            ["    }"],
            [""],
            ["    public double total() {", 5],
            ["        double sum = 0;"],
            ["        for (Item item : items) {"],
            ["            sum += item.price();"],
            ["        }"],
            ["        return sum;"],
            ["    }"],
            ["}"],
            [""],
            ["record Item(String name, double price) {}", 6],
          ]}
          notes={[
            { title: "Package & imports", body: "The package matches the folder (shop/). Imports pull in types from other packages." },
            { title: "Class declaration", body: "public means any code can use it. One public class per file, named like the file." },
            { title: "Field", body: "private hides it from outside code; final means it’s assigned once." },
            { title: "Constructor", body: "Runs on new Cart(…). Same name as the class, no return type." },
            { title: "Method", body: "Declares its return type (double). Instance methods can read the object’s fields." },
            { title: "Record", body: "A compact, immutable data class: constructor, getters, equals, hashCode and toString for free." },
          ]}
        />
      ),
    },
    {
      id: "types-memory",
      label: "Types & memory",
      title: "Primitives hold values. Everything else holds a reference.",
      lead: "Eight primitive types live directly in variables. Objects live on the heap, and variables only point at them — which explains most “why did that change too?” moments.",
      content: (
        <>
          <Figure title="The eight primitives, to scale" note="bar = size in bits">
            <PrimitiveBars />
          </Figure>
          <Figure title="Stack vs heap">
            <div className="mx-auto max-w-[760px]">
              <Wide minWidth={520}>
                <StackHeapDiagram />
              </Wide>
            </div>
          </Figure>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Code
              title="References in action"
              code={`
int count = 3;                // the value itself
User user = new User("Ada");  // reference → heap object
User same = user;             // copies the reference only
same.setName("Grace");
user.getName();               // "Grace" — same object
`}
            />
            <Callout tone="warn" title="Compare strings with .equals()">
              <C>==</C> on objects asks “same object?”, not “same content?”.
              Use <C>a.equals(b)</C> — or <C>Objects.equals(a, b)</C> when
              either side might be null.
            </Callout>
          </div>
        </>
      ),
    },
    {
      id: "oop",
      label: "OOP",
      title: "Interfaces describe what. Classes decide how.",
      lead: "Code against the interface, and any implementation can be swapped in. That’s polymorphism — and most of what object-oriented design is about.",
      content: (
        <>
          <Figure title="One interface, two implementations">
            <div className="mx-auto max-w-[720px]">
              <Wide minWidth={480}>
                <ShapeUml />
              </Wide>
            </div>
          </Figure>
          <Code
              title="Shapes.java"
              code={`
interface Shape {
    double area();
}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

List<Shape> shapes = List.of(new Circle(1), new Rectangle(2, 3));
for (Shape s : shapes) {
    System.out.println(s.area());  // each shape answers its own way
}
`}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card eyebrow="Pillar 1" title="Encapsulation">Keep fields private; expose behaviour through methods.</Card>
            <Card eyebrow="Pillar 2" title="Abstraction">Interfaces hide how something works behind what it does.</Card>
            <Card eyebrow="Pillar 3" title="Inheritance">extends reuses a class; prefer composition when unsure.</Card>
            <Card eyebrow="Pillar 4" title="Polymorphism">One call, s.area(), many behaviours.</Card>
          </div>
        </>
      ),
    },
    {
      id: "collections",
      label: "Collections",
      title: "Pick a collection by the question you’ll ask it.",
      lead: "“In what order?”, “Is it in there?”, “What’s next?” or “What belongs to this key?” — each has a natural home.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {collectionGroups.map((group) => (
              <div key={group.name} className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface p-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent-hover">interface</p>
                <p className="mt-1 font-heading text-lg font-semibold text-foreground">{group.name}</p>
                <p className="mt-1 text-sm text-foreground-muted">{group.rule}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4">
                  {group.impls.map((impl) => (
                    <li key={impl.name}>
                      <p className="font-mono text-sm text-foreground">{impl.name}</p>
                      <p className="text-xs leading-relaxed text-foreground-muted">{impl.use}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Code
            title="Streams: describe the result, not the loop"
            code={`
List<String> adults = users.stream()
    .filter(u -> u.age() >= 18)
    .map(User::name)
    .sorted()
    .toList();
`}
          />
        </>
      ),
    },
    {
      id: "build-tools",
      label: "Build tools",
      title: "Maven or Gradle: dependencies, builds and tests in one command.",
      content: (
        <>
          <DataTable
            caption="Maven compared with Gradle"
            head={["", "Maven", "Gradle"]}
            rows={[
              ["Config file", "pom.xml (XML)", "build.gradle.kts (Kotlin DSL)"],
              ["Style", "Convention, fixed lifecycle", "Flexible, scriptable tasks"],
              ["Speed", "Good", "Faster on big projects (build cache)"],
              ["Common in", "Enterprise Java, Spring", "Android, Kotlin, newer projects"],
            ]}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Code
              title="Build with the wrapper"
              code={`
./mvnw clean package   # Maven  → target/*.jar
./gradlew build        # Gradle → build/libs/*.jar
`}
            />
            <Callout title="Commit the wrapper">
              <C>mvnw</C> and <C>gradlew</C> download the exact tool version the
              project needs, so everyone — including CI — builds the same way.
            </Callout>
          </div>
        </>
      ),
    },
  ],
};
