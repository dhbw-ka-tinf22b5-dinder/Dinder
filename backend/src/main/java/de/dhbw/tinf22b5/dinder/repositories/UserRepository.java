package de.dhbw.tinf22b5.dinder.repositories;

import de.dhbw.tinf22b5.dinder.entities.User;
import jakarta.annotation.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String Email, String UserName);
}
