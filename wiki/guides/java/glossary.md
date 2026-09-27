# Glossary

Java words, in one place.

| Term | Meaning |
|---|---|
| **JDK** | Java Development Kit: compiler, tools and runtime. What you install ([[java/Installing the JDK]]) |
| **JRE** | Java Runtime Environment: JVM + standard library, to run programs |
| **JVM** | Java Virtual Machine: runs bytecode on a specific OS ([[java/How Java Runs]]) |
| **bytecode** | the platform-neutral instructions in `.class` files |
| **JIT** | just-in-time compiler that turns hot bytecode into native machine code |
| **LTS** | long-term support release, maintained for years (17, 21, 25) |
| **class** | a blueprint defining fields and methods ([[java/Classes and Objects]]) |
| **object / instance** | a concrete value created from a class with `new` |
| **constructor** | code that initialises a new object |
| **field** / **method** | data / behaviour of a class |
| **static** | belonging to the class rather than an instance |
| **record** | a compact, immutable data carrier class ([[java/Records and Enums]]) |
| **enum** | a type with a fixed set of instances |
| **interface** | a contract of methods that classes implement ([[java/Interfaces and Polymorphism]]) |
| **abstract class** | a class that can't be instantiated, with shared state and abstract methods |
| **sealed** | a type whose subtypes are listed explicitly ([[java/Sealed Types]]) |
| **polymorphism** | one call, many behaviours, chosen by the object's runtime type |
| **encapsulation** | hiding fields behind methods |
| **composition** | building objects from other objects ("has a") instead of inheriting ([[java/Inheritance and Composition]]) |
| **primitive** | one of eight built-in value types like `int` or `boolean` ([[java/Primitive Types]]) |
| **reference** | a variable that points at an object on the heap ([[java/References and Memory]]) |
| **heap / stack** | memory for objects / for method calls and local variables |
| **autoboxing** | automatic conversion between `int` and `Integer` (and friends) |
| **immutable** | can't change after creation (`String`, records, `List.of`) |
| **checked exception** | an exception the compiler forces you to catch or declare ([[java/Exceptions]]) |
| **stack trace** | the list of method calls that led to an exception |
| **generics** | type parameters like `List<T>` for type-safe reusable code ([[java/Generics]]) |
| **type erasure** | generic types are removed at runtime |
| **lambda** | a short anonymous function, like `x -> x * 2` ([[java/Lambdas and Functional Interfaces]]) |
| **functional interface** | an interface with one abstract method, implementable by a lambda |
| **method reference** | `User::name`, a shorthand for a lambda calling one method |
| **stream** | a lazy pipeline of operations over a sequence of elements ([[java/Streams]]) |
| **Optional** | a container for zero or one value ([[java/Optional]]) |
| **collection** | a group of objects: `List`, `Set`, `Queue`; `Map` for key-value pairs ([[java/Collections]]) |
| **hashCode / equals** | the pair of methods hash-based collections rely on ([[java/Maps and Hashing]]) |
| **thread** | an independent path of execution ([[java/Concurrency Basics]]) |
| **virtual thread** | a lightweight JVM-managed thread (Java 21+) ([[java/Virtual Threads and Executors]]) |
| **race condition** | a bug where the result depends on thread timing |
| **garbage collector** | the part of the JVM that frees unreachable objects ([[java/Garbage Collection]]) |
| **classpath** | where the JVM looks for classes and libraries |
| **package** | a namespace for classes, matching a folder ([[java/Access Modifiers and Packages]]) |
| **module** | a named group of packages with declared dependencies (`module-info.java`) |
| **JAR** | a zip file of compiled classes and resources |
| **Maven / Gradle** | build tools that manage dependencies and build steps ([[java/Build Tools]]) |
| **Maven Central** | the main public repository of Java libraries |
| **wrapper** | `gradlew`/`mvnw`: scripts that download the right build tool version |
| **JUnit** | the standard testing framework ([[java/Testing with JUnit]]) |
| **Spring Boot** | the most popular framework for Java (and Kotlin) web backends |
| **preview feature** | a finished-but-not-final language feature, enabled with `--enable-preview` |
