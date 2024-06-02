package de.dhbw.tinf22b5.dinder.advertisementcontroller;

import de.dhbw.tinf22b5.dinder.controller.UserController;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class ImageTest {

    @Autowired
    SecurityService securityService;

    @LocalServerPort
    private Integer port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void noSessionToken() {
        when().get("/api/v1/advertisement/1/image").
                then().
                statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    void getAdvertisementWithDefaultImage() {
        given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
        when().get("/api/v1/advertisement/1/image").
        then().
                statusCode(HttpStatus.NOT_FOUND.value()).
                contentType("image/jpeg");
    }
}