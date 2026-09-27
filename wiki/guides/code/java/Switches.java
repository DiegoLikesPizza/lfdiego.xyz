public class Switches {
    sealed interface Shape permits Circle, Square, Rect {}
    record Circle(double r) implements Shape {}
    record Square(double side) implements Shape {}
    record Rect(double w, double h) implements Shape {}

    static String label(int count) {
        return switch (count) {
            case 0 -> "none";
            case 1, 2, 3 -> "a few";
            default -> "many";
        };
    }

    static int daysIn(String month) {
        return switch (month) {
            case "FEB" -> 28;
            case "APR", "JUN", "SEP", "NOV" -> 30;
            default -> {
                if (month.length() != 3) throw new IllegalArgumentException(month);
                yield 31;
            }
        };
    }

    static double area(Shape shape) {
        return switch (shape) {
            case Circle c -> Math.PI * c.r() * c.r();
            case Square s -> s.side() * s.side();
            case Rect(double w, double h) when w == h -> w * w;   // record pattern + guard
            case Rect(double w, double h) -> w * h;
        };  // no default: the compiler knows every case
    }

    static String describe(Object o) {
        return switch (o) {
            case null -> "null!";
            case Integer n when n > 100 -> "big int " + n;
            case Integer n -> "int " + n;
            case String s -> "string of length " + s.length();
            default -> "something else: " + o.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        System.out.println(label(0) + ", " + label(2) + ", " + label(7));
        System.out.println(daysIn("FEB") + " " + daysIn("JUN") + " " + daysIn("DEC"));
        System.out.printf("%.2f %.2f %.2f%n", area(new Circle(1)), area(new Square(2)), area(new Rect(2, 3)));
        System.out.println(describe(42) + " | " + describe(500) + " | " + describe("hi") + " | " + describe(3.5) + " | " + describe(null));

        Object shape = new Circle(2);
        if (shape instanceof Circle c && c.r() > 1) {
            System.out.println("big circle, radius " + c.r());
        }
        String json = """
            { "name": "Ada",
              "role": "admin" }
            """;
        System.out.print(json);
    }
}
