import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Generics {
    static class Box<T> {
        private final T value;
        Box(T value) { this.value = value; }
        T get() { return value; }
        <R> Box<R> map(java.util.function.Function<? super T, ? extends R> f) { return new Box<>(f.apply(value)); }
        @Override public String toString() { return "Box(" + value + ")"; }
    }

    record Pair<A, B>(A first, B second) {}

    // bounded type: T must be comparable to itself
    static <T extends Comparable<T>> T max(List<T> items) {
        return Collections.max(items);
    }

    // PECS: producer extends, consumer super
    static double sum(List<? extends Number> numbers) {
        double total = 0;
        for (Number n : numbers) total += n.doubleValue();
        return total;
    }
    static void addDefaults(List<? super Integer> target) {
        target.add(1);
        target.add(2);
    }

    public static void main(String[] args) {
        Box<String> name = new Box<>("Ada");   // <> infers String
        String s = name.get();                 // no cast needed
        Box<Integer> len = name.map(String::length);
        System.out.println(name + " -> " + len + ", s = " + s);

        var p = new Pair<>("tea", 250);
        System.out.println(p + ", first is a " + p.first().getClass().getSimpleName());

        System.out.println("max of ints: " + max(List.of(3, 9, 4)) + ", max of strings: " + max(List.of("pear", "apple", "zucchini")));

        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(0.5, 0.25);
        System.out.println("sum(ints) = " + sum(ints) + ", sum(doubles) = " + sum(doubles));

        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        addDefaults(numbers);
        addDefaults(objects);
        System.out.println("numbers = " + numbers + ", objects = " + objects);

        // type erasure: at runtime both are just ArrayList
        List<String> a = new ArrayList<>();
        List<Integer> b = new ArrayList<>();
        System.out.println("same runtime class: " + (a.getClass() == b.getClass()));

        // raw types defeat the compiler's checks
        @SuppressWarnings({"rawtypes", "unchecked"})
        List raw = a;
        raw.add(42);                              // compiles, no error here...
        try {
            String first = a.get(0);              // ...the error appears later, far away
        } catch (ClassCastException e) {
            System.out.println("raw type bites: " + e.getMessage());
        }
    }
}
