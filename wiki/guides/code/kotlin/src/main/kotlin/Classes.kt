import kotlin.properties.Delegates

sealed interface UiState {
    data object Loading : UiState
    data class Success(val items: List<String>) : UiState
    data class Error(val message: String) : UiState
}

fun render(state: UiState) = when (state) {
    UiState.Loading -> "spinner"
    is UiState.Success -> "list of ${state.items.size}"   // smart cast
    is UiState.Error -> "error: ${state.message}"
}   // add a 4th state and this stops compiling, on purpose

class Account(val owner: String, initialBalance: Double = 0.0) {
    var balance = initialBalance
        private set                       // readable outside, writable only inside

    init {
        require(initialBalance >= 0) { "balance can't be negative" }
    }

    val isEmpty: Boolean get() = balance == 0.0   // computed property

    fun deposit(amount: Double) { balance += amount }

    companion object {
        fun demo() = Account("demo", 100.0)       // Account.demo()
    }
}

object Config {                                   // singleton
    val apiUrl = "https://api.example.com"
    init { println("  Config initialised on first use") }
}

@JvmInline
value class Email(val value: String) {             // type-safe, zero overhead
    init { require("@" in value) { "not an e-mail: $value" } }
}

enum class Size(val ml: Int) { SMALL(250), MEDIUM(400), LARGE(500) }

open class Animal(val name: String) {
    open fun sound() = "..."
    override fun toString() = "$name says ${sound()}"
}
class Dog(name: String) : Animal(name) {
    override fun sound() = "woof"
}
abstract class Shape { abstract fun area(): Double }
class Circle(private val r: Double) : Shape() { override fun area() = Math.PI * r * r }

class Settings {
    lateinit var token: String
    val expensive: String by lazy { println("  computing expensive value"); "ready" }
    var theme: String by Delegates.observable("light") { _, old, new -> println("  theme $old -> $new") }
}

fun main() {
    println(listOf(UiState.Loading, UiState.Success(listOf("a", "b")), UiState.Error("offline")).map(::render))
    println(UiState.Loading)

    val acc = Account("Ada", 50.0)
    acc.deposit(25.0)
    println("${acc.owner}: ${acc.balance}, empty=${acc.isEmpty}, demo=${Account.demo().balance}")
    try { Account("x", -1.0) } catch (e: IllegalArgumentException) { println("init: ${e.message}") }

    println("before Config"); println(Config.apiUrl); println(Config.apiUrl)
    println(Email("ada@example.com"))
    try { Email("nope") } catch (e: IllegalArgumentException) { println(e.message) }
    println("${Size.MEDIUM} ${Size.MEDIUM.ml} ml, entries=${Size.entries}, valueOf=${Size.valueOf("LARGE")}")
    println("${Dog("Rex")} / ${Animal("Generic")} / area %.2f".format(Circle(1.0).area()))

    val s = Settings()
    try { println(s.token) } catch (e: UninitializedPropertyAccessException) { println(e.message) }
    s.token = "abc"
    println("token=${s.token}")
    println(s.expensive); println(s.expensive)
    s.theme = "dark"
}
