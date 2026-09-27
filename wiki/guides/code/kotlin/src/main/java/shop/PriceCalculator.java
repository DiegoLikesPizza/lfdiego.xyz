package shop;

import java.util.List;

public class PriceCalculator {
    public static int total(List<Integer> cents) {
        return cents.stream().mapToInt(Integer::intValue).sum();
    }

    public String findCoupon(String code) {
        return code.equals("WELCOME") ? "10% off" : null;   // may return null: Kotlin sees String!
    }

    public static String describe(Money money) {             // calling Kotlin from Java
        return money.format() + " / " + Money.Companion.zero().format() + " / " + Money.parse("1.50").getCents();
    }
}
