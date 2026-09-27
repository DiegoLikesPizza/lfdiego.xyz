# Anatomy

**Every IDE window, mapped.** IntelliJ and VS Code arrange things slightly differently, but the same seven areas are in both.

![The parts of an IDE](img/anatomy.png)

| # | Area | IntelliJ IDEA | VS Code |
|---|---|---|---|
| 1 | **Project tree** | *Project* tool window (<kbd>Alt</kbd>+<kbd>1</kbd>) | *Explorer* (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>) |
| 2 | **Editor tabs** | one tab per file; <kbd>Ctrl</kbd>+<kbd>E</kbd> for recent files | same; <kbd>Ctrl</kbd>+<kbd>Tab</kbd> |
| 3 | **Gutter** | line numbers, breakpoints, ▶ run buttons, change markers, implement/override icons | line numbers, breakpoints, change markers; "Run \| Debug" CodeLens above tests |
| 4 | **Inline problems** | red/yellow underlines, *Problems* tool window (<kbd>Alt</kbd>+<kbd>6</kbd>) | squiggles, *Problems* panel (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>) |
| 5 | **Tool windows / panel** | Terminal, Run, Debug, Git, Gradle/Maven, Database docked around the editor | Terminal, Output, Debug Console, Problems in the bottom panel |
| 6 | **Status bar** | Git branch, cursor position, encoding, line separator, indexing progress, memory | branch, sync status, errors/warnings, position, language mode |
| 7 | **Search / command** | *Search Everywhere* (<kbd>Shift</kbd> <kbd>Shift</kbd>), *Find Action* (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>) | *Quick Open* (<kbd>Ctrl</kbd>+<kbd>P</kbd>), *Command Palette* (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) |

## Tool windows (IntelliJ)
Toggle with <kbd>Alt</kbd>+<kbd>number</kbd>: 1 Project, 4 Run, 5 Debug, 6 Problems, 9 Git, <kbd>Alt</kbd>+<kbd>F12</kbd> Terminal. <kbd>Esc</kbd> returns focus to the editor; <kbd>Shift</kbd>+<kbd>Esc</kbd> hides the active tool window. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F12</kbd> maximises the editor.

## Activity bar (VS Code)
The left icon strip: Explorer, Search, Source Control, Run and Debug, Extensions, Testing, plus icons from extensions (Docker, GitLens, Remote). <kbd>Ctrl</kbd>+<kbd>B</kbd> toggles the sidebar, <kbd>Ctrl</kbd>+<kbd>J</kbd> the bottom panel.

## Split editors
- IntelliJ: right-click a tab → *Split Right/Down*, or drag a tab.
- VS Code: <kbd>Ctrl</kbd>+<kbd>\\</kbd>, or drag a tab to a side.
Useful for code + test side by side.

## Zen and distraction-free modes
IntelliJ: *View → Appearance → Zen Mode*. VS Code: <kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>Z</kbd>. Hides everything but the code: good for presenting or focusing.

Next: [[ides/Shortcuts]].
