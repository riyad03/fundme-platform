package com.example.project_discovery_service.controller;

import com.example.project_discovery_service.dao.entity.Campaign;
import com.example.project_discovery_service.dao.entity.Project;
import com.example.project_discovery_service.service.campaign.CampaignService;
import com.example.project_discovery_service.service.project.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/projects")
public class projectController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CampaignService campaignService;

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
    @GetMapping("/mapPwU/{projectId}")
    public ResponseEntity<?> getUserByProjectId(@PathVariable Long projectId) {
        try {
            // Get the project first from your own DB
            Project project = projectService.getById(projectId);
            if (project == null) {
                return ResponseEntity.status(404).body("Project with ID " + projectId + " not found");
            }

            // Check for creator ID
            Long userId = project.getCreatorId();
            if (userId == null) {
                return ResponseEntity.status(400).body("Project does not have an associated user.");
            }

            // Call the User Service
            String url = "http://user-service:6100/users/" + userId;
            try {
                ResponseEntity<Object> userResponse = restTemplate.getForEntity(url, Object.class);
                return ResponseEntity.ok(userResponse.getBody());
            } catch (HttpClientErrorException.NotFound e) {
                return ResponseEntity.status(404).body("User with ID " + userId + " not found");
            } catch (Exception e) {
                return ResponseEntity.status(502).body("Failed to fetch user: " + e.getMessage());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable Long projectId){
        try {
            projectService.deleteProject(projectId);
            return ResponseEntity.ok(true);
        }
        catch (Exception e){
            System.out.println("Failed to delete project with id {}: {}"+ projectId+" "+ e.getMessage());
            return ResponseEntity.status(500).body(false);
        }
    }
    @PostMapping(value="/uploads/",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Project> createProject(
            @RequestParam("name") String name,
            @RequestParam("creatorId") Long creatorId,
            @RequestParam("title") String title,
            @RequestParam("donationsGoal") Double donationsGoal,
            @RequestParam("tag") String tag,
            @RequestParam("slogan") String slogan,
            @RequestParam("description") String description,
            @RequestParam(value = "videoFile") MultipartFile videoFile,
            /*@RequestParam(value = "liveFile") MultipartFile liveFile,*/
            @RequestParam(value = "imageFile") MultipartFile imageFile
    ) throws IOException {
        System.err.println("Video file: " + videoFile.getOriginalFilename());
        System.err.println("Image file: " + imageFile.getOriginalFilename());
        Project createdProject = projectService.createProject(name, creatorId,title, slogan, description, videoFile, imageFile,donationsGoal,tag,"popular");
        return ResponseEntity.ok(createdProject);
    }


    @GetMapping("/test")
    public String test(){
        return "test";
    }



}
