package com.example.datahub.service;
import com.example.datahub.dao.entity.Donation;
import com.example.datahub.dao.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;



import com.example.datahub.dao.entity.Donation;
import com.example.datahub.dao.repository.DonationRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class DonationService {
    private final DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public Donation createDonation(BigDecimal amount, String donorName) {
        Donation donation = new Donation();
        donation.setAmount(amount);
        donation.setDonorName(donorName);
        return donationRepository.save(donation);
    }

    public List<Donation> getDonationsByProject(String projectId) {
        return donationRepository.findByProjectId(projectId);
    }
}

