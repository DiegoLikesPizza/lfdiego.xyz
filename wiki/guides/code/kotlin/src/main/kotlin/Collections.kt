data class Order(val id: Int, val customer: String, val total: Double)
data class Person(val id: Int, val name: String)

fun main() {
    val scores = listOf(72, 95, 88, 40)          // read-only
    val (passed, failed) = scores.partition { it >= 50 }
    println("passed=$passed failed=$failed best=${scores.maxOrNull()} average=${scores.average()}")

    val prices = mutableMapOf("tea" to 2.5)      // mutable
    prices["coffee"] = 3.0
    for ((item, price) in prices) println("$item costs $price")
    println("prices[\"cake\"] = ${prices["cake"]}, getOrDefault = ${prices.getOrDefault("cake", 0.0)}, getValue throws? ${runCatching { prices.getValue("cake") }.exceptionOrNull()?.message}")

    val words = listOf("apple", "avocado", "banana")
    val users = listOf(Person(1, "Ada"), Person(2, "Bo"))
    val nums = listOf(3, -1, 4, -5)
    println("map        ${listOf(1, 2, 3).map { it * 10 }}")
    println("filter     ${listOf(1, 2, 3, 4).filter { it % 2 == 0 }}")
    println("flatMap    ${listOf("a b", "c").flatMap { it.split(" ") }}")
    println("groupBy    ${words.groupBy { it.first() }}")
    println("associateBy ${users.associateBy { it.id }}")
    println("partition  ${nums.partition { it > 0 }}")
    println("zip        ${listOf(1, 2).zip(listOf("a", "b"))}")
    println("chunked    ${(1..5).toList().chunked(2)}")
    println("windowed   ${(1..4).toList().windowed(2)}")
    println("fold       ${nums.fold(0) { acc, n -> acc + n }}")
    val orders = listOf(Order(1, "Ada", 19.99), Order(2, "Bo", 5.0), Order(3, "Ada", 30.0))
    println("sumOf      ${orders.sumOf { it.total }}, maxBy ${orders.maxByOrNull { it.total }?.id}")
    println("per customer ${orders.groupBy { it.customer }.mapValues { (_, os) -> os.sumOf { it.total } }}")
    println("sortedBy   ${orders.sortedByDescending { it.total }.map { it.id }}, distinct ${listOf(1, 1, 2).distinct()}, take ${nums.take(2)}, drop ${nums.drop(3)}")
    println("any/all/none/count ${nums.any { it < 0 }} ${nums.all { it < 10 }} ${nums.none { it == 0 }} ${nums.count { it > 0 }}")
    println("first/firstOrNull ${nums.first { it > 3 }} ${nums.firstOrNull { it > 100 }}, find ${nums.find { it < 0 }}")
    println("joinToString ${words.joinToString(", ", prefix = "[", postfix = "]") { it.uppercase() }}")
    val list = buildList { add("a"); addAll(listOf("b", "c")) }
    val set = setOf(3, 1, 3)
    println("buildList $list, setOf(3, 1, 3) = $set, list + \"d\" = ${list + "d"}, list - \"a\" = ${list - "a"}")
    val readOnly: List<Int> = mutableListOf(1, 2)
    (readOnly as MutableList).add(3)
    println("read-only view, mutable underneath: $readOnly")
    println("array: ${arrayOf(1, 2, 3).contentToString()}, IntArray sum ${intArrayOf(1, 2, 3).sum()}")

    println("--- eager list vs lazy sequence")
    val eager = listOf(1, 2, 3, 4).map { println("  map $it"); it * 2 }.filter { println("  filter $it"); it > 5 }.first()
    println("  eager result $eager")
    val lazy = listOf(1, 2, 3, 4).asSequence().map { println("  map $it"); it * 2 }.filter { println("  filter $it"); it > 5 }.first()
    println("  lazy result $lazy")
    println("generateSequence: ${generateSequence(1) { it * 3 }.takeWhile { it < 100 }.toList()}")
}
