package de.dhbw.tinf22b5.dinder;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("de.dhbw.tinf22b5.dinder.*")
@ComponentScan(basePackages = { "de.dhbw.tinf22b5.dinder.*" })
@EntityScan("de.dhbw.tinf22b5.dinder.*")
@OpenAPIDefinition(info = @Info(title = "Dinder", version = "v1"))
public class DinderApplication {
    @ExcludeFromJacocoGeneratedReport
    public static void main(String[] args) {
        SpringApplication.run(DinderApplication.class, args);
    }
}