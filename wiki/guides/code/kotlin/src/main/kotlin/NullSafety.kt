data class Address(val city: String?)
data class Customer(val name: String, val address: Address?)

fun main() {
    var nickname: String? = null
    // nickname.length            // compile error: only safe (?.) or non-null asserted (!!.) calls are allowed
    println(nickname?.length)            // null
    println(nickname?.length ?: 0)       // 0
    nickname = "Ada"
    if (nickname != null) println("smart cast: ${nickname.length}")   // String inside the if
    nickname?.let { println("let runs for $it") }

    val bo = Customer("Bo", null)
    val ada = Customer("Ada", Address("London"))
    println("${ada.address?.city ?: "unknown"} / ${bo.address?.city ?: "unknown"}")

    val input: String? = null
    val name = input ?: "guest"
    println("name = $name")
    fun requireName(n: String?): String = n ?: throw IllegalArgumentException("name is required")
    try { requireName(null) } catch (e: IllegalArgumentException) { println("elvis + throw: ${e.message}") }

    val maybe: String? = null
    try { maybe!!.length } catch (e: NullPointerException) { println("!! threw ${e::class.simpleName}") }

    val mixed: List<String?> = listOf("a", null, "b")
    println("filterNotNull = ${mixed.filterNotNull()}, mapNotNull = ${listOf("1", "x", "3").mapNotNull { it.toIntOrNull() }}")
    val lengths = mixed.map { it?.length ?: 0 }
    println("lengths = $lengths")
    val javaString: String = System.getProperty("user.home")   // platform type String! from Java, assigned to non-null
    println("home is set: ${javaString.isNotEmpty()}")
    println("System.getenv(\"NOPE\") = ${System.getenv("NOPE")}")  // a Java method that returns null
}
