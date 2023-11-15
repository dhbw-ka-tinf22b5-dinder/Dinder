package de.dhbw.tinf22b5.dinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("de.dhbw.tinf22b5.dinder.")
public class DinderApplication {
    public static void main(String[] args) {
        SpringApplication.run(DinderApplication.class, args);
    }
}