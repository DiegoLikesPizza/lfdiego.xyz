# Collections

**Read-only by default, with a huge standard library.** Kotlin uses Java's collection classes at runtime but splits the interfaces into read-only and mutable. Output from `code/kotlin/src/main/kotlin/Collections.kt`.

| Read-only | Mutable |
|---|---|
| `listOf()` | `mutableListOf()` |
| `setOf()` | `mutableSetOf()` |
| `mapOf(k to v)` | `mutableMapOf()` |
| `emptyList()`, `buildList { }` | `ArrayList()`, `HashMap()` |

## Lists
```kotlin
val scores = listOf(72, 95, 88, 40)          // read-only
val (passed, failed) = scores.partition { it >= 50 }
val best = scores.maxOrNull()                // 95
val average = scores.average()               // 73.75
```
```
passed=[72, 95, 88] failed=[40] best=95 average=73.75
```
A read-only `List` has no `add`:
```
e: Broken.kt:13:10 Unresolved reference 'add' on receiver of type 'List<Int>'.
```

## Maps
```kotlin
val prices = mutableMapOf("tea" to 2.5)      // mutable
prices["coffee"] = 3.0
for ((item, price) in prices) println("$item costs $price")
```
```
tea costs 2.5
coffee costs 3.0
prices["cake"] = null, getOrDefault = 0.0, getValue throws? Key cake is missing in the map.
```
- `map[key]` returns `null` if missing (the type is nullable: `Double?`).
- `getOrDefault`, `getOrElse { }`, `getOrPut(key) { default }`, `getValue` (throws).
- `"tea" to 2.5` creates a `Pair` (an infix function).

## Building and combining
```kotlin
val list = buildList { add("a"); addAll(listOf("b", "c")) }
val set = setOf(3, 1, 3)
```
```
buildList [a, b, c], setOf(3, 1, 3) = [3, 1], list + "d" = [a, b, c, d], list - "a" = [b, c]
```
`+` and `-` return **new** collections. `setOf` keeps insertion order (it's a `LinkedHashSet`).

## Read-only is not immutable
```kotlin
val readOnly: List<Int> = mutableListOf(1, 2)
(readOnly as MutableList).add(3)
```
```
read-only view, mutable underneath: [1, 2, 3]
```
`List` just means "**you** can't modify it through this reference". Somebody holding the `MutableList` still can. For truly immutable collections, copy (`toList()`) or use `kotlinx.collections.immutable`.

## Arrays
`arrayOf(1, 2, 3)`, `IntArray(5)`, `intArrayOf(1, 2, 3)`: fixed size, mainly for interop and performance. Print with `contentToString()`, compare with `contentEquals`.
```
array: [1, 2, 3], IntArray sum 6
```

## From Java
Java's `List` shows up in Kotlin as `(Mutable)List<String!>!`: a platform type ([[kotlin/Java Interop]]). Kotlin lists passed to Java are plain `java.util.List` objects; a "read-only" Kotlin list may throw `UnsupportedOperationException` if Java tries to modify it (e.g. from `listOf` with one element).

Operations like `map`, `filter`, `groupBy`: [[kotlin/Collection Operations]].
