# What an IDE Does

**An editor that understands your code.** A text editor sees characters. An IDE builds a model of your whole project (types, calls, imports, dependencies) and uses it to help you write, move through and change code.

| Feature | What you get |
|---|---|
| **Code intelligence** | completion that knows the types, inline errors and quick fixes as you type |
| **Navigation** | jump to a definition, find every usage, open any file or class by name ([[ides/Navigation]]) |
| **Refactoring** | rename or extract across the whole project, safely ([[ides/Refactoring]]) |
| **Debugger** | pause a running program and inspect every variable ([[ides/Debugging]]) |
| **Git built in** | diffs, commits, branches and conflict resolution ([[ides/Git in the IDE]]) |
| **Run & test** | one click to run the app or a single test ([[ides/Testing in the IDE]]) |
| **Build integration** | reads Gradle/Maven/npm projects, downloads dependencies, knows the classpath |
| **Tools** | terminal, database client, HTTP client, Docker, profiler ([[ides/Built-in Tools]]) |

## How it works
1. **Indexing**: when you open a project, the IDE scans every file and dependency and builds an index. That's the progress bar in the status bar, and why the first minutes feel slow.
2. **Analysis**: as you type, it re-parses the file, resolves every name against the index, and runs inspections (hundreds of checks for bugs and style).
3. **Actions**: refactorings, completions and quick fixes operate on that model, not on text. A rename changes the method `total`, not every word "total".

IntelliJ does this with its own engine per language. VS Code delegates to **language servers** (LSP): separate processes per language (TypeScript's `tsserver`, Eclipse JDT for Java, rust-analyzer…) that any editor can use.

## Why not just a text editor?
For a 20-line script, an editor is fine. For a project with 500 files, the IDE turns "where is this called from?", "rename this everywhere", "why is this null here?" from 10-minute searches into keystrokes. Most of a developer's time is **reading and changing** existing code, which is exactly what IDEs accelerate.

## But understand what's underneath
Every IDE button runs something you could run yourself: `javac`, `./gradlew test`, `git commit`, `node --inspect`. Learn the command-line version too ([[Git]], [[java/Build Tools]]): when the IDE shows a confusing error, or on a server or in CI without an IDE, you'll know what's really happening.

Next: [[ides/IntelliJ vs VS Code]].
