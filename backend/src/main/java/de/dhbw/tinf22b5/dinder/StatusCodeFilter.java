package de.dhbw.tinf22b5.dinder;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class StatusCodeFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (ServletException servletException) {
            if (servletException.getCause() != null && servletException.getCause() instanceof HttpStatusCodeException httpStatusCodeException) {
                response.setStatus(httpStatusCodeException.getStatusCode().value());
            } else {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
                throw servletException;
            }
        }
    }
}
