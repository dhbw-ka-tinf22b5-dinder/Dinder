package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.entities.Advertisement;
import de.dhbw.tinf22b5.dinder.repositories.SupabaseStorageKt;
import io.github.jan.supabase.SupabaseClient;
import io.github.jan.supabase.SupabaseClientBuilderKt;
import io.github.jan.supabase.storage.BucketApi;
import io.github.jan.supabase.storage.Storage;
import io.github.jan.supabase.storage.StorageKt;
import kotlin.Unit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class SupabaseService {
    private final SupabaseClient supabaseClient;

    public SupabaseService(@Value("${supabase.url}") String url, @Value("${supabase.key}") String key) {
        this.supabaseClient = SupabaseClientBuilderKt.createSupabaseClient(url, key, supabaseClientBuilder -> {
            supabaseClientBuilder.install(Storage.Companion, config -> Unit.INSTANCE);
            return Unit.INSTANCE;
        });
    }

    public BucketApi getBucket(String name) {
        return getStorage().from(name);
    }

    public Optional<CompletableFuture<byte[]>> getImage(Advertisement advertisement) {
        if (advertisement.getImagePath() == null) {
            return Optional.empty();
        }

        try {
            String bucketName = advertisement.getImagePath().substring(0, advertisement.getImagePath().indexOf("/"));
            BucketApi bucket = getBucket(bucketName);

            String path = advertisement.getImagePath().substring(advertisement.getImagePath().indexOf("/"));
            return Optional.ofNullable(downloadFile(bucket, path)
            );
        }
        catch (StringIndexOutOfBoundsException e) {
            return Optional.empty();
        }
        catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT);
        }
    }

    public CompletableFuture<String> uploadFile(BucketApi bucket, byte[] file, String path) {
        return SupabaseStorageKt.uploadAsync(bucket, path, file, false);
    }

    public CompletableFuture<byte[]> downloadFile(BucketApi bucket, String path) {
        return SupabaseStorageKt.downloadAuthenticatedAsync(bucket, path);
    }

    private Storage getStorage() {
        return StorageKt.getStorage(supabaseClient);
    }
}