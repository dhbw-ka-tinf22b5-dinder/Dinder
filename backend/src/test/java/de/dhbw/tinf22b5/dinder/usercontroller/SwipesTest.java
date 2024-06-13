package de.dhbw.tinf22b5.dinder.usercontroller;

import de.dhbw.tinf22b5.dinder.controller.UserController;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import de.dhbw.tinf22b5.dinder.services.UserService;
import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;
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
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
class SwipesTest {
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
        when().get("/api/v1/user/swipes").
                then().
                statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    void getEmptySwipes() {
        JsonPath expected = JsonPath.given("[]");

        JsonPath response = given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
                when().get("/api/v1/user/swipes").
                then().
                statusCode(HttpStatus.OK.value()).
                extract().body().jsonPath();

        assertEquals(expected.prettify(), response.prettify());
    }

    @Test
    void getSwipes() {
        JsonPath expected = JsonPath.given("[{\"swipeId\":1,\"swipeTime\":\"2023-11-13T08:09:10Z\",\"swipeState\":\"ACCEPTED\",\"advertisement\":{\"advertisementId\":2,\"title\":\"Haus bauen\",\"price\":17.5,\"location\":\"Karlsruhe\",\"postalCode\":12345,\"description\":\"description123\",\"imagePath\":null,\"advertiser\":{\"userName\":\"maxMustermann\"},\"contractor\":null,\"creationTime\":\"2023-11-12T08:09:10Z\"},\"user\":{\"userName\":\"userTest\"}}]");

        JsonPath response = given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("test@yahoo.de")).
                when().get("/api/v1/user/swipes").
                then().
                statusCode(HttpStatus.OK.value()).
                extract().body().jsonPath();

        assertEquals(expected.prettify(), response.prettify());
    }
}