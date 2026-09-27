# Methods

A method is a named block of code with parameters and a return type. Output from `code/java/Methods.java`.

## Declaring
```java
//  modifiers  return type  name   parameters
    static     int          add    (int a, int b) {
        return a + b;
    }
```
- `void` = returns nothing.
- `static` methods belong to the class (`Methods.add(2, 3)`); instance methods need an object (`cart.total()`). → [[java/Classes and Objects]]
- A method with a non-void return type must return on **every** path:
```
Cart5.java:4: error: missing return statement
    }
    ^
```

## Overloading
Same name, different parameter lists:
```java
static int add(int a, int b) { return a + b; }
static double add(double a, double b) { return a + b; }
```
```
5 3.0
```
The compiler picks the best match at compile time. Overloads differing only in return type are not allowed.

## Varargs
```java
static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}
```
```
0 1 10
```
Inside the method, `numbers` is an `int[]`. Only the last parameter can be varargs. `String.format`, `List.of` and `printf` use this.

## Recursion
```java
static long factorial(int n) { return n <= 1 ? 1 : n * factorial(n - 1); }
```
```
20! = 2432902008176640000, 21! overflows to -4249290049419214848
```
Two lessons: recursion needs a base case (without one: `StackOverflowError`), and `long` silently overflows ([[java/Primitive Types]]). Use `BigInteger` or `Math.multiplyExact` (throws on overflow) when it matters.

## Java passes everything by value
Java copies the **value** of each argument. For objects, that value is a **reference**, so a method can change the object, but not the caller's variable:
```java
static void rename(User u) { u.setName("Changed"); }       // changes the object
static void reassign(User u) { u = new User("New"); }      // changes only the local copy
static void increment(int x) { x++; }
```
```
after rename(): Changed
after reassign(): Changed
after increment(count): 3
```
Explained with diagrams: [[java/References and Memory]].

## Good methods
- **Do one thing**, and name it after that thing: `calculateTotal`, `isValidName`, `sendResetMail`.
- **Short**: if you need a comment to explain a section, it probably wants to be its own method.
- **Few parameters**: more than 3–4 suggests an object (a record) should be passed instead.
- **Validate** arguments at the start and fail fast: `Objects.requireNonNull(customer)`, `if (qty < 1) throw new IllegalArgumentException(...)`.
- Return empty collections or `Optional`, not `null` ([[java/Optional]]).

## main
The entry point of a program:
```java
public static void main(String[] args) { ... }
```
Since Java 25 it can be much shorter in a compact source file: `void main() { ... }`. → [[java/Modern Java]]
