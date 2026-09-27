import java.util.List;

public class Strings {
    public static void main(String[] args) {
        String a = "hi";
        String b = "hi";              // same pooled object as a
        String c = new String("hi");  // forces a brand-new object
        System.out.println("a == b: " + (a == b));
        System.out.println("a == c: " + (a == c));
        System.out.println("a.equals(c): " + a.equals(c));
        System.out.println("a == c.intern(): " + (a == c.intern()));

        String s = "hello";
        s.toUpperCase();                          // result thrown away!
        System.out.println("after s.toUpperCase(): " + s);
        s = s.toUpperCase();
        System.out.println("after s = s.toUpperCase(): " + s);

        System.out.println("\"hello\".length() = " + "hello".length());
        System.out.println("\"hello\".charAt(1) = " + "hello".charAt(1));
        System.out.println("\"hello\".substring(1, 4) = " + "hello".substring(1, 4));
        System.out.println("\"hello\".indexOf(\"l\") = " + "hello".indexOf("l") + ", lastIndexOf = " + "hello".lastIndexOf("l"));
        System.out.println("\"hello\".contains(\"ll\") = " + "hello".contains("ll"));
        System.out.println("\"a,b,,c\".split(\",\") = " + List.of("a,b,,c".split(",")));
        System.out.println("\" hi \".strip() = [" + " hi ".strip() + "], isBlank(\"  \") = " + "  ".isBlank());
        System.out.println("\"ab\".repeat(3) = " + "ab".repeat(3));
        System.out.println("\"%s is %d\".formatted(\"Ada\", 36) = " + "%s is %d".formatted("Ada", 36));
        System.out.println("String.join = " + String.join(", ", List.of("a", "b", "c")));
        System.out.println("equalsIgnoreCase: " + "Java".equalsIgnoreCase("JAVA") + ", compareTo: " + "apple".compareTo("banana"));
        System.out.println("replace: " + "a-b-c".replace("-", "+") + ", replaceAll: " + "a1b22c".replaceAll("[0-9]+", "#"));
        System.out.println("lines: " + "one\ntwo\nthree".lines().count() + ", chars: " + "abc".chars().sum());
        System.out.println(String.format("%-8s|%6.2f|%05d|%x", "left", 3.14159, 42, 255));

        var sb = new StringBuilder();
        for (String name : List.of("Ada", "Grace", "Linus")) sb.append(name).append(',');
        sb.setLength(sb.length() - 1);
        System.out.println("StringBuilder: " + sb + ", reversed: " + sb.reverse());

        int n = 20_000;
        long t0 = System.nanoTime();
        String slow = "";
        for (int i = 0; i < n; i++) slow += "x";
        long t1 = System.nanoTime();
        var fast = new StringBuilder();
        for (int i = 0; i < n; i++) fast.append("x");
        String f = fast.toString();
        long t2 = System.nanoTime();
        System.out.printf("%d appends: += %d ms, StringBuilder %.2f ms (same result: %b)%n",
                n, (t1 - t0) / 1_000_000, (t2 - t1) / 1e6, slow.equals(f));
    }
}
