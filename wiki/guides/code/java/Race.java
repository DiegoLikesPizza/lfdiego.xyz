import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Race {
    static int count = 0;
    static int safeCount = 0;
    static final Object lock = new Object();
    static final AtomicInteger atomic = new AtomicInteger();

    public static void main(String[] args) throws Exception {
        Runnable work = () -> {
            for (int i = 0; i < 1_000_000; i++) {
                count++;                                   // read, add, write: not atomic
                synchronized (lock) { safeCount++; }       // 1. lock
                atomic.incrementAndGet();                  // 2. atomic variable
            }
        };
        Thread a = new Thread(work), b = new Thread(work);
        a.start(); b.start();
        a.join(); b.join();
        System.out.println("expected 2000000: plain=" + count + " synchronized=" + safeCount + " atomic=" + atomic.get());

        // 3. don't share mutable state: each task computes its own part
        try (ExecutorService pool = Executors.newFixedThreadPool(4)) {
            Future<Long> f1 = pool.submit(() -> sum(1, 500_000));
            Future<Long> f2 = pool.submit(() -> sum(500_001, 1_000_000));
            System.out.println("sum 1..1000000 in two tasks = " + (f1.get() + f2.get()));
        }

        ConcurrentHashMap<String, Integer> hits = new ConcurrentHashMap<>();
        try (ExecutorService pool = Executors.newFixedThreadPool(8)) {
            for (int i = 0; i < 10_000; i++) {
                String page = i % 2 == 0 ? "/home" : "/cart";
                pool.submit(() -> hits.merge(page, 1, Integer::sum));
            }
        }
        System.out.println("ConcurrentHashMap hits = " + new java.util.TreeMap<>(hits));

        CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> { sleep(100); return "Ada"; });
        CompletableFuture<Integer> orders = CompletableFuture.supplyAsync(() -> { sleep(150); return 3; });
        long t0 = System.nanoTime();
        String summary = user.thenCombine(orders, (u, o) -> u + " has " + o + " orders").get();
        System.out.printf("%s (after %d ms, not 250)%n", summary, (System.nanoTime() - t0) / 1_000_000 / 50 * 50);

        CompletableFuture<Integer> failing = CompletableFuture.supplyAsync(() -> { throw new IllegalStateException("service down"); });
        System.out.println("exceptionally: " + failing.exceptionally(e -> -1).get());
    }

    static long sum(long from, long to) { long s = 0; for (long i = from; i <= to; i++) s += i; return s; }
    static void sleep(long ms) { try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); } }
}
