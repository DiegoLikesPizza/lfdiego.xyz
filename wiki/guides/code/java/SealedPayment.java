import java.util.*;
import java.util.stream.*;
public class SealedPayment {
    sealed interface PaymentResult permits Paid, Declined, NeedsVerification {}
    record Paid(String transactionId) implements PaymentResult {}
    record Declined(String reason) implements PaymentResult {}
    record NeedsVerification(String redirectUrl) implements PaymentResult {}
    static String msg(PaymentResult result) {
        return switch (result) {
            case Paid p -> "Thanks! Order confirmed (" + p.transactionId() + ")";
            case Declined(String reason) -> "Payment declined: " + reason;
            case NeedsVerification(String url) -> "Please confirm at " + url;
        };
    }
    public static void main(String[] a) {
        System.out.println(msg(new Declined("card expired")));
        try { Stream.of("a","a").collect(Collectors.toMap(s -> s, s -> 1)); } catch (IllegalStateException e) { System.out.println(e.getMessage()); }
    }
}
