# Switch and Pattern Matching

Modern Java's `switch` is an **expression** that returns a value, has no fall-through, and can match on types and record structure. Output from `code/java/Switches.java`.

## Switch expressions (Java 14+)
```java
static String label(int count) {
    return switch (count) {
        case 0 -> "none";
        case 1, 2, 3 -> "a few";
        default -> "many";
    };
}
```
```
none, a few, many
```
- `->` arms don't fall through; no `break` needed.
- Several labels per case: `case 1, 2, 3`.
- Works on `int`, `char`, `String`, enums, and (with patterns) any type.

### Blocks and `yield`
```java
static int daysIn(String month) {
    return switch (month) {
        case "FEB" -> 28;
        case "APR", "JUN", "SEP", "NOV" -> 30;
        default -> {
            if (month.length() != 3) throw new IllegalArgumentException(month);
            yield 31;
        }
    };
}
```
```
28 30 31
```

### The old switch statement
```java
switch (day) {
    case "SAT":
    case "SUN":
        weekend = true;
        break;              // forget this and execution "falls through" into the next case
    default:
        weekend = false;
}
```
Still valid, but prefer the arrow form: fewer bugs.

## Pattern matching for `instanceof` (Java 16+)
```java
Object shape = new Circle(2);
if (shape instanceof Circle c && c.r() > 1) {
    System.out.println("big circle, radius " + c.r());
}
```
```
big circle, radius 2.0
```
No cast needed: `c` is already a `Circle`, and only in scope where the test succeeded.

## Type patterns in switch (Java 21+)
```java
static String describe(Object o) {
    return switch (o) {
        case null -> "null!";
        case Integer n when n > 100 -> "big int " + n;     // guard with "when"
        case Integer n -> "int " + n;
        case String s -> "string of length " + s.length();
        default -> "something else: " + o.getClass().getSimpleName();
    };
}
```
```
int 42 | big int 500 | string of length 2 | something else: Double | null!
```
- Cases are checked top to bottom; more specific ones first (the compiler rejects a case that can never match).
- `case null` handles null; without it, a null throws `NullPointerException`.

## Record patterns and exhaustiveness
With a **sealed** hierarchy, the compiler knows every possible subtype, so a switch needs no `default`:
```java
sealed interface Shape permits Circle, Square, Rect {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}
record Rect(double w, double h) implements Shape {}

static double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square s -> s.side() * s.side();
        case Rect(double w, double h) when w == h -> w * w;   // record pattern + guard
        case Rect(double w, double h) -> w * h;
    };  // no default: the compiler knows every case
}
```
```
3.14 4.00 6.00
```
`Rect(double w, double h)` **deconstructs** the record into its components. Add a fourth shape and every switch without it stops compiling, which is exactly what you want. → [[java/Sealed Types]]

## Text blocks (Java 15+)
Not switch, but part of the same "modern syntax" wave: multi-line strings without escaping.
```java
String json = """
    { "name": "Ada",
      "role": "admin" }
    """;
```
```
{ "name": "Ada",
  "role": "admin" }
```
Indentation is removed up to the closing `"""`.

## Primitive patterns
Patterns on primitive types (`case int i when i > 0`) are a preview feature in Java 23–27; see the [Java 27 wiki](https://lfdiego.xyz/wiki/java27/).
