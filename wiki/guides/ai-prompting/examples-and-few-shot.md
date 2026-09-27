# Examples and Few-Shot

Showing is often clearer than telling. **Few-shot prompting** means including a few examples of input → output in the prompt; the model continues the pattern. Zero examples = zero-shot, one = one-shot.

## When examples help most
- A specific **format** (a commit message style, a JSON shape, a table layout).
- A **tone** that's hard to describe ("like this, not like that").
- **Classification** with your own categories.
- **Edge cases**: showing how to handle the tricky input.

## Example: classifying support tickets
```
Classify each customer message as BUG, BILLING, FEATURE or OTHER.
Answer with the label only.

<examples>
Message: "The checkout button does nothing on my iPhone."
Label: BUG

Message: "Why was I charged twice this month?"
Label: BILLING

Message: "Could you add a dark mode?"
Label: FEATURE
</examples>

Message: "The invoice PDF shows the wrong VAT number."
Label:
```
The examples define the labels better than a definition would, and "Label: " primes the answer format.

## Tips
- **Make examples diverse**: if all examples are short, answers will be short; if all are about shoes, the model may over-fit to shoes. Cover the variety you expect.
- **Include a tricky case**: e.g. a message that is both a bug and a billing issue, labelled the way you want.
- **Keep examples correct**: the model copies mistakes in examples faithfully.
- **Mark them clearly** (`<examples>` tags, "Example 1:"), so the model doesn't treat them as the actual task.
- **Three to five** examples is usually plenty; more costs tokens with diminishing returns.

## Example-driven code requests
```
Write the other two methods in the same style as the first.

fun Money.format(): String = "%d,%02d €".format(cents / 100, cents % 100)

// TODO: fun Money.plus(other: Money): Money
// TODO: fun Money.times(factor: Int): Money
```
Showing one finished piece of code communicates naming, style, error handling and formatting at once. Copilot-style inline completion works exactly like this: it continues the patterns it sees in your file.

## Examples vs templates
If you find yourself pasting the same examples every time, move them into project instructions or a saved prompt ([[ai-prompting/Project Instructions]], [[ai-prompting/Prompt Library]]).
