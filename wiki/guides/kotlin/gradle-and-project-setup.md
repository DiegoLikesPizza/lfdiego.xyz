# Gradle and Project Setup

Kotlin projects are built with **Gradle** and the Kotlin plugin; the build script itself is written in Kotlin (`build.gradle.kts`). This is the real build of the example project `code/kotlin/`.

## build.gradle.kts
```kotlin
plugins {
    kotlin("jvm") version "2.4.20"
}

repositories { mavenCentral() }

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    testImplementation(kotlin("test"))
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.11.0")
}

kotlin { jvmToolchain(21) }          // compile and run with JDK 21

tasks.test {
    useJUnitPlatform()
    testLogging { events("passed", "failed") }
}

// ./gradlew runExample -Pmain=BasicsKt  runs one example's main()
tasks.register<JavaExec>("runExample") {
    classpath = sourceSets.main.get().runtimeClasspath
    mainClass = providers.gradleProperty("main").orElse("BasicsKt")
    jvmArgs("-Dstdout.encoding=UTF-8")
}
```
For a normal application, use the `application` plugin instead of the custom task:
```kotlin
plugins {
    kotlin("jvm") version "2.4.20"
    application
}
application {
    mainClass = "MainKt"              // top-level main() in Main.kt
}
```
```sh
./gradlew run
```

## Layout
```
code/kotlin/
├─ build.gradle.kts, settings.gradle.kts
├─ src/main/kotlin/        Kotlin sources (Basics.kt, Coroutines.kt, shop/Money.kt, …)
├─ src/main/java/          Java sources, compiled together (shop/PriceCalculator.java)
└─ src/test/kotlin/        tests (CartTest.kt)
```

## Versions
- Plugin and standard library versions come from `kotlin("jvm") version "…"`; the stdlib dependency is added automatically.
- `jvmToolchain(21)` makes Gradle use JDK 21 regardless of which JDK runs Gradle.
- Keep Kotlin, coroutines and serialization versions compatible; library release notes say which Kotlin they need.
- Use a **version catalog** (`gradle/libs.versions.toml`) in larger projects to manage versions in one place.

## Common plugins
| Plugin | For |
|---|---|
| `kotlin("plugin.spring")` | opens Spring-annotated classes (Kotlin classes are final) |
| `kotlin("plugin.jpa")` | no-arg constructors for JPA entities |
| `kotlin("plugin.serialization")` | kotlinx.serialization (`@Serializable`) |
| `com.google.devtools.ksp` | annotation processing (Room, Moshi) |
| `io.ktor.plugin` | Ktor fat JARs and Docker images |
| `org.jlleitschuh.gradle.ktlint` / `io.gitlab.arturbosch.detekt` | style and static analysis |

Real Ktor, Spring Boot and Exposed projects, all built and tested: [Kotlin wiki: ecosystem](https://lfdiego.xyz/wiki/kotlin/wiki/ecosystem).

## Kotlin Multiplatform
Share business logic (networking, models, validation) between Android, iOS, desktop and web, keeping native UI on each platform, or sharing UI too with Compose Multiplatform. Uses the `kotlin("multiplatform")` plugin with `commonMain`, `androidMain`, `iosMain` source sets.

## IDE
IntelliJ IDEA (Community is enough) has the best Kotlin support; Android Studio is IntelliJ-based. Open the folder containing `settings.gradle.kts` and let Gradle sync. → [[IDEs/Project Setup]]

More Gradle details: [[java/Build Tools]].
