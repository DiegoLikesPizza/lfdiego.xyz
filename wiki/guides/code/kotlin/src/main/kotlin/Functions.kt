fun connect(host: String, port: Int = 443, secure: Boolean = true) =
    "${if (secure) "https" else "http"}://$host:$port"

fun sum(vararg numbers: Int) = numbers.sum()

// higher-order function: takes a function as a parameter
fun repeatTimes(times: Int, action: (Int) -> Unit) {
    for (i in 0 until times) action(i)
}

fun String.initials(): String =
    split(" ")
        .filter { it.isNotBlank() }
        .joinToString("") { it.first().uppercase() }

val String.isPalindrome: Boolean get() = this == reversed()   // extension property

infix fun Int.percentOf(total: Int) = total * this / 100

fun makeCounter(): () -> Int {
    var count = 0
    return { ++count }                                         // closures work like in JavaScript
}

inline fun <T> measure(label: String, block: () -> T): T {
    val start = System.nanoTime()
    return block().also { println("$label took ${(System.nanoTime() - start) / 1_000_000} ms") }
}

fun main() {
    println(connect("example.com"))                             // defaults fill in
    println(connect("localhost", secure = false, port = 8080))   // named: any order
    println(sum(1, 2, 3) + sum(*intArrayOf(4, 5)))                // spread an array with *
    repeatTimes(3) { i -> println("round $i") }                  // trailing lambda
    val double: (Int) -> Int = { it * 2 }                         // 'it' = single parameter
    println(listOf(1, 2, 3).map(double))
    println("Ada Lovelace".initials() + " " + "level".isPalindrome + " " + (20 percentOf 250))
    val counter = makeCounter()
    println("${counter()} ${counter()} ${counter()}")
    val sorted = measure("sorting") { (1..200_000).shuffled().sorted() }
    println("first: ${sorted.first()}")
    fun localHelper(x: Int) = x * x                               // local function
    println(listOf(1, 2, 3).map(::localHelper) + listOf("a", "bb").map(String::length))
}
