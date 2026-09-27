# Before and After

**Vague in, generic out.** The fix is almost never a magic phrase. It's adding the specifics you already know but didn't write down.

## Refactoring
| Before | After |
|---|---|
| "make my code better" | "Refactor `calculateTotal` in `cart.ts` for readability. Keep the behaviour and the function signature exactly the same. Explain each change in one line." |
| → random renames, changed behaviour, a lecture on best practices | → a focused diff you can review in a minute |

## Explaining
| Before | After |
|---|---|
| "explain git rebase" | "Explain git rebase to someone who already knows commit and merge. Use a 3-commit example and end with when NOT to use it." |
| → a generic essay pitched at nobody in particular | → starts where you are, with an example and a warning |

## Debugging
| Before | After |
|---|---|
| "my app crashes, help" | "My Spring Boot 3.5 app crashes on startup with the stack trace below. It started after I added the `PaymentService` bean. List the likely causes, most likely first, then suggest the smallest fix." + the stack trace + the new class |
| → a checklist of every possible Spring problem | → an answer about *your* crash |

## Writing
| Before | After |
|---|---|
| "write an email to a customer" | "Write a short, friendly e-mail (German, 'Sie') to a bakery owner whose website launch moves from 1 to 8 October because the photos arrived late. Offer a free extra revision. Max 120 words." |
| → a template full of [placeholders] | → an e-mail you can send after a quick read |

## Learning
| Before | After |
|---|---|
| "teach me Kotlin" | "I know Java well. Show me the 10 Kotlin features that change how I write code the most, each with a Java vs Kotlin snippet. Skip syntax I can guess." |
| → a beginner course from `println` | → exactly the delta you need ([[kotlin/Kotlin for Java Developers]]) |

## Code generation
| Before | After |
|---|---|
| "write a login page" | "Write a login form component for our React + TypeScript app using react-hook-form and Zod (already installed). Fields: e-mail, password. Show field errors under inputs. Call `login(email, password)` from `@/lib/auth` and disable the button while it runs. No styling library, plain Tailwind classes." |
| → a full auth system with a made-up backend and a library you don't use | → a component that fits into your project |

## The pattern
Every "after" adds some of:
- **which** thing (file, function, version),
- **what must not change**,
- **who** it's for and what they already know,
- **how long / what shape**,
- **the real material** (error, code, data).

Next: [[ai-prompting/Techniques]] that help across all of these.
