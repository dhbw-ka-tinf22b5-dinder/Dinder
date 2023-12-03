package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.request.LoginModel;
import de.dhbw.tinf22b5.dinder.models.request.RegisterModel;
import de.dhbw.tinf22b5.dinder.models.response.UserInformationModel;
import de.dhbw.tinf22b5.dinder.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashSet;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    public boolean login(LoginModel model) {
        if(model.isInvalid())
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);

        return userRepository.findById(model.loginName())
                .map(Users::getPwdHash)
                .filter(value -> passwordEncoder.matches(model.password(), value))
                .isPresent();
    }

    public boolean register(RegisterModel registerModel) {
        if(registerModel.isInvalid())
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);

        if(userRepository.findById(registerModel.email()).isPresent())
            throw new HttpClientErrorException(HttpStatus.CONFLICT);

        userRepository.save(new Users(registerModel.email(), registerModel.userName(), passwordEncoder.encode(registerModel.password())));
        return true;
    }

    @Transactional
    public Optional<UsernamePasswordAuthenticationToken> validateToken(String token) {
        return securityService.validate(token, id -> new HashSet<>());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public Optional<UserInformationModel> getUserInfo(String email) {
        return userRepository.findById(email).map(Users::toInformationModel);
    }
}
