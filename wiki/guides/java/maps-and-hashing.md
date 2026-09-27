# Maps and Hashing

A `Map` stores **key → value** pairs: the classic lookup table. Output from `code/java/Maps.java`.

## The basics
```java
Map<String, Integer> stock = new HashMap<>();
stock.put("tea", 3);
stock.put("cake", 0);
stock.put("tea", 5);                          // replaces
```
```
stock = {tea=5, cake=0}, get(tea) = 5, get(pie) = null
getOrDefault(pie, 0) = 0, containsKey(cake) = true
```
`get` returns `null` for a missing key. Unboxing that `null` into an `int` throws a `NullPointerException`: use `getOrDefault` or `containsKey`.

## Counting and grouping: `merge` and `computeIfAbsent`
```java
Map<String, Integer> counts = new TreeMap<>();
for (String w : "the cat and the hat and the bat".split(" ")) counts.merge(w, 1, Integer::sum);

Map<String, List<String>> byInitial = new LinkedHashMap<>();
for (String n : List.of("Ada", "Alan", "Bo", "Barbara", "Cleo")) {
    byInitial.computeIfAbsent(n.substring(0, 1), k -> new ArrayList<>()).add(n);
}
```
```
word counts (TreeMap, sorted) = {and=2, bat=1, cat=1, hat=1, the=3}
computeIfAbsent grouping = {A=[Ada, Alan], B=[Bo, Barbara], C=[Cleo]}
```
These replace the old "if contains, get and update, else put" dance. With streams: `Collectors.groupingBy` / `counting()` ([[java/Streams]]).

## Iterating
```java
for (Map.Entry<String, Integer> e : stock.entrySet()) System.out.print(e.getKey() + "->" + e.getValue() + " ");
stock.forEach((k, v) -> System.out.print("[" + k + ":" + v + "] "));
```
```
tea->5 cake->0
[tea:5] [cake:0]
```
Also `keySet()` and `values()`.

## Which map?
| Map | Order | get/put |
|---|---|---|
| `HashMap` | none (don't rely on it) | O(1) |
| `LinkedHashMap` | insertion order (or access order: an LRU cache) | O(1) |
| `TreeMap` | sorted by key; `firstKey`, `headMap`, `ceilingKey` | O(log n) |
| `EnumMap` | enum declaration order | O(1), very compact ([[java/Records and Enums]]) |
| `ConcurrentHashMap` | none; safe for many threads | O(1) ([[java/Concurrency Basics]]) |
| `Map.of(…)` | unspecified; immutable, no nulls, max 10 pairs (`Map.ofEntries` for more) | – |

```java
SequencedMap<String, Integer> seq = new LinkedHashMap<>();
seq.put("first", 1); seq.put("second", 2); seq.putFirst("zero", 0);
```
```
SequencedMap: {zero=0, first=1, second=2}, firstEntry=zero=0, reversed={second=2, first=1, zero=0}
```

## How hashing works
A `HashMap` is an array of buckets. For a key it computes `hashCode()`, picks a bucket, then uses `equals()` to find the exact key in that bucket. Hence the **contract**:
1. If `a.equals(b)`, then `a.hashCode() == b.hashCode()`.
2. `hashCode` must not change while the object is a key.

Break rule 1 and lookups fail silently:
```java
static class BadKey {                     // equals without hashCode
    final String id;
    BadKey(String id) { this.id = id; }
    @Override public boolean equals(Object o) { return o instanceof BadKey b && b.id.equals(id); }
}
broken.put(new BadKey("a"), "found");
System.out.println("equals without hashCode: " + broken.get(new BadKey("a")));
```
```
equals without hashCode: null
```
The two equal keys land in different buckets. **Always override both together**, or use a record, which does it for you:
```java
record Point(int x, int y) {}
grid.put(new Point(1, 2), "tree");
grid.get(new Point(1, 2));
```
```
record keys work: tree
```
Rule 2: never use mutable objects as keys (or never mutate them while they are).

## Duplicate keys in `Map.of`
```
java.lang.IllegalArgumentException: duplicate key: a
```
`Map.of("a", 1, "a", 2)` fails fast, unlike `put`, which silently overwrites. Same for `Collectors.toMap` with duplicate keys:
```
Duplicate key a (attempted merging values 1 and 1)
```
(an `IllegalStateException`; pass a merge function as third argument, e.g. `Integer::sum`).
