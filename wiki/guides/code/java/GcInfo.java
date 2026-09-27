import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;

public class GcInfo {
    static final List<byte[]> leak = new ArrayList<>();    // a static list that only grows

    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        System.out.printf("max heap: %d MB%n", rt.maxMemory() / 1024 / 1024);
        ManagementFactory.getGarbageCollectorMXBeans().forEach(gc -> System.out.println("collector: " + gc.getName()));

        for (int i = 0; i < 200_000; i++) { byte[] garbage = new byte[1024]; }   // short-lived: dies young
        long collections = ManagementFactory.getGarbageCollectorMXBeans().stream().mapToLong(g -> Math.max(0, g.getCollectionCount())).sum();
        System.out.println("allocated ~200 MB of short-lived arrays, GC runs so far: " + collections);

        if (args.length > 0) {
            try {
                while (true) leak.add(new byte[1024 * 1024]);
            } catch (OutOfMemoryError e) {
                int mb = leak.size();
                leak.clear();
                System.out.println("OutOfMemoryError after keeping " + mb + " MB: " + e.getMessage());
            }
        }
    }
}
