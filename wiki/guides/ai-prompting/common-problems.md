# Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| generic, textbook answer | not enough context | add your stack, versions, goal and audience ([[ai-prompting/Anatomy of a Prompt]]) |
| code uses an old API | no version given; training data skewed to older versions | state versions; paste the current docs page |
| invented function / package / flag | hallucination | give it the real docs; verify ([[ai-prompting/Hallucinations]]) |
| rewrites more than asked | no scope | "change only X, keep everything else exactly as it is" |
| way too long | no length limit | "max 100 words", "code only", "3 bullet points" |
| ignores an instruction | buried in a long prompt, or contradicted elsewhere | move it to the start or near the question; remove contradictions; explain why it matters |
| forgets things from earlier | long conversation, context compacted or diluted | new chat with a short summary; project instructions for standing rules ([[ai-prompting/Tokens and Context]]) |
| goes in circles on a bug | wrong assumption early on, or missing evidence | new chat; paste full error; ask for hypotheses ([[ai-prompting/Debugging with AI]]) |
| "fixes" by weakening tests or catching errors | goal stated as "make it pass" | "don't change the tests; fix the cause; if the test is wrong, explain" |
| JSON has extra text around it | format not strict enough | "JSON only"; use structured-output mode; validate ([[ai-prompting/Structured Output]]) |
| inconsistent answers each time | randomness, ambiguous prompt | make the prompt specific; lower temperature (API); add an example |
| agrees with everything you say | models tend to be agreeable | ask it to argue against, or to list weaknesses; ask neutrally ("is X or Y better?" not "X is better, right?") |
| refuses a harmless request | ambiguous wording that looks risky | explain the context and purpose |
| wrong arithmetic | tokenised numbers, no calculation | ask for code or a formula; check ([[ai-prompting/Letting It Think]]) |
| agent says "done" but it doesn't work | no way to verify | give it test/build commands; review the diff yourself ([[ai-prompting/Coding Agents]]) |
| answer in the wrong language | mixed signals | "Answer in German" in instructions |
