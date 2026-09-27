# Optional

`Optional<T>` is a box that holds **one value or nothing**. It makes "there may be no result" visible in a method's signature instead of returning `null` and hoping the caller checks. Output from `code/java/OptionalDemo.java`.

## Returning an Optional
```java
static Optional<User> findById(int id) {
    return users.stream().filter(u -> u.id() == id).findFirst();
}
Optional<User> found = findById(1);
Optional<User> missing = findById(9);
```

## Getting the value out
```java
System.out.println(found.map(User::name).orElse("unknown") + " / " + missing.map(User::name).orElse("unknown"));
found.ifPresent(u -> System.out.println("found " + u.name()));
missing.ifPresentOrElse(u -> System.out.println("found"), () -> System.out.println("no user 9"));
```
```
Ada / unknown
found Ada
no user 9
```
| Method | Returns / does |
|---|---|
| `map(f)` | transform the value if present |
| `flatMap(f)` | when `f` itself returns an Optional |
| `filter(p)` | empty if the value doesn't match |
| `orElse(x)` | the value, or `x` |
| `orElseGet(() -> x)` | the value, or compute `x` **only if needed** |
| `orElseThrow()` | the value, or `NoSuchElementException` |
| `orElseThrow(() -> new NotFoundException(…))` | the value, or your exception |
| `ifPresent(c)`, `ifPresentOrElse(c, r)` | run code |
| `or(() -> other)` | fall back to another Optional |
| `isPresent()`, `isEmpty()` | test |
| `stream()` | 0 or 1 elements, for `flatMap` in streams |

## Nulls turn into empty
```java
Optional<String> email = findById(2).map(User::email);        // email is null -> empty Optional
```
```
Bo's email: (none), isPresent: false
```
`map` treats a `null` result as empty. `Optional.ofNullable(x)` wraps a possibly-null value; `Optional.of(null)` throws.

## Errors
```
orElseThrow: No user with id 9
get() on empty: No value present
```
`get()` on an empty Optional throws `NoSuchElementException: No value present`. Avoid `get()`; `orElseThrow()` does the same with a clearer name.

## `orElse` vs `orElseGet`
```java
found.orElse(expensiveDefault("orElse"));
found.orElseGet(() -> expensiveDefault("orElseGet"));
```
```
  expensiveDefault() called by orElse
```
`orElse`'s argument is **always** evaluated, even when the value is present. For anything costly (database call, object creation), use `orElseGet`.

## Guidelines
- ✅ Return type of methods that may find nothing: `findById`, `findFirst`, `max`.
- ❌ Not for fields, parameters or collections (`Optional<List<…>>`: return an empty list instead).
- ❌ Don't write `if (opt.isPresent()) { opt.get() … }`: use `map`/`orElse`/`ifPresent`.
- ❌ Never return `null` from a method declared to return `Optional`.

In Kotlin, nullable types (`User?`) replace Optional entirely: [[kotlin/Null Safety]].
