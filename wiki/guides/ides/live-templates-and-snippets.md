# Live Templates and Snippets

Type a short abbreviation, press <kbd>Tab</kbd>, get a code template with placeholders to fill in. IntelliJ calls them **live templates**, VS Code **snippets**.

## Built-in favourites
| IntelliJ (Java/Kotlin) | Expands to |
|---|---|
| `psvm` / `main` | `public static void main(String[] args) { }` |
| `sout` | `System.out.println();` (Kotlin: `println()`) |
| `soutv` | prints the nearest variable with its name |
| `fori` / `iter` | an index loop / a for-each loop |
| `ifn` / `inn` | `if (x == null)` / `if (x != null)` |
| `psfs` | `public static final String` |
| `todo` | `// TODO: ` |

List them all under *Settings → Editor → Live Templates*; <kbd>Ctrl</kbd>+<kbd>J</kbd> shows those applicable at the cursor. Postfix completion (`list.for`, `x.nn`) is in [[ides/Editing]].

VS Code's language extensions ship snippets (type `for`, `log`, `imp` in JS/TS and look at the completion list); <kbd>Ctrl</kbd>+<kbd>Space</kbd> shows them.

## Your own IntelliJ template
*Settings → Editor → Live Templates → + → Live Template*:
- Abbreviation: `test`
- Template text:
```
@org.junit.jupiter.api.Test
void $NAME$() {
    $END$
}
```
- Applicable in: Java → declaration.

`$NAME$` is a placeholder you type into; `$END$` is where the cursor lands. Templates can call functions (`className()`, `camelCase()`, `date()`) for placeholders. Export them via *File → Manage IDE Settings* or share with the team through settings sync.

## Your own VS Code snippet
Project-specific snippets go into `.vscode/*.code-snippets`, committed with the repository. `code/ides/react.code-snippets`:
```json
{
  "React component": {
    "prefix": "rfc",
    "scope": "typescriptreact",
    "body": [
      "export function ${1:Name}() {",
      "  return <div>${2}</div>;",
      "}"
    ],
    "description": "Function component"
  }
}
```
`$1`, `$2` are tab stops (`${1:Name}` with a default), `$0` the final cursor position. Variables like `$TM_FILENAME_BASE` insert the file name: great for component names that match their file.

## Worth a template
Anything you type often and the same way: a test method, a logger field, a React component, a Spring controller, a DTO record, a `try`/`catch` with your logging pattern. Keep templates small; if a template grows big, it's probably code that should be a function or a generator instead.
