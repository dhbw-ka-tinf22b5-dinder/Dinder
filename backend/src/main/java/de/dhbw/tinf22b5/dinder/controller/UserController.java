package de.dhbw.tinf22b5.dinder.controller;


import de.dhbw.tinf22b5.dinder.models.request.LoginModel;
import de.dhbw.tinf22b5.dinder.models.request.RegisterModel;
import de.dhbw.tinf22b5.dinder.models.response.UserInformationModel;
import de.dhbw.tinf22b5.dinder.services.SecurityService;
import de.dhbw.tinf22b5.dinder.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
@Tag(name = "User-Controller", description = "Manages the access to the application and provides information about " +
        "users.")
public class UserController {
    private UserService userService;
    private SecurityService securityService;

    @Operation(description = "Log in using the credentials. The response will have a cookie attached, which contains the " +
            "JWT token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logged in successfully.",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Boolean.class))})})
    @PostMapping("/login")
    public boolean login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        boolean loginSuccessful = userService.login(loginModel);
        // TODO: besser machen
        if (loginSuccessful) {
            Cookie sessionIdCookie = new Cookie("session-id", securityService.generateKey(loginModel.loginName()));
            sessionIdCookie.setHttpOnly(true);
            response.addCookie(sessionIdCookie);
        }

        return loginSuccessful;
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterModel registerModel, HttpServletResponse response) {
        boolean registrationSuccessful = userService.register(registerModel);
        // TODO: besser machen
        if (registrationSuccessful) {
            Cookie sessionIdCookie = new Cookie("session-id", securityService.generateKey(registerModel.email()));
            sessionIdCookie.setHttpOnly(true);
            response.addCookie(sessionIdCookie);
        }

        return registrationSuccessful;
    }

    @GetMapping("/user/{email}")
    public UserInformationModel getUserInfo(@PathVariable String email) {
        return userService.getUserInfo(email).orElseThrow(() -> new HttpClientErrorException(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/user/me")
    public UserInformationModel getMyUserInfo(HttpServletRequest request) {
        String email = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equalsIgnoreCase("session-id"))
                .flatMap(cookie -> Optional.ofNullable(cookie.getValue()).stream())
                .map(s -> securityService.getEmail(s))
                .findFirst().orElseThrow(() -> new HttpClientErrorException(HttpStatus.BAD_REQUEST));

        return userService.getUserInfo(email).orElseThrow(() -> new HttpClientErrorException(HttpStatus.BAD_REQUEST));
    }
}
