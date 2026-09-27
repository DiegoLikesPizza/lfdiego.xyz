import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class RecordsEnums {
    record Item(String name, int priceCents) {
        Item {                                              // compact constructor: validation
            if (priceCents < 0) throw new IllegalArgumentException("negative price: " + priceCents);
            name = name.strip();
        }
        Item withPrice(int newPrice) { return new Item(name, newPrice); }   // "wither"
        static Item free(String name) { return new Item(name, 0); }
    }

    enum Size {
        SMALL(250), MEDIUM(400), LARGE(500);
        private final int ml;
        Size(int ml) { this.ml = ml; }
        int ml() { return ml; }
        Size bigger() { return this == LARGE ? LARGE : values()[ordinal() + 1]; }
    }

    enum Op {
        PLUS("+") { int apply(int a, int b) { return a + b; } },
        TIMES("*") { int apply(int a, int b) { return a * b; } };
        final String symbol;
        Op(String symbol) { this.symbol = symbol; }
        abstract int apply(int a, int b);
    }

    public static void main(String[] args) {
        var tea = new Item("  Tea ", 250);
        System.out.println(tea + " name=[" + tea.name() + "] price=" + tea.priceCents());
        System.out.println("equals by value: " + tea.equals(new Item("Tea", 250)));
        System.out.println(tea.withPrice(300) + " " + Item.free("Water"));
        try { new Item("Cake", -1); } catch (IllegalArgumentException e) { System.out.println("rejected: " + e.getMessage()); }

        Object o = tea;
        if (o instanceof Item(String name, int price) && price > 100) {       // record pattern
            System.out.println("deconstructed: " + name + " costs " + price);
        }

        Size s = Size.valueOf("MEDIUM");
        System.out.println(s + " = " + s.ml() + " ml, ordinal " + s.ordinal() + ", bigger: " + s.bigger());
        System.out.println("values: " + List.of(Size.values()));
        for (Op op : Op.values()) System.out.print("6 " + op.symbol + " 7 = " + op.apply(6, 7) + "   ");
        System.out.println();
        Map<Size, Integer> sold = new EnumMap<>(Size.class);
        sold.merge(Size.LARGE, 1, Integer::sum);
        sold.merge(Size.SMALL, 2, Integer::sum);
        sold.merge(Size.LARGE, 1, Integer::sum);
        System.out.println("EnumMap (declaration order): " + sold);
        String msg = switch (s) {
            case SMALL -> "a sip";
            case MEDIUM -> "a cup";
            case LARGE -> "a bucket";
        };
        System.out.println(msg);
        try { Size.valueOf("HUGE"); } catch (IllegalArgumentException e) { System.out.println(e.getMessage()); }

    }
}
