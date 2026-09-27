import java.util.*;

public class OptionalDemo {
    record User(int id, String name, String email) {}
    static final List<User> users = List.of(new User(1, "Ada", "ada@example.com"), new User(2, "Bo", null));

    static Optional<User> findById(int id) {
        return users.stream().filter(u -> u.id() == id).findFirst();
    }

    public static void main(String[] args) {
        Optional<User> found = findById(1);
        Optional<User> missing = findById(9);

        System.out.println(found.map(User::name).orElse("unknown") + " / " + missing.map(User::name).orElse("unknown"));
        found.ifPresent(u -> System.out.println("found " + u.name()));
        missing.ifPresentOrElse(u -> System.out.println("found"), () -> System.out.println("no user 9"));

        Optional<String> email = findById(2).map(User::email);        // email is null -> empty Optional
        System.out.println("Bo's email: " + email.orElse("(none)") + ", isPresent: " + email.isPresent());
        System.out.println("filter: " + found.filter(u -> u.name().startsWith("B")).isEmpty());
        System.out.println("or: " + missing.or(() -> findById(2)).map(User::name).orElseThrow());
        System.out.println("ofNullable(null): " + Optional.ofNullable(null));
        try {
            missing.orElseThrow(() -> new NoSuchElementException("No user with id 9"));
        } catch (NoSuchElementException e) {
            System.out.println("orElseThrow: " + e.getMessage());
        }
        try {
            missing.get();
        } catch (NoSuchElementException e) {
            System.out.println("get() on empty: " + e.getMessage());
        }
        // orElse evaluates its argument always, orElseGet only when needed
        found.orElse(expensiveDefault("orElse"));
        found.orElseGet(() -> expensiveDefault("orElseGet"));
    }

    static User expensiveDefault(String who) {
        System.out.println("  expensiveDefault() called by " + who);
        return new User(0, "guest", null);
    }
}
