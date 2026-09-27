# Syntax Basics

Variables, operators, decisions, loops: the everyday grammar. Java is **statically typed**: every variable has a type the compiler checks. With `var`, you can skip writing it when it's obvious. All output below comes from `code/java/Basics.java`.

## Variables
```java
var count = 0;                      // type inferred: int (local variables only)
final int max = 3;                  // can't be reassigned
long big = 3_000_000_000L;          // L for long literals; _ for readability
double price = 19.99;
char grade = 'A';                   // single quotes: one character
boolean open = true;
String name = "Ada";                // double quotes: a String (an object)
```
```
count=0 max=3 big=3000000000 price=19.99 grade=A open=true
```
- Local variables must be assigned before use (`variable x might not have been initialized`).
- `var` needs an initializer and works only for local variables, not fields or parameters.
- Naming: `camelCase` for variables and methods, `PascalCase` for classes, `UPPER_SNAKE` for constants.

Types in detail: [[java/Primitive Types]].

## Operators
```java
System.out.println("7 / 2 = " + (7 / 2) + ", 7 % 2 = " + (7 % 2) + ", 7 / 2.0 = " + (7 / 2.0));
int i = 5;
System.out.println("i++ gives " + (i++) + ", then i is " + i + "; ++i gives " + (++i));
```
```
7 / 2 = 3, 7 % 2 = 1, 7 / 2.0 = 3.5
i++ gives 5, then i is 6; ++i gives 7
```
| Operators | |
|---|---|
| `+ - * / %` | arithmetic; `/` between two ints **drops the fraction** |
| `++ --` | increment; postfix returns the old value, prefix the new |
| `== != < > <= >=` | comparison (on objects, `==` compares references: [[java/References and Memory]]) |
| `&& \|\| !` | logical AND, OR, NOT; `&&` and `\|\|` short-circuit |
| `? :` | ternary: `count > 0 ? "some" : "none"` |
| `+= -= *= /=` | compound assignment |
| `& \| ^ ~ << >> >>>` | bit operations |
| `instanceof` | type check ([[java/Switch and Pattern Matching]]) |

## if / else
```java
if (count < max) {
    System.out.println("room for " + (max - count) + " more");
} else if (count == max) {
    System.out.println("full");
} else {
    throw new IllegalStateException("over max");
}
```
Always use braces, even for one line: it prevents a classic bug when a second line is added later.

## Loops
```java
for (int n = 0; n < 3; n++) System.out.print(n + " ");        // counting loop
for (String name : names) System.out.print(name + " ");       // for-each over any Iterable
int w = 1;
while (w < 100) w *= 3;                                        // while a condition holds
int d = 10;
do { d--; } while (d > 20);                                    // runs at least once
```
```
0 1 2 <- counting loop
Ada Grace Linus <- for-each
while: first power of 3 >= 100 is 243
do-while runs at least once: d=9
```
`break` leaves a loop, `continue` skips to the next iteration. With a label, `break` can leave an outer loop:
```java
outer:
for (int a = 0; a < 3; a++) {
    for (int b = 0; b < 3; b++) {
        if (b == 1) continue;
        if (a == 2) break outer;
        System.out.print("(" + a + "," + b + ") ");
    }
}
```
```
(0,0) (0,2) (1,0) (1,2) <- labelled break
```
Often clearer: extract the loops into a method and `return`.

## Comments
```java
// single line
/* several
   lines */
/** Javadoc: documents the next class/method; shown by IDEs. */
```

## Statements, blocks, semicolons
Every statement ends with `;`. Blocks `{ }` group statements and define **scope**: a variable declared inside a block doesn't exist outside it. Forgetting a semicolon gives:
```
Cart.java:11: error: ';' expected
        int sum = 0
                   ^
```
More compiler messages: [[java/Common Errors]].

## Printing and reading
```java
System.out.println("line");                         // with newline
System.out.printf("%-8s|%6.2f|%05d%n", "left", 3.14159, 42);
IO.println("Java 25: simpler console I/O");          // java.lang.IO
String name = IO.readln("Your name: ");
```
Formatting codes: [[java/Strings]].

## Next
- `switch` expressions and pattern matching: [[java/Switch and Pattern Matching]]
- Writing your own methods: [[java/Methods]]
