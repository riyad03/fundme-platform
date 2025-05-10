package com.example.project_discovery_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;



@RestController
@RequestMapping("/projects")
public class projectController {

    @Autowired
    private RestTemplate restTemplate;

    String[] allPath={"http://datahub-service:8086"};
    @GetMapping("/batch")
    public ResponseEntity<?> getProjects(@RequestParam(defaultValue = "popular") String type) {
        String url=allPath[0]+"/batch?type="+type;
        return restTemplate.getForEntity(url,Object.class);
    }
    @GetMapping("/test")
    public String test(){
        return "test";
    }


}
