# Debugging with AI

AI is great at recognising error messages and suggesting likely causes. It's bad at guessing what you didn't show it. The workflow: **give the full evidence, ask for hypotheses, test the most likely, report back.**

## 1. Collect the evidence
- The **full** error message and stack trace (not "it says something about null").
- The code at the lines the stack trace points to, plus what calls it.
- What you did (steps), what you expected, what happened.
- What changed recently ("started after I upgraded to Next.js 16").
- Versions: language, framework, OS, browser if relevant.

Trim huge logs to the relevant part: the first error, and 20 lines of context around it. The first error is usually the cause; later ones are often consequences.

## 2. Ask for hypotheses, not a patch
```
Here's the error and the code. Don't fix anything yet.
List the 3 most likely causes, most likely first, and for each
tell me how to confirm or rule it out.
```
A model asked for a fix will produce one, even for the wrong problem. Hypotheses plus a way to test them keep you in control and teach you the debugging process.

## 3. Test and report back
```
Hypothesis 1 ruled out: I logged `user` right before the call and it's
not null. Hypothesis 2 confirmed: the request runs before the session
is loaded. Here's the order of log lines: … What's the smallest fix?
```

## Example: a real error from this wiki
The stack trace from [[java/Exceptions]], pasted with the code:
```
My Java 25 program crashes. Error and code below.
List likely causes, then the smallest fix.

<error>
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.toUpperCase()" because "customer" is null
	at Exceptions.greet(Exceptions.java:85)
	at Exceptions.checkout(Exceptions.java:84)
	at Exceptions.main(Exceptions.java:81)
</error>
<code>
static void checkout(String customer) { greet(customer); }
static void greet(String customer) { System.out.println("Hello " + customer.toUpperCase()); }
// main: checkout(null);
</code>
```
The **helpful NullPointerException** message already names the null variable, and the stack trace shows the path (`main` → `checkout` → `greet`). A good answer asks where `null` came from, not how to silence it: validate at the entry point or make the parameter non-nullable, instead of wrapping `toUpperCase()` in a null check deep inside ([[java/Common Errors]]).

## Good questions to ask
- "What does this error message mean, in plain words?"
- "Which line in my code is the stack trace pointing to?"
- "What would I log/print to narrow this down?"
- "Is this a problem in my code or in the library?"
- "Write a minimal reproduction I can run."

## Watch out for
- **Fixes that hide the symptom**: catching and ignoring the exception, adding `!!`/`?` everywhere, `// @ts-ignore`, `--force` installs. Ask "why does this happen?" before "make it go away".
- **Version mismatches**: a fix for React 17 applied to React 19, a Gradle Groovy snippet in a Kotlin DSL build. State versions.
- **Invented config options**: verify flags and settings against the official docs ([[ai-prompting/Hallucinations]]).
- **Rubber-duck value**: often, writing the full bug report for the AI makes the answer obvious before you send it. That's a feature.
