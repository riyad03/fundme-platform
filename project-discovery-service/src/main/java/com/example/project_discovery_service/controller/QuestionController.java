package com.example.project_discovery_service.controller;

import com.example.project_discovery_service.dao.entity.Questions;
import com.example.project_discovery_service.service.project.ProjectService;
import com.example.project_discovery_service.service.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/{id}")
    public ResponseEntity<?> gatQuestionWProject(@PathVariable Long id){
        List<Questions> questions=questionService.getQuestionByProject(id);
        if(questions.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(questions);
        }
    }

}
