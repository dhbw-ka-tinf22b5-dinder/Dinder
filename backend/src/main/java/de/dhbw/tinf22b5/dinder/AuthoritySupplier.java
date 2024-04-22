package de.dhbw.tinf22b5.dinder;

import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@FunctionalInterface
public interface AuthoritySupplier {
    Set<GrantedAuthority> get(String email);
}