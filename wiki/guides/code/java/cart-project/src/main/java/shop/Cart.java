package shop;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private final List<Item> items = new ArrayList<>();

    public void add(Item item) { items.add(item); }

    public List<Item> items() { return List.copyOf(items); }

    public int totalCents() {
        return items.stream().mapToInt(Item::totalCents).sum();
    }

    /** 10 % off from 50 euros. */
    public int totalWithDiscountCents() {
        int total = totalCents();
        return total >= 5000 ? total - total / 10 : total;
    }
}
