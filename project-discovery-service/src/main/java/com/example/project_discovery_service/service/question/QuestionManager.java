package com.example.project_discovery_service.service.question;

import com.example.project_discovery_service.dao.entity.Questions;
import com.example.project_discovery_service.dao.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionManager implements QuestionService{

    @Autowired
    private QuestionRepository questionRepository;
    @Override
    public List<Questions> getQuestionByProject(Long id) {
        return questionRepository.getQuestionByProject(id);
    }
    @Override
    public void deleteByProjectId(Long projectId){
        questionRepository.deleteByProjectId(projectId);
    }
}
