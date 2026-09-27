# IntelliJ vs VS Code

| | IntelliJ IDEA | VS Code | Android Studio |
|---|---|---|---|
| Best for | Java & Kotlin (also web, SQL, Python with plugins) | JavaScript, TypeScript, web, scripting, "a bit of everything" | Android apps |
| Language smarts | deep, built in | through extensions and language servers | deep (built on IntelliJ) |
| Feel | full IDE, heavier (≈1–3 GB RAM) | light editor you extend | full IDE, heavier |
| Refactoring | the strongest available for JVM languages | good for TypeScript, basic elsewhere | IntelliJ's |
| Cost | free core (the former Community Edition) + paid Ultimate features (Spring, JS/TS, databases, …); free for students | free, open source | free |
| Made by | JetBrains | Microsoft | Google (on JetBrains' platform) |

## Rule of thumb
- **Java/Kotlin backend, Gradle/Maven projects** → IntelliJ IDEA.
- **Web frontends, Node, TypeScript** → VS Code (or JetBrains WebStorm).
- **Android** → Android Studio.
- **Quick edits, config files, many languages at once** → VS Code.

Many developers use both: IntelliJ for the backend, VS Code for the frontend of the same project.

## Other JetBrains IDEs
Same platform, same shortcuts: **WebStorm** (JS/TS), **PyCharm** (Python), **Rider** (.NET), **GoLand**, **RustRover**, **DataGrip** (databases), **CLion** (C/C++), **PhpStorm**. Learn one, know them all. JetBrains offers free educational licences with a school or apprenticeship e-mail address.

## Other options
| Tool | Notes |
|---|---|
| **Eclipse** | the classic free Java IDE, still used in many companies and schools |
| **Cursor**, **Windsurf** | VS Code forks built around AI agents ([[ides/AI in the IDE]]) |
| **Zed** | very fast native editor with collaboration and AI |
| **Neovim / Vim**, **Emacs** | keyboard-driven editors, IDE-like with LSP plugins |

## Switching between them
- IntelliJ can use **VS Code keymap** (*Settings → Keymap*) and VS Code has an **IntelliJ IDEA Keybindings** extension, if you'd rather keep one set of shortcuts.
- Share formatting across both with `.editorconfig` and tool configs (Prettier, ktlint) in the repository ([[ides/Settings and Formatting]]).

Next: find your way around the window in [[ides/Anatomy]].
