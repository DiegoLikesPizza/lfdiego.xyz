import java.util.*;

public class Maps {
    record Point(int x, int y) {}

    static class BadKey {                     // equals without hashCode
        final String id;
        BadKey(String id) { this.id = id; }
        @Override public boolean equals(Object o) { return o instanceof BadKey b && b.id.equals(id); }
    }

    public static void main(String[] args) {
        Map<String, Integer> stock = new HashMap<>();
        stock.put("tea", 3);
        stock.put("cake", 0);
        stock.put("tea", 5);                          // replaces
        System.out.println("stock = " + stock + ", get(tea) = " + stock.get("tea") + ", get(pie) = " + stock.get("pie"));
        System.out.println("getOrDefault(pie, 0) = " + stock.getOrDefault("pie", 0) + ", containsKey(cake) = " + stock.containsKey("cake"));

        Map<String, Integer> counts = new TreeMap<>();
        for (String w : "the cat and the hat and the bat".split(" ")) counts.merge(w, 1, Integer::sum);
        System.out.println("word counts (TreeMap, sorted) = " + counts);

        Map<String, List<String>> byInitial = new LinkedHashMap<>();
        for (String n : List.of("Ada", "Alan", "Bo", "Barbara", "Cleo")) {
            byInitial.computeIfAbsent(n.substring(0, 1), k -> new ArrayList<>()).add(n);
        }
        System.out.println("computeIfAbsent grouping = " + byInitial);

        for (Map.Entry<String, Integer> e : stock.entrySet()) System.out.print(e.getKey() + "->" + e.getValue() + " ");
        System.out.println();
        stock.forEach((k, v) -> System.out.print("[" + k + ":" + v + "] "));
        System.out.println();

        Map<Point, String> grid = new HashMap<>();
        grid.put(new Point(1, 2), "tree");
        System.out.println("record keys work: " + grid.get(new Point(1, 2)));

        Map<BadKey, String> broken = new HashMap<>();
        broken.put(new BadKey("a"), "found");
        System.out.println("equals without hashCode: " + broken.get(new BadKey("a")));

        Map<String, Integer> fixed = Map.of("a", 1, "b", 2);
        System.out.println("Map.of get: " + fixed.get("a") + ", entry: " + Map.entry("k", "v"));
        SequencedMap<String, Integer> seq = new LinkedHashMap<>();
        seq.put("first", 1); seq.put("second", 2); seq.putFirst("zero", 0);
        System.out.println("SequencedMap: " + seq + ", firstEntry=" + seq.firstEntry() + ", reversed=" + seq.reversed());
    }
}
