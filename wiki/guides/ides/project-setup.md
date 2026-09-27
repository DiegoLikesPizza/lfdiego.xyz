# Project Setup

How to open, configure and share a project so it works the same for everyone.

## Opening a project
| Project | IntelliJ IDEA | VS Code |
|---|---|---|
| Gradle | *Open* the folder with `settings.gradle.kts` (or `build.gradle.kts`); IntelliJ imports it | open the folder; the Java/Kotlin/Gradle extensions detect it |
| Maven | open the folder with `pom.xml` | same, with the Java extension pack |
| npm / Node | open the folder with `package.json` (Ultimate or WebStorm for full JS support) | open the folder |
| From Git | *File → New → Project from Version Control*, paste the URL | *Clone Git Repository* in the welcome screen / Command Palette |

**Open the folder**, not a single file, and not the parent of several projects (unless it's a multi-project build). Don't commit IDE-generated project files that duplicate the build (`.iml`, most of `.idea/`); the build file is the source of truth.

## SDKs and language levels
- IntelliJ: *File → Project Structure* (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) → **SDK** (which JDK) and **Language level**. *+ → Download JDK* installs one ([[java/Installing the JDK]]).
- Gradle's own JVM is separate: *Settings → Build Tools → Gradle → Gradle JVM*. If the project uses a **toolchain** (`jvmToolchain(21)`), Gradle picks the JDK for compiling itself.
- VS Code Java: `java.configuration.runtimes` in settings, or it follows `JAVA_HOME`.
- Node: use the version from `.nvmrc`/`engines`; IntelliJ: *Settings → Languages → Node.js*.

## What to commit
| Commit | Don't commit |
|---|---|
| build files, wrapper (`gradlew`, `mvnw`) | `build/`, `target/`, `out/`, `node_modules/` |
| `.editorconfig`, formatter/linter configs | personal settings (`.idea/workspace.xml`, window layouts) |
| `.vscode/extensions.json`, shared `launch.json`/`tasks.json`, `settings.json` with project rules | secrets, local paths |
| `.run/*.run.xml` (shared IntelliJ run configurations) | `.idea/` as a whole (except deliberately shared files like `codeStyles/`, `inspectionProfiles/`) |

A `.gitignore` template for IntelliJ and VS Code: [[git/Ignoring Files]].

## .editorconfig: works in every editor
`code/ides/.editorconfig`:
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.{java,kt,kts}]
indent_size = 4

[*.md]
trim_trailing_whitespace = false
```
IntelliJ reads it natively; VS Code with the *EditorConfig* extension. Tabs vs spaces and line endings are then settled for everyone ([[ides/Settings and Formatting]]).

## Recommend extensions to the team (VS Code)
`.vscode/extensions.json` (`code/ides/extensions.json`):
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "vscjava.vscode-java-pack",
    "editorconfig.editorconfig"
  ]
}
```
VS Code offers to install them when someone opens the folder. IntelliJ can require plugins per project (*Settings → Build → Required Plugins*).

## Dev Containers
A `.devcontainer/devcontainer.json` describes a Docker-based development environment (JDK, Node, database, extensions). VS Code (and IntelliJ via JetBrains Gateway) opens the project inside it: everyone, and GitHub Codespaces, get an identical setup in minutes.

## First steps checklist for a new project
1. Clone, open the folder, wait for indexing and the Gradle/Maven/npm import.
2. Check the SDK/Node version matches the project's.
3. Run the build/tests once from the command line and from the IDE.
4. Enable format on save and the linter.
5. Find the shared run configurations and start the app.
