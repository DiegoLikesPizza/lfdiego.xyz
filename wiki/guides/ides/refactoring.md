# Refactoring

**Change structure safely: the IDE updates every reference.** Refactorings are code transformations that keep behaviour the same. Because the IDE understands the code, it can rename a method across 200 files without touching a string that just happens to contain the same word.

## Example: extract method
Before: one method doing three things.
```java
double checkout(Cart cart) {
    double total = 0;
    for (Item item : cart.items()) {
        total += item.price() * item.qty();
    }
    if (cart.hasCoupon()) total *= 0.9;
    return total;
}
```
Select the loop, <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd>, name it `subtotal`; select the coupon line, extract again:
```java
double checkout(Cart cart) {
    double total = subtotal(cart);
    return applyCoupon(cart, total);
}

private double subtotal(Cart cart) { ... }
private double applyCoupon(Cart cart, double total) { ... }
```
The IDE figured out the parameters and return values. IntelliJ also offers to replace **other** identical code fragments with a call to the new method.

## The refactorings
| Refactoring | What it does | IntelliJ IDEA | VS Code |
|---|---|---|---|
| **Refactor this…** | menu of every refactoring that applies here | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> |
| **Rename** | rename a symbol and all its references (also files, getters, tests) | <kbd>Shift</kbd>+<kbd>F6</kbd> | <kbd>F2</kbd> |
| **Extract method / function** | turn selected lines into a new method | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd> | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| **Extract variable** | name a sub-expression | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| **Extract constant** | replace a magic number with a named constant | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>C</kbd> | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| **Extract parameter / field** | turn a local into a parameter / field | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd> / <kbd>F</kbd> | – |
| **Inline** | the opposite of extract | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>N</kbd> | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| **Change signature** | add, remove or reorder parameters everywhere | <kbd>Ctrl</kbd>+<kbd>F6</kbd> | – |
| **Move** | move a class or function to another file/package | <kbd>F6</kbd> | move a TS symbol via <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| **Safe delete** | delete only if unused (or show usages) | <kbd>Alt</kbd>+<kbd>Delete</kbd> | – |
| **Introduce type / interface** | extract an interface from a class | via *Refactor this* | TS: *Extract to type alias* |

VS Code's refactorings come from the language server; TypeScript's are good, Java's (via the Java extension pack) cover the basics.

## Refactor on a clean working tree
**Commit first.** Then a big rename is one reviewable diff, and if it goes wrong, `git restore .` undoes it completely. Keep refactoring commits separate from behaviour changes: reviewers can skim "Rename total() to subtotalCents()" and focus on the real change ([[git/Commit Messages]]).

## Refactoring safely
- **Tests first**: refactoring means "same behaviour", and tests prove it ([[ides/Testing in the IDE]]).
- **Preview** big changes: IntelliJ shows a preview for renames with text occurrences (in comments, strings); review before applying.
- **Reflection and configuration**: names used in strings (Spring `@Value("${…}")`, JSON field names, SQL, JavaScript `obj["name"]`) can't always be found. Search for text too.
- **Public APIs**: renaming something other projects use breaks them; deprecate first.

## Everyday micro-refactorings
Many small improvements are quick fixes (<kbd>Alt</kbd>+<kbd>Enter</kbd>): convert `if-else` to `switch`, invert `if`, split declaration, replace loop with stream, convert to record, add `final`, introduce a local variable for a repeated call. Accepting these as you go keeps code clean with little effort.

Refactoring as a discipline: Martin Fowler's book *Refactoring* names and explains these moves.
