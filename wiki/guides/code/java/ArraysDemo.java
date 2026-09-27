import java.util.List;

public class ArraysDemo {
    public static void main(String[] args) {
        int[] scores = {90, 72, 85};
        String[] names = new String[3];          // [null, null, null]
        int[][] grid = new int[2][3];            // 2 rows, 3 columns, all 0
        grid[1][2] = 7;

        System.out.println("scores.length = " + scores.length + ", first = " + scores[0]);
        System.out.println("println(scores) = " + scores.getClass().getSimpleName() + " -> use Arrays.toString: " + java.util.Arrays.toString(scores));
        System.out.println("names = " + java.util.Arrays.toString(names));
        System.out.println("grid = " + java.util.Arrays.deepToString(grid));

        int[] sorted = scores.clone();
        java.util.Arrays.sort(sorted);
        System.out.println("sorted copy = " + java.util.Arrays.toString(sorted) + ", original = " + java.util.Arrays.toString(scores));
        System.out.println("binarySearch(85) = " + java.util.Arrays.binarySearch(sorted, 85));
        int[] bigger = java.util.Arrays.copyOf(scores, 5);
        System.out.println("copyOf(scores, 5) = " + java.util.Arrays.toString(bigger));
        int[] filled = new int[4];
        java.util.Arrays.fill(filled, 9);
        System.out.println("fill = " + java.util.Arrays.toString(filled));
        System.out.println("equals: " + java.util.Arrays.equals(scores, new int[]{90, 72, 85}) + ", == : " + (scores == new int[]{90, 72, 85}));
        System.out.println("sum via stream = " + java.util.Arrays.stream(scores).sum() + ", max = " + java.util.Arrays.stream(scores).max().getAsInt());

        List<String> list = List.of("b", "a");
        String[] back = list.toArray(String[]::new);
        System.out.println("list -> array -> list: " + List.of(back));

        try {
            System.out.println(scores[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("scores[3]: " + e.getMessage());
        }
    }
}
