import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun ticker(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(100)
    }
}

@OptIn(FlowPreview::class, ExperimentalCoroutinesApi::class)
fun main() = runBlocking {
    ticker()
        .filter { it % 2 == 0 }
        .map { "tick $it" }
        .take(3)
        .collect { println(it) }     // tick 0, tick 2, tick 4

    val cold = flow { println("  flow started"); emit(1); emit(2) }
    println("collect twice: ${cold.toList()} ${cold.toList()}")

    // search-as-you-type: typing "k", "ko", "kot" quickly, then "kotlin" after a pause
    val queries = flow {
        emit("k"); delay(50); emit("ko"); delay(50); emit("kot"); delay(400)
        emit("kotlin"); delay(400); emit("kotlin")
    }
    queries
        .debounce(300)
        .distinctUntilChanged()
        .flatMapLatest { q -> flow { delay(100); emit("results for '$q'") } }
        .collect { println(it) }

    val state = MutableStateFlow("idle")
    val collector = launch { state.collect { println("  state: $it") } }
    delay(50); state.value = "loading"; delay(50); state.value = "loading"; delay(50); state.value = "done"; delay(50)
    collector.cancel()
    println("StateFlow current value: ${state.value}")

    val events = MutableSharedFlow<String>()
    val listener = launch { events.collect { println("  event: $it") } }
    delay(50); events.emit("clicked"); events.emit("clicked"); delay(50)
    listener.cancel()

    val combined = combine(flowOf(1, 2), flowOf("a")) { n, s -> "$n$s" }.toList()
    println("combine: $combined, zip: ${flowOf(1, 2, 3).zip(flowOf("a", "b")) { n, s -> "$n$s" }.toList()}")
    flow { emit(1); throw IllegalStateException("sensor offline") }
        .catch { e -> emit(-1).also { println("  caught ${e.message}") } }
        .collect { println("  value $it") }
}
