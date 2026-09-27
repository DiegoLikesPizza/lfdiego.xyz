# Glossary

| Term | Meaning |
|---|---|
| **LLM** | large language model: a model trained on text to predict what comes next |
| **token** | the unit models read and write: a word, part of a word, or a symbol ([[ai-prompting/Tokens and Context]]) |
| **tokenizer** | the component that splits text into tokens; differs per model family |
| **context window** | the maximum number of tokens a model can consider at once |
| **prompt** | the input you give the model |
| **system prompt** | standing instructions that apply to the whole conversation ([[ai-prompting/System Prompts]]) |
| **temperature** | a setting for how random or deterministic outputs are |
| **hallucination** | a confident but false or invented output ([[ai-prompting/Hallucinations]]) |
| **knowledge cutoff** | the point after which the model's training data has no information |
| **zero-/few-shot prompting** | giving no / a few examples of the input and output you want ([[ai-prompting/Examples and Few-Shot]]) |
| **chain of thought** | having the model reason through intermediate steps |
| **extended thinking / reasoning mode** | a model mode that reasons internally before answering ([[ai-prompting/Letting It Think]]) |
| **structured output** | responses constrained to a format like JSON matching a schema ([[ai-prompting/Structured Output]]) |
| **tool use / function calling** | the model requesting a function call (search, code execution, APIs) that the app runs |
| **agent** | a model running in a loop, using tools to reach a goal ([[ai-prompting/How Agents Work]]) |
| **MCP** | Model Context Protocol: an open standard for connecting AI apps to tools and data |
| **RAG** | retrieval-augmented generation: fetching relevant documents into the prompt before answering |
| **embedding** | a list of numbers representing meaning, used for semantic search |
| **fine-tuning** | further training a model on specific examples |
| **compaction** | summarising older context so a long session fits in the window |
| **prompt injection** | instructions hidden in data the model reads, trying to hijack it ([[ai-prompting/Privacy and Safety]]) |
| **grounding** | making the model answer from provided sources rather than memory |
| **prompt caching** | reusing an unchanged prompt prefix across requests to save cost and time |
| **open-weight model** | a model whose weights are published, so you can run it yourself |
| **multimodal** | a model that handles more than text: images, audio, PDFs |
