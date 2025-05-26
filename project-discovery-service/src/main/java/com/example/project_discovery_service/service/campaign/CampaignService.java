package com.example.project_discovery_service.service.campaign;

import com.example.project_discovery_service.dao.entity.Campaign;

import java.util.List;
import java.util.Optional;

public interface CampaignService {

    List<Campaign> getAllCampaigns();

    Optional<Campaign> getCampaignById(Long id);

    Campaign createCampaign(Campaign campaign);

    Campaign updateCampaign(Long id, Campaign campaign);

    List<Campaign> getAllCampaignWithProject(long id);

    void deleteCampaign(Long id);

    void deleteByProjectId(Long projectId);
}
