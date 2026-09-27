import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Classes {
    static class Product {
        private static int created = 0;          // one per class, shared
        private final String sku;                // one per object
        private String name;
        private int priceCents;

        Product(String sku, String name, int priceCents) {
            if (priceCents < 0) throw new IllegalArgumentException("price must be >= 0, was " + priceCents);
            this.sku = sku;
            this.name = name;
            this.priceCents = priceCents;
            created++;
        }

        Product(String sku, String name) { this(sku, name, 0); }   // constructor chaining

        String getName() { return name; }
        int getPriceCents() { return priceCents; }
        void raiseBy(int percent) { priceCents += priceCents * percent / 100; }
        static int created() { return created; }

        @Override public boolean equals(Object o) {
            return o instanceof Product p && sku.equals(p.sku);   // same SKU = same product
        }
        @Override public int hashCode() { return Objects.hash(sku); }
        @Override public String toString() { return "Product[" + sku + ", " + name + ", " + priceCents + " ct]"; }
    }

    static class NoEquals {
        final String id;
        NoEquals(String id) { this.id = id; }
    }

    public static void main(String[] args) {
        var tea = new Product("T-1", "Tea", 250);
        var tea2 = new Product("T-1", "Green tea", 300);
        var gift = new Product("G-9", "Gift card");
        tea.raiseBy(10);
        System.out.println(tea + " / " + gift);
        System.out.println("created: " + Product.created());
        System.out.println("tea.equals(tea2): " + tea.equals(tea2) + ", tea == tea2: " + (tea == tea2));
        Set<Product> set = new HashSet<>();
        set.add(tea); set.add(tea2);
        System.out.println("set size: " + set.size());

        var x = new NoEquals("a");
        var y = new NoEquals("a");
        System.out.println("without equals(): " + x.equals(y) + ", toString: " + x.toString().replaceAll("@[0-9a-f]+", "@1b6d3586"));
        try {
            new Product("X", "Broken", -5);
        } catch (IllegalArgumentException e) {
            System.out.println("rejected: " + e.getMessage());
        }
    }
}
