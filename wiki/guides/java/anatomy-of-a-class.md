# Anatomy of a Class

Everything in Java lives inside a type. Here's a small shopping cart, part by part (it's the real `Cart` from `code/java/cart-project/`, tested by JUnit).

```java
package shop;                                   // 1
import java.util.ArrayList;
import java.util.List;

public class Cart {                             // 2
    private final List<Item> items = new ArrayList<>();   // 3

    public void add(Item item) { items.add(item); }       // 5

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
```
```java
package shop;

public record Item(String name, int priceCents, int quantity) {       // 6
    public Item {                                                      // 4
        if (priceCents < 0) throw new IllegalArgumentException("negative price: " + priceCents);
        if (quantity < 1) throw new IllegalArgumentException("quantity must be at least 1");
    }

    public Item(String name, int priceCents) { this(name, priceCents, 1); }

    public static boolean isValidName(String name) { return name != null && !name.isBlank(); }

    public int totalCents() { return priceCents * quantity; }
}
```

| # | Part | What it does |
|---|---|---|
| 1 | **Package & imports** | the package matches the folder (`src/main/java/shop/`). Imports pull in types from other packages ([[java/Access Modifiers and Packages]]) |
| 2 | **Class declaration** | `public` means any code can use it. One public class per file, named like the file |
| 3 | **Field** | `private` hides it from outside code; `final` means it's assigned once |
| 4 | **Constructor** | runs on `new …`. Validates input so an invalid object can never exist |
| 5 | **Method** | declares its return type. Instance methods can read the object's fields |
| 6 | **Record** | a compact, immutable data class: constructor, accessors, `equals`, `hashCode` and `toString` for free ([[java/Records and Enums]]) |

## Member order convention
1. static constants (`private static final int MAX = 10;`)
2. static fields
3. instance fields
4. constructors
5. public methods, then private helpers (or helpers right below the method that uses them)
6. nested types

## File and name rules
- A file may contain several top-level types, but only **one public** one, named like the file:
```
Shop.java:1: error: class Checkout is public, should be declared in a file named Checkout.java
public class Checkout { }
       ^
```
- `PascalCase` class names, nouns (`Cart`, `PriceFormatter`). Methods are verbs (`add`, `totalCents`).

## What goes in a class?
A class should have **one reason to change**. `Cart` knows about items and totals; it doesn't send e-mails, format euros or save itself to a database. Those are other classes (`CheckoutMailer`, `PriceFormatter`, `CartRepository`), connected through constructors ([[java/Inheritance and Composition]]).

Continue with [[java/Classes and Objects]] for constructors, `this`, `static`, `equals` and `hashCode`.
