import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("tea", "cake", "tea"));
        list.add("coffee");
        list.remove("tea");                      // removes the first match
        System.out.println("ArrayList: " + list + ", get(0)=" + list.get(0) + ", indexOf(tea)=" + list.indexOf("tea"));

        Set<String> hash = new HashSet<>(List.of("pear", "apple", "fig", "apple"));
        Set<String> linked = new LinkedHashSet<>(List.of("pear", "apple", "fig", "apple"));
        Set<String> tree = new TreeSet<>(List.of("pear", "apple", "fig", "apple"));
        System.out.println("HashSet: " + hash + " | LinkedHashSet: " + linked + " | TreeSet: " + tree);
        System.out.println("contains(fig): " + hash.contains("fig"));

        Deque<String> stack = new ArrayDeque<>();
        stack.push("a"); stack.push("b"); stack.push("c");
        System.out.println("stack pop: " + stack.pop() + " " + stack.pop());
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("first"); queue.offer("second");
        System.out.println("queue poll: " + queue.poll());
        PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(5, 1, 4, 2));
        System.out.print("PriorityQueue polls: ");
        while (!pq.isEmpty()) System.out.print(pq.poll() + " ");
        System.out.println();

        List<String> fixed = List.of("a", "b");
        try { fixed.add("c"); } catch (UnsupportedOperationException e) { System.out.println("List.of is immutable: " + e.getClass().getSimpleName()); }
        List<String> view = Arrays.asList("x", "y");
        view.set(0, "z");
        System.out.println("Arrays.asList allows set: " + view);

        List<String> names = new ArrayList<>(List.of("Grace", "ada", "Linus", "Bo"));
        names.sort(Comparator.comparing(String::length).thenComparing(String.CASE_INSENSITIVE_ORDER));
        System.out.println("sorted by length, then name: " + names);
        names.removeIf(n -> n.length() < 3);
        System.out.println("removeIf(length < 3): " + names);

        try {
            for (String n : names) if (n.startsWith("L")) names.remove(n);
        } catch (ConcurrentModificationException e) {
            System.out.println("removing inside for-each: " + e.getClass().getSimpleName());
        }

        // Java 21: sequenced collections
        SequencedCollection<String> seq = new ArrayList<>(List.of("one", "two", "three"));
        System.out.println("getFirst=" + seq.getFirst() + " getLast=" + seq.getLast() + " reversed=" + seq.reversed());
        System.out.println("unmodifiable copy: " + List.copyOf(names) + ", Collections.frequency: " + Collections.frequency(List.of(1, 2, 1), 1));
    }
}
