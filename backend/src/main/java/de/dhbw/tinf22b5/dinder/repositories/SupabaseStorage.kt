package de.dhbw.tinf22b5.dinder.repositories

import io.github.jan.supabase.storage.BucketApi
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.future.future
import java.util.concurrent.CompletableFuture

class SupabaseStorage

@OptIn(DelicateCoroutinesApi::class)
fun BucketApi.uploadAsync(path: String, data: ByteArray, upsert: Boolean = false): CompletableFuture<String> {
    return GlobalScope.future {
        upload(path, data, upsert)
    }
}