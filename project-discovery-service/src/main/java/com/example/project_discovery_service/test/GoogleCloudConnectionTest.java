package com.example.project_discovery_service.test;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.Bucket;

import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class GoogleCloudConnectionTest {

    private static final Logger logger = LoggerFactory.getLogger(GoogleCloudConnectionTest.class);

    @PostConstruct
    public void testConnection() {
        try {
            // Create Storage client with default credentials from environment
            Storage storage = StorageOptions.getDefaultInstance().getService();

            // Try listing buckets (limit to 5 for brevity)
            logger.info("Testing Google Cloud Storage connection...");

            int count = 0;
            for (Bucket bucket : storage.list().iterateAll()) {
                logger.info("Found bucket: {}", bucket.getName());
                if (++count >= 5) break;
            }

            logger.info("Google Cloud Storage connection test succeeded.");

        } catch (Exception e) {
            logger.error("Google Cloud connection test failed!", e);
        }
    }
}

