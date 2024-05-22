package de.dhbw.tinf22b5.dinder.controller;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.entities.Users;
import de.dhbw.tinf22b5.dinder.models.request.AddAdvertisementModel;
import de.dhbw.tinf22b5.dinder.models.response.AdvertisementInformationModel;
import de.dhbw.tinf22b5.dinder.services.AdvertisementService;
import de.dhbw.tinf22b5.dinder.services.SupabaseService;
import de.dhbw.tinf22b5.dinder.services.UserService;
import lombok.AllArgsConstructor;
import org.apache.tika.Tika;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypeException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class AdvertisementController {
    private final UserService userService;
    private final AdvertisementService advertisementService;
    private final SupabaseService supabaseService;

    @GetMapping("advertisement/all")
    public List<Integer> getAllAdvertisements() {
        return advertisementService.getOpenAdvertisements().stream().map(Advertisement::getAdvertisementId).toList();
    }

    @GetMapping("advertisement/{id}")
    public AdvertisementInformationModel getAdvertisementById(@PathVariable int id) {
        return advertisementService.getAdvertisementFromId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }

    public HttpHeaders getHeadersForResource(String file) {
        ContentDisposition contentDisposition = ContentDisposition.builder("inline").filename(file).build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(contentDisposition);

        return headers;
    }

    @GetMapping("advertisement/{id}/image")
    public ResponseEntity<Resource> getAdvertisementImageById(@PathVariable int id) {
        Advertisement advertisement =
                advertisementService.getAdvertisementById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        Optional<byte[]> content = supabaseService.getImage(advertisement).map(CompletableFuture::join);

        if (content.isEmpty()) {
            try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("assets/no-image.jpg")) {
                if (inputStream != null) {
                    ByteArrayResource image = new ByteArrayResource(inputStream.readAllBytes());
                    return ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .headers(getHeadersForResource("no-image.jpg"))
                            .contentLength(image.contentLength())
                            .contentType(MediaType.IMAGE_JPEG)
                            .body(image);
                }
            }
            catch (IOException ignored) {
                //both the else case and this catch should throw the following exception, meaning this saves redundancy
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        ByteArrayResource image = new ByteArrayResource(content.get());

        Tika tika = new Tika();
        String mimeType = tika.detect(content.get());

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(getHeadersForResource(advertisement.getFileName()))
                .contentLength(image.contentLength())
                .contentType(MediaType.parseMediaType(mimeType))
                .body(image);
    }

    public MimeType getMimeType(InputStream inputStream) throws IOException, MimeTypeException {
        TikaConfig config = TikaConfig.getDefaultConfig();

        Metadata metadata = new Metadata();
        org.apache.tika.mime.MediaType mediaType = config.getMimeRepository().detect(inputStream, metadata);

        return config.getMimeRepository().forName(mediaType.toString());
    }

    @PostMapping("advertisement")
    public Advertisement createAdvertisement(@RequestPart("json") AddAdvertisementModel model,
                                             @RequestPart(value = "file", required = false) MultipartFile file,
                                             Principal principal) throws IOException {
        String fileExtension = null;
        try {
            if (file != null) {
                fileExtension = getMimeType(new ByteArrayInputStream(file.getBytes())).getExtension();
            }
        }
        catch (MimeTypeException mimeTypeException) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (file != null && (fileExtension == null || fileExtension.isBlank())) {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }

        //Change quicktime into mp4 because Apple
        if (fileExtension != null && fileExtension.equalsIgnoreCase(".qt")) {
            fileExtension = ".mp4";
        }

        Users user = userService.loadUserByUsername(principal.getName());
        String filePath = fileExtension == null ? "" : supabaseService.uploadFile(supabaseService.getBucket(
                        "advertisement"), file.getBytes(),
                user.getUsername() + "/" + UUID.randomUUID() + fileExtension).join();

        //TODO return advertisement information model?? -> there are some fields missing in it
        return filePath != null
                ? advertisementService.createAdvertisement(model, user, filePath)
                : advertisementService.createAdvertisement(model, user);
    }
}
