package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.models.LoginModel;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class UserService {

    //private final PasswordEncoder passwordEncoder;

    private final Map<String, String> users = Map.of("admin", "admin", "user", "password");




    public boolean login(LoginModel model) {
        return users.containsKey(model.loginName()) && users.get(model.loginName()).equals(model.password());
    }
}
