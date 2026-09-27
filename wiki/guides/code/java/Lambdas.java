import java.util.*;
import java.util.function.*;

public class Lambdas {
    record User(String name, int age, String city) {}

    public static void main(String[] args) {
        Function<String, Integer> length = String::length;
        Predicate<Integer> adult = age -> age >= 18;
        Consumer<String> print = System.out::println;
        Supplier<List<String>> newList = ArrayList::new;
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        UnaryOperator<String> trim = String::strip;
        BinaryOperator<Integer> max = BinaryOperator.maxBy(Comparator.naturalOrder());

        print.accept("length(\"hello\") = " + length.apply("hello"));
        System.out.println("adult(17) = " + adult.test(17) + ", adult.negate()(17) = " + adult.negate().test(17));
        System.out.println("add(2, 3) = " + add.apply(2, 3) + ", max(4, 9) = " + max.apply(4, 9) + ", trim = [" + trim.apply("  x ") + "]");
        List<String> l = newList.get(); l.add("made by a Supplier"); System.out.println(l);

        Function<Integer, Integer> times2 = x -> x * 2;
        Function<Integer, Integer> plus3 = x -> x + 3;
        System.out.println("times2.andThen(plus3)(5) = " + times2.andThen(plus3).apply(5) + ", times2.compose(plus3)(5) = " + times2.compose(plus3).apply(5));

        // four kinds of method reference
        Function<String, Integer> parse = Integer::parseInt;              // static method
        String prefix = "Hello ";
        Function<String, String> greet = prefix::concat;                  // method of a particular object
        Function<User, String> nameOf = User::name;                        // method of an arbitrary object
        BiFunction<String, Integer, User> make = (n, a) -> new User(n, a, "?");
        Function<String, StringBuilder> ctor = StringBuilder::new;         // constructor
        System.out.println(parse.apply("42") + 1 + " | " + greet.apply("Ada") + " | " + nameOf.apply(make.apply("Bo", 30)) + " | " + ctor.apply("sb").reverse());

        // effectively final: lambdas capture values, not variables
        int limit = 18;
        Predicate<User> isAdult = u -> u.age() >= limit;
        // limit++;   // would not compile: "local variables referenced from a lambda expression must be final or effectively final"
        System.out.println("isAdult(Ada, 36) = " + isAdult.test(new User("Ada", 36, "London")));

        // your own functional interface
        @FunctionalInterface interface PriceRule { int apply(int cents); }
        PriceRule tenOff = c -> c * 90 / 100;
        PriceRule minus200 = c -> Math.max(0, c - 200);
        System.out.println("rules on 1000 ct: " + tenOff.apply(1000) + ", " + minus200.apply(1000));

        List<User> users = new ArrayList<>(List.of(new User("Linus", 17, "Helsinki"), new User("Ada", 36, "London"), new User("Grace", 85, "New York")));
        users.sort(Comparator.comparingInt(User::age).reversed());
        System.out.println("by age desc: " + users.stream().map(User::name).toList());
        users.sort(Comparator.comparing(User::city).thenComparing(User::name));
        System.out.println("by city: " + users.stream().map(User::name).toList());
    }
}
