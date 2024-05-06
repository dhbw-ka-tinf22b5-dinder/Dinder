plugins {
    `java-library`
    application
    eclipse
    kotlin("jvm")
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
    implementation("org.springframework.boot:spring-boot-starter:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-tomcat:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-web:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-security:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:3.2.4")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:3.2.4")
    implementation("org.postgresql:postgresql:42.6.0")
    implementation("com.h2database:h2:1.4.200")
    implementation("org.flywaydb:flyway-core:10.0.1")
    implementation("org.flywaydb:flyway-database-postgresql:10.0.1")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-gson:0.11.5")
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-api:2.1.0")
    implementation("io.github.jan-tennert.supabase:storage-kt:2.3.1")
    implementation("io.ktor:ktor-client-okhttp:2.3.10")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.0")
    implementation(kotlin("stdlib-jdk8"))

    annotationProcessor("org.projectlombok:lombok:1.18.28")

    testImplementation("junit:junit:4.13.1")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
}

application {
    mainClass.set("de.dhbw.tinf22b5.dinder.DinderApplication")
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs = options.compilerArgs + "-parameters"
}

tasks.withType<Javadoc> {
    options.encoding = "UTF-8"
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(17)
}
