package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import de.dhbw.tinf22b5.dinder.repositories.AdvertisementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdvertisementService {

    private final AdvertisementRepository advertisementRepository;

    public List<Advertisement> getOpenAdvertisements() {
        return advertisementRepository.findAll().stream().filter(e -> e.getContractor() == null).toList();
    }

    public Optional<AdvertisementInformationModel> getAdvertisementFromId(int id) {
        return advertisementRepository.findById(id).map(Advertisement::toInformationModel);
    }
}
