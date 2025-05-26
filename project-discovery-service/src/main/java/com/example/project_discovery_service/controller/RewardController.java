package com.example.project_discovery_service.controller;

import com.example.project_discovery_service.dao.entity.Reward;
import com.example.project_discovery_service.service.reward.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rewards")
public class RewardController {

    @Autowired
    private RewardService rewardService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getRewardByProject(@PathVariable Long id){
        List<Reward> rewardList=rewardService.findRewardsByProject(id);
        if(rewardList.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(rewardList);
        }
    }
}
