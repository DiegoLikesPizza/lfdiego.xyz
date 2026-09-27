# Arrays

An array is a **fixed-size** sequence of elements of one type. Most of the time you'll want a `List` instead ([[java/Collections]]), but arrays are everywhere in APIs (`main(String[] args)`, `split()`) and for performance-critical code. Output from `code/java/ArraysDemo.java`.

## Creating and indexing
```java
int[] scores = {90, 72, 85};
String[] names = new String[3];          // [null, null, null]
int[][] grid = new int[2][3];            // 2 rows, 3 columns, all 0
grid[1][2] = 7;
System.out.println("scores.length = " + scores.length + ", first = " + scores[0]);
```
```
scores.length = 3, first = 90
```
- Indexes start at **0**; the last is `length - 1`.
- New arrays are filled with defaults: `0`, `false`, `null`.
- `length` is a field, not a method (`scores.length`, but `list.size()`, `text.length()`).

## Printing an array
`System.out.println(scores)` prints something like `[I@1b6d3586` (type code and hash), not the contents. Use `java.util.Arrays`:
```java
System.out.println(Arrays.toString(scores));
System.out.println(Arrays.toString(names));
System.out.println(Arrays.deepToString(grid));    // nested arrays
```
```
[90, 72, 85]
[null, null, null]
[[0, 0, 0], [0, 0, 7]]
```

## The `Arrays` utility class
```java
int[] sorted = scores.clone();
Arrays.sort(sorted);
```
```
sorted copy = [72, 85, 90], original = [90, 72, 85]
binarySearch(85) = 1
copyOf(scores, 5) = [90, 72, 85, 0, 0]
fill = [9, 9, 9, 9]
equals: true, == : false
sum via stream = 247, max = 90
```
| Method | Does |
|---|---|
| `Arrays.sort(a)` | sorts in place |
| `Arrays.binarySearch(a, x)` | finds `x` in a **sorted** array |
| `Arrays.copyOf(a, n)` / `copyOfRange` | copies, padding or cutting |
| `Arrays.fill(a, v)` | fills |
| `Arrays.equals(a, b)` | compares contents (`==` compares references!) |
| `Arrays.stream(a)` | to a stream: `sum()`, `max()`, `filter()` |
| `Arrays.asList(a)` | a fixed-size `List` view |

## Out of bounds
```java
System.out.println(scores[3]);
```
```
scores[3]: Index 3 out of bounds for length 3
```
That's an `ArrayIndexOutOfBoundsException`. Classic cause: `for (int i = 0; i <= a.length; i++)` (should be `<`). Prefer for-each loops, which can't go out of bounds.

## Arrays vs lists
| | Array `String[]` | `List<String>` |
|---|---|---|
| Size | fixed at creation | grows and shrinks |
| Primitives | yes (`int[]`, no boxing) | no (`List<Integer>`, boxed) |
| Methods | only `length` + `Arrays.*` | `add`, `remove`, `contains`, `sort`, streams… |
| Generics | awkward | natural |
| Printing, equals | need `Arrays.*` | work directly |

Convert:
```java
List<String> list = List.of(back);                   // array → unmodifiable list
String[] back = list.toArray(String[]::new);         // list → array
```

## Varargs are arrays
A `String... args` parameter is a `String[]` inside the method ([[java/Methods]]).
