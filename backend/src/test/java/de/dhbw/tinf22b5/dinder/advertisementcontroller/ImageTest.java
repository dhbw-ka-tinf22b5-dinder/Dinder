package de.dhbw.tinf22b5.dinder.advertisementcontroller;

import de.dhbw.tinf22b5.dinder.controller.UserController;
import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.repositories.AdvertisementRepository;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import de.dhbw.tinf22b5.dinder.services.SupabaseService;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ActiveProfiles("dev")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Testcontainers
@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
class ImageTest {

    @MockBean
    SupabaseService supabaseService;

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

    @Test
    void uploadEmptyImage() {
        given().
                cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
                contentType("image/jpeg").
                body(new byte[0]).
            when().put("/api/v1/advertisement/2/image").
            then().
                statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    void uploadImageAndTestQuery() {
        try {
            byte[] image = null;

            try (InputStream in = getClass().getClassLoader().getResourceAsStream("assets/no-image.jpg")) {
                image = Objects.requireNonNull(in).readAllBytes();
            }
            catch (IOException ignored) {
            }

            Map<String, byte[]> images = new HashMap<>();

            Mockito.when(supabaseService.getBucket("advertisement")).thenReturn(null);
            Mockito.when(supabaseService.uploadFile(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.anyString())).thenAnswer(i -> {
                String uuid = UUID.randomUUID().toString();
                images.put(uuid, i.getArgument(1));

                CompletableFuture<String> future = new CompletableFuture<>();
                future.complete(uuid);
                return future;
            });

            Mockito.when(supabaseService.getImage(ArgumentMatchers.any())).thenAnswer(i -> {
                Advertisement advertisement = i.getArgument(0);

                if (images.containsKey(advertisement.getImagePath())) {
                    CompletableFuture<byte[]> future = new CompletableFuture<>();
                    future.complete(images.get(advertisement.getImagePath()));
                    return Optional.of(future);
                }

                return Optional.empty();
            });

            Mockito.when(supabaseService.uploadFile(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.anyString())).thenAnswer(i -> {
                String uuid = UUID.randomUUID().toString();
                images.put(uuid, i.getArgument(1));

                CompletableFuture<String> future = new CompletableFuture<>();
                future.complete(uuid);
                return future;
            });

            // send image
            given().
                    cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
                    contentType("image/jpeg").
                    body(image).
            when().put("/api/v1/advertisement/2/image").
            then().
                    statusCode(HttpStatus.OK.value()).
                    contentType(ContentType.JSON);

            // test image
            byte[] imageData = given().
                        cookie(UserController.SESSION_ID_COOKIE, securityService.generateKey("mustermann@max.de")).
                    when().get("/api/v1/advertisement/2/image").
                    then().
                        statusCode(HttpStatus.OK.value()).
                        contentType("image/jpeg").
                        extract().body().asByteArray();

            Assertions.assertArrayEquals(image, imageData);
        } finally {
            Advertisement advertisement = advertisementRepository.findById(2).orElse(new Advertisement());
            advertisement.setImagePath(null);
            advertisementRepository.save(advertisement);
        }
    }
}