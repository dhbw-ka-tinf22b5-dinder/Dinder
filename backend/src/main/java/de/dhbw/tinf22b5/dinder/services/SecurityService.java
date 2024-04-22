package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.AuthoritySupplier;
import de.dhbw.tinf22b5.dinder.RsaKeyProperties;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
public class SecurityService {
    private final RsaKeyProperties rsaKeys;

    public SecurityService() {
        try (InputStream publicKeyStream = getClass().getClassLoader().getResourceAsStream("certs/public.pem");
             InputStream privateKeyStream = getClass().getClassLoader().getResourceAsStream("certs/private.pem")) {
            if (publicKeyStream == null || privateKeyStream == null) {
                throw new RuntimeException("Key files are missing!");
            }

            String publicKey = new String(publicKeyStream.readAllBytes())
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replaceAll(System.lineSeparator(), "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .strip();
            X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(Base64.decodeBase64(publicKey));

            String privateKey = new String(privateKeyStream.readAllBytes())
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replaceAll(System.lineSeparator(), "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .strip();
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKey));
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            this.rsaKeys = new RsaKeyProperties((RSAPublicKey) keyFactory.generatePublic(publicKeySpec),
                    (RSAPrivateKey) keyFactory.generatePrivate(spec));
        }
        catch (IOException | NoSuchAlgorithmException | InvalidKeySpecException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public String getEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(rsaKeys.publicKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String generateKey(String email) {
        Instant issued = Instant.now();

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(Date.from(issued))
                .signWith(rsaKeys.privateKey())
                .setExpiration(Date.from(issued.plus(30, ChronoUnit.DAYS)))
                .compact();
    }

    public Optional<UsernamePasswordAuthenticationToken> validate(String token, AuthoritySupplier authoritySupplier) {
        try {
            String email = getEmail(token);

            return Optional.of(new UsernamePasswordAuthenticationToken(email, null, authoritySupplier.get(email)));
        }
        catch (ExpiredJwtException expiredJwtException) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        catch (SignatureException signatureException) {
            log.warn("Someone tried to authorize with a forged JWT.", signatureException);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "This account is deactivated.");
        }
    }
}
