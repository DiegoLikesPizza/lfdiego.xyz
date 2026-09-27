# Error Handling

Kotlin uses exceptions like Java, but has **no checked exceptions**, treats `try` as an expression, and adds `Result`/`runCatching` for functional-style handling. Output from `code/kotlin/src/main/kotlin/ErrorHandling.kt`.

## try / catch / finally
```kotlin
class OutOfStockException(sku: String) : RuntimeException("Out of stock: $sku")

fun order(sku: String): String {
    val left = stock[sku] ?: throw IllegalArgumentException("Unknown product $sku")
    if (left == 0) throw OutOfStockException(sku)
    return "ordered $sku"
}

for (sku in listOf("CAKE", "PIE")) {
    try {
        println(order(sku))
    } catch (e: OutOfStockException) {
        println("caught: ${e.message}")
    } catch (e: IllegalArgumentException) {
        println("caught: ${e.message}")
    } finally {
        println("  finally for $sku")
    }
}
```
```
ordered TEA
caught: Out of stock: CAKE
  finally for CAKE
caught: Unknown product PIE
  finally for PIE
```

## No checked exceptions
Nothing forces you to catch `IOException`, but Java code still throws it:
```
Kotlin has no checked exceptions, but Java code still throws: FileNotFoundException
```
Decide consciously where to handle I/O errors. When Java code calls your Kotlin function and should know about an exception, annotate it with `@Throws(IOException::class)` ([[kotlin/Java Interop]]).

## require, check, error
```kotlin
fun parseAge(input: String): Int {
    val age = input.toIntOrNull()
    requireNotNull(age) { "not a number: $input" }
    require(age in 0..150) { "age out of range: $age" }
    return age
}
```
```
check: connection is closed
error(): something impossible happened
TODO() would throw: kotlin.NotImplementedError: An operation is not implemented: write this later
```
| Function | Throws | Use for |
|---|---|---|
| `require` / `requireNotNull` | `IllegalArgumentException` | invalid arguments |
| `check` / `checkNotNull` | `IllegalStateException` | invalid state ("connection is closed") |
| `error(msg)` | `IllegalStateException` | "can't happen" branches |
| `TODO()` | `NotImplementedError` | placeholders during development |

## runCatching and Result
```kotlin
listOf("36", "abc", "200").map { runCatching { parseAge(it) } }
```
```
[Success(36), Failure(java.lang.IllegalArgumentException: not a number: abc), Failure(java.lang.IllegalArgumentException: age out of range: 200)]
```
```kotlin
val age = runCatching { parseAge("abc") }.getOrElse { -1 }
runCatching { parseAge("42") }.onSuccess { println("ok $it") }.onFailure { println("failed $it") }
runCatching { parseAge("x") }.map { it * 2 }.recover { 0 }
```
```
getOrElse -> -1
ok 42
Success(0)
```
`Result` is handy at boundaries (parsing a batch, calling a flaky API). Caveats:
- `runCatching` also catches `CancellationException`, which breaks coroutine cancellation ([[kotlin/Structured Concurrency]]): rethrow it, or don't use `runCatching` around `suspend` calls.
- For domain errors that callers must handle, a **sealed** result type is more explicit (`sealed interface PaymentResult { … }`, [[kotlin/Classes and Objects]]).

## Nullable instead of exceptions
Many standard functions come in pairs: `toInt()` / `toIntOrNull()`, `first()` / `firstOrNull()`, `getValue()` / `get()`. Returning `null` plus `?:` is often cleaner than exceptions for expected "not found" cases:
```kotlin
val text = File("does-not-exist.txt").takeIf { it.exists() }?.readText() ?: "(no file)"
```
```
(no file)
```

## Runtime exceptions you'll meet
Messages from `code/kotlin/src/main/kotlin/RuntimeErrors.kt`: [[kotlin/Common Errors]].
