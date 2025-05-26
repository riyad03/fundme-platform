package com.example.project_discovery_service.service.question;

import com.example.project_discovery_service.dao.entity.Questions;

import java.util.List;

public interface QuestionService {
    List<Questions> getQuestionByProject(Long id);
    void deleteByProjectId(Long projectId);
}
