package com.example.project_discovery_service.controller;

import com.example.project_discovery_service.dao.entity.Project;
import com.example.project_discovery_service.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
@RequestMapping("/projects")
public class projectController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ProjectService projectService;

    String[] allPath={"http://datahub-service:8086"};
    @GetMapping("/batch")
    public ResponseEntity<?> getProjects(@RequestParam(defaultValue = "popular") String type) {
        String url=allPath[0]+"/batch?type="+type;
        return restTemplate.getForEntity(url,Object.class);
    }
    @GetMapping
    @ResponseBody
    public ResponseEntity<?> getProjectsByStatus(@RequestParam(defaultValue = "popular") String status){
        List<Project> projects= projectService.getByStatus(status);
        if(projects.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(projects);
        }
    }
    @GetMapping("/test")
    public String test(){
        return "test";
    }



}
