package de.dhbw.tinf22b5.dinder.controller;


import de.dhbw.tinf22b5.dinder.models.LoginModel;
import de.dhbw.tinf22b5.dinder.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/login")
    public boolean login(@RequestBody LoginModel loginModel, HttpServletResponse response) {
        Cookie sessionIdCookie = new Cookie("session-id", "nein");
        sessionIdCookie.setHttpOnly(true);
        response.addCookie(sessionIdCookie);

        return userService.login(loginModel);
    }

    @GetMapping("/test")
    public String test() {
        return "Test";
    }
}
