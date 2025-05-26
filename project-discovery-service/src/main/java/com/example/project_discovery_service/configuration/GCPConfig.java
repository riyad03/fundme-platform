package com.example.project_discovery_service.configuration;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GCPConfig {


    @Bean
    public Storage storage() {
        return StorageOptions.getDefaultInstance().getService();
    }
}
