# Techniques

**Eight moves that reliably improve answers.** They're recommended in the prompting guides of Anthropic, OpenAI and Google alike, and they work because each removes a guess.

## 1. Give it the real material
Paste the full error, the file, the versions. **Don't describe code: show it.** "I have a function that sums prices but it's wrong" leaves the model guessing; the function itself doesn't.

## 2. Show one example
An input and the output you want beats a paragraph of description:
```
Turn product names into URL slugs.
Example: "Café Crème (500 ml)" -> "cafe-creme-500-ml"
Now: "Äpfel & Birnen – Bio"
```
More on examples: [[ai-prompting/Examples and Few-Shot]].

## 3. Say what done looks like
"Tests pass, no new dependencies, works on mobile." Without a definition of done, the model decides when it's finished, and so decides what you get.

## 4. Ask for a plan first
"Outline the steps and wait for my OK before writing code." Reviewing a 10-line plan is much faster than reviewing 300 lines of code built on a wrong assumption. Especially important with agents ([[ai-prompting/Coding Agents]]).

## 5. Break big tasks down
One component, one function, one step per message. "Build me an online shop" produces a shallow demo; "Now add the cart, using the Product type from before" produces something you can build on.

## 6. Let it ask questions
"Ask me anything unclear before you start." Models tend to fill gaps with assumptions; inviting questions surfaces them. (If it asks nothing, it probably assumed; ask it to list its assumptions.)

## 7. Specify the format
A table, JSON, a single file, three bullet points, "only the changed function". See [[ai-prompting/Structured Output]].

## 8. Ask it to check itself
"Review your answer for edge cases and bugs." or "Check each step against the requirements above." A second pass catches a surprising amount: off-by-one errors, missed requirements, unhandled nulls. Not a replacement for running the code.

## Bonus moves
- **Give it a role** when expertise or tone matters: "You're a senior Java developer reviewing a junior's code; be encouraging but precise." ([[ai-prompting/System Prompts]])
- **Tell it what to do, not only what not to do**: "Write in plain prose paragraphs" works better than "don't use bullet points".
- **Explain why** a constraint exists: "Keep it under 60 characters, because it's a Git commit subject" lets it make good judgement calls in edge cases.
- **Use delimiters** for pasted material: `<code>…</code>`, triple backticks, headings.
- **Allow uncertainty**: "If you're not sure, say so rather than guessing." ([[ai-prompting/Hallucinations]])
- **Put long material first, the question last** when pasting large documents.

## What doesn't help much
Threats, bribes ("I'll tip $200"), ALL CAPS, or repeating "be very careful" instead of saying what careful means. Modern models respond to clear, specific instructions, not pressure.
