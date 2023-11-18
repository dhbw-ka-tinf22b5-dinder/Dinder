package de.dhbw.tinf22b5.dinder;

import de.dhbw.tinf22b5.dinder.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Order(1)
@AllArgsConstructor
public class AuthorizationFilter extends OncePerRequestFilter {
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response,
                                    @NotNull FilterChain filterChain) throws ServletException, IOException {
        Arrays.stream(request.getCookies())
                .flatMap(cookie -> Optional.ofNullable(cookie.getAttribute("session-id")).stream())
                .findFirst()
                .ifPresent(sessionId -> {
                    try {
                        userService.validate(sessionId)
                                .ifPresent(token -> SecurityContextHolder.getContext().setAuthentication(token));
                    }
                    catch (HttpClientErrorException httpClientErrorException) {
                        response.setStatus(httpClientErrorException.getStatusCode().value());
                    }
                });

        filterChain.doFilter(request, response);
    }
}