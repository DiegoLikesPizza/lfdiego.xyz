# Collections

Pick a collection by the question you'll ask it: **"in what order?"**, **"is it in there?"**, **"what's next?"** or **"what belongs to this key?"** Output from `code/java/CollectionsDemo.java`.

| Interface | Ordered? | Duplicates? | Implementations |
|---|---|---|---|
| `List` | by index | yes | **`ArrayList`** (the default), `LinkedList` (rarely faster in practice) |
| `Set` | depends | no | **`HashSet`** (fastest, no order), `LinkedHashSet` (insertion order), `TreeSet` (sorted) |
| `Queue` / `Deque` | FIFO / both ends | yes | **`ArrayDeque`** (stack or queue; use it instead of `Stack`), `PriorityQueue` (smallest first) |
| `Map` | depends | unique keys | **`HashMap`**, `LinkedHashMap`, `TreeMap` ([[java/Maps and Hashing]]) |

## Lists
```java
List<String> list = new ArrayList<>(List.of("tea", "cake", "tea"));
list.add("coffee");
list.remove("tea");                      // removes the first match
```
```
ArrayList: [cake, tea, coffee], get(0)=cake, indexOf(tea)=1
```

## Sets: three orders
```java
Set<String> hash = new HashSet<>(List.of("pear", "apple", "fig", "apple"));
Set<String> linked = new LinkedHashSet<>(List.of("pear", "apple", "fig", "apple"));
Set<String> tree = new TreeSet<>(List.of("pear", "apple", "fig", "apple"));
```
```
HashSet: [apple, pear, fig] | LinkedHashSet: [pear, apple, fig] | TreeSet: [apple, fig, pear]
contains(fig): true
```
`HashSet` order depends on hash codes: don't rely on it. `contains` is O(1) for hash sets versus O(n) for lists; for "is it in there?" on many elements, use a set.

## Stacks and queues
```java
Deque<String> stack = new ArrayDeque<>();
stack.push("a"); stack.push("b"); stack.push("c");
Deque<String> queue = new ArrayDeque<>();
queue.offer("first"); queue.offer("second");
PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 4, 2));
```
```
stack pop: c b
queue poll: first
PriorityQueue polls: 1 2 4 5
```

## Immutable vs mutable
```java
List<String> fixed = List.of("a", "b");
fixed.add("c");                       // throws UnsupportedOperationException
List<String> view = Arrays.asList("x", "y");
view.set(0, "z");                     // allowed (fixed size, but settable)
```
```
List.of is immutable: UnsupportedOperationException
Arrays.asList allows set: [z, y]
```
| Factory | Mutable? | nulls? |
|---|---|---|
| `new ArrayList<>(…)` | yes | yes |
| `List.of(…)`, `Set.of`, `Map.of` | no | **no** (throws) |
| `List.copyOf(list)` | no (a snapshot) | no |
| `Collections.unmodifiableList(list)` | no, but a **view**: changes to the original show through | yes |
| `Arrays.asList(array)` | set yes, add/remove no | yes |
| `stream.toList()` | no | yes |

Return immutable collections from methods; accept the interface type (`List<T>`) as parameters.

## Sorting and removing
```java
names.sort(Comparator.comparing(String::length).thenComparing(String.CASE_INSENSITIVE_ORDER));
names.removeIf(n -> n.length() < 3);
```
```
sorted by length, then name: [Bo, ada, Grace, Linus]
removeIf(length < 3): [ada, Grace, Linus]
```
Removing inside a for-each loop throws:
```
removing inside for-each: ConcurrentModificationException
```
Use `removeIf`, an explicit `Iterator` with `it.remove()`, or build a new list with a stream.

## Sequenced collections (Java 21)
```java
SequencedCollection<String> seq = new ArrayList<>(List.of("one", "two", "three"));
```
```
getFirst=one getLast=three reversed=[three, two, one]
```
`getFirst()`, `getLast()`, `addFirst()`, `reversed()` now work uniformly on lists, deques, `LinkedHashSet` and (as `SequencedMap`) `LinkedHashMap`.

## Performance at a glance
| Operation | ArrayList | LinkedList | HashSet/HashMap | TreeSet/TreeMap |
|---|---|---|---|---|
| get by index | O(1) | O(n) | – | – |
| add at end | O(1)* | O(1) | O(1)* | O(log n) |
| contains / get by key | O(n) | O(n) | O(1)* | O(log n) |
| insert in middle | O(n) | O(1) after finding the spot | – | – |

\*amortised/average. In practice `ArrayList` beats `LinkedList` almost always because arrays are cache-friendly.

## Utilities
`Collections.sort`, `reverse`, `shuffle`, `frequency`, `max`, `nCopies`, `emptyList`; `Collections.frequency(List.of(1, 2, 1), 1)` → `2`. For transforming and filtering, use [[java/Streams]].
