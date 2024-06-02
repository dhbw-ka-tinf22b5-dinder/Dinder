package de.dhbw.tinf22b5.dinder.controller;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.entities.SwipeInformation;
import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.request.AddSwipeInformationModel;
import de.dhbw.tinf22b5.dinder.models.response.SwipeInformationModel;
import de.dhbw.tinf22b5.dinder.services.AdvertisementService;
import de.dhbw.tinf22b5.dinder.services.SwipeInformationService;
import de.dhbw.tinf22b5.dinder.services.UserService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/advertisement/{advertisement}/swipe")
@AllArgsConstructor
public class SwipeInformationController {
    private final SwipeInformationService swipeInformationService;
    private final UserService userService;
    private final AdvertisementService advertisementService;

    @GetMapping("all")
    public List<SwipeInformationModel> getAll(@PathParam("advertisement") int advertisementId) {
        Advertisement advertisement =
                advertisementService.getAdvertisementById(advertisementId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return swipeInformationService.getAllByAdvertisement(advertisement).stream().map(SwipeInformation::toInformationModel).toList();
    }

    @PostMapping()
    public SwipeInformationModel addSwipe(@RequestBody AddSwipeInformationModel model,
                                          @PathParam("advertisement") int advertisementId, Principal principal) {
        Users user = userService.loadUserByUsername(principal.getName());

        Advertisement advertisement =
                advertisementService.getAdvertisementById(advertisementId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Optional<SwipeInformation> swipeInformation =
                swipeInformationService.findByAdvertisementAndContractor(advertisement, user);

        if (swipeInformation.isPresent()) {
            swipeInformation.get().setSwipeState(model.swipeState());
            swipeInformation.get().setSwipeTime(Instant.now());
            return swipeInformationService.updateSwipeInformation(swipeInformation.get()).toInformationModel();
        }

        return swipeInformationService.addSwipeInformation(Instant.now(), model.swipeState(), advertisement, user).toInformationModel();
    }
}