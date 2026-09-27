public class Methods {
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; }       // overload: different parameter types
    static int sum(int... numbers) {                               // varargs
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }
    static long factorial(int n) { return n <= 1 ? 1 : n * factorial(n - 1); }   // recursion

    public static void main(String[] args) {
        System.out.println(add(2, 3) + " " + add(2.5, 0.5));
        System.out.println(sum() + " " + sum(1) + " " + sum(1, 2, 3, 4));
        System.out.println("20! = " + factorial(20) + ", 21! overflows to " + factorial(21));
    }
}
