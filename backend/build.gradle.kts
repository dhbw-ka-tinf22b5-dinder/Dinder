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
    implementation("org.jetbrains:annotations:24.0.0")
    implementation("org.projectlombok:lombok:1.18.28")
    implementation("org.springframework:spring-web:6.0.6")
    implementation("org.springframework.boot:spring-boot-starter:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-tomcat:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-web:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-security:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.1.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.1.5")
    implementation("org.postgresql:postgresql:42.6.0")
    implementation("org.flywaydb:flyway-core:10.0.1")
    implementation("org.flywaydb:flyway-database-postgresql:10.0.1")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-gson:0.11.5")
    implementation("com.google.code.gson:gson:2.10.1")

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
