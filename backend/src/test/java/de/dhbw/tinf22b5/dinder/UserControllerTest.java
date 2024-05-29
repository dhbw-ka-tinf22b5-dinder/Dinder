package de.dhbw.tinf22b5.dinder;

import de.dhbw.tinf22b5.dinder.controller.UserController;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import de.dhbw.tinf22b5.dinder.services.UserService;
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
import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class UserControllerTest {
    @Autowired
    UserService userService;

    @Autowired
    SecurityService securityService;

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

    @Test
    void shouldGive409Conflict() {
        given().
                body("{\"email\":\"test@yahoo.de\",\"userName\":\"1234\",\"password\":\"123\"}").
                contentType("application/json").
        when().post("/api/v1/register").
        then().
                statusCode(HttpStatus.CONFLICT.value());
    }

    @Test
    void registerSuccessTest() {
        given().
                body("{\"email\":\"newUser@yahoo.de\",\"userName\":\"newUser\",\"password\":\"123\"}").
                contentType("application/json").
        when().post("/api/v1/register").
        then().
                statusCode(HttpStatus.OK.value()).
                cookie(UserController.SESSION_ID_COOKIE);
    }

    @Test
    void getUserInfo() {
        given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
        when().get("/api/v1/user/me").
        then().
                statusCode(HttpStatus.OK.value()).
                body("userName", equalTo("maxMustermann"));
    }

    @Test
    void getUserInfoUnregisteredUser() {
        given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
        when().get("/api/v1/user/not@registerd.user").
        then().
                statusCode(HttpStatus.BAD_REQUEST.value());
    }
}