package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.AuthorityFactory;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@Service
@Slf4j
public class SecurityService {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public String getEmail(String token) {
        return Jwts.parserBuilder()
                //.setSigningKey(privateKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Optional<UsernamePasswordAuthenticationToken> validate(String token, AuthorityFactory authorityFactory) {
        try {
            String email = getEmail(token);

            return Optional.of(new UsernamePasswordAuthenticationToken(email, null, authorityFactory.get(email)));
        }
        catch (ExpiredJwtException expiredJwtException) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED);
        }
        catch (SignatureException signatureException) {
            log.warn("Someone tried to authorize with a forged JWT.", signatureException);
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "This account is deactivated.");
        }
    }
}
