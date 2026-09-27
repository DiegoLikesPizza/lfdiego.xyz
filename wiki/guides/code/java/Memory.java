import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Memory {
    static class User {
        private String name;
        User(String name) { this.name = name; }
        String getName() { return name; }
        void setName(String name) { this.name = name; }
    }

    static void rename(User u) { u.setName("Changed"); }       // changes the object
    static void reassign(User u) { u = new User("New"); }      // changes only the local copy
    static void increment(int x) { x++; }

    public static void main(String[] args) {
        int count = 3;
        int copy = count;
        copy++;
        System.out.println("count=" + count + " copy=" + copy);

        User user = new User("Ada");
        User same = user;             // copies the reference only
        same.setName("Grace");
        System.out.println("user.getName() = " + user.getName());

        rename(user);
        System.out.println("after rename(): " + user.getName());
        reassign(user);
        System.out.println("after reassign(): " + user.getName());
        increment(count);
        System.out.println("after increment(count): " + count);

        List<String> a = new ArrayList<>(List.of("x"));
        List<String> b = a;
        b.add("y");
        System.out.println("a = " + a);

        Integer i1 = 127, i2 = 127, i3 = 128, i4 = 128;
        System.out.println("127 == 127: " + (i1 == i2) + ", 128 == 128: " + (i3 == i4) + ", equals: " + i3.equals(i4));

        String s1 = null;
        System.out.println("Objects.equals(null, \"x\") = " + Objects.equals(s1, "x"));

        System.out.println("int max = " + Integer.MAX_VALUE + ", +1 = " + (Integer.MAX_VALUE + 1));
        System.out.println("0.1 + 0.2 = " + (0.1 + 0.2));
        System.out.println("(int) 3.99 = " + (int) 3.99 + ", Math.round(3.5) = " + Math.round(3.5) + ", (byte) 200 = " + (byte) 200);
        System.out.println("10 / 3 = " + 10 / 3 + ", 10.0 / 3 = " + 10.0 / 3 + ", 1 / 0.0 = " + 1 / 0.0);
        System.out.println("char + int: 'A' + 1 = " + ('A' + 1) + ", (char) ('A' + 1) = " + (char) ('A' + 1));
    }
}
