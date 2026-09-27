# Settings and Formatting

**Ten minutes of setup that pay off every day.**

## Worth doing on day one
- **Format on save.** Never argue about spacing again.
- **A good coding font.** JetBrains Mono or Fira Code, with ligatures if you like them.
- **Language support.** VS Code: ESLint, Prettier, Extension Pack for Java, Kotlin. IntelliJ has these built in.
- **Optimize imports on the fly.** Unused imports disappear automatically.
- **Settings Sync.** Same setup on every machine you use.
- **Auto-save** (VS Code `files.autoSave`; IntelliJ saves automatically by default).
- **Show whitespace / render indent guides** if your team mixes tabs and spaces (then fix that with `.editorconfig`).

## VS Code: settings.json
User settings: <kbd>Ctrl</kbd>+<kbd>,</kbd> (UI) or *Preferences: Open User Settings (JSON)*. Workspace settings in `.vscode/settings.json` apply to one project and can be committed. `code/ides/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "files.autoSave": "onFocusChange",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "[java]": { "editor.defaultFormatter": "redhat.java" },
  "files.exclude": { "**/node_modules": true, "**/build": true }
}
```

## IntelliJ settings
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>. Worth changing:
| Setting | Where |
|---|---|
| Reformat + optimize imports on save | *Tools → Actions on Save* |
| Optimize imports on the fly | *Editor → General → Auto Import* |
| Code style (per language, per project) | *Editor → Code Style* (store in project to share) |
| Inspections profile | *Editor → Inspections* |
| Font | *Editor → Font* |
| Memory | *Help → Change Memory Settings* (2–4 GB for large projects) |
| Settings sync | *File → Manage IDE Settings → Backup and Sync* |

Settings exist on two levels: **IDE-wide** and **project** (stored in `.idea/`). Code styles and inspection profiles can be project-level and committed.

## Formatters: let a tool decide
Team-wide formatting must not depend on each person's IDE settings. Use a formatter configured **in the repository** and run it in CI:
| Language | Formatter | Check in CI |
|---|---|---|
| JavaScript/TypeScript/CSS/JSON/Markdown | Prettier (or Biome) | `prettier --check .` |
| Java | google-java-format, Palantir, or Spotless with Eclipse config | `./gradlew spotlessCheck` |
| Kotlin | ktlint (official style) | `./gradlew ktlintCheck` |
| everything | `.editorconfig` for indentation, line endings, final newline | editorconfig-checker |

The IDE then formats **with** that tool on save (Prettier extension; IntelliJ's ktlint plugin or *Use EditorConfig*). A formatter that fights a teammate's is a sign the settings aren't in the repository.

## Themes and readability
Pick a theme you can read for eight hours (light themes are fine!). Useful: *Presentation Mode* (IntelliJ) or zoom (<kbd>Ctrl</kbd>+<kbd>+</kbd>) when screen sharing, increased line height, and semantic highlighting (parameters vs locals in different colours).
