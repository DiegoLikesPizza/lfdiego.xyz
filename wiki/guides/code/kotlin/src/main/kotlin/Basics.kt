data class User(val name: String, val age: Int)

fun greet(who: String = "world") = "Hello, $who!"

fun main() {
    val name = "Ada"     // read-only, type inferred
    var count = 0        // mutable
    count += 1
    println("$name, count=$count, ${greet()}, ${greet(name)}")

    val ada = User("Ada", 36)
    val older = ada.copy(age = 37)
    println(older)                                  // User(name=Ada, age=37)
    println("equal by value: ${ada == User("Ada", 36)}, same object: ${ada === User("Ada", 36)}")
    val (n, a) = ada                                // destructuring via component1/component2
    println("destructured: $n is $a")

    val label = when {
        count == 0 -> "none"
        count < 10 -> "a few"
        else -> "lots"
    }
    println("label = $label")

    val big: Long = 3_000_000_000
    val price = 19.99
    val initial: Char = name[0]
    println("types: ${big::class.simpleName} ${price::class.simpleName} ${initial::class.simpleName}, Int.MAX_VALUE + 1 = ${Int.MAX_VALUE + 1}")
    val text = """
        |multi-line
        |  string
    """.trimMargin()
    println(text)
    println("length of name: ${name.length}, uppercase: ${name.uppercase()}, reversed: ${name.reversed()}")
}
