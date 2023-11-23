package de.dhbw.tinf22b5.dinder.config;

import jakarta.annotation.PostConstruct;
import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class DatabaseConfig {
    private final Environment environment;

    public DatabaseConfig(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    public void init() {
        Flyway.configure()
                .dataSource(environment.getProperty("spring.datasource.url"), environment.getProperty("spring" +
                        ".datasource.username"), environment.getProperty("spring.datasource.password"))
                .locations("classpath:migrations")
                .defaultSchema("flyway")
                .load().migrate();
    }
}