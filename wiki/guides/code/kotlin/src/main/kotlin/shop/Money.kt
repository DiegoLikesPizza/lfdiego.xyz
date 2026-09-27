package shop

data class Money(val cents: Long) {
    fun format() = "%d.%02d €".format(cents / 100, cents % 100)

    companion object {
        fun zero() = Money(0)
        @JvmStatic fun parse(text: String) = Money((text.toBigDecimal() * 100.toBigDecimal()).toLong())
    }
}
