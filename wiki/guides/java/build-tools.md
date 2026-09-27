# Build Tools

**Maven or Gradle:** dependencies, compiling, tests and packaging in one command. Real projects never call `javac` by hand. Both files below belong to the same real project, `code/java/cart-project/`, and both build it and run its 9 JUnit tests.

| | Maven | Gradle |
|---|---|---|
| Config file | `pom.xml` (XML) | `build.gradle.kts` (Kotlin DSL) or `build.gradle` (Groovy) |
| Style | convention, fixed lifecycle | flexible, scriptable tasks |
| Speed | good | faster on big projects (build cache, incremental, daemon) |
| Common in | enterprise Java, Spring | Android, Kotlin, newer projects |
| Output | `target/*.jar` | `build/libs/*.jar` |

## Project layout (both)
```
cart-project/
├─ build.gradle.kts   or   pom.xml
├─ settings.gradle.kts
├─ src/
│  ├─ main/java/shop/Cart.java, Item.java      ← production code
│  ├─ main/resources/                           ← config files, templates
│  └─ test/java/shop/CartTest.java             ← tests, same packages
└─ gradlew, gradlew.bat, gradle/wrapper/        ← the wrapper
```

## Gradle: `build.gradle.kts`
```kotlin
plugins {
    java
}

java {
    toolchain { languageVersion = JavaLanguageVersion.of(21) }
}

repositories { mavenCentral() }

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.13.4"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.assertj:assertj-core:3.27.4")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
    testLogging { events("passed", "failed") }
}
```
The **toolchain** makes Gradle compile with Java 21 regardless of which JDK runs Gradle (it can download it).
```sh
./gradlew test
```
```
CartTest > emptyCartCostsNothing() PASSED
CartTest > discountStartsAtFiftyEuros(int, int) > 4999 ct -> 4999 ct PASSED
CartTest > discountStartsAtFiftyEuros(int, int) > 5000 ct -> 4500 ct PASSED
CartTest > discountStartsAtFiftyEuros(int, int) > 10000 ct -> 9000 ct PASSED
CartTest > negativePriceIsRejected() PASSED
CartTest > blankNamesAreInvalid(String) > [1]  PASSED
CartTest > blankNamesAreInvalid(String) > [2]    PASSED
CartTest > totalAddsUpItemPrices() PASSED
CartTest > items() > returnsAnUnmodifiableCopy() PASSED
BUILD SUCCESSFUL in 1s
```

| Task | Does |
|---|---|
| `./gradlew build` | compile, test, package (+ checks) |
| `./gradlew test` | run tests; report in `build/reports/tests/test/index.html` |
| `./gradlew run` | run the app (with the `application` plugin) |
| `./gradlew dependencies` | the dependency tree |
| `./gradlew clean` | delete `build/` |
| `./gradlew tasks` | list tasks |

## Maven: `pom.xml`
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" …>
  <modelVersion>4.0.0</modelVersion>
  <groupId>shop</groupId>
  <artifactId>cart</artifactId>
  <version>1.0.0</version>

  <properties>
    <maven.compiler.release>21</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.junit</groupId>
        <artifactId>junit-bom</artifactId>
        <version>5.13.4</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.assertj</groupId>
      <artifactId>assertj-core</artifactId>
      <version>3.27.4</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.5.3</version>
      </plugin>
    </plugins>
  </build>
</project>
```
```sh
./mvnw test          # or mvn test
```
| Phase | Does (and runs all phases before it) |
|---|---|
| `compile` | compile `src/main` |
| `test` | compile and run tests |
| `package` | build the JAR in `target/` |
| `verify` | integration tests and checks |
| `install` | copy the JAR to your local repository (`~/.m2`) |
| `clean` | delete `target/` (a separate lifecycle: `mvn clean package`) |

## Dependencies
Libraries come from **Maven Central** by coordinates `group:artifact:version`, e.g. `com.fasterxml.jackson.core:jackson-databind:2.20.0`. Find them on central.sonatype.com or mvnrepository.com.
| Scope (Gradle / Maven) | Available |
|---|---|
| `implementation` / `compile` | compile + runtime |
| `testImplementation` / `test` | tests only |
| `runtimeOnly` / `runtime` | runtime only (e.g. JDBC drivers) |
| `compileOnly` / `provided` | compile only (e.g. Lombok, servlet API on a server) |

A **BOM** (bill of materials, like `junit-bom`) sets matching versions for a family of libraries, so you don't repeat them.

## Commit the wrapper
`gradlew`/`mvnw` download the exact tool version the project needs, so everyone (including CI) builds the same way. Create it once (`gradle wrapper` / `mvn wrapper:wrapper`), commit `gradlew`, `gradlew.bat` and `gradle/wrapper/*`, and always run `./gradlew` instead of a globally installed `gradle`. On Linux/macOS, a "Permission denied" means the executable bit is missing: `chmod +x gradlew` (and `git update-index --chmod=+x gradlew`).

## A runnable JAR
- Gradle: `application` plugin (`./gradlew installDist` creates start scripts) or the Shadow plugin for a single "fat" JAR (`./gradlew shadowJar`), as used by Diego's Wiki Engine.
- Maven: `maven-shade-plugin` or `maven-assembly-plugin`.
- Spring Boot's plugins build an executable JAR out of the box (`./gradlew bootJar`).

## In CI
```yaml
- uses: actions/setup-java@v5
  with: { distribution: temurin, java-version: 21 }
- uses: gradle/actions/setup-gradle@v5
- run: ./gradlew build
```
→ [[github/GitHub Actions]]. IDE support: [[IDEs/Project Setup]].
