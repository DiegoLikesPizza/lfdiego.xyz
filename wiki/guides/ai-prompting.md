# AI Prompting

How to get useful, correct results from AI assistants and coding agents like Claude, ChatGPT, Gemini and GitHub Copilot. The short version: **the model only knows what you tell it**, so give it the context, a clear task, the constraints and the format you need, then check the result.

> Tokenizer output on these pages is real (`code/ai-prompting/tokens.py`, OpenAI's `o200k_base` tokenizer; other models' tokenizers differ in detail). The output validator in `code/ai-prompting/validate-output.mjs` ran on Node 22. Model **answers** shown as examples are illustrative: the same prompt gives different wording every time and across models.

![What the model sees on every turn](ai-prompting/img/context-window.png)

## Learning path
| Step | Read | You'll be able to… |
|---|---|---|
| 1 | [[ai-prompting/How Models Read]] · [[ai-prompting/Tokens and Context]] | understand what the model actually sees |
| 2 | [[ai-prompting/Anatomy of a Prompt]] · [[ai-prompting/Before and After]] · [[ai-prompting/Techniques]] | write prompts that land the first time |
| 3 | [[ai-prompting/Examples and Few-Shot]] · [[ai-prompting/System Prompts]] · [[ai-prompting/Structured Output]] · [[ai-prompting/Letting It Think]] | shape answers precisely |
| 4 | [[ai-prompting/The Loop]] · [[ai-prompting/Common Problems]] | iterate instead of starting over |
| 5 | [[ai-prompting/Prompting for Code]] · [[ai-prompting/Debugging with AI]] · [[ai-prompting/Reviewing AI Code]] | use AI as a programming partner |
| 6 | [[ai-prompting/Hallucinations]] · [[ai-prompting/Privacy and Safety]] | know when not to trust it, and what not to paste |
| 7 | [[ai-prompting/Coding Agents]] · [[ai-prompting/How Agents Work]] · [[ai-prompting/Project Instructions]] | work with agents that edit your code |
| 8 | [[ai-prompting/Choosing a Model and Tool]] · [[ai-prompting/Prompt Library]] | pick the right tool, reuse good prompts |

Quick lookups: [[ai-prompting/Cheat Sheet]], [[ai-prompting/Glossary]].

## The five parts of a strong prompt
**Context** (who you are, what exists) · **Task** (one clear verb) · **Constraints** (what "good" means) · **Format** (the shape you need) · **Example** (one concrete sample). → [[ai-prompting/Anatomy of a Prompt]]

## One rule above all
**You're responsible for what you use.** Read it, run it, test it, and don't paste secrets or other people's data into a prompt.
