# Classes and Objects

A **class** is a blueprint; an **object** (instance) is a concrete thing made from it with `new`. Output from `code/java/Classes.java`.

## A complete class
```java
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
```
```java
var tea = new Product("T-1", "Tea", 250);
var tea2 = new Product("T-1", "Green tea", 300);
var gift = new Product("G-9", "Gift card");
tea.raiseBy(10);
```
```
Product[T-1, Tea, 275 ct] / Product[G-9, Gift card, 0 ct]
created: 3
tea.equals(tea2): true, tea == tea2: false
set size: 1
rejected: price must be >= 0, was -5
```

## Constructors
- Same name as the class, no return type.
- `this.sku = sku` distinguishes the field from the parameter.
- `this(…)` calls another constructor of the same class (must be the first statement… or, since Java 25, after validation code that doesn't touch `this`).
- No constructor written → Java adds an empty default one. Write one → the default disappears.
- **Validate** in the constructor: an object that exists should always be valid.

## `static` vs instance
| | Instance member | `static` member |
|---|---|---|
| Belongs to | each object | the class itself |
| Access | `tea.getName()` | `Product.created()` |
| Can use | fields of `this` | only static members |

Using an instance field from a static method is a compile error:
```
Cart4.java:7: error: non-static variable count cannot be referenced from a static context
        count++;
        ^
```
`main` is static, so beginners hit this constantly. Fix: create an object (`new Cart4().run()`) and put the logic in instance methods.

Use `static` for: constants (`static final`), factory methods (`Item.free("Water")`), pure utility functions (`Math.max`). Avoid mutable static fields: they're global state shared by all threads.

## equals, hashCode, toString
Every class inherits them from `Object`. The defaults compare **identity** and print a type name plus hash:
```
without equals(): false, toString: Classes$NoEquals@1b6d3586
```
(the number after `@` differs on every run). Override them for value-like classes:
- **`equals`**: same content = equal. Reflexive, symmetric, transitive, consistent, `x.equals(null)` is false.
- **`hashCode`**: **must** be overridden together with `equals`: equal objects need equal hash codes, or `HashSet`/`HashMap` break ([[java/Maps and Hashing]]).
- **`toString`**: for logs and debugging.

For data carriers, a **record** generates all three correctly ([[java/Records and Enums]]). IDEs generate them for classes (*Generate → equals() and hashCode()*).

## Encapsulation
Fields are `private`; the outside world uses methods. That lets the class guarantee its rules (price never negative) and change its internals later. Don't generate a setter for every field by reflex: `raiseBy(percent)` says more than `setPriceCents(…)`, and fields without setters can be `final`.

## Immutability
An immutable object can't change after construction: all fields `final`, no setters, defensive copies of mutable inputs (`List.copyOf(items)`). Benefits: thread-safe, safe to share and cache, safe as map keys, easier to reason about. `String`, `Integer`, `LocalDate` and records are immutable. Prefer immutable unless you have a reason not to.

## Nested classes
| Kind | Declared | Has access to |
|---|---|---|
| static nested class | `static class Node` inside another class | the outer class's static members |
| inner class | `class Node` (no `static`) | the outer **instance** (hidden reference) |
| local class | inside a method | effectively final local variables |
| anonymous class | `new Comparator<>() { … }` | same; mostly replaced by lambdas |

Default to `static` nested classes; inner classes keep their outer object alive.
