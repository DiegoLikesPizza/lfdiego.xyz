import kotlin.test.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.runTest

data class Item(val name: String, val priceCents: Int, val quantity: Int = 1) {
    init { require(priceCents >= 0) { "negative price: $priceCents" } }
    val totalCents get() = priceCents * quantity
}

class Cart {
    private val items = mutableListOf<Item>()
    fun add(item: Item) { items += item }
    val totalCents get() = items.sumOf { it.totalCents }
}

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
