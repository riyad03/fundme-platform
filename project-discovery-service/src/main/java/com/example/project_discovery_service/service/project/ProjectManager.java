package com.example.project_discovery_service.service.project;

import java.io.IOException;

import com.example.project_discovery_service.dao.entity.Campaign;
import com.example.project_discovery_service.dao.entity.Project;
import com.example.project_discovery_service.dao.repository.ProjectRepository;
import com.example.project_discovery_service.dao.repository.RewardRepository;
import com.example.project_discovery_service.service.campaign.CampaignService;
import com.example.project_discovery_service.service.question.QuestionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.example.project_discovery_service.service.googleCloudService.googleCloudService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectManager implements ProjectService{

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private RewardRepository rewardRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private googleCloudService googleCloudService;

    @Override
    public List<Project> getByStatus(String status) {
        return projectRepository.findByStatus(status);

    }

    @Override
    public Project getById(long id) {
        return projectRepository.findById(id).get();

    }

    @Override
    public Project createProject(String name,Long creatorId ,String title, String slogan, String description,
                                           MultipartFile videoFile, MultipartFile imageFile,Double donation,String tag,String status) throws IOException {
        Project project=new Project();
        project.setName(name);
        project.setCreatorId(creatorId);
        project.setTitle(title);
        project.setSlogan(slogan);
        project.setDescription(description);
        project.setTag(tag);
        project.setDonationsGoal(donation);
        project.setDateStarted(LocalDate.now());
        project.setStatus(status);
        if (videoFile != null && !videoFile.isEmpty()) {
            String videoUrl = saveFileLocally(videoFile, "videos");
            project.setVideoUrl("/projectData/videos/"+videoUrl);
        }

        /*if (liveFile != null && !liveFile.isEmpty()) {
            String liveUrl = saveFileLocally(liveFile,"lives");
            project.setLiveUrl("/files/lives/"+liveUrl);
        }*/

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl =saveFileLocally(imageFile,"images");
            project.setImageUrl("/projectData/images/"+imageUrl);
        }


        return projectRepository.save(project);
    }
    private String saveFileLocally(MultipartFile file, String subDir) throws IOException {
        Path targetDir = Paths.get(uploadDir, subDir).toAbsolutePath().normalize();
        System.out.println("Target directory: " + targetDir.toString());

        Files.createDirectories(targetDir);

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println("Original filename: " + originalFilename);

        String storedFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path targetPath = targetDir.resolve(storedFilename);

        System.out.println("Saving file to: " + targetPath.toString());

        try {
            file.transferTo(targetPath);
        } catch (IOException e) {
            System.err.println("Failed to save file: " + e.getMessage());
            throw e;
        }

        return storedFilename;
    }
    @Transactional
    @Override
    public void deleteProject(Long projectId){
        campaignService.deleteByProjectId(projectId);
        questionService.deleteByProjectId(projectId);
        rewardRepository.deleteByProjectId(projectId);
        Project project = projectRepository.findById(projectId).orElseThrow(() ->
                new EntityNotFoundException("Project not found with id: " + projectId)
        );
        projectRepository.delete(project);
    }



    public void testWriteFile() throws IOException {
        System.out.println("uploadDir = " + uploadDir);  // Add this line
        Path dir = Paths.get(uploadDir, "testDir").toAbsolutePath().normalize();
        Files.createDirectories(dir);
        Path filePath = dir.resolve("testfile.txt");
        Files.write(filePath, "Hello World".getBytes());
        System.out.println("File written to " + filePath.toString());
        System.err.println("uploadDir = " + (uploadDir != null ? uploadDir : "null"));
    }
}
