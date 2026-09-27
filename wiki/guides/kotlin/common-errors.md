# Common Errors

Compiler errors from **Kotlin 2.4.20** (the K2 compiler) and runtime exceptions, copied from real runs (`code/kotlin/errors/Broken.kt`, `src/main/kotlin/RuntimeErrors.kt`). Gradle prints compiler errors as `e: file:///…/Broken.kt:7:5 message` (line 7, column 5).

## Compiler errors
### `'val' cannot be reassigned.`
```
e: Broken.kt:7:5 'val' cannot be reassigned.
```
Use `var` if it really changes, or compute the value in one expression ([[kotlin/Basics]]).

### `Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.`
```
e: Broken.kt:9:23 Only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.
```
The value may be null. Use `?.`, `?:`, `?.let`, or a null check ([[kotlin/Null Safety]]).

### `Initializer type mismatch: expected 'Int', actual 'String'.` / `Argument type mismatch`
```
e: Broken.kt:10:16 Initializer type mismatch: expected 'Int', actual 'String'.
```
Convert explicitly: `"42".toInt()`, `n.toString()`, `i.toLong()`. Kotlin never widens numbers implicitly.

### `Unresolved reference 'x'.`
```
e: Broken.kt:11:13 Unresolved reference 'undefinedThing'.
e: Broken.kt:13:10 Unresolved reference 'add' on receiver of type 'List<Int>'.
```
A typo, a missing import (extension functions must be imported!), or a method that doesn't exist on that type. The second is a classic: `List` is read-only, use `MutableList` / `mutableListOf()` ([[kotlin/Collections]]).

### `Suspend function '…' can only be called from a coroutine or another suspend function.`
```
e: Broken.kt:14:5 Suspend function 'suspend fun delay(timeMillis: Long): Unit' can only be called from a coroutine or another suspend function.
```
Mark the caller `suspend`, or start a coroutine (`runBlocking` in `main`/tests, a scope elsewhere) ([[kotlin/Coroutines]]).

### `Null cannot be a value of a non-null type 'String'.`
```
e: Broken.kt:15:21 Null cannot be a value of a non-null type 'String'.
```
Declare the type nullable (`String?`) or provide a value.

### `'if' must have both main and 'else' branches when used as an expression.`
```
e: Broken.kt:17:13 'if' must have both main and 'else' branches when used as an expression.
```

### `No value passed for parameter 'email'.`
```
e: Broken.kt:18:5 No value passed for parameter 'email'.
```
Pass it, or give the parameter a default value.

### `'when' expression must be exhaustive.`
```
e: Broken.kt:24:32 'when' expression must be exhaustive. Add the 'is Done' branch or an 'else' branch.
```
Handle the new case; for sealed types, prefer adding the branch over `else` ([[kotlin/Classes and Objects]]).

### `This type is final, so it cannot be extended.`
```
e: Broken.kt:29:15 This type is final, so it cannot be extended.
```
Classes are final by default: add `open` (or use composition).

### `Missing return statement.`
```
e: Broken.kt:33:1 Missing return statement.
```

## Runtime exceptions
```
java.lang.NullPointerException: null
java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 2
java.util.NoSuchElementException: List is empty.
java.lang.IllegalArgumentException: List has more than one element.
java.lang.NumberFormatException: For input string: "12.5"
java.lang.ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer (…)
java.util.NoSuchElementException: Key b is missing in the map.
java.lang.IllegalArgumentException: require failed
java.lang.IllegalStateException: check failed
java.util.ConcurrentModificationException: null
java.lang.ArithmeticException: / by zero
java.lang.IllegalStateException: lazy init failed
```
| Exception | Typical cause | Fix |
|---|---|---|
| `NullPointerException` | `!!` on null, or a Java platform type | remove `!!`; type Java results as nullable |
| `…must not be null` | a null from Java assigned to a non-null type | same ([[kotlin/Java Interop]]) |
| `NoSuchElementException: List is empty.` | `first()`, `last()`, `max()` on an empty list | `firstOrNull()` + `?:` |
| `…List has more than one element.` | `single()` | `firstOrNull()` or fix the data |
| `NumberFormatException` | `"12.5".toInt()` | `toIntOrNull()`, `toDouble()` |
| `ClassCastException` | `x as Int` on something else | `as?` or `is` checks |
| `Key b is missing in the map.` | `getValue` | `map[key] ?: default` |
| `IllegalArgumentException` / `IllegalStateException` | a failed `require` / `check` | the message tells you which rule |
| `ConcurrentModificationException` | removing while iterating | `removeAll { }` / `filter` |
| `UninitializedPropertyAccessException: lateinit property token has not been initialized` | reading a `lateinit` too early | initialise first ([[kotlin/Properties and Delegation]]) |
| `NotImplementedError: An operation is not implemented` | a leftover `TODO()` | implement it |
| `JobCancellationException` in logs | a cancelled coroutine | usually fine; don't catch-and-ignore it ([[kotlin/Structured Concurrency]]) |
