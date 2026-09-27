# Shortcuts

**Learn these and you'll rarely reach for the mouse.** Windows and Linux defaults. On macOS, <kbd>Ctrl</kbd> is usually <kbd>⌘</kbd> and <kbd>Alt</kbd> is <kbd>⌥</kbd>.

## The top ten
| Action | IntelliJ IDEA | VS Code |
|---|---|---|
| Find any action or command | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Search everything / open file | <kbd>Shift</kbd> then <kbd>Shift</kbd> | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Go to definition | <kbd>Ctrl</kbd>+<kbd>B</kbd> | <kbd>F12</kbd> |
| Find usages / references | <kbd>Alt</kbd>+<kbd>F7</kbd> | <kbd>Shift</kbd>+<kbd>F12</kbd> |
| Rename symbol everywhere | <kbd>Shift</kbd>+<kbd>F6</kbd> | <kbd>F2</kbd> |
| Quick fix | <kbd>Alt</kbd>+<kbd>Enter</kbd> | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| Reformat code | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> | <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd> |
| Toggle line comment | <kbd>Ctrl</kbd>+<kbd>/</kbd> | <kbd>Ctrl</kbd>+<kbd>/</kbd> |
| Recent files | <kbd>Ctrl</kbd>+<kbd>E</kbd> | <kbd>Ctrl</kbd>+<kbd>Tab</kbd> |
| Open terminal | <kbd>Alt</kbd>+<kbd>F12</kbd> | <kbd>Ctrl</kbd>+<kbd>`</kbd> |

## Quick fix is the magic key
<kbd>Alt</kbd>+<kbd>Enter</kbd> (IntelliJ) / <kbd>Ctrl</kbd>+<kbd>.</kbd> (VS Code) on anything underlined offers fixes: add an import, create a missing method, add a null check, convert to a switch expression, implement interface methods, simplify a condition. On code that isn't underlined, it offers context actions ("Convert to string template", "Add parameter names"). Press it everywhere.

## By task
- **Navigation**: [[ides/Navigation]]
- **Editing, multi-cursor, selection**: [[ides/Editing]]
- **Refactoring**: [[ides/Refactoring]]
- **Debugger**: [[ides/Debugging]]
- **Tests**: [[ides/Testing in the IDE]]
- **Git**: [[ides/Git in the IDE]]
- Everything on one page: [[ides/Cheat Sheet]]

## Learning them
1. **Use Find Action / Command Palette** for anything you'd click. It shows the shortcut next to each result.
2. **Learn one new shortcut per day**, and force yourself to use it.
3. IntelliJ plugin **Key Promoter X** pops up the shortcut every time you click a menu item or button. VS Code shows shortcuts in menus and tooltips.
4. Print or bookmark the official reference cards: *Help → Keyboard Shortcuts PDF* (IntelliJ), *Help → Keyboard Shortcuts Reference* (VS Code).

## Customising
IntelliJ: *Settings → Keymap* (search by action or by pressing a shortcut). VS Code: <kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>Ctrl</kbd>+<kbd>S</kbd>, or `keybindings.json`. Change sparingly: pair programming and tutorials assume the defaults.
