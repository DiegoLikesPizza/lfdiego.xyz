# Extensions and Plugins

VS Code is small and grows with **extensions**; IntelliJ ships most features and adds **plugins**. Install what you use, not everything: each one costs memory and start-up time.

## VS Code extensions worth installing
| Extension | For |
|---|---|
| **ESLint** and **Prettier** | lint and format on save ([[javascript/Tooling]]) |
| **Extension Pack for Java** / **Kotlin** | Java/Kotlin language support, debugging, tests |
| **Tailwind CSS IntelliSense** | class name completion and previews |
| **GitLens** | blame, history and branch comparisons |
| **Error Lens** | errors shown inline at the end of the line |
| **Dev Containers** | develop inside Docker ([[ides/Project Setup]]) |
| **Docker** | containers, images, compose files |
| **EditorConfig** | apply `.editorconfig` |
| **GitHub Pull Requests** | review PRs in the editor |
| **REST Client** or **Thunder Client** | send HTTP requests from `.http` files |
| **Vitest** / **Jest** / **Playwright Test** | test runners in the Testing view |
| **Code Spell Checker** | typos in names and comments |

Recommend them to your team via `.vscode/extensions.json` ([[ides/Project Setup]]). Check the publisher (verified ✓) and install count: extensions run with your permissions.

## IntelliJ plugins worth installing
| Plugin | For |
|---|---|
| **Key Promoter X** | tells you the shortcut for what you just clicked |
| **SonarQube for IDE** | bugs and code smells as you type |
| **.env files support** | syntax and completion for `.env` |
| **Rainbow Brackets** | matching brackets in colours |
| **ktlint** | Kotlin formatting on save |
| **CheckStyle-IDEA** | if the project uses Checkstyle |
| **String Manipulation** | case conversion, sorting lines, escaping |
| **GitToolBox** | inline blame and status |
| A theme you actually like reading all day | |

Already built in (no plugin needed): Git, Gradle, Maven, JUnit, Docker, database tools (Ultimate), HTTP client, Spring (Ultimate), Markdown, terminal.

## Managing extensions
- VS Code: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>; disable per workspace for extensions you only need in some projects; **Profiles** switch sets of extensions and settings (e.g. "Java", "Web").
- IntelliJ: *Settings → Plugins*; disable bundled plugins you never use (Android, Swing designer…) to speed things up.
- If the IDE becomes slow or buggy, disable extensions first ([[ides/Troubleshooting]]).

## AI extensions
GitHub Copilot, JetBrains AI Assistant, Claude Code and others: [[ides/AI in the IDE]].
