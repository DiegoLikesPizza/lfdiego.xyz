# Basics

Variables, types, strings and the first `when`. Output from `code/kotlin/src/main/kotlin/Basics.kt`.

## `val` and `var`
```kotlin
val name = "Ada"     // read-only, type inferred
var count = 0        // mutable
count += 1
```
- **`val`** = can't be reassigned (like Java's `final`). Use it by default.
- **`var`** = can be reassigned. Use it only when you need to.
- Types are inferred; write them when it helps readability or for public APIs: `val count: Int = 0`.

Reassigning a `val` doesn't compile:
```
e: Broken.kt:7:5 'val' cannot be reassigned.
```

## Types
| Kotlin | JVM | Literal |
|---|---|---|
| `Int` | `int` | `42`, `1_000_000`, `0xFF` |
| `Long` | `long` | `3_000_000_000` (inferred when too big for Int), `42L` |
| `Double` / `Float` | `double` / `float` | `19.99`, `1.5f` |
| `Boolean` | `boolean` | `true` |
| `Char` | `char` | `'A'` |
| `String` | `String` | `"text"`, `"""raw"""` |
| `Any` | `Object` | – |
| `Unit` | `void` | – |
| `Nothing` | – | the type of `throw` and `TODO()`: "never returns" |

```kotlin
val big: Long = 3_000_000_000
val price = 19.99
val initial: Char = name[0]
println("types: ${big::class.simpleName} ${price::class.simpleName} ${initial::class.simpleName}, Int.MAX_VALUE + 1 = ${Int.MAX_VALUE + 1}")
```
```
types: Long Double Char, Int.MAX_VALUE + 1 = -2147483648
```
Same overflow as Java ([[java/Primitive Types]]). No implicit widening: `val l: Long = someInt` doesn't compile; write `someInt.toLong()`.

## Strings
```kotlin
println("$name, count=$count, ${greet()}, ${greet(name)}")
val text = """
    |multi-line
    |  string
""".trimMargin()
println("length of name: ${name.length}, uppercase: ${name.uppercase()}, reversed: ${name.reversed()}")
```
```
Ada, count=1, Hello, world!, Hello, Ada!
multi-line
  string
length of name: 3, uppercase: ADA, reversed: adA
```
- `$name` or `${expression}` inside strings: **string templates**.
- Raw strings `"""…"""` need no escaping; `trimMargin()` / `trimIndent()` remove indentation.
- Conversions: `"42".toInt()` (throws on bad input), `"42x".toIntOrNull()` (null), `42.toString()`.

## `when`
```kotlin
val label = when {
    count == 0 -> "none"
    count < 10 -> "a few"
    else -> "lots"
}
```
```
label = a few
```
`when` replaces `switch` and `if-else if` chains, and returns a value. More in [[kotlin/Expressions and Ranges]].

## Functions, briefly
```kotlin
fun greet(who: String = "world") = "Hello, $who!"
```
One-line functions use `=`; the return type is inferred. Everything else: [[kotlin/Functions]].

## Comments, packages, imports
```kotlin
package shop.cart          // optional; doesn't have to match the folder (but should)
import shop.Money
import kotlin.math.max as maxOf2   // rename on import
// line comment, /* block */, /** KDoc */
```

## Next
[[kotlin/Functions]] (defaults, named arguments, lambdas, extensions) and [[kotlin/Null Safety]].
