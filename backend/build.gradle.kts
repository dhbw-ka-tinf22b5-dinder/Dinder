plugins {
    `java-library`
    application
}

group = "de.dhbw.tinf22b5"
version = "1.0.0"
description = "Dinder"

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("org.projectlombok:lombok:1.18.28")
    testImplementation("junit:junit:4.13.1")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
    annotationProcessor("org.projectlombok:lombok:1.18.28")
    implementation("com.google.guava:guava:31.1-jre")
}

application {
    mainClass.set("de.dhbw.tinf22b5.dinder.App")
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}

tasks.withType<Javadoc> {
    options.encoding = "UTF-8"
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
