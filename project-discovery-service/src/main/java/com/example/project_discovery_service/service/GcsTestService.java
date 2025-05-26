package com.example.project_discovery_service.service;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.IOException;
import java.io.InputStream;

public class GcsTestService {
    private final Storage storage;

    public GcsTestService(String projectId) throws IOException {
        InputStream serviceAccountStream = getClass().getClassLoader().getResourceAsStream("project_discovery_service.json");

        if (serviceAccountStream == null) {
            throw new IOException("Service account key file not found in resources");
        }

        // Don't use try-with-resources here — keep the stream open while building the client
        ServiceAccountCredentials credentials = ServiceAccountCredentials.fromStream(serviceAccountStream);

        this.storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build()
                .getService();

        serviceAccountStream.close(); // close manually after client is built
    }

    public void listBuckets() {
        for (var bucket : storage.list().iterateAll()) {
            System.out.println(bucket.getName());
        }
    }
}
