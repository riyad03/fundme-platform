package com.example.project_discovery_service.service.reward;

import com.example.project_discovery_service.dao.entity.Reward;
import com.example.project_discovery_service.dao.repository.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardManager implements RewardService{

    @Autowired
    private RewardRepository rewardRepository;
    @Override
    public List<Reward> findRewardsByProject(Long projectId) {
        return rewardRepository.findRewardByProject(projectId);
    }
    @Override
    public void deleteByProjectId(Long projectId){
        rewardRepository.deleteByProjectId(projectId);
    }
}
