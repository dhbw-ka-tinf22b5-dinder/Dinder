package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.User;
import de.dhbw.tinf22b5.dinder.models.LoginModel;
import de.dhbw.tinf22b5.dinder.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    public boolean login(LoginModel model) {
        return userRepository.findById(model.loginName())
                .map(User::getPwdHash)
                .filter(value -> passwordEncoder.matches(model.password(), value))
                .isPresent();
    }

    @Transactional
    public Optional<UsernamePasswordAuthenticationToken> validate(String token) {
        return securityService.validate(token, id -> new HashSet<>());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
