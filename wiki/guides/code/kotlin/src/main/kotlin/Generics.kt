class Box<T>(val value: T) {
    fun <R> map(f: (T) -> R): Box<R> = Box(f(value))
    override fun toString() = "Box($value)"
}

fun <T : Comparable<T>> maxOf3(a: T, b: T, c: T): T = maxOf(a, maxOf(b, c))

// out = producer (covariant), in = consumer (contravariant)
interface Source<out T> { fun next(): T }
interface Sink<in T> { fun put(item: T) }

inline fun <reified T> List<Any>.filterType(): List<T> = filterIsInstance<T>()
inline fun <reified T> typeName() = T::class.simpleName

fun sumAll(numbers: List<Number>) = numbers.sumOf { it.toDouble() }

fun main() {
    val name = Box("Ada")
    println("$name -> ${name.map { it.length }}")
    println("maxOf3: ${maxOf3(3, 9, 4)} ${maxOf3("pear", "apple", "zucchini")}")
    val ints: List<Int> = listOf(1, 2, 3)
    println("List<Int> passed as List<Number>: ${sumAll(ints)}")   // List is declared List<out E>
    val strings: Source<String> = object : Source<String> { override fun next() = "hello" }
    val anys: Source<Any> = strings                                 // allowed because of `out`
    println("covariant source: ${anys.next()}")
    val anySink: Sink<Any> = object : Sink<Any> { override fun put(item: Any) = println("sink got $item") }
    val stringSink: Sink<String> = anySink                          // allowed because of `in`
    stringSink.put("text")
    val mixed: List<Any> = listOf(1, "two", 3.0, "four")
    println("reified filterType<String>: ${mixed.filterType<String>()}, typeName<Int>: ${typeName<Int>()}")
    val pair: Pair<String, Int> = "tea" to 250
    val triple = Triple("a", 1, true)
    println("$pair ${pair.first} $triple")
}
