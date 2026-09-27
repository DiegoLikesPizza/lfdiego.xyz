import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

data class Dashboard(val user: String, val orders: Int)

object Api {
    suspend fun user(): String { delay(100); return "Ada" }
    suspend fun orders(): Int { delay(150); return 3 }
}

suspend fun loadDashboard(): Dashboard = coroutineScope {
    val user = async { Api.user() }      // starts now
    val orders = async { Api.orders() }  // runs concurrently
    Dashboard(user.await(), orders.await())
}

fun rounded(ms: Long) = ms / 50 * 50

fun main() = runBlocking {
    val sequential = measureTimeMillis { Dashboard(Api.user(), Api.orders()) }
    val concurrent = measureTimeMillis { println(loadDashboard()) }
    println("sequential ~${rounded(sequential)} ms, concurrent ~${rounded(concurrent)} ms")

    val job = launch {
        repeat(10) { i -> println("working $i"); delay(40) }
    }
    delay(100)
    job.cancelAndJoin()
    println("job cancelled: ${job.isCancelled}")

    val time = measureTimeMillis {
        coroutineScope { repeat(100_000) { launch { delay(1000) } } }
    }
    println("100,000 coroutines each waiting 1 s: ${rounded(time)} ms total")

    val result = withTimeoutOrNull(200) { delay(1000); "too slow" }
    println("withTimeoutOrNull: $result")

    val thread = withContext(Dispatchers.IO) { Thread.currentThread().name.substringBefore(" @") }
    println("withContext(Dispatchers.IO) ran on $thread")
}
