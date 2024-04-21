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
        if (request.getCookies() != null) {
            Arrays.stream(request.getCookies())
                    .filter(cookie -> cookie.getName().equalsIgnoreCase("session-id"))
                    .flatMap(cookie -> Optional.ofNullable(cookie.getValue()).stream())
                    .findFirst()
                    .flatMap(userService::validateToken)
                    .ifPresent(token -> SecurityContextHolder.getContext().setAuthentication(token));
        }

        filterChain.doFilter(request, response);
    }
}