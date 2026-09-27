# Cheat Sheet

## Basics
```kotlin
val x = 1            var y = 2            val s: String? = null
"Hi $name, ${user.age}"                   """raw ${'$'}string""".trimIndent()
fun add(a: Int, b: Int = 0) = a + b       add(b = 2, a = 1)
val max = if (a > b) a else b
when (x) { 0 -> "zero"; in 1..9 -> "small"; is String -> x.length; else -> "?" }
for (i in 0..<n) { }   for (i in 10 downTo 0 step 2) { }   repeat(3) { }
```
→ [[kotlin/Basics]], [[kotlin/Expressions and Ranges]]

## Null safety
```kotlin
s?.length   s ?: "default"   s?.let { use(it) }   s!!   requireNotNull(s) { "msg" }
list.filterNotNull()   list.mapNotNull { it.toIntOrNull() }   "42".toIntOrNull() ?: 0
```
→ [[kotlin/Null Safety]]

## Classes
```kotlin
data class User(val name: String, val age: Int = 0)          user.copy(age = 37)
class Account(val owner: String) { var balance = 0.0; private set; init { require(owner.isNotBlank()) } }
sealed interface State { data object Loading : State; data class Done(val v: Int) : State }
enum class Size(val ml: Int) { SMALL(250), LARGE(500) }
object Config { val url = "…" }        companion object { fun create() = … }
@JvmInline value class Email(val value: String)
open class Animal { open fun sound() = "" }   class Dog : Animal() { override fun sound() = "woof" }
lateinit var token: String             val config by lazy { load() }
```
→ [[kotlin/Classes and Objects]], [[kotlin/Properties and Delegation]]

## Functions
```kotlin
fun String.initials() = split(" ").joinToString("") { it.first().uppercase() }
fun repeatTimes(n: Int, action: (Int) -> Unit) { }      repeatTimes(3) { println(it) }
val double: (Int) -> Int = { it * 2 }    list.map(::transform)    infix fun Int.pct(of: Int) = of * this / 100
```
→ [[kotlin/Functions]]

## Collections
```kotlin
listOf(1, 2)  mutableListOf()  setOf()  mapOf("a" to 1)  mutableMapOf()  buildList { add(1) }
map { }  filter { }  flatMap { }  groupBy { }  associateBy { }  partition { }  sumOf { }
sortedBy { }  sortedByDescending { }  firstOrNull { }  any { }  count { }  joinToString(", ")
chunked(2)  windowed(2)  zip(other)  fold(0) { acc, x -> acc + x }  asSequence()
```
→ [[kotlin/Collections]], [[kotlin/Collection Operations]]

## Scope functions
`apply` (configure, returns object, `this`) · `also` (side effect, returns object, `it`) · `let` (transform / if not null, `it`) · `run` / `with` (compute, `this`) → [[kotlin/Scope Functions]]

## Errors
```kotlin
require(x > 0) { "…" }   check(open) { "…" }   error("…")   TODO()
val n = runCatching { parse(s) }.getOrElse { 0 }     file.bufferedReader().use { }
```
→ [[kotlin/Error Handling]]

## Coroutines and Flow
```kotlin
suspend fun load() = coroutineScope { val a = async { x() }; val b = async { y() }; a.await() + b.await() }
runBlocking { }   launch { }   withContext(Dispatchers.IO) { }   withTimeoutOrNull(1000) { }   delay(100)
flow { emit(1) }.map { }.filter { }.debounce(300).collect { }   MutableStateFlow(0)   .stateIn(scope, …)
```
→ [[kotlin/Coroutines]], [[kotlin/Structured Concurrency]], [[kotlin/Flow]]

## Interop
`@JvmStatic` · `@JvmOverloads` · `@JvmField` · `@Throws(IOException::class)` · `String!` = platform type → [[kotlin/Java Interop]]
