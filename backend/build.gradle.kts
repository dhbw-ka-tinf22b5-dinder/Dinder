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

val jetbrainsAnnotationsVersion = "24.0.0"
val lombokVersion = "1.18.28"
val springBootVersion = "3.2.4"
val postgresqlVersion = "42.6.0"
val h2Version = "1.4.200"
val flywayVersion = "10.0.1"
val jwtVersion = "0.11.5"
val gsonVersion = "2.10.1"
val springDocVersion = "2.1.0"
val supabaseStorageVersion = "2.3.1"
val ktorVersion = "2.3.10"
val kotlinxCoroutinesVersion = "1.8.0"
val tikaVersion = "2.9.0"
val restAssuredVersion = "5.4.0"
val junitVersion = "4.13.1"
val jupiterVersion = "5.8.1"
val testContainersJupiterVersion = "1.19.8"
val mockitoVersion = "3.+"

dependencies {
    implementation("org.jetbrains:annotations:$jetbrainsAnnotationsVersion")
    implementation("org.projectlombok:lombok:$lombokVersion")
    implementation("org.springframework.boot:spring-boot-starter:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-tomcat:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-web:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-security:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:$springBootVersion")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:$springBootVersion")
    implementation("org.postgresql:postgresql:$postgresqlVersion")
    implementation("com.h2database:h2:$h2Version")
    implementation("org.flywaydb:flyway-core:$flywayVersion")
    implementation("org.flywaydb:flyway-database-postgresql:$flywayVersion")
    implementation("io.jsonwebtoken:jjwt-impl:$jwtVersion")
    implementation("io.jsonwebtoken:jjwt-api:$jwtVersion")
    implementation("io.jsonwebtoken:jjwt-gson:$jwtVersion")
    implementation("com.google.code.gson:gson:$gsonVersion")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-api:$springDocVersion")
    implementation("io.github.jan-tennert.supabase:storage-kt:$supabaseStorageVersion")
    implementation("io.ktor:ktor-client-okhttp:$ktorVersion")
    implementation(kotlin("stdlib-jdk8"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:$kotlinxCoroutinesVersion")
    implementation("org.apache.tika:tika-core:$tikaVersion")

    annotationProcessor("org.projectlombok:lombok:$lombokVersion")

    testImplementation("io.rest-assured:rest-assured:$restAssuredVersion")
    testImplementation("io.rest-assured:spring-mock-mvc:$restAssuredVersion")
    testImplementation("org.springframework.boot:spring-boot-testcontainers:$springBootVersion")
    testImplementation("org.springframework.boot:spring-boot-starter-test:$springBootVersion")
    testImplementation("junit:junit:$junitVersion")
    testImplementation("org.junit.jupiter:junit-jupiter:$jupiterVersion")
    testImplementation("org.testcontainers:junit-jupiter:$testContainersJupiterVersion")
    testImplementation("org.mockito:mockito-core:$mockitoVersion")
}

application {
    mainClass.set("de.dhbw.tinf22b5.dinder.DinderApplication")
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

tasks.withType<CreateStartScripts> {
    classpath = files("lib/*")
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
