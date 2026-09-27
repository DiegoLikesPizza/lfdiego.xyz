# Structured Output

**Separate instructions from data, and ask for a shape.** When you paste a document or code, fence it off so the model can't confuse it with your instructions. When code will process the answer, specify the exact format, and validate it anyway.

## Tag the parts of a prompt
```
Extract every action item from the meeting notes below.

<notes>
Ada will send the Q3 numbers by Friday.
We agreed to move the launch to 14 October.
Grace to check whether the EU servers are ready.
</notes>

<format>
Return JSON only, matching:
[{ "owner": string, "task": string, "due": string | null }]
</format>
```
A typical answer (illustrative):
```json
[
  { "owner": "Ada", "task": "Send the Q3 numbers", "due": "Friday" },
  { "owner": "Grace", "task": "Check EU server readiness", "due": null }
]
```
The launch move isn't an action item with an owner, so a good answer leaves it out. If you want decisions too, ask for them in a separate field.

## Why tags help
- Clear boundaries (`<notes>`, `<code>`, `<example>`, `<error>`) stop pasted text being read as instructions. If the notes said "ignore the above", the tags make it obvious that's data.
- You can refer to parts by name: "use only facts from `<notes>`".
- Any tag name works; there are no magic tags. Markdown headings or triple backticks work too. Consistency matters more than the syntax.

## Give the schema
Field names, types, allowed values, and **what to use when a value is missing** (`null`, not an empty string or a guess). Add one example object if the shape is non-obvious.

For formats other than JSON:
- "A Markdown table with columns: Name, Risk (low/medium/high), Reason."
- "CSV with a header row, semicolon separated."
- "Only the code block, no explanation before or after."

## Validate anyway
Even a clear prompt occasionally gets "Sure! Here are the action items: …" or a missing field. If code consumes the output, **parse and check it**. `code/ai-prompting/validate-output.mjs` is a dependency-free validator; real output on Node 22:
```
{
  ok: true,
  data: [
    { owner: 'Ada', task: 'Send the Q3 numbers', due: 'Friday' },
    { owner: 'Grace', task: 'Check EU server readiness', due: null }
  ]
}
{
  ok: false,
  error: `not JSON: Unexpected token 'S', "Sure! Here"... is not valid JSON`
}
{ ok: false, error: 'item 0: task must be a non-empty string' }
```
In a real project use a schema library (Zod in TypeScript, kotlinx.serialization or Jackson with validation on the JVM). On failure, retry once with the error message ("Your answer failed validation: … Return corrected JSON only."), then fail loudly.

## Strict structured-output modes
The major APIs (Anthropic, OpenAI, Google) can **constrain** the output to a JSON schema you supply, so it's guaranteed to parse. Use it when you build features on a model. It guarantees the *shape*, not that the *content* is right ("due": "Friday" might still be the wrong Friday).

## Tool calls are structured output too
When a model "calls a function" ([[ai-prompting/How Agents Work]]), it produces JSON arguments matching the tool's schema. Same rules: validate before acting, especially before anything that changes data.
