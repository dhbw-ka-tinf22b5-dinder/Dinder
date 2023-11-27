package de.dhbw.tinf22b5.dinder.controller;


import de.dhbw.tinf22b5.dinder.models.request.LoginModel;
import de.dhbw.tinf22b5.dinder.models.request.RegisterModel;
import de.dhbw.tinf22b5.dinder.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Tag(name = "User-Controller", description = "Manages the access to the application and provides information about " +
        "users.")
public class UserController {

    private UserService userService;

    @PostMapping("/login")
    public boolean login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        Cookie sessionIdCookie = new Cookie("session-id", "nein");
        sessionIdCookie.setHttpOnly(true);
        response.addCookie(sessionIdCookie);

        return userService.login(loginModel);
    }

    @PostMapping("/register")
    public boolean register(@RequestBody RegisterModel registerModel, HttpServletResponse response) {
        Cookie sessionIdCookie = new Cookie("session-id", "nein");
        sessionIdCookie.setHttpOnly(true);
        response.addCookie(sessionIdCookie);

        return userService.register(registerModel);
    }
}
