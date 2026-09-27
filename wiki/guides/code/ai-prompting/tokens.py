"""Shows how a real tokenizer splits text. pip install tiktoken

o200k_base is the tokenizer of OpenAI's GPT-4o family. Other models (Claude, Gemini, Llama)
use their own tokenizers, so exact counts differ, but the patterns are the same."""
import tiktoken

enc = tiktoken.get_encoding("o200k_base")
samples = [
    "Unbelievably, tokenization isn't magic.",
    "Hello world",
    "Hallo Welt, wie geht es dir?",
    "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz",
    "const total = items.reduce((sum, i) => sum + i.price, 0);",
    "1234567890",
    "    return x;",
    "🙂👍",
]
for s in samples:
    ids = enc.encode(s)
    print(len(s), "chars ->", len(ids), "tokens:", [enc.decode([i]) for i in ids])
