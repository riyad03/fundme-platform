package com.example.project_discovery_service.service;

import com.example.project_discovery_service.dao.entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProjectService {
    List<Project> getByStatus(String status);
}
