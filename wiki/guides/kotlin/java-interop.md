# Java Interop

Kotlin and Java compile to the same bytecode, so they call each other directly: same classes, same libraries, same project. The example project mixes both: `src/main/java/shop/PriceCalculator.java` and `src/main/kotlin/` (output from `JavaInterop.kt`).

## Calling Java from Kotlin
```java
public class PriceCalculator {
    public static int total(List<Integer> cents) { … }
    public String findCoupon(String code) {
        return code.equals("WELCOME") ? "10% off" : null;   // may return null: Kotlin sees String!
    }
}
```
```kotlin
println(PriceCalculator.total(listOf(250, 400)))           // Kotlin List -> java.util.List
val calc = PriceCalculator()
val coupon: String? = calc.findCoupon("NOPE")              // treat the platform type as nullable
println("coupon: ${coupon ?: "none"}")
```
```
650
coupon: none
```
- Getters/setters become properties: `user.getName()` → `user.name`, `setActive(true)` → `user.isActive = true`.
- Java `static` methods are called on the class.
- SAM interfaces (`Runnable`, `Comparator`) accept Kotlin lambdas.

## Platform types: `String!`
Kotlin can't know whether a Java method returns null, so the type is shown as `String!`: "maybe nullable". **Decide at the boundary**: assign it to `String?` to stay safe, or `String` if you're sure. If you're wrong, Kotlin fails immediately with a clear message instead of later:
```kotlin
val boom: String = calc.findCoupon("NOPE")
```
```
platform type assigned to String: findCoupon(...) must not be null
```
Java's `@Nullable`/`@NonNull` annotations (JSpecify, JetBrains, Jakarta) remove the guesswork: Kotlin reads them and shows real `String?`/`String` types.

## Calling Kotlin from Java
```kotlin
package shop

data class Money(val cents: Long) {
    fun format() = "%d.%02d €".format(cents / 100, cents % 100)

    companion object {
        fun zero() = Money(0)
        @JvmStatic fun parse(text: String) = Money((text.toBigDecimal() * 100.toBigDecimal()).toLong())
    }
}
```
```java
public static String describe(Money money) {             // calling Kotlin from Java
    return money.format() + " / " + Money.Companion.zero().format() + " / " + Money.parse("1.50").getCents();
}
```
```
19.99 € / 0.00 € / 150
```
Without `@JvmStatic`, companion members need `Money.Companion.zero()` in Java. Properties become `getCents()`. (A Java class can't use Kotlin classes from the default package, a Java rule, so Kotlin code meant for Java should have a `package`.)

| Annotation | Effect in Java |
|---|---|
| `@JvmStatic` | companion member becomes a real static method |
| `@JvmOverloads` | generates overloads for default parameters |
| `@JvmField` | expose a property as a public field |
| `@Throws(IOException::class)` | declares checked exceptions for Java callers |
| `@JvmName("…")` | change the generated method or file class name |
| `@file:JvmName("Prices")` | name the class for top-level functions (default `FileNameKt`) |

```kotlin
@JvmOverloads
fun welcome(name: String, greeting: String = "Welcome") = "$greeting, $name"
```
```
Welcome, Ada / Hi, Bo
```
From Java this is callable as `welcome("Ada")` and `welcome("Bo", "Hi")`.

## Collections, nulls, exceptions
- Kotlin's `List` is `java.util.List`; Java sees read-only Kotlin lists as normal lists (modifying may throw `UnsupportedOperationException`).
- Kotlin has no checked exceptions: annotate with `@Throws` when Java callers must catch.
- `Unit`-returning functions are `void`; `Nothing` doesn't exist in Java.
- `suspend` functions look strange from Java (an extra `Continuation` parameter): expose a blocking or `CompletableFuture` wrapper for Java callers.

## Migrating a Java project
1. Add the Kotlin Gradle plugin; `src/main/java` and `src/main/kotlin` coexist ([[kotlin/Gradle and Project Setup]]).
2. Write **new** code (tests are a good start) in Kotlin.
3. Convert files one by one with IntelliJ's converter, then clean up with [[kotlin/Idioms]].
4. Add nullability annotations to Java code that Kotlin calls a lot.

More: [Kotlin wiki: Java interop](https://lfdiego.xyz/wiki/kotlin/wiki/java-interop).
