# Generics

Kotlin generics work like Java's ([[java/Generics]]) with two improvements: **declaration-site variance** (`out`/`in`) instead of wildcards everywhere, and **reified** type parameters. Output from `code/kotlin/src/main/kotlin/Generics.kt`.

## Classes and functions
```kotlin
class Box<T>(val value: T) {
    fun <R> map(f: (T) -> R): Box<R> = Box(f(value))
    override fun toString() = "Box($value)"
}

fun <T : Comparable<T>> maxOf3(a: T, b: T, c: T): T = maxOf(a, maxOf(b, c))
```
```
Box(Ada) -> Box(3)
maxOf3: 9 zucchini
```
`T : Comparable<T>` is an upper bound (Java: `T extends Comparable<T>`).

## Variance: `out` and `in`
```kotlin
interface Source<out T> { fun next(): T }        // only produces T: covariant
interface Sink<in T> { fun put(item: T) }        // only consumes T: contravariant

val strings: Source<String> = …
val anys: Source<Any> = strings                  // OK because of `out`
val anySink: Sink<Any> = …
val stringSink: Sink<String> = anySink           // OK because of `in`
```
```
covariant source: hello
sink got text
```
Kotlin's read-only `List` is declared `List<out E>`, so a `List<Int>` can be passed where a `List<Number>` is expected:
```kotlin
fun sumAll(numbers: List<Number>) = numbers.sumOf { it.toDouble() }
sumAll(listOf(1, 2, 3))
```
```
List<Int> passed as List<Number>: 6.0
```
In Java you'd need `List<? extends Number>` at every use. `MutableList<E>` is invariant (it both reads and writes). Use-site variance also exists: `MutableList<out Number>`.

| Java | Kotlin |
|---|---|
| `? extends T` | `out T` |
| `? super T` | `in T` |
| `?` | `*` (star projection) |

## reified: types that survive erasure
Normally generic types are erased at runtime. An `inline` function with a `reified` type parameter keeps it:
```kotlin
inline fun <reified T> List<Any>.filterType(): List<T> = filterIsInstance<T>()
inline fun <reified T> typeName() = T::class.simpleName

listOf(1, "two", 3.0, "four").filterType<String>()   // [two, four]
typeName<Int>()                                        // Int
```
```
reified filterType<String>: [two, four], typeName<Int>: Int
```
That's how `filterIsInstance<String>()`, Ktor's `call.receive<User>()` and Gson/kotlinx.serialization helpers work without passing `User::class.java`.

## Pair and Triple
```kotlin
val pair: Pair<String, Int> = "tea" to 250
val (item, price) = pair
val triple = Triple("a", 1, true)
```
```
(tea, 250) tea (a, 1, true)
```
Handy for quick returns; for anything that lives longer, a data class with named fields reads better.
