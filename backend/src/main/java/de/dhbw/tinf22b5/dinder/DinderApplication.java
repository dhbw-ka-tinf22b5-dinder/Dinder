package de.dhbw.tinf22b5.dinder;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("de.dhbw.tinf22b5.dinder.")
@OpenAPIDefinition(info = @Info(title = "Dinder", version = "v1"))
public class DinderApplication {
    public static void main(String[] args) {
        SpringApplication.run(DinderApplication.class, args);
    }
}