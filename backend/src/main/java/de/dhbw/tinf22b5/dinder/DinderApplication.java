package de.dhbw.tinf22b5.dinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
@EntityScan("de.dhbw.tinf22b5.dinder.")
public class DinderApplication {
    public static void main(String[] args) {
        SpringApplication.run(DinderApplication.class, args);
    }
}