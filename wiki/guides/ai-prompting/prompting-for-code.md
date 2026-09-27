# Prompting for Code

**Templates for the coding prompts you'll write most.** Copy one, fill in the brackets. Each supplies the context a model would otherwise have to guess. More ready-made prompts: [[ai-prompting/Prompt Library]].

## Fix a bug
```
I have a bug in [file / function].

Expected: [what should happen]
Actual:   [what happens instead]
Steps:    [how to reproduce]

Error output:
<error>
[full stack trace]
</error>

Relevant code:
<code>
[the function and anything it calls]
</code>

Stack: [language, framework and versions]
First list the likely causes, then propose the smallest fix.
```
More in [[ai-prompting/Debugging with AI]].

## Build a feature
```
Add [feature] to [project].

Context: [what exists, where it lives, conventions to follow]
Requirements:
- [behaviour 1]
- [behaviour 2]
Constraints: [no new dependencies / must work offline / accessibility]
Done means: [tests pass, types check, works on mobile]

Before writing code, outline your plan and any questions.
```

## Write tests
```
Write unit tests for the function below using [Jest / Vitest / JUnit 5 / kotlin.test].

Cover: the normal case, empty input, boundary values, and invalid input.
Name each test after the behaviour it checks.
Don't change the function. If you find a bug, point it out separately.

<code>
[function]
</code>
```
Then **run them**. A generated test that passes against buggy code is worse than no test; check that the assertions actually say what the behaviour should be ([[java/Testing with JUnit]], [[javascript/Tooling]]).

## Review a diff
```
Review this diff as a careful senior engineer.

Focus on: correctness, edge cases, security, and error handling.
Ignore: formatting and naming preferences.
For each issue give the line, the risk, and a suggested fix.
If it's good, say so briefly.

<diff>
[git diff output]
</diff>
```

## Refactor
```
Refactor [function / class] for [readability / testability / performance].
Keep the public API and behaviour exactly the same.
Make the smallest set of changes that achieves this, and explain each in one line.
Existing tests: [paste or describe]. They must still pass unchanged.
```

## Convert between languages
```
Convert this Java class to idiomatic Kotlin (Kotlin 2.x).
Use data classes, null-safety and extension functions where they fit.
Keep the same public API so existing Java callers still compile.
List anything that behaves differently after conversion.
```
IntelliJ's built-in Java → Kotlin converter is a good first pass; ask the model to make the result idiomatic ([[kotlin/Kotlin for Java Developers]]).

## Explain code
```
Explain what this code does, section by section, for a developer
new to this codebase. Point out anything surprising or risky.
```

## General tips for code
- **Give versions.** "React 19", "Java 21", "Spring Boot 3.5", "Next.js 16 App Router". APIs change; without versions you get the most common, often outdated, variant.
- **Show the types.** The interface or data class the code works with prevents invented fields.
- **Show neighbouring code** for style: one existing component, one existing test.
- **Say what not to touch.** "Don't change the database schema."
- **Ask for small pieces.** One function you can read beats a 400-line file you can't.
- **Ask for the "why"** when you're learning, so you can do it yourself next time.
