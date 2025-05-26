package com.example.project_discovery_service.service.campaign;

import com.example.project_discovery_service.dao.entity.Campaign;
import com.example.project_discovery_service.dao.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignManager implements CampaignService {
    @Autowired
    private CampaignRepository campaignRepository;


    @Override
    public List<Campaign> getAllCampaigns() {

        return campaignRepository.findAll();
    }

    @Override
    public Optional<Campaign> getCampaignById(Long id) {

        return campaignRepository.findById(id);
    }

    @Override
    public Campaign createCampaign(Campaign campaign) {

        return null;
    }

    @Override
    public Campaign updateCampaign(Long id, Campaign campaign) {
        if (campaignRepository.existsById(id)) {
            campaign.setId(id); // Make sure the ID is set for update
            return campaignRepository.save(campaign);
        }
        throw new RuntimeException("Campaign not found with id: " + id);
    }

    @Override
    public List<Campaign> getAllCampaignWithProject(long id) {
        return campaignRepository.findCampaignsByProjectNameContaining(id);
    }

    @Override
    public void deleteCampaign(Long id) {
        if (campaignRepository.existsById(id)) {
            campaignRepository.deleteById(id);
        } else {
            throw new RuntimeException("Campaign not found with id: " + id);
        }
    }
    @Override
    public void deleteByProjectId(Long projectId){
        campaignRepository.deleteByProjectId(projectId);
    }
}
