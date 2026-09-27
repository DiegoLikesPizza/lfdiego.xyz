import java.util.*;

public class RuntimeErrors {
    static int depth(int n) { return depth(n + 1); }

    public static void main(String[] args) {
        List<Runnable> cases = List.of(
            () -> { String s = null; s.length(); },
            () -> { int[] a = new int[3]; a[3] = 1; },
            () -> List.of(1, 2).get(5),
            () -> Integer.parseInt("12.5"),
            () -> { Object o = "text"; Integer i = (Integer) o; },
            () -> { int zero = 0; System.out.println(10 / zero); },
            () -> List.of("a").add("b"),
            () -> { var l = new ArrayList<>(List.of(1, 2, 3)); for (Integer i : l) l.remove(i); },
            () -> new ArrayList<String>().iterator().next(),
            () -> Map.of("a", 1, "a", 2),
            () -> depth(0)
        );
        for (Runnable c : cases) {
            try { c.run(); }
            catch (Throwable t) { System.out.println(t.getClass().getName() + ": " + t.getMessage()); }
        }
    }
}
