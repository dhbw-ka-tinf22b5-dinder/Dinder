package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.request.LoginModel;
import de.dhbw.tinf22b5.dinder.models.request.RegisterModel;
import de.dhbw.tinf22b5.dinder.models.response.UserInformationModel;
import de.dhbw.tinf22b5.dinder.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    public boolean login(LoginModel model) {
        if (model.isInvalid())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        return userRepository.findById(model.loginName())
                .map(Users::getPwdHash)
                .filter(value -> passwordEncoder.matches(model.password(), value))
                .isPresent();
    }

    public boolean register(RegisterModel registerModel) {
        if (registerModel.isInvalid())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        if (userRepository.findById(registerModel.email()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        userRepository.save(new Users(registerModel.email(), registerModel.userName(),
                passwordEncoder.encode(registerModel.password())));
        return true;
    }

    @Transactional
    public Optional<UsernamePasswordAuthenticationToken> validateToken(String token) {
        return securityService.validate(token, id -> new HashSet<>());
    }

    /**
     * Loads the user by email.
     *
     * @param username The email of the user.
     * @return The user corresponding to the email address given in the parameter.
     * @throws UsernameNotFoundException if the user is not found.
     */
    @Override
    public Users loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public Optional<UserInformationModel> getUserInfo(String email) {
        return userRepository.findById(email).map(Users::toInformationModel);
    }
}
