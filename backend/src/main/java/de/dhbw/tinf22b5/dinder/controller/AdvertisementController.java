package de.dhbw.tinf22b5.dinder.controller;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import de.dhbw.tinf22b5.dinder.services.AdvertisementService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class AdvertisementController {

    private AdvertisementService advertisementService;

    @GetMapping("/advertisement/all")
    public List<Integer> getAllAdvertisements() {
        return advertisementService.getOpenAdvertisements().stream().map(Advertisement::getAdvertisementId).toList();
    }

    @GetMapping("/advertisement/{id}")
    public AdvertisementInformationModel getAdvertisementById(@PathVariable int id) {
        return advertisementService.getAdvertisementFromId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    @PostMapping("/advertisement/image")
    public boolean handleAdvertisementImage(@RequestPart("file") Resource file,
                                            @RequestPart("json") AddAdvertisementModel model) {
        try {
            Files.write(Path.of("C:\\Users\\schae\\Desktop\\test.png"), file.getContentAsByteArray());
        }
        catch (IOException e) {
            return false;
        }

        System.out.println(model.name());
        System.out.println(model.description());

        return true;
    }

}
