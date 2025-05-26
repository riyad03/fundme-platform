package com.example.project_discovery_service.dao.repository;

import com.example.project_discovery_service.dao.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardRepository extends JpaRepository<Reward,Long> {
    @Query("SELECT r FROM Reward r JOIN r.project p WHERE p.id = :id")
    List<Reward> findRewardByProject(@Param("id") Long id);
    void deleteByProjectId(Long projectId);
}
