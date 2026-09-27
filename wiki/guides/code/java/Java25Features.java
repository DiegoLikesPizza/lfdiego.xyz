import module java.base;

public class Java25Features {
    static class Amount { final long cents; Amount(long cents) { this.cents = cents; } }
    static class PositiveAmount extends Amount {
        PositiveAmount(long cents) {
            if (cents <= 0) throw new IllegalArgumentException("must be positive");
            super(cents);
        }
    }
    public static void main(String[] args) {
        List<String> l = List.of("module import works");
        System.out.println(l.getFirst() + ", " + new PositiveAmount(5).cents);
        try { new PositiveAmount(0); } catch (IllegalArgumentException e) { System.out.println(e.getMessage()); }
    }
}
