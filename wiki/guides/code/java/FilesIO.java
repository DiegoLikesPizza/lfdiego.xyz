import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Stream;

public class FilesIO {
    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("shop");
        Path file = dir.resolve("orders.csv");

        Files.writeString(file, "id,item,cents\n1,tea,250\n2,cake,400\n");
        Files.writeString(file, "3,coffee,300\n", StandardOpenOption.APPEND);
        System.out.println("size: " + Files.size(file) + " bytes, exists: " + Files.exists(file));

        String all = Files.readString(file);
        List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
        System.out.println("lines: " + lines.size() + ", first: " + lines.getFirst());

        try (Stream<String> stream = Files.lines(file)) {           // lazy: good for big files
            int total = stream.skip(1).map(l -> l.split(",")).mapToInt(p -> Integer.parseInt(p[2])).sum();
            System.out.println("total: " + total + " ct");
        }

        try (var writer = Files.newBufferedWriter(dir.resolve("report.txt"))) {
            writer.write("Report");
            writer.newLine();
            writer.write("orders: " + (lines.size() - 1));
        }

        Files.createDirectories(dir.resolve("archive/2026"));
        Files.copy(file, dir.resolve("archive/2026/orders.csv"), StandardCopyOption.REPLACE_EXISTING);
        try (Stream<Path> walk = Files.walk(dir)) {
            walk.filter(Files::isRegularFile).map(p -> dir.relativize(p).toString().replace('\\', '/')).sorted().forEach(p -> System.out.println("  " + p));
        }

        Path p = Path.of("/home/ada/shop/src/Main.java");
        System.out.println("fileName=" + p.getFileName() + ", parent=" + p.getParent() + ", root=" + p.getRoot() + ", nameCount=" + p.getNameCount());
        System.out.println("normalize: " + Path.of("a/b/../c/./d.txt").normalize());

        try {
            Files.readString(dir.resolve("missing.txt"));
        } catch (NoSuchFileException e) {
            System.out.println("NoSuchFileException: " + dir.relativize(Path.of(e.getFile())));
        }
        try (Stream<Path> walk = Files.walk(dir)) {             // clean up, deepest first
            walk.sorted(java.util.Comparator.reverseOrder()).forEach(q -> q.toFile().delete());
        }
    }
}
