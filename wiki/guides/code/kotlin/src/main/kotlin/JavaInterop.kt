import shop.Money
import shop.PriceCalculator


@JvmOverloads
fun welcome(name: String, greeting: String = "Welcome") = "$greeting, $name"

fun main() {
    println(PriceCalculator.total(listOf(250, 400)))           // Kotlin List -> java.util.List
    val calc = PriceCalculator()
    val coupon: String? = calc.findCoupon("NOPE")              // treat the platform type as nullable
    println("coupon: ${coupon ?: "none"}")
    val risky: String = calc.findCoupon("WELCOME")             // fine here...
    println("risky: $risky")
    try {
        val boom: String = calc.findCoupon("NOPE")             // ...NPE at the boundary here
        println(boom)
    } catch (e: NullPointerException) {
        println("platform type assigned to String: ${e.message}")
    }
    println(PriceCalculator.describe(Money(1999)))
    println(welcome("Ada") + " / " + welcome("Bo", "Hi"))
}
