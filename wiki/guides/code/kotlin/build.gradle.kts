plugins {
    kotlin("jvm") version "2.4.20"
}

repositories { mavenCentral() }

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    testImplementation(kotlin("test"))
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.11.0")
}

kotlin { jvmToolchain(21) }

tasks.test {
    useJUnitPlatform()
    testLogging { events("passed", "failed") }
}

// ./gradlew runExample -Pmain=BasicsKt  runs one example's main()
tasks.register<JavaExec>("runExample") {
    classpath = sourceSets.main.get().runtimeClasspath
    mainClass = providers.gradleProperty("main").orElse("BasicsKt")
    jvmArgs("-Dstdout.encoding=UTF-8")
}
