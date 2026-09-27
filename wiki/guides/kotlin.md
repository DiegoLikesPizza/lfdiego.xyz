# Kotlin

**Kotlin** is a modern, statically typed language from JetBrains. It runs on the JVM with full Java interop, is the default for Android, and also compiles to JavaScript, WebAssembly and native code. For Java developers it feels like "Java without the boilerplate, with null safety".

> This guide is a **learning path for Java developers**. Every example was compiled with **Kotlin 2.4.20** and run on JDK 21 (a Gradle project in `code/kotlin/`, with 4 passing tests); coroutine examples use kotlinx.coroutines 1.11.0. For the full language and ecosystem reference (Ktor, Spring Boot, Exposed, release notes), see the [Kotlin wiki](https://lfdiego.xyz/wiki/kotlin/).

![One source, many targets](kotlin/img/targets.png)

## Learning path
| Step | Read | You'll be able to… |
|---|---|---|
| 1 | [[kotlin/What Is Kotlin]] · [[kotlin/Kotlin for Java Developers]] | see what changes coming from Java |
| 2 | [[kotlin/Basics]] · [[kotlin/Functions]] · [[kotlin/Expressions and Ranges]] | write everyday Kotlin |
| 3 | [[kotlin/Null Safety]] | stop worrying about NullPointerExceptions |
| 4 | [[kotlin/Classes and Objects]] · [[kotlin/Properties and Delegation]] · [[kotlin/Generics]] | model data the Kotlin way |
| 5 | [[kotlin/Collections]] · [[kotlin/Collection Operations]] · [[kotlin/Scope Functions]] | use the standard library fluently |
| 6 | [[kotlin/Idioms]] · [[kotlin/Error Handling]] | write code other Kotlin developers expect |
| 7 | [[kotlin/Coroutines]] · [[kotlin/Structured Concurrency]] · [[kotlin/Flow]] | write concurrent code without callbacks |
| 8 | [[kotlin/Java Interop]] · [[kotlin/Gradle and Project Setup]] · [[kotlin/Testing]] | mix with Java, build and test |

Errors: [[kotlin/Common Errors]]. Quick lookups: [[kotlin/Cheat Sheet]], [[kotlin/Glossary]].

## The same class, in a fraction of the code
```kotlin
data class User(val name: String, val age: Int)

val ada = User("Ada", 36)
val older = ada.copy(age = 37)
println(older)   // User(name=Ada, age=37)
```
One line replaces a Java class with constructor, getters, `equals`, `hashCode`, `toString`, plus `copy`. → [[kotlin/Kotlin for Java Developers]]

## Where Kotlin is used
- **Android**: the recommended language since 2019; Jetpack Compose is Kotlin-only.
- **Backend**: Spring Boot (first-class support), Ktor, Micronaut, Quarkus.
- **Multiplatform**: shared business logic for Android, iOS, desktop and web (KMP), Compose Multiplatform for shared UI.
- **Build scripts**: Gradle's Kotlin DSL (`build.gradle.kts`), used by every Java project in this wiki.
- **Tools**: IntelliJ IDEA itself is largely written in Kotlin; so is Diego's Wiki Engine, which serves this page.
