# Choosing a Model and Tool

**Match the tool to the job.** Names and rankings change every few months; the categories stay stable. Check current docs for exact model names and limits.

## Kinds of tools
| Tool type | Examples | Best for |
|---|---|---|
| **chat apps** | Claude, ChatGPT, Gemini, Le Chat, Copilot Chat | questions, explanations, writing, single functions, learning |
| **IDE assistants** (inline completion + chat) | GitHub Copilot, JetBrains AI Assistant, Cursor | completing code as you type, quick edits in context ([[ides/AI in the IDE]]) |
| **coding agents** | Claude Code, Copilot agent mode, Codex, Cursor agent, Gemini CLI, Junie | multi-file changes, running tests, fixing CI ([[ai-prompting/Coding Agents]]) |
| **APIs** | Anthropic, OpenAI, Google, Mistral | building AI features into your own software |
| **local models** | Llama, Mistral, Qwen, Gemma via Ollama or LM Studio | offline use, sensitive data that must not leave your machine, experiments |

## Model sizes
Providers usually offer a family: a **large** model (most capable, slower, pricier), a **medium** one (good balance, often the default) and a **small/fast** one (cheap, quick, good for simple tasks and high volume).
- Hard bug, architecture, long analysis → largest model, thinking mode on ([[ai-prompting/Letting It Think]]).
- Everyday coding and writing → the default.
- Classification, short extraction, autocomplete → small and fast.

## What to compare
- **Quality on your tasks**: try the same 3–5 real prompts on the candidates. Benchmarks are a rough guide at best.
- **Context window** if you work with large files or documents.
- **Tools**: web search, code execution, file uploads, integrations (MCP).
- **Data handling**: training opt-out, retention, EU hosting, business terms (AVV) ([[ai-prompting/Privacy and Safety]]).
- **Price and limits**: subscriptions vs pay-per-token.
- **What your employer or school allows.** This often decides it.

## Local models
Tools like **Ollama** make running open-weight models easy (`ollama run llama3.2`). Smaller local models are clearly weaker than frontier cloud models, need a decent GPU or Apple Silicon with enough RAM for anything larger, but keep data on your machine.

## Don't overthink it
The difference between a good and a bad prompt is usually bigger than the difference between two current top models. Pick one, learn it well, and switch when you hit a real limit.
