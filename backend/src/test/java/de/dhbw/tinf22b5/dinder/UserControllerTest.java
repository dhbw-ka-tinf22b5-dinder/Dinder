package de.dhbw.tinf22b5.dinder;

import de.dhbw.tinf22b5.dinder.services.UserService;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

import static io.restassured.RestAssured.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class UserControllerTest {
    @Autowired
    UserService userService;
    @LocalServerPort
    private Integer port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void shouldGive401Unauthorized() {
        when().get("/api/v1/user/me").then().statusCode(401);
    }
}