# Testing with JUnit

**Arrange, act, assert, and let the build run it.** JUnit 5 (Jupiter) is the standard test framework. Tests live in `src/test/java`, mirror your package structure, and run with `./gradlew test` or `mvn test`. Everything on this page is the real, passing `CartTest` from `code/java/cart-project/`.

## Arrange, act, assert
1. **Arrange**: build the objects and inputs the test needs.
2. **Act**: call the single method you're testing.
3. **Assert**: compare against what you expect. One behaviour per test.

```java
@Test
void totalAddsUpItemPrices() {
    // Arrange
    cart.add(new Item("tea", 250));
    cart.add(new Item("cake", 400, 2));
    // Act
    int total = cart.totalCents();
    // Assert
    assertEquals(1050, total);
}
```

## The whole test class
```java
package shop;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

class CartTest {
    private Cart cart;

    @BeforeEach
    void setUp() {
        cart = new Cart();                       // a fresh cart for every test
    }

    @Test
    void emptyCartCostsNothing() {
        assertEquals(0, cart.totalCents());
    }

    @Test
    void negativePriceIsRejected() {
        var e = assertThrows(IllegalArgumentException.class, () -> new Item("x", -1));
        assertEquals("negative price: -1", e.getMessage());
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "  "})
    void blankNamesAreInvalid(String name) {
        assertFalse(Item.isValidName(name));
    }

    @ParameterizedTest(name = "{0} ct -> {1} ct")
    @CsvSource({"4999, 4999", "5000, 4500", "10000, 9000"})
    void discountStartsAtFiftyEuros(int price, int expected) {
        cart.add(new Item("thing", price));
        assertEquals(expected, cart.totalWithDiscountCents());
    }

    @Nested
    @DisplayName("items()")
    class Items {
        @Test
        void returnsAnUnmodifiableCopy() {
            cart.add(new Item("tea", 250));
            assertThat(cart.items())
                .hasSize(1)
                .extracting(Item::name)
                .containsExactly("tea");
            assertThrows(UnsupportedOperationException.class, () -> cart.items().add(new Item("x", 1)));
        }
    }
}
```
Result: 9 tests (parameterised tests count once per input), all green; output on [[java/Build Tools]].

## When a test fails
Change the expected value to 1000 and run again. Maven reports:
```
[ERROR] Tests run: 8, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.290 s <<< FAILURE! -- in shop.CartTest
[ERROR] shop.CartTest.totalAddsUpItemPrices -- Time elapsed: 0.008 s <<< FAILURE!
org.opentest4j.AssertionFailedError: expected: <1000> but was: <1050>
```
Gradle:
```
CartTest > totalAddsUpItemPrices() FAILED
    org.opentest4j.AssertionFailedError at CartTest.java:35
```
plus an HTML report under `build/reports/tests/test/`. `assertEquals(expected, actual)`: **expected first**, or the message reads backwards.

## Annotations
| Annotation | Purpose |
|---|---|
| `@Test` | marks a test method |
| `@BeforeEach` / `@AfterEach` | runs before/after every test: fresh setup, cleanup |
| `@BeforeAll` / `@AfterAll` | once per class (static methods) |
| `@ParameterizedTest` + `@ValueSource`, `@CsvSource`, `@MethodSource` | same test, many inputs |
| `@DisplayName` | readable name in reports |
| `@Nested` | group related tests in an inner class |
| `@Disabled("reason")` | skip, with a reason |
| `@Tag("slow")` | filter test runs |
| `@TempDir Path dir` | a temporary folder, deleted afterwards |
| `@Timeout(2)` | fail if slower than 2 s |

## Assertions
| JUnit | AssertJ (fluent) |
|---|---|
| `assertEquals(1050, total)` | `assertThat(total).isEqualTo(1050)` |
| `assertTrue(list.contains("tea"))` | `assertThat(list).contains("tea")` |
| `assertThrows(X.class, () -> …)` | `assertThatThrownBy(() -> …).isInstanceOf(X.class).hasMessage("…")` |
| `assertAll(…)` | soft assertions |

AssertJ's failure messages are more descriptive and IDE autocompletion guides you; many teams use it for everything.

## Test doubles
When the code under test talks to a database, a payment API or the clock, replace that collaborator:
- **Fakes** you write yourself: `Notifier` implemented as a lambda that collects messages in a list ([[java/Interfaces and Polymorphism]]).
- **Mockito**: `var payments = mock(PaymentProvider.class); when(payments.charge(any())).thenReturn(ok);` then `verify(payments).charge(…)`.
- **Clock**: inject a `Clock` and use `Clock.fixed(…)` in tests ([[java/Date and Time]]).
- **Testcontainers**: a real PostgreSQL in Docker for integration tests.

## What makes a good test
- **Fast** (milliseconds) and **independent** (any order, no shared state).
- **One behaviour**, named after it: `discountStartsAtFiftyEuros`, not `test3`.
- **Tests the edges**: empty, one, many, boundary values (4999/5000), invalid input.
- **Would fail if the code broke**: write the test, watch it fail, then fix (test-driven development makes this automatic).
- **No logic** in tests (no loops/ifs computing the expected value).

Running and debugging tests in the IDE: [[IDEs/Testing in the IDE]].
