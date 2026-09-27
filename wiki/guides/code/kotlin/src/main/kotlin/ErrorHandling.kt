import java.io.File

class OutOfStockException(sku: String) : RuntimeException("Out of stock: $sku")

val stock = mapOf("TEA" to 3, "CAKE" to 0)

fun order(sku: String): String {
    val left = stock[sku] ?: throw IllegalArgumentException("Unknown product $sku")
    if (left == 0) throw OutOfStockException(sku)
    return "ordered $sku"
}

fun parseAge(input: String): Int {
    val age = input.toIntOrNull()
    requireNotNull(age) { "not a number: $input" }
    require(age in 0..150) { "age out of range: $age" }
    return age
}

class Connection { var open = false; fun send(msg: String) { check(open) { "connection is closed" }; println("sent $msg") } }

fun main() {
    println(order("TEA"))
    for (sku in listOf("CAKE", "PIE")) {
        try {
            println(order(sku))
        } catch (e: OutOfStockException) {
            println("caught: ${e.message}")
        } catch (e: IllegalArgumentException) {
            println("caught: ${e.message}")
        } finally {
            println("  finally for $sku")
        }
    }
    println(listOf("36", "abc", "200").map { runCatching { parseAge(it) } })
    val age = runCatching { parseAge("abc") }.getOrElse { -1 }
    println("getOrElse -> $age")
    val result: Result<Int> = runCatching { parseAge("42") }
    result.onSuccess { println("ok $it") }.onFailure { println("failed $it") }
    println(runCatching { parseAge("x") }.map { it * 2 }.recover { 0 })
    try { Connection().send("hi") } catch (e: IllegalStateException) { println("check: ${e.message}") }
    try { error("something impossible happened") } catch (e: IllegalStateException) { println("error(): ${e.message}") }
    val text = File("does-not-exist.txt").takeIf { it.exists() }?.readText() ?: "(no file)"
    println(text)
    try { File("does-not-exist.txt").readText() } catch (e: java.io.FileNotFoundException) { println("Kotlin has no checked exceptions, but Java code still throws: ${e::class.simpleName}") }
    val nothing: Nothing? = null
    println("TODO() would throw: ${runCatching { TODO("write this later") }.exceptionOrNull()}")
}
