package de.dhbw.tinf22b5.dinder.controller;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import de.dhbw.tinf22b5.dinder.services.AdvertisementService;
import de.dhbw.tinf22b5.dinder.services.SupabaseService;
import lombok.AllArgsConstructor;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
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

    public MimeType getMimeType(InputStream inputStream) throws IOException, MimeTypeException {
        TikaConfig config = TikaConfig.getDefaultConfig();

        Metadata metadata = new Metadata();
        org.apache.tika.mime.MediaType mediaType = config.getMimeRepository().detect(inputStream, metadata);

        return config.getMimeRepository().forName(mediaType.toString());
    }

    @PostMapping("advertisement/image")
    public String handleAdvertisementImage(@RequestPart("file") MultipartFile file,
                                           @RequestPart("json") AddAdvertisementModel model) throws IOException {
        String fileExtension;
        try {
            fileExtension = getMimeType(new ByteArrayInputStream(file.getBytes())).getExtension();
        }
        catch (MimeTypeException mimeTypeException) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (fileExtension == null || fileExtension.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }

        if (fileExtension.equalsIgnoreCase(".qt")) {
            fileExtension = ".mp4";
        }

        return supabaseService.uploadFile(supabaseService.getBucket("advertisement"), file.getBytes(),
                "123/testname" + fileExtension).join();
    }

}
