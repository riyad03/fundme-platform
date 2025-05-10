package com.example.datahub.controller;

import com.example.datahub.dao.entity.Donation;
import com.example.datahub.service.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/batch")
public class DonnationController {  // Fixed typo in class name
    private final DonationService donationService;

    public DonnationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        return donationService.createDonation(
                donation.getAmount(),
                donation.getDonorName()

        );
    }

    @GetMapping("/project/{projectId}")
    public List<Donation> getDonationsByProject(@PathVariable String projectId) {
        return donationService.getDonationsByProject(projectId);
    }


    @GetMapping
    @ResponseBody
    public ResponseEntity<?> test(@RequestParam String type) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "successful test with "+type);
        return ResponseEntity.ok(response);
    }
}