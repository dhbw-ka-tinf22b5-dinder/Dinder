package de.dhbw.tinf22b5.dinder.advertisementcontroller;

import de.dhbw.tinf22b5.dinder.controller.UserController;
import de.dhbw.tinf22b5.dinder.repositories.AdvertisementRepository;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import org.junit.jupiter.api.Assertions;
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
class AddAdvertisementTest {

    @Autowired
    AdvertisementRepository advertisementRepository;

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
        given().
                body("{\"title\":\"new title\",\"price\":15.50,\"location\":\"Karlsruhe\",\"plz\":76135,\"description\":\"This is an advertisment added in a test\"}").
                contentType(ContentType.JSON).
        when().post("/api/v1/advertisement").
        then().
                statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    void createAdvertisement() {
        int advertisementId = 3;
        try {
            JsonPath requestJson = JsonPath.from("{\"title\":\"new title\",\"price\":15.50,\"location\":\"Karlsruhe\",\"postalCode\":76135,\"description\":\"This is an advertisment added in a test\"}");
            String userEmail = "mustermann@max.de";

            JsonPath response =
                    given().
                            body(requestJson.prettify()).
                            contentType(ContentType.JSON).
                            cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey(userEmail)).
                            when().post("/api/v1/advertisement").
                            then().
                            statusCode(HttpStatus.OK.value()).
                            extract().body().jsonPath();

            advertisementId = response.getInt("advertisementId");
            Assertions.assertTrue(advertisementId > 0);

            Assertions.assertEquals(requestJson.getString("title"), response.getString("title"));
            Assertions.assertEquals(requestJson.getFloat("price"), response.getFloat("price"));
            Assertions.assertEquals(requestJson.getString("location"), response.getString("location"));
            Assertions.assertEquals(requestJson.getInt("postalCode"), response.getInt("postalCode"));
            Assertions.assertEquals(requestJson.getString("description"), response.getString("description"));

            Assertions.assertEquals(userEmail, response.getString("advertiser.email"));

        } finally {
            advertisementRepository.deleteById(advertisementId);
        }
    }
}