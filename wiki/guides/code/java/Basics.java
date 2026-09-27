import java.util.List;

public class Basics {
    public static void main(String[] args) {
        // variables
        var count = 0;                      // type inferred: int
        final int max = 3;
        long big = 3_000_000_000L;
        double price = 19.99;
        char grade = 'A';
        boolean open = true;
        System.out.println("count=" + count + " max=" + max + " big=" + big + " price=" + price + " grade=" + grade + " open=" + open);

        // operators
        System.out.println("7 / 2 = " + (7 / 2) + ", 7 % 2 = " + (7 % 2) + ", 7 / 2.0 = " + (7 / 2.0));
        int i = 5;
        System.out.println("i++ gives " + (i++) + ", then i is " + i + "; ++i gives " + (++i));
        System.out.println("true && false = " + (true && false) + ", true || false = " + (true || false) + ", !true = " + !true);
        System.out.println("ternary: " + (count > 0 ? "some" : "none"));

        // if / else
        count = 2;
        if (count < max) {
            System.out.println("room for " + (max - count) + " more");
        } else if (count == max) {
            System.out.println("full");
        } else {
            throw new IllegalStateException("over max");
        }

        // loops
        for (int n = 0; n < 3; n++) System.out.print(n + " ");
        System.out.println("<- counting loop");
        List<String> names = List.of("Ada", "Grace", "Linus");
        for (String name : names) System.out.print(name + " ");
        System.out.println("<- for-each");
        int w = 1;
        while (w < 100) w *= 3;
        System.out.println("while: first power of 3 >= 100 is " + w);
        int d = 10;
        do { d--; } while (d > 20);
        System.out.println("do-while runs at least once: d=" + d);

        // break / continue with a label
        outer:
        for (int a = 0; a < 3; a++) {
            for (int b = 0; b < 3; b++) {
                if (b == 1) continue;
                if (a == 2) break outer;
                System.out.print("(" + a + "," + b + ") ");
            }
        }
        System.out.println("<- labelled break");
    }
}
