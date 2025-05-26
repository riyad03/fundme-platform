package com.example.project_discovery_service;

import com.example.project_discovery_service.service.GcsTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class ProjectDiscoveryServiceApplication implements CommandLineRunner {


    public static void main(String[] args) {
        SpringApplication.run(ProjectDiscoveryServiceApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        String projectId = "fresh-entity-460014-s9";
        GcsTestService gcsService = new GcsTestService(projectId);
        gcsService.listBuckets();
    }
}
