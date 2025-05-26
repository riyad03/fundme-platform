package com.example.project_discovery_service.service.googleCloudService;

import org.springframework.web.multipart.MultipartFile;

public interface googleCloudService {
    String uploadFile(MultipartFile file);
}
