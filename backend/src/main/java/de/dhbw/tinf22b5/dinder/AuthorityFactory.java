package de.dhbw.tinf22b5.dinder;

import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@FunctionalInterface
public interface AuthorityFactory {
    Set<? extends GrantedAuthority> get(long id);
}