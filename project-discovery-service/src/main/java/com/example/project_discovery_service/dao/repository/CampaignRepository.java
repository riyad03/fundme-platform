package com.example.project_discovery_service.dao.repository;

import com.example.project_discovery_service.dao.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    @Query("SELECT c FROM Campaign c JOIN c.project p WHERE p.id = %:id%")
    List<Campaign> findCampaignsByProjectNameContaining(@Param("id") Long id);

    void deleteByProjectId(Long projectId);
}

