package com.example.project_discovery_service.service.reward;

import com.example.project_discovery_service.dao.entity.Reward;

import java.util.List;

public interface RewardService {
    List<Reward> findRewardsByProject(Long projectId);
    void deleteByProjectId(Long projectId);
}
