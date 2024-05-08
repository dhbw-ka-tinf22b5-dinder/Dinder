package de.dhbw.tinf22b5.dinder.controller;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import de.dhbw.tinf22b5.dinder.services.AdvertisementService;
import de.dhbw.tinf22b5.dinder.services.SupabaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class AdvertisementController {

    private AdvertisementService advertisementService;
    private SupabaseService supabaseService;

    @GetMapping("advertisement/all")
    public List<Integer> getAllAdvertisements() {
        return advertisementService.getOpenAdvertisements().stream().map(Advertisement::getAdvertisementId).toList();
    }

    @GetMapping("advertisement/{id}")
    public AdvertisementInformationModel getAdvertisementById(@PathVariable int id) {
        return advertisementService.getAdvertisementFromId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    @PostMapping("advertisement/image")
    public String handleAdvertisementImage(@RequestPart("file") MultipartFile file,
                                            @RequestPart("json") AddAdvertisementModel model) throws IOException {
        return supabaseService.uploadFile(supabaseService.getBucket("advertisement"), file.getBytes(), "123/testname.jpg").join();
    }

}
