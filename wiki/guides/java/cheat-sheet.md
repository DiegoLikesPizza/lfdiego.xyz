# Cheat Sheet

## Run
```sh
java Hello.java                 # compile + run one file
javac -d out src/**/*.java && java -cp out shop.Main
./gradlew build | ./gradlew test | ./mvnw package
jshell                          # try code interactively
```

## Syntax
```java
var n = 0; final int MAX = 10; long big = 3_000_000_000L; double d = 1.5; char c = 'A';
String s = "text"; String block = """
    multi-line
    """;
if (a && !b) { } else if (c || d) { } else { }
for (int i = 0; i < n; i++) { }     for (var x : list) { }     while (cond) { }
String label = switch (n) { case 0 -> "none"; case 1, 2 -> "few"; default -> "many"; };
if (o instanceof Circle c) { c.r(); }
int max = a > b ? a : b;
```
→ [[java/Syntax Basics]], [[java/Switch and Pattern Matching]]

## Types
```java
record Item(String name, int priceCents) {}
enum Size { SMALL, MEDIUM, LARGE }
sealed interface Shape permits Circle, Square {}
interface Notifier { void send(String msg); }
class Checkout { private final Notifier n; Checkout(Notifier n) { this.n = n; } }
abstract class Account { abstract long fee(); }
class Box<T> { T value; }
```
→ [[java/Records and Enums]], [[java/Sealed Types]], [[java/Interfaces and Polymorphism]], [[java/Generics]]

## Strings
```java
a.equals(b)   s.length()   s.substring(1, 4)   s.split(",")   s.strip()   s.isBlank()
s.contains("x")   s.replace("a", "b")   String.join(", ", list)   "%s: %d".formatted(name, n)
new StringBuilder().append(x).toString()
```
→ [[java/Strings]]

## Collections
```java
List<String> l = new ArrayList<>();  l.add("x"); l.get(0); l.remove("x"); l.size();
List.of(1, 2, 3)   Set.of("a")   Map.of("k", 1)          // immutable
Map<String, Integer> m = new HashMap<>(); m.put("k", 1); m.getOrDefault("x", 0); m.merge("k", 1, Integer::sum);
m.computeIfAbsent("k", k -> new ArrayList<>()).add(v);
list.sort(Comparator.comparing(User::age).reversed());
list.removeIf(x -> x.isBlank());
```
→ [[java/Collections]], [[java/Maps and Hashing]]

## Streams
```java
list.stream().filter(u -> u.age() >= 18).map(User::name).sorted().toList();
.collect(Collectors.groupingBy(User::city))   .collect(Collectors.joining(", "))
.mapToInt(User::age).sum()   .anyMatch(p)   .findFirst()   .count()
Optional: .map(f).orElse(x)   .orElseThrow()   .ifPresent(c)
```
→ [[java/Streams]], [[java/Optional]]

## Exceptions
```java
try (var r = Files.newBufferedReader(p)) { … }
catch (NoSuchFileException e) { … }
catch (IOException e) { throw new UncheckedIOException("context", e); }
finally { … }
throw new IllegalArgumentException("price must be >= 0, was " + price);
```
→ [[java/Exceptions]]

## Time, files, concurrency
```java
LocalDate.now()  LocalDate.of(2026, 9, 27).plusDays(3)  Instant.now()  Duration.ofMinutes(90)
Files.readString(p)  Files.writeString(p, s)  Files.lines(p)  Path.of("a").resolve("b")
try (var ex = Executors.newVirtualThreadPerTaskExecutor()) { ex.submit(task); }
AtomicInteger c = new AtomicInteger(); ConcurrentHashMap<K, V> map;
```
→ [[java/Date and Time]], [[java/Files and IO]], [[java/Virtual Threads and Executors]]

## JUnit
```java
@Test void name() { assertEquals(expected, actual); assertThrows(X.class, () -> …); }
@BeforeEach  @ParameterizedTest @CsvSource({"1, 2"})  @Nested  @DisplayName("…")
```
→ [[java/Testing with JUnit]]

## JVM flags
`-Xmx2g` · `-XX:+UseZGC` · `-XX:MaxRAMPercentage=75` · `-Xlog:gc` · `-XX:+HeapDumpOnOutOfMemoryError` · `--enable-preview` → [[java/Garbage Collection]]
