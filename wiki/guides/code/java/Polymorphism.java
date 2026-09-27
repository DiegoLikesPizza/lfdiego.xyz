import java.util.List;

public class Polymorphism {
    interface Shape {
        double area();
        default String describe() { return getClass().getSimpleName() + " with area " + "%.2f".formatted(area()); }
        static Shape unitSquare() { return new Rectangle(1, 1); }
    }
    record Circle(double radius) implements Shape {
        public double area() { return Math.PI * radius * radius; }
    }
    record Rectangle(double w, double h) implements Shape {
        public double area() { return w * h; }
    }

    // inheritance: an abstract base class with shared state and behaviour
    static abstract class Account {
        protected long balanceCents;
        void deposit(long cents) { balanceCents += cents; }
        abstract long monthlyFeeCents();
        void endOfMonth() { balanceCents -= monthlyFeeCents(); }
        @Override public String toString() { return getClass().getSimpleName() + "(" + balanceCents + " ct)"; }
    }
    static class Checking extends Account {
        long monthlyFeeCents() { return 300; }
    }
    static class Savings extends Account {
        long monthlyFeeCents() { return 0; }
        @Override void endOfMonth() {
            super.endOfMonth();
            balanceCents += balanceCents / 100;          // 1 % interest
        }
    }

    // composition: a class that *has* a logger instead of *being* one
    interface Notifier { void send(String msg); }
    static class Checkout {
        private final Notifier notifier;
        Checkout(Notifier notifier) { this.notifier = notifier; }
        void pay(long cents) { notifier.send("paid " + cents + " ct"); }
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Rectangle(2, 3), Shape.unitSquare());
        for (Shape s : shapes) System.out.println(s.describe());      // each shape answers its own way
        double total = shapes.stream().mapToDouble(Shape::area).sum();
        System.out.printf("total area %.2f%n", total);

        List<Account> accounts = List.of(new Checking(), new Savings());
        for (Account a : accounts) { a.deposit(10_000); a.endOfMonth(); }
        System.out.println(accounts);

        new Checkout(msg -> System.out.println("[mail] " + msg)).pay(1999);
        new Checkout(msg -> System.out.println("[sms]  " + msg)).pay(500);

        Account acc = new Savings();
        System.out.println("acc instanceof Savings: " + (acc instanceof Savings) + ", runtime class: " + acc.getClass().getSimpleName());
    }
}
