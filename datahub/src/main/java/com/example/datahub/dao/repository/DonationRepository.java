package com.example.datahub.dao.repository;

import com.example.datahub.dao.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByProjectId(String projectId);

}
