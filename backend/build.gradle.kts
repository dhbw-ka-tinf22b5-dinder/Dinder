plugins {
    `java-library`
    application
    eclipse
    kotlin("jvm")

    id("jacoco")
}

tasks.jacocoTestReport {
    reports {
        xml.required = true
    }
}

group = "de.dhbw.tinf22b5"
version = "1.0.0"
description = "Dinder-Backend"

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("org.jetbrains:annotations")
    implementation("org.projectlombok:lombok")
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-tomcat")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.postgresql:postgresql")
    implementation("com.h2database:h2")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    implementation("io.jsonwebtoken:jjwt-impl")
    implementation("io.jsonwebtoken:jjwt-api")
    implementation("io.jsonwebtoken:jjwt-gson")
    implementation("com.google.code.gson:gson")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-api")
    implementation("io.github.jan-tennert.supabase:storage-kt")
    implementation("io.ktor:ktor-client-okhttp")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android")
    implementation("org.apache.tika:tika-core")
    implementation(kotlin("stdlib-jdk8"))

    annotationProcessor("org.projectlombok:lombok")

    testImplementation("io.rest-assured:rest-assured")
    testImplementation("io.rest-assured:spring-mock-mvc")
    testImplementation("org.springframework.boot:spring-boot-testcontainers")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("junit:junit")
    testImplementation("org.junit.jupiter:junit-jupiter")
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
    finalizedBy(tasks.jacocoTestReport)
}

kotlin {
    jvmToolchain(17)
}
