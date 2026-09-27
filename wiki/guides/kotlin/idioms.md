# Idioms

**Java habits, and their Kotlin replacements.** Kotlin compiles Java-style code just fine, but these idioms are shorter, safer and what other Kotlin developers expect to read.

| Instead of | Prefer |
|---|---|
| `if (user != null) { user.save() }` | `user?.save()` |
| `val name = if (input != null) input else "guest"` | `val name = input ?: "guest"` |
| `"Hello, " + user.name + "!"` | `"Hello, ${user.name}!"` |
| `if (age < 0) throw IllegalArgumentException("bad age")` | `require(age >= 0) { "bad age: $age" }` |
| `val list = ArrayList<String>(); list.add("a"); list.add("b")` | `val list = buildList { add("a"); add("b") }` |
| `val reader = file.bufferedReader(); try { … } finally { reader.close() }` | `file.bufferedReader().use { reader -> … }` |
| `val first = pair.first; val second = pair.second` | `val (first, second) = pair` |
| `fun isAdult(age: Int): Boolean { return age >= 18 }` | `fun isAdult(age: Int) = age >= 18` |
| `for (i in 0 until list.size) { val x = list[i]; … }` | `for (x in list)` / `list.forEachIndexed { i, x -> }` |
| `var result = ""; if (a) result = "x" else result = "y"` | `val result = if (a) "x" else "y"` |
| overloads `f(a)`, `f(a, b)`, `f(a, b, c)` | default arguments |
| `object.setX(1); object.setY(2)` | `object.apply { x = 1; y = 2 }` |
| a utility class with static methods | top-level or extension functions |
| `Optional<User>` | `User?` |
| a class with only getters, equals, hashCode | `data class` |
| string of `if/else if` on a type | `when (x) { is A -> … }` |
| `list.stream().filter(…).collect(…)` | `list.filter { … }` |
| `Collections.unmodifiableList(...)` | return `List<T>` (read-only type) |
| `static final String URL = "…"` | `const val URL = "…"` (top-level or in `companion object`) |
| singleton pattern with `getInstance()` | `object` |
| `Integer.parseInt(s)` in `try/catch` | `s.toIntOrNull() ?: default` |

## require, check, error
- `require(condition) { "message" }` → `IllegalArgumentException`: validates **arguments**.
- `check(condition) { "message" }` → `IllegalStateException`: validates **state**.
- `requireNotNull(x) { … }`, `checkNotNull(x) { … }` return the non-null value.
- `error("message")` throws `IllegalStateException` directly.
Real output in [[kotlin/Error Handling]].

## `use` closes resources
```kotlin
File("orders.csv").bufferedReader().use { reader ->
    reader.lineSequence().drop(1).count()
}   // closed even if the block throws
```
Kotlin's equivalent of try-with-resources ([[java/Exceptions]]).

## Name things by what they are
- Properties instead of `getX()` methods: `cart.total`, `user.isAdult`.
- Boolean names read like questions: `isEmpty`, `hasDiscount`, `canCheckout`.
- Extension functions for readability: `order.toReceiptText()` instead of `ReceiptFormatter.format(order)`.

## Style
Follow the official Kotlin coding conventions (IntelliJ applies them with *Reformat Code*), 4-space indent, trailing commas in multi-line lists, and let **ktlint** or **detekt** check the rest in CI.

More idioms, measured and verified: [Kotlin wiki: idioms](https://lfdiego.xyz/wiki/kotlin/wiki/practice/idioms).
