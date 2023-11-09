package de.dhbw.tinf22b5.dinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("de.dhbw.tinf22b5.dinder.")
public class DinderApplication {
    public String getGreeting() {
        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println(new DinderApplication().getGreeting());


        SpringApplication.run(DinderApplication.class, args);
    }
}