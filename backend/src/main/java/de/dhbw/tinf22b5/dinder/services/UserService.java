package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.models.LoginModel;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final SecurityService securityService;
    private final Map<String, String> users = Map.of("admin", "admin", "user", "password");

    public boolean login(LoginModel model) {
        return users.containsKey(model.loginName()) && users.get(model.loginName()).equals(model.password());
    }

    @Transactional
    public Optional<UsernamePasswordAuthenticationToken> validate(String token) {
        return securityService.validate(token, id -> new HashSet<>());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(!users.containsKey(username)) {
            throw new UsernameNotFoundException(username);
        }

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return new HashSet<>();
            }

            @Override
            public String getPassword() {
                return passwordEncoder.encode(users.get(username));
            }

            @Override
            public String getUsername() {
                return username;
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
    }
}
