package de.dhbw.tinf22b5.dinder.repositories;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.entities.SwipeInformation;
import de.dhbw.tinf22b5.dinder.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SwipeInformationRepository extends JpaRepository<SwipeInformation, Integer> {
    List<SwipeInformation> findAllByAdvertisement(Advertisement advertisement);

    Optional<SwipeInformation> findSwipeInformationByAdvertisementAndContractor(Advertisement advertisement,
                                                                                Users contractor);

    List<SwipeInformation> findAllByContractor(Users contractor);
}