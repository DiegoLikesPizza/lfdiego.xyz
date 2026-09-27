import java.time.Duration;
import java.util.concurrent.*;
import java.util.stream.IntStream;

public class VirtualThreads {
    static String fetchUser(int id) {
        try { Thread.sleep(Duration.ofMillis(100)); }        // simulated network call
        catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        return "user" + id;
    }

    static long run(ExecutorService executor, int tasks) {
        long t0 = System.nanoTime();
        try (executor) {
            IntStream.range(0, tasks).forEach(i -> executor.submit(() -> fetchUser(i)));
        }   // close() waits for every task to finish
        return (System.nanoTime() - t0) / 1_000_000;
    }

    public static void main(String[] args) throws Exception {
        int tasks = 10_000;
        System.out.println("CPU cores: " + Runtime.getRuntime().availableProcessors());
        System.out.println(tasks + " tasks x 100 ms, fixed pool of 200 platform threads: " + run(Executors.newFixedThreadPool(200), tasks) + " ms");
        System.out.println(tasks + " tasks x 100 ms, one virtual thread per task:     " + run(Executors.newVirtualThreadPerTaskExecutor(), tasks) + " ms");

        Thread vt = Thread.ofVirtual().name("pizza-oven").start(() ->
                System.out.println("running in " + Thread.currentThread().getName() + ", virtual=" + Thread.currentThread().isVirtual()));
        vt.join();
        Thread pt = Thread.ofPlatform().start(() -> System.out.println("platform thread, virtual=" + Thread.currentThread().isVirtual()));
        pt.join();
    }
}
