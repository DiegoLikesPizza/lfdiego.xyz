import { Bot, MessageSquare, Sparkles } from "lucide-react";
import type { GuideSection } from "../types";
import {
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Glossary,
  Keys,
  Marker,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

function CodeMap() {
  const box = (x: number, y: number, w: number, kind: string, name: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height="50" rx="8" strokeWidth="1.5" className={accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"} />
      <text x={x + 12} y={y + 19} fontSize="10" className="fill-foreground-subtle font-mono">
        {kind}
      </text>
      <text x={x + 12} y={y + 37} fontSize="12" className="fill-foreground font-mono">
        {name}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 230"
      className="h-auto w-full"
      role="img"
      aria-label="Navigating code: CheckoutController.pay calls PaymentService.charge. Go to declaration jumps from the call to the interface. Find usages goes back to the callers. Go to implementation jumps from the interface to StripePayment and FakePayment."
    >
      <defs>
        <marker id="ide-nav-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
        <marker id="ide-nav-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>
      {box(10, 90, 190, "caller", "CheckoutController.pay()")}
      {box(250, 90, 170, "interface", "PaymentService.charge()", true)}
      {box(470, 30, 160, "implementation", "StripePayment.charge()")}
      {box(470, 150, 160, "implementation", "FakePayment.charge()")}

      <path d="M200 105 H244" strokeWidth="1.8" markerEnd="url(#ide-nav-arrow)" className="stroke-accent" />
      <text x="222" y="80" fontSize="10" textAnchor="middle" className="fill-accent-hover font-mono">
        declaration
      </text>
      <path d="M250 128 H206" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ide-nav-muted)" className="stroke-foreground-subtle" />
      <text x="228" y="156" fontSize="10" textAnchor="middle" className="fill-foreground-muted font-mono">
        usages
      </text>
      <path d="M420 105 C445 105 440 55 464 55" fill="none" strokeWidth="1.8" markerEnd="url(#ide-nav-arrow)" className="stroke-accent" />
      <path d="M420 125 C445 125 440 175 464 175" fill="none" strokeWidth="1.8" markerEnd="url(#ide-nav-arrow)" className="stroke-accent" />
      <text x="445" y="118" fontSize="10" className="fill-accent-hover font-mono">
        impl
      </text>
    </svg>
  );
}

function MultiCursor() {
  const lines = [
    { before: "const ", word: "userName", after: " = form.get(\"name\");" },
    { before: "validate(", word: "userName", after: ");" },
    { before: "save({ name: ", word: "userName", after: " });" },
  ];
  return (
    <pre className="overflow-x-auto rounded-[8px] border border-border bg-background py-3 font-mono text-[0.78rem] leading-loose text-foreground">
      <code className="block min-w-max">
        {lines.map((l, i) => (
          <span key={i} className="block px-4">
            {l.before}
            <span className="rounded-[3px] bg-accent-soft text-accent-hover outline outline-1 outline-accent/60">{l.word}</span>
            <span className="ml-px inline-block h-4 w-0.5 translate-y-0.5 bg-accent align-baseline" />
            {l.after}
          </span>
        ))}
      </code>
    </pre>
  );
}

function ExtendSelection() {
  const levels = [
    { label: "price", tone: 1 },
    { label: "item.price", tone: 2 },
    { label: "item.price * qty", tone: 3 },
    { label: "total += item.price * qty", tone: 4 },
  ];
  return (
    <ol className="space-y-2">
      {levels.map((level, i) => (
        <li key={level.label} className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3">
          <span className="font-mono text-xs text-foreground-subtle">press {i + 1}×</span>
          <span className="overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground-muted">
            {"total += item.price * qty".split(level.label).map((part, j, arr) => (
              <span key={j}>
                {part}
                {j < arr.length - 1 && (
                  <span className={cn("rounded-[3px] px-0.5 text-foreground", level.tone === 4 ? "bg-accent text-accent-foreground" : "bg-accent-soft outline outline-1 outline-accent/50")}>
                    {level.label}
                  </span>
                )}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ol>
  );
}

const breakpointTypes = [
  { title: "Line breakpoint", body: "Pause every time this line runs." },
  { title: "Conditional", body: "Pause only when an expression is true, e.g. order.id == 1042." },
  { title: "Logpoint", body: "Print a message and keep running — println debugging without editing code." },
  { title: "Exception breakpoint", body: "Pause the moment an exception is thrown, even if something catches it." },
  { title: "Method breakpoint", body: "Pause when a method is entered or exits. Slower — use sparingly." },
  { title: "Field watchpoint", body: "Pause whenever a field is read or changed." },
];

function CallStackMock() {
  const frames = [
    { fn: "sum(items)", file: "Cart.kt:12", active: true },
    { fn: "total()", file: "Cart.kt:6" },
    { fn: "checkout(cart)", file: "CheckoutService.kt:31" },
    { fn: "main()", file: "Main.kt:4" },
  ];
  const vars = [
    { name: "items", value: "ArrayList (size = 3)" },
    { name: "s", value: "12.5" },
    { name: "it", value: "Item(name=cake, price=NaN)", bad: true },
  ];
  return (
    <Wide minWidth={560}>
      <div className="grid grid-cols-2 overflow-hidden rounded-[8px] border border-border bg-background font-mono text-[0.74rem]">
        <div className="border-r border-border">
          <p className="flex items-center gap-2 border-b border-border bg-background-secondary px-3 py-1.5 text-foreground-subtle">
            <Marker n={1} /> Frames
          </p>
          {frames.map((f) => (
            <p key={f.fn} className={cn("flex justify-between gap-3 px-3 py-1.5", f.active ? "bg-accent-soft text-foreground" : "text-foreground-muted")}>
              <span>{f.fn}</span>
              <span className="text-foreground-subtle">{f.file}</span>
            </p>
          ))}
        </div>
        <div>
          <p className="flex items-center gap-2 border-b border-border bg-background-secondary px-3 py-1.5 text-foreground-subtle">
            <Marker n={2} /> Variables
          </p>
          {vars.map((v) => (
            <p key={v.name} className={cn("flex justify-between gap-3 px-3 py-1.5", v.bad ? "text-accent-hover" : "text-foreground")}>
              <span>{v.name}</span>
              <span className={v.bad ? "" : "text-foreground-muted"}>{v.value}</span>
            </p>
          ))}
          <p className="flex items-center gap-2 border-t border-border px-3 py-1.5 text-foreground-subtle">
            <Marker n={3} /> Evaluate: <span className="text-foreground">items.map {"{ it.price }"}</span>
          </p>
        </div>
      </div>
    </Wide>
  );
}

function MergeMock() {
  const pane = (title: string, lines: string[], tone: "yours" | "result" | "theirs") => (
    <div className={cn("min-w-0", tone !== "theirs" && "border-r border-border")}>
      <p className={cn("border-b border-border px-3 py-1.5 text-center", tone === "result" ? "bg-accent-soft text-accent-hover" : "bg-background-secondary text-foreground-subtle")}>
        {title}
      </p>
      <div className="py-2">
        {lines.map((line, i) => (
          <p
            key={i}
            className={cn(
              "flex items-center gap-2 whitespace-pre px-3 py-0.5",
              i === 1 && tone !== "result" && "bg-foreground/[0.06]",
              i === 1 && tone === "result" && "bg-accent-soft",
            )}
          >
            {tone === "yours" && i === 1 && <span className="text-accent">»</span>}
            <span className="text-foreground">{line}</span>
            {tone === "theirs" && i === 1 && <span className="ml-auto text-accent">«</span>}
          </p>
        ))}
      </div>
    </div>
  );
  return (
    <Wide minWidth={620}>
      <div className="grid grid-cols-3 overflow-hidden rounded-[8px] border border-border bg-background font-mono text-[0.72rem]">
        {pane("Yours (main)", ["fun greet(n: String) =", '  "Hello, $n!"', ""], "yours")}
        {pane("Result", ["fun greet(n: String) =", '  "Hi $n, welcome back!"', ""], "result")}
        {pane("Theirs (feature)", ["fun greet(n: String) =", '  "Hi $n, welcome back"', ""], "theirs")}
      </div>
    </Wide>
  );
}

function TestRunnerMock() {
  const tests = [
    { name: "CartTest", depth: 0, status: "fail", time: "48 ms" },
    { name: "totalAddsUpItemPrices", depth: 1, status: "pass", time: "12 ms" },
    { name: "emptyCartIsZero", depth: 1, status: "pass", time: "2 ms" },
    { name: "totalIgnoresInvalidPrices", depth: 1, status: "fail", time: "34 ms" },
  ];
  return (
    <Wide minWidth={560}>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] overflow-hidden rounded-[8px] border border-border bg-background font-mono text-[0.74rem]">
        <div className="border-r border-border py-2">
          {tests.map((t) => (
            <p
              key={t.name}
              style={{ paddingLeft: `${t.depth * 16 + 12}px` }}
              className={cn("flex items-center gap-2 py-1 pr-3", t.name === "totalIgnoresInvalidPrices" && "bg-accent-soft")}
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", t.status === "pass" ? "bg-chart-solo" : "bg-accent")} />
              <span className={t.status === "fail" ? "text-accent-hover" : "text-foreground"}>{t.name}</span>
              <span className="ml-auto text-foreground-subtle">{t.time}</span>
            </p>
          ))}
        </div>
        <div className="space-y-1 p-3 text-foreground-muted">
          <p className="text-accent-hover">AssertionFailedError</p>
          <p>
            expected: <span className="text-foreground">6.5</span>
          </p>
          <p>
            but was: <span className="text-accent-hover">NaN</span>
          </p>
          <p className="pt-2 text-foreground-subtle">at CartTest.kt:28</p>
          <p className="pt-2 underline decoration-accent underline-offset-4">&lt;Click to see difference&gt;</p>
        </div>
      </div>
    </Wide>
  );
}

export const ideDeepSections: GuideSection[] = [
  {
    id: "navigation",
    label: "Navigating code",
    title: "Jump through a codebase the way you think about it.",
    lead: "In a big project you spend more time reading code than writing it. Navigation lets you follow a call, find who uses something, and get back — in keystrokes.",
    content: (
      <>
        <Figure title="Four jumps that cover most of it">
          <Wide minWidth={560}>
            <CodeMap />
          </Wide>
        </Figure>
        <DataTable
          caption="Navigation shortcuts"
          head={["Jump", "IntelliJ IDEA", "VS Code"]}
          rows={[
            ["Go to declaration", <Keys key="i" combo="Ctrl+B" />, <Keys key="v" combo="F12" />],
            ["Go to implementation(s)", <Keys key="i" combo="Ctrl+Alt+B" />, <Keys key="v" combo="Ctrl+F12" />],
            ["Find usages", <Keys key="i" combo="Alt+F7" />, <Keys key="v" combo="Shift+Alt+F12" />],
            ["Call hierarchy", <Keys key="i" combo="Ctrl+Alt+H" />, <Keys key="v" combo="Shift+Alt+H" />],
            ["File structure / outline", <Keys key="i" combo="Ctrl+F12" />, <Keys key="v" combo="Ctrl+Shift+O" />],
            ["Go to class / symbol", <Keys key="i" combo="Ctrl+N" />, <Keys key="v" combo="Ctrl+T" />],
            ["Go to line", <Keys key="i" combo="Ctrl+G" />, <Keys key="v" combo="Ctrl+G" />],
            ["Back / forward", <Keys key="i" combo="Ctrl+Alt+Left" />, <Keys key="v" combo="Alt+Left" />],
            ["Recent locations", <Keys key="i" combo="Ctrl+Shift+E" />, "—"],
            ["Search text in all files", <Keys key="i" combo="Ctrl+Shift+F" />, <Keys key="v" combo="Ctrl+Shift+F" />],
          ]}
        />
        <Callout title="Back is the most underrated shortcut">
          Dive three definitions deep to understand something, then press Back
          until you’re where you started. Mouse users can use the side
          buttons, which map to the same action in both IDEs.
        </Callout>
      </>
    ),
  },
  {
    id: "editing",
    label: "Editing superpowers",
    title: "Edit many places at once, and select by meaning.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Figure title="Multiple cursors" note="rename in 3 places at once">
            <MultiCursor />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Select a word, add the next occurrence a few times, then type —
              every cursor edits together. (For real renames, prefer the Rename
              refactoring: it understands scope.)
            </p>
          </Figure>
          <Figure title="Extend selection" note="grows by syntax">
            <ExtendSelection />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Each press selects the next larger meaningful unit — no careful
              mouse dragging.
            </p>
          </Figure>
        </div>
        <DataTable
          caption="Editing shortcuts"
          head={["Action", "IntelliJ IDEA", "VS Code"]}
          rows={[
            ["Add next occurrence", <Keys key="i" combo="Alt+J" />, <Keys key="v" combo="Ctrl+D" />],
            ["Select all occurrences", <Keys key="i" combo="Ctrl+Alt+Shift+J" />, <Keys key="v" combo="Ctrl+Shift+L" />],
            ["Add cursor with the mouse", <Keys key="i" combo="Alt+Shift+Click" />, <Keys key="v" combo="Alt+Click" />],
            ["Extend / shrink selection", <Keys key="i" combo="Ctrl+W" />, <Keys key="v" combo="Shift+Alt+Right" />],
            ["Move line up / down", <Keys key="i" combo="Alt+Shift+Up" />, <Keys key="v" combo="Alt+Up" />],
            ["Duplicate line", <Keys key="i" combo="Ctrl+D" />, <Keys key="v" combo="Shift+Alt+Down" />],
            ["Delete line", <Keys key="i" combo="Ctrl+Y" />, <Keys key="v" combo="Ctrl+Shift+K" />],
            ["Complete current statement", <Keys key="i" combo="Ctrl+Shift+Enter" />, "—"],
            ["Show parameter hints", <Keys key="i" combo="Ctrl+P" />, <Keys key="v" combo="Ctrl+Shift+Space" />],
          ]}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="IntelliJ postfix completion"
            head={["Type", "Becomes"]}
            rows={[
              [<C key="c">names.for</C>, "for (String name : names) { }"],
              [<C key="c">user.nn</C>, "if (user != null) { }"],
              [<C key="c">calculate().var</C>, "var result = calculate();"],
              [<C key="c">&quot;hi&quot;.sout</C>, "System.out.println(\"hi\");"],
              [<C key="c">list.stream</C>, "list.stream()"],
              [<C key="c">x &gt; 0.if</C>, "if (x > 0) { }"],
            ]}
          />
          <Code
            title="VS Code snippet — .vscode/react.code-snippets"
            code={`
{
  "React component": {
    "prefix": "rfc",
    "scope": "typescriptreact",
    "body": [
      "export function \${1:Name}() {",
      "  return <div>\${2}</div>;",
      "}"
    ]
  }
}
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "refactoring",
    label: "Refactoring",
    title: "Change structure safely — the IDE updates every reference.",
    lead: "Refactorings are code transformations that keep behaviour the same. Because the IDE understands the code, it can rename a method across 200 files without touching a string that just happens to contain the same word.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Before — one long method"
            code={`
double checkout(Cart cart) {
    double total = 0;
    for (Item item : cart.items()) {
        total += item.price() * item.qty();
    }
    if (cart.hasCoupon()) total *= 0.9;
    return total;
}
`}
          />
          <Code
            title="After — Extract Method (Ctrl+Alt+M) ×2"
            code={`
double checkout(Cart cart) {
    double total = subtotal(cart);
    return applyCoupon(cart, total);
}

private double subtotal(Cart cart) { ... }
private double applyCoupon(Cart cart, double total) { ... }
`}
          />
        </div>
        <DataTable
          caption="Refactoring shortcuts"
          head={["Refactoring", "What it does", "IntelliJ IDEA", "VS Code"]}
          rows={[
            ["Refactor this…", "Menu of every refactoring that applies here", <Keys key="i" combo="Ctrl+Alt+Shift+T" />, <Keys key="v" combo="Ctrl+Shift+R" />],
            ["Rename", "Rename a symbol and all its references", <Keys key="i" combo="Shift+F6" />, <Keys key="v" combo="F2" />],
            ["Extract method / function", "Turn selected lines into a new method", <Keys key="i" combo="Ctrl+Alt+M" />, <Keys key="v" combo="Ctrl+." />],
            ["Extract variable", "Name a sub-expression", <Keys key="i" combo="Ctrl+Alt+V" />, <Keys key="v" combo="Ctrl+." />],
            ["Extract constant", "Replace a magic number with a named constant", <Keys key="i" combo="Ctrl+Alt+C" />, <Keys key="v" combo="Ctrl+." />],
            ["Inline", "The opposite of extract", <Keys key="i" combo="Ctrl+Alt+N" />, <Keys key="v" combo="Ctrl+." />],
            ["Change signature", "Add, remove or reorder parameters everywhere", <Keys key="i" combo="Ctrl+F6" />, "—"],
            ["Move", "Move a class or function to another file/package", <Keys key="i" combo="F6" />, "—"],
          ]}
        />
        <Callout tone="warn" title="Refactor on a clean working tree">
          Commit first. Then a big rename is one reviewable diff — and if it
          goes wrong, <C>git restore .</C> undoes it completely.
        </Callout>
      </>
    ),
  },
  {
    id: "debugging-deep",
    label: "Advanced debugging",
    title: "Breakpoints that think, and a debugger that can time-travel a little.",
    content: (
      <>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {breakpointTypes.map((b, i) => (
            <li key={b.title} className={cn("rounded-[var(--radius)] border p-4", i === 1 || i === 3 ? "border-accent/45 bg-accent-soft" : "border-border bg-surface")}>
              <p className="font-heading font-semibold text-foreground">{b.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{b.body}</p>
            </li>
          ))}
        </ul>
        <Figure title="Paused: the call stack and variables">
          <CallStackMock />
          <ol className="mt-5 grid grid-cols-1 gap-2 text-sm text-foreground-muted md:grid-cols-3">
            {[
              "Frames — how you got here. Click one to see its variables.",
              "Variables — the state right now. Spot the NaN.",
              "Evaluate — run any expression in the paused context.",
            ].map((label, i) => (
              <li key={label} className="flex gap-2">
                <span className="mt-0.5">
                  <Marker n={i + 1} />
                </span>
                {label}
              </li>
            ))}
          </ol>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Remote debugging a JVM (e.g. in Docker)"
            code={`
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \\
     -jar app.jar
# IntelliJ: Run → Edit Configurations → + → Remote JVM Debug → port 5005
`}
          />
          <Code
            title="VS Code · .vscode/launch.json"
            code={`
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug server",
      "program": "\${workspaceFolder}/src/server.js",
      "env": { "NODE_ENV": "development" }
    }
  ]
}
`}
          />
        </div>
        <Callout title="Restart frame & hot swap">
          Missed the interesting moment? Drop the current frame to re-run a
          method from its start. Small code changes to method bodies can often
          be reloaded into the paused JVM without restarting the app.
        </Callout>
      </>
    ),
  },
  {
    id: "git-in-ide",
    label: "Git in the IDE",
    title: "Commit, diff and resolve conflicts visually.",
    content: (
      <>
        <Figure title="The three-way merge tool" note="accept left or right, edit the middle">
          <MergeMock />
          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-foreground-muted">
            Your version on the left, theirs on the right, the result in the
            middle. Click » or « to take a side, or type the combination
            directly into the result.
          </p>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Git shortcuts in the IDE"
            head={["Action", "IntelliJ IDEA", "VS Code"]}
            rows={[
              ["Commit window / Source Control", <Keys key="i" combo="Ctrl+K" />, <Keys key="v" combo="Ctrl+Shift+G" />],
              ["Push", <Keys key="i" combo="Ctrl+Shift+K" />, "Command Palette → Git: Push"],
              ["Update / pull", <Keys key="i" combo="Ctrl+T" />, "Command Palette → Git: Pull"],
              ["Compare with branch", "Right-click → Git → Compare with Branch", "Timeline / GitLens"],
              ["Show history for selection", "Right-click → Git → Show History for Selection", "Timeline view"],
            ]}
          />
          <div className="space-y-4">
            <Card title="Stage only part of a file">
              Both IDEs let you stage individual changed lines or hunks from the
              diff gutter, so one file can contribute to two separate, focused
              commits.
            </Card>
            <Card title="Local History (IntelliJ)" accent>
              IntelliJ snapshots your files as you work, independent of Git.
              Right-click a file → Local History → Show History to recover code
              you never committed.
            </Card>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "testing",
    label: "Running & testing",
    title: "Run one test in a second, see exactly why it failed.",
    content: (
      <>
        <Figure title="The test runner">
          <TestRunnerMock />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DataTable
            caption="Testing shortcuts"
            head={["Action", "IntelliJ IDEA", "VS Code"]}
            rows={[
              ["Run test / file at caret", <Keys key="i" combo="Ctrl+Shift+F10" />, <Keys key="v" combo="Ctrl+; C" />],
              ["Re-run last", <Keys key="i" combo="Ctrl+F5" />, <Keys key="v" combo="Ctrl+; L" />],
              ["Debug test at caret", "Right-click gutter ▶ → Debug", <Keys key="v" combo="Ctrl+; Ctrl+C" />],
              ["Toggle test ↔ implementation", <Keys key="i" combo="Ctrl+Shift+T" />, "—"],
              ["Run with coverage", "Gutter ▶ → Run with Coverage", "Testing view → Run with Coverage"],
            ]}
          />
          <div className="space-y-4">
            <Card title="Run configurations">
              A saved recipe for starting something: main class or script,
              arguments, environment variables, working directory, JDK. Commit
              shared ones (IntelliJ: “Store as project file”) so the team runs
              the app the same way.
            </Card>
            <Card title="Coverage in the gutter">
              After a coverage run, the gutter shows which lines tests executed.
              Uncovered branches in important logic are where the next test
              should go — 100% isn’t the goal.
            </Card>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "extensions",
    label: "Extensions & project config",
    title: "Share editor setup through the repository.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card eyebrow="VS Code" title="Extensions worth installing">
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>ESLint and Prettier — lint and format on save</li>
              <li>Extension Pack for Java, or the Kotlin extension</li>
              <li>Tailwind CSS IntelliSense</li>
              <li>GitLens — blame, history and branch comparisons</li>
              <li>Error Lens — errors shown inline at the end of the line</li>
              <li>Dev Containers — develop inside Docker</li>
            </ul>
          </Card>
          <Card eyebrow="IntelliJ IDEA" title="Plugins worth installing">
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>Key Promoter X — tells you the shortcut for what you just clicked</li>
              <li>SonarQube for IDE — bugs and code smells as you type</li>
              <li>Rainbow Brackets</li>
              <li>.env files support</li>
              <li>A theme you actually like reading all day</li>
            </ul>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title=".vscode/extensions.json — recommend to the team"
            code={`
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "vscjava.vscode-java-pack"
  ]
}
`}
          />
          <Code
            title=".editorconfig — works in every editor"
            code={`
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.{java,kt}]
indent_size = 4
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "ai-in-ide",
    label: "AI in the IDE",
    title: "Three ways AI shows up in your editor.",
    lead: "Most IDEs now ship AI features or support them through extensions — GitHub Copilot, JetBrains AI Assistant, Claude Code and others. They differ mainly in how much they do on their own.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Inline completion", body: "Grey “ghost text” suggestions as you type. Tab to accept. Best for boilerplate and obvious next lines." },
            { icon: MessageSquare, title: "Chat", body: "Ask about selected code, errors or the project. It answers and proposes edits you apply." },
            { icon: Bot, title: "Agent", body: "Given a goal, it reads files, runs commands and edits across the project in several steps — asking for permission as it goes." },
          ].map((m, i) => (
            <div key={m.title} className={cn("rounded-[var(--radius)] border p-5", i === 2 ? "border-accent/45 bg-accent-soft" : "border-border bg-surface")}>
              <m.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <p className="mt-3 font-heading font-semibold text-foreground">{m.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{m.body}</p>
            </div>
          ))}
        </div>
        <Callout tone="warn" title="Keep your judgement switched on">
          Read suggestions before accepting them, run the tests, and check your
          company’s policy on which tools may see its code. The AI Prompting
          guide covers how to get better results.
        </Callout>
      </>
    ),
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    title: "When the IDE itself is the problem.",
    content: (
      <DataTable
        caption="Common IDE problems and fixes"
        head={["Symptom", "Try this"]}
        rows={[
          ["Red errors everywhere, but the build works", "IntelliJ: File → Invalidate Caches → Restart. VS Code: Developer: Reload Window; for Java, “Java: Clean Java Language Server Workspace”."],
          ["Imports can’t be resolved after pulling", "Reload the build: Gradle tool window → Reload All Gradle Projects, or Maven → Reload Project."],
          ["Wrong Java version / “invalid source release”", "IntelliJ: File → Project Structure → SDK and language level. Check the Gradle JVM in Settings → Build Tools → Gradle."],
          ["IDE is slow or freezing", "Exclude build output and node_modules from indexing; raise the memory limit (IntelliJ: Help → Change Memory Settings); disable unused plugins."],
          ["Formatter fights with a teammate’s", "Commit .editorconfig and the formatter config (Prettier, ktlint); turn on format on save for everyone."],
          ["Debugger never stops at breakpoints", "Make sure you started with Debug, not Run; the code running is the code you’re looking at (rebuild); the breakpoint isn’t disabled or conditional."],
        ]}
      />
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "IDE words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "IDE", def: "Integrated Development Environment — editor, build, run, debug and VCS in one tool." },
          { term: "language server (LSP)", def: "A process that gives an editor code intelligence for a language." },
          { term: "indexing", def: "The IDE scanning your project to power search, navigation and completion." },
          { term: "SDK / JDK", def: "The toolkit the project is compiled against, e.g. JDK 21." },
          { term: "run configuration", def: "A saved setup for launching an app or tests." },
          { term: "breakpoint", def: "A marker where execution pauses in the debugger." },
          { term: "stack frame", def: "One method call on the call stack, with its own variables." },
          { term: "watch", def: "An expression the debugger re-evaluates at every pause." },
          { term: "step over / into / out", def: "Run the next line, enter the called function, or finish the current one." },
          { term: "refactoring", def: "Restructuring code without changing what it does." },
          { term: "linter", def: "A tool that flags likely bugs and style problems." },
          { term: "formatter", def: "A tool that rewrites code layout consistently." },
          { term: "snippet / live template", def: "A shortcut that expands into a code template." },
          { term: "workspace", def: "The open project folder(s) plus their editor settings." },
          { term: "debug adapter (DAP)", def: "The protocol that connects editors to language debuggers." },
        ]}
      />
    ),
  },
];
