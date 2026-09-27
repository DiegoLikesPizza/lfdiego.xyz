fun main() {
    val cases: List<() -> Any?> = listOf(
        { val s: String? = null; s!!.length },
        { listOf(1, 2)[5] },
        { emptyList<Int>().first() },
        { listOf(1, 2).single() },
        { "12.5".toInt() },
        { val o: Any = "text"; o as Int },
        { mapOf("a" to 1).getValue("b") },
        { require(false) { "require failed" } },
        { check(false) { "check failed" } },
        { val l = mutableListOf(1, 2, 3); for (x in l) l.remove(x) },
        { 10 / 0 },
        { lazy<String> { throw IllegalStateException("lazy init failed") }.value },
    )
    for (c in cases) {
        try { c() } catch (e: Throwable) { println("${e::class.qualifiedName}: ${e.message}") }
    }
}
