import kotlinx.coroutines.delay

data class User(val name: String, val email: String?)

fun main() {
    val count = 1
    count = 2
    val user = User("Ada", null)
    println(user.email.length)
    val n: Int = "42"
    println(undefinedThing)
    val list = listOf(1, 2)
    list.add(3)
    delay(100)
    val s: String = null
    when (user.name) { }
    val x = if (count > 0) "yes"
    User("Ada")
}

sealed interface State
data object Loading : State
data class Done(val v: Int) : State
fun render(s: State): String = when (s) {
    Loading -> "loading"
}

class Base
class Child : Base()

fun noReturn(b: Boolean): Int {
    if (b) return 1
}
