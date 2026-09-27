import java.util.List;

public class Cart {
    private final List<Item> items;

    public Cart(List<Item> items) {
        this.items = items;
    }

    public int total() {
        int sum = 0
        for (Item item : items) {
            sum += item.price();
        }
        return sum;
    }
}
