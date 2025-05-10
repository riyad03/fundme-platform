package com.example.project_discovery_service.dao.repository;

import com.example.project_discovery_service.dao.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findByStatus(String status);
}
