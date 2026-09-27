# Prompt Library

**Everyday prompts, ready to copy.** Fill in the brackets. Coding templates (bug, feature, tests, review, refactor, convert) are in [[ai-prompting/Prompting for Code]].

## Learn a concept
```
Explain [concept] to someone who already knows [related concept].
Use one concrete example, then list 3 common misconceptions.
Finish with 3 short quiz questions, answers at the end.
```

## Understand unfamiliar code
```
Explain what this code does, section by section, for a developer
new to this codebase. Point out anything surprising or risky.

<code>
[paste]
</code>
```

## Write a commit message
```
Write a git commit message for this diff.
Subject: imperative, under 60 characters.
Body: why the change was needed, wrapped at 72 characters.

<diff>
[git diff --staged]
</diff>
```
See [[git/Commit Messages]] for what a good one looks like.

## Summarise a long document
```
Summarise the document below for [audience] in 5 bullet points.
Then list any decisions, deadlines and open questions it mentions.
Quote the exact sentence for each deadline.

<document>
[paste]
</document>
```

## Rewrite for clarity
```
Rewrite this [email / README section] to be clearer and shorter.
Keep every fact and the friendly tone. Don't add new claims.
Show the rewrite, then a bullet list of what you changed.
```

## Stress-test an idea
```
Here's my plan: [plan].
Argue against it as a sceptical expert. List the 5 strongest
objections, how likely each is to matter, and what evidence would
change your mind.
```

## Write a README
```
Write a README.md for this project for [audience].
Sections: what it is (2 sentences), requirements, setup, how to run,
how to test, project structure (short). Use only the commands and
facts below; don't invent any.

<facts>
[package.json scripts, folder list, anything special]
</facts>
```

## Regex with tests
```
Write a regular expression for [pattern] in [language].
Show 5 strings it must match and 5 it must not, and a short test
I can run to check them.
```

## Prepare for an exam / interview
```
I'm preparing for [exam, e.g. the IHK AP1 / a Java job interview].
Ask me one question at a time about [topic], wait for my answer,
then tell me what was right, what was missing, and a follow-up question.
```

## Customer e-mail
```
Write a [friendly / formal] e-mail in [German with "Sie" / English] to
[who] about [situation]. Include: [facts]. Max [n] words.
No placeholders; if something is missing, ask me first.
```

## Compare options
```
Compare [A], [B] and [C] for [use case] in a table:
[criteria 1], [criteria 2], [criteria 3], cost, learning curve.
Then recommend one for [my constraints] in 3 sentences.
Mention what you're unsure about or what may have changed recently.
```
