# Installing the JDK

## Which version?
Use the newest **LTS** (long-term support) release unless your project requires another: **Java 25** (September 2025). Java 21 (2023) and 17 (2021) are still very common in companies. A new non-LTS version appears every six months (March and September); Java 27 came out in September 2026.

## Which distribution?
"Java" is OpenJDK, built and packaged by several vendors. They're functionally the same; pick one with free updates:
| Distribution | Notes |
|---|---|
| **Eclipse Temurin** (Adoptium) | the common default, free, TCK-certified |
| Amazon Corretto, Microsoft Build of OpenJDK, Azul Zulu | free, vendor-maintained |
| Oracle JDK | free under Oracle's licence terms for current versions; check before commercial use of older ones |
| GraalVM | adds native-image compilation |

## Install
| System | Command |
|---|---|
| Windows | `winget install EclipseAdoptium.Temurin.25.JDK` (or the MSI from adoptium.net; tick "Set JAVA_HOME") |
| macOS | `brew install --cask temurin@25` |
| Ubuntu/Debian | `sudo apt install openjdk-25-jdk` (or Adoptium's apt repository) |
| Any, several versions | **SDKMAN!**: `sdk install java 25-tem`, `sdk use java 21-tem` |
| In IntelliJ IDEA | *Project Structure → SDKs → + → Download JDK* |

Check:
```sh
java -version
javac -version
```
```
openjdk version "25.0.4.1" 2026-08-18 LTS
OpenJDK Runtime Environment Temurin-25.0.4.1+1 (build 25.0.4.1+1-LTS)
OpenJDK 64-Bit Server VM Temurin-25.0.4.1+1 (build 25.0.4.1+1-LTS, mixed mode, sharing)
```

## JAVA_HOME and PATH
Many tools (Gradle, Maven, IDEs) look for `JAVA_HOME`, the JDK's folder:
```sh
# macOS/Linux, in ~/.zshrc or ~/.bashrc
export JAVA_HOME=$(/usr/libexec/java_home -v 25)   # macOS
export JAVA_HOME=/usr/lib/jvm/temurin-25-jdk-amd64 # Linux (path varies)
export PATH="$JAVA_HOME/bin:$PATH"
```
Windows: *System → Advanced → Environment Variables*, set `JAVA_HOME` to e.g. `C:\Program Files\Eclipse Adoptium\jdk-25…` and add `%JAVA_HOME%\bin` to `Path`. Open a **new** terminal afterwards.

## Several JDKs side by side
Common when projects need different versions. Options:
- **SDKMAN!** (macOS/Linux/WSL): `sdk use java 21-tem` per shell, `.sdkmanrc` per project.
- **Gradle toolchains**: the build declares the version and Gradle finds or downloads it ([[java/Build Tools]]):
  ```kotlin
  java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
  ```
- **IntelliJ**: per-project SDK in *Project Structure*.

## Troubleshooting
| Symptom | Cause |
|---|---|
| `'java' is not recognized…` / `command not found` | `bin` folder not on `PATH`, or terminal opened before installing |
| `java -version` shows an old version | another JDK earlier on `PATH`; check `where java` (Windows) / `which -a java` |
| Gradle: "Unsupported class file major version 69" | Gradle too old for your JDK: update the wrapper, or use a toolchain |
| `UnsupportedClassVersionError` | compiled with a newer JDK than the one running it ([[java/How Java Runs]]) |

## Next
Write your first program: [[java/Syntax Basics]]. Set up the IDE: [[IDEs/Project Setup]].
