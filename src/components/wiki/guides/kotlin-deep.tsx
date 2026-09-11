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

function ExtensionVisual() {
  return (
    <div className="rounded-[8px] border border-border bg-background p-4">
      <p className="font-mono text-sm text-foreground">class String</p>
      <p className="mt-1 text-xs text-foreground-muted">from the standard library — you can’t edit it</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["length", "uppercase()", "split()", "trim()"].map((m) => (
          <Chip key={m}>{m}</Chip>
        ))}
        <span className="inline-flex items-center rounded-full border-2 border-dashed border-accent px-2.5 py-1 font-mono text-xs text-accent-hover">
          + initials() ← yours
        </span>
      </div>
    </div>
  );
}

const classKinds = [
  { kind: "class", use: "Regular class. Final by default — can’t be extended." },
  { kind: "open class", use: "Explicitly allows subclasses." },
  { kind: "abstract class", use: "Can’t be instantiated; subclasses fill in the gaps." },
  { kind: "data class", use: "Holds data: equals, hashCode, toString, copy, componentN.", accent: true },
  { kind: "sealed class / interface", use: "A closed set of subtypes known at compile time.", accent: true },
  { kind: "enum class", use: "A fixed list of constants, each can have properties." },
  { kind: "object", use: "A singleton — exactly one instance, created lazily." },
  { kind: "companion object", use: "Class-level members, like Java’s static." },
  { kind: "value class", use: "Wraps one value with type safety and no runtime overhead." },
];

