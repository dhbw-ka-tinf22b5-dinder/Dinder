package de.dhbw.tinf22b5.dinder.repositories

import io.github.jan.supabase.storage.BucketApi
import io.github.jan.supabase.storage.DownloadStatus
import io.github.jan.supabase.storage.downloadAuthenticatedAsFlow
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.future.future
import kotlinx.coroutines.runBlocking
import java.util.concurrent.CompletableFuture

fun BucketApi.uploadAsync(path: String, data: ByteArray, upsert: Boolean = false): CompletableFuture<String> {
    return runBlocking {
        future {
            upload(path, data, upsert)
        }
    }
}

fun BucketApi.downloadAuthenticatedAsync(path: String): CompletableFuture<ByteArray> {
    return runBlocking {
        future {
            downloadAuthenticatedAsFlow(path) {}.filter { progress ->
                progress is DownloadStatus.ByteData
            }.map { progress ->
                progress as DownloadStatus.ByteData
                progress.data
            }.first()
        }
    }
}