package com.example.project_discovery_service.service.googleCloudService;

import com.google.api.client.util.Value;
import com.google.cloud.storage.BlobInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Storage;

import java.io.IOException;
import java.util.UUID;

@Service
public class googleCloudManager implements googleCloudService {

    @Value("${gcp.bucket-name}")
    private String bucketName;

    private final Storage storage;

    public googleCloudManager(Storage storage) {
        this.storage = storage;
    }

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
            BlobId blobId = BlobId.of(bucketName, fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
            storage.create(blobInfo, file.getBytes());

            return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

}
