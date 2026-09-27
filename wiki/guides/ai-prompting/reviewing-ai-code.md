# Reviewing AI Code

**You own what you merge.** Treat AI-written code like a pull request from a fast, well-read colleague who has never seen your project and sometimes makes things up. Read it, run it, test it.

![A verification checklist](img/verification-checklist.png)

## Checklist
| Check | How |
|---|---|
| **Does it run?** | compile, start it, click through the feature |
| **Does it do what I asked?** | compare against your requirements, line by line |
| **Do the APIs exist?** | every import, function and config option: check docs or jump to definition in the IDE ([[ides/Navigation]]) |
| **Are the versions right?** | APIs from an older major version are the most common mistake |
| **Edge cases?** | empty list, null, 0, very long input, network error, double click |
| **Tests?** | run the existing suite; add a test for the new behaviour; check the tests assert the right thing |
| **Security?** | user input escaped/validated, no secrets in code, SQL parameterised, permissions checked on the server |
| **Dependencies?** | did it add a package? Does it exist, is it maintained, do you need it? |
| **Scope?** | did it change files you didn't ask about? (`git diff --stat`) |
| **Do I understand it?** | if you can't explain it, you can't maintain it. Ask for an explanation or simplify |

## Use the tools you already have
- **Compiler and type checker**: `tsc`, `./gradlew build`. Invented methods fail here.
- **Linter**: ESLint, detekt, IntelliJ inspections.
- **Tests**: `npm test`, `./gradlew test`.
- **`git diff`**: review exactly what changed, and commit before letting an AI touch the code so you can go back ([[git/Undoing Changes]]).
- **CI**: the same checks on every push ([[github/GitHub Actions]]).

## Invented packages ("slopsquatting")
Models sometimes suggest package names that don't exist. Attackers have registered such names with malicious code. Before installing a suggested package, check it exists on npm/Maven Central, has real downloads, a repository and recent releases.

## Ask the AI to review, too
A second model (or the same one in a fresh chat) reviewing the code with the review template from [[ai-prompting/Prompting for Code]] often finds real issues. It's a useful extra check, not a replacement for yours.

## Red flags
- Code that catches exceptions and does nothing.
- `any`, `!!`, `@SuppressWarnings`, `eslint-disable` added to make errors go away.
- Hard-coded values that should be configuration (URLs, keys, IDs).
- Tests changed to match buggy behaviour.
- Comments claiming something the code doesn't do.
- Very confident explanations of APIs you've never heard of.
