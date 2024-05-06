package de.dhbw.tinf22b5.dinder.services;

import de.dhbw.tinf22b5.dinder.repositories.SupabaseStorageKt;
import io.github.jan.supabase.SupabaseClient;
import io.github.jan.supabase.SupabaseClientBuilderKt;
import io.github.jan.supabase.storage.BucketApi;
import io.github.jan.supabase.storage.Storage;
import io.github.jan.supabase.storage.StorageKt;
import kotlin.Unit;
import org.springframework.beans.factory.annotation.Value;

import java.util.concurrent.CompletableFuture;

public class SupabaseService {
    private final SupabaseClient supabaseClient;

    public SupabaseService(@Value("supabase.url") String url, @Value("supabase.key") String key) {
        this.supabaseClient = SupabaseClientBuilderKt.createSupabaseClient(url, key, supabaseClientBuilder -> {
            supabaseClientBuilder.install(Storage.Companion, config -> Unit.INSTANCE);
            return Unit.INSTANCE;
        });
    }

    public BucketApi getBucket(String name) {
        return getStorage().from(name);
    }

    public CompletableFuture<String> uploadFile(BucketApi bucket, byte[] file, String path) {
        return SupabaseStorageKt.uploadAsync(bucket, path, file, false);
    }

    private Storage getStorage() {
        return StorageKt.getStorage(supabaseClient);
    }
}