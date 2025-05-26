package com.example.project_discovery_service.dao.repository;

import com.example.project_discovery_service.dao.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Questions,Long> {
    @Query("SELECT q FROM Questions q JOIN q.project p WHERE p.id=:id")
    List<Questions> getQuestionByProject(@Param("id") Long id);
    void deleteByProjectId(Long projectId);


}
