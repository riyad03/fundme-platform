package com.example.project_discovery_service.controller;

import com.example.project_discovery_service.dao.entity.Campaign;
import com.example.project_discovery_service.service.campaign.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable Long id) {
        Optional<Campaign> campaign = campaignService.getCampaignById(id);
        if (campaign.isPresent()) {
            return new ResponseEntity<>(campaign.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }*/

    @GetMapping("/{projectid}")
    public ResponseEntity<?> getCampaignForProject(@PathVariable Long projectid){
        List<Campaign> campaigns=campaignService.getAllCampaignWithProject(projectid);
        if(campaigns.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(campaigns);
        }
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
        Campaign createdCampaign = campaignService.createCampaign(campaign);
        return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(
            @PathVariable Long id, @RequestBody Campaign campaignDetails) {
        Campaign updatedCampaign = campaignService.updateCampaign(id, campaignDetails);
        if (updatedCampaign != null) {
            return new ResponseEntity<>(updatedCampaign, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/test")
    public ResponseEntity<?> routeToProjectDiscoveryTest() {
        try {
            return ResponseEntity.ok("test");

        } catch (RestClientException e) {
            System.err.println("Connection error with project discovery service: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to connect to project discovery service");
            errorResponse.put("details", e.getMessage());


            return ResponseEntity.status(502).body(errorResponse);
        } catch (Exception e) {
            System.err.println("Unexpected error in gateway: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal gateway error");
            errorResponse.put("details", e.getMessage());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
