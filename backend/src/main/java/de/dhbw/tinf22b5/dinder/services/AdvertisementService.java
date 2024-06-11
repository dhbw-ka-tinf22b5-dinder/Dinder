package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
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

    public List<Advertisement> getAllAdvertisements() {
        return advertisementRepository.findAll();
    }

    public List<Advertisement> getOpenAdvertisements() {
        return advertisementRepository.findAllByContractorIsNull();
    }

    public Optional<Advertisement> getAdvertisementById(int id) {
        return advertisementRepository.findById(id).filter(e -> e.getContractor() == null);
    }

    public Optional<AdvertisementInformationModel> getAdvertisementFromId(int id) {
        return advertisementRepository.findById(id).filter(e -> e.getContractor() == null).map(Advertisement::toInformationModel);
    }

    public Advertisement createAdvertisement(AddAdvertisementModel model, Users user, String filePath) {
        Advertisement advertisement = Advertisement.fromModel(model, user, filePath);

        return advertisementRepository.save(advertisement);
    }

    public Advertisement updateAdvertisement(Advertisement advertisement) {
        return advertisementRepository.save(advertisement);
    }

    public Advertisement createAdvertisement(AddAdvertisementModel model, Users user) {
        Advertisement advertisement = Advertisement.fromModel(model, user);

        return advertisementRepository.save(advertisement);
    }
}
