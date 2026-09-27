fun describe(value: Any?): String = when (value) {
    is String -> "text of length ${value.length}"   // smart cast
    is Int -> "number"
    null -> "nothing"
    else -> "something else"
}

fun size(count: Int) = when (count) {
    0 -> "empty"
    in 1..9 -> "small"
    in 10..99 -> "medium"
    else -> "large"
}

fun main() {
    val a = 3; val b = 7
    val max = if (a > b) a else b
    println("max=$max, sizes: ${size(0)} ${size(5)} ${size(42)} ${size(500)}")
    println(listOf(describe("hi"), describe(42), describe(null), describe(3.5)))
    val input = "80x"
    val port = try { input.toInt() } catch (e: NumberFormatException) { 8080 }
    println("port = $port, or with toIntOrNull: ${input.toIntOrNull() ?: 8080}")

    for (i in 1..3) print(i)              // 123
    println()
    for (i in 0..<3) print(i)             // up to, not including
    println()
    for (i in 10 downTo 0 step 3) print("$i ")
    println()
    val list = listOf("tea", "cake")
    for ((index, item) in list.withIndex()) println("$index: $item")
    val age = 15
    if (age in 13..19) println("teenager")
    repeat(2) { println("hi $it") }
    println("'c' in 'a'..'e': ${'c' in 'a'..'e'}, (1..10).sum() = ${(1..10).sum()}, (1..10 step 4).toList() = ${(1..10 step 4).toList()}")
    outer@ for (x in 1..3) {
        for (y in 1..3) {
            if (y == 2) continue@outer
            if (x == 3) break@outer
            print("($x,$y) ")
        }
    }
    println("<- labels")
}
