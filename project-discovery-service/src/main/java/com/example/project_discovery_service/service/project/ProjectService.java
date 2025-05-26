package com.example.project_discovery_service.service.project;

import com.example.project_discovery_service.dao.entity.Project;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface ProjectService {
    List<Project> getByStatus(String status);
    Project getById(long id);
    Project createProject(String name,Long creatorId ,String title, String slogan, String description,
                                           MultipartFile videoFile, MultipartFile imageFile,Double donation,String tag,String status) throws IOException;
    void deleteProject(Long projectId);
}
