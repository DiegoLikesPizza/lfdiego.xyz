package shop;

public record Item(String name, int priceCents, int quantity) {
    public Item {
        if (priceCents < 0) throw new IllegalArgumentException("negative price: " + priceCents);
        if (quantity < 1) throw new IllegalArgumentException("quantity must be at least 1");
    }

    public Item(String name, int priceCents) { this(name, priceCents, 1); }

    public static boolean isValidName(String name) { return name != null && !name.isBlank(); }

    public int totalCents() { return priceCents * quantity; }
}
