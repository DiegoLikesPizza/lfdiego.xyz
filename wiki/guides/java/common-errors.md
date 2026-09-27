# Common Errors

Compiler and runtime messages, exactly as JDK 25 prints them (files in `code/java/errors/`). Paste a message into the search to land here.

## Compiler errors (`javac`)
Read the **first** error first: later ones are often consequences. The line number and the `^` caret point at where the compiler got confused, which is sometimes one line after the real mistake.

### `';' expected`
```
Cart.java:11: error: ';' expected
        int sum = 0
                   ^
```
Missing semicolon at the end of the statement.

### `cannot find symbol`
```
Cart2.java:8: error: cannot find symbol
        undefinedMethod();
        ^
  symbol:   method undefinedMethod()
  location: class Cart2
```
Typo in a name, a missing import, a variable used outside its scope, or a method that doesn't exist on that type. The `symbol:` line says what the compiler was looking for.

### `incompatible types`
```
Cart2.java:5: error: incompatible types: String cannot be converted to int
        int sum = "0";
                  ^
Cart2.java:7: error: incompatible types: int cannot be converted to String
        String label = total(prices);
                            ^
```
Convert explicitly: `Integer.parseInt("0")`, `String.valueOf(total)`. Also appears as `possible lossy conversion from double to int` (needs a cast).

### `cannot assign a value to final variable`
```
Cart2.java:10: error: cannot assign a value to final variable max
        max = 4;
        ^
```

### `missing return statement`
```
Cart5.java:4: error: missing return statement
    }
    ^
```
Some path through the method doesn't return a value (here: when `b` is false).

### `unreachable statement`
```
Cart3.java:11: error: unreachable statement
        System.out.println("never");
        ^
```
Code after `return`, `throw`, `break` or an endless loop.

### `variable x might not have been initialized`
```
Cart3.java:15: error: variable x might not have been initialized
        System.out.println(x);
                           ^
```
Local variables have no default value; assign one on every path.

### `unreported exception …; must be caught or declared to be thrown`
```
Cart3.java:7: error: unreported exception IOException; must be caught or declared to be thrown
        return Files.readString(Path.of("cart.txt"));
                               ^
```
A checked exception: wrap in `try/catch` or add `throws IOException` to the method. → [[java/Exceptions]]

### `non-static variable … cannot be referenced from a static context`
```
Cart4.java:7: error: non-static variable count cannot be referenced from a static context
        count++;
        ^
```
Usually in `main`. Create an object and call instance methods on it. → [[java/Classes and Objects]]

### `class X is public, should be declared in a file named X.java`
```
Shop.java:1: error: class Checkout is public, should be declared in a file named Checkout.java
public class Checkout { }
       ^
```

### `local variables referenced from a lambda expression must be final or effectively final`
Don't reassign variables used in a lambda. → [[java/Lambdas and Functional Interfaces]]

### `unchecked call … as a member of the raw type`
A warning: you used `List` instead of `List<String>`. → [[java/Generics]]

## Runtime exceptions
All from `code/java/errors/RuntimeErrors.java`:
| Exception and message | Cause | Fix |
|---|---|---|
| `NullPointerException: Cannot invoke "String.length()" because "s" is null` | calling a method on `null` | find why it's null ([[java/References and Memory]]), return `Optional`/empty collections |
| `ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` | index ≥ length (or < 0) | `i < a.length`, not `<=`; for-each loops |
| `IndexOutOfBoundsException: Index: 5 Size: 2` | same, for a list | check `size()` |
| `NumberFormatException: For input string: "12.5"` | `Integer.parseInt` on non-integer text | validate input; `Double.parseDouble`; trim spaces |
| `ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer …` | wrong cast | pattern matching `instanceof`; avoid raw types |
| `ArithmeticException: / by zero` | integer division by 0 | check the divisor |
| `UnsupportedOperationException: null` | modifying `List.of(…)` or another immutable collection | `new ArrayList<>(…)` ([[java/Collections]]) |
| `ConcurrentModificationException: null` | removing from a list while iterating it | `removeIf`, iterator `remove()` |
| `NoSuchElementException: null` | `next()` on an empty iterator, `Optional.get()` on empty | check `hasNext()`, `orElse…` ([[java/Optional]]) |
| `IllegalArgumentException: duplicate key: a` | `Map.of` with a key twice | fix the data ([[java/Maps and Hashing]]) |
| `StackOverflowError: null` | endless recursion | base case; iterate instead |
| `OutOfMemoryError: Java heap space` | too much data kept alive, or heap too small | fix the leak or raise `-Xmx` ([[java/Garbage Collection]]) |
| `IllegalStateException: stream has already been operated upon or closed` | reusing a stream | create a new one ([[java/Streams]]) |
| `DateTimeParseException: Text '2026-02-30' could not be parsed…` | invalid date or wrong pattern | [[java/Date and Time]] |

## Launch errors
### `Error: Could not find or load main class NoSuchMain`
```
Error: Could not find or load main class NoSuchMain
Caused by: java.lang.ClassNotFoundException: NoSuchMain
```
Wrong class name, missing package prefix (`java shop.Main`), wrong classpath (`-cp`), or `java Hello.class` instead of `java Hello`.

### `UnsupportedClassVersionError … class file version 69.0 … only recognizes class file versions up to 65.0`
Compiled with a newer JDK (69 = Java 25) than the one running it (65 = Java 21). Run with the newer JDK or compile with `--release`. → [[java/How Java Runs]]

| Class file version | 52 | 55 | 61 | 65 | 69 | 71 |
|---|---|---|---|---|---|---|
| Java | 8 | 11 | 17 | 21 | 25 | 27 |

### `java: command not found` / `'java' is not recognized`
JDK not installed or not on `PATH`. → [[java/Installing the JDK]]

## Build errors
| Message | Fix |
|---|---|
| `Could not resolve org.junit:junit-bom:5.13.4` … `Received status code 429` | Maven Central rate-limited you: retry later, or use a mirror/cache |
| `Could not find org.example:lib:1.0` | typo in coordinates, or the repository isn't declared |
| `Unsupported class file major version 69` (Gradle) | Gradle too old for the JDK running it: update the wrapper or use a toolchain ([[java/Build Tools]]) |
| `./gradlew: Permission denied` | `chmod +x gradlew` |
| `There were failing tests. See the report at: …` | open the HTML report ([[java/Testing with JUnit]]) |
