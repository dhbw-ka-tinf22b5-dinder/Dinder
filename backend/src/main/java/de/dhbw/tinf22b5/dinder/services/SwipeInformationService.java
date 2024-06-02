package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.entities.SwipeInformation;
import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.SwipeState;
import de.dhbw.tinf22b5.dinder.repositories.SwipeInformationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SwipeInformationService {
    private final SwipeInformationRepository swipeInformationRepository;

    public Optional<SwipeInformation> findByAdvertisementAndContractor(Advertisement advertisement, Users contractor) {
        return swipeInformationRepository.findSwipeInformationByAdvertisementAndContractor(advertisement, contractor);
    }

    public List<SwipeInformation> getAllByAdvertisement(Advertisement advertisement) {
        return swipeInformationRepository.findAllByAdvertisement(advertisement);
    }

    public SwipeInformation addSwipeInformation(Instant swipeTime, SwipeState swipeState,
                                                Advertisement advertisementId, Users contractorEmail) {
        return swipeInformationRepository.save(
                new SwipeInformation(
                        swipeTime, swipeState, advertisementId, contractorEmail
                )
        );
    }

    public SwipeInformation updateSwipeInformation(SwipeInformation swipeInformation) {
        return swipeInformationRepository.save(swipeInformation);
    }
}