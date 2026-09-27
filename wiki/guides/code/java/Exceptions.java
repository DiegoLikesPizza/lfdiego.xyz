import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public class Exceptions {
    static class OutOfStockException extends RuntimeException {
        OutOfStockException(String sku) { super("Out of stock: " + sku); }
    }

    static final Map<String, Integer> stock = Map.of("TEA", 3, "CAKE", 0);

    static void order(String sku) {
        if (stock.getOrDefault(sku, 0) == 0) throw new OutOfStockException(sku);
        System.out.println("ordered " + sku);
    }

    static List<String> readUsers(Path file) {
        try (var reader = Files.newBufferedReader(file)) {
            return reader.lines().toList();
        } catch (NoSuchFileException e) {
            System.out.println("  no file yet: " + e.getMessage());
            return List.of();                        // expected: no file yet
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read users", e);
        } finally {
            System.out.println("  import finished");  // always runs
        }
    }

    static class Resource implements AutoCloseable {
        final String name;
        Resource(String name) { this.name = name; System.out.println("  open " + name); }
        @Override public void close() { System.out.println("  close " + name); }
    }

    static int parsePrice(String input) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid price '" + input + "'", e);   // keep the cause
        }
    }

    public static void main(String[] args) throws Exception {
        order("TEA");
        try {
            order("CAKE");
        } catch (OutOfStockException e) {
            System.out.println("caught: " + e.getMessage());
        }

        System.out.println("readUsers:");
        System.out.println("  -> " + readUsers(Path.of("users-that-do-not-exist.csv")));

        System.out.println("try-with-resources closes in reverse order:");
        try (var a = new Resource("A"); var b = new Resource("B")) {
            System.out.println("  working with " + a.name + " and " + b.name);
            throw new IllegalStateException("boom");
        } catch (IllegalStateException e) {
            System.out.println("  caught " + e.getMessage() + " after closing");
        }

        try {
            parsePrice("12,50");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage() + ", caused by: " + e.getCause());
        }

        try {
            Object o = "text";
            Integer n = (Integer) o;
        } catch (ClassCastException | NullPointerException e) {        // multi-catch
            System.out.println("multi-catch: " + e.getClass().getSimpleName());
        }

        System.out.println("--- an uncaught exception prints a stack trace and ends the program:");
        checkout(null);
    }

    static void checkout(String customer) { greet(customer); }
    static void greet(String customer) { System.out.println("Hello " + customer.toUpperCase()); }
}