function SealedTree() {
  return (
    <div className="text-sm">
      <div className="inline-block rounded-[8px] border border-accent/50 bg-accent-soft px-4 py-2 font-mono text-accent-hover">
        sealed interface UiState
      </div>
      <div className="ml-5 mt-2 grid grid-cols-1 gap-2 border-l border-border pl-5 sm:grid-cols-3">
        {[
          { name: "data object Loading", note: "no data" },
          { name: "data class Success", note: "val items: List<Item>" },
          { name: "data class Error", note: "val message: String" },
        ].map((s) => (
          <div key={s.name} className="rounded-[8px] border border-border bg-background p-3">
            <p className="font-mono text-xs text-foreground">{s.name}</p>
            <p className="mt-1 font-mono text-[0.7rem] text-foreground-muted">{s.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-foreground-muted">
        The compiler knows these are the only three — a when over UiState needs no else branch.
      </p>
    </div>
  );
}

const ranges = [
  { expr: "1..5", includes: [1, 2, 3, 4, 5] },
  { expr: "1..<5", includes: [1, 2, 3, 4] },
  { expr: "0..10 step 3", includes: [0, 3, 6, 9] },
  { expr: "10 downTo 4 step 2", includes: [10, 8, 6, 4] },
];

function RangesVisual() {
  const numbers = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Wide minWidth={520}>
      <div className="space-y-2.5">
        {ranges.map((r) => (
          <div key={r.expr} className="grid grid-cols-[9rem_minmax(0,1fr)] items-center gap-3">
            <span className="font-mono text-sm text-foreground">{r.expr}</span>
            <div className="flex gap-1">
              {numbers.map((n) => (
                <span
                  key={n}
                  className={cn(
                    "flex h-7 flex-1 items-center justify-center rounded-[4px] border font-mono text-[0.7rem]",
                    r.includes.includes(n)
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-dashed border-border text-foreground-subtle",
                  )}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Wide>
  );
}

function EagerVsLazy() {
  const eager = ["map 1", "map 2", "map 3", "map 4", "filter 2", "filter 4", "filter 6", "filter 8", "first → 6"];
  const lazy = ["map 1", "filter 2 ✗", "map 2", "filter 4 ✗", "map 3", "filter 6 ✓", "first → 6"];
  const row = (title: string, sub: string, steps: string[], accent = false) => (
    <div>
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-heading font-semibold text-foreground">{title}</span>
        <span className={cn("font-mono text-xs", accent ? "text-accent-hover" : "text-foreground-subtle")}>{sub}</span>
      </p>
      <ol className="mt-2 flex flex-wrap gap-1.5">
        {steps.map((s, i) => (
          <li key={i}>
            <Chip tone={i === steps.length - 1 ? "solid" : accent ? "accent" : "neutral"}>{s}</Chip>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <div className="space-y-5">
      <p className="font-mono text-xs text-foreground-muted">
        {"listOf(1, 2, 3, 4).map { it * 2 }.filter { it > 5 }.first()"}
      </p>
      {row("List (eager)", "9 operations", eager)}
      {row("asSequence() (lazy)", "7 operations — stops at the first match", lazy, true)}
    </div>
  );
}

function FlowTimeline() {
  const lane = (y: number, label: string, values: string[], accent = false) => (
    <g>
      <text x="20" y={y + 4} fontSize="11" className="fill-foreground-subtle font-mono">
        {label}
      </text>
      <path d={`M150 ${y} H610`} strokeWidth="1.5" className="stroke-border" />
      {values.map((v, i) =>
        v ? (
          <g key={i}>
            <circle cx={190 + i * 100} cy={y} r="14" strokeWidth="1.5" className={accent ? "fill-accent stroke-accent" : "fill-surface stroke-accent"} />
            <text x={190 + i * 100} y={y + 4} fontSize="10" textAnchor="middle" className={accent ? "fill-accent-foreground font-mono" : "fill-foreground font-mono"}>
              {v}
            </text>
          </g>
        ) : null,
      )}
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 200"
      className="h-auto w-full"
      role="img"
      aria-label="Flow over time: the emitter produces 0, 1, 2, 3, 4 once per second. filter keeps even numbers 0, 2 and 4. map turns them into tick 0, tick 2, tick 4, which the collector receives."
    >
      {lane(40, "flow { emit }", ["0", "1", "2", "3", "4"])}
      {lane(95, "filter { even }", ["0", "", "2", "", "4"])}
      {lane(150, "collect", ["t0", "", "t2", "", "t4"], true)}
      <path d="M150 185 H610" strokeWidth="1" className="stroke-border" />
      <text x="610" y="198" fontSize="10" textAnchor="end" className="fill-foreground-subtle font-mono">
        time → (1 s per tick)
      </text>
    </svg>
  );
}

function ScopeTree() {
  return (
    <div className="text-sm">
      <div className="inline-block rounded-[8px] border border-border bg-background px-4 py-2 font-mono text-foreground">
        viewModelScope
      </div>
      <div className="ml-5 mt-2 border-l border-border pl-5">
        <div className="rounded-[8px] border border-border bg-background p-3">
          <p className="font-mono text-xs text-foreground">launch {"{ loadDashboard() }"}</p>
          <div className="ml-3 mt-2 grid grid-cols-1 gap-2 border-l border-border pl-4 sm:grid-cols-2">
            <div className="rounded-[6px] border border-border bg-surface p-2.5">
              <p className="font-mono text-xs text-foreground">async {"{ api.user() }"}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-foreground-muted">cancelled ↩</p>
            </div>
            <div className="rounded-[6px] border border-accent/50 bg-accent-soft p-2.5">
              <p className="font-mono text-xs text-accent-hover">async {"{ api.orders() }"}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-accent-hover">throws ✗</p>
            </div>
          </div>
        </div>
      </div>
      <ol className="mt-4 space-y-1 text-xs leading-relaxed text-foreground-muted">
        <li>1 · orders() fails → its parent launch is cancelled.</li>
        <li>2 · The parent cancels its other children, so user() stops too.</li>
        <li>3 · The error reaches the scope’s handler — nothing leaks or runs on forever.</li>
      </ol>
    </div>
  );
}

export const kotlinDeepSections: GuideSection[] = [
  {
    id: "functions",
    label: "Functions",
    title: "Functions are short, flexible and first-class.",
    lead: "Default and named arguments replace most overloads. Lambdas and trailing-lambda syntax make APIs read like a language of their own. Extension functions add methods to classes you don’t own.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Parameters and lambdas"
            code={`
fun connect(host: String, port: Int = 443, secure: Boolean = true) { }

connect("example.com")                         // defaults fill in
connect("localhost", secure = false)           // named: skip port

fun sum(vararg numbers: Int) = numbers.sum()
sum(1, 2, 3)                                   // 6

// higher-order function: takes a function as a parameter
fun repeatTimes(times: Int, action: (Int) -> Unit) {
    for (i in 0 until times) action(i)
}

repeatTimes(3) { i -> println("round $i") }    // trailing lambda
val double: (Int) -> Int = { it * 2 }          // 'it' = single parameter
listOf(1, 2, 3).map(double)                    // [2, 4, 6]
`}
          />
          <div className="space-y-6">
            <Figure title="Extension functions">
              <ExtensionVisual />
            </Figure>
            <Code
              title="Adding to a class you don’t own"
              code={`
fun String.initials(): String =
    split(" ")
        .filter { it.isNotBlank() }
        .joinToString("") { it.first().uppercase() }

"Ada Lovelace".initials()   // "AL"
`}
            />
          </div>
        </div>
        <Callout title="Extensions don’t really change the class">
          They compile to static functions that take the object as the first
          parameter, so they can’t access private members and aren’t
          overridden by subclasses. They only exist where they’re imported.
        </Callout>
      </>
    ),
  },
  {
    id: "expressions",
    label: "Expressions & ranges",
    title: "if, when and try all return values.",
    lead: "In Kotlin most control flow is an expression, so you assign its result instead of declaring a variable and filling it in later. Ranges make loops and checks read naturally.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6">
          <Code
            title="Expressions"
            code={`
val max = if (a > b) a else b

val size = when (count) {
    0 -> "empty"
    in 1..9 -> "small"
    in 10..99 -> "medium"
    else -> "large"
}

val description = when (value) {
    is String -> "text of length \${value.length}"   // smart cast
    is Int -> "number"
    null -> "nothing"
    else -> "something else"
}

val port = try { input.toInt() } catch (e: NumberFormatException) { 8080 }
`}
          />
          <Figure title="Ranges, visualised">
            <RangesVisual />
          </Figure>
        </div>
        <Code
          title="Loops with ranges"
          code={`
for (i in 1..3) print(i)              // 123
for (i in 0..<list.size) { }          // up to, not including
for ((index, item) in list.withIndex()) println("$index: $item")
if (age in 13..19) println("teenager")
repeat(3) { println("hi") }
`}
        />
      </>
    ),
  },
  {
    id: "classes",
    label: "Classes & objects",
    title: "Nine kinds of class, each with a clear job.",
    lead: "Kotlin classes are final by default and properties replace fields plus getters and setters. Pick the kind of class that says what you mean.",
    content: (
      <>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {classKinds.map((k) => (
            <li
              key={k.kind}
              className={cn(
                "rounded-[var(--radius)] border p-4",
                k.accent ? "border-accent/45 bg-accent-soft" : "border-border bg-surface",
              )}
            >
              <p className={cn("font-mono text-sm", k.accent ? "text-accent-hover" : "text-foreground")}>{k.kind}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{k.use}</p>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Figure title="Sealed types model states">
            <SealedTree />
          </Figure>
          <Code
            title="Exhaustive when over a sealed type"
            code={`
sealed interface UiState {
    data object Loading : UiState
    data class Success(val items: List<Item>) : UiState
    data class Error(val message: String) : UiState
}

fun render(state: UiState) = when (state) {
    UiState.Loading -> showSpinner()
    is UiState.Success -> showList(state.items)   // smart cast
    is UiState.Error -> showError(state.message)
}   // add a 4th state and this stops compiling — on purpose
`}
          />
        </div>
        <Code
          title="Properties, init, companion and object"
          code={`
class Account(val owner: String, initialBalance: Double = 0.0) {
    var balance = initialBalance
        private set                       // readable outside, writable only inside

    init {
        require(initialBalance >= 0) { "balance can't be negative" }
    }

    val isEmpty: Boolean get() = balance == 0.0   // computed property

    companion object {
        fun demo() = Account("demo", 100.0)       // Account.demo()
    }
}

object Config {                                   // singleton
    val apiUrl = "https://api.example.com"
}

@JvmInline
value class Email(val value: String)              // type-safe, zero overhead
`}
        />
      </>
    ),
  },
  {
    id: "collection-operations",
    label: "Collection operations",
    title: "A standard library that does the loop for you.",
    lead: "Kotlin collections come with dozens of operations. Lists are eager — each step builds a whole new list. Sequences are lazy, like Java streams.",
    content: (
      <>
        <Figure title="Eager lists vs lazy sequences">
          <EagerVsLazy />
        </Figure>
        <DataTable
          caption="Collection operations with examples"
          head={["Operation", "Example", "Result"]}
          rows={[
            [<C key="c">map</C>, "listOf(1, 2, 3).map { it * 10 }", "[10, 20, 30]"],
            [<C key="c">filter</C>, "listOf(1, 2, 3, 4).filter { it % 2 == 0 }", "[2, 4]"],
            [<C key="c">flatMap</C>, 'listOf("a b", "c").flatMap { it.split(" ") }', "[a, b, c]"],
            [<C key="c">groupBy</C>, "words.groupBy { it.first() }", "{a=[apple, avocado], b=[banana]}"],
            [<C key="c">associateBy</C>, "users.associateBy { it.id }", "{1=User(1), 2=User(2)}"],
            [<C key="c">partition</C>, "nums.partition { it > 0 }", "Pair(positives, rest)"],
            [<C key="c">zip</C>, 'listOf(1, 2).zip(listOf("a", "b"))', "[(1, a), (2, b)]"],
            [<C key="c">chunked</C>, "(1..5).toList().chunked(2)", "[[1, 2], [3, 4], [5]]"],
            [<C key="c">windowed</C>, "(1..4).toList().windowed(2)", "[[1, 2], [2, 3], [3, 4]]"],
            [<C key="c">fold</C>, "nums.fold(0) { acc, n -> acc + n }", "the sum"],
            [<C key="c">sumOf / maxByOrNull</C>, "orders.sumOf { it.total }", "one number"],
          ]}
        />
        <Callout title="When to use a sequence">
          For small lists, plain list operations are simplest and fast. Switch
          to <C>asSequence()</C> for long chains over large collections, when
          you stop early (<C>first</C>, <C>take</C>), or for infinite
          generators with <C>generateSequence</C>.
        </Callout>
      </>
    ),
  },
  {
    id: "idioms",
    label: "Idiomatic Kotlin",
    title: "Java habits, and their Kotlin replacements.",
    lead: "Kotlin compiles Java-style code just fine — but these idioms are shorter, safer and what other Kotlin developers expect to read.",
    content: (
      <DoDont
        items={[
          { dont: "if (user != null) {\n    user.save()\n}", do: "user?.save()" },
          { dont: 'val name = if (input != null) input else "guest"', do: 'val name = input ?: "guest"' },
          { dont: '"Hello, " + user.name + "!"', do: '"Hello, ${user.name}!"' },
          { dont: 'if (age < 0) throw IllegalArgumentException("bad age")', do: 'require(age >= 0) { "bad age: $age" }', why: "require throws IllegalArgumentException; check throws IllegalStateException." },
          { dont: "val list = ArrayList<String>()\nlist.add(\"a\")\nlist.add(\"b\")", do: 'val list = buildList {\n    add("a")\n    add("b")\n}' },
          { dont: "val reader = file.bufferedReader()\ntry { ... } finally { reader.close() }", do: "file.bufferedReader().use { reader -> ... }", why: "use closes the resource even if the block throws." },
          { dont: "val first = pair.first\nval second = pair.second", do: "val (first, second) = pair" },
          { dont: "fun isAdult(age: Int): Boolean {\n    return age >= 18\n}", do: "fun isAdult(age: Int) = age >= 18" },
        ]}
      />
    ),
  },
  {
    id: "structured-concurrency",
    label: "Structured concurrency",
    title: "Coroutines live in scopes, and scopes clean up after them.",
    lead: "Every coroutine has a parent. A parent waits for its children, cancelling the parent cancels the children, and a failing child cancels its siblings. Nothing is left running by accident.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Figure title="What happens when one child fails">
            <ScopeTree />
          </Figure>
          <div className="space-y-6">
            <DataTable
              caption="launch compared with async"
              head={["", "launch", "async"]}
              rows={[
                ["Returns", "Job", "Deferred<T>"],
                ["Get the result", "— (fire and forget)", "await()"],
                ["Use for", "Side effects: save, log, update UI", "Values you need back"],
              ]}
            />
            <DataTable
              caption="Coroutine dispatchers"
              head={["Dispatcher", "Runs on", "Use for"]}
              rows={[
                [<C key="c">Dispatchers.Main</C>, "The UI thread", "Updating views (Android, desktop)"],
                [<C key="c">Dispatchers.IO</C>, "A large shared pool", "Blocking I/O: files, JDBC, legacy APIs"],
                [<C key="c">Dispatchers.Default</C>, "One thread per CPU core", "CPU-heavy work: parsing, sorting"],
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Switching threads with withContext"
            code={`
suspend fun loadConfig(): Config = withContext(Dispatchers.IO) {
    val text = File("config.json").readText()   // blocking — fine on IO
    parseConfig(text)
}

viewModelScope.launch {
    val config = loadConfig()      // suspends; the UI thread stays free
    title.value = config.appName   // back on Main automatically
}
`}
          />
          <Callout tone="warn" title="Cancellation is cooperative">
            Cancelling only stops a coroutine at a suspension point. Long CPU
            loops should call <C>ensureActive()</C> or <C>yield()</C>. And don’t
            swallow <C>CancellationException</C> in a broad{" "}
            <C>catch (e: Exception)</C> — rethrow it.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "flow",
    label: "Flow",
    title: "Flow is a stream of values over time.",
    lead: "Where a suspend function returns one value, a Flow emits many — sensor readings, search results as you type, database updates. Operators transform the stream; collect starts it.",
    content: (
      <>
        <Figure title="Values flowing through operators">
          <Wide minWidth={560}>
            <FlowTimeline />
          </Wide>
        </Figure>
        <div className="grid grid-cols-1 gap-6">
          <Code
            title="Building and collecting a Flow"
            code={`
fun ticker(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(1_000)
    }
}

ticker()
    .filter { it % 2 == 0 }
    .map { "tick $it" }
    .take(3)
    .collect { println(it) }     // tick 0, tick 2, tick 4

// search-as-you-type
queryFlow
    .debounce(300)
    .distinctUntilChanged()
    .flatMapLatest { query -> api.search(query) }
`}
          />
          <DataTable
            caption="Flow, StateFlow and SharedFlow compared"
            head={["", "Flow", "StateFlow", "SharedFlow"]}
            rows={[
              ["Hot or cold", "Cold — runs per collector", "Hot", "Hot"],
              ["Has a current value", "No", "Yes, always", "Optional replay"],
              ["Repeats equal values", "Yes", "No — conflated", "Yes"],
              ["Typical use", "One-off data pipelines", "UI state", "One-time events"],
            ]}
          />
        </div>
      </>
    ),
  },
  {
    id: "interop",
    label: "Java interop & Gradle",
    title: "Living alongside Java, and building with Gradle.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card title="Platform types: String!">
              Kotlin can’t know whether a Java method returns null, so it shows
              the type as <C>String!</C> — “maybe nullable”. Decide at the
              boundary: assign it to <C>String?</C> to stay safe, or{" "}
              <C>String</C> if you’re sure. Java’s <C>@Nullable</C> and{" "}
              <C>@NonNull</C> annotations remove the guesswork.
            </Card>
            <DataTable
              caption="Annotations for calling Kotlin from Java"
              head={["Annotation", "Effect in Java"]}
              rows={[
                [<C key="c">@JvmStatic</C>, "Companion member becomes a real static method"],
                [<C key="c">@JvmOverloads</C>, "Generates overloads for default parameters"],
                [<C key="c">@JvmField</C>, "Expose a property as a public field"],
                [<C key="c">@Throws(IOException::class)</C>, "Declares checked exceptions for Java callers"],
                [<C key="c">@JvmName(&quot;…&quot;)</C>, "Change the generated method or file class name"],
              ]}
            />
          </div>
          <Code
            title="build.gradle.kts"
            code={`
plugins {
    kotlin("jvm") version "2.2.0"     // use the latest stable version
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
    testImplementation(kotlin("test"))
}

kotlin {
    jvmToolchain(21)                  // compile and run with JDK 21
}

application {
    mainClass = "MainKt"              // top-level main() in Main.kt
}
`}
          />
        </div>
        <Callout title="Kotlin Multiplatform">
          Share business logic — networking, models, validation — between
          Android, iOS, desktop and web, while keeping native UI on each
          platform (or sharing UI too with Compose Multiplatform).
        </Callout>
      </>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "Kotlin words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "val / var", def: "Read-only and mutable variable declarations." },
          { term: "nullable type", def: "A type ending in ?, like String?, that may hold null." },
          { term: "safe call ?.", def: "Call only if the value isn’t null; otherwise the result is null." },
          { term: "Elvis ?:", def: "Use the left side, or the right side if the left is null." },
          { term: "smart cast", def: "The compiler treating a value as a narrower type after a check." },
          { term: "data class", def: "A class for holding data, with generated equals, hashCode, toString and copy." },
          { term: "sealed class", def: "A class with a closed, known set of subclasses." },
          { term: "object", def: "A singleton declaration." },
          { term: "companion object", def: "Members tied to a class rather than an instance." },
          { term: "extension function", def: "A function that looks like a method on an existing type." },
          { term: "lambda", def: "An anonymous function literal, like { x -> x * 2 }." },
          { term: "it", def: "The implicit name of a lambda’s single parameter." },
          { term: "scope function", def: "let, run, with, apply or also — run a block on an object." },
          { term: "coroutine", def: "A lightweight, suspendable unit of concurrent work." },
          { term: "suspend", def: "Marks a function that can pause without blocking its thread." },
          { term: "CoroutineScope", def: "The owner of coroutines, controlling their lifetime." },
          { term: "dispatcher", def: "Decides which thread or pool a coroutine runs on." },
          { term: "Flow", def: "A cold asynchronous stream of values." },
          { term: "StateFlow", def: "A hot flow that always holds a current value." },
          { term: "KMP", def: "Kotlin Multiplatform — sharing code across platforms." },
        ]}
      />
    ),
  },
];
