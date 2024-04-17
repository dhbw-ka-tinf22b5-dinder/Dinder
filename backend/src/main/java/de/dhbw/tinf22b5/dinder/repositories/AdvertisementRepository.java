package de.dhbw.tinf22b5.dinder.repositories;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Integer> {
}