package de.dhbw.tinf22b5.dinder.usercontroller;

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
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class RegisterTest {

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
    void shouldGive409Conflict() {
        given().
                body("{\"email\":\"test@yahoo.de\",\"userName\":\"1234\",\"password\":\"123\"}").
                contentType("application/json").
                when().post("/api/v1/register").
                then().
                statusCode(HttpStatus.CONFLICT.value());
    }

    @Test
    void registerBadRequestEmailTest() {
        given().
                body("{\"email\":\"newUser@\",\"userName\":\"newUser\",\"password\":\"123\"}").
                contentType("application/json").
                when().post("/api/v1/register").
                then().
                statusCode(HttpStatus.BAD_REQUEST.value());
    }


    @Test
    void registerBadRequestUsernameTest() {
        given().
                body("{\"email\":\"newUser@yahoo.de\",\"userName\":\"newly registered User\",\"password\":\"123\"}").
                contentType("application/json").
                when().post("/api/v1/register").
                then().
                statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    void registerBadRequestPasswordTest() {
        given().
                body("{\"email\":\"newUser@yahoo.de\",\"userName\":\"newUser\",\"password\":\"12\"}").
                contentType("application/json").
                when().post("/api/v1/register").
                then().
                statusCode(HttpStatus.BAD_REQUEST.value());
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
}