# Running and Run Configurations

A **run configuration** is a saved recipe for starting something: main class or script, arguments, environment variables, working directory, JDK/Node version. Instead of typing a long command every time, you press one key.

## Running
| Action | IntelliJ IDEA | VS Code |
|---|---|---|
| Run the thing at the caret (main, test) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F10</kbd> | ▶ above `main`/tests (CodeLens), or the Run button |
| Run the selected configuration | <kbd>Shift</kbd>+<kbd>F10</kbd> | <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Run Without Debugging) |
| Debug it | <kbd>Shift</kbd>+<kbd>F9</kbd> | <kbd>F5</kbd> |
| Choose a configuration | <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>F10</kbd> | dropdown in Run and Debug view |
| Rerun | <kbd>Ctrl</kbd>+<kbd>F5</kbd> | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F5</kbd> (restart) |
| Stop | <kbd>Ctrl</kbd>+<kbd>F2</kbd> | <kbd>Shift</kbd>+<kbd>F5</kbd> |

## IntelliJ run configurations
*Run → Edit Configurations* (or the dropdown next to ▶). Common types:
| Type | For |
|---|---|
| Application | a Java/Kotlin class with `main` |
| Spring Boot | a Spring app, with active profiles and live reload |
| Gradle / Maven | any task: `bootRun`, `test --tests CartTest`, `build` |
| JUnit | a test class, package or pattern |
| npm | a `package.json` script |
| Remote JVM Debug | attach to a running JVM ([[ides/Debugging in Depth]]) |
| Docker | build and run a container |
| Compound | start several at once (backend + frontend) |

Fields worth knowing: **program arguments**, **VM options** (`-Xmx512m -Dspring.profiles.active=dev`), **environment variables** (or an `.env` file with a plugin), **working directory**, **before launch** tasks.

### Share them with the team
Tick **Store as project file**: the configuration is saved in `.run/*.run.xml` and can be committed. Everyone runs the app the same way, and new colleagues get working "Run backend", "Run all tests" buttons on day one.

## VS Code: launch.json and tasks.json
- **`.vscode/launch.json`**: run/debug configurations (examples in [[ides/Debugging in Depth]]).
- **`.vscode/tasks.json`**: shell tasks (build, lint) runnable with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>, and usable as `preLaunchTask`.
```json
{
  "version": "2.0.0",
  "tasks": [
    { "label": "build", "type": "npm", "script": "build", "group": { "kind": "build", "isDefault": true } },
    { "label": "gradle test", "type": "shell", "command": "./gradlew test", "problemMatcher": [] }
  ]
}
```
The npm script list in the Explorer (*NPM Scripts*) runs `package.json` scripts with a click.

## Delegate to the build tool?
IntelliJ can run Gradle projects with its own builder or delegate to Gradle (*Settings → Build Tools → Gradle → Build and run using*). Delegating to Gradle is slower but identical to CI and the command line: if something only works in one of them, check this setting.

## Environment variables and secrets
Put local secrets in a git-ignored `.env` file or the run configuration, never in committed `.run/` files or `launch.json` ([[git/Ignoring Files]]).
