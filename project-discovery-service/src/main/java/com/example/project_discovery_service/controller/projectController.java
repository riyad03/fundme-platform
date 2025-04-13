package com.example.project_discovery_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/projects")
public class projectController {

    @GetMapping
    public void getProjects(@RequestParam(defaultValue = "popular") String type) {
        //List<Project> projects = projectService.getProjectsByType(type);
        System.out.println("Received request for project type: " + type);
    }
}
