# Built-in Tools

Beyond editing, IDEs bundle tools you'd otherwise open separately.

## Terminal
IntelliJ <kbd>Alt</kbd>+<kbd>F12</kbd>, VS Code <kbd>Ctrl</kbd>+<kbd>`</kbd>. Opens in the project folder. Use it for Git and build commands you want to see directly. Several tabs, split panes; in IntelliJ, commands like `./gradlew test` can be run as IDE actions (<kbd>Ctrl</kbd>+<kbd>Enter</kbd> on a highlighted command).

## HTTP client
Test REST APIs without Postman. IntelliJ (Ultimate) runs `.http` files natively; VS Code with the *REST Client* extension uses the same format:
```http
### Create a todo
POST http://localhost:8080/api/todos
Content-Type: application/json

{ "title": "Buy milk" }

### List todos
GET http://localhost:8080/api/todos
Accept: application/json
```
Click ▶ next to a request; the response appears with status, headers and body. `.http` files can be committed next to the code as living API documentation. The status codes are explained in [[javascript/Fetch and HTTP]].

## Database tools
IntelliJ Ultimate's *Database* tool window (and DataGrip) or VS Code extensions (SQLTools, the PostgreSQL/MySQL extensions): connect to a database, browse tables, run SQL with completion, edit data, export results. With a data source configured, IntelliJ also checks SQL strings inside your Java/Kotlin code.

## Docker
Both IDEs show containers, images, logs and `docker-compose` services, and can run a Dockerfile with a click. Combined with Dev Containers you can develop entirely inside a container ([[ides/Project Setup]]).

## Build tool windows
IntelliJ's *Gradle* and *Maven* tool windows list every task and dependency: double-click `bootRun`, `test` or `dependencies`; *Reload All Gradle Projects* after changing build files. VS Code: *Gradle for Java* extension, *NPM Scripts* view in the Explorer.

## Profiler
IntelliJ (Ultimate) *Run with Profiler*: CPU flame graphs and memory allocation from Java Flight Recorder / async-profiler, to find the slow method or the leaking object ([[java/Garbage Collection]]). For JavaScript: the browser's Performance panel ([[javascript/DevTools]]).

## Scratch files
IntelliJ <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>Insert</kbd>: a throwaway file in any language, runnable, outside the project. Great for trying an API, formatting JSON or keeping notes. VS Code: *New Untitled File* (<kbd>Ctrl</kbd>+<kbd>N</kbd>) and pick a language. For Java, `jshell` in the terminal works too ([[java/How Java Runs]]).

## Diff tool
Compare any two files: IntelliJ select both → <kbd>Ctrl</kbd>+<kbd>D</kbd>; VS Code right-click → *Select for Compare* / *Compare with Selected*. Clipboard compare in IntelliJ: right-click → *Compare with Clipboard*.
