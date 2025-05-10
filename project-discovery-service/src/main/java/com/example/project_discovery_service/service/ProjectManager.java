package com.example.project_discovery_service.service;

import com.example.project_discovery_service.dao.entity.Project;
import com.example.project_discovery_service.dao.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectManager implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getByStatus(String status) {
        return projectRepository.findByStatus(status);

    }
}
