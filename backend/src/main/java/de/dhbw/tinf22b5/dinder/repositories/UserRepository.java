package de.dhbw.tinf22b5.dinder.repositories;

import de.dhbw.tinf22b5.dinder.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
}