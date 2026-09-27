# Records and Enums

Two special kinds of class that save a lot of code. Output from `code/java/RecordsEnums.java`.

## Records (Java 16+)
A **record** is a compact, immutable data carrier. One line gives you private final fields, a constructor, accessors, `equals`, `hashCode` and `toString`:
```java
record Item(String name, int priceCents) {
    Item {                                              // compact constructor: validation
        if (priceCents < 0) throw new IllegalArgumentException("negative price: " + priceCents);
        name = name.strip();
    }
    Item withPrice(int newPrice) { return new Item(name, newPrice); }   // "wither"
    static Item free(String name) { return new Item(name, 0); }
}
```
```java
var tea = new Item("  Tea ", 250);
System.out.println(tea + " name=[" + tea.name() + "] price=" + tea.priceCents());
System.out.println("equals by value: " + tea.equals(new Item("Tea", 250)));
System.out.println(tea.withPrice(300) + " " + Item.free("Water"));
```
```
Item[name=Tea, priceCents=250] name=[Tea] price=250
equals by value: true
Item[name=Tea, priceCents=300] Item[name=Water, priceCents=0]
rejected: negative price: -1
```
- Accessors are named like the component: `name()`, not `getName()`.
- The **compact constructor** runs before the fields are assigned; it can validate and normalise parameters.
- Records can have methods, static factories and implement interfaces, but **no extra instance fields** and they can't extend a class.
- Fields are final, but a `List` component can still be mutated from outside: copy it in the constructor (`items = List.copyOf(items);`).

### Record patterns (Java 21+)
```java
Object o = tea;
if (o instanceof Item(String name, int price) && price > 100) {
    System.out.println("deconstructed: " + name + " costs " + price);
}
```
```
deconstructed: Tea costs 250
```
Also in `switch`: [[java/Switch and Pattern Matching]].

### When to use a record
DTOs, API responses, events, map keys, results with several values, value objects like `Money` or `Point`. Not for JPA entities (they need mutability and a no-arg constructor) or classes whose identity matters more than their data.

## Enums
An **enum** is a type with a fixed set of instances:
```java
enum Size {
    SMALL(250), MEDIUM(400), LARGE(500);
    private final int ml;
    Size(int ml) { this.ml = ml; }
    int ml() { return ml; }
    Size bigger() { return this == LARGE ? LARGE : values()[ordinal() + 1]; }
}
```
```java
Size s = Size.valueOf("MEDIUM");
System.out.println(s + " = " + s.ml() + " ml, ordinal " + s.ordinal() + ", bigger: " + s.bigger());
System.out.println("values: " + List.of(Size.values()));
```
```
MEDIUM = 400 ml, ordinal 1, bigger: LARGE
values: [SMALL, MEDIUM, LARGE]
```
- Compare with `==` (each constant exists exactly once).
- `valueOf` with an unknown name throws: `No enum constant RecordsEnums.Size.HUGE`.
- Don't persist `ordinal()`: adding a constant in the middle shifts every number. Store `name()`.

### Enums with behaviour
Each constant can implement an abstract method:
```java
enum Op {
    PLUS("+") { int apply(int a, int b) { return a + b; } },
    TIMES("*") { int apply(int a, int b) { return a * b; } };
    final String symbol;
    Op(String symbol) { this.symbol = symbol; }
    abstract int apply(int a, int b);
}
```
```
6 + 7 = 13   6 * 7 = 42
```

### Exhaustive switch
```java
String msg = switch (s) {
    case SMALL -> "a sip";
    case MEDIUM -> "a cup";
    case LARGE -> "a bucket";
};
```
```
a cup
```
No `default` needed: the compiler checks that every constant is covered. Add a constant, and every such switch fails to compile until you handle it.

### EnumMap and EnumSet
Fast, ordered collections keyed by enums:
```java
Map<Size, Integer> sold = new EnumMap<>(Size.class);
sold.merge(Size.LARGE, 1, Integer::sum);
sold.merge(Size.SMALL, 2, Integer::sum);
sold.merge(Size.LARGE, 1, Integer::sum);
```
```
EnumMap (declaration order): {SMALL=2, LARGE=2}
```
`EnumSet.of(Size.SMALL, Size.LARGE)`, `EnumSet.allOf(Size.class)`.

## Records + sealed interfaces = algebraic data types
Together they model "one of these shapes, each with its own data", checked by the compiler: [[java/Sealed Types]].
