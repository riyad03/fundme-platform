package com.example.project_discovery_service.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DebugConfig {
    @Value("${spring.cloud.gcp.project-id}")
    private String projectId;

    @PostConstruct
    public void printProjectId() {
        System.out.println("Project ID from config: " + projectId);
    }
}
