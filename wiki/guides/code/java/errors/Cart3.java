import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Cart3 {
    String read() {
        return Files.readString(Path.of("cart.txt"));
    }
    void unreachable() {
        return;
        System.out.println("never");
    }
    void uninitialised() {
        int x;
        System.out.println(x);
    }
}
