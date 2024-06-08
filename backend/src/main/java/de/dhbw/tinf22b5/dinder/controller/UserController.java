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
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
@Tag(name = "User-Controller", description = "Manages the access to the application and provides information about " +
        "users.")
public class UserController {
    public static final String SESSION_ID_COOKIE = "session-id";
    private UserService userService;
    private SecurityService securityService;

    private Cookie generateSessionIDCookie(String email) {
        Cookie sessionIdCookie = new Cookie(SESSION_ID_COOKIE, securityService.generateKey(email));
        sessionIdCookie.setHttpOnly(true);
        sessionIdCookie.setSecure(true);
        return sessionIdCookie;
    }

    private Cookie generateLogoutCookie() {
        Cookie sessionIdCookie = new Cookie(SESSION_ID_COOKIE, "TMP");
        sessionIdCookie.setHttpOnly(true);
        sessionIdCookie.setSecure(true);
        sessionIdCookie.setMaxAge(0);
        return sessionIdCookie;
    }

    @Operation(description = "Log in using the credentials. The response will have a cookie attached, which contains " +
            "the " +
            "JWT token.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logged in successfully.",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Boolean.class))})})
    @PostMapping("/login")
    public boolean login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        boolean loginSuccessful = userService.login(loginModel);

        if (loginSuccessful)
            response.addCookie(generateSessionIDCookie(loginModel.loginName()));

        return loginSuccessful;
    }

    @PostMapping("/logout")
    public boolean logout(HttpServletRequest request, HttpServletResponse response) {
        if(request.getCookies() == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

        boolean hasCookie = Arrays.stream(request.getCookies())
                .anyMatch(cookie -> cookie.getName().equalsIgnoreCase(SESSION_ID_COOKIE));

        if(!hasCookie) {
            return false;
        }

        response.addCookie(generateLogoutCookie());

        return true;
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterModel registerModel, HttpServletResponse response) {
        boolean registrationSuccessful = userService.register(registerModel);

        if (registrationSuccessful)
            response.addCookie(generateSessionIDCookie(registerModel.email()));

        return registrationSuccessful;
    }

    @GetMapping("/user/{email}")
    public UserInformationModel getUserInfo(@PathVariable String email) {
        return userService.getUserInfo(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/user/me")
    public UserInformationModel getMyUserInfo(HttpServletRequest request) {
        if(request.getCookies() == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

        String email = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equalsIgnoreCase(SESSION_ID_COOKIE))
                .flatMap(cookie -> Optional.ofNullable(cookie.getValue()).stream())
                .map(s -> securityService.getEmail(s))
                .findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        return userService.getUserInfo(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }
}
