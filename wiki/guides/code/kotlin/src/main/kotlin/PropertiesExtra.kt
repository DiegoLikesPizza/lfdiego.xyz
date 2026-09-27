import java.io.File

class Profile {
    var nickname: String = ""
        set(value) { field = value.trim() }        // `field` is the backing field
}

class AppConfig(private val values: Map<String, String>) {
    val apiUrl: String by values          // reads values["apiUrl"]
}

class LoggingList<T>(private val inner: MutableList<T> = mutableListOf()) : MutableList<T> by inner {
    override fun add(element: T): Boolean { println("add $element"); return inner.add(element) }
}

const val MAX_ITEMS = 50

data class Resident(val name: String, val city: String)

fun main() {
    val p = Profile(); p.nickname = "  Ada  "
    println("[${p.nickname}]")
    println(AppConfig(mapOf("apiUrl" to "https://api.example.com")).apiUrl)
    val l = LoggingList<String>(); l.add("tea"); l.add("cake")
    println("size ${l.size}, contains tea: ${"tea" in l}, MAX_ITEMS=$MAX_ITEMS")
    val f = File.createTempFile("orders", ".csv").apply { writeText("id,item\n1,tea\n2,cake\n"); deleteOnExit() }
    val count = f.bufferedReader().use { reader -> reader.lineSequence().drop(1).count() }
    println("orders: $count")
    val people = listOf(Resident("Linus", "Helsinki"), Resident("Ada", "London"), Resident("Alan", "London"))
    println(people.sortedWith(compareBy({ it.city }, { it.name })).map { it.name })
}
