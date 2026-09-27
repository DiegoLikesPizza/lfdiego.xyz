# Glossary

Kotlin words, in one place.

| Term | Meaning |
|---|---|
| **val / var** | read-only and mutable variable declarations ([[kotlin/Basics]]) |
| **type inference** | the compiler working out types you don't write |
| **string template** | `"$name"` / `"${expr}"` inside a string |
| **nullable type** | a type ending in `?`, like `String?`, that may hold null ([[kotlin/Null Safety]]) |
| **safe call `?.`** | call only if the value isn't null; otherwise the result is null |
| **Elvis `?:`** | use the left side, or the right side if the left is null |
| **not-null assertion `!!`** | "trust me, it's not null"; throws if it is |
| **smart cast** | the compiler treating a value as a narrower type after a check |
| **platform type** | `String!`: a Java type whose nullability Kotlin can't know ([[kotlin/Java Interop]]) |
| **expression** | code that produces a value; `if`, `when` and `try` are expressions ([[kotlin/Expressions and Ranges]]) |
| **range** | `1..10`, `0..<n`, `10 downTo 0 step 2` |
| **data class** | a class for holding data, with generated `equals`, `hashCode`, `toString` and `copy` ([[kotlin/Classes and Objects]]) |
| **sealed class / interface** | a class with a closed, known set of subclasses |
| **object** | a singleton declaration |
| **companion object** | members tied to a class rather than an instance |
| **value class** | a zero-overhead wrapper around one value |
| **open** | allows a class or member to be extended/overridden (final is the default) |
| **property** | a field plus getter/setter, accessed like a field ([[kotlin/Properties and Delegation]]) |
| **lateinit** | a non-null `var` initialised after construction |
| **lazy** | a value computed on first access |
| **delegation (`by`)** | forwarding a property or interface implementation to another object |
| **extension function** | a function that looks like a method on an existing type ([[kotlin/Functions]]) |
| **lambda** | an anonymous function literal, like `{ x -> x * 2 }` |
| **it** | the implicit name of a lambda's single parameter |
| **trailing lambda** | a last lambda argument written outside the parentheses |
| **higher-order function** | a function that takes or returns functions |
| **inline / reified** | copying a function into call sites / keeping generic types at runtime ([[kotlin/Generics]]) |
| **variance (`out`/`in`)** | whether a generic type can be used covariantly or contravariantly |
| **scope function** | `let`, `run`, `with`, `apply` or `also`: run a block on an object ([[kotlin/Scope Functions]]) |
| **sequence** | a lazily evaluated collection pipeline ([[kotlin/Collection Operations]]) |
| **Result / runCatching** | a value-or-exception wrapper ([[kotlin/Error Handling]]) |
| **coroutine** | a lightweight, suspendable unit of concurrent work ([[kotlin/Coroutines]]) |
| **suspend** | marks a function that can pause without blocking its thread |
| **CoroutineScope** | the owner of coroutines, controlling their lifetime ([[kotlin/Structured Concurrency]]) |
| **Job / Deferred** | a handle to a running coroutine / one with a result |
| **dispatcher** | decides which thread or pool a coroutine runs on |
| **structured concurrency** | children can't outlive their scope; failures and cancellation propagate |
| **Flow** | a cold asynchronous stream of values ([[kotlin/Flow]]) |
| **StateFlow / SharedFlow** | hot flows for state / events |
| **K2** | the Kotlin 2.x compiler |
| **KMP** | Kotlin Multiplatform: sharing code across platforms |
| **Compose** | Jetpack Compose / Compose Multiplatform: declarative UI in Kotlin |
| **Gradle Kotlin DSL** | build scripts written in Kotlin (`build.gradle.kts`) ([[kotlin/Gradle and Project Setup]]) |
