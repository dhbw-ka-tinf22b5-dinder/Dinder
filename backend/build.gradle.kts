plugins {
    `java-library`
    application
    eclipse
}

group = "de.dhbw.tinf22b5"
version = "1.0.0"
description = "Dinder-Backend"

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("org.projectlombok:lombok:1.18.28")
    implementation("org.springframework:spring-web:6.0.6")
    implementation("org.springframework.boot:spring-boot-starter:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-tomcat:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-web:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-security:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.0.4")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.0.4")

    annotationProcessor("org.projectlombok:lombok:1.18.28")

    testImplementation("junit:junit:4.13.1")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
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
