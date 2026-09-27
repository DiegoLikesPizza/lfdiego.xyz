# Kotlin for Java Developers

**The same ideas, less ceremony, and nulls tracked by the compiler.** If you know [[Java]], you already know most of Kotlin's concepts; this page maps them.

## The same class, side by side
Java:
```java
public final class User {
    private final String name;
    private final int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    // + equals(), hashCode(), toString() ...
}
```
Kotlin:
```kotlin
data class User(val name: String, val age: Int)

// equals, hashCode, toString and copy() for free
val ada = User("Ada", 36)
val older = ada.copy(age = 37)
println(older)   // User(name=Ada, age=37)
```
Real output from `code/kotlin/src/main/kotlin/Basics.kt`:
```
User(name=Ada, age=37)
equal by value: true, same object: false
destructured: Ada is 36
```
(Java's `record User(String name, int age)` comes close since Java 16, but has no `copy` and no default values.)

## Translation table
| Java | Kotlin |
|---|---|
| `final String name = "Ada";` | `val name = "Ada"` |
| `int count = 0;` | `var count = 0` |
| `String s = null;` (always possible) | `val s: String? = null` (only with `?`) |
| `public static void main(String[] args)` | `fun main()` |
| `String greet(String who) { return "Hi " + who; }` | `fun greet(who: String) = "Hi $who"` |
| `"Hi " + name + "!"` | `"Hi $name!"`, `"${user.name}"` |
| `==` for references, `.equals()` for content | `===` for references, **`==` for content** |
| `switch` | `when` |
| ternary `a ? b : c` | `if (a) b else c` (if is an expression) |
| `for (int i = 0; i < n; i++)` | `for (i in 0..<n)` |
| `instanceof` + cast | `is` with smart cast |
| `(User) obj` | `obj as User` (or `as? User`, null if not) |
| `static` members | top-level functions, `object`, `companion object` |
| `new User("Ada")` | `User("Ada")` (no `new`) |
| `extends` / `implements` | `:` (`class Dog : Animal()`, `class A : Runnable`) |
| classes open by default | classes **final** by default (`open` to allow subclasses) |
| getters/setters | properties (`user.name`, compiled to `getName()`) |
| checked exceptions | none: nothing forces `try/catch` |
| `void` | `Unit` |
| `Object` | `Any` |
| `List<String>` (mutable) | `List<String>` (read-only) / `MutableList<String>` |
| streams `.stream().map(...).toList()` | `.map { ... }` directly on collections |
| lambdas `x -> x * 2` | `{ x -> x * 2 }` or `{ it * 2 }` |
| `Optional<User>` | `User?` |
| `CompletableFuture`, threads | coroutines, `suspend` ([[kotlin/Coroutines]]) |
| Lombok | not needed |

## The things that surprise Java developers
1. **`==` compares content.** It calls `equals`. Use `===` for identity.
2. **Everything is final by default**: classes, methods, and `val`. Spring's Kotlin plugin opens classes where frameworks need it ([[kotlin/Gradle and Project Setup]]).
3. **No checked exceptions.** You can still catch Java's `IOException`; you're just not forced to ([[kotlin/Error Handling]]).
4. **No primitives in the syntax**: `Int`, `Long`, `Double` compile to `int`/`long`/`double` where possible, boxed where needed.
5. **Semicolons are optional**, and so is the return type for expression functions.
6. **Collections are read-only interfaces**, not immutable: a `List` may be a `MutableList` underneath ([[kotlin/Collections]]).
7. **Nullability from Java is unknown** (`String!`): decide at the boundary ([[kotlin/Java Interop]]).

## Converting code
IntelliJ: *Code → Convert Java File to Kotlin File* (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd>), or paste Java code into a `.kt` file and accept the conversion. The result compiles but is rarely idiomatic: go through it with [[kotlin/Idioms]] in mind.

## Deeper comparison
The Kotlin wiki has a long, verified side-by-side page: [Kotlin for Java Developers](https://lfdiego.xyz/wiki/kotlin/wiki/kotlin-for-java-developers).
