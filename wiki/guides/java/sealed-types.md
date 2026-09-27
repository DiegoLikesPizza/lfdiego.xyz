# Sealed Types

A **sealed** class or interface lists exactly which types may extend it. Combined with records and pattern matching, the compiler can check that you handled **every** case. Final since Java 17.

## Declaring
```java
sealed interface Shape permits Circle, Square, Rect {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}
record Rect(double w, double h) implements Shape {}
```
- Permitted subtypes must be `final` (records are), `sealed` themselves, or `non-sealed` (open again).
- If all subtypes are in the same file, `permits` can be omitted.
- Anyone else trying `implements Shape` gets a compile error.

## Exhaustive switch
```java
static double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square s -> s.side() * s.side();
        case Rect(double w, double h) when w == h -> w * w;
        case Rect(double w, double h) -> w * h;
    };  // no default: the compiler knows every case
}
```
```
3.14 4.00 6.00
```
(`code/java/Switches.java`.) Add `record Triangle(...) implements Shape` and this switch **stops compiling** until you handle triangles. With a `default` branch, you'd silently get wrong results instead. So: **don't add `default` to switches over sealed types.**

## Modelling states and results
Sealed types shine for "one of these, each with different data":
```java
sealed interface PaymentResult permits Paid, Declined, NeedsVerification {}
record Paid(String transactionId) implements PaymentResult {}
record Declined(String reason) implements PaymentResult {}
record NeedsVerification(String redirectUrl) implements PaymentResult {}

String message = switch (result) {
    case Paid p -> "Thanks! Order confirmed (" + p.transactionId() + ")";
    case Declined(String reason) -> "Payment declined: " + reason;
    case NeedsVerification(String url) -> "Please confirm at " + url;
};
```
Compared with a single class full of nullable fields (`transactionId` only set if paid, `reason` only if declined…), every state carries exactly its data, and callers can't forget a state.

Other good fits: UI states (Loading / Loaded / Error), commands and events, parse results, AST nodes.

## Sealed vs enum
| Enum | Sealed interface + records |
|---|---|
| fixed set of **instances** | fixed set of **types** |
| all constants have the same fields | each type has its own fields |
| `Size.SMALL` | `new Declined("card expired")` |

## The same idea elsewhere
Kotlin has `sealed class`/`sealed interface` with `when` ([[kotlin/Classes and Objects]]); TypeScript uses discriminated unions ([[javascript/TypeScript]]). Functional languages call them algebraic data types.
