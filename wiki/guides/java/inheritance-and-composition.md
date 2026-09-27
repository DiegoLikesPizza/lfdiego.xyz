# Inheritance and Composition

`extends` reuses a class and specialises it. It's powerful and easy to overuse. The usual advice: **prefer composition** ("has a") over inheritance ("is a") when unsure. Output from `code/java/Polymorphism.java`.

## Inheritance with an abstract class
```java
static abstract class Account {
    protected long balanceCents;
    void deposit(long cents) { balanceCents += cents; }
    abstract long monthlyFeeCents();
    void endOfMonth() { balanceCents -= monthlyFeeCents(); }
    @Override public String toString() { return getClass().getSimpleName() + "(" + balanceCents + " ct)"; }
}
static class Checking extends Account {
    long monthlyFeeCents() { return 300; }
}
static class Savings extends Account {
    long monthlyFeeCents() { return 0; }
    @Override void endOfMonth() {
        super.endOfMonth();
        balanceCents += balanceCents / 100;          // 1 % interest
    }
}
```
```java
List<Account> accounts = List.of(new Checking(), new Savings());
for (Account a : accounts) { a.deposit(10_000); a.endOfMonth(); }
System.out.println(accounts);
```
```
[Checking(9700 ct), Savings(10100 ct)]
```
- An **abstract class** can't be instantiated; it can have fields, constructors, implemented methods and `abstract` methods subclasses must implement.
- `super.endOfMonth()` calls the parent's version; `super(…)` in a constructor calls the parent constructor.
- Every class extends `Object` implicitly.
- `final class` can't be extended (`String` is final); `final` methods can't be overridden.

## Runtime type
```java
Account acc = new Savings();
System.out.println("acc instanceof Savings: " + (acc instanceof Savings) + ", runtime class: " + acc.getClass().getSimpleName());
```
```
acc instanceof Savings: true, runtime class: Savings
```
The **variable** type (`Account`) decides which methods you can call; the **object** type (`Savings`) decides which implementation runs.

## Abstract class or interface?
| | Interface | Abstract class |
|---|---|---|
| State (fields) | no (only constants) | yes |
| Constructors | no | yes |
| Multiple | a class implements many | a class extends one |
| Use for | a capability or contract (`Comparable`, `Notifier`) | a family sharing state and code |

Start with an interface. Add an abstract base class only if implementations really share state/code.

## Why inheritance gets messy
- **Tight coupling**: subclasses depend on the parent's internals; changing the parent can break them (the "fragile base class" problem).
- **Deep hierarchies** are hard to follow: where is `process()` actually implemented?
- **Wrong "is a"**: a `Square extends Rectangle` breaks when someone calls `setWidth` on it.
- Only **one** parent class: you can't combine behaviours.

## Composition
Instead of *being* something, a class *has* collaborators and delegates to them:
```java
class Checkout {
    private final PaymentProvider payments;   // Stripe, PayPal, a test fake…
    private final Notifier notifier;          // mail, SMS…
    private final PriceCalculator prices;

    Checkout(PaymentProvider payments, Notifier notifier, PriceCalculator prices) {
        this.payments = payments;
        this.notifier = notifier;
        this.prices = prices;
    }
}
```
Each piece is small, testable and replaceable, and combinations need no new subclasses. Frameworks like Spring create and wire these objects for you (**dependency injection**).

## Good uses of inheritance
- Framework base classes designed for it (`HttpServlet`, JUnit extensions, Android `Activity`).
- A closed family of types with shared state; often better as a sealed interface + records ([[java/Sealed Types]]).
- Exceptions: `class OutOfStockException extends RuntimeException` ([[java/Exceptions]]).

## Overriding rules
- Same name and parameters; return type may be a subtype (covariant).
- Can't reduce visibility (`public` stays `public`).
- Can't throw broader checked exceptions.
- `static` methods aren't overridden, only hidden.
- Always annotate with `@Override`.
