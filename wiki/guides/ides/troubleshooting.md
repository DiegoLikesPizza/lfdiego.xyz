# Troubleshooting

**When the IDE itself is the problem.** Most IDE trouble is a stale index, a build that isn't loaded, or the wrong SDK.

| Symptom | Try this |
|---|---|
| Red errors everywhere, but the build works | IntelliJ: *File → Invalidate Caches → Restart*. VS Code: *Developer: Reload Window*; for Java, *Java: Clean Java Language Server Workspace*. |
| Imports can't be resolved after pulling | reload the build: Gradle tool window → *Reload All Gradle Projects* (or the elephant icon), Maven → *Reload Project*; `npm install` for JS |
| Wrong Java version / "invalid source release" / "Unsupported class file major version" | IntelliJ: *File → Project Structure* → SDK and language level; check the Gradle JVM in *Settings → Build Tools → Gradle* ([[java/Installing the JDK]]) |
| IDE is slow or freezing | exclude build output and `node_modules` from indexing (right-click → *Mark Directory as → Excluded*; VS Code `files.exclude`/`search.exclude`); raise the memory limit (*Help → Change Memory Settings*); disable unused plugins |
| Formatter fights with a teammate's | commit `.editorconfig` and the formatter config (Prettier, ktlint); turn on format on save for everyone ([[ides/Settings and Formatting]]) |
| Debugger never stops at breakpoints | started with Debug, not Run? Is the running code the code you're looking at (rebuild)? Is the breakpoint disabled or conditional? ([[ides/Debugging in Depth]]) |
| Tests pass in the IDE, fail in CI | different JDK, environment variables only in the run configuration, IDE not delegating to Gradle ([[ides/Testing in the IDE]]) |
| "Cannot resolve symbol" only in one file | the file is outside a source root: *Mark Directory as → Sources Root*, or it's excluded |
| Kotlin/Java classes not found from each other | build once with Gradle; check both `src/main/java` and `src/main/kotlin` are source roots ([[kotlin/Java Interop]]) |
| TypeScript errors in VS Code differ from `tsc` | VS Code uses its bundled TypeScript: *TypeScript: Select TypeScript Version → Use Workspace Version* |
| ESLint/Prettier don't run on save | extension installed and enabled? `editor.defaultFormatter` set? Output panel → ESLint shows errors |
| Git operations hang or ask for passwords | credential helper or SSH agent not set up ([[github/Authentication]]); try the same command in the terminal |
| Everything is weird after an update | reset or disable plugins; IntelliJ can roll back to a previous version via the Toolbox App |

## Where the logs are
- IntelliJ: *Help → Show Log in Explorer/Finder* (`idea.log`); *Help → Diagnostic Tools* for thread dumps and memory.
- VS Code: *Output* panel → choose the extension from the dropdown (Java, ESLint, TypeScript); *Developer: Toggle Developer Tools* for the extension host.

## The nuclear options
1. Close the IDE, delete the project's IDE files (`.idea/` or `.vscode/`'s workspace state, not your committed configs!), reopen and reimport.
2. Reset IDE settings (IntelliJ: *File → Manage IDE Settings → Restore Default Settings*).
3. Check the same thing from the **command line**: if `./gradlew build` works, the project is fine and the problem is IDE configuration.
