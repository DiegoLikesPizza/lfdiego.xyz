# Lambdas and Functional Interfaces

A **lambda** is a short anonymous function you can pass around like a value: `x -> x * 2`. It implements a **functional interface**, an interface with exactly one abstract method. Output from `code/java/Lambdas.java`.

## Syntax
```java
x -> x * 2                               // one parameter
(a, b) -> a + b                          // several
() -> "hello"                            // none
(String s) -> s.length()                 // explicit type
u -> {                                    // block body
    log.info("checking {}", u);
    return u.age() >= 18;
}
```

## The standard functional interfaces
| Interface | Shape | Example |
|---|---|---|
| `Function<T, R>` | T → R | `String::length` |
| `Predicate<T>` | T → boolean | `age -> age >= 18` |
| `Consumer<T>` | T → nothing | `System.out::println` |
| `Supplier<T>` | nothing → T | `ArrayList::new` |
| `BiFunction<T, U, R>` | (T, U) → R | `(a, b) -> a + b` |
| `UnaryOperator<T>` | T → T | `String::strip` |
| `BinaryOperator<T>` | (T, T) → T | `BinaryOperator.maxBy(…)` |
| `Runnable` | () → nothing | `() -> sendMail()` |
| `Comparator<T>` | (T, T) → int | `Comparator.comparing(User::age)` |

Primitive versions avoid boxing: `IntPredicate`, `ToIntFunction<T>`, `IntUnaryOperator`…
```java
Function<String, Integer> length = String::length;
Predicate<Integer> adult = age -> age >= 18;
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
```
```
length("hello") = 5
adult(17) = false, adult.negate()(17) = true
add(2, 3) = 5, max(4, 9) = 9, trim = [x]
[made by a Supplier]
```

## Composing
```java
Function<Integer, Integer> times2 = x -> x * 2;
Function<Integer, Integer> plus3 = x -> x + 3;
```
```
times2.andThen(plus3)(5) = 13, times2.compose(plus3)(5) = 16
```
`andThen` = this, then that; `compose` = that, then this. Predicates have `and`, `or`, `negate`; comparators `reversed`, `thenComparing`.

## Method references
When a lambda just calls one method, write the method reference instead:
| Kind | Reference | Same as |
|---|---|---|
| static method | `Integer::parseInt` | `s -> Integer.parseInt(s)` |
| method of a particular object | `prefix::concat` | `s -> prefix.concat(s)` |
| method of an arbitrary object | `User::name` | `u -> u.name()` |
| constructor | `StringBuilder::new` | `s -> new StringBuilder(s)` |
```
43 | Hello Ada | Bo | bs
```

## Effectively final
Lambdas capture **values**, not variables. A local variable used in a lambda must not change afterwards:
```java
int limit = 18;
Predicate<User> isAdult = u -> u.age() >= limit;
// limit++;   // compile error
```
```
local variables referenced from a lambda expression must be final or effectively final
```
Fields can change (the lambda captures `this`), but mutating shared state from lambdas, especially in parallel streams, is asking for bugs.

## Your own functional interface
```java
@FunctionalInterface interface PriceRule { int apply(int cents); }
PriceRule tenOff = c -> c * 90 / 100;
PriceRule minus200 = c -> Math.max(0, c - 200);
```
```
rules on 1000 ct: 900, 800
```
`@FunctionalInterface` makes the compiler check there's exactly one abstract method. A domain name like `PriceRule` reads better than `IntUnaryOperator`.

## Comparators: the most common lambdas
```java
users.sort(Comparator.comparingInt(User::age).reversed());
users.sort(Comparator.comparing(User::city).thenComparing(User::name));
```
```
by age desc: [Grace, Ada, Linus]
by city: [Linus, Ada, Grace]
```
Also `Comparator.nullsLast(…)`, `Comparator.naturalOrder()`, `Map.Entry.comparingByValue()`.

## Lambdas vs anonymous classes
Before Java 8:
```java
Collections.sort(users, new Comparator<User>() {
    @Override public int compare(User a, User b) { return Integer.compare(a.age(), b.age()); }
});
```
A lambda is shorter, and `this` inside it means the enclosing object (in an anonymous class, the anonymous object). Next: using lambdas in [[java/Streams]].
