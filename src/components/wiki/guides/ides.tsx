import {
  Bug,
  GitBranch,
  LayoutPanelLeft,
  Play,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { Guide } from "../types";
import {
  Callout,
  Code,
  DataTable,
  Figure,
  Keys,
  Marker,
  Pipeline,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

const features = [
  { icon: Sparkles, title: "Code intelligence", body: "Completion, inline errors and quick fixes as you type." },
  { icon: Search, title: "Navigation", body: "Jump to a definition, find every usage, open any file by name." },
  { icon: Wand2, title: "Refactoring", body: "Rename or extract across the whole project, safely." },
  { icon: Bug, title: "Debugger", body: "Pause a running program and inspect every variable." },
  { icon: GitBranch, title: "Git built in", body: "Diffs, commits, branches and conflict resolution." },
  { icon: Play, title: "Run & test", body: "One click to run the app or a single test." },
];

const tree = [
  { name: "shop", depth: 0, folder: true },
  { name: "src/main/kotlin", depth: 1, folder: true },
  { name: "Cart.kt", depth: 2, active: true },
  { name: "Item.kt", depth: 2 },
  { name: "src/test", depth: 1, folder: true },
  { name: "build.gradle.kts", depth: 1 },
  { name: "README.md", depth: 1 },
];

const editorLines = [
  "class Cart(private val items: List<Item>) {",
  "",
  "    fun total(): Double {",
  "        var sum = 0.0",
  "        for (item in items) sum += item.price",
  "        return summ",
  "    }",
  "}",
];

function IdeMock() {
  return (
    <Wide minWidth={640}>
      <div className="overflow-hidden rounded-[8px] border border-border bg-background font-mono text-[0.72rem]">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-border bg-background-secondary px-3 py-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </span>
          <span className="text-foreground-subtle">shop — Cart.kt</span>
          <span className="ml-auto flex items-center gap-2 rounded-[5px] border border-border bg-surface px-2 py-1 text-foreground-subtle">
            <Marker n={7} /> <Search className="h-3 w-3" /> Search everywhere
          </span>
        </div>

        <div className="grid grid-cols-[170px_minmax(0,1fr)]">
          {/* Project tree */}
          <div className="border-r border-border bg-background-secondary p-3">
            <p className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.12em] text-foreground-subtle">
              <Marker n={1} /> Project
            </p>
            <ul className="space-y-0.5">
              {tree.map((item) => (
                <li
                  key={item.name}
                  style={{ paddingLeft: `${item.depth * 12 + 4}px` }}
                  className={cn(
                    "rounded-[4px] py-0.5 pr-1",
                    item.active ? "bg-accent-soft text-foreground" : "text-foreground-muted",
                  )}
                >
                  {item.folder ? "▾ " : "  "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            {/* Tabs */}
            <div className="flex items-stretch border-b border-border bg-background-secondary">
              <span className="border-r border-border bg-surface px-3 py-2 text-foreground shadow-[inset_0_-2px_0_var(--accent)]">
                Cart.kt
              </span>
              <span className="border-r border-border px-3 py-2 text-foreground-subtle">Item.kt</span>
              <span className="flex items-center px-2">
                <Marker n={2} />
              </span>
            </div>

            {/* Editor */}
            <div className="bg-surface py-2">
              {editorLines.map((line, index) => {
                const number = index + 1;
                const current = number === 5;
                return (
                  <div
                    key={index}
                    className={cn("grid grid-cols-[56px_minmax(0,1fr)] items-center", current && "bg-accent-soft")}
                  >
                    <span className="flex items-center justify-end gap-1.5 pr-3 text-foreground-subtle">
                      {number === 1 && <Marker n={3} />}
                      {current && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                      {number}
                    </span>
                    <span className="whitespace-pre text-foreground">
                      {number === 6 ? (
                        <>
                          {"        return "}
                          <span className="underline decoration-accent decoration-wavy underline-offset-4">summ</span>
                          <span className="ml-3 inline-flex items-center gap-1.5 rounded-[4px] border border-accent/40 bg-accent-soft px-1.5 text-accent-hover">
                            <Marker n={4} /> Unresolved reference: summ
                          </span>
                        </>
                      ) : (
                        line || " "
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tool window */}
            <div className="border-t border-border bg-background-secondary">
              <div className="flex items-center gap-4 border-b border-border px-3 py-1.5 text-foreground-subtle">
                <Marker n={5} />
                <span className="text-foreground">Terminal</span>
                <span>Problems 1</span>
                <span>Run</span>
                <span>Debug</span>
              </div>
              <div className="space-y-0.5 px-3 py-2">
                <p className="text-foreground">$ ./gradlew test</p>
                <p className="text-foreground-muted">BUILD SUCCESSFUL in 4s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 border-t border-border bg-background-secondary px-3 py-1.5 text-foreground-subtle">
          <Marker n={6} />
          <span className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" /> main
          </span>
          <span>5:42</span>
          <span>UTF-8</span>
          <span className="ml-auto">Kotlin</span>
        </div>
      </div>
    </Wide>
  );
}

const anatomyLegend = [
  { title: "Project tree", body: "Every file and folder. The IDE indexes it all for search." },
  { title: "Editor tabs", body: "Open files. Close the ones you don’t need — or use recent files instead." },
  { title: "Gutter", body: "Line numbers, breakpoints, run buttons and change markers." },
  { title: "Inline problems", body: "Errors and warnings as you type, with quick fixes on hover." },
  { title: "Tool windows", body: "Terminal, problems, run output, debugger — docked at the bottom." },
  { title: "Status bar", body: "Current Git branch, cursor position, encoding, language." },
  { title: "Search / command", body: "Find any file, symbol, setting or action by typing its name." },
];

function DebugSteps() {
  const mainLines = ["val cart = loadCart()", "val total = sum(cart)", "println(total)"];
  const sumLines = ["var s = 0.0", "items.forEach { s += it.price }", "return s"];
  const rowY = [55, 95, 135];

  return (
    <svg
      viewBox="0 0 640 220"
      className="h-auto w-full"
      role="img"
      aria-label="Debugger stepping. Paused at a breakpoint on line 2 of main, which calls sum. Step over runs sum entirely and stops at line 3 of main. Step into stops at the first line of sum. Step out finishes sum and returns to line 3 of main."
    >
      <defs>
        <marker id="ide-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
        <marker id="ide-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>

      {/* main() */}
      <rect x="80" y="10" width="240" height="170" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      <text x="96" y="32" fontSize="12" className="fill-foreground-subtle font-mono">
        main()
      </text>
      <rect x="81" y={rowY[1]} width="238" height="30" className="fill-accent-soft" />
      <circle cx="94" cy={rowY[1] + 15} r="5" className="fill-accent" />
      {mainLines.map((line, i) => (
        <text key={line} x="108" y={rowY[i] + 19} fontSize="11" className="fill-foreground font-mono">
          {line}
        </text>
      ))}

      {/* sum() */}
      <rect x="390" y="10" width="240" height="170" rx="8" strokeWidth="1.5" className="fill-background stroke-border" />
      <text x="406" y="32" fontSize="12" className="fill-foreground-subtle font-mono">
        sum(items)
      </text>
      {sumLines.map((line, i) => (
        <text key={line} x="406" y={rowY[i] + 19} fontSize="11" className="fill-foreground font-mono">
          {line}
        </text>
      ))}

      {/* step over */}
      <path d="M270 112 C300 116 300 146 272 150" fill="none" strokeWidth="1.5" markerEnd="url(#ide-arrow)" className="stroke-foreground-subtle" />
      {/* step into */}
      <path d="M300 97 C330 62 360 70 400 70" fill="none" strokeWidth="2" markerEnd="url(#ide-arrow-accent)" className="stroke-accent" />
      {/* step out */}
      <path d="M470 160 C450 212 320 212 240 168" fill="none" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#ide-arrow-accent)" className="stroke-accent" />

      <text x="20" y="116" fontSize="10" className="fill-foreground-subtle font-mono">
        paused
      </text>
    </svg>
  );
}

export const ideGuide: Guide = {
  slug: "ides",
  title: "IDEs",
  kicker: "Tools",
  summary:
    "What an IDE does that an editor doesn’t, a labelled map of the window, IntelliJ IDEA vs VS Code, the shortcuts worth learning, and how to use a debugger.",
  icon: LayoutPanelLeft,
  sections: [
    {
      id: "what-it-does",
      label: "What an IDE does",
      title: "An editor that understands your code.",
      lead: "A text editor sees characters. An IDE builds a model of your whole project — types, calls, imports — and uses it to help you write, move through and change code.",
      content: (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title} className="rounded-[var(--radius)] border border-border bg-surface p-5">
                <feature.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                <p className="mt-3 font-heading font-semibold text-foreground">{feature.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
          <DataTable
            caption="IntelliJ IDEA, VS Code and Android Studio compared"
            head={["", "IntelliJ IDEA", "VS Code", "Android Studio"]}
            rows={[
              ["Best for", "Java & Kotlin", "JavaScript, TypeScript, web", "Android apps"],
              ["Language smarts", "Deep, built in", "Through extensions", "Deep (built on IntelliJ)"],
              ["Feel", "Full IDE, heavier", "Light editor you extend", "Full IDE, heavier"],
              ["Cost", "Free tier + paid Ultimate features", "Free", "Free"],
            ]}
          />
        </>
      ),
    },
    {
      id: "anatomy",
      label: "Anatomy",
      title: "Every IDE window, mapped.",
      lead: "IntelliJ and VS Code arrange things slightly differently, but the same seven areas are in both.",
      content: (
        <Figure title="The parts of an IDE">
          <IdeMock />
          <ol className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {anatomyLegend.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5">
                  <Marker n={index + 1} />
                </span>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  <span className="font-medium text-foreground">{item.title}.</span> {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Figure>
      ),
    },
    {
      id: "shortcuts",
      label: "Shortcuts",
      title: "Learn these and you’ll rarely reach for the mouse.",
      lead: "Windows and Linux defaults. On macOS, Ctrl is usually ⌘ and Alt is ⌥.",
      content: (
        <>
          <DataTable
            caption="Essential IDE keyboard shortcuts"
            head={["Action", "IntelliJ IDEA", "VS Code"]}
            rows={[
              ["Find any action or command", <Keys key="i" combo="Ctrl+Shift+A" />, <Keys key="v" combo="Ctrl+Shift+P" />],
              ["Search everything / open file", <Keys key="i" combo="Shift Shift" />, <Keys key="v" combo="Ctrl+P" />],
              ["Go to definition", <Keys key="i" combo="Ctrl+B" />, <Keys key="v" combo="F12" />],
              ["Find usages / references", <Keys key="i" combo="Alt+F7" />, <Keys key="v" combo="Shift+F12" />],
              ["Rename symbol everywhere", <Keys key="i" combo="Shift+F6" />, <Keys key="v" combo="F2" />],
              ["Quick fix", <Keys key="i" combo="Alt+Enter" />, <Keys key="v" combo="Ctrl+." />],
              ["Reformat code", <Keys key="i" combo="Ctrl+Alt+L" />, <Keys key="v" combo="Shift+Alt+F" />],
              ["Toggle line comment", <Keys key="i" combo="Ctrl+/" />, <Keys key="v" combo="Ctrl+/" />],
              ["Recent files", <Keys key="i" combo="Ctrl+E" />, <Keys key="v" combo="Ctrl+Tab" />],
              ["Open terminal", <Keys key="i" combo="Alt+F12" />, <Keys key="v" combo="Ctrl+`" />],
            ]}
          />
          <Callout title="If you remember only one">
            Find Action (IntelliJ) and the Command Palette (VS Code) run any
            command by name — and show its shortcut next to it, so you pick up
            the rest as you go.
          </Callout>
        </>
      ),
    },
    {
      id: "debugging",
      label: "Debugging",
      title: "Stop guessing with println: pause the program and look.",
      lead: "Set a breakpoint, start in debug mode, and execution stops on that line with every variable visible. Then move through the code one step at a time.",
      content: (
        <>
          <Figure title="The debugging loop">
            <Pipeline
              nodes={[
                { title: "Set a breakpoint", sub: "click the gutter" },
                { title: "Run in debug", sub: "not the normal run button" },
                { title: "Inspect", sub: "variables, watches, call stack" },
                { title: "Step & fix", sub: "move line by line", accent: true },
              ]}
              links={[{ forward: "debug" }, { forward: "paused" }, { forward: "step" }]}
            />
          </Figure>
          <Figure title="Over, into, out">
            <div className="mx-auto max-w-[760px]">
              <Wide minWidth={520}>
                <DebugSteps />
              </Wide>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-foreground-muted">
                <li className="flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-foreground-subtle" /> step over — run sum() whole
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-accent" /> step into — stop inside it
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-0.5 w-6 border-t-2 border-dashed border-accent" /> step out — finish, go back
                </li>
              </ul>
            </div>
          </Figure>
          <DataTable
            caption="Debugger shortcuts"
            head={["Debugger", "IntelliJ", "VS Code"]}
            rows={[
              ["Toggle breakpoint", <Keys key="i" combo="Ctrl+F8" />, <Keys key="v" combo="F9" />],
              ["Start debugging", <Keys key="i" combo="Shift+F9" />, <Keys key="v" combo="F5" />],
              ["Step over", <Keys key="i" combo="F8" />, <Keys key="v" combo="F10" />],
              ["Step into", <Keys key="i" combo="F7" />, <Keys key="v" combo="F11" />],
              ["Step out", <Keys key="i" combo="Shift+F8" />, <Keys key="v" combo="Shift+F11" />],
              ["Resume", <Keys key="i" combo="F9" />, <Keys key="v" combo="F5" />],
            ]}
          />
          <Callout title="Conditional breakpoints">
            Right-click a breakpoint and add a condition like{" "}
            <code className="font-mono text-foreground">item.price &lt; 0</code>. The
            program only pauses when it’s true — perfect for the one bad item in
            a loop of ten thousand.
          </Callout>
        </>
      ),
    },
    {
      id: "setup",
      label: "Setup",
      title: "Ten minutes of setup that pay off every day.",
      content: (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {[
              ["Format on save", "Never argue about spacing again."],
              ["A good coding font", "JetBrains Mono or Fira Code, with ligatures if you like them."],
              ["Language support", "VS Code: ESLint, Prettier, Extension Pack for Java, Kotlin. IntelliJ has these built in."],
              ["Optimize imports on the fly", "Unused imports disappear automatically."],
              ["Settings Sync", "Same setup on every machine you use."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-3 rounded-[var(--radius)] border border-border bg-surface p-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <p className="text-sm leading-relaxed text-foreground-muted">
                  <span className="font-medium text-foreground">{title}.</span> {body}
                </p>
              </li>
            ))}
          </ul>
          <Code
            title="VS Code · settings.json"
            code={`
{
  "editor.formatOnSave": true,
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "files.autoSave": "onFocusChange",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
`}
          />
        </div>
      ),
    },
  ],
};
