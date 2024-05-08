package de.dhbw.tinf22b5.dinder.repositories

import io.github.jan.supabase.storage.BucketApi
import kotlinx.coroutines.future.future
import kotlinx.coroutines.runBlocking
import java.util.concurrent.CompletableFuture

class SupabaseStorage

fun BucketApi.uploadAsync(path: String, data: ByteArray, upsert: Boolean = false): CompletableFuture<String> {
    return runBlocking {
        future {
            upload(path, data, upsert)
        }
    }
}