# Files and IO

Use **`java.nio.file`**: `Path` for locations, `Files` for operations. The old `java.io.File` still works but has worse error reporting. Output from `code/java/FilesIO.java`.

## Writing and reading whole files
```java
Path dir = Files.createTempDirectory("shop");
Path file = dir.resolve("orders.csv");

Files.writeString(file, "id,item,cents\n1,tea,250\n2,cake,400\n");
Files.writeString(file, "3,coffee,300\n", StandardOpenOption.APPEND);
String all = Files.readString(file);
List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
```
```
size: 48 bytes, exists: true
lines: 4, first: id,item,cents
```
Fine for small files. The default charset is UTF-8 (since Java 18); be explicit when reading files from elsewhere.

## Big files: stream the lines
```java
try (Stream<String> stream = Files.lines(file)) {           // lazy: good for big files
    int total = stream.skip(1).map(l -> l.split(",")).mapToInt(p -> Integer.parseInt(p[2])).sum();
}
```
```
total: 950 ct
```
`Files.lines` keeps the file open: always use try-with-resources. (Real CSV with quotes and commas inside fields needs a library such as Apache Commons CSV or Jackson CSV.)

## Buffered writing
```java
try (var writer = Files.newBufferedWriter(dir.resolve("report.txt"))) {
    writer.write("Report");
    writer.newLine();
    writer.write("orders: " + (lines.size() - 1));
}
```

## Directories, copying, walking
```java
Files.createDirectories(dir.resolve("archive/2026"));
Files.copy(file, dir.resolve("archive/2026/orders.csv"), StandardCopyOption.REPLACE_EXISTING);
try (Stream<Path> walk = Files.walk(dir)) {
    walk.filter(Files::isRegularFile).map(p -> dir.relativize(p).toString()).sorted().forEach(System.out::println);
}
```
```
  archive/2026/orders.csv
  orders.csv
  report.txt
```
| Method | Does |
|---|---|
| `Files.exists`, `isDirectory`, `isRegularFile`, `size` | inspect |
| `createDirectories` | create including parents (no error if it exists) |
| `copy`, `move`, `delete`, `deleteIfExists` | manipulate |
| `list(dir)` / `walk(dir)` / `find(…)` | one level / recursive / with a filter (all return closeable streams) |
| `newBufferedReader/Writer`, `newInputStream/OutputStream` | streaming access |

## Paths
```java
Path p = Path.of("/home/ada/shop/src/Main.java");
```
```
fileName=Main.java, parent=/home/ada/shop/src, root=/, nameCount=5
normalize: a/c/d.txt
```
- `resolve` joins paths (`dir.resolve("orders.csv")`); never concatenate with `"/"`: Windows uses `\`.
- `Path.of("config.json")` is relative to the **working directory** (where `java` was started), not the class file. For files shipped inside your JAR, use resources: `getClass().getResourceAsStream("/config.json")`.

## Errors
```
NoSuchFileException: missing.txt
```
Also `AccessDeniedException`, `FileAlreadyExistsException`, `DirectoryNotEmptyException`: all `IOException`s with the path as message. They're checked, so the compiler makes you handle them ([[java/Exceptions]]).

## Beyond files
| Need | Use |
|---|---|
| HTTP calls | `java.net.http.HttpClient` (built in since Java 11) |
| JSON | Jackson or Gson (not in the JDK) |
| Properties/config | `Properties`, or your framework's config |
| Binary data | `DataInputStream`, `ByteBuffer`, `Files.readAllBytes` |
| Console | `IO.println` / `IO.readln` (Java 25), `System.in` |
