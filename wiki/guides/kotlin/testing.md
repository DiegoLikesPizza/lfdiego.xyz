# Testing

Kotlin tests usually run on JUnit 5 with **kotlin.test** assertions, plus **kotlinx-coroutines-test** for suspend code. This is the real, passing `src/test/kotlin/CartTest.kt` from `code/kotlin/`.

```kotlin
import kotlin.test.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.runTest

class CartTest {
    @Test
    fun `empty cart costs nothing`() {
        assertEquals(0, Cart().totalCents)
    }

    @Test
    fun `total adds up prices times quantities`() {
        val cart = Cart().apply {
            add(Item("tea", 250))
            add(Item("cake", 400, quantity = 2))
        }
        assertEquals(1050, cart.totalCents)
    }

    @Test
    fun `negative price is rejected`() {
        val e = assertFailsWith<IllegalArgumentException> { Item("x", -1) }
        assertEquals("negative price: -1", e.message)
    }

    @Test
    fun `suspend functions run in virtual time`() = runTest {
        val start = testScheduler.currentTime
        delay(60_000)                        // one minute, skipped instantly
        assertEquals(60_000, testScheduler.currentTime - start)
    }
}
```
```sh
./gradlew test
```
```
CartTest > total adds up prices times quantities() PASSED
CartTest > suspend functions run in virtual time() PASSED
CartTest > empty cart costs nothing() PASSED
CartTest > negative price is rejected() PASSED
BUILD SUCCESSFUL in 3s
```

## Kotlin-specific niceties
- **Backtick names**: `` fun `negative price is rejected`() `` reads like a sentence in reports.
- **`assertFailsWith<T> { }`** returns the exception for further checks.
- **`apply { }`** builds test fixtures compactly; named and default arguments make test data readable (`Item("cake", 400, quantity = 2)`).
- **`runTest`** runs coroutines in **virtual time**: a `delay(60_000)` takes no real time, so timeouts, retries and debounce logic are testable in milliseconds.

## Libraries
| Library | For |
|---|---|
| `kotlin("test")` | assertions (`assertEquals`, `assertTrue`, `assertFailsWith`) on JUnit 5 |
| **Kotest** | expressive matchers (`total shouldBe 1050`) and spec styles |
| **MockK** | mocking designed for Kotlin (final classes, coroutines, extension functions): `every { api.user() } returns "Ada"`, `coEvery` for suspend functions |
| kotlinx-coroutines-test | `runTest`, test dispatchers |
| Turbine | testing `Flow` emissions (`flow.test { assertEquals(1, awaitItem()) }`) |
| Testcontainers | real databases in Docker |

## Principles
The same as in Java: arrange-act-assert, one behaviour per test, fast and independent ([[java/Testing with JUnit]]). Running and debugging tests in the IDE: [[IDEs/Testing in the IDE]]. More: [Kotlin wiki: testing](https://lfdiego.xyz/wiki/kotlin/wiki/practice/testing).
