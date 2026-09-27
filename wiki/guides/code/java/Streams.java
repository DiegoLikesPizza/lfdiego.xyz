import java.util.*;
import java.util.stream.*;

public class Streams {
    record User(String name, int age, String city) {}

    public static void main(String[] args) {
        List<User> users = List.of(
                new User("Ada", 36, "London"), new User("Linus", 17, "Helsinki"),
                new User("Grace", 85, "New York"), new User("Alan", 41, "London"), new User("Bo", 12, "Helsinki"));

        List<String> adults = users.stream()
                .filter(u -> u.age() >= 18)
                .map(User::name)
                .sorted()
                .toList();
        System.out.println("adults = " + adults);

        System.out.println("--- laziness: each element travels the whole pipeline before the next");
        Optional<String> first = Stream.of("al", "ada", "bo", "grace")
                .filter(n -> { System.out.println("  filter " + n); return n.length() > 2; })
                .map(n -> { System.out.println("  map    " + n); return n.toUpperCase(); })
                .findFirst();
        System.out.println("  result " + first.orElseThrow());

        Stream<String> nothing = Stream.of("x").peek(x -> System.out.println("never printed"));
        System.out.println("--- no terminal operation, nothing ran");

        Map<String, List<String>> byCity = users.stream()
                .collect(Collectors.groupingBy(User::city, TreeMap::new, Collectors.mapping(User::name, Collectors.toList())));
        System.out.println("groupingBy city = " + byCity);

        Map<Boolean, Long> adultsVsMinors = users.stream()
                .collect(Collectors.partitioningBy(u -> u.age() >= 18, Collectors.counting()));
        System.out.println("partitioningBy adult = " + adultsVsMinors);

        double averageAge = users.stream().mapToInt(User::age).average().orElse(0);
        IntSummaryStatistics stats = users.stream().mapToInt(User::age).summaryStatistics();
        System.out.println("average age = " + averageAge + ", stats = " + stats);

        String csv = users.stream().map(User::name).collect(Collectors.joining(", ", "[", "]"));
        Map<String, Integer> ageByName = users.stream().collect(Collectors.toMap(User::name, User::age));
        System.out.println("joining = " + csv + ", toMap(Ada) = " + ageByName.get("Ada"));

        System.out.println("anyMatch(age > 80) = " + users.stream().anyMatch(u -> u.age() > 80)
                + ", allMatch(age > 10) = " + users.stream().allMatch(u -> u.age() > 10)
                + ", count(London) = " + users.stream().filter(u -> u.city().equals("London")).count());
        Optional<User> oldest = users.stream().max(Comparator.comparingInt(User::age));
        System.out.println("oldest = " + oldest.map(User::name).orElse("-"));

        List<List<String>> nested = List.of(List.of("a", "b"), List.of("c"));
        System.out.println("flatMap = " + nested.stream().flatMap(List::stream).toList());
        System.out.println("IntStream.rangeClosed(1, 5).sum() = " + IntStream.rangeClosed(1, 5).sum()
                + ", iterate = " + Stream.iterate(1, x -> x * 2).limit(8).toList());
        System.out.println("distinct + skip + limit = " + Stream.of(3, 1, 3, 2, 1, 5).distinct().skip(1).limit(2).toList());
        System.out.println("reduce = " + Stream.of(1, 2, 3, 4).reduce(0, Integer::sum));
        System.out.println("takeWhile = " + Stream.of(1, 2, 5, 1).takeWhile(x -> x < 3).toList());
        System.out.println("mapMulti = " + Stream.of("a,b", "c").<String>mapMulti((s, down) -> { for (String p : s.split(",")) down.accept(p); }).toList());
        System.out.println("gather windowFixed(2) = " + Stream.of(1, 2, 3, 4, 5).gather(Gatherers.windowFixed(2)).toList());

        Stream<String> once = Stream.of("x");
        once.count();
        try { once.count(); } catch (IllegalStateException e) { System.out.println("reuse: " + e.getMessage()); }
    }
}
