package de.dhbw.tinf22b5.dinder.controller;


import de.dhbw.tinf22b5.dinder.models.request.LoginModel;
import de.dhbw.tinf22b5.dinder.models.request.RegisterModel;
import de.dhbw.tinf22b5.dinder.models.response.UserInformationModel;
import de.dhbw.tinf22b5.dinder.services.SecurityService;

import de.dhbw.tinf22b5.dinder.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/login")
    public boolean login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        Cookie sessionIdCookie = new Cookie("session-id", securityService.generateKey(/*TODO*/ "test@yahoo.de"));
        sessionIdCookie.setHttpOnly(true);
        response.addCookie(sessionIdCookie);

        return userService.login(loginModel);
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterModel registerModel, HttpServletResponse response) {
        Cookie sessionIdCookie = new Cookie("session-id", securityService.generateKey(/*TODO*/ "test@yahoo.de"));
        sessionIdCookie.setHttpOnly(true);
        response.addCookie(sessionIdCookie);

        return userService.register(registerModel);
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
