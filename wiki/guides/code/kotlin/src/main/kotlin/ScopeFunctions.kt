data class Request(var url: String = "", var method: String = "GET", val headers: MutableMap<String, String> = mutableMapOf())

fun main() {
    // apply: configure an object, returns the object (this)
    val request = Request().apply {
        url = "https://api.example.com/orders"
        method = "POST"
        headers["Content-Type"] = "application/json"
    }
    println(request)

    // also: side effect, returns the object (it)
    val numbers = mutableListOf(3, 1, 2).also { println("before sorting: $it") }.apply { sort() }
    println("after: $numbers")

    // let: transform a value, often after ?. , returns the lambda result (it)
    val email: String? = "ADA@EXAMPLE.COM"
    val normalized = email?.let { it.trim().lowercase() } ?: "none"
    println(normalized)

    // run: compute with this, returns the lambda result
    val summary = request.run { "$method $url (${headers.size} header)" }
    println(summary)

    // with: like run, but not an extension: with(obj) { ... }
    val report = with(StringBuilder()) {
        appendLine("Report")
        appendLine("orders: 3")
        toString()
    }
    print(report)

    // takeIf / takeUnless
    val port = "8080".toIntOrNull()?.takeIf { it in 1..65535 } ?: 443
    println("port $port")
}
