# Properties and Delegation

A Kotlin **property** is a field plus its getter (and setter for `var`), declared in one line. From Java, `user.name` is `user.getName()`. Output from `code/kotlin/src/main/kotlin/Classes.kt`.

## Custom getters and setters
```kotlin
class Account(val owner: String, initialBalance: Double = 0.0) {
    var balance = initialBalance
        private set                       // public getter, private setter

    val isEmpty: Boolean get() = balance == 0.0   // computed each time, no field

    var nickname: String = ""
        set(value) { field = value.trim() }        // `field` is the backing field
}
```
Use a computed property when the value is cheap and derived from state; use a function (`calculateTotal()`) when it's expensive or has side effects.

## lateinit
```kotlin
class Settings {
    lateinit var token: String
}
val s = Settings()
println(s.token)          // too early
s.token = "abc"
```
```
lateinit property token has not been initialized
token=abc
```
For non-null `var`s that are set after construction (dependency injection, test `@BeforeEach`, Android `onCreate`). Only for non-primitive types. Check with `::token.isInitialized`.

## lazy
```kotlin
val expensive: String by lazy { println("  computing expensive value"); "ready" }
println(s.expensive); println(s.expensive)
```
```
  computing expensive value
ready
ready
```
Computed on first access, then cached. Thread-safe by default.

## observable
```kotlin
var theme: String by Delegates.observable("light") { _, old, new -> println("  theme $old -> $new") }
s.theme = "dark"
```
```
  theme light -> dark
```
Also `Delegates.vetoable` (reject changes) and `Delegates.notNull()`.

## How `by` works
`by` delegates a property's get/set to another object with `getValue`/`setValue` operators. You can write your own (e.g. a property backed by `SharedPreferences` or a config map):
```kotlin
class Config(private val values: Map<String, String>) {
    val apiUrl: String by values          // reads values["apiUrl"]
}
```

## Class delegation
```kotlin
class LoggingList<T>(private val inner: MutableList<T> = mutableListOf()) : MutableList<T> by inner {
    override fun add(element: T): Boolean { println("add $element"); return inner.add(element) }
}
```
Implements the whole `MutableList` interface by forwarding to `inner`, overriding only `add`: composition without boilerplate ([[java/Inheritance and Composition]]).

## const val and top-level properties
```kotlin
const val MAX_ITEMS = 50            // compile-time constant (primitives and String)
val startedAt = System.currentTimeMillis()   // top-level property, initialised once
```
