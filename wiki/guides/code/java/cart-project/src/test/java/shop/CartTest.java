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
    void totalAddsUpItemPrices() {
        // Arrange
        cart.add(new Item("tea", 250));
        cart.add(new Item("cake", 400, 2));
        // Act
        int total = cart.totalCents();
        // Assert
        assertEquals(1050, total);
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
