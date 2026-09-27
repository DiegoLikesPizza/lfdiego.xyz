import kotlinx.coroutines.*

suspend fun slowUser(): String {
    try { delay(5_000); return "never" }
    catch (e: CancellationException) { println("  slowUser() was cancelled"); throw e }
}
suspend fun failingOrders(): Int { delay(100); throw IllegalStateException("order service down") }

suspend fun cpuWork(): Int = withContext(Dispatchers.Default) {
    var n = 0
    for (i in 1..50_000_000) {
        if (i % 1_000_000 == 0) ensureActive()      // cooperative cancellation point
        n += i % 7
    }
    n
}

fun main() = runBlocking {
    val start = System.currentTimeMillis()
    try {
        coroutineScope {
            async { slowUser() }
            async { failingOrders() }
        }
    } catch (e: IllegalStateException) {
        println("failed after ~${(System.currentTimeMillis() - start) / 50 * 50} ms: ${e.message}")
    }

    println("--- supervisorScope: siblings keep running")
    supervisorScope {
        val a = async { delay(50); "profile loaded" }
        val b = async<String> { delay(10); throw IllegalStateException("ads failed") }
        println("  ${a.await()}")
        println("  ${runCatching { b.await() }.exceptionOrNull()?.message}")
    }

    println("--- catching CancellationException by accident")
    val job = launch {
        try { delay(1000) } catch (e: Exception) { println("  swallowed ${e::class.simpleName} (don't do this)") }
        println("  still running after cancel: isActive=$isActive")
    }
    delay(50); job.cancel(); job.join()

    val handler = CoroutineExceptionHandler { _, e -> println("handler: ${e.message}") }
    val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default + handler)
    scope.launch { throw IllegalStateException("background task crashed") }.join()
    scope.cancel()
    val cpu = async { cpuWork() }
    delay(20); cpu.cancel()
    println("CPU loop cancelled: ${cpu.isCancelled}")
}
